/**
 * dsh-git-graph — browser half.
 *
 * Injects a branch chip above the composer and a branch-picker popover.
 * Shows a compact commit graph using ASCII art in a slide-out panel.
 *
 * Features:
 *   - Status chip: branch name + dirty/untracked/conflict counts
 *   - Branch picker: list of local branches, current marked with ●
 *   - Switch branch on click (with loading state + error toast)
 *   - Commit graph: last 200 commits, ASCII lane visualization
 *   - SSE-based auto-refresh on branch/head change
 */
window.__ModuleLoader__.load({
  id: "dsh-git-graph",
  factory: function(require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // ---- CSS ----
    var CSS_ID = "dsh-git-graph/styles.css";
    if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + CSS_ID + '"]') === null) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-git-graph";
      tag.dataset.pluginCss = CSS_ID;
      tag.textContent = [
        /* chip */
        ".dg-graph-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:8px;background:rgba(76,141,255,.12);border:1px solid rgba(76,141,255,.3);cursor:pointer;font-size:12px;color:var(--dsw-alias-label-primary,#e8e8ea);user-select:none;position:relative;z-index:100;transition:background .15s}",
        ".dg-graph-chip:hover{background:rgba(76,141,255,.22)}",
        ".dg-graph-chip .dg-branch{font-weight:600;color:var(--dsw-alias-accent-primary,#4c8dff)}",
        ".dg-graph-chip .dg-badge{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;padding:0 4px;border-radius:8px;font-size:10px;font-weight:700}",
        ".dg-graph-chip .dg-badge.dirty{background:rgba(242,178,76,.2);color:#f2b24c}",
        ".dg-graph-chip .dg-badge.untracked{background:rgba(100,181,246,.15);color:#64b5f6}",
        ".dg-graph-chip .dg-badge.conflict{background:rgba(242,109,109,.2);color:#f26d6d}",
        ".dg-graph-chip .dg-spin{animation:dgs-spin .8s linear infinite;display:inline-block}",
        "@keyframes dgs-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}",
        /* picker popover */
        ".dg-picker-overlay{position:fixed;inset:0;z-index:99998}",
        ".dg-picker-popover{position:absolute;top:calc(100% + 6px);left:0;width:320px;max-height:400px;overflow-y:auto;background:var(--dsw-alias-bg-primary,#202127);border:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.12));border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.5);z-index:10000;display:flex;flex-direction:column}",
        ".dg-picker-header{padding:10px 12px 8px;border-bottom:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.08));display:flex;align-items:center;justify-content:space-between;flex-shrink:0}",
        ".dg-picker-title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,#e8e8ea)}",
        ".dg-picker-close{background:none;border:none;color:var(--dsw-alias-label-tertiary,#9a9aa2);cursor:pointer;font-size:16px;padding:2px 6px;border-radius:6px;line-height:1}",
        ".dg-picker-close:hover{background:rgba(255,255,255,.08);color:var(--dsw-alias-label-primary,#e8e8ea)}",
        ".dg-picker-list{flex:1;overflow-y:auto;padding:4px 0}",
        ".dg-picker-item{display:flex;align-items:center;gap:8px;padding:6px 12px;cursor:pointer;font-size:12px;color:var(--dsw-alias-label-secondary,#b6b6bd);transition:background .1s}",
        ".dg-picker-item:hover{background:rgba(255,255,255,.06);color:var(--dsw-alias-label-primary,#e8e8ea)}",
        ".dg-picker-item.current{color:var(--dsw-alias-accent-primary,#4c8dff);font-weight:600;background:rgba(76,141,255,.08)}",
        ".dg-picker-item .dg-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}",
        ".dg-picker-empty{padding:20px;text-align:center;color:var(--dsw-alias-label-tertiary,#9a9aa2);font-size:12px}",
        ".dg-picker-create{padding:8px 12px;border-top:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.08));display:flex;gap:8px;flex-shrink:0}",
        ".dg-picker-create input{flex:1;background:rgba(255,255,255,.06);border:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.12));border-radius:8px;padding:6px 10px;color:var(--dsw-alias-label-primary,#e8e8ea);font-size:12px;outline:none}",
        ".dg-picker-create input:focus{border-color:var(--dsw-alias-accent-primary,#4c8dff)}",
        ".dg-picker-create button{background:var(--dsw-alias-accent-primary,#4c8dff);border:none;border-radius:8px;padding:6px 12px;color:#fff;font-size:12px;cursor:pointer;white-space:nowrap}",
        ".dg-picker-create button:hover{background:var(--dsw-alias-accent-hover,#3d7bef)}",
        /* graph panel */
        ".dg-graph-panel{position:fixed;top:60px;right:12px;width:520px;max-height:calc(100vh - 80px);background:var(--dsw-alias-bg-primary,#202127);border:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.12));border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.5);z-index:9999;display:flex;flex-direction:column;overflow:hidden}",
        ".dg-graph-panel-header{padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-primary,rgba(255,255,255,.08));display:flex;align-items:center;justify-content:space-between;flex-shrink:0}",
        ".dg-graph-panel-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,#e8e8ea);display:flex;align-items:center;gap:8px}",
        ".dg-graph-panel-title .dg-branch{color:var(--dsw-alias-accent-primary,#4c8dff)}",
        ".dg-graph-panel-close{background:none;border:none;color:var(--dsw-alias-label-tertiary,#9a9aa2);cursor:pointer;font-size:18px;padding:2px 6px;border-radius:6px;line-height:1}",
        ".dg-graph-panel-close:hover{background:rgba(255,255,255,.08);color:var(--dsw-alias-label-primary,#e8e8ea)}",
        ".dg-graph-scroll{flex:1;overflow-y:auto;padding:12px 16px;font-family:'JetBrains Mono','Fira Code','Cascadia Code',monospace;font-size:11px;line-height:1.6;color:var(--dsw-alias-label-secondary,#b6b6bd)}",
        ".dg-graph-scroll::-webkit-scrollbar{width:6px}",
        ".dg-graph-scroll::-webkit-scrollbar-track{background:transparent}",
        ".dg-graph-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}",
        ".dg-graph-row{white-space:pre;display:flex;align-items:flex-start;gap:0}",
        ".dg-graph-lanes{color:var(--dsw-alias-label-tertiary,#9a9aa2);flex-shrink:0}",
        ".dg-graph-node{color:var(--dsw-alias-accent-primary,#4c8dff);font-weight:700}",
        ".dg-graph-merge{color:#f2b24c;font-weight:700}",
        ".dg-graph-pass{color:var(--dsw-alias-label-tertiary,#9a9aa2)}",
        ".dg-graph-gap{color:transparent}",
        ".dg-graph-subject{color:var(--dsw-alias-label-secondary,#b6b6bd)}",
        ".dg-graph-refs{color:#5ec98f;margin-left:6px}",
        ".dg-graph-more{text-align:center;padding:8px;color:var(--dsw-alias-label-tertiary,#9a9aa2);font-size:11px;cursor:pointer}",
        ".dg-graph-more:hover{color:var(--dsw-alias-accent-primary,#4c8dff)}",
        ".dg-graph-empty{text-align:center;padding:32px;color:var(--dsw-alias-label-tertiary,#9a9aa2);font-size:13px}",
        /* toast */
        ".dg-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:10px;font-size:13px;z-index:99999;animation:dgs-fadein .2s ease}",
        ".dg-toast.success{background:rgba(94,201,143,.15);color:#5ec98f;border:1px solid rgba(94,201,143,.3)}",
        ".dg-toast.error{background:rgba(242,109,109,.15);color:#f26d6d;border:1px solid rgba(242,109,109,.3)}",
        "@keyframes dgs-fadein{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}",
        /* loading skeleton */
        ".dg-skeleton{height:14px;background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%);background-size:200% 100%;animation:dgs-shimmer 1.5s infinite;border-radius:4px}"
      ].join("\n");
      document.head.appendChild(tag);
    }

    // ---- state ----
    var currentStatus = null;
    var pickerOpen = false;
    var graphOpen = false;
    var pickerEl = null;
    var graphEl = null;
    var chipEl = null;
    var sseEventSource = null;
    var refreshTimer = null;
    var graphCommits = null;
    var graphHasMore = false;
    var graphExpanded = false;
    var disposeFn = null;

    // ---- helpers ----
    function esc(s) {
      return String(s).replace(/[&<>"']/g, function(c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function fmtTime(ts) {
      if (!ts || ts === 0) return "";
      var d = new Date(ts * 1000);
      var now = Date.now() / 1000;
      var diff = now - ts;
      if (diff < 60) return "just now";
      if (diff < 3600) return Math.floor(diff / 60) + "m ago";
      if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
      if (diff < 604800) return Math.floor(diff / 86400) + "d ago";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    function toast(msg, type) {
      var existing = document.querySelector(".dg-toast");
      if (existing) existing.remove();
      var t = document.createElement("div");
      t.className = "dg-toast " + (type || "success");
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(function() { if (t.parentNode) t.remove(); }, 3000);
    }

    function showChip() {
      if (chipEl) return;
      chipEl = document.createElement("div");
      chipEl.className = "dg-graph-chip";
      chipEl.title = "点击选择分支 / 查看提交图谱";
      chipEl.addEventListener("click", function(e) {
        e.stopPropagation();
        if (graphOpen) return;
        togglePicker();
      });
      document.body.appendChild(chipEl);
    }

    function hideChip() {
      if (chipEl) { chipEl.remove(); chipEl = null; }
    }

    function renderChip(status) {
      if (!chipEl) return;
      if (!status) {
        chipEl.innerHTML = '<span class="dg-spin">⟳</span>';
        return;
      }
      var parts = [];
      parts.push('<span class="dg-branch">' + esc(status.branch || "(detached)") + '</span>');
      if (status.dirtyFiles > 0) {
        parts.push('<span class="dg-badge dirty">' + status.dirtyFiles + '</span>');
      }
      if (status.untrackedFiles > 0) {
        parts.push('<span class="dg-badge untracked">' + status.untrackedFiles + '</span>');
      }
      if (status.conflicts > 0) {
        parts.push('<span class="dg-badge conflict">!</span>');
      }
      chipEl.innerHTML = parts.join("");
    }

    // ---- picker ----
    function togglePicker() {
      if (graphOpen) return;
      if (pickerOpen) { closePicker(); return; }
      openPicker();
    }

    function openPicker() {
      pickerOpen = true;
      var overlay = document.createElement("div");
      overlay.className = "dg-picker-overlay";
      overlay.addEventListener("click", closePicker);
      document.body.appendChild(overlay);

      var popover = document.createElement("div");
      popover.className = "dg-picker-popover";
      popover.style.position = "fixed";
      popover.style.top = "60px";
      popover.style.left = "50%";
      popover.style.transform = "translateX(-50%)";
      popover.style.width = "360px";
      document.body.appendChild(popover);
      pickerEl = popover;

      var header = document.createElement("div");
      header.className = "dg-picker-header";
      header.innerHTML = '<span class="dg-picker-title">分支</span>';
      var closeBtn = document.createElement("button");
      closeBtn.className = "dg-picker-close";
      closeBtn.textContent = "✕";
      closeBtn.addEventListener("click", closePicker);
      header.appendChild(closeBtn);
      popover.appendChild(header);

      var list = document.createElement("div");
      list.className = "dg-picker-list";
      list.innerHTML = '<div class="dg-skeleton" style="height:14px;margin:8px 12px"></div><div class="dg-skeleton" style="height:14px;margin:8px 12px;width:60%"></div>';
      popover.appendChild(list);

      fetchBranches().then(function(branches) {
        if (!pickerOpen) return;
        list.innerHTML = "";
        if (!branches || branches.length === 0) {
          list.innerHTML = '<div class="dg-picker-empty">未找到本地分支</div>';
          return;
        }
        for (var i = 0; i < branches.length; i++) {
          (function(b) {
            var item = document.createElement("div");
            item.className = "dg-picker-item" + (b.current ? " current" : "");
            item.innerHTML = (b.current ? '<span class="dg-dot"></span>' : '<span style="width:6px;display:inline-block"></span>') + esc(b.name);
            item.addEventListener("click", function() { switchBranch(b.name); });
            list.appendChild(item);
          })(branches[i]);
        }
      }).catch(function(err) {
        list.innerHTML = '<div class="dg-picker-empty">加载失败: ' + esc(String(err)) + '</div>';
      });

      var createBar = document.createElement("div");
      createBar.className = "dg-picker-create";
      var input = document.createElement("input");
      input.placeholder = "新建分支名…";
      var btn = document.createElement("button");
      btn.textContent = "+ 新建";
      btn.addEventListener("click", function() {
        var name = input.value.trim();
        if (!name) return;
        createBranch(name);
        input.value = "";
      });
      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          var name = input.value.trim();
          if (name) createBranch(name);
          input.value = "";
        }
      });
      createBar.appendChild(input);
      createBar.appendChild(btn);
      popover.appendChild(createBar);
    }

    function closePicker() {
      pickerOpen = false;
      if (pickerEl) { pickerEl.remove(); pickerEl = null; }
      var overlay = document.querySelector(".dg-picker-overlay");
      if (overlay) overlay.remove();
    }

    // ---- graph panel ----
    function toggleGraph() {
      if (pickerOpen) return;
      if (graphOpen) { closeGraph(); return; }
      openGraph();
    }

    function openGraph() {
      graphOpen = true;
      graphExpanded = false;
      var panel = document.createElement("div");
      panel.className = "dg-graph-panel";
      document.body.appendChild(panel);
      graphEl = panel;

      var header = document.createElement("div");
      header.className = "dg-graph-panel-header";
      var title = document.createElement("span");
      title.className = "dg-graph-panel-title";
      title.id = "dg-graph-title";
      var closeBtn = document.createElement("button");
      closeBtn.className = "dg-graph-panel-close";
      closeBtn.textContent = "✕";
      closeBtn.addEventListener("click", closeGraph);
      header.appendChild(title);
      header.appendChild(closeBtn);
      panel.appendChild(header);

      var scroll = document.createElement("div");
      scroll.className = "dg-graph-scroll";
      scroll.id = "dg-graph-scroll";
      panel.appendChild(scroll);

      fetchGraph(200).then(function(result) {
        renderGraph(result.commits, result.hasMore);
      });
    }

    function closeGraph() {
      graphOpen = false;
      graphExpanded = false;
      if (graphEl) { graphEl.remove(); graphEl = null; }
    }

    function renderGraph(commits, hasMore) {
      var scroll = document.getElementById("dg-graph-scroll");
      if (!scroll) return;
      scroll.innerHTML = "";
      if (!commits || commits.length === 0) {
        scroll.innerHTML = '<div class="dg-graph-empty">暂无提交记录</div>';
        return;
      }

      // Compute lanes
      var later = {};
      for (var i = 0; i < commits.length; i++) {
        var c = commits[i];
        for (var j = 0; j < c.parents.length; j++) {
          later[c.parents[j]] = true;
        }
      }

      var lanes = [];
      var laneRows = [];
      for (var i = 0; i < commits.length; i++) {
        var commit = commits[i];
        var nodeCol = -1;
        for (var j = 0; j < lanes.length; j++) {
          if (lanes[j] === commit.oid) { nodeCol = j; break; }
        }
        if (nodeCol === -1) {
          lanes.push(commit.oid);
          nodeCol = lanes.length - 1;
        }
        var columns = [];
        for (var j = 0; j < lanes.length; j++) {
          var pending = lanes[j];
          if (pending === null) columns.push("gap");
          else if (j === nodeCol) columns.push(commit.parents.length > 1 ? "merge" : "node");
          else if (pending === commit.oid) columns.push("gap");
          else if (later[pending]) columns.push("pass");
          else columns.push("gap");
        }
        var parents = commit.parents.filter(function(p) { return later[p]; });
        var first = parents[0];
        var rest = parents.slice(1);
        for (var j = 0; j < lanes.length; j++) {
          if (lanes[j] === commit.oid && j !== nodeCol) lanes[j] = null;
        }
        lanes[nodeCol] = first || null;
        for (var k = 0; k < rest.length; k++) {
          if (lanes.indexOf(rest[k]) === -1) lanes.push(rest[k]);
        }
        while (lanes.length > 0 && lanes[lanes.length - 1] === null) lanes.pop();
        laneRows.push({ columns: columns, nodeColumn: nodeCol, merge: commit.parents.length > 1 });
      }

      var maxCols = 0;
      for (var i = 0; i < laneRows.length; i++) {
        if (laneRows[i].columns.length > maxCols) maxCols = laneRows[i].columns.length;
      }

      // Pad columns
      for (var i = 0; i < laneRows.length; i++) {
        while (laneRows[i].columns.length < maxCols) laneRows[i].columns.push("gap");
      }

      // Render rows (reverse so newest is on top)
      var fragment = document.createDocumentFragment();
      for (var i = laneRows.length - 1; i >= 0; i--) {
        var row = laneRows[i];
        var commit = commits[i];
        var rowEl = document.createElement("div");
        rowEl.className = "dg-graph-row";

        var laneStr = "";
        for (var j = 0; j < row.columns.length; j++) {
          var glyph = row.columns[j];
          if (glyph === "node") {
            laneStr += '<span class="dg-graph-node">●</span>';
          } else if (glyph === "merge") {
            laneStr += '<span class="dg-graph-merge">●</span>';
          } else if (glyph === "pass") {
            laneStr += '<span class="dg-graph-pass">│</span>';
          } else {
            laneStr += '<span class="dg-graph-gap"> </span>';
          }
        }
        rowEl.innerHTML = '<span class="dg-graph-lanes">' + laneStr + '</span>';

        var refStr = "";
        if (commit.refs && commit.refs.length > 0) {
          refStr = '<span class="dg-graph-refs">[' + commit.refs.join(",") + ']</span>';
        }
        var timeStr = fmtTime(commit.authorTime);
        rowEl.appendChild(document.createTextNode(" " + commit.oid.slice(0, 7) + " " + esc(commit.subject) + refStr + (timeStr ? "  " + timeStr : "")));
        fragment.appendChild(rowEl);
      }
      scroll.appendChild(fragment);

      // "Load more" button
      if (hasMore && !graphExpanded) {
        var more = document.createElement("div");
        more.className = "dg-graph-more";
        more.textContent = "加载更多提交…";
        more.addEventListener("click", function() {
          graphExpanded = true;
          more.remove();
          fetchGraph(500).then(function(result) {
            // append new rows
            var newFragment = document.createDocumentFragment();
            var allCommits = result.commits;
            var later2 = {};
            for (var i = 0; i < allCommits.length; i++) {
              for (var j = 0; j < allCommits[i].parents.length; j++) {
                later2[allCommits[i].parents[j]] = true;
              }
            }
            var lanes2 = [];
            var laneRows2 = [];
            for (var i = 0; i < allCommits.length; i++) {
              var c = allCommits[i];
              var nc = -1;
              for (var j = 0; j < lanes2.length; j++) { if (lanes2[j] === c.oid) { nc = j; break; } }
              if (nc === -1) { lanes2.push(c.oid); nc = lanes2.length - 1; }
              var cols = [];
              for (var j = 0; j < lanes2.length; j++) {
                var p = lanes2[j];
                if (p === null) cols.push("gap");
                else if (j === nc) cols.push(c.parents.length > 1 ? "merge" : "node");
                else if (p === c.oid) cols.push("gap");
                else if (later2[p]) cols.push("pass");
                else cols.push("gap");
              }
              var ps = c.parents.filter(function(x) { return later2[x]; });
              var first = ps[0], rest = ps.slice(1);
              for (var j = 0; j < lanes2.length; j++) { if (lanes2[j] === c.oid && j !== nc) lanes2[j] = null; }
              lanes2[nc] = first || null;
              for (var k = 0; k < rest.length; k++) { if (lanes2.indexOf(rest[k]) === -1) lanes2.push(rest[k]); }
              while (lanes2.length > 0 && lanes2[lanes2.length - 1] === null) lanes2.pop();
              laneRows2.push({ columns: cols, nodeColumn: nc, merge: c.parents.length > 1 });
            }
            var maxC = 0;
            for (var i = 0; i < laneRows2.length; i++) { if (laneRows2[i].columns.length > maxC) maxC = laneRows2[i].columns.length; }
            for (var i = 0; i < laneRows2.length; i++) { while (laneRows2[i].columns.length < maxC) laneRows2[i].columns.push("gap"); }
            for (var i = laneRows2.length - 1; i >= 0; i--) {
              var r = laneRows2[i];
              var cm = allCommits[i];
              var rowEl2 = document.createElement("div");
              rowEl2.className = "dg-graph-row";
              var ls2 = "";
              for (var j = 0; j < r.columns.length; j++) {
                var g = r.columns[j];
                if (g === "node") ls2 += '<span class="dg-graph-node">●</span>';
                else if (g === "merge") ls2 += '<span class="dg-graph-merge">●</span>';
                else if (g === "pass") ls2 += '<span class="dg-graph-pass">│</span>';
                else ls2 += '<span class="dg-graph-gap"> </span>';
              }
              rowEl2.innerHTML = '<span class="dg-graph-lanes">' + ls2 + '</span>';
              var rs2 = cm.refs && cm.refs.length > 0 ? '<span class="dg-graph-refs">[' + cm.refs.join(",") + ']</span>' : "";
              rowEl2.appendChild(document.createTextNode(" " + cm.oid.slice(0, 7) + " " + esc(cm.subject) + rs2));
              newFragment.appendChild(rowEl2);
            }
            scroll.insertBefore(newFragment, scroll.firstChild);
          });
        });
        scroll.appendChild(more);
      }

      // Update title
      var titleEl = document.getElementById("dg-graph-title");
      if (titleEl && currentStatus) {
        titleEl.innerHTML = '提交图谱 <span class="dg-branch">(' + esc(currentStatus.branch || "HEAD") + ')</span>';
      }
    }

    function renderGraphTitle() {
      var titleEl = document.getElementById("dg-graph-title");
      if (titleEl && currentStatus) {
        titleEl.innerHTML = '提交图谱 <span class="dg-branch">(' + esc(currentStatus.branch || "HEAD") + ')</span>';
      }
    }

    // ---- API calls ----
    function fetchStatus() {
      return fetch("/git/status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: getCurrentWorkspacePath() })
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.ok) {
          currentStatus = data.value;
          renderChip(currentStatus);
          renderGraphTitle();
        } else {
          currentStatus = null;
          renderChip(null);
        }
      }).catch(function() {
        currentStatus = null;
        renderChip(null);
      });
    }

    function fetchBranches() {
      return fetch("/git/branches", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: getCurrentWorkspacePath() })
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.ok && data.value.branches) return data.value.branches;
        return [];
      }).catch(function() { return []; });
    }

    function fetchGraph(limit) {
      return fetch("/git/graph", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: getCurrentWorkspacePath(), limit: limit })
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.ok) return data.value;
        return { commits: [], hasMore: false };
      }).catch(function() { return { commits: [], hasMore: false }; });
    }

    function switchBranch(branch) {
      closePicker();
      var chip = chipEl;
      if (chip) chip.innerHTML = '<span class="dg-spin">⟳</span>';
      fetch("/git/switch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: getCurrentWorkspacePath(), branch: branch })
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.ok) {
          toast("已切换到 " + branch, "success");
          refreshStatus();
          if (graphOpen) {
            fetchGraph(200).then(function(result) { renderGraph(result.commits, result.hasMore); });
          }
        } else {
          toast("切换失败: " + (data.error && data.error.message ? data.error.message : "未知错误"), "error");
          fetchStatus();
        }
      }).catch(function() {
        toast("网络错误", "error");
        fetchStatus();
      });
    }

    function createBranch(name) {
      closePicker();
      fetch("/git/create-branch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: getCurrentWorkspacePath(), name: name })
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.ok) {
          toast("已创建并切换到 " + name, "success");
          fetchStatus();
        } else {
          toast("创建失败: " + (data.error && data.error.message ? data.error.message : "未知错误"), "error");
        }
      }).catch(function() {
        toast("网络错误", "error");
      });
    }

    function getCurrentWorkspacePath() {
      try {
        var ctx = window.__dsh_context__;
        if (ctx && ctx.workspace) return ctx.workspace.path || ctx.workspace;
      } catch {}
      // Fallback: try to get from URL or DOM
      var urlParams = new URLSearchParams(window.location.search);
      var wp = urlParams.get("workspace");
      if (wp) return wp;
      return "";
    }

    function refreshStatus() {
      fetchStatus().catch(function() {});
    }

    // ---- SSE ----
    function startSSE() {
      stopSSE();
      var path = getCurrentWorkspacePath();
      if (!path) return;
      var es = new EventSource("/git/events?path=" + encodeURIComponent(path));
      es.addEventListener("change", function(e) {
        try {
          var data = JSON.parse(e.data);
          if (data.status) {
            currentStatus = data.status;
            renderChip(currentStatus);
            renderGraphTitle();
          }
        } catch {}
      });
      es.onerror = function() { stopSSE(); };
      sseEventSource = es;
    }

    function stopSSE() {
      if (sseEventSource) { sseEventSource.close(); sseEventSource = null; }
    }

    // ---- chip click routing ----
    function handleChipClick(e) {
      e.stopPropagation();
      if (graphOpen) return;
      if (pickerOpen) { closePicker(); return; }
      // 50/50 between picker and graph for simplicity; or check modifier
      if (e.shiftKey) {
        toggleGraph();
      } else {
        togglePicker();
      }
    }

    // ---- plugin entry ----
    function apply(clientCtx) {
      showChip();
      fetchStatus();
      startSSE();

      // Attach chip click listener via document capture
      document.addEventListener("click", function(e) {
        if (chipEl && chipEl.contains(e.target)) {
          handleChipClick(e);
        } else if (pickerOpen && pickerEl && !pickerEl.contains(e.target)) {
          closePicker();
        }
      }, true);

      // Refresh on window focus
      window.addEventListener("focus", function() { refreshStatus(); });

      disposeFn = function() {
        stopSSE();
        hideChip();
        closePicker();
        if (graphOpen) closeGraph();
      };
    }

    exports.apply = apply;
    exports.inject = [];
    return module.exports;
  }
});
