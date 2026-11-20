# Researcher console: architecture and API contract

Zero-dependency Node 24 (CommonJS, built-ins only) server + vanilla JS frontend. Python 3 stdlib tools in `Study/tools` do the model work. Everything lives in `Study/webapp/`.

## Topology (Railway)
- **web** service: `server.js` (UI + API + coordinator + data volume at `DATA_DIR`). Single replica; owns the only copy of results. Railway volumes attach to ONE service, so workers never share its disk.
- **worker** service: `worker.js`, N replicas, no volume. Pull jobs over HTTPS, run the existing `Study/tools` code in a scratch dir, push results back. Scale = replicas x `WORKER_SLOTS` (parallel cells per replica).
- **Open-source arms (A5, A6)** run on the ARC cluster, either dispatched to a laptop holding an SSH tunnel into the ARC session (`settings.dispatch_open`, `agent/README.md`) or run ahead of time and imported (`/api/import`). They are separate llama.cpp servers with **separate credentials**: key slots `a5` and `a6`, never shared, and either one may instead live on the laptop that holds that arm's tunnel. After repair, Gemini judges ALL arms, then humans rate via the harness.
- Gemini is the JUDGE only (config neutrality note). Repair arms A1-A4 may use provider `openai` or `anthropic` only; the API must reject `gemini` for an arm.

## Env
web: `APP_PASSWORD` (required when `NODE_ENV=production`; refuse to start without it), `WORKER_TOKEN` (required), `DATA_DIR` (default `./data`), `PORT` (default 8080), optional `OPENAI_API_KEY` `ANTHROPIC_API_KEY` `GEMINI_API_KEY` (initial keys, source `env`), `MOCK_PROVIDERS=1` (jobs carry `mock:true`; no real API calls), `DEMO=1` (serve a synthetic state).
worker: `WEB_URL`, `WORKER_TOKEN`, `WORKER_SLOTS` (default 4), `WORKER_ID` (default hostname), `POLL_MS` (default 3000).

## Security rules (both sides)
Keys: server memory only; never written to disk, logs, state.json, responses or SSE; UI only ever sees `{set,last4,source}`. Keys travel to a worker only inside a claimed job, over the authenticated worker channel, and the worker passes them to the subprocess via env only (never argv, never files, never logs). Constant-time compare for password/token; login rate-limit (5 fails/min/IP); cookie `sid` HttpOnly, SameSite=Strict, Secure when behind https (`x-forwarded-proto`). All uploaded paths validated (no `..`, no absolute, must sit under the job's own prefix). Body size caps. Escape everything rendered in the UI.

## Data layout under DATA_DIR (same shape as Study/)
`runs/<arm>/<cond>/<site>/iter<N>/{index.html,<form>.html,css/...,status.json,response.json}`, `verdicts/judge_rankings.csv`, `verdicts/usage.jsonl`, `blinding_key.csv`, `usage.jsonl` (server ledger, one line per accepted result), `state.json` (settings, arm overrides, pricing, queue; NEVER keys), `human/{harness/rater_R{1,2,3}.html, randomization.json, variants/, human_ratings.csv}`, `estimate.json`.

### `usage.jsonl` - one immutable fact per finished call
`{ts, worker, arm, kind:"repair"|"judge"|"score", model_id, key_id, mock, input, output, calls, cost_usd, priced}`
- `worker` the machine that ran it (`(imported)` for an imported cell), `model_id` what served it (the provider's reported model where available, else what was dispatched), `key_id` the credential that paid, as `<slot>:<last4>` or `local:<machine>` when the key never left that worker. No secret is ever written.
- `mock:true` rows come from `MOCK_PROVIDERS=1`: they cost `0`, are excluded from spend, from intake and from the measured basis, and are counted separately as test calls.
- `cost_usd` is priced ONCE, when the row is written, so changing an arm's model or a price never reprices history. `priced:false` means no price entry existed for that model.
- Rows written before this shape (`source` instead of `worker`, no `cost_usd`) are still read, priced on the fly from the arm's current model, and reported as `legacy_calls`. `POST /api/usage/reset` sets the file aside so the books can start clean after a test run.
Cell status values (from `status.json`): `ok|failed` (+ `truncated` when `reason` starts with `truncated`). A cell is done when its last iteration is `converged`, is iter `max_iter`, or `failed`.

## Auth
`POST /api/login {password}` sets cookie `sid`; `POST /api/logout`. All `/api/*` except login, and all static files except the login page assets, need the cookie. `/api/worker/*` need `Authorization: Bearer <WORKER_TOKEN>` instead. `GET /healthz` is public (`{ok:true}`).

## UI endpoints (JSON)
- `GET /api/state` -> snapshot (below). `GET /api/events` -> SSE, event `state` with the same snapshot on change and every 3 s.
- `PUT /api/keys/:slot {key}` / `DELETE /api/keys/:slot`. Slots: `openai`, `anthropic`, `gemini` (hosted providers) and `a5`, `a6` (one per open-source arm; separate credentials, used only by that arm, optional - without one the arm uses the key on the laptop that holds its tunnel). 400 on an unknown slot or an empty key. Keys live in memory only.
- `POST /api/usage/reset` -> `{ok,cleared,archived_to}`. Renames `usage.jsonl` to `usage.archived-<iso>.jsonl`, empties the in-memory ledger and drops the projection baseline. Spend, measured averages and the per-machine/per-key rollups go back to zero; finished cells, results and files are untouched. Use it after a mock/test run.
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
  keys:{openai:{set,last4,source},anthropic:{...},gemini:{...},a5:{...},a6:{...}}, // source "ui"|"env"|null; a5/a6 = per-arm llama.cpp keys
  arms:[{id,label,kind:"mainstream"|"open_source",provider,model_id,ready,blockers:[str],concurrency,
         cells:{total,queued,running,ok,failed,truncated,imported,converged},
         tokens:{input,output},calls,cost_usd,tokens_per_min}],
  judge:{provider:"gemini",model_id,ready,blockers,items:{total,queued,running,done,failed},tokens:{input,output},cost_usd},
  matrix:{<arm>:{<cond>:"<one char per site in settings.sites order>"}}, // . queued, r running, o ok, f failed, t truncated, i imported, - not planned
  machines:[{id,char,online,host,os,running,calls,input,output,cost_usd,mock_calls,cells}], // sorted by id, so `char` is stable
  matrix_workers:{<arm>:{<cond>:"<one char per site>"}},                  // which computer ran each cell: a `machines[].char`, or - for none
  intake:{total:{input,output,cost_usd}, rolling5m:{tokens,cost_usd},
          sources:[{id:"A1"|...|"judge",input,output,cost_usd,calls,tokens_per_min}],
          machines:[{id,calls,input,output,cost_usd,mock_calls}],
          series:[{t,cum_cost_usd,cum_tokens}]},                          // up to 120 one-minute points
  projection:{budget_usd,spent_usd,remaining_usd,expected_total_usd,over_budget,eta_minutes,mock_calls,legacy_calls,
              baseline,baseline_total_usd,variance_usd,variance_pct,
              by_arm:[{arm,model_id,calls_total,calls_done,avg_in,avg_out,spent_usd,est_cost_usd,est_total_usd,
                       mock_calls,legacy_calls,basis:"measured"|"estimated"|"self-hosted"|"unpriced"}],
              by_machine:[{id,calls,input,output,cost_usd,mock_calls,share_pct,arms:[{arm,calls,input,output,cost_usd}]}],
              by_key:[{id,arm,model_id,calls,input,output,cost_usd}]},     // id = "<slot>:<last4>" or "local:<machine>"
  recent_usage:[{ts,worker,arm,kind,model_id,key_id,mock,input,output,calls,cost_usd,legacy}], // newest first, last 30, no score rows
  workers:[{id,last_seen,slots,running,info,arcs,cap,paused}],             // arcs = open arms this worker has a live tunnel for
  pricing:{<model_id>:{input_per_mtok,output_per_mtok,verified}},        // placeholders ship verified:false
  warnings:[str],
  human:{built,items,raters,ratings_rows},
  imports:[{ts,arms,cells,rejected}] }
```
Projection: remaining calls = unfinished cells x expected iterations (measured mean per arm, default 2 before data, cap max_iter) x per-call tokens. `basis:"measured"` means measured from REAL finished calls on the arm's **current** model only: calls on a model it no longer uses, and mock calls, are excluded, so pointing an arm at a different model drops it back to `estimated` while its booked spend stays. Otherwise per-call tokens come from `estimate.json` (`runner.build_prompt` sizes: input = prompt chars/4; output = slice html+css chars/4 x 1.1). `spent_usd` is the sum of the `cost_usd` already recorded per call, never a recomputation. Open-source arms are `self-hosted` (tokens only, cost 0) until a price is set for their model. The coordinator STOPS handing out jobs when spent + in-flight-estimate >= budget_usd.

Progress (what counts as finished): a cell is **done** when it produced output (`ok`, or `imported`); `failed` and `truncated` cells are finished but NOT done, and are reported separately, so a phase never reads "Done" while cells are broken. Score coverage counts only the arms and conditions currently in scope (`results.coverage.variants_out_of_scope` holds the rest), and the judge's total comes from `coverage.judge_items_expected` (sites x arms), not from the items queued so far.

---
# Addendum: scoring, results, exports, human rating (supersedes the earlier human/build text)

Palette (shared by every page; poster colours): maroon `#861F41`, orange `#E5751F`, black `#000`, neutrals. Operate-mode UI: dense, scannable, tables and charts first.

## Phases
`repair` (mainstream arms A1-A4 only) -> `score` (auto-pipelined: a score job is queued the moment a cell finishes; baselines are scored too, as arm `baseline`, condition `baseline`, iteration 0, files from `Study/baseline/<site>`) -> `judge` (explicit start, Gemini, ALL arms incl. imported A5/A6) -> human rating (names, below). `POST /api/run/start {phase}` accepts `repair|judge|score` (score = (re)queue everything unscored).

## Score job (workers need chromium)
Job `{id:"score:A1:wcag:UNI-01",kind:"score",arm,condition,site,mock,slice_files:["index.html","apply.html"],iterations:{"1":{"index.html":"...","apply.html":"...","css/styles.css":"..."}}}` (baseline: `arm:"baseline",condition:"baseline",iterations:{"0":{...}}`). Worker materializes each iteration to a temp dir and runs `node Study/tools/score/score.js` (breakpoints 1280 and 375). Result `{job_id,status,rows:[[...metrics.csv columns in README order...]],rules:[{site_id,arm,condition,iteration,page,breakpoint,rules:[{id,impact,tags,nodes}]}],error}`. Server appends rows to `metrics/metrics.csv` (dedupe on site_id,arm,condition,iteration,page,breakpoint; replace) and rules to `metrics/axe_rules.jsonl`. `score.js` gets `--rules-out`; `axe_probe.run` additionally returns `rules` (additive, contract-compatible). First boot seeds `metrics/metrics.csv` from the committed baseline scoring (`Study/metrics/metrics.csv`, arm column `baseline`).

## Results (`GET /api/results`, pure functions in `lib/results.js`, recomputed on every call from files under DATA_DIR; cheap enough for 3-s polling with a 2-s cache)
Interface: `results.build(dataDir, {sites,conditions}) -> object`, `results.tables(dataDir, opts) -> { <name>: {columns:[...], rows:[[...]]} }`. Unit: a "site-variant" = (arm, condition, site) final iteration; "before" = that site's baseline; per-site value = mean over the site's pages at breakpoint 1280. Missing data yields `null`/empty arrays, never errors or NaN.
```
{ coverage:{variants_expected,variants_scored,variants_out_of_scope,baselines_scored,baselines_expected,judge_items_done,judge_items_expected,human_raters,human_items_complete},
  gate:{median_baseline_violation_rate,sites_zero_axe,warn:bool,note},                       // ceiling check
  fig2:[{arm,condition,before_mean,after_mean,n,sites:[{site,before,after}]}],                // WCAG violations per site, baseline vs after
  fig3:[{arm,condition,mean_rank,n}],                                                         // judge mean rank per condition per arm (rank 1 best); NOTE below
  fig4:{criteria:[wcag ids],heuristics:["h1_..","..h10_.."],cells:[[count]],basis:str},       // WCAG criterion improved x Nielsen heuristic worse than naive
  fig5:[{site,arm,generator_group,condition,wcag_gain,usability_delta}],                      // gain = before-after violations; usability_delta = mean over Nielsen questions of (rank_naive - rank_condition), positive = better than naive
  fig6:[{site,arm,condition,wcag_gain,worst_heuristic,worst_delta,before_url,after_url}],     // fixes that gained on WCAG but lost on a heuristic, ranked by worst_delta; urls under /api/variant/...
  loop:[{arm,condition,sites,mean_iterations,pct_converged,pct_hit_cap,pct_failed,pct_truncated,mean_edit_ratio,regressions_per_cell,self_reported_tokens_in,self_reported_tokens_out}],
  headline:{pct_sites_gained_wcag_lost_nielsen,n_sites,top_conflict:{criterion,heuristic,count}|null},
  agreement:{judge_vs_human:{kappa,n}|null,human_fleiss:{kappa,n_items,raters}|null,gate:{threshold,pass:bool|null}},
  notes:[str] }
```
NOTE: the judge ranks five blinded variants per (site, arm): the four repaired conditions plus the unrepaired `baseline`. `fig3` includes a `baseline` condition row (mean rank), and `fig5.usability_delta` = rank(baseline) - rank(variant) per heuristic question (positive = repaired page judged better than the original).
`edit_ratio` = normalized line-diff between consecutive iterations; `regressions` = rules violated after an iteration that were not violated before it.

## Exports
`GET /api/export/<name>.csv` for every key of `results.tables` (names: `fig2_violations`, `fig3_judge_ranks`, `fig4_conflict_heatmap`, `fig5_gain_vs_usability`, `fig6_broke_usability`, `loop_behavior`, `headline`, `agreement`, `metrics_all`, `judge_rankings`, `human_ratings`, `cost_by_source` = one row per (arm, machine, model_id, key_id, mock) with input/output/calls/cost_usd, i.e. which computer spent what on which model through which key), UTF-8 with BOM-less header row, proper CSV quoting. `GET /api/export/all.json` = `results.build` + tables. Charts export client-side: SVG download and PNG rendered at 4x (>=300 dpi at print size) from the same SVG; tables export CSV via these endpoints. Original-vs-after viewer: `GET /api/variant/<arm>/<cond>/<site>/<iter>/<page>` serves a stored page (for `baseline`: `Study/baseline/<site>/<page>`), sandboxed (`Content-Security-Policy: sandbox; default-src 'self' 'unsafe-inline'`, no scripts needed to be trusted) and auth-required.

## Human rating (replaces rater_R1..R3 files for hosted use)
Researchers open `/rate`, type their NAME, and start; no account, no password beyond the site cookie. Server derives `rater_id` = slug of the name (lowercase, `[a-z0-9-]`, <=32; reject empty), item order and left/right per item from `sha256(rater_id|seed)` (deterministic; resume after reload by the same name continues where they left off). 30 items from `Study/sample/human_items.csv` x 14 questions (`Study/human/rubric.md`, `Study/prompts/judge.md`). Blinding is enforced SERVER-SIDE: the browser only ever receives opaque tokens and left/right page URLs `/rate/frame/<token>/<side>/<page>` (token = HMAC of rater+item; side in `l|r`); condition names, arm, and the blinding key never reach the client; page names go through the same `clean_path` rule as `Study/tools/judge/blind.py`. Un-blinding happens when saving: `POST /api/rate/answer {name,item,question,verdict:"A"|"B"|"tie",note}` -> server maps A/B to wcag/both via the key and appends a row to `human/human_ratings.csv` (`site_id,arm,question,rater_id,verdict,note,shown_left,shown_right,ts`; last answer for the same (rater,item,question) wins, so store latest per key and rewrite atomically). Endpoints: `POST /api/rate/start {name}` -> `{rater_id,total_items,done_items,next}`; `GET /api/rate/item?name=&i=` -> `{i,token,pages:[...],questions:[{id,text,anchor}],answers:{q:{verdict,note}}}`; `POST /api/rate/answer`; `GET /api/rate/progress?name=`. Notes starting with `= + - @` are stored with a leading `'` (spreadsheet formula injection). Items need blinded variants: the server picks the (arm, site) item's `wcag` and `both` final-iteration files from `runs/` (imported or generated). An item whose variants are missing is skipped and reported in `/api/rate/progress` as `unavailable`.
