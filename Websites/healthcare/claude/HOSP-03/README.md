# HOSP-03 - Larkspur Children's Hospital (fictional)

| Field | Value |
| --- | --- |
| Replica ID | HOSP-03 (category `healthcare`, slot 3, model group `claude`) |
| Stratum | Healthcare (Hospital) - children's hospital |
| Fictional branding | "Larkspur Children's Hospital", placeholder SVG mark, invented people, sites, phone numbers (555-01xx) and addresses |
| Approved source URL | https://www.chop.edu/ |
| Source verification | 2026-11-10, HTTP GET via curl by the Phase A research (`Websites/pipelines/claude/research/HOSP.md`): home page returned 200, title "Welcome \| Children's Hospital of Philadelphia". The 14 mapped source pages all returned 200 in that research. Not re-fetched in this run. |
| Approval | The project lead waived the Phase A approval stop and approved this reference on 2026-11-10 (`source_approved_at` in `generation-metadata.json`). |
| Generator | `claude-sonnet-5-5` via a pi-subagents worker; run `build-HOSP-03`; see `generation-metadata.json` |

All content is original. No real logos, seals, trademarks or reference prose were copied. Sample data is invented and is not medical advice.

## Run locally

Open `index.html` in a browser. No server, build step, network or install is needed (all data is inline in `js/main.js`; query strings are used for filter state and work from `file://`). JavaScript is required for menus, filters and forms.

## Sitemap and page-to-source mapping

| Local page | Reference page (path on chop.edu) |
| --- | --- |
| `index.html` | `/` Welcome |
| `doctors.html` | `/doctors` Find a Doctor |
| `doctor-search.html` | `/doctors/search?filter=...` Doctor Search |
| `provider.html` (`?id=`) | `/doctors/dori-yoav` provider profile |
| `locations.html` | `/locations` |
| `emergency-care.html` | `/emergency-care-locations` Emergency Care for Kids |
| `specialties.html` | `/specialties` Search specialties |
| `conditions.html` | `/conditions-diseases` Search conditions |
| `condition-asthma.html` | `/conditions-diseases/asthma` |
| `get-care.html` | `/get-care` |
| `appointment-scheduling.html` | `/appointment-scheduling` |
| `patients-and-families.html` | `/patients-and-families` (plus medical-records and inpatient-stay topics as sections) |
| `billing-and-insurance.html` | `/billing-and-insurance` (plus accepted-insurance and cost-estimate topics as sections) |
| `online-bill-pay.html` | `/billing-and-insurance/online-bill-pay` (demo) |
| `portal-login.html` | MyCHOP portal link (external in the reference); **intentional addition**: local labeled demo |
| `404.html` | none (required by RULES.md) |

15 content pages + `404.html` = 16 HTML pages. Total deliverable files: 26 (as counted by `qc.js`).

## Feature checklist

- Global notice bar (dismissible), utility links, header with Get Care mega-menu, two dropdowns, two plain links, mobile menu disclosure (`aria-expanded`, Escape).
- Home: hidden h1, hero, tabbed finder (doctor / location / specialty), care-option cards, sample-figures band, emergency notice.
- Doctor search: keyword, specialty, location, language, accepting-new-patients, video-visit filters; sort; live result count; Show more (6 per page); empty state; reset; URL-synced state.
- Provider profile rendered from `?id=` with a not-found state and an appointment link that prefills the form.
- Location finder: text + type filter, empty state, map placeholder image. Emergency page reuses the list preset to emergency sites.
- Specialties / conditions: text search plus A-Z letter buttons, empty state, prefill from `?q=`.
- Asthma condition page with FAQ accordion; Get Care page with comparison table; Patients & Families with on-page nav and accordion; Billing page with plan filter and accordion.
- Forms (appointment, bill pay, portal sign-in): labeled fields, hints, inline errors, error summary with links, focus moved to summary or demo-success message.
- Language-assistance dialog in the footer (native `<dialog>`).

Sample data counts: 14 doctors (four specialties have no doctors, to exercise the empty state), 9 locations, 16 specialties, 20 conditions, 8 insurance plans.

## Simulation notes

- Appointment request, online bill pay and portal sign-in are **demos**: validation runs in the browser, nothing is sent, stored or looked up, and each shows a demo-success message saying so.
- Hours are labeled "(sample)"; no live wait times, alerts or availability are shown.
- Filter state is kept in the query string via `history.replaceState`.

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-03` run on 2026-11-11 (UTC): `pages=16 files=26 failures=0 warnings=0`. It checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA + best-practice tags) at 1280px and 375px, and horizontal scroll at 375px. Additionally a scripted Playwright run (Chromium, scratch script not delivered) passed 41 of 41 flow checks.

| Gate | Result | Basis |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files/libraries, no remote assets, no fetch/XHR |
| 14 Completeness | pass | qc.js: all required files present, 0 broken links or assets |
| 15 Structure | pass (approximate fidelity) | qc.js landmark/metadata checks; region order mirrors source notes, not compared visually |
| 16 Interaction | pass | 41 scripted flow checks (menus, Escape, tabs, dialog, filters, empty states, paging, profile, directories, three forms, mobile menu) |
| 17 Accessibility | partial | axe 0 violations at 1280 and 375; no horizontal scroll at 375; the checks below were not run |
| 18 Traceability | pass | docs written from implemented files; source facts come from the Phase A research file only |
| 19 Scope | pass | no frameworks, 15 pages, small sample data |

Tested by script: first Tab stop is the skip link; Escape behaviour for menus, mobile menu and dialog; tab arrow keys; focus moves to the error summary and to the demo-success message; summary links focus fields.

**Not tested:** screen readers (NVDA, JAWS, VoiceOver, TalkBack); 200% / 400% zoom and text-spacing overrides; a full human keyboard walkthrough of every page; contrast beyond what axe computes; Firefox and Safari; real touch devices; forced-colors mode; reduced-motion behaviour (CSS rule present, not exercised); print styles. No claim of WCAG conformance is made; this is a WCAG 2.2 AA-oriented baseline.

## Known limitations

- Menus, filters and forms need JavaScript; with JS disabled, the mobile menu is not reachable below 61rem and filter pages show no results.
- Sparse reference observations: Phase A did not read the rendered `/doctors` filter facets, so the filter set is inferred (see `fidelity-notes.md`).
- Several reference items are omitted (symptom checker, second opinion, healthcare-professionals pages, newsletter, research/careers/donate links, translated pages).
- Condition and specialty entries other than asthma have no detail page; they link to a prefiltered doctor search.
