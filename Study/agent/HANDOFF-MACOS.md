# Handoff: set up this Mac as a worker (for your Claude Code agent)

Paste this whole file to Claude Code on the Mac, or tell it: "Read Study/agent/HANDOFF-MACOS.md and do it."

## Goal
Make this Mac join the research console as a worker: Docker running, worker image built for this Mac's CPU, agent container online. Then fix anything that breaks on macOS and push the fix.

## Inputs you need from the human (ask once, never commit them)
- `WEB_URL`: the console URL, e.g. `http://<host-laptop-tailscale-name>:8080`
- `WORKER_TOKEN`: the shared worker token
- A machine name (default: `hostname -s`)
The human must have **Tailscale installed and signed in to the same tailnet** (`brew install --cask tailscale`, open it, log in; the first sign-in needs a GUI click you cannot do). The script detects Tailscale (PATH or `/Applications/Tailscale.app`), runs `tailscale up` for you when the Mac is already signed in but disconnected, and prints the manual steps when it cannot. Verify with `tailscale status` or by `curl <WEB_URL>/healthz` returning `{"ok":true}`.

## Steps
1. `git clone https://github.com/tienvu-lol/Accessibility-HCI-and-LLM-Research && cd Accessibility-HCI-and-LLM-Research && git checkout study/hackloop-orchestration` (or `main` once merged).
2. Run: `WEB_URL=... WORKER_TOKEN=... MACHINE_NAME=... ./Study/agent/setup-mac.sh`
   - It installs Colima + Docker CLI + compose via Homebrew if no Docker daemon is running (no sudo, no GUI). If Docker Desktop is installed, start it first and the script uses it.
   - It brings up Tailscale, then checks `/healthz` **and** validates `WORKER_TOKEN` against `POST /api/worker/claim` (`max:0`, a harmless keepalive) *before* building, so a bad token fails in seconds instead of after a multi-minute build. The token travels in a 0600 curl config file, never in argv.
   - Then it builds `study-worker` natively (arm64 on Apple Silicon; several minutes), writes `Study/agent/agent.env` (git-ignored, created 0600 via `umask`), and starts the `study-agent` container.
   - Flags: `REBUILD=1` rebuilds the image, `SKIP_CHECK=1` skips the console preflight, `REQUIRE_TAILSCALE=1` aborts unless the tailnet is up.
3. Verify: `docker ps` shows `study-agent` Up; `docker logs study-agent` has no errors; the human sees this machine **Online** under Runs -> Workers in the console, with OS "macOS arm64".
4. Optional smoke test: ask the host to run a mock repair; confirm `docker logs study-agent` shows `repair:... ok` lines.

## Status on this Mac (verified 2026-11-20, macOS 26.5.2, Apple Silicon, Docker Desktop 29.1.5, bash 3.2)
The worker and the open-source arms both run here. What was checked, in order:
`node --test 'webapp/test/*.test.js'` (74 pass) and `python -m pytest -q Study/tools/judge` (12 pass);
`study-worker` and `study-web` rebuilt natively for arm64; `agent/arc/selftest.sh` (forward + reconnect);
`agent/arc/e2e-open-arms.sh` (a full A5+A6 repair run through the containers, both cells converged on
iteration 2); and `ARC=1 ... setup-mac.sh` twice against the same fake ARC, which brought up all five
containers and left the console showing `<name>-a5` and `<name>-a6` with live tunnels.

## Open arms (A5 DeepSeek, A6 Qwen) on this Mac
Only needed if this Mac is the one tunnelling into VT ARC. `agent/README.md` has the details; the short form:
1. Ask the human for `ARC_USER`, `ARC_HOST`, `ARC_A5_TARGET`, `ARC_A6_TARGET` (`node:port` of each llama.cpp
   server), `A5_API_KEY`, `A6_API_KEY`, and their ARC private key, which goes at `agent/arc/ssh/id`
   (`chmod 600`, git-ignored). Duo / interactive 2FA cannot be automated - the key must work non-interactively.
2. `ARC=1 WEB_URL=... WORKER_TOKEN=... ARC_USER=... ARC_HOST=... ARC_A5_TARGET=... ARC_A6_TARGET=... \
   A5_API_KEY=... A6_API_KEY=... ./Study/agent/setup-mac.sh`
   It validates those settings before building, carries them over on a re-run, starts the tunnel and worker
   container for each arm, and then probes each tunnel from inside its worker. A failed probe prints the
   tunnel log and says whether it looks like an SSH refusal or a wrong `node:port`.
3. The human turns on **Keys & arms -> "Run open-source arms (A5, A6) on laptops with an ARC tunnel"**.
4. Before involving ARC at all, you can prove the containers work: `./Study/agent/arc/e2e-open-arms.sh`
   (fake sshd + fake llama.cpp, no paid calls, no ARC account). Run it with no real agent up: same names.

## If something fails (iterate until it works)
| Symptom | Likely cause / fix |
|---|---|
| `Homebrew missing` | install from https://brew.sh |
| `docker compose` not found | `brew install docker-compose`; the script links it into `~/.docker/cli-plugins` |
| Colima won't start | `colima delete && colima start --cpu 4 --memory 8`; on Apple Silicon try `--vm-type vz` |
| `no reply from .../healthz` | Tailscale not connected, wrong host name, or host's compose bound with `BIND_ADDR` to a different IP. The script now says which of these it thinks it is, based on whether the host looks like a tailnet name and whether the tailnet is up |
| `/healthz answered HTTP <n>` | reachable but not the console - wrong URL or path |
| `the console rejected WORKER_TOKEN (401)` | wrong `WORKER_TOKEN`; caught by the preflight before any build |
| build fails on a package/arch error | read the failing line; the Dockerfile is `Study/webapp/Dockerfile.worker` (Playwright base image is multi-arch) |
| `host.docker.internal` issues | only matters if the console runs on this same Mac; use its tailnet URL instead |
| `ARC=1 is missing: ...` | those settings are in neither the environment nor `agent.env`; see `agent/agent.env.example` |
| `tunnel a5 never answered` | read the printed tunnel log: an auth refusal means the SSH key/2FA failed; a refused forward means `ARC_A5_TARGET` is not serving on that `node:port`. Mainstream jobs still run; only A5/A6 are withheld |
| `container study-agent-a5 already exists` when running the e2e | stop the real agent first (`./agent/stop.sh`): the compose file pins container names |

Fix macOS problems in `Study/agent/setup-mac.sh` / `start.sh` (note macOS ships bash 3.2: no `mapfile`, no `${var,,}`, no associative arrays). Keep files LF-ended.

## Push your fixes
```
git checkout -b mac-agent-fixes
git add Study/agent && git status   # confirm agent.env and tokens are NOT staged
git commit -m "fix(agent): macOS setup fixes" && git push -u origin mac-agent-fixes
```
Report back: macOS version, chip, what failed, what you changed, and whether the machine shows Online.

## Rules
- Never print, log or commit `WORKER_TOKEN`, `agent.env`, or any API key.
- This Mac needs no API keys; they live on the host console.
- Stop the agent with `./Study/agent/stop.sh` (or `docker rm -f study-agent`).
