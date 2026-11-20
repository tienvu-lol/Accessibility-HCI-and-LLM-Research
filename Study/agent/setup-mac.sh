#!/usr/bin/env bash
# macOS one-shot: install a Docker engine if missing, build the worker image natively, join the console.
#   WEB_URL=http://<host>:8080 WORKER_TOKEN=... [MACHINE_NAME=..] [WORKER_SLOTS=4] ./agent/setup-mac.sh
# No GUI or sudo needed: uses Colima (Homebrew) unless Docker Desktop is already running. Safe to re-run.
set -euo pipefail
cd "$(dirname "$0")"
: "${WEB_URL:?set WEB_URL, e.g. http://host-laptop:8080}"
: "${WORKER_TOKEN:?set WORKER_TOKEN}"
MACHINE_NAME=${MACHINE_NAME:-$(hostname -s)}
WORKER_SLOTS=${WORKER_SLOTS:-4}
say() { printf '\n==> %s\n' "$*"; }

if ! docker info >/dev/null 2>&1; then
  command -v brew >/dev/null || { echo "Homebrew missing. Install it from https://brew.sh then re-run."; exit 1; }
  say "Installing Colima + Docker CLI + compose"
  brew list colima >/dev/null 2>&1 || brew install colima docker docker-compose
  mkdir -p ~/.docker/cli-plugins
  ln -sfn "$(brew --prefix)/opt/docker-compose/bin/docker-compose" ~/.docker/cli-plugins/docker-compose
  say "Starting Colima (4 CPU, 8 GB)"
  colima status >/dev/null 2>&1 || colima start --cpu 4 --memory 8
fi
docker info >/dev/null 2>&1 || { echo "Docker daemon still unreachable."; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "docker compose plugin missing (brew install docker-compose)."; exit 1; }

say "Checking the console is reachable: ${WEB_URL%/}/healthz"
[ "${SKIP_CHECK:-0}" = 1 ] || curl -fsS --max-time 10 "${WEB_URL%/}/healthz" >/dev/null || { echo "Cannot reach the console. If it is on Tailscale, make sure Tailscale is connected."; exit 1; }

if [ "${REBUILD:-0}" = 1 ] || ! docker image inspect study-worker >/dev/null 2>&1; then
  say "Building the worker image for this Mac (first time takes several minutes)"
  docker build -f ../webapp/Dockerfile.worker -t study-worker ..
fi

say "Writing agent.env and starting the agent"
printf 'WEB_URL=%s\nWORKER_TOKEN=%s\nMACHINE_NAME=%s\nWORKER_ID=%s\nWORKER_SLOTS=%s\n' "${WEB_URL%/}" "$WORKER_TOKEN" "$MACHINE_NAME" "$MACHINE_NAME" "$WORKER_SLOTS" > agent.env
chmod 600 agent.env
export HOST_OS="macOS $(uname -m)" WORKER_IMAGE=study-worker
docker compose up -d --force-recreate

say "Waiting for the worker to register"
for _ in $(seq 1 20); do
  docker logs study-agent 2>&1 | grep -qiE "error|ECONNREFUSED|rejected" && { docker logs study-agent 2>&1 | tail -5; echo "Worker reported errors (wrong token or URL?)"; exit 1; }
  [ "$(docker inspect -f '{{.State.Running}}' study-agent)" = true ] && sleep 3 || { echo "Container not running"; exit 1; }
done
echo "Agent '$MACHINE_NAME' is running. It should show Online under Runs -> Workers. Logs: docker logs -f study-agent"
