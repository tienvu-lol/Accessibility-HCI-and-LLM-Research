# October 3, 2026 demo plan

Read MAIN.md and claim work in JOBS.md. This is a tentative execution plan, not a claim that the demo has already been built. It implements M04–M10 without changing the blueprint.

## Realistic target

Starting point: research documents and WCAG archive; no visible app code. A useful local demo tonight is plausible with a narrow scope and working development/provider access. A full validated benchmark, team dashboard, ARC backend, and research conclusions are not a one-evening deliverable.

**Minimum live demo:** one synthetic static page → Playwright baseline screenshot + axe/task checks → one bounded hosted-model repair → the same checks afterward → immutable run bundle → readable before/after report. Show failures and regressions honestly. A static hosted copy of the completed report is a stretch goal, not a requirement for proving the experiment path works.

**Stretch:** four feedback arms on one shared fixture, with provisional Nielsen findings clearly labeled unvalidated. Do not make Nielsen judge validation, OAuth, multi-user orchestration, or ARC access prerequisites for the minimum demonstration.

The estimate is approximately 3–5 hours of coordinated implementation from a blank codebase, assuming tools install, provider credentials work, and integration is controlled. It is an estimate, not a deadline guarantee. If installation/API access consumes the first hour, keep the target local and skip dashboard framework work.

## Proposed work split

| Lane | Initial jobs | Owns | Can run alongside |
|---|---|---|---|
| Tien + one coordinator (Codex or Claude) | J001, shared dependency edits, integration J006 | Schemas, shared manifests, commands, canonical board | All other lanes after contract |
| Claude browser/evaluator worker | J003 | Browser observations, axe integration, task checks | Runner and report workers |
| Codex runner/provider worker | J004 | Run lifecycle, hosted adapter, budgets, artifacts | Browser and report workers |
| Optional Claude/Codex report worker | J005 | HTML before/after report consuming artifact schema | Browser and runner workers |
| Fixture worker or coordinator | J002 | One owned synthetic fixture + manifest | J001 after ID/path convention |
| Deployment worker after local proof | J009 | Frozen demo report Dockerfile/runbook | Review and demo recording |

Use as few simultaneous agents as available independent work justifies. Two sessions plus a coordinating owner are enough for the initial pipeline. Do not have both sessions editing pyproject/dependency manifests or the same runner. These lanes are suggested assignments, not current ownership.

## Time boxes and gates

| Elapsed | Work | Gate |
|---|---|---|
| 0–30 minutes | J001 schema/entrypoint agreement; J002 fixture; verify provider/tool availability | Shared example bundle and owned file paths published |
| 30–120 minutes | J003 browser + evaluator; J004 runner + one provider; J005 report in parallel | Components operate against the same schema |
| 120–180 minutes | J006 integration; baseline and mock path first, then one bounded live run | Artifacts, screenshots, raw findings, errors reproducible |
| 180–240 minutes | Fix integration faults; J007 optional arm/Nielsen extension; J008 review | Minimum live demo meets acceptance, caveats recorded |
| Remaining time | J009 frozen report deployment if access exists | URL smoke-tested, only approved demo artifacts exposed |

When a time box is missed, trim stretch scope rather than fabricate completion. A mock adapter can unblock integration, but the report must say mock and the minimum live-demo gate remains unmet until a real provider call succeeds.

## Development setup decisions to record in J001

- A small Python package/CLI and Playwright Chromium are the initial backend convention; select and pin actual package versions during setup.
- Choose the axe integration approach before workers split: Python injecting a pinned axe JS bundle, or a small Node evaluator with a JSON interface. Record the choice and checks; do not implement both paths tonight.
- Use a CLI entrypoint whose help/run behavior is documented by J001. Proposed command shape: `python -m uirepairgym run --config configs/demo.json`, followed by `python -m uirepairgym report --run-dir runs/<id>`. These commands are design targets and do not yet exist.
- Require model/provider settings explicitly; do not embed guessed frontier-model names. User sets the appropriate provider environment variable locally or in server configuration. Only placeholders go in Git.
- J001 sets the default budget; propose one run, at most three repairs, bounded per-call token limit and timeout, with final spend cap explicitly set by Tien before live calls. No unbounded retry loops.

## Demo acceptance walkthrough

1. Start from a clean, unchanged fixture. Show its manifest/hash and run ID.
2. Produce a baseline screenshot, actual axe report, and a defined task-check outcome.
3. Execute the selected repair arm through the configured hosted model; save exact effective prompt, response, applied output, and available usage metadata.
4. Render the edited page with the same browser settings; show actual before/after findings and task outcome. An increased count is a legitimate observed result.
5. Open the report showing screenshots, source diff, model/arm/iteration, stopping reason, measured automated counts, and artifact downloads.
6. Label every usability score as provisional/unvalidated unless human evidence actually exists. If none exists, display unavailable rather than inventing it.
7. Re-run evaluation on the saved output and verify persistence across a worker restart or document a local-only result.

Automated issue count improvement is not full WCAG conformance. One demo does not estimate a scientific regression rate or support general model rankings.

## Copyable session briefs

### Coordinator brief

> Read AGENTS.md and agentic/AGENTS.md, MAIN.md, JOBS.md, and COORDINATION.md. Do not modify MAIN.md. Claim J001 on the canonical board, publish the shared schema/sample bundle and file ownership, and serialize shared dependency changes. Then integrate J002–J005 through J006, recording actual evidence and blockers. Coordinate requests and report blueprint proposals in JOBS.md. Work on the research branch; do not merge to main.

### Browser/evaluator worker brief

> Read the contracts, MAIN.md M04–M07, and current JOBS.md. Request/claim J003 once J001/J002 dependencies are satisfied. Own only its listed browser/evaluator/test files. Implement Playwright screenshots, pinned axe findings, and the fixture's concrete behavioral checks under the shared schema. Preserve raw output and missing/error states. Do not edit MAIN.md or shared dependency files. Publish evidence and handoff in JOBS.md.

### Runner/provider worker brief

> Read the contracts, MAIN.md M03–M08a, and current JOBS.md. Request/claim J004 after J001/J002. Implement bounded workspace reset, one configurable hosted-model adapter, marked mock mode, per-iteration artifacts, and failure handling using J001 interfaces. Do not change MAIN.md or browser/report files. Run paid calls only within the user's explicit demo budget. Report commands, outcomes, usage, blockers, and commits through JOBS.md.

### Report worker brief

> Read the contracts, MAIN.md M06/M09/M10, and current JOBS.md. Request/claim J005 after J001's schema is published. Build a generated HTML report from saved artifacts, with before/after screenshots, findings, diff, provenance, and missing/failed/mock states. No invented scores. Do not edit MAIN.md, runner, or evaluator files. Return evidence and commits through JOBS.md.

## Prerequisites outside coding

Tien: provide the chosen model/provider, working server-side credentials, and bounded API spend authorization when starting live work; approve any fixture that will be publicly displayed. Railway deployment needs access to the intended project and persistent/static artifact decisions. ARC access is deferred.

No implementation or deployment jobs are claimed by creating this plan. Start by publishing a J001 claim; the branch rename and planning commit are governance work, not a successful experiment run.
