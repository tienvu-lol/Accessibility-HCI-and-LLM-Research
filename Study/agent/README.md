# Worker agent (join the hosted console from a laptop)

Runs one Docker container that connects to the hosted console, takes jobs, and sends results back. API keys never touch your machine: they live on the hosted console and arrive inside each job.

**Needs:** Docker Desktop running; the console URL and `WORKER_TOKEN` from whoever hosts it; a GitHub token with `read:packages` while the repo is private (`docker login ghcr.io -u <github-user>`, paste the token as password).

| OS | start | stop |
|---|---|---|
| macOS / Linux | `./agent/start.sh` | `./agent/stop.sh` |
| Windows | `powershell -ExecutionPolicy Bypass -File agent\start.ps1` | `agent\stop.ps1` |

The first run asks for the URL, token, a machine name and slot count, and saves them in `agent/agent.env` (git-ignored). Re-running pulls the latest image. The machine shows as **Online** under Runs -> Workers in the console; there you can cap how many jobs it runs, or pause it, to split work between machines. Closing the laptop makes it **Offline**; its jobs are re-queued automatically.

Image: `ghcr.io/tienvu-lol/accessibility-hci-and-llm-research/study-worker:latest`, built for amd64 and arm64 by CI on every push to `main`. To test an image you built locally: `WORKER_IMAGE=study-worker ./agent/start.sh`.

## Pull results into git
```
WEB_URL=https://<console> APP_PASSWORD=<password> node agent/sync-results.js --commit
git push
```
Writes `Study/runs/**` and `Study/results-export/*.csv|all.json`, then commits (no push). `.gitignore` still excludes raw responses and intermediate iterations.
