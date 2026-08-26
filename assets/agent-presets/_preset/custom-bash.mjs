/**
 * custom-bash — a Windows-capable `bash` tool that registers under the SAME
 * name (`bash`) as the official persistent bash, with a Minimal-compatible
 * description, but executes through `ctx.subprocess.spawn` instead of a PTY.
 *
 * WHY: DeepSeek's first-request trajectory anchor keys on the tool SCHEMA
 * matching the RL training distribution (issue #11: persistent
 * bash + str_replace_editor anchored 5/5 at maxTokens=256000, pwsh/read
 * 8/8 standard-like). The official persistent bash uses a PTY, and DSH's PTY
 * backend is linux/darwin-only — `subprocess-local` throws "terminal
 * inspection is unsupported on platform win32". A custom tool that presents
 * the same name and a Minimal-like description but spawns Git Bash through
 * the ordinary (cross-platform) subprocess seam keeps the schema anchor
 * without the PTY dependency.
 *
 * Executable resolution (config `bashPath`):
 *  - explicit absolute path (e.g. `C:\Program Files\Git\bin\bash.exe`), or
 *  - `bash` resolved through `ctx.subprocess.resolveExecutable` (PATH lookup).
 *
 * Semantics mirror the official bash tool: `bash -c <command>` in a fresh
 * process, bounded output, non-zero exit reported not thrown. No sandbox
 * confinement on Windows (the sandbox backend is linux-only); the tool
 * description says so. The bootstrap catalog pairs this with
 * `str_replace_editor` (Minimal's two tools).
 *
 * Timeout & auto-retry (config `timeoutMs` / `maxRetries`):
 *  The official persistent bash enforces a 5-minute tool timeout; here it was
 *  computed but never wired up, so a hung/runaway command could run
 *  indefinitely (a real 526-minute stall). Each attempt is now bounded by
 *  `timeoutMs` (default 600000ms = 10min, matching nothing is ever left to
 *  hang) — on timeout the process tree is terminated and the command is
 *  automatically re-run, up to `maxRetries` extra attempts (default 2). Only
 *  when retries are exhausted does the tool throw, carrying the partial output
 *  collected so far so the model can see where it stalled. A non-zero exit is
 *  still a reported failure, NOT a timeout, and is not retried.
 *
 * NOTE: retrying re-runs the command from scratch in a fresh shell. For
 * non-idempotent commands (DB migrations, deploy steps) that can double-apply;
 * set `maxRetries: 0` in the preset config to disable auto-retry entirely.
 */

/** Cordis plugin name used by loader diagnostics. */
export const name = 'custom-bash'

/** The subprocess and tools services must exist before this tool can register. */
export const inject = ['subprocess', 'tools']

const DEFAULT_TIMEOUT_MS = 600000
const DEFAULT_MAX_RETRIES = 2
const DEFAULT_MAX_OUTPUT_BYTES = 64000

/** Tool parameter schema for the model-facing command. */
const commandSchema = {
  type: 'object',
  properties: {
    command: {
      type: 'string',
      description: 'The bash command to execute (`bash -c` string domain).',
    },
    workdir: {
      type: 'string',
      description: 'Optional working directory; defaults to the session cwd.',
    },
  },
  required: ['command'],
  additionalProperties: false,
}

/** Register the model-facing `bash` tool. */
export function apply(ctx, config) {
  const bashPath = typeof config?.bashPath === 'string' && config.bashPath.length > 0 ? config.bashPath : 'bash'
  const timeoutMs = Number.isSafeInteger(config?.timeoutMs) && config.timeoutMs > 0 ? config.timeoutMs : DEFAULT_TIMEOUT_MS
  const maxRetries = Number.isSafeInteger(config?.maxRetries) && config.maxRetries >= 0 ? config.maxRetries : DEFAULT_MAX_RETRIES
  const maxOutputBytes = Number.isSafeInteger(config?.maxOutputBytes) && config.maxOutputBytes > 0 ? config.maxOutputBytes : DEFAULT_MAX_OUTPUT_BYTES
  const timeoutSec = Math.round(timeoutMs / 1000)

  ctx.tools.register({
    name: 'bash',
    description: [
      'Run commands in a bash shell (Git Bash on Windows)',
      '* When invoking this tool, the contents of the "command" parameter does NOT need to be XML-escaped.',
      "* You don't have access to the internet via this tool.",
      '* You do have access to a mirror of common linux and python packages via apt and pip.',
      '* State does NOT persist across command calls: each call runs in a fresh shell.',
      "* To inspect a particular line range of a file, e.g. lines 10-25, try 'sed -n 10,25p /path/to/the/file'.",
      '* Please avoid commands that may produce a very large amount of output.',
      `* Each call is bounded by a ${timeoutSec}s timeout; a call that runs out of time is killed and automatically retried a few times, then fails with its partial output.`,
      '* Please run long lived commands in the background, e.g. \'sleep 10 &\' or start a server in the background.',
      '* NOTE: runs without OS sandbox confinement on Windows (no landlock); treat output as untrusted.',
    ].join('\n'),
    parameters: commandSchema,
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      render: (_args, value) => [{ type: 'text', text: value.text }],
    },
    timeoutMs,
    async execute(args, exec) {
      const shell = await ctx.subprocess.resolveExecutable(bashPath, undefined, exec?.signal)
      const workdir = typeof args.workdir === 'string' && args.workdir.length > 0
        ? args.workdir
        : exec?.agent?.session?.header?.cwd
      const signal = exec?.signal

      const total = maxRetries + 1
      let lastPartial = ''
      for (let attempt = 1; attempt <= total; attempt++) {
        const handle = ctx.subprocess.spawn({
          argv: [shell, '-c', args.command],
          ...workdir !== undefined ? { cwd: workdir } : {},
          stdio: {
            stdin: 'ignore',
            stdout: { maxBytes: maxOutputBytes },
            stderr: { maxBytes: maxOutputBytes },
          },
          ...signal !== undefined ? { signal } : {},
          graceMs: 3000,
        })
        let timedOut = false
        const timer = setTimeout(() => {
          timedOut = true
          try {
            handle.terminate()
          } catch (_alreadyGone) {}
        }, timeoutMs)
        try {
          const outcome = await handle.done.catch((error) => {
            // A spawn-level failure (bad executable, EPERM) surfaces as a throw,
            // which the runtime turns into an isError result.
            throw new Error(`bash spawn failed: ${String(error)}`)
          })
          let stdout = ''
          let stderr = ''
          try {
            stdout = handle.collected.stdout.readFrom(0).text
            stderr = handle.collected.stderr.readFrom(0).text
          } catch {
            // Collected readers may be unavailable on some backends; tolerate.
          }
          const text = [stdout, stderr].filter((part) => part.length > 0).join('\n')

          if (timedOut) {
            lastPartial = text
            if (attempt < total) {
              console.warn(`[custom-bash] 命令超时(${timeoutSec}s)，自动重试 ${attempt}/${total}: ${args.command}`)
              continue
            }
            const tail = lastPartial.length > 0 ? lastPartial : '(无输出)'
            throw new Error(`bash 命令运行超时：${timeoutSec}s 内未完成，已自动重试 ${total} 次仍无结果，已终止进程树。\n已收集输出：\n${tail}`)
          }

          if (outcome.exitCode !== 0) {
            // Non-zero exit is a reported failure, not a throw candidate only
            // for the model-facing message; keep the existing contract.
            const tail = text.length > 0 ? text : `exit code: ${outcome.exitCode} (no output)`
            throw new Error(tail)
          }
          return { text }
        } finally {
          clearTimeout(timer)
        }
      }
      throw new Error('bash: unexpected retry exhaustion')
    },
  })
}