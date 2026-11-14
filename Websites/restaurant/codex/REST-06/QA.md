# REST-06 QA

## Executed checks

- PASS: static HTML/source audit across six pages, 110 relative asset/link references including fragments, unique IDs, one H1 per page, heading order, language, landmarks, skip links and image alt attributes. Component IDs, actual page coverage and per-section instances agree with the inventory (20 component types). No prohibited file types or remote HTML dependencies. Evidence: `static-audit.json` in the recorded run.
- PASS: Node JavaScript syntax check (`node --check js/main.js`). This does not execute browser interactions.
- BLOCKED: required shared `record-qc.mjs` attempted once; actual exit 2. Chromium launch crashed at bootstrap with Permission denied (1100), before axe/layout scans. No browser JSON pass result exists. Actual log: `qc-2026-11-14T05-11-07-160Z.log` in this run.

## Source inspection only

- Technology, completeness, structure, traceability and scope: PASS by static/source inspection. Static HTML/CSS/vanilla JS, no build/runtime dependencies, required approved mappings/artifacts present.
- Mobile toggle updates aria-expanded; Escape closes navigation and returns focus. Native disclosure handles location links.
- Gallery uses two local images and wraps previous/next; visible alt/caption/count update together.
- Town & Country native dialog opens/closes and returns focus; no booking or personal details. Heritage Square contains no reservation or takeout action.
- CSS includes visible focus, responsive layout at 1000px, reduced-motion rules and menu print styling.

## Not tested

Actual browser interaction execution, Escape/focus behavior, dialog keyboard containment, gallery controls, mobile reflow/375px overflow, computed contrast, 200%/400% zoom, screen reader, axe/WCAG, rendered fidelity and human acceptance. The parent reported browser preview host unavailable earlier; this child did not claim a CUA attempt or screenshot. WCAG 2.2 AA is a target, not conformance.

Source availability relies on prior approved readable-text evidence (possibly cached/indexed), not new origin/rendering tests. Source PDF filename dates to 2023; freshness not established. No live weather/status/availability, routing, reservation, ordering or payment system exists.

Initial complete output was retained before QC in `initial-output/`. No website code changed after that snapshot; final research documentation records actual QC outcomes. No human or other-model code edits; parent static review separate. No commits or publication.
