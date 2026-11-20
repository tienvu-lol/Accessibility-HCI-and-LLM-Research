# Worker agent (join the hosted console from a laptop)

Runs one Docker container that connects to the hosted console, takes jobs, and sends results back. API keys never touch your machine: they live on the hosted console and arrive inside each job.

**Needs:** Docker Desktop running; the console URL and `WORKER_TOKEN` from whoever hosts it; a GitHub token with `read:packages` while the repo is private (`docker login ghcr.io -u <github-user>`, paste the token as password).

| OS | start | stop |
|---|---|---|
| macOS / Linux | `./agent/start.sh` | `./agent/stop.sh` |
| Windows | `powershell -ExecutionPolicy Bypass -File agent\start.ps1` | `agent\stop.ps1` |

The first run asks for the URL, token, a machine name and slot count, and saves them in `agent/agent.env` (git-ignored). Re-running pulls the latest image. The machine shows as **Online** under Runs -> Workers in the console; there you can cap how many jobs it runs, or pause it, to split work between machines. Closing the laptop makes it **Offline**; its jobs are re-queued automatically.

Image: `ghcr.io/tienvu-lol/accessibility-hci-and-llm-research/study-worker:latest`, built for amd64 and arm64 by CI on every push to `main`. To test an image you built locally: `WORKER_IMAGE=study-worker ./agent/start.sh`.

## Open-source arms (A5 DeepSeek, A6 Qwen) on VT ARC
A5 and A6 are not hosted APIs: they are llama.cpp servers inside an ARC session, reachable only over SSH. So
instead of keys on the console, this machine runs, per arm, an SSH-tunnel container and a worker container
that takes only that arm's jobs. The llama.cpp key never leaves this machine, and an arm is offered to the
console only while its tunnel answers, so a dropped ARC session just stops new claims for that arm.

1. Put the ARC settings in `agent/agent.env` (see `agent.env.example`): `ARC_USER`, `ARC_HOST`,
   `ARC_A5_TARGET`, `ARC_A6_TARGET` (the `node:port` of each llama.cpp server, as reachable from the login
   host), `A5_API_KEY`, `A6_API_KEY`.
2. Put your ARC private key at `agent/arc/ssh/id` (git-ignored, `chmod 600`), or set `ARC_PASSWORD`.
   Interactive 2FA (Duo) cannot be automated by the tunnel.
3. Start: `./agent/start.sh --arc` (macOS one-shot: `ARC=1 ... ./agent/setup-mac.sh`, which also probes both
   tunnels and tells you which setting is wrong if one does not answer). Stop: `./agent/stop.sh`.
4. In the console, turn on **Keys & arms -> "Run open-source arms (A5, A6) on laptops with an ARC tunnel"**.
   Until a worker advertises a live tunnel for an arm, starting the repair phase is blocked for that arm.

Containers: `study-arc-a5` / `study-arc-a6` (tunnels, local ports 8091 / 8090) and `study-agent-a5` /
`study-agent-a6` (workers). Logs: `docker logs -f study-arc-a5`.

Two checks that need no ARC account and make no paid calls:
```
./agent/arc/selftest.sh        # the tunnel container forwards, and signs in again after the server drops
./agent/arc/e2e-open-arms.sh   # a full A5+A6 repair run through the containers against a fake llama.cpp
```
`e2e-open-arms.sh` brings up two fake llama.cpp servers (`arc/fake-llama.js`), a throwaway sshd, the console
image and the real `arc` compose profile, then waits for both cells to finish and checks that the pages the
console stored carry the marker the fake server wrote. Run it with no real agent running (the container names
are the same). Verified on macOS 26 / Apple Silicon, Docker Desktop 29.1.5.

## Pull results into git
```
WEB_URL=https://<console> APP_PASSWORD=<password> node agent/sync-results.js --commit
git push
```
Writes `Study/runs/**` and `Study/results-export/*.csv|all.json`, then commits (no push). `.gitignore` still excludes raw responses and intermediate iterations.
