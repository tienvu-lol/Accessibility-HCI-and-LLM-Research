# Railway deployment: `demo-report` (frozen, read-only)

Serves one explicitly exported report. **Currently the bundled export is a MOCK run** (labeled in the page and in
`EXPORT_MANIFEST.json`); it is not live-model evidence. Replace it with a live export once a real run exists (see "Refresh").

## Railway settings (service `demo-report`)
| Setting | Value |
|---|---|
| Source | this repo, branch `research/accessibility-usability-benchmark` (not `main`) |
| Root directory / build context | **repository root** (leave blank / `/`) |
| Builder | Dockerfile |
| Dockerfile path | `deploy/railway/Dockerfile.demo` |
| Start command | none (Dockerfile `CMD ["python","/app/server.py"]`) |
| Variables | none required. `PORT` is injected by Railway. Do **not** add API keys to this service |
| Health check path | `/health` (200 when the report is present, 503 otherwise) |
| Volumes / database | none |
| Public networking | generate a Railway domain only after owner approves display of the exported report |

The repo-root `railway.json` (config-as-code) pins the Dockerfile builder, `deploy/railway/Dockerfile.demo`, and the `/health` check, so a service connected to this repo does not fall back to auto-detecting a Python app from `pyproject.toml`. Settings made in the Railway UI are overridden by it.

## Expected routes
`GET /health` -> `{"status":"ok","report_ready":true}` ; `GET /` -> report ; `GET /assets/...` -> screenshots, diffs, prompts, responses, axe JSON of the exported run ; `GET /EXPORT_MANIFEST.json` -> file hashes and mode.
Everything else 404; any non-GET/HEAD method 405. There is no submission endpoint, and the server makes no model or outbound calls.

## Local verification commands
```
python -m pytest tests/deploy -q                       # server unit tests (passed)
PORT=8080 python deploy/railway/server.py              # then: curl localhost:8080/health
docker build -f deploy/railway/Dockerfile.demo -t demo-report .
docker run --rm -e PORT=8080 -p 8080:8080 demo-report  # curl localhost:8080/health
```
Status in the authoring session: pytest and the direct-python server smoke test passed; **`docker build`/`docker run` were NOT verified** (no Docker daemon was running there).

## Refresh the exported report (controlled, never copies runs/ wholesale)
```
python -m uirepairgym run --config <live config>       # needs provider/model/cap/API key (owner supplied)
python scripts/export_demo_report.py --run-dir runs/<run_id> --approve-demo [--allow-mock]
git add deploy/railway/demo-report && git commit && git push
```
The export refuses non-live runs without `--allow-mock`, refuses secret-looking content, and writes `EXPORT_MANIFEST.json`.

## Remaining step requiring owner access
Create the Railway service with the settings above (needs Railway project access), deploy, then smoke test `https://<domain>/health` and `/`. Not done; no deployment was attempted.
