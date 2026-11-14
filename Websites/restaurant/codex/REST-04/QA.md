# REST-04 quality-control evidence

- Technology: PASS, source/file inspection. HTML5/CSS/vanilla JS, two local SVGs; no framework/backend/build or remote runtime dependencies.
- Completeness: PASS, parsed all seven HTML pages, verified 142 local asset/link references including fragments, required artifacts and JSON parsing. `static-audit.json` in the run records zero findings; this is separate from the shared browser tool.
- Structure: PASS by source inspection, one H1 per page, header/main/footer, unique IDs, skip destination, alt attributes, descriptive data attributes. Visual source fidelity NOT TESTED.
- Interaction: NOT TESTED in a browser. Code inspected: native navigation disclosures; mobile expanded state; Escape dismissal/focus; dinner anchors; reservation modal close/Escape/focus return; gallery next/previous wraparound and status. Actual keyboard, dialog, gallery and mobile execution NOT TESTED.
- Accessibility: NOT TESTED by axe/browser. Shared `record-qc.mjs` executed once, actual exit 2: Chromium launch failed with `bootstrap_check_in ... Permission denied (1100)`. No JSON axe result was produced. Required browser QC is BLOCKED, never a zero-failures result. CUA Chrome preview was attempted separately: browser access host unavailable. No screenshot obtained.
- Traceability: PASS, six approved source pages plus required local 404, component inventory page lists verified against parsed markup. Source availability relies on approved text-only evidence, not new rendered inspection.
- Scope: PASS by source inspection. No speculative booking or inquiry form, real addresses, external ordering, account, payment or source media. Gallery behavior explicitly inferred; source menu anchors versus tabs unverified.
- JavaScript syntax: PASS, `node --check js/main.js`.

Responsive, contrast rendering, screen-reader, 200%/400% zoom, pointer targets and human acceptance remain unverified. WCAG 2.2 AA is a target, not established conformance. Original initial output is preserved separately before final documentation; no generated website code correction occurred.

Evidence: `Websites/pipelines/codex/runs/2026-11-14T05-01-38-812Z-build-REST-04/` contains `task.md`, snapshots, `run.json`, `static-audit.json`, `qc-2026-11-14T05-04-39-684Z.log`, `initial-output/`, delivery ZIP and hashes. Files can be opened directly through file://. No commit, push or publication performed.
