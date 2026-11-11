# HOSP-01: Harborlight Health (fictional)

| Field | Value |
| --- | --- |
| Replica ID | HOSP-01 (slot 1) |
| Category / stratum | healthcare / large academic medical center |
| Fictional brand | Harborlight Health ("Fictional academic medical center") |
| Approved source URL | https://www.ucsfhealth.org/ |
| Source verification | 2026-11-10 (06:20Z), HTTP GET with curl, status 200, title "Ranked #1 in CA and Among the Best Hospitals in the Nation \| UCSF Health". Recorded in `Websites/pipelines/claude/research/HOSP.md`; this run did not re-fetch the source. |
| Source approval | 2026-11-10. The project lead **waived the Phase A approval stop** and approved this reference. |
| Model group / model | claude / claude-sonnet-5-5 (see `generation-metadata.json`) |

The reference is used for information architecture, layout patterns and interaction patterns only. All names, copy, doctors, places, phone numbers and prices are invented. No real logo, seal, photo or text was copied. This is not a pixel-accurate copy and makes no compliance claim.

## Run locally

Open `index.html` in a browser (works from `file://`). No server, build step, network access or install is needed. All data is inline in `js/main.js`.

The HTML pages were produced by a one-off generator script kept outside this folder (not shipped) so that header and footer markup is identical on every page. The delivered site contains only static HTML, one CSS file and one JS file.

## Sitemap and page-to-source mapping

| Local page | Reference page (path on source) | Notes |
| --- | --- | --- |
| `index.html` | `/` | Hero search, "Great care starts here", specialties, doctors, stories carousel, news, locations, "I want to..." |
| `find-a-doctor.html` | `/providers` | Typeahead and filters are replica-built (reference results were not visible in static HTML) |
| `provider.html?id=p01` ... `p13` | `/providers/<letter>` (inferred) | Profile pattern is inferred, not verified |
| `locations.html` | `/locations` | Filters inferred |
| `medical-services.html` | `/medical-services` | A-Z filter is an intentional addition |
| `care.html` | `/care` | Conditions / Treatments / Medical Tests; tab UI is an approximation of the generic search pages |
| `emergency-department.html` | `/care/services/emergency-department` | |
| `cancer-care.html` | `/care/services/cancer` | |
| `patients-visitors.html` | `/patients-visitors` | Also hosts Virtual Visits, Second Opinion and Refer a patient sections (nav items on the source) |
| `request-appointment.html` | `/patients-visitors/appointments` | Simulated form; fields inferred |
| `billing-insurance.html` | `/patients-visitors/billing-insurance` | Insurance checker is an intentional addition |
| `help-paying-your-bill.html` | `/patients-visitors/billing-insurance/help-paying-your-bill` | Estimator is an intentional addition |
| `your-hospital-stay.html` | `/patients-visitors/your-hospital-stay` | Packing checklist is an intentional addition |
| `mychart.html` | `/mychart` | Non-functional demo, labeled as such |
| `about.html` | `/about` | Anchor sections cover footer targets (leadership, quality, accessibility, careers, giving and others) |
| `404.html` | (reference 404 pages exist; not replicated) | Recovery links to home, doctors, locations and emergency info |

15 content pages plus `404.html` (16 HTML files). `provider.html` is one template filled from the `id` query parameter.

## Feature checklist

- Header with emergency notice, utility links, search disclosure, primary navigation with a Care dropdown, mobile menu disclosure, `aria-current`.
- Footer with collapsible link groups (open on desktop, collapsed on mobile) and back-to-top.
- Home hero typeahead (combobox), carousel with previous/next and pause/play (autoplay off under `prefers-reduced-motion`).
- Find a doctor: typeahead, specialty/location/language filters, new-patients and video checkboxes, sort, reset, result count, empty state, query-string prefill.
- Provider profile, locations finder, services A-Z filter, conditions/treatments/tests tabs with filter.
- Accordions, native modal dialog, packing checklist.
- Forms (appointment request, insurance check, assistance estimator, portal login) with labels, inline errors, error summary, focus management and clearly labeled demo results.
- Instrumentation: `data-section` / `data-component` on regions and components (see `component-inventory.json`).

## Interaction simulation notes

- Appointment request, portal login, bill-pay and assistance estimator are **simulations**. Nothing is sent, stored or authenticated; reference numbers start with `DEMO-`.
- Insurance plans and assistance thresholds are invented.
- No wait times, availability or other live status are shown.
- Maps are an SVG placeholder, not a real map. Phone numbers use the 555-01xx range.

## Sample data counts (inline in `js/main.js`)

13 doctors, 7 locations, 13 services, 10 conditions, 5 treatments, 4 tests, 5 insurance plans.

## Files

15 content pages + `404.html`, `css/styles.css`, `js/main.js`, 8 SVG files in `assets/`, `README.md`, `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json` (30 files total).

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-01`, 2026-11-11 (UTC), pages=16, failures=0, warnings=0. It covers required files, JSON validity, broken links and assets, prohibited tech, remote requests, JS errors, landmarks / skip link / metadata, axe-core (WCAG 2.0-2.2 A/AA + best-practice) at 1280 px and 375 px, and horizontal scroll at 375 px.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited file types or libraries, no remote requests; no build step. Author review of the code. |
| 14 Completeness | pass | qc.js: all required files present, no broken links or assets across 16 pages. |
| 15 Structure | pass (partial) | qc.js: `main#main-content`, skip link, `lang`, instrumentation on every page. Region order was compared with the research notes only, not with the live site. |
| 16 Interaction | pass (scripted) | A Playwright script (not shipped) exercised: skip link, Care dropdown and Escape, search panel, typeahead, carousel, doctor filters/empty state/prefill, profile not-found, locations, A-Z, tabs, accordion, appointment validation and demo success, insurance checker, assistance estimator, checklist, dialog Escape and focus return, login demo, mobile menu, mobile footer groups; no JS errors. |
| 17 Accessibility | partial | Automated axe-core (0 violations at 1280 px and 375 px per qc.js) and scripted keyboard checks of the flows above. Contrast, heading order and labels were only checked by axe. Not a conformance claim. |
| 18 Traceability | pass | Component inventory is generated from the delivered HTML; page mapping above matches the files. |
| 19 Scope | pass | 15 pages, small sample datasets, no extra tooling. Additions are labeled in `fidelity-notes.md`. |

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack).
- 200% / 400% zoom and text-spacing overrides (only 375 px width was checked).
- A full manual keyboard walkthrough of every page (only the scripted flows listed above).
- Windows high-contrast / forced-colors mode, dark mode.
- Firefox and Safari (only the QC tool's Chromium).
- Live-site side-by-side comparison; visual fidelity is approximate.
- Touch target size beyond the 44 px minimum set in CSS; speech input.

## Known limitations

- Doctor profiles depend on the `id` query parameter (works from `file://`).
- Filters on doctor search apply on change or Search; typing alone updates only the suggestions.
- No printing styles, no persistence between pages.
- The carousel autoplays (8 s) when reduced motion is not requested; it pauses while focus is inside and has a Pause button.
