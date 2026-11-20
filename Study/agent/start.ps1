# Windows: start (or update) the worker agent. Run: powershell -ExecutionPolicy Bypass -File agent\start.ps1   Stop: agent\stop.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw 'Install Docker Desktop first: https://www.docker.com/products/docker-desktop/' }
docker info *> $null
if ($LASTEXITCODE -ne 0) { throw 'Docker is installed but not running. Open Docker Desktop and retry.' }
if (-not (Test-Path agent.env)) {
  $url = (Read-Host 'Console URL (https://...)').TrimEnd('/')
  $tok = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR((Read-Host 'Worker token' -AsSecureString)))
  $name = Read-Host "Name for this machine [$env:COMPUTERNAME]"; if (-not $name) { $name = $env:COMPUTERNAME }
  $slots = Read-Host 'Parallel jobs [4]'; if (-not $slots) { $slots = 4 }
  "WEB_URL=$url`nWORKER_TOKEN=$tok`nMACHINE_NAME=$name`nWORKER_ID=$name`nWORKER_SLOTS=$slots" | Set-Content -Encoding ascii agent.env
}
$env:HOST_OS = "Windows $env:PROCESSOR_ARCHITECTURE"
docker compose pull worker
if ($LASTEXITCODE -ne 0) { Write-Warning "pull failed (not logged in to ghcr.io?); trying a local image" }
if ($args -contains "--arc") { docker compose --profile arc up -d --build } else { docker compose up -d }
Write-Host 'Agent running. Logs: docker logs -f study-agent'
