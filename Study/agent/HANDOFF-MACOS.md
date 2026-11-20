# Handoff: set up this Mac as a worker (for your Claude Code agent)

Paste this whole file to Claude Code on the Mac, or tell it: "Read Study/agent/HANDOFF-MACOS.md and do it."

## Goal
Make this Mac join the research console as a worker: Docker running, worker image built for this Mac's CPU, agent container online. Then fix anything that breaks on macOS and push the fix.

## Inputs you need from the human (ask once, never commit them)
- `WEB_URL`: the console URL, e.g. `http://<host-laptop-tailscale-name>:8080`
- `WORKER_TOKEN`: the shared worker token
- A machine name (default: `hostname -s`)
The human must have **Tailscale installed and signed in to the same tailnet** (`brew install --cask tailscale`, open it, log in; this needs a GUI click you cannot do). Verify with `tailscale status` or by `curl <WEB_URL>/healthz` returning `{"ok":true}`.

## Steps
1. `git clone https://github.com/tienvu-lol/Accessibility-HCI-and-LLM-Research && cd Accessibility-HCI-and-LLM-Research && git checkout study/hackloop-orchestration` (or `main` once merged).
2. Run: `WEB_URL=... WORKER_TOKEN=... MACHINE_NAME=... ./Study/agent/setup-mac.sh`
   - It installs Colima + Docker CLI + compose via Homebrew if no Docker daemon is running (no sudo, no GUI). If Docker Desktop is installed, start it first and the script uses it.
   - It checks the console is reachable, builds `study-worker` natively (arm64 on Apple Silicon; several minutes), writes `Study/agent/agent.env` (git-ignored), and starts the `study-agent` container.
   - Re-run with `REBUILD=1` to rebuild the image.
3. Verify: `docker ps` shows `study-agent` Up; `docker logs study-agent` has no errors; the human sees this machine **Online** under Runs -> Workers in the console, with OS "macOS arm64".
4. Optional smoke test: ask the host to run a mock repair; confirm `docker logs study-agent` shows `repair:... ok` lines.

## If something fails (iterate until it works)
| Symptom | Likely cause / fix |
|---|---|
| `Homebrew missing` | install from https://brew.sh |
| `docker compose` not found | `brew install docker-compose`; the script links it into `~/.docker/cli-plugins` |
| Colima won't start | `colima delete && colima start --cpu 4 --memory 8`; on Apple Silicon try `--vm-type vz` |
| `Cannot reach the console` | Tailscale not connected, wrong host name, or host's compose bound with `BIND_ADDR` to a different IP |
| 401 / "claim rejected" in logs | wrong `WORKER_TOKEN` |
| build fails on a package/arch error | read the failing line; the Dockerfile is `Study/webapp/Dockerfile.worker` (Playwright base image is multi-arch) |
| `host.docker.internal` issues | only matters if the console runs on this same Mac; use its tailnet URL instead |

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
