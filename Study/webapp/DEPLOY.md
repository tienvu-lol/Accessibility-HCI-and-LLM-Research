# Deploying the researcher console on Railway

Two services from this one repo, both with **Root Directory = `Study`** (the Docker build context is `Study/`):

| service | config file path | notes |
|---|---|---|
| `web` | `/Study/webapp/railway.web.json` | one replica, volume at `/data`, public domain |
| `worker` | `/Study/webapp/railway.worker.json` | N replicas, no volume, no public domain |

## 1. Web service
1. New service -> GitHub repo -> Settings -> Root Directory `Study`; Config-as-code path `webapp/railway.web.json` (Railway reads the Dockerfile path from it: `webapp/Dockerfile.web`).
2. Add a **Volume** mounted at `/data` (volumes attach to ONE service; only web gets one). Keep `numReplicas` at 1.
3. Variables:
   - `APP_PASSWORD` (required; the server refuses to start without it in production)
   - `WORKER_TOKEN` (required): generate with `openssl rand -hex 32` (or `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`). Use a Railway shared variable so web and worker get the same value.
   - optional initial keys: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`; keys can also be set from the UI (memory only, never persisted)
   - `DATA_DIR=/data`, `PORT=8080` are already set in the image. `MOCK_PROVIDERS=1` runs everything without real API calls (use it for a dry run); `DEMO=1` serves synthetic data.
4. Generate a public domain. Healthcheck is `/healthz`.

## 2. Worker service
1. New service from the same repo, Root Directory `Study`, config path `webapp/railway.worker.json` (example `numReplicas: 3`).
2. Variables: `WORKER_TOKEN` (same value), `WEB_URL`, `WORKER_SLOTS` (default 4), optional `POLL_MS` (default 3000), `WORKER_ID` (default hostname).
3. `WEB_URL`:
   - private (preferred, free, no public hop): `http://<web-service-name>.railway.internal:8080`
   - public: `https://<your-web-domain>`. The token authenticates either way, but prefer private networking.
4. No volume, no healthcheck: a worker only makes outbound requests. API keys arrive inside claimed jobs and are passed to subprocesses by environment variable only.

## 3. Scaling and concurrency
Parallel cells = replicas x `WORKER_SLOTS`. The server additionally caps each arm at `arms.<A>.concurrency` (12 for A1-A4 in `config/repair-allocation.json`) across ALL workers, so more than 12 parallel slots on one arm just idle. Example: 3 replicas x 4 slots = 12 slots, which saturates one arm at a time. For all four arms at once, use up to 48 slots, but check your provider rate limits first (429s are retried 2x by the runner, then the cell fails and is counted).
Each repair slot is mostly waiting on the provider (cheap on CPU); score slots run chromium (about 1 CPU and 1 GB each), so size replicas for scoring.

If a worker dies, its lease (900 s) expires and the job is requeued without counting an attempt. A worker that hits an infrastructure problem (network, scratch dir, spawn) releases the job at once.

## 4. Cost warning
Repair is 4 arms x 4 conditions x 60 sites x up to 3 iterations with up to 32k output tokens per call, plus 360 judge calls. That is thousands of paid calls. Set `budget_usd` in the UI before starting and check the estimate (`estimate.json`, built from `worker/estimate.py`). Pricing entries ship as `verified:false` placeholders; fix them before trusting the budget guard. Use `MOCK_PROVIDERS=1` for a dry run first.

## 5. Open-source arms (A5, A6) on ARC
Two ways, and the console does both:

**Dispatch (preferred).** A laptop runs an SSH tunnel container per arm into the ARC session and a worker
container that takes only that arm's jobs; the llama.cpp keys stay on that laptop and the console sends the
jobs to it. Set it up with `agent/README.md` ("Open-source arms"), then turn on **Keys & arms -> "Run
open-source arms (A5, A6) on laptops with an ARC tunnel"**. Starting the repair phase stays blocked for an
arm until some worker advertises a live tunnel for it. Proof that the containers work without an ARC account:
`agent/arc/selftest.sh` and `agent/arc/e2e-open-arms.sh`.

**Import.** If the arm was run by hand on ARC instead, pack its `runs/` and import:
```
python Study/webapp/worker/pack_runs.py --runs Study/runs --arms A5,A6 --out runs.ndjson.gz
# optional direct upload; --token is the value of the `sid` cookie after logging in to the console
python Study/webapp/worker/pack_runs.py --runs Study/runs --arms A5,A6 --out runs.ndjson.gz \
  --post https://<your-web-domain> --token <sid cookie>
```
Or upload `runs.ndjson.gz` through the console's import control (`POST /api/import`, `application/x-ndjson+gzip`). Only `.html .css .json .js .svg .txt` files are packed (what the server accepts). Rejected lines come back in the reply.

## 6. Local checks
```
docker build -f webapp/Dockerfile.web    -t study-web    .   # run from Study/
docker build -f webapp/Dockerfile.worker -t study-worker .
node --test --test-reporter=tap webapp/test/worker*.test.js
```
The worker image tag `mcr.microsoft.com/playwright:v<version>-noble` must match the `playwright` version in `Study/package-lock.json`; bump both together.

## 7. Self-hosted: start workers from the dashboard (Docker)
Railway cannot expose a docker socket, so dashboard-launched containers need a machine you control (a VPS or your own box with Docker).
```
cp .env.example .env                       # set APP_PASSWORD and WORKER_TOKEN
docker compose --profile build build       # builds study-web and study-worker
docker compose up -d web                   # http://localhost:8080
```
In the console open Runs -> Docker workers, pick containers and slots, Start. Containers are labelled `study-worker=1`, join the `study-net` network, connect to `http://web:8080` with the shared token, and show up under Workers. "Remove" / "Remove all" deletes only labelled containers.
- Enabled by `DOCKER_WORKERS=1` (set in the compose file). `DOCKER_MAX_WORKERS` (default 8) caps running containers; `WORKER_IMAGE` (default `study-worker`); `DOCKER_NETWORK`; `WORKER_WEB_URL` (default `http://host.docker.internal:$PORT`, for running the server directly on the host).
- Security: mounting `/var/run/docker.sock` is root-equivalent on the host. Use HTTPS, a strong `APP_PASSWORD`, and set `DOCKER_GID` (Linux: `stat -c %g /var/run/docker.sock`).
- Running `node webapp/server.js` on the host instead works too: set `DOCKER_WORKERS=1` and `WORKER_TOKEN`, build `study-worker` first.

## 8. Railway + laptops (the target setup)
- Railway runs only `web` (section 1) with a volume. Do not set `DOCKER_WORKERS` there. Skip the Railway `worker` service if laptops do the compute, or keep it for extra capacity.
- Laptops connect with `agent/start.sh` / `agent/start.ps1` (see `agent/README.md`). Railway's private network (`*.railway.internal`) is only reachable from inside Railway, so laptops use the service's HTTPS domain. It is not open: every worker call needs `WORKER_TOKEN` and the UI needs `APP_PASSWORD`. For a fully non-public link, put the laptops and a self-hosted web on Tailscale instead and use the tailnet URL as `WEB_URL`.
- Paid calls: set `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` as Railway variables (or paste them in Keys & arms), leave `MOCK_PROVIDERS` unset, verify pricing, set `budget_usd`. Keys are attached to jobs by the web service; laptops need none.
- Split compute in Runs -> Workers: per-machine slot cap and pause.
- Results to git: `node agent/sync-results.js --commit` (see `agent/README.md`).

## 9. Tailscale (private, no public URL)
Host the console on one machine and join the others over the tailnet. Traffic is WireGuard-encrypted, so plain `http://` is fine inside it.
1. Install Tailscale on every machine and sign in to the same tailnet. Check names with `tailscale status`.
2. Host machine: `cp .env.example .env`, set `APP_PASSWORD` and `WORKER_TOKEN`, set `BIND_ADDR` to `tailscale ip -4` (listen on the tailnet only), then `docker compose --profile build build && docker compose up -d web`.
3. Other machines: `./agent/start.sh` (or `agent\start.ps1`), console URL `http://<host-machine-name>:8080` (MagicDNS) or `http://<tailnet-ip>:8080`. They need the worker image: `docker login ghcr.io` and pull from CI, or `docker save study-worker | ssh friend docker load`.
4. The host's own agent can use `http://host.docker.internal:8080`.
5. Optional HTTPS: `tailscale serve --bg 8080` gives `https://<host>.<tailnet>.ts.net`.
Railway cannot join a tailnet without extra sidecar setup, so the tailnet route means the web service runs on a machine you own.
