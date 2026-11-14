# HOSP-04 — Aster University Health

Fictional academic medical center inspired by approved Duke Health information architecture. Source availability verified 2026-11-12 through HTTP retrieval and web text extraction; no rendered source inspection. Approval: Samhith Varma, 2026-11-12, recorded in task context and metadata/change-log.md.

Open index.html directly in a browser. No build, server, network or installation is needed. All ten pages are linked with relative paths.

## Complete source map
- `index.html` ← https://www.dukehealth.org/
- `treatments.html` ← https://www.dukehealth.org/adult-treatments
- `service-detail.html` ← https://www.dukehealth.org/treatments/smoking-cessation
- `providers.html` ← https://www.dukehealth.org/find-doctors-physicians
- `provider-detail.html` ← https://www.dukehealth.org/find-doctors-physicians/deb-bhowmick-md
- `locations.html` ← https://www.dukehealth.org/locations?view=list
- `plan-your-visit.html` ← https://www.dukehealth.org/plan-your-visit
- `appointments.html` ← https://www.dukehealth.org/plan-your-visit/make-an-appointment
- `billing.html` ← https://www.dukehealth.org/paying-for-care
- `404.html` — intentional protocol addition; no retained source error design.

## Dataset and interactions
Six fictional providers, six fictional locations, six program entries and six searchable page routes. Provider query/city/ZIP and alphabetical sort; location treatment/age/sample distance/type filters, clear and load more; program filtering with empty states; local site search; menu disclosure with Escape; native FAQ details; modal portal explanation with focus return; non-submitting visit checklist with validation/status. Directory results and checklist behavior are local reconstructions, not verified source behavior. Only Mira Arden has a mapped profile; other records explicitly link to appointment information.

No medical guidance, triage, real appointment requests, credentials, payments, authentication or patient information. Appointment choices remain informational, matching the observed source scope; checklist is an intentional research addition without health data entry.

## Evaluation and limitations
Shared QC evidence and source/logic checks are in `pipelines/codex/runs/2026-11-13T15-47-56-447Z-build-HOSP-04`. See validation evidence for actual outcomes. Browser interaction and accessibility review are not claimed when Chromium cannot execute. Geometry, responsive appearance, screen-reader behavior, zoom and visual fidelity require human browser review. Active slots 01–06; 07–10 deferred.

Actual results: shared QC exited 2 at Chromium launch; no axe report was produced. Browser interaction/accessibility gates remain not-tested. Static parser checks passed, JS syntax passed, and 10 assertions against exact production pure functions passed in Node VM without DOM. Initial output is preserved in this run’s `initial-output/`; a presentation-class correction is logged in `corrections.json`.
