param()
#
# Client-updater scheduled-task bootstrap (v4.6.6).
#
# The Electron main process launches the real update helper through the
# Windows Task Scheduler (schtasks).  The target helper therefore:
#   - is NOT created with DETACHED_PROCESS  (powershell.exe silently dies on
#     console-init failure, v4.6.3 regression);
#   - is NOT a child of Electron's Job Object  (close kills it while it waits
#     for the app to exit, v4.6.4); it lives under the Schedule service.
# A separate DETACHED node relay failed the same way (v4.6.5) because the
# process it spawned inherited a broken environment.
#
# This script is the /tr of the scheduled task.  schtasks /tr is length
# limited (~261 chars with spaces), so the full helper command cannot fit
# (see previous boottest2 experiments).  Instead the task only starts THIS
# short ASCII bootstrap, which reads task-input.json next to itself and
# launches the real helper program with MSDN-compliant quoting.
#
# Pure ASCII is REQUIRED here: PowerShell 5.1 reads BOM-less .ps1 as ANSI and
# mangles multibyte characters, which would corrupt the script itself.
#
try {
  $bootLog = Join-Path $PSScriptRoot 'task-boot.log'
  function B([string]$m) {
    try { Add-Content -LiteralPath $bootLog -Value ("[" + (Get-Date -Format 'HH:mm:ss.fff') + "] " + $m) -Encoding UTF8 } catch {}
  }
  # MSDN CreateProcess quoting: reproduce arg as a single token (spaces/quotes/backslashes).
  function Q([string]$arg) {
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append('"')
    $bs = 0
    for ($i = 0; $i -lt $arg.Length; $i++) {
      $c = $arg[$i]
      if ($c -eq '\') { $bs++ }
      elseif ($c -eq '"') {
        [void]$sb.Append('\' * (2 * $bs)); [void]$sb.Append('\"'); $bs = 0
      } else {
        [void]$sb.Append('\' * $bs); [void]$sb.Append($c); $bs = 0
      }
    }
    [void]$sb.Append('\' * (2 * $bs))
    [void]$sb.Append('"')
    return $sb.ToString()
  }
  B 'boot start'
  $cfgPath = Join-Path $PSScriptRoot 'task-input.json'
  B ('cfgPath=' + $cfgPath + ' exists=' + (Test-Path -LiteralPath $cfgPath))
  $cfg = Get-Content -LiteralPath $cfgPath -Raw -Encoding UTF8 | ConvertFrom-Json
  B ('program=' + $cfg.program)
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = [string]$cfg.program
  $psi.UseShellExecute = $false
  $psi.WindowStyle = 'Hidden'
  $psi.CreateNoWindow = $true
  $argArr = @($cfg.arguments)
  $isCmd = ([IO.Path]::GetFileName([string]$cfg.program)).ToLower() -eq 'cmd.exe'
  if ($isCmd) {
    # cmd.exe /s /c: buildSpawnCommandLine already outputs double-quoted format
    # (e.g. ""script" "arg""), so raw join is correct — /s strips outer pair,
    # inner pair preserved for paths with spaces.
    $psi.Arguments = ($argArr -join ' ')
  } else {
    $quoted = @($argArr | ForEach-Object { Q ([string]$_) })
    $psi.Arguments = ($quoted -join ' ')
  }
  B ('isCmd=' + $isCmd + ' starting argcount=' + $argArr.Count + ' argsLineLen=' + $psi.Arguments.Length)
  $p = [System.Diagnostics.Process]::Start($psi)
  B ('started pid=' + $p.Id)
  $p.WaitForExit()
  B ('exited code=' + $p.ExitCode)
  # Self-cleaning: delete this one-shot scheduled task once the real helper has
  # been dispatched.  Runs as a (possibly brief) child of this bootstrap, OUTSIDE
  # the Electron Job Object, so it survives the main process exit regardless of
  # how quickly the app quits.  Helper keeps running as its own process.
  if ($cfg.taskName) {
    try {
      Start-Process -FilePath 'C:\Windows\System32\schtasks.exe' -ArgumentList ('/delete', '/tn', [string]$cfg.taskName, '/f') -WindowStyle Hidden
    } catch { B ('del task err: ' + $_.Exception.Message) }
  }
} catch {
  B ('ERROR: ' + $_.Exception.Message)
  exit 1
}