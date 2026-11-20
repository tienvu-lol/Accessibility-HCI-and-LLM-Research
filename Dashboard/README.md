# Researcher dashboard

This directory is the Docker Compose entry point for the main console at `/`. The application, worker, and experiment inputs remain under [`Study/`](../Study/).

From the repository root:

```sh
cd Dashboard
cp .env.example .env  # first setup only; keep your existing .env if you have one
# Set APP_PASSWORD and WORKER_TOKEN. For tailnet-only access, set BIND_ADDR to the host's `tailscale ip -4`.
docker compose --profile build build
docker compose up -d web
```

Open `http://<tailnet-ip>:8080/` and sign in with the shared password. For web-only updates, run `docker compose up -d --build web` from this directory.

If migrating an existing host, move `Study/.env` here rather than making a new one. The Compose project is still named `study`, so it reuses `study_data` and `study-net`. Do not run `docker compose down -v` unless you intend to delete the study data.

See [deployment and worker instructions](../Study/webapp/DEPLOY.md) for more detail.

## Deploying on a VM

1. Install Docker + Tailscale on the VM (`tailscale up`); `git clone` this repo and check out the branch.
2. `cd Dashboard && cp .env.example .env`; set `APP_PASSWORD`, `WORKER_TOKEN`, `DASHBOARD_LAUNCH_TOKEN`, `DOCKER_GID`, `BIND_ADDR` (the VM's `tailscale ip -4`), `MACHINE_NAME`.
3. `docker compose --profile build build && docker compose up -d web`; check `curl http://<tailnet-ip>:8080/healthz`.
4. Update later: `git fetch && git pull`, then repeat step 3. Never `docker compose down -v` (deletes `study_data`).
5. Other computers: `WEB_URL=http://<tailnet-ip>:8080` plus the same `WORKER_TOKEN` (and `DASHBOARD_LAUNCH_TOKEN` for launcher) in `Study/agent/agent.env` / `launcher.env`; see `Study/agent/README.md`.
