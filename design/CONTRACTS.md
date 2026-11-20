# Contracts (locked; Study/README.md sections 4-9 are normative)

## C1 Run layout
`Study/runs/<arm>/<condition>/<site_id>/iter<N>/` holds the slice files (same relative paths as `slice_files`), `response.json`, `status.json`.
`status.json`: `{"status":"ok|truncated|failed","iteration":N,"hash":"<sha256>","prev_hash":"<sha256|null>","converged":bool,"text_chars":int,"input_text_chars":int,"attempts":int,"model_id":str,"model_version":str,"usage":{"input":int,"output":int},"latency_ms":int}`
`response.json`: `{"raw":str,"usage":{...},"latency_ms":int,"model_version":str}`.

## C2 Model response format (from Study/prompts/*.md)
`<<<EVAL>>>\n{one-line json}\n<<<FILE: path>>>\n...\n<<<FILE: path>>>\n...\n<<<END>>>`. EVAL json: `{"findings":[{"criterion","severity","location","issue","fix"}]}`.

## C3 Python provider interface (`Study/tools/runner/providers.py`)
`complete(arm: str, prompt: str, cfg: dict) -> dict` returning `{"text":str,"usage":{"input":int,"output":int},"model_version":str,"latency_ms":int}`.
`cfg` = parsed `repair-allocation.json`. Env `STUDY_MOCK=1` forces a mock that returns the first `<<<INPUT FILE>>>` set unchanged, wrapped in C2 format with `{"findings":[]}`. Raises `ProviderError(msg, retryable: bool)`.

## C4 Guards (`Study/tools/runner/guards.py`)
`parse_response(text) -> {"findings":list,"files":{path:str}}` raises `ParseError`.
`text_chars(html:str) -> int` (visible text-node chars, whitespace collapsed; stdlib html.parser, skip script/style).
`normalize_hash(files: dict) -> str` (collapse whitespace, strip HTML/CSS comments, sort by path, sha256 hex).
`check_truncation(out_files:dict, in_files:dict) -> (ok: bool, reason: str)` (every .html ends with `</html>`; total text_chars >= 0.5 x input).

## C5 Runner CLI (`Study/tools/runner/runner.py`)
`python runner.py --arms A1,A2 --conditions wcag,both --sites UNI-01 --root Study --max-iter 3`. Resumable (skip when status.json status==ok). Per-arm concurrency from config `arms.<A>.concurrency`. Retry per `held_constant.retry`. Imports C3/C4 only.

## C6 Scorer (JS, `Study/tools/score/`)
Each probe exports `async function run(page) -> object`; `score.js` calls them.
- `axe_probe.js`: `{violations,passes,incomplete,bestPracticeViolations,textChars,elementCount}` (counts of rules; wcag tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa; best-practice separate).
- `tab_probe.js`: `{stops:[{tag,id,text,domIndex,rect}],tabOrderMismatches,keyboardTraps,unreachableInteractives,focusVisibleFails,skipLinkOk}` (focus visibility by in-memory screenshot diff).
- `ax_tree.js`: `{interactiveNodes,nameChars,namesMissing,namesOverlong,headingSkips,headings:[{level,name}],landmarks:[...]}` via CDP `Accessibility.getFullAXTree`.
- `score.js --variant <dir> --files index.html;form.html --site S --arm A --condition C --iteration N --out metrics.csv`: loads via `file://`, 1280 and 375 breakpoints, appends rows per README section 9 `metrics.csv` schema (`violation_rate=violations/(violations+passes)`, `name_chars_per_interactive`). Never gates/exits non-zero on violations.

## C7 Judge (`Study/tools/judge/`)
`blind.py`: `build_item(site,arm,runs_root,seed) -> {"labels":{"V1":condition...},"variants":{"V1":{files}}}`, appends `blinding_key.csv` (`site_id,arm,label_shown,condition`); strips condition markers from HTML/filenames.
`judge.py`: builds the 14-question ranking prompt (`Study/prompts/judge.md`), parses `{"Q1":{"V1":rank,...},...}` (ties = equal ranks), un-blinds via key, appends `judge_rankings.csv` (`site_id,arm,question,condition,rank,judge_model,call_id`). Provider via C3-style `complete`.

## C8 Human harness (`Study/human/`)
`build_harness.js` reads `Study/sample/human_items.csv`, `Study/blinding_key.csv`-style lookup; writes `Study/human/harness/rater_R{1,2,3}.html` (self-contained, file:// iframes, A/B left-right randomized per rater, item shuffle per rater, localStorage autosave, CSV export in `human_ratings.csv` schema).

## C9 Analysis (`Study/analysis/`, python stdlib; numpy NOT assumed)
Inputs only: `metrics/metrics.csv`, `verdicts/judge_rankings.csv`, `human/human_ratings.csv`, `blinding_key.csv`.
`kappa.py`: `fleiss(items)`, `cohen(a,b)`, `cluster_bootstrap(items,site_of,n=2000,seed)`, gate table per README section 7.
`stats.py`: Friedman, Wilcoxon signed-rank, Holm, Benjamini-Hochberg, Kendall W (pure python).
