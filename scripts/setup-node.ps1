# Downloads the pinned official Windows runtime into this project only.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$projectRoot = Split-Path -Parent $PSScriptRoot
$nodeVersion = (Get-Content -LiteralPath (Join-Path $projectRoot '.node-version') -Raw).Trim()
if ($nodeVersion -notmatch '^\d+\.\d+\.\d+$') {
  throw 'Expected a stable x.y.z version in .node-version.'
}

$architecture = switch ($env:PROCESSOR_ARCHITECTURE) {
  'ARM64' { 'arm64' }
  'AMD64' { 'x64' }
  default { throw 'This setup script supports Windows x64 and ARM64.' }
}
$distribution = "node-v$nodeVersion-win-$architecture"
$toolsDirectory = Join-Path $projectRoot '.tools'
$nodeDirectory = Join-Path $toolsDirectory $distribution
$nodeExecutable = Join-Path $nodeDirectory 'node.exe'

if (-not (Test-Path -LiteralPath $nodeExecutable)) {
  New-Item -ItemType Directory -Path $toolsDirectory -Force | Out-Null
  $archiveName = "$distribution.zip"
  $archivePath = Join-Path $toolsDirectory $archiveName
  $baseUrl = "https://nodejs.org/dist/v$nodeVersion"
  Write-Output "Downloading Node.js $nodeVersion ($architecture)..."
  Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/$archiveName" -OutFile $archivePath
  $manifest = (Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/SHASUMS256.txt").Content
  $checksumLine = $manifest -split "`n" | Where-Object { $_.Trim().EndsWith("  $archiveName") }
  if (-not $checksumLine) {
    throw 'The downloaded archive is missing from the official checksum manifest.'
  }
  $expectedHash = ($checksumLine.Trim() -split '\s+')[0]
  $actualHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
  if ($actualHash -ne $expectedHash) {
    throw 'Node.js archive checksum verification failed.'
  }
  Expand-Archive -LiteralPath $archivePath -DestinationPath $toolsDirectory -Force
  Remove-Item -LiteralPath $archivePath
}

$installedVersion = & $nodeExecutable --version
if ($LASTEXITCODE -ne 0 -or $installedVersion -ne "v$nodeVersion") {
  throw "Expected Node.js v$nodeVersion, received $installedVersion."
}
if (($env:PATH -split ';') -notcontains $nodeDirectory) {
  $env:PATH = "$nodeDirectory;$env:PATH"
}
Write-Output "Node.js $nodeVersion is active for this PowerShell session."
