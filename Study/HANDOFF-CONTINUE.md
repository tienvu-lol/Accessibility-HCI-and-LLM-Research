# Handoff: researcher console, workers, ARC arms (state as of 2026-11-20)

Read this first on a new machine, then `webapp/DEPLOY.md` and `agent/README.md`.

## What exists and works (all tested locally with MOCK_PROVIDERS=1, no paid calls)
- **Console** (`webapp/server.js`, zero deps): UI + API + job coordinator. Docker image `webapp/Dockerfile.web`, deploy from [`Dashboard/`](../Dashboard/README.md) at the repository root.
- **Workers** (`webapp/worker.js`, image `webapp/Dockerfile.worker`): pull jobs (repair / score / judge) from the console and push results back. Keys never live on a worker; they arrive inside each job.
- **Dashboard (Runs -> Workers)**: online/offline badge, machine name + OS, per-worker slot cap and pause (compute split), "Docker workers" panel to start/stop containers on the console host (`DOCKER_WORKERS=1`).
- **Cost view**: projection by arm (A1-A6 + judge), spent / remaining / projected total / at-start baseline / change, live usage feed, budget cap editable any time (hard stop, default $200), **contribution by machine** and **spend by API key**.
- **Usage ledger**: `data/usage.jsonl` holds one immutable fact per finished call - the machine that ran it, the model that served it, the key that paid, whether it was a mock call, and the cost at the price then in effect. Nothing reprices history, mock runs are never spend, and "measured" means measured from real calls on the arm's current model. `Cost -> Clear usage history` (POST `/api/usage/reset`) archives the file and starts the books clean after a test run.
- **Laptop agent** `agent/`: `start.sh` (macOS/Linux), `start.ps1` (Windows), `setup-mac.sh` (installs Colima, builds the worker image natively, joins the console), `sync-results.js` (pull results into git). Mac handoff: `agent/HANDOFF-MACOS.md`.
- **Open-source arms on VT ARC (A5 DeepSeek, A6 Qwen)**: per-arm containers on the laptop. `./agent/start.sh --arc` starts, per arm, an SSH-tunnel container (`agent/arc/tunnel.sh`, signs in again whenever the session drops) and a worker container that only takes that arm's jobs while its tunnel answers. Turn on Keys & arms -> "Run open-source arms (A5, A6) on laptops with an ARC tunnel". Verified end to end against a fake sshd + fake llama.cpp: `agent/arc/selftest.sh` (forward + reconnect after ssh restart) and a full repair run for A5/A6 through the containers.
- **Tests**: `cd Study && node --test 'webapp/test/*.test.js'` (74 pass) and `python -m pytest -q Study/tools/judge` from the repo root (12 pass). Both re-run green on macOS 26 / Apple Silicon / Node 26 on 2026-11-20. Browser test against a running console: `WEB_URL=... APP_PASSWORD=... node webapp/e2e-ui.js` (needs Playwright chromium).
- **Cost config**: `config/live-arms.json` (A1-A4 models) + `webapp/lib/pricing.default.json` (prices with sources). Apply to a live console: `WEB_URL=... APP_PASSWORD=... node webapp/tools/apply-config.js` (prints the projection).

## Live deployment (on the original laptop, may be off)
Console on the Tailscale address `http://100.112.79.22:8080` (compose binds `BIND_ADDR`). Secrets are in `Dashboard/.env` on that laptop only (never committed): `APP_PASSWORD`, `WORKER_TOKEN`. Ask the owner for them. The host's own agent must use `WEB_URL=http://100.112.79.22:8080` (not `host.docker.internal`) when `BIND_ADDR` is set.

## NOT done / unverified
1. **Real paid run**: no API keys have been used. Paste OpenAI / Anthropic / Gemini keys under Keys & arms (kept in memory only) and leave `MOCK_PROVIDERS` unset. Do a one-site real run first.
2. **Clear the test data on the live console** before any real run: the rows recorded there predate per-call attribution, so they show as *legacy* and are priced on read. Cost -> Clear usage history.
3. **Budget**: current projection is about $324 against the $200 cap (Astra `gpt-6.2-astra` alone is about $149). Decide: fewer sites/conditions, max 1 iteration, or a cheaper A3. Per-provider caps ($50 Claude / $50 Codex per person) are not tracked separately, only one combined cap.
4. **Model ids**: A3 = `gpt-6.2-astra` ($8/$40 per Mtok), A4 = `gpt-6.1-sol` ($2/$10) were chosen from OpenAI's pricing page; confirm they are the intended models.
5. **ARC for real**: the containers are proven (see below), but nothing has talked to ARC itself. Still needed: `ARC_USER`, `ARC_HOST`, `ARC_A5_TARGET`, `ARC_A6_TARGET` (node:port of each llama.cpp server), `A5_API_KEY`, `A6_API_KEY`, and an SSH key at `agent/arc/ssh/id` (or `ARC_PASSWORD`). Duo / interactive 2FA cannot be automated by the tunnel, so the key must work non-interactively. The A5 model id in the config still reads "PENDING: confirm hosted vs GGUF" (the console strips the note and sends `unsloth/DeepSeek-V4-Flash-0731-GGUF`); confirm it. A5's tunnel port defaults to 8091, A6 to 8090.
6. **macOS**: done for the agent, including the open arms - see "Verified on macOS" below. Untested on Colima specifically (this Mac had Docker Desktop) and on Intel Macs.
7. **GitHub**: CI (`.github/workflows/ci.yml`) publishes the multi-arch worker image to `ghcr.io/tienvu-lol/accessibility-hci-and-llm-research/study-worker` only on pushes to `main`; nothing is merged to main yet, so use `agent/setup-mac.sh` (local build) or `docker save | docker load` until then. CI also runs worker tests that may need Chromium; unverified on GitHub runners.
8. **Tailscale**: working on the host (IP above). The Windows DNS health warning ("file in use by another process") is harmless; use the 100.x IP rather than MagicDNS names. Windows Firewall may need an inbound rule for TCP 8080 on the Tailscale interface (admin PowerShell: `New-NetFirewallRule -DisplayName study-console -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow -InterfaceAlias Tailscale`).
9. **Known quirks**: dashboard-started containers and old workers stay listed as Offline for 7 days; the cost-judge estimate uses a flat 1000 output tokens until real judge usage exists.

## Verified on macOS (2026-11-20, macOS 26.5.2, Apple Silicon, Docker Desktop 29.1.5, Node 26, bash 3.2)
A5/A6 open-source jobs run in this machine's Docker containers. What proves it, all without ARC and without a paid call:
- `./agent/arc/selftest.sh` - the tunnel container forwards through SSH and signs in again after the server restarts.
- `./agent/arc/e2e-open-arms.sh` - **the full path**: two fake llama.cpp servers (`agent/arc/fake-llama.js`), a throwaway sshd, the real console image and the real `arc` compose profile (tunnel + worker container per arm). It logs in, turns on `dispatch_open`, runs one site/condition, and both the A5 and A6 cells finish `ok` and converged on iteration 2 with the right model ids, non-zero usage, and the marker the fake server wrote present in the pages the console stored - so the bytes went worker container -> tunnel container -> ssh -> llama.cpp and back. Run it with no real agent up: the compose file pins container names.
- `ARC=1 ... ./agent/setup-mac.sh` against the same fixture, twice: it validates the ARC settings before building, starts all five containers, probes each tunnel from inside its worker, and the console then lists `<name>`, `<name>-a5` (arcs A5) and `<name>-a6` (arcs A6). The second run proves ARC settings already in `agent.env` survive a re-run.

Changes this needed: `setup-mac.sh` grew an `ARC=1` mode and stopped wiping the ARC lines out of `agent.env` on every re-run; `start.sh` keeps both the `--arc` profile and the macOS local-image behaviour.

## Cost and progress: what was wrong and what it means now (2026-11-20)
The dashboard reported phases as finished and every arm as "measured" after nothing but mock runs. The cause was that the ledger stored no facts and everything was recomputed on read. Fixed, with tests:
- **Spend is history.** Each call's cost is priced once, when it is recorded, from the model that served it. Changing an arm's model or a price no longer reprices past spend; the arm simply falls back to `estimated` until the new model has real calls.
- **Mock runs are not spend.** `MOCK_PROVIDERS=1` rows cost $0 and are excluded from intake, from spend and from the measured basis; they are shown as "test" calls. `Cost -> Clear usage history` archives everything recorded so far.
- **Done means done.** A cell counts as done only when it produced output (`ok` or `imported`); `failed` and `truncated` are reported as "N failed", so a phase can no longer read "Done" while cells are broken. Score coverage counts only the arms and conditions in scope, and the judge's total comes from sites x arms instead of from however many items happen to be queued.
- **Attribution.** Every call records its machine, model and key. Cost has "Contribution by machine" and "Spend by API key"; the Runs matrix tints each cell with the colour of the computer that ran it; `cost_by_source.csv` exports one row per (arm, machine, model, key).
- **A5 and A6 have separate keys.** Keys & arms has a key slot per open arm. A key set there is sent inside that arm's jobs only; with no key there, the arm uses the one on the laptop holding its tunnel (`local:<machine>` in the spend breakdown). The two are never interchangeable, and `agent/arc/e2e-open-arms.sh` proves both paths at once, with each fake server rejecting the other arm's key.

## First steps on a new machine
```
git clone https://github.com/tienvu-lol/Accessibility-HCI-and-LLM-Research && cd Accessibility-HCI-and-LLM-Research
git checkout study/hackloop-orchestration
cd Study && npm ci && node --test 'webapp/test/*.test.js'     # expect 74 pass
```
Then either join an existing console as a worker (`agent/README.md`, or `agent/HANDOFF-MACOS.md` on a Mac) or host your own (`webapp/DEPLOY.md` sections 7-9).

## Rules
Never commit `.env`, `agent/agent.env`, `agent/arc/ssh/*`, or any key/token. Files in `agent/*.sh` must stay LF-ended (`.gitattributes` enforces it). `webapp/public/app.js` must stay valid UTF-8: edit it with an encoding-aware tool (a stray Latin-1 byte once slipped in and was fixed).
