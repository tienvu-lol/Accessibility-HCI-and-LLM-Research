#!/bin/sh
# Keeps one SSH port-forward to a VT ARC llama.cpp server alive and signs in again whenever it drops.
# One container per arm: ARM=A5 forwards ARC_A5_TARGET (node:port on ARC) to this container's LOCAL_PORT.
set -u
ARM=${ARM:?set ARM, e.g. A5}
eval "TARGET=\${ARC_${ARM}_TARGET:-}"
[ -n "$TARGET" ] || { echo "[tunnel $ARM] ARC_${ARM}_TARGET is not set (node:port on ARC)"; exit 1; }
: "${ARC_USER:?set ARC_USER}" "${ARC_HOST:?set ARC_HOST}"
PORT=${LOCAL_PORT:-8090}
RETRY=${RETRY:-10}
mkdir -p /root/.ssh && chmod 700 /root/.ssh
if [ -n "${ARC_PASSWORD:-}" ]; then
  export SSHPASS="$ARC_PASSWORD"; SSH="sshpass -e ssh"; BATCH=no
else
  [ -f /ssh/id ] || { echo "[tunnel $ARM] no key at agent/arc/ssh/id and no ARC_PASSWORD"; exit 1; }
  cp /ssh/id /root/.ssh/id && chmod 600 /root/.ssh/id # mounted files keep host permissions, ssh refuses loose ones
  SSH="ssh -i /root/.ssh/id -o IdentitiesOnly=yes"; BATCH=yes
fi
while true; do
  echo "[tunnel $ARM] signing in to $ARC_USER@$ARC_HOST, forwarding :$PORT -> $TARGET"
  # shellcheck disable=SC2086
  $SSH -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -o ConnectTimeout=20 \
    -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/root/.ssh/known_hosts -o BatchMode=$BATCH ${ARC_SSH_OPTS:-} \
    -L "0.0.0.0:$PORT:$TARGET" "$ARC_USER@$ARC_HOST"
  echo "[tunnel $ARM] connection ended (exit $?); signing in again in ${RETRY}s"
  sleep "$RETRY"
done
