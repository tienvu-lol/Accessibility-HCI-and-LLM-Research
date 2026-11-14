# GOV-05 — Alder Commonwealth

Fictional research replica inspired by the Commonwealth of Virginia portal. No real government authority, services, contact data or emergency availability. HTML/CSS/vanilla JS; open index.html directly via file://. No installation, server or network is required.

## Source and sitemap
Approved source: https://www.virginia.gov/ . Verified 2026-11-13 by connected-web search and readable page-open text retrieval, accepted with disclosed cache/origin/browser limits. This does not establish fresh-origin availability, rendered appearance or interaction fidelity. Approval: pipelines/codex/research/evidence/replacement-approval-2026-11-13.json.

| Local page | Source |
|---|---|
| index.html | https://www.virginia.gov/ |
| services.html | https://www.virginia.gov/services/ |
| agencies.html | https://www.virginia.gov/agencies/ |
| government.html | https://www.virginia.gov/state-government/ |
| service-category.html | https://www.virginia.gov/services/government/ |
| 404.html | Required research addition; no source page claimed |

## Local interactions
Six fictional agencies, three categories, six topic cards and ten search records. Search uses keywords and announces counts, blank and empty states. Agency filters combine keyword and any checked category; clear resets them. Topic disclosure uses native details; mobile menu supports Escape. Feedback uses a native modal dialog, validates ten characters, returns focus on close, and reports demo completion. No feedback is transmitted or persisted. Generated results carry both instrumentation attributes. Agency results link to the government overview, because external agency transactions are excluded.

## Validation
See this run's evidence directory (recorded in generation-metadata.json). Static checks and delivered-JS tests are recorded separately from browser checks. Native dialog, full keyboard, screen reader, responsive/zoom, rendered contrast, axe and visual fidelity require browser verification. No compliance claim.

Actual QC: shared qc.js attempted once; exit 2 at Chromium launch. No JSON report or axe/viewport result was produced. Browser failure is blocked/not-tested, not zero failures. Logs: `qc-initial.log`, `qc-exit.txt`. Static source/link/fragment/instrumentation audit passed after fixing two search anchors; initial failed audit and initial artifact are retained. `node --check` passed. Twelve delivered-JS mock DOM tests passed for populated/filter/empty/search/menu/feedback states; these do not establish native interaction accessibility. Harness attempt 1 had an incorrect require path and was corrected without changing delivered JS. No human or cross-model code edits.

Seven gates: technology pass; completeness pass; structure pass (static only); interaction not-tested (full native gate; mock checks passed); accessibility not-tested; traceability pass; scope pass. Rendered/source visual fidelity and human acceptance remain pending.
