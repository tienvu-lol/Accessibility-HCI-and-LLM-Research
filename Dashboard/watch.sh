#!/usr/bin/env bash
# Keeps this computer current: when the current branch's upstream gets new commits it fast-forwards, rebuilds the
# console and the worker image, and restarts the host launcher (which re-applies running workers to the new image).
# Run on the console host: bash Dashboard/watch.sh   (WATCH_INTERVAL=seconds, default 60; ONCE=1 checks once)
set -u
cd "$(dirname "$0")"
repo=$(git rev-parse --show-toplevel)
agent=$repo/Study/agent
interval=${WATCH_INTERVAL:-60}
rebuild=${REBUILD_CMD:-docker compose --profile build build worker && docker compose up -d --no-deps --build --wait web}
failed=
launcher_pid=

start_launcher() { # skipped on computers that have not enrolled (no launcher.env)
  [ -f "$agent/agent.env" ] && [ -f "$agent/launcher.env" ] || return 0
  node --env-file="$agent/agent.env" --env-file="$agent/launcher.env" "$agent/launch.js" &
  launcher_pid=$!
}
stop_launcher() { [ -z "$launcher_pid" ] || { kill "$launcher_pid" 2>/dev/null; wait "$launcher_pid" 2>/dev/null; launcher_pid=; }; }
trap stop_launcher EXIT
start_launcher

while :; do
  # a crashed launcher comes back on the next pass
  if [ -n "$launcher_pid" ] && ! kill -0 "$launcher_pid" 2>/dev/null; then launcher_pid=; start_launcher; fi
  if git fetch -q; then
    new=$(git rev-parse '@{upstream}' 2>/dev/null || true)
    # act only on a fast-forward, so local unpushed commits never trigger rebuild loops
    if [ -n "$new" ] && [ "$new" != "$(git rev-parse HEAD)" ] && [ "$new" != "$failed" ] && git merge-base --is-ancestor HEAD "$new"; then
      echo "$(date '+%F %T') new commits: $(git rev-parse --short HEAD)..$(git rev-parse --short "$new")"
      if git merge --ff-only -q "$new" && eval "$rebuild"; then
        stop_launcher; start_launcher
        echo "$(date '+%F %T') rebuilt console, worker image and launcher at $(git rev-parse --short HEAD)"
      else
        echo "$(date '+%F %T') pull or rebuild failed; waiting for the next commit" >&2
        failed=$new
      fi
    fi
  else
    echo "$(date '+%F %T') git fetch failed; retrying" >&2
  fi
  [ -n "${ONCE:-}" ] && exit 0
  sleep "$interval"
done
