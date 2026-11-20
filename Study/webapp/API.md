# Researcher console: architecture and API contract

Zero-dependency Node 24 (CommonJS, built-ins only) server + vanilla JS frontend. Python 3 stdlib tools in `Study/tools` do the model work. Everything lives in `Study/webapp/`.

## Topology (Railway)
- **web** service: `server.js` (UI + API + coordinator + data volume at `DATA_DIR`). Single replica; owns the only copy of results. Railway volumes attach to ONE service, so workers never share its disk.
- **worker** service: `worker.js`, N replicas, no volume. Pull jobs over HTTPS, run the existing `Study/tools` code in a scratch dir, push results back. Scale = replicas x `WORKER_SLOTS` (parallel cells per replica).
- **Open-source arms (A5, A6) are never dispatched.** They run ahead of time on the ARC cluster; their `runs/` are imported (`/api/import`). After that, Gemini judges ALL arms, then humans rate via the harness.
- Gemini is the JUDGE only (config neutrality note). Repair arms A1-A4 may use provider `openai` or `anthropic` only; the API must reject `gemini` for an arm.

## Env
web: `APP_PASSWORD` (required when `NODE_ENV=production`; refuse to start without it), `WORKER_TOKEN` (required), `DATA_DIR` (default `./data`), `PORT` (default 8080), optional `OPENAI_API_KEY` `ANTHROPIC_API_KEY` `GEMINI_API_KEY` (initial keys, source `env`), `MOCK_PROVIDERS=1` (jobs carry `mock:true`; no real API calls), `DEMO=1` (serve a synthetic state).
worker: `WEB_URL`, `WORKER_TOKEN`, `WORKER_SLOTS` (default 4), `WORKER_ID` (default hostname), `POLL_MS` (default 3000).

## Security rules (both sides)
Keys: server memory only; never written to disk, logs, state.json, responses or SSE; UI only ever sees `{set,last4,source}`. Keys travel to a worker only inside a claimed job, over the authenticated worker channel, and the worker passes them to the subprocess via env only (never argv, never files, never logs). Constant-time compare for password/token; login rate-limit (5 fails/min/IP); cookie `sid` HttpOnly, SameSite=Strict, Secure when behind https (`x-forwarded-proto`). All uploaded paths validated (no `..`, no absolute, must sit under the job's own prefix). Body size caps. Escape everything rendered in the UI.

## Data layout under DATA_DIR (same shape as Study/)
`runs/<arm>/<cond>/<site>/iter<N>/{index.html,<form>.html,css/...,status.json,response.json}`, `verdicts/judge_rankings.csv`, `verdicts/usage.jsonl`, `blinding_key.csv`, `usage.jsonl` (server ledger, one line per accepted result: `{ts,source,arm,kind,input,output,calls}`), `state.json` (settings, arm overrides, pricing, queue; NEVER keys), `human/{harness/rater_R{1,2,3}.html, randomization.json, variants/, human_ratings.csv}`, `estimate.json`.
Cell status values (from `status.json`): `ok|failed` (+ `truncated` when `reason` starts with `truncated`). A cell is done when its last iteration is `converged`, is iter `max_iter`, or `failed`.

## Auth
`POST /api/login {password}` sets cookie `sid`; `POST /api/logout`. All `/api/*` except login, and all static files except the login page assets, need the cookie. `/api/worker/*` need `Authorization: Bearer <WORKER_TOKEN>` instead. `GET /healthz` is public (`{ok:true}`).

## UI endpoints (JSON)
- `GET /api/state` -> snapshot (below). `GET /api/events` -> SSE, event `state` with the same snapshot on change and every 3 s.
- `PUT /api/keys/:provider {key}` / `DELETE /api/keys/:provider` (provider in openai|anthropic|gemini; 400 on bad provider or empty key).
- `PUT /api/arms/:arm {provider,model_id}` for A1-A4 (400 for A5/A6 or provider gemini).
- `PUT /api/settings {budget_usd,sites,conditions,max_iter,judge_model_id}` (sites: array of site ids or null = all 60 from `Study/sample/sites.csv`).
- `PUT /api/pricing {<model_id>:{input_per_mtok,output_per_mtok}}`.
- `POST /api/run/start {phase:"repair"|"judge"}`; `POST /api/run/pause`; `POST /api/run/resume`; `POST /api/run/retry-failed`. Start refuses (409 + `blockers`) if a needed key/model is missing, or for `judge` while repair/imports are incomplete unless `{force:true}`.
- `POST /api/import` body = gzip'd NDJSON (`Content-Type: application/x-ndjson+gzip`), one JSON per line: `{"cell":"A5/wcag/UNI-01","files":{"iter1/index.html":{"enc":"utf8","data":"..."},"iter1/status.json":{...}}}`. Only arms flagged open_source accepted; same path/size validation as worker results. Reply `{imported_cells,rejected:[{line,reason}]}`. Imported cells show state `i` in the matrix; their tokens count, their cost is 0 unless a price is set.
- `POST /api/human/build` builds the harness + materializes variants (child_process: `node Study/human/build_harness.js`, `python Study/human/materialize_variants.py`); `POST /api/human/ratings` (body = CSV text from a rater's export) appends to `human/human_ratings.csv` after header check. `GET /human/*` serves `human/harness` and `human/variants` (auth required).

## Worker endpoints (Bearer WORKER_TOKEN)
- `POST /api/worker/claim {worker_id,kinds:["repair","judge"],max}` -> `{jobs:[Job]}` (empty when paused, over budget, or nothing queued). Per-arm concurrency cap = config `arms.<A>.concurrency` across ALL workers. Lease 900 s.
- `POST /api/worker/heartbeat {job_id}` -> extends the lease. `POST /api/worker/release {job_id,reason,retryable}`: job returns to `queued` IMMEDIATELY; infra releases do not count an attempt. `POST /api/worker/result {job_id,...}` (below). Expired lease = requeue without counting an attempt. A job fails permanently after 3 counted attempts (counted = result reported `failed`).
- Job (repair): `{id:"repair:A1:wcag:UNI-01",kind:"repair",arm,condition,site,max_iter,lease_s,mock,provider,base_url,model_id,api_key_env,api_key}`; base_url: anthropic = null (native), openai = `https://api.openai.com/v1`, gemini = `https://generativelanguage.googleapis.com/v1beta/openai`.
- Result (repair): `{job_id,status:"ok"|"failed",files:{"runs/A1/wcag/UNI-01/iter1/index.html":{enc,data},...},usage:{input,output},calls,error}`. Server only accepts paths under `runs/<arm>/<cond>/<site>/`, extensions `.html .css .json .js .svg .txt`, <=5 MB each, <=50 MB total.
- Job (judge): `{id:"judge:UNI-01:A1",kind:"judge",site,arm,mock,seed,variants:{"naive":{"index.html":"..."},"wcag":{...},"nielsen":{...},"both":{...}},provider:"gemini",base_url,model_id,api_key,call_id}` where each variant is the FINAL iteration's files for that condition. Result: `{job_id,status,rows:[[site_id,arm,question,condition,rank,judge_model,call_id],...],key_rows:[[site_id,arm,label_shown,condition],...],usage:{input,output},error}`; server appends to `verdicts/judge_rankings.csv` and `blinding_key.csv` (dedupe on the row's key; header written once) and `verdicts/usage.jsonl`.

## Snapshot (`GET /api/state`)
```
{ now, run:{phase:"idle"|"running"|"paused", kind:"repair"|"judge"|null, started_at},
  settings:{budget_usd,sites,conditions,max_iter,judge_model_id},
  keys:{openai:{set,last4,source},anthropic:{...},gemini:{...}},          // source "ui"|"env"|null
  arms:[{id,label,kind:"mainstream"|"open_source",provider,model_id,ready,blockers:[str],concurrency,
         cells:{total,queued,running,ok,failed,truncated,imported,converged},
         tokens:{input,output},calls,cost_usd,tokens_per_min}],
  judge:{provider:"gemini",model_id,ready,blockers,items:{total,queued,running,done,failed},tokens:{input,output},cost_usd},
  matrix:{<arm>:{<cond>:"<one char per site in settings.sites order>"}}, // . queued, r running, o ok, f failed, t truncated, i imported, - not planned
  intake:{total:{input,output,cost_usd}, rolling5m:{tokens,cost_usd},
          sources:[{id:"A1"|...|"judge",input,output,cost_usd,calls,tokens_per_min}],
          series:[{t,cum_cost_usd,cum_tokens}]},                          // up to 120 one-minute points
  projection:{budget_usd,spent_usd,remaining_usd,expected_total_usd,over_budget,eta_minutes,
              by_arm:[{arm,calls_total,calls_done,avg_in,avg_out,est_cost_usd,basis:"measured"|"estimated"|"self-hosted"}]},
  workers:[{id,last_seen,slots,running}],
  pricing:{<model_id>:{input_per_mtok,output_per_mtok,verified}},        // placeholders ship verified:false
  warnings:[str],
  human:{built,items,raters,ratings_rows},
  imports:[{ts,arms,cells,rejected}] }
```
Projection: remaining calls = unfinished cells x expected iterations (measured mean per arm, default 2 before data, cap max_iter) x per-call tokens (measured from finished calls, else `estimate.json` from `runner.build_prompt` sizes: input = prompt chars/4; output = slice html+css chars/4 x 1.1). Cost = tokens x pricing. Open-source arms: tokens only, cost 0. The coordinator STOPS handing out jobs when spent + in-flight-estimate >= budget_usd.
