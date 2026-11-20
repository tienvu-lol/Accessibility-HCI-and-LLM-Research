# Worker agent (join the hosted console from a laptop)

Runs a Docker worker that connects to the hosted console, takes jobs, and sends results back. Provider keys are managed by the console and sent to the trusted Docker worker only as needed for a job, never to a browser viewing Runs.

**Needs:** Docker Desktop running; the console URL and `WORKER_TOKEN` from whoever hosts it; a GitHub token with `read:packages` while the repo is private (`docker login ghcr.io -u <github-user>`, paste the token as password).

| OS | start | stop |
|---|---|---|
| macOS / Linux | `./agent/start.sh` | `./agent/stop.sh` |
| Windows | `powershell -ExecutionPolicy Bypass -File agent\start.ps1` | `agent\stop.ps1` |

The first run asks for the URL, token, a machine name and slot count, and saves them in `agent/agent.env` (git-ignored). Use the tailnet URL (for example, `http://100.112.79.22:8080/`). The launcher reads the account, device name, and IP from the host Tailscale CLI (`python3` is also needed on macOS/Linux), and reports them in **Runs → Workers**. These are labels reported by the worker, not separate sign-in credentials. ARC workers share the same device and account but have distinct worker IDs.

1. Start a Docker agent on each machine. The **Online** badge means the worker is polling; merely opening the dashboard on Tailscale does not register a worker.
2. Start a study phase in **Overview**, then open **Runs**. Any signed-in operator can use **Claim jobs** for any online worker in manual mode, including a worker on another computer. New laptop agents default to manual; for an older or automatic worker, use **Switch to manual** first.
3. **Unclaim** withdraws work not yet picked up. Jobs already running finish as normal. An unfilled request expires after one minute. **Set cap** limits concurrent work; **Switch to auto** lets a worker keep claiming as slots free up. **Live jobs** shows all running jobs and the last 30 finished jobs.

Image: `ghcr.io/tienvu-lol/accessibility-hci-and-llm-research/study-worker:latest`, built for amd64 and arm64 by CI on every push to `main`. To test an image you built locally: `WORKER_IMAGE=study-worker ./agent/start.sh`.

## Enroll a computer for GUI deployment

On the console host, set a strong, random `DASHBOARD_LAUNCH_TOKEN` in `Dashboard/.env` and recreate the web service. On each trusted Tailscale computer, configure `agent.env` with the console URL, worker token, machine name, slots, and any optional ARC settings. Put the same launcher token in a separate git-ignored `Study/agent/launcher.env`. Keep both files private; anyone with the launcher token can enroll a computer as a deployment target. Use the current worker image (`WORKER_IMAGE=study-worker:latest` in `launcher.env` if built locally).

Run this once on that computer and leave it running (Node 24+, Docker Compose, Tailscale CLI and Bash; Git Bash on Windows):

```sh
node --env-file=Study/agent/agent.env --env-file=Study/agent/launcher.env Study/agent/launch.js
```

The launcher does not start any worker by itself. In **Runs**, queue work, then choose **Deploy & claim** for a computer and target. The launcher executes `start.sh` with the matching Compose worker service; after the worker registers, the console sends it a claim under the normal caps and budget. The **Job queue** is visible even with no enrolled computers or worker containers. A device needs a local Tailscale connection and launcher to receive deployments; signing in via a browser is not enrollment.

## Open-source arms on VT ARC
A5 (DeepSeek), A6 (Qwen), and A7 (GLM 4.7 Flash) are not hosted APIs: they are llama.cpp servers inside an ARC session, reachable only over SSH. So
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
4. To run A7 on this machine, set `ARC_A7_TARGET` (and optionally `A7_API_KEY` for a key kept local) and add `--a7` to the launcher, with or without `--arc`. Otherwise save the A7 key in **Keys & arms**. Future configured self-hosted arms automatically get a dashboard key slot and run grid; they also need a worker advertising a live tunnel via `ARC_URLS`.
5. In the console, turn on **Keys & arms → Run open-source arms on laptops with an ARC tunnel**. Dispatch requires a live ARC tunnel for the corresponding arm.

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
