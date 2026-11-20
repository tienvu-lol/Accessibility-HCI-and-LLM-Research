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
if (Get-Command tailscale -ErrorAction SilentlyContinue) {
  $json = tailscale status --json 2>$null
  $status = if ($LASTEXITCODE -eq 0 -and $json) { $json -join "`n" | ConvertFrom-Json }
  if ($status.BackendState -eq 'Running' -and $status.Self) {
    $node = $status.Self
    $env:TAILNET_NODE = if ($node.DNSName) { $node.DNSName.TrimEnd('.') } else { $node.HostName }
    $env:TAILNET_IP = @($node.TailscaleIPs)[0]
    $env:TAILNET_USER = $status.User."$($node.UserID)".LoginName
  }
}
if (-not $env:TAILNET_IP) { Write-Warning 'Tailscale identity unavailable; using the configured worker name.' }
if (-not $env:WORKER_IMAGE) {
  docker compose pull worker
  if ($LASTEXITCODE -ne 0) { Write-Warning 'pull failed (not logged in to ghcr.io?); trying a local image' }
}
$profiles = @()
if ($args -contains '--arc') { $profiles += '--profile','arc' }
if ($args -contains '--a7') { $profiles += '--profile','arc-a7' }
docker compose @profiles up -d --build
if ($LASTEXITCODE -ne 0) { throw 'Docker Compose could not start the agent.' }
Write-Host 'Agent running. Logs: docker logs -f study-agent'
