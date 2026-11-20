# Handoff: researcher console, workers, ARC arms (state as of 2026-11-20)

Branch `study/hackloop-orchestration`. Read this first on a new machine, then `webapp/DEPLOY.md` and `agent/README.md`.

## What exists and works (all tested locally with MOCK_PROVIDERS=1, no paid calls)
- **Console** (`webapp/server.js`, zero deps): UI + API + job coordinator. Docker image `webapp/Dockerfile.web`, stack in `docker-compose.yml` (`cp .env.example .env`; set `APP_PASSWORD`, `WORKER_TOKEN`; `docker compose --profile build build && docker compose up -d web`).
- **Workers** (`webapp/worker.js`, image `webapp/Dockerfile.worker`): pull jobs (repair / score / judge) from the console and push results back. Keys never live on a worker; they arrive inside each job.
- **Dashboard (Runs -> Workers)**: online/offline badge, machine name + OS, per-worker slot cap and pause (compute split), "Docker workers" panel to start/stop containers on the console host (`DOCKER_WORKERS=1`).
- **Cost view**: projection by arm (A1-A6 + judge), spent / remaining / projected total / at-start baseline / change, live usage feed, budget cap editable any time (hard stop, default $200).
- **Laptop agent** `agent/`: `start.sh` (macOS/Linux), `start.ps1` (Windows), `setup-mac.sh` (installs Colima, builds the worker image natively, joins the console), `sync-results.js` (pull results into git). Mac handoff: `agent/HANDOFF-MACOS.md`.
- **Open-source arms on VT ARC (A5 DeepSeek, A6 Qwen)**: per-arm containers on the laptop. `./agent/start.sh --arc` starts, per arm, an SSH-tunnel container (`agent/arc/tunnel.sh`, signs in again whenever the session drops) and a worker container that only takes that arm's jobs while its tunnel answers. Turn on Keys & arms -> "Run open-source arms (A5, A6) on laptops with an ARC tunnel". Verified end to end against a fake sshd + fake llama.cpp: `agent/arc/selftest.sh` (forward + reconnect after ssh restart) and a full repair run for A5/A6 through the containers.
- **Tests**: `cd Study && node --test 'webapp/test/*.test.js'` (74 pass) and `python -m pytest -q Study/tools/judge` from the repo root (12 pass). Browser test against a running console: `WEB_URL=... APP_PASSWORD=... node webapp/e2e-ui.js` (needs Playwright chromium).
- **Cost config**: `config/live-arms.json` (A1-A4 models) + `webapp/lib/pricing.default.json` (prices with sources). Apply to a live console: `WEB_URL=... APP_PASSWORD=... node webapp/tools/apply-config.js` (prints the projection).

## Live deployment (on the original laptop, may be off)
Console on the Tailscale address `http://100.112.79.22:8080` (compose binds `BIND_ADDR`). Secrets are in `Study/.env` on that laptop only (never committed): `APP_PASSWORD`, `WORKER_TOKEN`. Ask the owner for them. The host's own agent must use `WEB_URL=http://100.112.79.22:8080` (not `host.docker.internal`) when `BIND_ADDR` is set.

## NOT done / unverified
1. **Real paid run**: no API keys have been used. Paste OpenAI / Anthropic / Gemini keys under Keys & arms (kept in memory only) and leave `MOCK_PROVIDERS` unset. Do a one-site real run first.
2. **Budget**: current projection is about $324 against the $200 cap (Astra `gpt-6.2-astra` alone is about $149). Decide: fewer sites/conditions, max 1 iteration, or a cheaper A3. Per-provider caps ($50 Claude / $50 Codex per person) are not tracked separately, only one combined cap.
3. **Model ids**: A3 = `gpt-6.2-astra` ($8/$40 per Mtok), A4 = `gpt-6.1-sol` ($2/$10) were chosen from OpenAI's pricing page; confirm they are the intended models.
4. **ARC for real**: needs `ARC_USER`, `ARC_HOST`, `ARC_A5_TARGET`, `ARC_A6_TARGET` (node:port of each llama.cpp server), `A5_API_KEY`, `A6_API_KEY`, and an SSH key at `agent/arc/ssh/id` (or `ARC_PASSWORD`). Duo / interactive 2FA cannot be automated by the tunnel. The A5 model id in the config still reads "PENDING: confirm hosted vs GGUF" (the console strips the note and sends `unsloth/DeepSeek-V4-Flash-0731-GGUF`); confirm it. A5's tunnel port defaults to 8091, A6 to 8090.
5. **macOS**: `setup-mac.sh` and the agent are untested on a real Mac (Apple Silicon, Colima, arm64 image build, bash 3.2).
6. **GitHub**: CI (`.github/workflows/ci.yml`) publishes the multi-arch worker image to `ghcr.io/tienvu-lol/accessibility-hci-and-llm-research/study-worker` only on pushes to `main`; nothing is merged to main yet, so use `agent/setup-mac.sh` (local build) or `docker save | docker load` until then. CI also runs worker tests that may need Chromium; unverified on GitHub runners.
7. **Tailscale**: working on the host (IP above). The Windows DNS health warning ("file in use by another process") is harmless; use the 100.x IP rather than MagicDNS names. Windows Firewall may need an inbound rule for TCP 8080 on the Tailscale interface (admin PowerShell: `New-NetFirewallRule -DisplayName study-console -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow -InterfaceAlias Tailscale`).
8. **Known quirks**: dashboard-started containers and old workers stay listed as Offline for 7 days; the demo data (`public/demo-state.json`) lacks the newer projection fields (shows n/a); the cost-judge estimate uses a flat 1000 output tokens until real judge usage exists.

## First steps on a new machine
```
git clone https://github.com/tienvu-lol/Accessibility-HCI-and-LLM-Research && cd Accessibility-HCI-and-LLM-Research
git checkout study/hackloop-orchestration
cd Study && npm ci && node --test 'webapp/test/*.test.js'     # expect 74 pass
```
Then either join an existing console as a worker (`agent/README.md`, or `agent/HANDOFF-MACOS.md` on a Mac) or host your own (`webapp/DEPLOY.md` sections 7-9).

## Rules
Never commit `.env`, `agent/agent.env`, `agent/arc/ssh/*`, or any key/token. Files in `agent/*.sh` must stay LF-ended (`.gitattributes` enforces it). `webapp/public/app.js` must stay valid UTF-8: edit it with an encoding-aware tool (a stray Latin-1 byte once slipped in and was fixed).
