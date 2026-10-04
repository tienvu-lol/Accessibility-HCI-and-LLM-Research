# Project structure and implementation map

Read MAIN.md first. This map explains its implementation; it does not introduce additional goals or authorize changes to MAIN.md.

## Existing and added planning files

| Path | Purpose | State |
|---|---|---|
| AGENTS.md | Repository-wide discovery and protected blueprint rule | Added |
| CLAUDE.md | Claude Code entrypoint to the same contract | Added |
| agentic/AGENTS.md | Full agent contract | Added |
| agentic/MAIN.md | User-owned goals, context, architecture, research decisions | Added; protected |
| agentic/JOBS.md | Engineering queue, ownership, evidence, proposals | Added |
| agentic/COORDINATION.md | Concurrent claims, integration, handoffs | Added |
| agentic/PROJECT_STRUCTURE.md | This implementation map | Added |
| agentic/DEMO_TONIGHT.md | October 3 demo schedule and Claude/Codex handoffs | Added |
| Papers/ | Original project proposals and simulation documents | Existing; preserve |
| Literature/ | Existing papers and review spreadsheet | Existing; preserve |
| files.zip | WCAG reference archive; requires verification/extraction | Existing; preserve |
| LICENSE | Repository license; does not replace source-asset licenses | Existing; preserve |

## Proposed implementation paths

These directories are planned, not claimed to exist. Adopt them through jobs rather than generating empty scaffolding everywhere.

| Path | What belongs here | MAIN reference | Initial owner lane |
|---|---|---|---|
| schemas/ | Run, fixture, evaluator JSON schemas; versioned examples | M06 | Coordinator/interface job |
| fixtures/ | Synthetic or licensed versioned static pages and manifests | M04 | Fixture worker |
| configs/ | Model/arm/budget and dataset settings; no secrets | M03, M06 | Runner worker |
| src/uirepairgym/ | Python runner and reset/workspace lifecycle | M05 | Runner worker |
| src/uirepairgym/providers/ | Hosted model adapters; clearly labeled mocks | M05, M06 | Runner worker |
| src/uirepairgym/browser/ | Playwright observations and behavioral checks | M05, M07 | Browser worker |
| src/uirepairgym/evaluators/ | axe/Nielsen adapters and evidence normalization | M07 | Browser/evaluator worker |
| src/uirepairgym/reporting/ | Generated HTML report from actual run artifacts | M09 | Report worker |
| apps/api/ | FastAPI submission/status/artifact access | M05, M08b | Later API job |
| apps/dashboard/ | Proposed Next.js team interface | M05, M09 | Later UI job |
| deploy/railway/ | Deployment settings/runbook, secrets placeholders | M08b | Deployment worker |
| deploy/arc/ | Future Slurm/Apptainer adapter and runbook | M08c | Later ARC job |
| scripts/ | CLI/check/reproduction entrypoints | M06, M10 | Claimed owner |
| tests/ | Relevant schema, runner, and browser integration checks | M06, M07 | Component owners by file |
| runs/ | Generated private run artifacts, ignored by Git | M06 | Runtime output |
| releases/ | Explicitly approved frozen exports/manifests | M09 | Later release job |

## Integration boundaries

1. J001 freezes run/schema names and the runner-to-report boundary. Downstream workers read the published fixture/run examples first.
2. J002 owns fixture files. J003 owns browser/evaluator files. J004 owns runner/provider/config files. J005 owns report files. Shared dependency manifests and top-level commands belong to the integration coordinator until transferred explicitly.
3. Browser evaluation takes a run-owned static site and declared browser configuration, and returns typed observations/findings with raw evidence paths. It does not silently call the repair model.
4. A provider adapter takes effective inputs/settings and returns response plus usage metadata. It does not overwrite the original fixture or claim evaluation success.
5. The report reads completed run artifacts and displays missing/failed states. It never generates random metrics to fill an empty chart.
6. Later API/runtime-queue work wraps the same runner and artifact schema. Avoid rebuilding a second experiment engine inside the dashboard.

Treat names as a starting implementation convention. If a change affects MAIN.md's goals or architecture, propose it in JOBS.md; routine compatible path refinements may be recorded in this map by the owning job.
