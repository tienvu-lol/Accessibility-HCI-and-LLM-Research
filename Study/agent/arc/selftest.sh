#!/usr/bin/env bash
# Proves the tunnel container works without ARC: a throwaway sshd + a fake llama.cpp server on a private docker network.
# Checks the forward works, and that it signs in again after the ssh server restarts. Needs docker; takes ~1 minute.
set -euo pipefail
cd "$(dirname "$0")"
N=arc-selftest-net; T=$(mktemp -d)
cleanup() { docker rm -f arc-st-sshd arc-st-llama arc-st-tunnel >/dev/null 2>&1 || true; docker network rm $N >/dev/null 2>&1 || true; rm -rf "$T"; }
trap cleanup EXIT
export MSYS_NO_PATHCONV=1
M=$(cygpath -m "$T" 2>/dev/null || echo "$T")
ssh-keygen -q -t ed25519 -N '' -f "$T/id"
docker build -q -f Dockerfile.tunnel -t study-arc-tunnel . >/dev/null
docker network create $N >/dev/null
docker run -d --name arc-st-llama --network $N node:24-bookworm-slim node -e "require('http').createServer((q,r)=>{r.setHeader('content-type','application/json');r.end(JSON.stringify({data:[{id:'fake-llama'}]}))}).listen(8000)" >/dev/null
docker run -d --name arc-st-sshd --network $N -v "$M/id.pub:/pub:ro" alpine:3.20 sh -c '
  apk add --no-cache openssh >/dev/null && ssh-keygen -A >/dev/null && adduser -D -s /bin/sh arcuser && passwd -u arcuser >/dev/null
  mkdir -p /home/arcuser/.ssh && cp /pub /home/arcuser/.ssh/authorized_keys && chown -R arcuser /home/arcuser/.ssh && chmod 700 /home/arcuser/.ssh && chmod 600 /home/arcuser/.ssh/authorized_keys
  exec /usr/sbin/sshd -D -e -o AllowTcpForwarding=yes -o PasswordAuthentication=no' >/dev/null
sleep 6
docker run -d --name arc-st-tunnel --network $N -v "$M/id:/ssh/id:ro" -e ARM=A5 -e ARC_A5_TARGET=arc-st-llama:8000 -e ARC_USER=arcuser -e ARC_HOST=arc-st-sshd -e LOCAL_PORT=8091 -e RETRY=3 study-arc-tunnel >/dev/null
probe() { docker run --rm --network $N curlimages/curl:8.10.1 -s --max-time 5 http://arc-st-tunnel:8091/models; }
ok() { probe | grep -q fake-llama; }
for _ in $(seq 1 20); do ok && break; sleep 2; done
ok || { docker logs arc-st-tunnel; echo "FAIL: forward not working"; exit 1; }
echo "PASS: forward works through ssh"
docker restart arc-st-sshd >/dev/null
sleep 4
for _ in $(seq 1 30); do ok && { echo "PASS: tunnel signed in again after the ssh server restarted"; exit 0; }; sleep 2; done
docker logs arc-st-tunnel | tail -8; echo "FAIL: did not reconnect"; exit 1
