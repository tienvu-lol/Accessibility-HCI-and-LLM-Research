#!/usr/bin/env bash
# Waits for a VT ARC OnDemand llama.cpp session (a Slurm job) to start, then points this computer's tunnel for
# one arm at it and starts that arm's tunnel + worker containers. Ends when the job does.
#
#   arc/arc-attach.sh A7 <slurm job id> <session dir id>      (run from anywhere; leave it running)
#
# Why: sessions queue for hours and are killed after an hour with no requests. The worker container probes its
# tunnel every few seconds, and that traffic is what keeps a running session alive, so the only manual step the
# study needs is "start the session"; this script does the rest the moment ARC gives it a GPU.
# Status polling uses your normal ssh login (BatchMode, no prompts); the tunnel containers use the separate
# forwarding-only key in arc/ssh/id, so no shell key ever goes into a container.
set -u
ARM=${1:?arm, e.g. A7}; JOB=${2:?slurm job id}; SESS=${3:?OnDemand session directory id}
cd "$(dirname "$0")/.." || exit 1                      # Study/agent
arm_lc=$(printf '%s' "$ARM" | tr 'A-Z' 'a-z')
set -a; . ./agent.env; set +a
: "${ARC_USER:?ARC_USER missing in agent.env}" "${ARC_HOST:?ARC_HOST missing in agent.env}"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=15 $ARC_USER@$ARC_HOST"
DIR='~/ondemand/data/sys/dashboard/batch_connect/sys/bc_vt_llm/output'
log() { printf '%s [attach %s] %s\n' "$(date '+%F %T')" "$ARM" "$*"; }

set_target() { # set_target host:port -> agent.env (private file; replace the line or add it)
  if grep -q "^ARC_${ARM}_TARGET=" agent.env; then sed -i.bak "s#^ARC_${ARM}_TARGET=.*#ARC_${ARM}_TARGET=$1#" agent.env && rm -f agent.env.bak
  else printf 'ARC_%s_TARGET=%s\n' "$ARM" "$1" >> agent.env; fi
}

attached=
while true; do
  state=$($SSH "squeue -h -j $JOB -o %T" 2>/dev/null | head -1)
  if [ -z "$state" ]; then
    # not in the queue any more: finished, cancelled or timed out (or ssh hiccup: ask sacct before giving up)
    end=$($SSH "sacct -j $JOB -X -n -o State" 2>/dev/null | head -1 | tr -d ' ')
    if [ -n "$end" ]; then log "job $JOB is $end; stopping"; break; fi
    log "could not read job state (ssh?); retrying"; sleep 60; continue
  fi
  if [ "$state" = RUNNING ] && [ -z "$attached" ]; then
    conn=$($SSH "grep -E '^(host|port):' $DIR/$SESS/connection.yml" 2>/dev/null)
    host=$(printf '%s\n' "$conn" | sed -n 's/^host: *//p'); port=$(printf '%s\n' "$conn" | sed -n 's/^port: *//p')
    if [ -n "$host" ] && [ -n "$port" ]; then
      log "session is up on $host:$port; starting the $ARM tunnel and worker"
      set_target "$host:$port"
      # same path the launcher uses for a worker service; the arc-a7 profile is pulled in by the service name
      if DASHBOARD_WORKER_SERVICE="worker-$arm_lc" WORKER_IMAGE=${WORKER_IMAGE:-study-worker:latest} bash ./start.sh >/dev/null 2>&1; then
        attached=1; log "containers up (study-arc-$arm_lc, study-agent-$arm_lc)"
      else log "start.sh failed; will retry"; fi
    else log "job is RUNNING but the server has not written connection.yml yet (model loading)"; fi
  elif [ "$state" != RUNNING ]; then
    log "job $JOB is $state"
  fi
  sleep 30
done
log "done"
