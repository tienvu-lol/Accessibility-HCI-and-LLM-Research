# Engineering job board

Canonical queue/integration branch: `research/accessibility-usability-benchmark`.
Blueprint: [MAIN.md](MAIN.md). Claim/integration rules: [COORDINATION.md](COORDINATION.md).

Every job derives from a MAIN section. Agents report all work, blockers, discoveries, and proposed changes here. **This board does not authorize edits to MAIN.md.** Suggested lane names are not claims. Experiment runtime jobs belong in the application's later runtime queue, not this Markdown board.

## Queue index

| ID | Priority | Job | MAIN | Dependencies | Status | Owner |
|---|---|---|---|---|---|---|
| G001 | P0 | Publish named research branch and governance blueprint/queue | M00, M12 | None | DONE | codex-governance-20261003 |
| G002 | P0 | Retire old branch to finish requested rename | M00, M12 | G001; browser fallback permission | BLOCKED | codex-governance-20261003 |
| J001 | P0 | Freeze demo interfaces and minimal toolchain | M05, M06, M10 | G001 | DONE (self-checked) | claude-ui-20261003-01 |
| J002 | P0 | Create one synthetic static fixture/task | M04, M07 | J001 | DONE (axe-confirmed subset) | claude-ui-20261003-01 |
| J003 | P0 | Browser observations, axe, behavioral checks | M05, M07 | J001, J002 | INTEGRATED (self-checked) | claude-worker-a-20261003 |
| J004 | P0 | Bounded runner and one provider adapter | M03, M05, M06 | J001, J002 | INTEGRATED (self-checked; mock only) | claude-worker-b-20261003 |
| J005 | P0 | Generate evidence-based before/after report | M06, M09 | J001 | INTEGRATED (self-checked) | claude-worker-c-20261003 |
| J006 | P0 | Integrate and run minimum live demo | M10 | J002–J005 | IN_PROGRESS (mock path done; live gate BLOCKED) | claude-ui-20261003-01 |
| J007 | P1 | Four arms and provisional Nielsen signal | M02, M03, M07 | J006; owner config decisions | QUEUED | Unclaimed |
| J008 | P0 | Independent demo/provenance review | M06, M07, M10 | J006 | REVIEWED: PASS WITH FINDINGS (by independent agent claude-reviewer-20261003; head 34c6140) | claude-reviewer-20261003 |
| J009 | P1 | Host frozen demo report on Railway | M08b, M09 | J006, J008; project access | REVIEW (package built; deploy BLOCKED on Railway access; docker unverified) | claude-ui-20261003-01 |
| J010 | P2 | Verify/extract WCAG reference data | M00, M04, M07 | G001 | QUEUED | Unclaimed |
| J011 | P2 | Licensed corpus and owner-approved pilot config | M03, M04, M11 | J008, J010; owner decisions | QUEUED | Unclaimed |
| J012 | P2 | Usability rubric and human judge validation | M02, M07, M11 | J008; research-lead procedure | QUEUED | Unclaimed |
| J013 | P2 | Shared API/runtime queue/persistent artifacts | M05, M06, M08b | J008 | QUEUED | Unclaimed |
| J014 | P2 | Authenticated team dashboard | M08b, M09 | J013 | QUEUED | Unclaimed |
| J015 | P3 | ARC feasibility and batch adapter | M08c | J013; confirmed ARC access | QUEUED | Unclaimed |
| J016 | P3 | Pilot execution and paired analysis | M03, M07 | J011, J012, J013; spend approval | QUEUED | Unclaimed |
| J017 | P3 | Related-work and novelty verification | M01, M04, M12 | G001 | QUEUED | Unclaimed |
| J018 | P3 | Frozen release/public page/paper artifacts | M09, M10 | J016, J017; owner release approval | QUEUED | Unclaimed |

P0 = minimum demo or correctness gate; P1 = tonight stretch; P2 = research/shared-system work; P3 = later scale/release. A QUEUED job is not ready when any dependency is unmet. G001 is complete. G002 is blocked on browser fallback permission. J001 is ready to claim; no live experiment has run.

## Job records

### G001 — Named research branch and governance setup

- Blueprint: [M00](MAIN.md#m00--context-and-source-of-truth), [M12](MAIN.md#m12--governance-and-evidence-references).
- Status: DONE. Owner: codex-governance-20261003. Mode: single coordinator.
- Base: `8500092c15203ba0e90c0f70a19cec67074911bc`. Branch: `research/accessibility-usability-benchmark` (published and verified).
- Owned paths: root AGENTS.md, CLAUDE.md, README.md; agentic/ planning documents. Initial MAIN.md creation is explicitly authorized by Tien's October 3 request; future changes are not.
- Acceptance: existing research assets preserved; new research branch name reflects benchmark; old-branch retirement tracked separately in G002; contract discovered from root; MAIN protected by explicit instructions; jobs cite blueprint, include dependencies/ownership/acceptance; tonight plan includes Claude/Codex handoffs; links and diff verified; remote files published and read back.
- Evidence: branch audit completed; old branch and main matched the base; files.zip contained WCAG references only. Verification/publication results will be appended below.
- Published commit: `c59d2713093b7989f1affba96872f73fc5662a26`; remote readback confirmed all nine document contents. Comparison showed only eight added planning files and the README update; original assets and main were unchanged. Local Markdown links/anchors and git diff whitespace checks passed.
- Completed UTC: 2026-10-03T23:56:43Z. No paid calls, experiment implementation, or deployment included. J001 is ready to claim.

### G002 — Finish branch rename

- Blueprint: [M00](MAIN.md#m00--context-and-source-of-truth), [M12](MAIN.md#m12--governance-and-evidence-references).
- Status: BLOCKED. Owner: codex-governance-20261003. Dependencies: G001 and permission to use GitHub browser fallback.
- Current state: documentation is published on research/accessibility-usability-benchmark; claude/uirepairgym-setup remains at 8500092c15203ba0e90c0f70a19cec67074911bc, also retained by main. No open PR was found during audit.
- Blocker: available GitHub connector has create/update operations but no native branch rename or ref deletion; authenticated shell push is unavailable. Browser fallback requires user permission under the browser tool instructions.
- Acceptance: recheck old branch for new commits/PRs before removal, preserve any new work, retire the unchanged old branch through the permitted interface, verify named research branch and main heads remain intact. This replacement is not a native GitHub rename with redirect guarantees.
- Independent work: J001 and later implementation jobs may proceed on the published research branch.

### J001 — Demo interfaces and toolchain

- Blueprint: [M05](MAIN.md#m05--system-architecture), [M06](MAIN.md#m06--run-and-artifact-contract), [M10](MAIN.md#m10--milestones).
- Status: QUEUED. Owner: Unclaimed. Dependencies: G001.
- Scope/paths: schemas/, shared package/dependency manifests and locks, CLI entrypoints, .gitignore, .env.example, reproduction instructions. Coordinator owns these until handoff.
- Deliver: typed run/fixture/evaluation schema, marked sample artifact bundle, provider/browser/evaluator/report function or process interfaces; choose one axe integration path; document executable setup/run/report commands and owner-set live budget.
- Acceptance: schema validates measured/mock/missing/error examples; fixture hash and mode required; dependencies install; CLI help works; versions pinned; secrets/artifact output ignored; downstream workers can use one shared example without inventing types.
- Handoff: contract version, exact owned paths, effective commands, schema example paths, checks; no invented successful live run.

### J002 — Synthetic fixture

- Blueprint: [M04](MAIN.md#m04--dataset-tasks-and-reset), [M07](MAIN.md#m07--measurement-and-validity).
- Status: DONE (axe-confirmed subset). Owner: claude-ui-20261003-01. Dependencies: J001.
- Scope/paths: fixtures/demo/ and fixture-specific tests/check definitions.
- Deliver: one owned HTML/CSS page with known demonstrable defects, content preservation constraints, stable manifest/hash, and a concrete navigation/form/keyboard task.
- Acceptance: local rendering and assets work; expected defects documented without claiming complete WCAG coverage; reset leaves original hash unchanged; task has an observable success condition; source is approved for demo redistribution.

### J003 — Browser and automated evaluation

- Blueprint: [M05](MAIN.md#m05--system-architecture), [M07](MAIN.md#m07--measurement-and-validity).
- Status: INTEGRATED (self-checked). Owner: claude-worker-a-20261003. Dependencies: J001, J002.
- Scope/paths: src/uirepairgym/browser/, automated src/uirepairgym/evaluators/ modules, corresponding tests; excludes provider/report files and shared manifests.
- Deliver: pinned Playwright browser configuration, baseline/output screenshots, pinned axe integration/raw report, task/keyboard checks, console/load failures and timeouts.
- Acceptance: fixture evaluation produces actual screenshot/findings/task evidence under J001 schema; incomplete/missing/error states preserved; counts distinguish rule findings from affected elements; equal configuration used before/after; no model calls hidden in evaluator.

### J004 — Runner and provider

- Blueprint: [M03](MAIN.md#m03--conditions-and-comparison-design), [M05](MAIN.md#m05--system-architecture), [M06](MAIN.md#m06--run-and-artifact-contract).
- Status: INTEGRATED (self-checked; mock only). Owner: claude-worker-b-20261003. Dependencies: J001, J002.
- Scope/paths: src/uirepairgym/runner* and providers/, configs/demo*, corresponding tests; coordinate shared CLI changes with J001 owner.
- Deliver: run IDs/reset/workspace lifecycle, bounded iterations/timeouts/retries, one explicitly configured provider, marked mock adapter, prompts/responses/diffs/usage artifacts, evaluator interface calls.
- Acceptance: original fixture immutable; mock and provider failure paths recorded; stopping reasons reliable; missing usage stays unknown; credentials never enter target files/logs; one paid live run waits for explicit user budget and provider access.

### J005 — Minimal report

- Blueprint: [M06](MAIN.md#m06--run-and-artifact-contract), [M09](MAIN.md#m09--team-access-presentation-and-paper-artifacts).
- Status: INTEGRATED (self-checked). Owner: claude-worker-c-20261003. Dependencies: J001.
- Scope/paths: src/uirepairgym/reporting/ and report-specific tests/examples. No full dashboard framework required.
- Deliver: generated HTML from saved artifacts, before/after screenshots/findings/task outcomes/source diff/provenance/links; explicit live/mock/replay and failed/missing states.
- Acceptance: report works on shared schema fixture and later real bundle; no random or fabricated metrics; no usability score interpreted as validated; local artifact links resolve; screenshots and text remain readable.

### J006 — End-to-end integration

- Blueprint: [M10](MAIN.md#m10--milestones), [M06](MAIN.md#m06--run-and-artifact-contract).
- Status: IN_PROGRESS; mock path done, live gate BLOCKED. Owner: claude-ui-20261003-01. Dependencies: J002, J003, J004, J005.
- Scope/paths: integration fixes, shared commands/manifests, smoke check, reproduction guide; transfers overlapping ownership before edits.
- Deliver: clean setup → baseline → one live repair → re-evaluation → persisted report; minimal demo recording/walkthrough and exact commands.
- Acceptance: actual provider response and raw evidence exist; fixture unchanged; repeated evaluation reads saved output; failure/error paths visible; changes stay within MAIN scope; spending remains within user-approved cap. A mock-only pipeline does not satisfy live acceptance.

### J007 — Four arms and provisional Nielsen

- Blueprint: [M02](MAIN.md#m02--research-questions), [M03](MAIN.md#m03--conditions-and-comparison-design), [M07](MAIN.md#m07--measurement-and-validity).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J006, explicit owner model/judge/budget configuration.
- Scope/paths: arm configs/prompts, Nielsen adapter/rubric draft, arm-comparison report after ownership transfer.
- Deliver: unchanged baseline and three feedback arms sharing input/reset/budgets; evidence-backed provisional heuristic findings; all iterations retained.
- Acceptance: arms differ by declared feedback; actual counts/latency/cost visible; judge inputs/prompt saved; unvalidated ratings labeled; no research regression rate asserted from absent human-validity evidence.

### J008 — Demo review

- Blueprint: [M06](MAIN.md#m06--run-and-artifact-contract), [M07](MAIN.md#m07--measurement-and-validity), [M10](MAIN.md#m10--milestones).
- Status: REVIEWED, PASS WITH FINDINGS. Owner: claude-reviewer-20261003 (independent agent; reviews coordinator integration). Dependencies: J006.
- Scope: review-only initially; findings and follow-up IDs in this board.
- Acceptance: reviewer reproduces critical artifact/evaluation path; confirms original fixture hash, model provenance, failure labeling, actual counts, bounded budget, no secrets/public private data, and no unauthorized MAIN diff; records pass/fail evidence and limitations.

### J009 — Railway frozen demo

- Blueprint: [M08b](MAIN.md#m08b--railway-control-plane), [M09](MAIN.md#m09--team-access-presentation-and-paper-artifacts).
- Status: REVIEW; deploy BLOCKED on Railway access. Owner: claude-ui-20261003-01. Dependencies: J006, J008, Railway project access and approved display assets.
- Scope/paths: deploy/railway/ and sanitized frozen demo export; no public live-run submission.
- Deliver: Dockerfile/start command/health route or static serving plan, variables with placeholders, deployment runbook and verified URL if deployment is authorized.
- Acceptance: read-only report loads, links/screenshots resolve after restart/redeploy, no secrets or unapproved raw artifacts, HTTPS smoke check logged. Lack of access is BLOCKED, not DONE. Do not assume nested Docker capabilities.

### J010 — WCAG data verification

- Blueprint: [M00](MAIN.md#m00--context-and-source-of-truth), [M04](MAIN.md#m04--dataset-tasks-and-reset), [M07](MAIN.md#m07--measurement-and-validity).
- Status: QUEUED. Owner: Unclaimed. Dependencies: G001.
- Scope: reference extraction path agreed by coordinator, scripts and provenance checks; preserve files.zip.
- Acceptance: extracted IDs/levels/wording/version/license provenance checked against normative W3C; generated derivative clearly marked; mismatches reported; owner scope decision requested rather than modifying MAIN.

### J011 — Corpus and pilot configuration

- Blueprint: [M03](MAIN.md#m03--conditions-and-comparison-design), [M04](MAIN.md#m04--dataset-tasks-and-reset), [M11](MAIN.md#m11--open-owner-decisions-and-external-prerequisites).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J008, J010 and owner decisions.
- Acceptance: owner selects corpus track/coverage/models/sample size/budget; each fixture licensed, versioned, resettable, task-defined; generated baselines reused per pair; pilot matrix validated before execution; no legacy illustrative model labels assumed valid.

### J012 — Judge validation

- Blueprint: [M02](MAIN.md#m02--research-questions), [M07](MAIN.md#m07--measurement-and-validity), [M11](MAIN.md#m11--open-owner-decisions-and-external-prerequisites).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J008, research-lead approved human-assessment procedure.
- Acceptance: applicable H1–H10 rubric and adjudication/issue matching frozen; independent human evidence collected appropriately; agreement and precision/recall computed with defined denominators; disagreements/bias documented; validation is actually empirical.

### J013 — Shared execution service

- Blueprint: [M05](MAIN.md#m05--system-architecture), [M06](MAIN.md#m06--run-and-artifact-contract), [M08b](MAIN.md#m08b--railway-control-plane).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J008.
- Scope: apps/api/, runtime queue/DB/storage interfaces, deploy/railway/ worker configuration after ownership assignment.
- Acceptance: API validates/enqueues, worker executes existing runner, durable leases/retries/idempotency/concurrency/cost limits, persistent artifacts, private credentials, restart recovery and authorized artifact access; runtime queue explicitly distinct from JOBS.md.

### J014 — Team dashboard

- Blueprint: [M08b](MAIN.md#m08b--railway-control-plane), [M09](MAIN.md#m09--team-access-presentation-and-paper-artifacts).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J013.
- Scope: apps/dashboard/ and assigned auth integration.
- Acceptance: institution/Google login plus app allowlist, access checks, run/status/before-after/diff/download workflow, no provider keys in browser, failures/missing values/provenance readable; Railway login not treated as app auth.

### J015 — ARC feasibility and adapter

- Blueprint: [M08c](MAIN.md#m08c--optional-vt-arc-backend).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J013; actual ARC allocation for compute smoke test.
- Scope: deploy/arc/, worker backend adapter and runbook.
- Acceptance: confirm access/allocation/Slurm/Apptainer, outbound hosted-API policy and secure artifact transport, headless browser smoke test in scheduled job, storage/retention documented; open-weight inference only if selected; no login-node workloads or claim of hosted closed weights.

### J016 — Pilot execution and analysis

- Blueprint: [M03](MAIN.md#m03--conditions-and-comparison-design), [M07](MAIN.md#m07--measurement-and-validity).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J011, J012, J013, approved spend.
- Acceptance: frozen configs and full run manifest including failures; matched task/model/repetition comparisons, nonindependent iterations handled, frozen cross-regression definition, uncertainty/multiple-comparison approach documented; outputs reproduce from retained evidence.

### J017 — Related work and novelty

- Blueprint: [M01](MAIN.md#m01--goal-and-boundaries), [M04](MAIN.md#m04--dataset-tasks-and-reset), [M12](MAIN.md#m12--governance-and-evidence-references).
- Status: QUEUED. Owner: Unclaimed. Dependencies: G001.
- Acceptance: verify primary papers for FeedA11y, AccessGuru, Guriţă/Vatavu, heuristic judges and task benchmarks such as WorkArena; compare method/dataset/evaluation/contribution with ours; identify overlap without claiming an unverified first; proposed framing changes go to owner ledger.

### J018 — Release and paper artifacts

- Blueprint: [M09](MAIN.md#m09--team-access-presentation-and-paper-artifacts), [M10](MAIN.md#m10--milestones).
- Status: QUEUED. Owner: Unclaimed. Dependencies: J016, J017, explicit owner release approval.
- Acceptance: reviewed figures/tables/methods/limitations, artifact reproduction instructions, immutable approved export with hashes/versions/licenses and appropriate visibility, public site reading only that export, release tag/links verified.

### Tonight's session claims (published before implementation)

- Coordinator/integrator: **claude-ui-20261003-01** (Claude Code web session `session_01N5yCRbGeanbPknecpiWuiF`), coordinator mode, shared checkout `research/accessibility-usability-benchmark`, base SHA `2369ad32d2b61de4f10bb010d36ce88a8cbaa805`. Claimed UTC 2026-10-04T00:30:00Z. Next checkpoint: J001+J002 published.
- Owner-supplied settings for this launch were **unfilled placeholders** (provider, model ID, spend cap). No live provider call is authorized: D003 remains NEEDS_OWNER_DECISION. Live gate stays unmet until provided; mock mode will be labeled.
- Coordinator-owned (J001/J002/J006/J009 prep): `pyproject.toml`, `requirements*.txt`/locks, `schemas/`, `src/uirepairgym/{__init__,__main__,cli,schemas,interfaces,paths}.py`, `.gitignore`, `.env.example`, `fixtures/`, `scripts/`, `deploy/railway/`, root README run instructions, `agentic/JOBS.md`.
- Planned worker scopes (disjoint; each on worktree branch `agent/<session>/<job-id>`; no claim is active until the worker's start event is logged):
  - J003 Worker A (browser/evaluator): `src/uirepairgym/browser/`, `src/uirepairgym/evaluators/`, `tests/browser/`, vendored `src/uirepairgym/evaluators/vendor/axe.min.js`.
  - J004 Worker B (runner/provider): `src/uirepairgym/runner/`, `src/uirepairgym/providers/`, `configs/`, `tests/runner/`.
  - J005 Worker C (report): `src/uirepairgym/reporting/`, `tests/reporting/`.
- Dependency manifests, lockfiles, schemas, CLI wiring: coordinator only; workers request changes via handoff.

- **J001 record (claude-ui-20261003-01, coordinator).** Contract version `0.1.0`. Committed paths: `pyproject.toml`, `requirements.lock.txt`, `.gitignore`, `.env.example`, `schemas/{fixture,evaluation,run}.schema.json`, `src/uirepairgym/{__init__,__main__,cli,schemas,interfaces,paths}.py`, `scripts/make_example_bundle.py`, `examples/run-example/` (**synthetic, mode=mock**, not measurements), `tests/test_schemas.py`, vendored `src/uirepairgym/evaluators/vendor/axe.min.js` (axe-core 4.13.0 from npm tarball, MPL-2.0 license file alongside; sha256 `c24f097b…a0c1`).
  - Decisions: Python package + Playwright (Chromium, via `UIREPAIRGYM_CHROMIUM_PATH` or auto-detected `/opt/pw-browsers/chromium-*/chrome-linux/chrome` because Playwright 1.63's expected build is absent here). **axe path: Python injects the vendored pinned axe.min.js** (no Node evaluator). Runner→evaluator→report boundary = `interfaces.py` + `RunManifest` in `schemas.py`. Run layout: `runs/<run_id>/manifest.json`, `events.jsonl`, `iterations/<n>/{input,output}/`, `screenshot.png`, `axe.json`, `prompt.txt`, `response.txt`, `diff.patch`; manifest paths are relative to the run dir. Iteration 0 = baseline evaluation (no model call).
  - Commands (actual): `pip install -e '.[dev]'` ; `python -m uirepairgym --help` ; `python -m uirepairgym schema --out schemas` ; `python -m uirepairgym validate {fixture|evaluation|run} <file>` ; `python -m pytest -q`. Design targets wired lazily and **not yet implemented**: `run --config`, `eval <fixture_dir> --out`, `report --run-dir`.
  - Evidence: `pytest -q` → 7 passed (schemas validate example, fixture hash matches files, mode required, null-not-zero, extra fields rejected, committed schemas current, CLI help). Self-checked by the coordinator: **not an independent review**.
  - Budget: owner cap unset (D003). Proposed default in code/config: at most 1 run, ≤3 repair iterations, bounded tokens/timeout; **no live call until Tien supplies provider/model/cap**.
- **J002 record.** `fixtures/demo/` (index.html, styles.css, hero.svg, logo.svg) + `fixtures/demo.manifest.json` (synthetic, CC0-style, content_hash in manifest). Task: keyboard fill name+email, Enter, `#thanks` (CSS `:target`, no JS) becomes visible. Known intended defects are *documented, not yet confirmed by axe*; status REVIEW until J003 confirms they are detected. Reset = copy directory into per-run workspace. Manifest excluded from the hashed tree.

- **Integration record (claude-ui-20261003-01), head after merge `34c6140`.** Mode: coordinator; workers on separate git worktrees (`agent/claude-worker-{a,b,c}-20261003/J00{3,4,5}`), merged locally, nothing pushed on worker branches. Commits: J003 `8d967cf`, J005 `962a4d9`, J004 `e6a3fc4`; coordinator `f48eb65`, `f9c2ec2`, `34c6140`. `git diff 2369ad3 HEAD -- agentic/MAIN.md` is empty.
  - **J003** (browser/ + evaluators/): Playwright Chromium 141 (system build via fallback path), pinned axe-core 4.13.0 injected. *Measured* on pristine fixture: 5 violation rules / 18 nodes (color-contrast 5, html-has-lang 1, image-alt 2, landmark-one-main 1, region 9), 0 incomplete, 21 passes; task completes by keyboard; focus-visible check fails 7/7. **Axe did not detect** unlabeled inputs (placeholder accepted), heading order, "click here" link text, missing skip link (manifest annotated; J002 claim about `.nav a` contrast was wrong and corrected). Nielsen = unavailable (reason recorded).
  - **J004** (runner/ + providers/ + configs/): bounded runner, mock + Anthropic adapters, live mode refuses without explicit model, `budget.max_total_usd` and `ANTHROPIC_API_KEY`. **Live provider path NOT exercised** (no network/model call anywhere). `RunManifest.error` added by coordinator at the worker's request; `.env.example` extended.
  - **J005** (reporting/): Jinja2 HTML report with prominent MOCK/LIVE/REPLAY banner; Worker C reports zero axe violations on the report at 1280px and 375px (their run; coordinator did not repeat).
  - **J006 mock run (measured evaluation, scripted repair):** `python -m uirepairgym run --config configs/mock.json` -> run `20261004T003002Z-37b52c`, `mode=mock`, status success, stopping reason `no_change`. Real browser evaluation of both states: baseline 5 rules/18 nodes -> after scripted mock edit 3 rules/17 nodes (serious 6->5, critical 2->0, moderate 10->12); task still completed. The mock edit is deterministic text, **not model output; excluded from empirical comparison.** Iteration 2 produced no change and was not re-evaluated (recorded, not copied as measured).
  - **LIVE GATE NOT MET.** Needs from Tien (D003): provider, exact model ID, `budget.max_total_usd`, server-side `ANTHROPIC_API_KEY` (and optional pricing + pricing_basis for cost enforcement). Then: `UIREPAIRGYM_MODEL=<id> ANTHROPIC_API_KEY=... python -m uirepairgym run --config configs/demo.json` after setting `budget.max_total_usd` in the config.
  - **J009 package:** `deploy/railway/{Dockerfile.demo,server.py,RUNBOOK.md}`, `scripts/export_demo_report.py` (explicit `--approve-demo`, refuses non-live without `--allow-mock`, secret scan, EXPORT_MANIFEST hashes), `deploy/railway/demo-report/` (currently the **MOCK** export), `.dockerignore`. Checks: `pytest tests/deploy` pass; direct server smoke: /health 200, / 200, assets 200, POST 405. **`docker build/run` unverified: no Docker daemon in this session.** Not deployed; Railway access required.
  - Checks (coordinator): `python -m pytest -q` -> 69 passed (at `34c6140` plus schema change).
  - Follow-ups proposed: J019 events.jsonl schema; J020 `AxeSummary` optional counts when an evaluator fails mid-way; J021 make `region` landmark counts and axe-miss defects (labels via placeholder, heading order, skip link) addressable with supplementary checks.

- **J008 review result (independent agent `claude-reviewer-20261003`, reviewed head `34c6140` in a `git archive` copy; the agent was launched by the coordinator but did not write the code).** Verdict PASS WITH FINDINGS. Verified: MAIN.md diff empty; 69 tests pass; mock run reproduced (baseline 5 rules/18 nodes → 3/17 after scripted edit); fixture hash unchanged; MOCK labeling honest and live gate not claimed; no secrets; live mode refuses without model/cap/key; server traversal probes all 404. Not verified by reviewer: live Anthropic call, Docker, Railway.
  - Fixed by coordinator after review: (1) USD cap now requires `provider.pricing` so it is enforceable (test added); (8) server `GET /%00` returns 404 instead of dropping the connection; (6, partly) export `--out` guarded to a `demo-report` dir inside the repo.
  - Open follow-ups: **J019** provenance gaps (prompt/evaluator version+hash, artifact hashes, per-iteration timestamps, dirty-tree flag, seed, fixture license in manifest); **J020** treat `stop_reason=max_tokens` as failure and enforce "no JS" in parser; **J021** distinguish pipeline `status` from repair outcome and mark unevaluated iterations (a first-iteration `no_change` currently reads `success`; the mock script is idempotent so `no_change` is not evidence of convergence); **J022** `Evaluation.mode` is hardcoded `live` (rename/clarify as measurement mode); extend export secret scan to `EXPORT_MANIFEST`; accept `--no-sandbox` Chromium risk for demo only (MAIN M08a).

## Claim/handoff template

Copy into the relevant record when claiming; never edit MAIN.md to record progress.

- Job ID / MAIN section(s):
- Status / owner session / role:
- Coordination mode / canonical claim commit:
- Claimed UTC / latest heartbeat UTC / next checkpoint:
- Job branch / base SHA:
- Owned paths / shared edits requested:
- Dependencies verified / acceptance checklist:
- Explicit user authorization (only if required; precise scope):
- Commits / changed paths:
- Commands and actual outcomes / artifacts / run mode:
- Reviewer / integration SHA / integrated checks:
- Blockers / next steps / follow-up IDs:

## Proposed blueprint changes and owner decisions

No MAIN edits are authorized by this ledger. Status remains NEEDS_OWNER_DECISION until Tien explicitly decides. Routine compatible implementation choices are recorded in job records; research scope changes require owner direction.

| Proposal | MAIN | Decision requested | Evidence/impact | Status |
|---|---|---|---|---|
| D001 | M03, M04, M11 | Select generated versus imported corpus track for pilot | Documents discuss generated UIs and imported examples; affects paired baselines and claims | NEEDS_OWNER_DECISION |
| D002 | M07, M11 | Freeze WCAG version/levels/applicable subset | Legacy prompts say 2.1 AA; archive is 2.2; static pilot proposes A/AA/AAA | NEEDS_OWNER_DECISION |
| D003 | M06, M11 | Select actual demo provider/model and spend cap | Live acceptance requires working credentials and bounded budget | NEEDS_OWNER_DECISION |
| D004 | M07, M11 | Approve expert rubric/adjudication and regression definition | LLM-only heuristic scores cannot establish validated usability | NEEDS_OWNER_DECISION |

## Event log

Append UTC events with job ID/session, change, evidence, and next step. Preserve older events.

- 2026-10-03T23:45:00Z — G001 / codex-governance-20261003 — Audited supplied branch and main at 8500092c15203ba0e90c0f70a19cec67074911bc; recovered Hosting Experiment Stack direction and read existing planning documents/WCAG archive listing. No app code found. Next: publish protected blueprint and queue.

- 2026-10-03T23:56:43Z — G001 / codex-governance-20261003 — Published c59d2713093b7989f1affba96872f73fc5662a26 through GitHub connector; nine remote file contents verified, links/diff checked, research assets and main preserved. G001 DONE; J001 ready. G002 BLOCKED: original branch remains pending permission for GitHub browser fallback.

- 2026-10-04T00:30:00Z — J001,J002 / claude-ui-20261003-01 — Claimed (coordinator mode). Inspected tooling: Python 3.11, Node 22, Playwright 1.63 + system Chromium, no provider credentials in env, Docker CLI present but daemon not verified. Next: schemas/CLI/example bundle, then fixture.
- 2026-10-04T00:50:00Z — J001 DONE(self-checked), J002 REVIEW / claude-ui-20261003-01 — Schemas, CLI scaffold, example mock bundle, pinned deps, fixture + manifest created; 7 tests pass. Next: push, launch workers A/B/C on worktrees.
- 2026-10-04T00:55:00Z — J003/J004/J005 INTEGRATED, J006 mock path run, J009 package built / claude-ui-20261003-01 — see Integration record. Independent J008 reviewer launched. Live gate and Railway deploy BLOCKED on owner inputs.
- 2026-10-04T01:10:00Z — J008 / claude-reviewer-20261003 — PASS WITH FINDINGS; coordinator fixed USD-cap enforcement, server null-byte, export path guard; J019–J022 proposed.
- 2026-10-04T01:25:00Z — J009 / claude-ui-20261003-01 — Railway commit status `Deployment failed` on bb31e73 for service `accessibility-research` (build logs not accessible from this session; cause unconfirmed). Likely hypothesis: no root Dockerfile, so Railway auto-detected a Python app from pyproject.toml. Added root `railway.json` pinning Dockerfile builder + `/health`. Result of redeploy unknown until the next Railway status arrives.
