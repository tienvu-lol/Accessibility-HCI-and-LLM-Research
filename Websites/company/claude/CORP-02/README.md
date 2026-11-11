# CORP-02 - Fernhollow Credit Union (fictional replica)

- **Replica ID:** CORP-02 (slot 2, category `company`, stratum: regional bank or credit union, model group `claude`)
- **Fictional branding:** Fernhollow Credit Union. All copy, rates, locations, phone numbers and logos are invented; nothing here is a real financial service.
- **Approved source URL:** https://www.dcu.org/ (Digital Federal Credit Union; used for structure only)
- **Source verification:** 2026-11-10, HTTP GET via curl by the Phase A researcher; 200 on the home page and all 14 interior pages (record in `Websites/pipelines/claude/research/CORP.md`). I did not re-fetch the reference in this run.
- **Approval:** the project lead waived the Phase A approval stop and approved the reference (`source_approved_at` 2026-11-10).
- **Model/provenance:** see `generation-metadata.json` (claude-sonnet-5-5, autonomous run, no human edits).

## Run it

Open `index.html` in a browser (works from `file://`). No server, build step, network or dependencies are needed. All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping

| Local page | Reference page |
| --- | --- |
| `index.html` | `/` |
| `checking.html` | `/bank/checking.html` |
| `savings.html` | `/bank/savings.html` |
| `certificates.html` | `/bank/certificates.html` |
| `auto-loans.html` | `/borrow/vehicle-loans/auto-loans.html` |
| `mortgage.html` | `/borrow/mortgage-loans/home-mortgage-loans.html` |
| `credit-cards.html` | `/borrow/credit-cards.html` |
| `rates.html` | `/about/rates.html` |
| `support.html` | `/dcu-support-center.html` |
| `branches.html` | `/dcu-support-center/branches-atms.html` |
| `membership.html` | `/membership/become-a-member.html` |
| `education.html` | `/financial-education-center.html` |
| `careers.html` | `/careers.html` |
| `contact.html` | `/contact.html` |
| `accessibility.html` | `/dcu-support-center/privacy-practices/accessibility.html` |
| `404.html` | none (required by the protocol) |

15 mapped pages plus the 404 page (16 HTML files). Also: `css/styles.css`, `js/main.js`, 14 SVGs in `assets/`, and the four documentation/metadata files.

## Feature checklist

- [x] Header with utility bar, log in panel (demo), Pay my loan (demo), site search over the local page index
- [x] Primary navigation with four dropdown groups and a mobile Menu disclosure; Escape closes menus
- [x] Home page bands in the reference order, quick links
- [x] Rates page with tabs (arrow keys, Home, End) and a row-order select
- [x] Savings dividend calculator, auto and mortgage payment estimators (validated, live-region result)
- [x] Support center search with category filter and accordion answers (12 answers, empty state)
- [x] Branch/ATM finder: text, type and Saturday filters over 10 fictional locations, empty state
- [x] Education article search and topic filter (9 articles); careers search and three filters (8 openings)
- [x] Membership eligibility checker and demo request form; contact form; inline errors, error summary, focus management, demo success status
- [x] Skip link, landmarks, `data-section`/`data-component` instrumentation, reduced-motion CSS, 404 page

## Simulation notes

Log in, Forgot username or password, Pay my loan, Membership application status, Schedule an appointment, Get the app and job Apply open a modal dialog saying it is a demo. The login form, membership request and contact form validate in the browser, then show a "Demo only" success message; nothing is stored or sent. Calculators are labeled estimates. No map is shown for the locator.

## QC gates (Rules.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/company/claude/CORP-02` on 2026-11-11 (UTC): `pages=16 files=36 failures=0 warnings=0`. Interaction flows were run with a separate throwaway Playwright script (35 checks, all passed): skip link first in tab order; dropdown open and Escape; login errors and demo success; dialog open and Escape; site search hit and empty state; FAQ filter, empty state, topic button and accordion; branch ZIP/type/empty filters; job and article filters; rates tab arrow keys and sort; calculator result and validation error; contact error summary, link focus and demo success; ZIP pattern error; eligibility result; 375px mobile menu and submenu with Escape.

| Gate | Result | Basis |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files, no remote requests; no fetch/XHR in `main.js` |
| 14 Completeness | pass | qc.js: required files present, JSON valid, 0 broken links/assets |
| 15 Structure | pass | qc.js: landmarks, skip link, `main#main-content`, metadata attributes on every page; section order compared with the Phase A inventory only |
| 16 Interaction | pass | scripted flows above; controls work on local data or are labeled demos |
| 17 Accessibility | partial | axe-core (WCAG 2.0 to 2.2 A/AA + best-practice) at 1280 and 375 with 0 violations, no horizontal scroll at 375; the rest is not tested (below) |
| 18 Traceability | pass | page list, counts and component inventory checked against the files by the author; reference facts limited to the Phase A inventory |
| 19 Scope | pass | 15 pages, small datasets; additions are labeled |

## Not tested

Screen readers (NVDA, JAWS, VoiceOver), 200% and 400% zoom or text-spacing overrides, a full manual keyboard walkthrough of every page, other browsers (only the Chromium headless shell was used), real touch devices, axe in the open states of the login panel, search results and dropdowns, color-blind simulation, and any comparison against the live reference at runtime. **No WCAG conformance is claimed**; this is a baseline built toward WCAG 2.2 AA.

## Known limitations

- Lists (FAQ, branches, articles, jobs) render from JavaScript; without JS they are empty.
- Nav differs slightly from the reference (see `fidelity-notes.md`); reference footer groups, calculators and locator internals were never observed.
- Dropdowns open on click, not hover.
- Datasets are tiny by design; rates are round fictional numbers.
