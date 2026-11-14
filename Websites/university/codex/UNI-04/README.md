# UNI-04 — Northvale State University

Independent static research replica, category university, slot 04, Codex group. Fictional branding and original copy; inspired by the approved information architecture of The Pennsylvania State University (Penn State), https://www.psu.edu/.

Source verification: 2026-11-12, HTTP-only urllib GET plus live web search/text extraction. Mapped pages returned HTTP 200 in the archived research evidence. Source rendering and source interactions were not verified. Approval: Samhith Varma, 2026-11-12; `Websites/metadata/change-log.md`, “Codex Phase A approval (slots 04–06).” Stale “approval pending” language in the original research block is superseded by this approval and the prepared task.

## Run locally

Open `index.html` directly in a browser. All nine pages, SVGs, filters, and form simulations work without a server or network. No installation or build step. No data is stored or sent. The 404 page is an explicit local page, not a server routing rule.

## Complete sitemap and source map

| Local file | Source |
| --- | --- |
| `index.html` | https://www.psu.edu/ |
| `majors.html` | https://www.psu.edu/academics/undergraduate/majors |
| `biology.html` | https://bulletins.psu.edu/undergraduate/colleges/eberly-science/biology-bs/ |
| `apply.html` | https://www.psu.edu/admission/undergraduate/how-to-apply |
| `costs-aid.html` | https://www.psu.edu/costs-aid |
| `visit.html` | https://www.psu.edu/admission/undergraduate/explore/visit-penn-state |
| `directories.html` | https://www.psu.edu/search/directories |
| `news.html` | https://www.psu.edu/news |
| `404.html` | Local intentional addition; source missing-page probe returned HTTP 404, rendered layout unknown. |

## Content and behavior

- Home: media-style illustrated hero; opportunity and three-part highlight bands; traditions feature; news cards; grouped footer.
- Majors: eight inline program cards, text search, area and campus filters, reset, live result count and empty state. One mapped program detail, Biology; other records clearly identify their listing-only scope.
- Biology: separate bulletin treatment, breadcrumb, section navigation, requirements table, objectives, advising, two expandable sample academic plans, career paths.
- Apply: two application routes, preparation questions, sample dates, requirements, FAQs, and a local preparation checklist dialog.
- Costs/aid: sample budget, aid types and planning sections. No live calculator or award offer.
- Visit: admitted students, campus/audience options, virtual/group visit disclosures, and a local request-preview dialog.
- Directories: gateway with three fictional office profiles. No inferred inline people search was added.
- News: separate editorial header, featured research, campus groups, three fictional inline stories, and disclosed media-highlight limitation.

Dataset: 8 program records, 3 campus choices, 4 fields, 3 fictional office profiles, 3 fictional news stories, 2 academic plan options, 3 applicant types. Costs, deadlines and names are expressly illustrative. No real outcome claims or testimonials.

The responsive menu and submenu disclosures support native keyboard interaction, Escape closing, and focus return. Dialogs use native modal focus containment; closing returns focus to the initiating button. Form errors identify fields and focus an error summary. Success states explicitly deny submission or registration; values are written with textContent.

## Provenance and evaluation

Actual worker: gpt-6.1-sol through the OpenAI collaboration runtime in Codex; release version unavailable. Historical codex-cli research attribution is not this runtime. Active allocation is 01–06; 07–10 remain deferred. Generation artifacts and QC evidence are in `Websites/pipelines/codex/runs/2026-11-13T15-34-51-696Z-build-UNI-04/` in the delivery repository; evidence is outside this independent site.

Initial generated site is preserved as `initial-site.tar.gz` before validation repairs. See generation-metadata.json for timestamps, durable protocol hashes, gates, tools and repair history. See fidelity-notes.md for observed versus inferred elements. QC and interaction results will be recorded in the run evidence and final validation note below.

## Limits

No pixel-level comparison is possible from the approved HTTP/text evidence. No external applications, directory system, registrations, media feeds, or social widgets are reproduced. No screen-reader, zoom, Safari/Firefox, or physical-device testing is claimed. WCAG 2.2 AA is a target, not a conformance claim.

## Final validation record

Completed 2026-11-13. Delivered 9 HTML pages, 2 original SVG assets, 1 CSS, 1 JS, and 4 documentation/metadata files: 17 files total.

Static checks passed: required artifacts, all local files/fragments, unique IDs, one H1 per page, heading sequence, explicit control labels, alt attributes, both metadata attributes on meaningful semantic regions, explicit button types, and JS syntax. Nine declared solid palette pairs passed their text/focus contrast thresholds; imagery/rendered states were not audited.

Shared mandatory QC was actually attempted once (`qc-01.log`, `qc-attempt.json`): exit 2, Chromium launch denied at MachPortRendezvous bootstrap_check_in. It emitted no QC summary JSON. Axe, desktop/mobile browser scans, reflow and browser interaction tests are **not tested**, with no claim of zero failures. Submission awaits runnable browser QC and human review.

Five actual-JS logic groups passed through Node vm DOM stand-ins: menu Escape/focus requests; exclusive submenus; combined search/filter/empty/reset; application errors and success/reset; visit errors and success/reset. This does not test native dialog focus containment, accessibility trees, rendered CSS, or actual keyboard events. The first harness invocation had a runner-path error, preserved in `interaction-harness-first-error.log`; correcting the runner required no site-JS changes. See `interaction-logic-results.json`, `static-audit.json`, `technology-audit.json`, `palette-contrast.json`, `repairs.json`, and `delivery-summary.md` in the run folder.
