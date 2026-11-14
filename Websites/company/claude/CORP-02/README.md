# CORP-02: Harborlight Community Credit Union (fictional)

- Replica ID: CORP-02, category `company`, stratum regional bank or credit union, slot 2, model group claude
- Fictional branding: Harborlight Community Credit Union (member-owned cooperative). Invented names: Meridian Card Network (card network), LinkLoop (shared ATM network), QuickLark Pay (payment app), Lantern App, Tidewater Neighbors Association, Fictional Deposit Safety Board (regulator). All fictional. The site claims no real deposit insurance or regulatory status.
- Approved source: https://www.dcu.org/, verified 2026-11-10 by HTTP GET with curl (200 on home and 14 interior pages), approved by the project lead 2026-11-13. Research block: `Websites/pipelines/claude/research/CORP.md`. The reference was not re-fetched in this run.
- Run locally: open `index.html` in a browser. No server, build or network needed (inline JS data, no fetch).

## Sitemap and source mapping
15 HTML files: index, checking, savings, certificates, auto-loans, mortgages, credit-cards, rates, support, branches, membership, education, contact, accessibility, 404. See `fidelity-notes.md` for the page-by-page source mapping.

## Features
Dropdown navigation with aria-expanded and Escape, mobile menu disclosure, site search over an inline index, sign-in and pay-loan demo dialogs (non-functional), tabbed rate tables plus select, dividend calculator, loan calculator, searchable FAQ accordion, branch/ATM locator (filters, sort, empty state), membership eligibility check and join demo (simulation, no identity data), education filter, contact form with error summary, 404.

## Sample data
18 locations, 16 FAQ entries, 10 article summaries, 5 rate tables (22 rate rows), 14 search-index entries. All figures are fictional; every rate and calculator page carries a visible sample-data notice. Phones use 555 exchanges; addresses are invented.

## Intentional additions
Loan calculator, locator filters, FAQ search, education filter, eligibility check and join demo.

## QC (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/company/claude/CORP-02` and a scripted Playwright flow (29 checks) run from a scratch directory outside the repo.
- Technology: pass (qc.js static checks, no remote requests, no libraries; also grepped)
- Completeness: pass (qc.js: required files, links, assets resolve; 15 pages)
- Structure: pass (landmarks and data-section/data-component present on every page; qc.js)
- Interaction: pass (scripted flow: menus, Escape, search plus empty state, login dialog, locator plus empty state, FAQ plus empty state, calculators incl. invalid input, tabs, eligibility and join, education empty state, contact errors, mobile menu)
- Accessibility: partial (axe rules at 1280 and 375 via qc.js, no horizontal scroll at 375, scripted keyboard checks only)
- Traceability: pass (inventory generated from the delivered HTML; pages are real filenames) with manual review
- Scope: pass by manual review

Not tested: screen readers, voice control, real-user testing, zoom/text-spacing at 200-400 percent beyond the 375px reflow check, contrast beyond axe's automated rules, Safari/Firefox, forced-colors mode. No WCAG conformance is claimed.

## Known limitations
No real accounts, applications, payments or maps. Breadcrumb section labels are plain text. Rate tables are far fewer than the reference. Inline errors clear on blur and can shift layout.
