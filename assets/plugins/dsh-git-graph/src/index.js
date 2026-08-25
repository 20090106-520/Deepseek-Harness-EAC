/**
 * dsh-git-graph — host half.
 *
 * Workspace-gated git service on the shared webserver.
 * Routes:
 *   POST /git/status       — current branch, head, dirty/untracked/conflict counts
 *   POST /git/branches     — local branch list with current marker
 *   POST /git/graph        — topo-ordered commit graph (read-only)
 *   POST /git/switch       — switch checked-out branch
 *   POST /git/create-branch — create branch from HEAD and switch to it
 *   GET  /git/events?path= — SSE stream of external branch/head changes
 *
 * Security: loopback-only, JSON body CSRF hardening, workspace-path gate.
 */
import { existsSync, realpath } from "node:fs";
import { join, resolve } from "node:path";

export const name = "ui-git-graph";
export const inject = ["webServer", "subprocess", "workspaceRegistry"];

const DETACHED = "HEAD";

// ---- workspace gate ----
function createWorkspaceGate(ctx) {
  return async (path) => {
    let canonical;
    try {
      canonical = await realpath(path);
    } catch {
      return { ok: false, error: { code: "workspace-unknown", message: "path does not resolve on disk" } };
    }
    const registered = ctx.workspaceRegistry.list();
    if (registered.some((w) => w.path === canonical)) {
      return { ok: true, canonical };
    }
    return { ok: false, error: { code: "workspace-unknown", message: "path is not a registered workspace" } };
  };
}

// ---- subprocess runner seam ----
function spawnArgv(argv) {
  const bin = process.platform === "win32" ? "git.exe" : "git";
  return [bin, ...argv];
}

function runGit(argv, cwd, signal) {
  const subprocess = ctx !== null ? ctx.subprocess : null;
  if (subprocess === null || subprocess === undefined) {
    return Promise.resolve({ exitCode: 1, stdout: "", stderr: "subprocess service unavailable" });
  }
  return subprocess.run({
    command: spawnArgv(argv),
    cwd,
    signal,
  }).catch((err) => ({ exitCode: 1, stdout: "", stderr: String(err.message ?? err) }));
}

let ctx = null;

export function apply(pluginCtx) {
  ctx = pluginCtx;
  const gate = createWorkspaceGate(pluginCtx);
  const subscribers = new Set();
  let pollTimer = null;
  let heartbeatTimer = null;

  // ---- helpers ----
  function json(res, envelope, status = 200) {
    const body = JSON.stringify(envelope);
    res.writeHead(status, {
      "content-type": "application/json; charset=utf-8",
      "content-length": Buffer.byteLength(body),
    });
    res.end(body);
  }

  function ok(value) {
    return { ok: true, value };
  }

  function fail(error) {
    return { ok: false, error };
  }

  function readBody(req) {
    return new Promise((resolvePromise) => {
      const chunks = [];
      let size = 0;
      req.on("data", (chunk) => {
        size += chunk.length;
        if (size > 1 << 20) { req.destroy(); chunks.length = 0; resolvePromise(null); return; }
        chunks.push(chunk);
      });
      req.on("end", () => {
        if (chunks.length === 0) { resolvePromise(null); return; }
        try { resolvePromise(JSON.parse(Buffer.concat(chunks).toString("utf8"))); }
        catch { resolvePromise(null); }
      });
      req.on("error", () => resolvePromise(null));
    });
  }

  function pathOf(payload) {
    if (typeof payload !== "object" || payload === null) return null;
    const p = payload.path;
    return typeof p === "string" && p !== "" ? p : null;
  }

  // ---- git operations ----
  async function repoRoot(path, signal) {
    const r = await runGit(["rev-parse", "--show-toplevel"], path, signal);
    if (r.exitCode !== 0) return null;
    const root = r.stdout.trim();
    return root === "" ? null : root;
  }

  async function getBranch(root, signal) {
    const r = await runGit(["rev-parse", "--abbrev-ref", "HEAD"], root, signal);
    const b = r.stdout.trim();
    return b === DETACHED ? "" : b;
  }

  async function getHeadShort(root, signal) {
    const r = await runGit(["rev-parse", "--short", "HEAD"], root, signal);
    return r.stdout.trim();
  }

  async function getStatusCounts(root, signal) {
    const r = await runGit(["status", "--porcelain"], root, signal);
    const lines = r.stdout.split("\n").filter((l) => l !== "");
    const unmerged = new Set(["DD", "AU", "UD", "UA", "DU", "AA", "UU"]);
    let dirty = 0, untracked = 0, conflicts = 0;
    for (const line of lines) {
      const xy = line.slice(0, 2);
      if (unmerged.has(xy)) conflicts++;
      else if (xy.startsWith("??")) untracked++;
      else dirty++;
    }
    return { dirtyFiles: dirty, untrackedFiles: untracked, conflicts };
  }

  async function getBranches(root) {
    const r = await runGit(
      ["for-each-ref", "refs/heads", "--format=%(refname:short)\u0000%(HEAD)\u0000%(objectname)"],
      root
    );
    const rows = [];
    for (const line of r.stdout.split("\n")) {
      if (line === "") continue;
      const parts = line.split("\u0000");
      if (parts.length < 3) continue;
      rows.push({ name: parts[0], current: parts[1] === "*", oid: parts[2] });
    }
    rows.sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }

  async function getGraph(root, limit = 200) {
    const r = await runGit(
      ["log", "--branches", "--tags", "--remotes", "--topo-order", "--parents",
       "--format=%H\u0000%P\u0000%an\u0000%at\u0000%D\u001e%s",
       "--max-count", String(limit + 1)],
      root
    );
    const commits = [];
    for (const raw of r.stdout.split("\u001e")) {
      const entry = raw.replace(/^\n/, "");
      if (entry === "") continue;
      const parts = entry.split("\u0000");
      if (parts.length < 6) continue;
      const [oid, parentsRaw, author, authorTimeRaw, decoration, subject] = parts;
      if (!oid || oid === "") continue;
      const refs = [];
      if (decoration) {
        for (const part of decoration.split(", ")) {
          if (part === "HEAD") continue;
          const name = part.replace(/^HEAD -> /, "").replace(/^tag: /, "").trim();
          if (name) refs.push(name);
        }
      }
      commits.push({
        oid,
        parents: parentsRaw ? parentsRaw.split(" ") : [],
        subject: subject ?? "",
        author: author ?? "",
        authorTime: Number(authorTimeRaw ?? "0"),
        refs,
      });
    }
    const hasMore = commits.length > limit;
    return { commits: hasMore ? commits.slice(0, limit) : commits, hasMore };
  }

  async function hasOperationInProgress(root, signal) {
    const markers = ["MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD", "BISECT_LOG", "rebase-merge", "rebase-apply", "sequencer"];
    const r = await runGit(["rev-parse", ...markers.flatMap((m) => ["--git-path", m])], root, signal);
    if (r.exitCode === 0) {
      return r.stdout.split("\n").some((line) => {
        const p = line.trim();
        return p !== "" && existsSync(join(root, p));
      });
    }
    for (const marker of markers) {
      const single = await runGit(["rev-parse", "--git-path", marker], root, signal);
      const p = single.stdout.trim();
      if (p !== "" && existsSync(join(root, p))) return true;
    }
    return false;
  }

  async function switchBranch(root, branch, signal) {
    const fmt = await runGit(["check-ref-format", "--branch", branch], root);
    if (fmt.exitCode !== 0) return fail({ code: "invalid-branch-name", message: fmt.stderr.trim() || "invalid branch name" });
    const verify = await runGit(["rev-parse", "--verify", "--quiet", `refs/heads/${branch}`], root);
    if (verify.exitCode !== 0) return fail({ code: "target-branch-not-found", message: `branch "${branch}" does not exist locally` });
    const current = await getBranch(root, signal);
    if (current === branch) return ok({ branch });
    const inProgress = await hasOperationInProgress(root, signal);
    if (inProgress) return fail({ code: "operation-in-progress", message: "a git operation is in progress" });
    const switched = await runGit(["switch", "--no-guess", "--", branch], root, signal);
    if (switched.exitCode === 0) return ok({ branch });
    const stderr = switched.stderr;
    if (/did not match any file|invalid reference|not a valid branch/.test(stderr)) {
      return fail({ code: "target-branch-not-found", message: stderr.trim().split("\n")[0] });
    }
    if (/already used by worktree|is already checked out at/.test(stderr)) {
      return fail({ code: "branch-in-other-worktree", message: stderr.trim().split("\n")[0] });
    }
    return fail({ code: "internal", message: stderr.trim().split("\n")[0] || "git switch failed" });
  }

  async function createBranch(root, name, signal) {
    const validate = (n) => {
      if (n === "") return "empty";
      if (n === "@") return "at-sign";
      if (n.startsWith("-")) return "leading-dash";
      if (n.endsWith(".")) return "trailing-dot";
      if (n.endsWith(".lock")) return "lock-suffix";
      if (n.includes("..")) return "double-dot";
      if (n.includes("@{")) return "at-brace";
      if (n.includes("//")) return "double-slash";
      if (n.includes(" ")) return "space";
      for (const ch of n) {
        const c = ch.codePointAt(0);
        if (c !== undefined && (c < 0x20 || c === 0x7f)) return "control-char";
      }
      for (const comp of n.split("/")) {
        if (comp === "") return "empty-component";
        if (comp.startsWith(".")) return "dot-component";
        if (comp.endsWith(".lock")) return "lock-suffix";
      }
      if (n.length > 1000) return "too-long";
      return null;
    };
    const reason = validate(name);
    if (reason !== null) return fail({ code: "invalid-branch-name", message: `invalid branch name: ${reason}` });
    const gated = await gate(root);
    if (!gated.ok) return fail(gated.error);
    const actualRoot = await repoRoot(gated.canonical, signal);
    if (actualRoot === null) return fail({ code: "internal", message: "not a git repository" });
    const fmt = await runGit(["check-ref-format", "--branch", name], actualRoot);
    if (fmt.exitCode !== 0) return fail({ code: "invalid-branch-name", message: fmt.stderr.trim() || "invalid branch name" });
    const exists = await runGit(["rev-parse", "--verify", "--quiet", `refs/heads/${name}`], actualRoot);
    if (exists.exitCode === 0) return fail({ code: "branch-already-exists", message: `branch "${name}" already exists` });
    const inProgress = await hasOperationInProgress(actualRoot, signal);
    if (inProgress) return fail({ code: "operation-in-progress", message: "a git operation is in progress" });
    const created = await runGit(["switch", "--no-guess", "-c", name], actualRoot, signal);
    if (created.exitCode === 0) return ok({ branch: name });
    return fail({ code: "internal", message: created.stderr.trim().split("\n")[0] || "git create failed" });
  }

  // ---- route handlers ----
  const handlePost = async (req, res) => {
    if (!req.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
      res.writeHead(415); res.end(); return;
    }
    const payload = await readBody(req);
    const path = pathOf(payload);
    if (path === null) { json(res, fail({ code: "internal", message: "malformed request" })); return; }
    const gated = await gate(path);
    if (!gated.ok) { json(res, fail(gated.error)); return; }
    const root = await repoRoot(gated.canonical);
    if (root === null) { json(res, fail({ code: "internal", message: "not a git repository" })); return; }

    const pathname = new URL(req.url ?? "/", "http://x").pathname;
    switch (pathname) {
      case "/git/status": {
        const signal = new AbortController();
        const timeout = setTimeout(() => signal.abort(), 15000);
        try {
          const [branch, head, counts, inProgress] = await Promise.all([
            getBranch(root, signal.signal),
            getHeadShort(root, signal.signal),
            getStatusCounts(root, signal.signal),
            hasOperationInProgress(root, signal.signal),
          ]);
          json(res, ok({
            root: gated.canonical,
            branch,
            head,
            dirtyFiles: counts.dirtyFiles,
            untrackedFiles: counts.untrackedFiles,
            conflicts: counts.conflicts,
            operationInProgress: inProgress,
          }));
        } catch (e) {
          json(res, fail({ code: "internal", message: String(e.message ?? e) }));
        } finally { clearTimeout(timeout); }
        return;
      }
      case "/git/branches": {
        try {
          const [branch, head, counts, inProgress, branches] = await Promise.all([
            getBranch(root),
            getHeadShort(root),
            getStatusCounts(root),
            hasOperationInProgress(root),
            getBranches(root),
          ]);
          json(res, ok({
            root: gated.canonical,
            branch,
            head,
            dirtyFiles: counts.dirtyFiles,
            untrackedFiles: counts.untrackedFiles,
            conflicts: counts.conflicts,
            operationInProgress: inProgress,
            branches: branches.map((b) => ({ name: b.name, current: b.current })),
          }));
        } catch (e) {
          json(res, fail({ code: "internal", message: String(e.message ?? e) }));
        }
        return;
      }
      case "/git/graph": {
        const rawLimit = typeof payload === "object" && payload !== null
          ? Number(payload.limit) : undefined;
        const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 1000) : 200;
        try {
          const [branch, graph] = await Promise.all([
            getBranch(root),
            getGraph(root, limit),
          ]);
          json(res, ok({
            root: gated.canonical,
            branch,
            commits: graph.commits,
            hasMore: graph.hasMore,
          }));
        } catch (e) {
          json(res, fail({ code: "internal", message: String(e.message ?? e) }));
        }
        return;
      }
      case "/git/switch": {
        const branch = typeof payload === "object" && payload !== null
          ? payload.branch : undefined;
        if (typeof branch !== "string" || branch === "") {
          json(res, fail({ code: "internal", message: "branch required" })); return;
        }
        const result = await switchBranch(gated.canonical, branch);
        json(res, result.ok ? ok(result.value) : fail(result.error));
        return;
      }
      case "/git/create-branch": {
        const name = typeof payload === "object" && payload !== null
          ? payload.name : undefined;
        if (typeof name !== "string" || name === "") {
          json(res, fail({ code: "internal", message: "name required" })); return;
        }
        const result = await createBranch(path, name);
        json(res, result.ok ? ok(result.value) : fail(result.error));
        return;
      }
      default:
        res.writeHead(404); res.end();
    }
  };

  const sseHandler = (req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    const path = url.searchParams.get("path");
    if (path === null || path === "") { res.writeHead(400); res.end(); return; }
    res.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache",
      connection: "keep-alive",
    });
    res.write("retry: 2000\n\n");
    const subscriber = { path, last: "", res };
    subscribers.add(subscriber);
    res.on("error", () => { subscribers.delete(subscriber); if (subscribers.size === 0) stopPoll(); });
    req.on("close", () => { subscribers.delete(subscriber); if (subscribers.size === 0) stopPoll(); });
    if (pollTimer === null) startPoll();
  };

  function startPoll() {
    pollTimer = setInterval(async () => {
      if (subscribers.size === 0) { stopPoll(); return; }
      await Promise.all([...subscribers].map(async (sub) => {
        try {
          const gated = await gate(sub.path);
          if (!gated.ok) return;
          const root = await repoRoot(gated.canonical);
          if (root === null) return;
          const [branch, head] = await Promise.all([getBranch(root), getHeadShort(root)]);
          const key = `${root}|${branch}|${head}`;
          if (key === sub.last) return;
          sub.last = key;
          sub.res.write(`event: change\ndata: ${JSON.stringify({ path: sub.path, status: { root, branch, head } })}\n\n`);
        } catch { /* poll error */ }
      }));
    }, 30000);
    heartbeatTimer = setInterval(() => {
      for (const sub of subscribers) sub.res.write(": ping\n\n");
    }, 15000);
  }

  function stopPoll() {
    if (pollTimer !== null) { clearInterval(pollTimer); pollTimer = null; }
    if (heartbeatTimer !== null) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
  }

  // ---- register routes ----
  pluginCtx.effect(() => {
    const d1 = pluginCtx.webServer.register({ kind: "prefix", path: "/git", handler: handlePost });
    const d2 = pluginCtx.webServer.register({ kind: "exact", path: "/git/events", handler: sseHandler });
    return () => {
      d1(); d2(); stopPoll();
      for (const sub of subscribers) { try { sub.res.end(); } catch {} }
      subscribers.clear();
    };
  }, "dsh-git-graph: /git routes");
}
