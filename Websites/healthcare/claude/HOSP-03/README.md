# HOSP-03 - Larkspur Children's Hospital (fictional replica)

- **Replica ID:** HOSP-03 (slot 3, model group claude)
- **Category / stratum:** healthcare / children's hospital
- **Fictional brand:** Larkspur Children's Hospital (invented; not a real organization)
- **Approved source (research metadata only):** Children's Hospital of Philadelphia, https://www.chop.edu/
- **Source verification:** 2026-11-10, HTTP GET via curl (see `Websites/pipelines/claude/research/HOSP.md`). Approved 2026-11-13. Not re-fetched during this build.
- **Protocol:** WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0

## Run locally
Open `index.html` in a browser (works from `file://`). No server, build step, network or library. Vanilla HTML, one CSS file, one JS file; all data is inline in `js/main.js`.

## Sitemap and source mapping
| Local page | Reference page |
|---|---|
| `index.html` | `/` |
| `find-a-doctor.html` | `/doctors` |
| `doctor-search.html` | `/doctors/search?filter=...` |
| `doctor-profile.html` (`?id=d01`..`d24`) | `/doctors/dori-yoav` |
| `locations.html` | `/locations` |
| `emergency-care.html` | `/emergency-care-locations` |
| `specialties.html` | `/specialties` |
| `conditions.html` | `/conditions-diseases` |
| `condition-detail.html` | `/conditions-diseases/asthma` (no clinical content) |
| `get-care.html` | `/get-care` |
| `appointments.html` | `/appointment-scheduling` |
| `patients-families.html` | `/patients-and-families` |
| `billing-insurance.html` | `/billing-and-insurance` |
| `online-bill-pay.html` | `/billing-and-insurance/online-bill-pay` |
| `404.html` | n/a (required) |

14 content pages + 404. Details and pruned navigation: `fidelity-notes.md`.

## Features
- Mega-menu navigation (Get care, Patients & families, Billing & insurance) with `aria-expanded`, Escape to close, mobile menu disclosure.
- Find-a-doctor search with facets (name/keyword, specialty, location, language, accepting new patients, sort), URL-parameter prefill, result count in a live region, empty state with "Clear all filters". **The reference's real facets and result data were not observed; these are invented.**
- Provider profile rendered from inline data (with not-found state).
- Locations finder (type and text filter), emergency page with notice, specialties and conditions searches with empty states.
- Simulated appointment request form: labels, required/format validation, error summary with focus management, inline errors, demo success state.
- Simulated bill-pay form; patient-portal sign-in as a clearly labeled non-functional demo dialog; demo newsletter form.
- Instrumentation with `data-section` / `data-component` on regions and component instances.

## Sample data
24 providers, 10 locations, 14 specialties, 16 condition topic names (all invented; phone numbers use 555 exchanges; no clinical guidance).

## Simulation notes
Nothing is submitted, stored or sent. The portal, appointment, bill-pay and newsletter forms end in a "demo" message. No live availability, wait times or directory data exist.

## QC (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-03` run on 2026-11-13 reported `pages=15 files=27 failures=0 warnings=0` (see the final run recorded in `generation-metadata.json` timestamps; output was kept outside the repo). A separate scripted Playwright (Chromium) flow script, kept outside the repo, passed 26 checks.

| Gate | Result | Evidence / caveat |
|---|---|---|
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks; no frameworks, CDNs, fonts, fetch |
| 14 Completeness | pass | all 14 mapped pages + 404 + required artifacts present; qc.js found no broken links/assets |
| 15 Structure | partial | landmarks, skip link, metadata checked by qc.js; match to the reference's hierarchy is from the research block only, not a live comparison |
| 16 Interaction | pass | scripted flows: mega-menu open/Escape, portal dialog open/validate/Escape/focus return, doctor search prefilter, combined filters, empty state, clear, profile and not-found, locations/emergency lists, appointment errors + summary focus + success, bill-pay validation, mobile menu |
| 17 Accessibility | partial | axe-core (WCAG 2.0-2.2 A/AA + best practice) at 1280px and 375px with zero violations, and no horizontal scroll at 375px; this is automated evidence only |
| 18 Traceability | pass | documents written against the implemented files; reference facets stated as unobserved |
| 19 Scope | pass | no speculative screens; additions are labeled in fidelity-notes.md |

### Not tested
Screen readers (NVDA, JAWS, VoiceOver); a full manual keyboard walkthrough of every page (only the scripted flows above); 200% and 400% zoom and text-spacing overrides; forced-colors / high-contrast mode; reduced-motion behaviour beyond the CSS rule existing; non-Chromium browsers; touch devices; manual contrast review beyond axe; the accordion and newsletter interactions by script.

**This is a WCAG 2.2 AA-oriented baseline, not a conformance claim.**

## Known limitations
- Doctor, location and condition data are tiny invented samples.
- Search and profile pages rely on JavaScript (noscript notes shown).
- Query-string parameters on `file://` URLs work in current Chromium; other browsers not tested.
- Several reference nav targets are pruned (see fidelity-notes.md).
