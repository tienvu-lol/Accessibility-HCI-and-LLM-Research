# HOSP-01 - Meridian Bay Health (fictional)

- **Replica ID:** HOSP-01 (slot 1, category `healthcare`, stratum: large academic medical center, model group `claude`)
- **Fictional branding:** "Meridian Bay Health" - an invented academic medical center. Logo and all graphics are original local SVG placeholders. All doctors, addresses and organizations are invented; every phone number uses a 555 exchange. Any resemblance to real people or places is coincidental. This is not a real hospital and contains no medical advice.
- **Approved source (research metadata only):** UCSF Health, https://www.ucsfhealth.org/ - verified 2026-11-10 by HTTP GET via curl (home page returned 200); approved by the project lead 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). Complexity: high.
- **Model/provenance:** claude-sonnet-5-5, Claude Code Agent tool subagent. See `generation-metadata.json`.

## Run locally
Open `index.html` directly in a browser (works from `file://`). No server, build step, network access or library is needed. All data is inline in `js/main.js`.

## Sitemap (16 HTML files: 15 content pages + 404)
| Local page | Reference page (ucsfhealth.org) | Notes |
|---|---|---|
| `index.html` | `/` | Hero + search, "Great care starts here", specialties, doctors, story carousel, news cards, locations, "I want to..." |
| `find-a-doctor.html` | `/providers` | Typeahead + filters over 30 invented providers |
| `provider.html?id=pNN` | `/providers/<...>` (inferred, never fetched) | Profile template, inferred |
| `locations.html` | `/locations` | 12 invented locations; text + type/service/ED filters |
| `medical-services.html` | `/medical-services` | A-Z index + filter over 26 service lines |
| `care.html` | `/care` | Searchable list of 24 care-area names (names only) |
| `emergency-department.html` | `/care/services/emergency-department` | Emergency notice, brochure-level info |
| `cancer-care.html` | `/care/services/cancer` | Brochure-level overview |
| `patients-visitors.html` | `/patients-visitors` | Hub cards + visiting accordion |
| `appointments.html` | `/patients-visitors/appointments` | Simulated request form (inferred form fields) |
| `billing-insurance.html` | `/patients-visitors/billing-insurance` | Accordion + plan search (plan search is an intentional addition) |
| `help-paying-your-bill.html` | `/patients-visitors/billing-insurance/help-paying-your-bill` | Placeholder text |
| `your-hospital-stay.html` | `/patients-visitors/your-hospital-stay` | Accordion |
| `patient-portal.html` | patient portal page listed in the research block (a third-party vendor product, not named here) | Fictional in-house portal "BayPortal"; non-functional login demo in a modal dialog |
| `about.html` | `/about` | Invented statistics, mission |
| `404.html` | n/a | Route back to home, finder, locations |

## Sample data counts
30 providers, 12 locations, 26 service lines, 24 care-area entries, 14 insurance plan names, 3 carousel stories. Enough to exercise multi-filter combinations, "show more" paging (10 per page), empty states and typeahead.

## Feature checklist
- [x] Mega-style header: utility links, primary nav, Care dropdown (disclosure button, `aria-expanded`), mobile menu button
- [x] Skip link, landmarks, one h1 per page, breadcrumbs on interior pages
- [x] Typeahead search (home hero and find-a-doctor), arrow keys / Enter / Escape
- [x] Find-a-doctor filters (specialty, location, language, gender, accepting new patients, virtual visits), sort, show more, empty state, live result announcements
- [x] Provider profile with not-found state
- [x] Locations finder with empty state
- [x] A-Z services index, care search, plan search
- [x] Appointment request (simulated): labels, inline errors, error summary, focus management, demo success
- [x] BayPortal (fictional portal name) login: clearly labeled non-functional demo in a native `<dialog>`
- [x] Emergency notice (call local emergency services; no medical instructions) - an intentional addition site-wide in the header (the reference has an ED service page only)
- [x] Story carousel with previous/next/pause; autoplay is off under `prefers-reduced-motion`
- [x] Footer groups collapse into disclosure buttons below 700px

## Interaction simulation notes
No data is sent anywhere. The appointment and login forms only validate and show a "demo" success. Search uses invented data; the reference's real result data was never observed (it is not present in the static HTML). Availability flags such as "accepting new patients" are invented.

## QC (run 2026-11-13)
Command: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-01` -> `pages=16 files=28 failures=0 warnings=0` (static checks, JS console errors, remote requests, axe-core WCAG 2.0-2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll at 375px). Output was captured outside the repo.

Additionally, a scripted Playwright (Chromium) flow check passed 38/38 assertions: skip link first in tab order; Care dropdown open/Tab/Escape with focus return; typeahead keyboard selection; finder filters, empty state, reset, show-more, profile and not-found; locations, services, care, plan filters and empty states; accordion; appointment validation (6 inline errors + summary focus, link-to-field focus, format errors, demo success); portal dialog open/validate/Escape/focus return/success; carousel next/pause; mobile menu and footer disclosure at 375px.

### Rules.md section 9 gates
| Gate | Status | Evidence |
|---|---|---|
| 13 Technology | pass | qc.js: no prohibited file types, no remote requests, no fetch; hand-reviewed: vanilla HTML/CSS/JS only |
| 14 Completeness | pass | qc.js: all required files present, no broken links/assets; 15 mapped pages + 404 |
| 15 Structure | partial | Landmarks and data-section/data-component present on every page; section order mirrors the research block, but the reference's rendered page was not compared visually |
| 16 Interaction | pass | Playwright flow check above; forms disclose simulation |
| 17 Accessibility | partial | axe-core automated rules only at two widths plus scripted keyboard/focus checks; no manual audit |
| 18 Traceability | pass | Docs written against the delivered files; unverified items are listed in fidelity-notes.md |
| 19 Scope | pass | Additions (emergency bar, plan search, carousel) are labeled; 15 pages |

### Not tested
Screen readers (NVDA, JAWS, VoiceOver); 200% and 400% zoom / text resizing; a full manual keyboard walkthrough by a person; forced-colors / high-contrast mode; non-Chromium browsers; real touch devices; color-contrast beyond axe's automated check; any visual comparison to the live reference. This is a WCAG 2.2 AA-oriented baseline, not a claim of conformance.

## Known limitations
- No map on the locations page; no site-wide search page, Virtual Visits, Second Opinion, Clinical trials, Refer a patient, News, Leadership, or other reference pages (pruned, see fidelity-notes.md).
- Provider profile is a template driven by `?id=`; the reference profile was never fetched.
- News cards are non-linked sample headlines.
- Carousel autoplay (8s) is on by default unless reduced motion is requested; a pause button is provided.
