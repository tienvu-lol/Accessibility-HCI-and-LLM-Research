#!/usr/bin/env bash
# Proves A5/A6 repair jobs really run in this machine's Docker containers, without ARC and without paid calls.
#
# It brings up, on one throwaway docker network: two fake ARC llama.cpp servers (arc/fake-llama.js), a throwaway
# sshd standing in for the ARC login host, the real console image, and the real agent/docker-compose.yml
# `arc` profile (tunnel + worker container per arm). Then it logs in to the console, turns on open-arm
# dispatch, starts a one-site repair run and waits for the A5 and A6 cells to finish. The marker the fake
# server writes into each returned file is checked in the console's copy, so a pass means the bytes went
# worker container -> tunnel container -> ssh -> fake llama.cpp and back.
#
# Usage: ./agent/arc/e2e-open-arms.sh [--keep]     (--keep leaves everything running for inspection)
# Needs: docker, curl, python3, ssh-keygen. Takes a few minutes the first time (image builds).
set -euo pipefail
cd "$(dirname "$0")/.."                      # Study/agent
AGENT_DIR=$(pwd)
STUDY_DIR=$(cd .. && pwd)

P=arce2e                                     # compose project
NET=${P}_default
PORT=${E2E_PORT:-18080}
WEB=e2e-web; SSHD=e2e-sshd; L5=e2e-llama-a5; L6=e2e-llama-a6
PASS_WORD=e2e-password
WTOKEN=e2e-worker-token
A5KEY=e2e-a5-key; A6KEY=e2e-a6-key
SITE=${E2E_SITE:-UNI-01}; COND=naive; MAX_ITER=2
KEEP=0; [ "${1:-}" = "--keep" ] && KEEP=1
WORK=$(mktemp -d) || exit 1
CURL="curl -sS --max-time 20"
JAR=$WORK/cookies

say() { printf '\n=== %s\n' "$*"; }
die() { printf '\nFAIL: %s\n' "$*" >&2; exit 1; }

cleanup() {
  code=$?
  if [ "$KEEP" = 1 ]; then
    echo; echo "--keep: left running. Console http://127.0.0.1:$PORT (password $PASS_WORD)."
    echo "Stop with: docker compose -p $P -f $WORK/agent/docker-compose.yml --profile arc down -v; docker rm -f $WEB $SSHD $L5 $L6"
    exit $code
  fi
  echo; echo "cleaning up"
  docker rm -f $WEB $SSHD $L5 $L6 >/dev/null 2>&1 || true
  [ -f "$WORK/agent/docker-compose.yml" ] && COMPOSE_PROJECT_NAME=$P docker compose -f "$WORK/agent/docker-compose.yml" --profile arc down -v --remove-orphans >/dev/null 2>&1 || true
  rm -rf "$WORK"
  exit $code
}
trap cleanup EXIT

# ---- preconditions
command -v docker >/dev/null || die "docker is not installed"
docker info >/dev/null 2>&1 || die "Docker is not running (open Docker Desktop, or: colima start)"
for c in study-agent study-agent-a5 study-agent-a6 study-arc-a5 study-arc-a6; do
  docker ps -a --format '{{.Names}}' | grep -qx "$c" && die "container $c already exists (a real agent is running?). Stop it first: ./agent/stop.sh"
done
docker ps -a --format '{{.Names}}' | grep -qxE "$WEB|$SSHD|$L5|$L6" && die "a previous run left containers behind; remove them: docker rm -f $WEB $SSHD $L5 $L6"
for img in study-worker:latest study-web; do
  docker image inspect "$img" >/dev/null 2>&1 || {
    f=$([ "$img" = study-web ] && echo webapp/Dockerfile.web || echo webapp/Dockerfile.worker)
    say "building $img (first run only)"
    docker build -f "$STUDY_DIR/$f" -t "$img" "$STUDY_DIR" || die "could not build $img"
  }
done

# ---- a copy of the agent dir, so the real agent.env and ssh key are never touched
mkdir -p "$WORK/agent/arc/ssh"
cp docker-compose.yml "$WORK/agent/"
cp arc/Dockerfile.tunnel arc/tunnel.sh "$WORK/agent/arc/"
ssh-keygen -q -t ed25519 -N '' -f "$WORK/agent/arc/ssh/id"
( umask 077; cat > "$WORK/agent/agent.env" <<EOF
WEB_URL=http://$WEB:8080
WORKER_TOKEN=$WTOKEN
MACHINE_NAME=$(hostname -s)-e2e
WORKER_ID=$(hostname -s)-e2e
WORKER_SLOTS=2
POLL_MS=1500
RETRY=3
ARC_USER=arcuser
ARC_HOST=$SSHD
ARC_A5_TARGET=$L5:8000
ARC_A6_TARGET=$L6:8000
A5_API_KEY=$A5KEY
A6_API_KEY=$A6KEY
EOF
)
export HOST_OS="$(uname -s | sed 's/Darwin/macOS/') $(uname -m)"
export WORKER_IMAGE=study-worker:latest
export COMPOSE_PROJECT_NAME=$P
COMPOSE="docker compose -f $WORK/agent/docker-compose.yml"

# ---- the agent side: exactly what `start.sh --arc` runs, minus the plain worker (no mainstream jobs here)
say "starting the arc profile (tunnel + worker container per arm)"
$COMPOSE --profile arc up -d --build arc-a5 worker-a5 arc-a6 worker-a6 >/dev/null
docker network inspect $NET >/dev/null 2>&1 || die "compose network $NET not found"

# ---- the fake ARC: one llama.cpp per arm, reachable only from the sshd (as on ARC's compute nodes)
say "starting the fake ARC (two llama.cpp servers + sshd) and the console"
for a in "A5 $L5 $A5KEY" "A6 $L6 $A6KEY"; do
  set -- $a
  docker run -d --name "$2" --network $NET -v "$AGENT_DIR/arc/fake-llama.js:/fake-llama.js:ro" \
    -e ARM="$1" -e EXPECT_KEY="$3" -e PORT=8000 node:24-bookworm-slim node /fake-llama.js >/dev/null
done
docker run -d --name $SSHD --network $NET -v "$WORK/agent/arc/ssh/id.pub:/pub:ro" alpine:3.20 sh -c '
  apk add --no-cache openssh >/dev/null && ssh-keygen -A >/dev/null && adduser -D -s /bin/sh arcuser && passwd -u arcuser >/dev/null
  mkdir -p /home/arcuser/.ssh && cp /pub /home/arcuser/.ssh/authorized_keys
  chown -R arcuser /home/arcuser/.ssh && chmod 700 /home/arcuser/.ssh && chmod 600 /home/arcuser/.ssh/authorized_keys
  exec /usr/sbin/sshd -D -e -o AllowTcpForwarding=yes -o PasswordAuthentication=no' >/dev/null
docker run -d --name $WEB --network $NET -p "127.0.0.1:$PORT:8080" \
  -e APP_PASSWORD="$PASS_WORD" -e WORKER_TOKEN="$WTOKEN" -e MACHINE_NAME=e2e-console study-web >/dev/null

# the tunnels and workers started before their peers existed; restart them instead of waiting out the backoff
sleep 8
docker restart study-arc-a5 study-arc-a6 study-agent-a5 study-agent-a6 >/dev/null

# ---- console: log in, configure, start
for i in $(seq 1 60); do $CURL "http://127.0.0.1:$PORT/healthz" >/dev/null 2>&1 && break; sleep 1; done
$CURL "http://127.0.0.1:$PORT/healthz" | grep -q '"ok":true' || { docker logs $WEB | tail -20; die "console did not come up"; }
api() { # api METHOD PATH [JSON]
  if [ $# -ge 3 ]; then
    $CURL -b "$JAR" -X "$1" -H 'content-type: application/json' -d "$3" "http://127.0.0.1:$PORT$2"
  else
    $CURL -b "$JAR" -X "$1" "http://127.0.0.1:$PORT$2"
  fi
}
$CURL -c "$JAR" -X POST -H 'content-type: application/json' -d "{\"password\":\"$PASS_WORD\"}" \
  "http://127.0.0.1:$PORT/api/login" | grep -q '"ok":true' || die "login failed"
# A1-A4 must be configured or the repair phase refuses to start; these keys are never dispatched here,
# because the only workers running take A5/A6 only.
for a in A3 A4; do api PUT "/api/arms/$a" '{"provider":"openai","model_id":"e2e-unused"}' >/dev/null; done
for k in openai anthropic gemini; do api PUT "/api/keys/$k" '{"key":"e2e-not-a-real-key"}' >/dev/null; done
api PUT /api/settings "{\"sites\":[\"$SITE\"],\"conditions\":[\"$COND\"],\"max_iter\":$MAX_ITER,\"dispatch_open\":true}" >/dev/null

say "waiting for both workers to advertise a live ARC tunnel"
for i in $(seq 1 90); do
  arcs=$(api GET /api/state | python3 -c 'import json,sys;s=json.load(sys.stdin);print(" ".join(sorted(set(a for w in s.get("workers",[]) for a in (w.get("arcs") or [])))))' 2>/dev/null || true)
  [ "$arcs" = "A5 A6" ] && break
  sleep 2
done
[ "${arcs:-}" = "A5 A6" ] || { docker logs study-arc-a5 | tail -5; docker logs study-agent-a5 | tail -5; die "no worker advertised a live A5+A6 tunnel (got '${arcs:-}')"; }
echo "workers advertise: $arcs"

say "starting the repair phase for $SITE / $COND (max_iter=$MAX_ITER)"
api POST /api/run/start '{"phase":"repair"}' | grep -q '"ok":true' || { api POST /api/run/start '{"phase":"repair"}'; die "run/start was blocked"; }

say "waiting for the A5 and A6 cells"
for i in $(seq 1 150); do
  m=$(api GET /api/state | python3 -c 'import json,sys;s=json.load(sys.stdin);m=s["matrix"];print("".join(m[a]["'"$COND"'"] for a in ("A5","A6")))' 2>/dev/null || true)
  echo "  cells A5|A6: $m"
  case "$m" in oo) break;; *f*|*t*) break;; esac   # f = failed cell, t = truncated
  sleep 4
done
[ "${m:-}" = "oo" ] || { for c in study-agent-a5 study-agent-a6 study-arc-a5 study-arc-a6; do echo "--- $c"; docker logs --tail 15 $c; done; die "A5/A6 cells did not finish ok (matrix '$m')"; }

# ---- the proof: the console's stored iterations came from the fake llama.cpp through the tunnel
say "checking what the console stored"
for arm in A5 A6; do
  base=/data/runs/$arm/$COND/$SITE
  docker exec $WEB sh -c "cat $base/iter$MAX_ITER/status.json" > "$WORK/$arm.json" || die "$arm: no status.json in the console's data"
  docker exec $WEB sh -c "cat $base/iter$MAX_ITER/index.html" > "$WORK/$arm.html" || die "$arm: no index.html in the console's data"
  grep -q "arc-e2e $arm call" "$WORK/$arm.html" || die "$arm: the stored page has no fake-ARC marker, so it did not come through the tunnel"
  python3 - "$WORK/$arm.json" "$arm" <<'PY'
import json, sys
st = json.load(open(sys.argv[1])); arm = sys.argv[2]
assert st["status"] == "ok", st
assert st["converged"] is True, "expected convergence on iteration 2: %r" % st
assert st["usage"]["input"] > 0 and st["usage"]["output"] > 0, st["usage"]
print("  %s: status=%s converged=%s iter=%s model=%s version=%s usage=%s latency=%sms"
      % (arm, st["status"], st["converged"], st["iteration"], st["model_id"], st["model_version"], st["usage"], st["latency_ms"]))
PY
done
say "calls the fake ARC servers answered"
docker logs $L5 2>&1 | grep -c 'call ' | sed 's/^/  A5 chat completions: /'
docker logs $L6 2>&1 | grep -c 'call ' | sed 's/^/  A6 chat completions: /'
printf '\nPASS: A5 and A6 repair cells ran in this machine'"'"'s containers, through the ARC tunnel containers.\n'
