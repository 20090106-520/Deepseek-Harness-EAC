# Builds stay unsigned unless credentials exist; see docs/CODE_SIGNING.md.
param(
  [Parameter(Mandatory = $true)][string]$Certificate,
  [string]$Password,
  [string]$TimestampUrl = 'http://timestamp.digicert.com'
)

$ErrorActionPreference = 'Stop'

$signtool = Get-Command signtool.exe -ErrorAction SilentlyContinue
if (-not $signtool) {
  $kitsRoot = Join-Path ${env:ProgramFiles(x86)} 'Windows Kits\10\bin'
  if (Test-Path $kitsRoot) {
    $candidate = Get-ChildItem $kitsRoot -Directory |
      Where-Object { $_.Name -match '^\d+\.\d+\.\d+\.\d+$' } |
      Sort-Object Name -Descending | Select-Object -First 1
    if ($candidate) {
      $tool = Join-Path $candidate.FullName 'x64\signtool.exe'
      if (Test-Path $tool) { $signtool = Get-Item $tool }
    }
  }
}
if (-not $signtool) { throw 'signtool.exe not found; install Windows SDK.' }

$dist = Join-Path $PSScriptRoot '..\dist'
$targets = Get-ChildItem $dist -Filter '*-x64.exe' -ErrorAction Stop
if (-not $targets) { throw "No *-x64.exe found in $dist" }

foreach ($exe in $targets) {
  Write-Host "Signing $($exe.Name) ..."
  if ($Password) {
    & $signtool.Path sign /fd SHA256 /td SHA256 /tr $TimestampUrl /f $Certificate /p $Password $exe.FullName | Out-Host
  } else {
    & $signtool.Path sign /fd SHA256 /td SHA256 /tr $TimestampUrl /f $Certificate $exe.FullName | Out-Host
  }
  if ($LASTEXITCODE -ne 0) { throw "signtool failed for $($exe.Name)" }

  $status = (Get-AuthenticodeSignature $exe.FullName).Status
  if ($status -ne 'Valid') { throw "$($exe.Name): signature status $status" }
  Write-Host "  OK ($status)"
}

Push-Location (Join-Path $PSScriptRoot '..')
try {
  node scripts/make-release-hashes.js
} finally {
  Pop-Location
}
Write-Host 'Done. SHA256SUMS.txt regenerated.'
