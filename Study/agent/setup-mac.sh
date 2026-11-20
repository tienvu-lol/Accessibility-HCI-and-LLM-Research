#!/usr/bin/env bash
# macOS one-shot: connect to the tailnet, install a Docker engine if missing, build the worker image
# natively, join the console.
#   WEB_URL=http://<host>:8080 WORKER_TOKEN=... [MACHINE_NAME=..] [WORKER_SLOTS=4] ./agent/setup-mac.sh
# No GUI or sudo needed for Docker: uses Colima (Homebrew) unless Docker Desktop is already running.
# Tailscale's first sign-in does need a GUI click; the script detects that and tells you.
# Safe to re-run. REBUILD=1 rebuilds the image. SKIP_CHECK=1 skips the console preflight.
# macOS ships bash 3.2: no mapfile, no ${var,,}, no associative arrays.
set -euo pipefail
cd "$(dirname "$0")"
: "${WEB_URL:?set WEB_URL, e.g. http://host-laptop:8080}"
: "${WORKER_TOKEN:?set WORKER_TOKEN}"
WEB_URL=${WEB_URL%/}
MACHINE_NAME=${MACHINE_NAME:-$(hostname -s)}
# the name is sent as JSON and used as a container/worker id: keep it to safe characters
MACHINE_NAME=$(printf '%s' "$MACHINE_NAME" | tr -c 'A-Za-z0-9._-' '-')
WORKER_SLOTS=${WORKER_SLOTS:-4}
say() { printf '\n==> %s\n' "$*"; }
die() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

WEB_HOST=$(printf '%s' "$WEB_URL" | sed -e 's#^[A-Za-z][A-Za-z0-9+.-]*://##' -e 's#[/?].*$##' -e 's#:[0-9]*$##')

# ---------------------------------------------------------------- Tailscale
# The console normally lives on the tailnet, so get the network up before anything slow.
TS=""
if command -v tailscale >/dev/null 2>&1; then TS=tailscale
elif [ -x /Applications/Tailscale.app/Contents/MacOS/Tailscale ]; then TS=/Applications/Tailscale.app/Contents/MacOS/Tailscale
fi

tailscale_hint() {
  cat >&2 <<'EOF'
  Tailscale is how this Mac reaches the console. To set it up:
    brew install --cask tailscale && open -a Tailscale
  then sign in to the SAME tailnet as the host laptop (that sign-in is a GUI click,
  which this script cannot do for you). Verify with:  tailscale status
EOF
}

if [ -z "$TS" ]; then
  say "Tailscale: not installed"
  tailscale_hint
else
  if "$TS" status >/dev/null 2>&1; then
    say "Tailscale: up as $("$TS" status --self --peers=false 2>/dev/null | awk 'NR==1{print $1" "$2}')"
  else
    say "Tailscale: installed but not connected - trying to bring it up"
    # Works when this Mac is already signed in; a first-time login needs the GUI.
    if "$TS" up --timeout 20s >/dev/null 2>&1 && "$TS" status >/dev/null 2>&1; then
      say "Tailscale: connected"
    else
      say "Tailscale: could not connect without a sign-in"
      tailscale_hint
      [ "${REQUIRE_TAILSCALE:-0}" = 1 ] && die "REQUIRE_TAILSCALE=1 and the tailnet is down"
    fi
  fi
fi

# ---------------------------------------------------------------- console preflight
# Validate URL *and* token now: a bad token otherwise only surfaces after a multi-minute build.
# The token goes in a 0600 curl config file, never in argv (argv is visible via ps).
console_claim_code() {
  cfg=$(mktemp -t agent-preflight) || die "mktemp failed"
  chmod 600 "$cfg"
  printf 'header = "authorization: Bearer %s"\n' "$WORKER_TOKEN" > "$cfg"
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 -X POST \
    -H 'content-type: application/json' \
    --data "{\"worker_id\":\"$MACHINE_NAME\",\"kinds\":[],\"max\":0,\"slots\":$WORKER_SLOTS}" \
    --config "$cfg" "$WEB_URL/api/worker/claim" 2>/dev/null) || code=000
  rm -f "$cfg"
  printf '%s' "$code"
}

# Is WEB_HOST plausibly a tailnet name? IP literals and public FQDNs are not.
host_is_tailnetish() {
  case "$WEB_HOST" in
    *.ts.net)                      return 0 ;;  # MagicDNS FQDN
    localhost|127.*|0.0.0.0|::1|*:*) return 1 ;;  # loopback / IPv6 literal
    *[0-9].[0-9]*.[0-9]*.[0-9]*)   return 1 ;;  # IPv4 literal
    *.*)                           return 1 ;;  # some other FQDN
    *)                             return 0 ;;  # single label: MagicDNS short name
  esac
}

if [ "${SKIP_CHECK:-0}" = 1 ]; then
  say "Skipping the console preflight (SKIP_CHECK=1)"
else
  say "Checking the console: $WEB_URL (health + worker token)"
  hz=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$WEB_URL/healthz" 2>/dev/null) || hz=000
  if [ "$hz" = 000 ]; then
    printf '\nERROR: no reply from %s\n' "$WEB_URL/healthz" >&2
    if [ -n "$TS" ] && "$TS" status >/dev/null 2>&1; then
      printf '  Tailscale is up, so check the host name, the port, and that the host console is\n' >&2
      printf '  running and not bound to a different address (BIND_ADDR in its compose file).\n' >&2
    elif host_is_tailnetish; then
      printf '  "%s" looks like a tailnet name and the tailnet is down.\n' "$WEB_HOST" >&2
      tailscale_hint
    else
      printf '  "%s" is not a tailnet name, so this is a plain network/DNS problem:\n' "$WEB_HOST" >&2
      printf '  check the address and port, and that the console is actually listening.\n' >&2
    fi
    exit 1
  fi
  [ "$hz" = 200 ] || die "$WEB_URL/healthz answered HTTP $hz, so this is not the console. Check the URL."
  code=$(console_claim_code)
  case "$code" in
    200) say "Console reachable and the worker token is accepted" ;;
    401) die "the console rejected WORKER_TOKEN (401). Get the current token from the host." ;;
    000) die "the console answered /healthz but not /api/worker/claim - is it the right URL?" ;;
    *)   die "unexpected reply from $WEB_URL/api/worker/claim: HTTP $code" ;;
  esac
fi

# ---------------------------------------------------------------- Docker engine
if ! docker info >/dev/null 2>&1; then
  command -v brew >/dev/null || die "Homebrew missing. Install it from https://brew.sh then re-run."
  say "No Docker daemon: installing Colima + Docker CLI + compose"
  command -v docker >/dev/null 2>&1 || brew install docker
  docker compose version >/dev/null 2>&1 || brew install docker-compose
  brew list colima >/dev/null 2>&1 || brew install colima
  mkdir -p ~/.docker/cli-plugins
  ln -sfn "$(brew --prefix)/opt/docker-compose/bin/docker-compose" ~/.docker/cli-plugins/docker-compose
  say "Starting Colima (4 CPU, 8 GB)"
  colima status >/dev/null 2>&1 || colima start --cpu 4 --memory 8 || die "colima start failed. Try:
    colima delete && colima start --cpu 4 --memory 8 --vm-type vz"
fi
docker info >/dev/null 2>&1 || die "Docker daemon still unreachable."
docker compose version >/dev/null 2>&1 || die "docker compose plugin missing (brew install docker-compose)."

# ---------------------------------------------------------------- worker image
if [ "${REBUILD:-0}" = 1 ] || ! docker image inspect study-worker >/dev/null 2>&1; then
  say "Building the worker image for this Mac ($(uname -m); first time takes several minutes)"
  docker build -f ../webapp/Dockerfile.worker -t study-worker ..
else
  say "Reusing the existing study-worker image (REBUILD=1 to rebuild)"
fi

# ---------------------------------------------------------------- run
say "Writing agent.env and starting the agent"
( umask 077; printf 'WEB_URL=%s\nWORKER_TOKEN=%s\nMACHINE_NAME=%s\nWORKER_ID=%s\nWORKER_SLOTS=%s\n' \
  "$WEB_URL" "$WORKER_TOKEN" "$MACHINE_NAME" "$MACHINE_NAME" "$WORKER_SLOTS" > agent.env )
export HOST_OS="macOS $(uname -m)" WORKER_IMAGE=study-worker
docker compose up -d --force-recreate

# A healthy worker logs NOTHING: it only prints on job events or "claim failed".
# So the check is: the container stays up and never logs a failed claim.
say "Watching the agent for failed claims (a healthy worker is silent)"
i=0
while [ "$i" -lt 5 ]; do
  [ "$(docker inspect -f '{{.State.Running}}' study-agent 2>/dev/null)" = true ] || {
    docker logs --tail 20 study-agent 2>&1 || true
    die "study-agent stopped. See the log above."
  }
  if docker logs study-agent 2>&1 | grep -q 'claim failed'; then
    docker logs study-agent 2>&1 | grep 'claim failed' | tail -2
    die "the worker cannot claim jobs - check WEB_URL and WORKER_TOKEN."
  fi
  i=$((i + 1))
  sleep 3
done
say "Agent '$MACHINE_NAME' is online. It should show under Runs -> Workers as macOS $(uname -m)."
echo "Logs: docker logs -f study-agent    Stop: ./stop.sh"
