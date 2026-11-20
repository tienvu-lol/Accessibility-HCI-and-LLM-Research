#!/usr/bin/env bash
# macOS / Linux: start (or update) the worker agent. Run from anywhere: ./agent/start.sh   Stop: ./agent/stop.sh
set -euo pipefail
cd "$(dirname "$0")"
command -v docker >/dev/null || { echo "Install Docker Desktop first: https://www.docker.com/products/docker-desktop/"; exit 1; }
docker info >/dev/null 2>&1 || { echo "Docker is installed but not running. Open Docker Desktop and retry."; exit 1; }
if [ ! -f agent.env ]; then
  read -rp "Console URL (https://...): " url
  read -rsp "Worker token: " tok; echo
  read -rp "Name for this machine [$(hostname -s)]: " name; name=${name:-$(hostname -s)}
  read -rp "Parallel jobs [4]: " slots; slots=${slots:-4}
  printf 'WEB_URL=%s\nWORKER_TOKEN=%s\nMACHINE_NAME=%s\nWORKER_ID=%s\nWORKER_SLOTS=%s\n' "${url%/}" "$tok" "$name" "$name" "$slots" > agent.env
  chmod 600 agent.env
fi
export HOST_OS="$(uname -s | sed 's/Darwin/macOS/') $(uname -m)"
docker compose pull worker || echo "WARNING: pull failed (not logged in to ghcr.io?); trying a local image"
if [ "${1:-}" = "--arc" ]; then docker compose --profile arc up -d --build; else docker compose up -d; fi
echo "Agent running as $(grep ^WORKER_ID= agent.env | cut -d= -f2). Logs: docker logs -f study-agent"
