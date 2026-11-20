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
