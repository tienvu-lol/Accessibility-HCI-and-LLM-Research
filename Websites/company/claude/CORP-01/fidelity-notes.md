# Fidelity notes - CORP-01 (Corvane Bank, fictional)

Source: https://www.usbank.com/ (personal banking), verified 2026-11-10 by curl GET (static HTML only), approved 2026-11-13. Only the research block in `Websites/pipelines/claude/research/CORP.md` was used for structure; no reference markup or copy was copied.

## Page and component mapping
| Local | Status | Notes |
| --- | --- | --- |
| index.html | approximated | Hero, then bands following the observed h2 order: choose checking, personal loans, insights, solutions, "banking smarter", connect, happening now, make the switch, protect your money. Copy is original. |
| checking / savings / cds / credit-cards / mortgage | approximated | Layout of hero, product cards and comparison tables is inferred from page titles and nav groups, not from observed section markup. |
| cds.html | approximated, simulated | Reference shows server-rendered rate text and 3 selects; here a term select highlights a row and an estimator runs over invented yields. |
| mortgage-rates.html | simulated | Reference widget is client-rendered and was not observed. The filter/sort table is my invention. |
| mortgage-calculators.html | approximated | Reference hub links to six calculators; only payment and 15 vs 30 are built. |
| personal-loan-calculator.html | simulated | Reference internals unobserved; standard payment formula with invented rate tiers. |
| customer-service / online-banking / accessibility / financial-education | approximated | Content invented. |
| Header | replicated (structure) | `nav#global-navigation-menubar[aria-label=Main]` mega-menu with `aria-expanded` toggles, global search form, Log in and Enroll. Mobile drill-down ("Return to ...") approximated by nested disclosures plus a "Return to main menu" button. |
| Footer | approximated | Grouped links limited to existing pages, plus a fictional-disclosure block. |

## Intentional additions (reference does not show them in fetched HTML)
locations.html (locator, linked but not fetched in the reference), search.html results page, CD estimator, rate filter/sort, card filter, FAQ search, education topic chips, 404 page (required), enroll demo form, fictional regulator badge slot.

## Simulated
Log in and enroll (demo only, nothing stored or sent), all calculators, all rates (invented), location data (30 invented records, 555 phone numbers, invented postal codes in an unassigned range).

## Pruned navigation targets (not rebuilt, so not linked)
Bank-smartly/safe-debit/kids/teen product subpages, money market and overdraft pages, routing and account number page, credit card subcategories, credit score tools and ExtendPay-style pages, all of Investing and retirement, refinance/HELOC/home improvement pages, auto/boat/debt consolidation loan pages, other calculator subpages (ARM, amortization, down payment, home equity, home improvement), Business and Corporate audience pages, Spanish-language site and banner, and footer links Security, gift card, Site map, Careers, Alumni, Privacy, Your privacy choices, Online tracking and advertising, Terms of use, and the CPRA email capture. No stand-in or catch-all page is used. A few product mentions remain as plain static text.

## Omitted / unverified
Rate tables and calculator internals: unverified (not visible without JS). Locator page: not fetched. Top-level Personal/Business/Corporate switch: only partly observed; only a static "Personal banking" label is shown. Real regulatory logos and insurance statements are deliberately absent.

## Research-relevant observations
The reference exposes 27-129 `aria-expanded` toggles per page (research notes), a very heavy mega-menu. This replica uses 3 dropdowns and 2 direct links. All brand, network and payment-app names are invented to avoid trademarks. Calculator results move focus to the result region (`tabindex=-1`) and validation moves focus to an error summary.
