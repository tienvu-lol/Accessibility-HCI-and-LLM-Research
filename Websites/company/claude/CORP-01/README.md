# CORP-01 - Harborline Bank (fictional) replica

| Field | Value |
| --- | --- |
| Replica ID | CORP-01 (category `company`, slot 1, stratum: national retail bank) |
| Model group / model | claude / `claude-sonnet-5-5` (see `generation-metadata.json`) |
| Fictional branding | **Harborline Bank** (invented name, wordmark and SVG mark; not a real institution) |
| Approved source URL | https://www.usbank.com/ (personal banking; redirects to `/index.html`) |
| Source verification | 2026-11-10, HTTP GET via curl (`-sSL -A "Mozilla/5.0"`): 200 on the home page and 12 of 13 interior URLs; recorded in `Websites/pipelines/claude/research/CORP.md`. Not re-fetched during generation. |
| Source approval | 2026-11-10. **The project lead waived the Phase A approval stop** and approved this reference directly. |
| Protocol | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 at commit a07e70e (branch websites/claude-replicas) |

This is a static, reference-inspired replica for an accessibility/usability research dataset. It is **not** a pixel-perfect copy, makes no claim of WCAG conformance, and the bank, rates, fees, phone numbers and locations are invented. Nothing is stored or sent anywhere.

## Run locally

Open `index.html` in any modern browser (works from `file://`; no server, build step or network needed). All data is inline in `js/main.js`.

## Sitemap (15 pages + 404)

| File | Page | Reference page it maps to |
| --- | --- | --- |
| `index.html` | Home | `/` Personal Banking |
| `checking.html` | Checking accounts | `/bank-accounts/checking-accounts.html` |
| `savings.html` | Savings accounts (incl. money market) | `/bank-accounts/savings-accounts.html` |
| `cds.html` | CD rates + earnings calculator | `.../savings-accounts/certificate-of-deposit.html` |
| `credit-cards.html` | Credit card finder | `/credit-cards.html` |
| `mortgage.html` | Mortgage overview, refinance, home equity | `/home-loans/mortgage.html` |
| `mortgage-rates.html` | Sample mortgage rate lookup | `.../mortgage/mortgage-rates.html` |
| `mortgage-calculator.html` | 3 mortgage calculators (tabs) | `.../mortgage/mortgage-calculators.html` |
| `personal-loan-calculator.html` | Personal loan calculator, debt consolidation | `.../personal-loan-calculator.html` |
| `customer-service.html` | Help search, contact form, security, legal | `/customer-service.html` |
| `online-banking.html` | Mobile & online banking, enrollment demo | `/online-mobile-banking.html` |
| `login.html` | Log in (demo) | header "Log in" link |
| `accessibility.html` | Accessibility banking services | `/about-us-bank/accessibility.html` |
| `financial-education.html` | Guides with search/filter | `/financial-education.html` |
| `locations.html` | Branch & ATM locator | `/locations/search/` (link only; never fetched) |
| `404.html` | Not found | required by RULES.md |

Other files: `css/styles.css`, `js/main.js`, `assets/*.svg` (5 placeholders), `component-inventory.json`, `generation-metadata.json`, `fidelity-notes.md`. Total 27 files in this folder.

## Feature checklist

- [x] Header with utility links, brand, Log in, mobile Menu button, six-group mega-menu (desktop panels, mobile accordions), header search
- [x] Breadcrumbs on interior pages, footer with grouped links, skip link, `lang`, `main#main-content`
- [x] CD rate table with 3 selects and live count; CD earnings calculator
- [x] Credit card filter/sort/no-fee with empty state and reset; `?cat=` deep links
- [x] Mortgage payment (with yearly amortization), 15-vs-30 and affordability calculators in ARIA tabs; sample rate form with ZIP validation and cross-field check
- [x] Personal loan calculator
- [x] Help search with chips, category filter, accordion answers, empty state, `?q=` from header search
- [x] Branch/ATM locator: text search, type select, feature checkboxes, empty state, reset
- [x] Guides search/filter with `?topic=` deep links
- [x] Forms (contact, enroll, login, calculators): labels, inline errors, error summary, focus management, demo success
- [x] Demo `<dialog>` for Apply/Open buttons (Escape closes, focus returns)
- [x] Reduced-motion rule, responsive reflow, visible focus styles

## Sample data counts

7 credit cards, 9 CD terms x 3 deposit tiers, 12 branch/ATM records, 10 guide summaries, 14 help answers, 3 mortgage calculators.

## Simulation notes

- **Log in, enrollment, contact, Apply/Open buttons, mortgage/loan "applications":** demonstrations. Each says so on screen; no network request, storage or authentication happens. Do not enter real credentials.
- **Rates and calculators:** original formulas on invented numbers; labeled illustrations, not offers.
- **Locator:** invented addresses and hours (labeled sample); no live data or map (placeholder SVG).

## Intentional additions (not observed on the reference)

CD earnings calculator, credit-card filters, help-message form, guide search/filter, locator filters. See `fidelity-notes.md`.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/company/claude/CORP-01` on 2026-11-11 (final run, summary line `pages=16 files=27 failures=0 warnings=0`): **failures=0**. It checks required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA and best-practice rules) at 1280px and 375px, and horizontal scroll. Output was kept outside the repo.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files, no remote requests; hand-written HTML/CSS/vanilla JS, no build step in the deliverable (the pages were emitted by a throwaway generator script kept outside the repo) |
| 14 Completeness | pass | qc.js required files and link/asset audit, 0 failures; sitemap above matches files |
| 15 Structure | pass (partial) | landmarks, skip link, `data-section`/`data-component` on every page via qc.js; regions follow the Phase A inventory only, reference not re-inspected |
| 16 Interaction | pass (scripted) | headless Chromium script (Playwright, run outside the repo): desktop mega open/Escape/focus return, tabs with arrow keys, global search to help results, FAQ accordion, help empty state, contact/login/enroll error summary + focus + demo success, cards filter/empty/reset/`?cat=`, dialog open/Escape/focus return, locator search/empty/filter, article filter/empty, CD filter/sort/calculator, mortgage (3 calculators, down>=price error), rates ZIP error, loan range error, mobile menu + Escape, no console errors: 46 checks, 0 failed |
| 17 Accessibility | partial | qc.js axe-core clean at 1280px and 375px (0 violations reported); no horizontal scroll at 375px. Labels, heading order, alt text, focus visibility and reduced-motion are implemented but only axe and the scripted checks above were run |
| 18 Traceability | pass (self-reviewed) | README, fidelity notes and inventory regenerated from the delivered files; source claims limited to the Phase A inventory |
| 19 Scope | pass (self-reviewed) | 15 pages, small inline datasets, additions listed |

### Not tested

Screen readers (NVDA, JAWS, VoiceOver, TalkBack); a manual keyboard-only walkthrough by a person; 200%/400% zoom and text-spacing overrides; Firefox and Safari; real mobile devices; forced-colors/high-contrast mode; manual contrast measurement beyond axe; voice control; visual comparison against the live reference. WCAG 2.2 criteria that axe cannot automate (e.g. 2.4.11 focus not obscured, 3.3.7 redundant entry) were not audited. **No claim of WCAG conformance is made.**

## Known limitations

- The reference's real mega-menu is a multi-level drill-down with far more links; this replica flattens it to six groups.
- Only three of the six observed mortgage calculators exist; article bodies and the Business/Corporate audiences do not exist.
- Locator behavior is inferred (reference locator page was not fetched).
- Reference visuals were not inspected; all styling is original.
- The pages use the native `<dialog>` element, which needs a current browser.
