# Validation — FASH-06

- Technology: pass — static local HTML/CSS/vanilla JS; no prohibited runtime dependencies.
- Completeness: pass — six HTML pages, six SVG assets, CSS/JS and four required documentation artifacts, 18 site files. Relative link and fragment audit: 165 references.
- Structure: pass within static scope — one H1/main and skip link per page; all meaningful semantic regions have both metadata attributes; inventory enumerates exact static instances and dynamic ranges. Source rendered layout is unverified.
- Interaction: pass within DOM-mock scope — 17 assertions/tests execute delivered main.js using explicit minimal DOM mocks, across pages with/without share preview. Search normalization/category/empty/clear, menu mutual exclusion/close/Escape, focus targets, edition label and share state tested. Native fragment destination IDs audited statically.
- Accessibility: not-tested — implementation and static labels/alt/headings/focus CSS/reduced-motion patterns inspected, but browser/axe/native keyboard/actual focus/reflow/zoom/screen reader/contrast measurements not performed. No conformance claim.
- Traceability: pass — approved source map, source/protocol/task snapshots/hashes, original artwork and exact inventory captured.
- Scope: pass — five approved mapped pages plus protocol 404; search is in-page only.

Shared QC used unmodified absolute shared qc.js. Attempt 1 exit 2, Chromium MachPortRendezvous permission denied (1100). No JSON emitted. qc-initial.log/exit are raw evidence; qc-outcome.json reports the blocked result. No bypass, no QC modifications and no retry. A browser launch failure is not a passed axe scan.

`node --check` passed. Reproduce local independent checks from isolated repository root with `python3 <run>/static-audit.py` and `node <run>/interaction-tests.cjs`; scripts live outside the site and are evaluation-only.

Post-review clarity correction: sample teaser/search titles are unlinked and visibly marked summary-only; separate representative links name the actual article. Lead headline now exactly matches the article H1. Static instance audit (32 component types), syntax check and all 17 actual-JS tests rerun and passed after this change. Browser QC not retried.
