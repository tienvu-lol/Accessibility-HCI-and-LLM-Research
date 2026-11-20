#!/usr/bin/env bash
# macOS / Linux: start (or update) the worker agent. Run from anywhere: ./agent/start.sh   Stop: ./agent/stop.sh
# With --arc it also starts the per-arm ARC ssh tunnels so this machine can take A5/A6/A7 jobs.
set -euo pipefail
cd "$(dirname "$0")"
command -v docker >/dev/null || { echo "Install Docker Desktop first: https://www.docker.com/products/docker-desktop/"; exit 1; }
docker info >/dev/null 2>&1 || { echo "Docker is installed but not running. Open Docker Desktop and retry."; exit 1; }
if [ ! -f agent.env ]; then
  read -rp "Console URL (https://...): " url
  read -rsp "Worker token: " tok; echo
  read -rp "Name for this machine [$(hostname -s)]: " name; name=${name:-$(hostname -s)}
  read -rp "Parallel jobs [4]: " slots; slots=${slots:-4}
  # umask, not a later chmod: otherwise the token sits in a world-readable file in between
  ( umask 077; printf 'WEB_URL=%s\nWORKER_TOKEN=%s\nMACHINE_NAME=%s\nWORKER_ID=%s\nWORKER_SLOTS=%s\n' \
    "${url%/}" "$tok" "$name" "$name" "$slots" > agent.env )
fi
export HOST_OS="${HOST_OS:-$(uname -s | sed 's/Darwin/macOS/') $(uname -m)}"
if [ -z "${TAILNET_IP:-}" ]; then source ./tailnet.sh; fi
# A locally built image has nothing to pull, and on macOS the registry login is often absent.
if [ -n "${WORKER_IMAGE:-}" ]; then
  echo "Using local image ${WORKER_IMAGE} (skipping pull)"
else
  docker compose pull worker || echo "WARNING: pull failed (not logged in to ghcr.io?); trying a local image"
fi
if [ -n "${DASHBOARD_WORKER_SERVICE:-}" ]; then
  [[ "$DASHBOARD_WORKER_SERVICE" =~ ^worker(-a[0-9]+)?$ ]] || { echo 'Invalid worker service' >&2; exit 2; }
  docker compose up -d --build "$DASHBOARD_WORKER_SERVICE"
else
  profiles=()
  for arg in "$@"; do
    case "$arg" in
      --arc) profiles+=(--profile arc) ;;
      --a7) profiles+=(--profile arc-a7) ;;
      *) echo "Unknown option: $arg" >&2; exit 2 ;;
    esac
  done
  docker compose ${profiles[@]+"${profiles[@]}"} up -d --build
fi
echo "Agent running as ${TAILNET_NODE:-$(grep ^WORKER_ID= agent.env | cut -d= -f2)}. Logs: docker logs -f study-agent"
