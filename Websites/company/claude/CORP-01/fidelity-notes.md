# CORP-01 fidelity notes

Replica of the personal-banking area of a national U.S. retail bank (approved source: https://www.usbank.com/). Fictional brand: **Harborline Bank**. Source observations come only from the Phase A research inventory (`Websites/pipelines/claude/research/CORP.md`, curl GETs on 2026-11-10). The generator did not re-fetch the reference or look at its rendered pages, so everything below that is not in that inventory is **unverified**.

Legend: **Replicated** = structure/pattern taken from observed reference data; **Approximated** = pattern reproduced from partial or inferred evidence; **Simulated** = behaves locally, labeled demo; **Added** = intentional addition not observed; **Omitted**; **Unverified**.

## Page mapping

| Reference page (inventory) | Local page | Status |
| --- | --- | --- |
| `/` Personal Banking home | `index.html` | Replicated section sequence from observed h2 list (hero, checking offer, choose checking, personal loans, investing insights, solutions, "banking smarter", connect, happening now, make the switch, protect your money). Copy, offers and numbers are original and fictional. Spanish-site banner and year-end promo specifics omitted. |
| `/bank-accounts/checking-accounts.html` | `checking.html` | Approximated: account cards, comparison table, youth accounts, overdraft section, FAQ. Product detail inferred from nav labels only. |
| `/bank-accounts/savings-accounts.html` | `savings.html` | Approximated: savings comparison, money-market section, FAQ. |
| `.../certificate-of-deposit.html` | `cds.html` | Approximated: the reference has server-rendered term/APY text and three `<select>` elements; the replica uses a rate table driven by three selects plus a **Added** earnings calculator. Rates are invented. |
| `/credit-cards.html` | `credit-cards.html` | Approximated: category groups follow the observed nav (cash back, travel, low intro rate, credit-building, business). Filter, sort and no-fee checkbox are **Added**/inferred. |
| `/home-loans/mortgage.html` | `mortgage.html` | Approximated: process steps, loan types, refinance and home equity sections (nav items observed). |
| `.../mortgage/mortgage-rates.html` | `mortgage-rates.html` | Approximated/Simulated: the reference widget is client-rendered and its markup was not observed. Local form and formula are original. |
| `.../mortgage/mortgage-calculators.html` | `mortgage-calculator.html` | Replicated hub idea; only 3 of the 6 observed calculators (amortization/payment, 15-vs-30, down payment) are built as tabs. ARM, home equity and home improvement calculators **Omitted**. |
| `.../personal-loan-calculator.html` | `personal-loan-calculator.html` | Approximated/Simulated: calculator internals not visible without JS; formula is original. Debt-consolidation section follows the observed "Make debt simpler" theme. |
| `/customer-service.html` | `customer-service.html` | Approximated: help search with FAQ results, contact options. Message form is **Added**. Security and legal sections are shortened stand-ins for footer destinations. |
| `/online-banking...` Mobile & online banking | `online-banking.html` | Approximated: feature list, demo enrollment form (**Simulated**; "Enroll in online banking" is an observed header link). |
| header "Log in" | `login.html` | **Simulated** demo form; the real login is not replicated. |
| `/about-us-bank/accessibility.html` | `accessibility.html` | Approximated: services, alternate-formats table, FAQ. Content is invented, not copied. |
| `/financial-education.html` | `financial-education.html` | Approximated: topic list with search/filter (filter/search **Added**). Article bodies **Omitted**; summaries only. |
| `https://www.usbank.com/locations/search/` (link only, never fetched) | `locations.html` | **Unverified** structure: the locator was not fetched, so layout and behavior are inferred from category conventions and labeled as such. 12 invented locations, no map. |
| (not in reference list) | `404.html` | Required by RULES.md. |

## Global components

- **Header / mega-menu (Replicated structure):** reference has `nav aria-label="Main"` with drill-down "Return to…" items and `aria-expanded` toggles. Replica: six disclosure groups (Checking & savings, Credit cards, Investing & retirement, Home loans, Loans & credit lines, Learn & support) as desktop mega panels and mobile accordions under a Menu button. **Approximated**: the observed multi-level drill-down with "Return to Main Menu" items is flattened to a one-level disclosure; the nav group list is from the inventory. Where a nav item has no local page it points to an anchor or filtered view of a nearby page (e.g. `credit-cards.html?cat=travel`).
- **Global search (Approximated):** observed form present; replica searches the help FAQ only (not a site-wide index).
- **Log in / Enroll (Replicated placement, Simulated behavior).**
- **Top-level Personal/Business/Corporate switch:** only partially observed, **Omitted**.
- **Footer (Replicated groups, Approximated):** Support, Security, Site map, Careers, Accessibility, Privacy, privacy choices, Terms from the inventory. Careers, Alumni, Visa Gift Card, Site map page and CPRA email capture **Omitted**; Privacy/Terms/Security link to sections on `customer-service.html`.
- **Fictional disclaimer** in every footer and demo dialog: **Added** for research clarity.

## Interaction notes

- All data is inline in `js/main.js`: 7 cards, 9 CD terms (3 tiers), 12 locations, 10 article summaries, 14 FAQ answers.
- Calculators use standard amortization math; rate lookup is a simple additive formula. All outputs say they are illustrations.
- Forms: native labels, inline errors, error summary receiving focus with links to fields, errors cleared while typing, labeled demo success.
- Apply/Open buttons open a native `<dialog>` explaining the action is simulated.

## Material deviations and rationale

1. Mortgage calculators reduced from 6 to 3 to avoid unfinished stubs.
2. Mega-menu drill-down flattened (see above) to keep one keyboard pattern.
3. Locator and message form are additions/inferences, flagged above.
4. No real imagery: five local SVG placeholders; all decorative images use empty alt.

## Research-relevant observations

- The reference has 27-129 `aria-expanded` toggles per page (inventory); the replica has 6 mega triggers plus accordions, a much lighter nav, so nav complexity is not matched.
- Calculators and rate widgets are the main interaction-heavy areas; they are rebuilt, not observed.
- Visual design (palette, type, spacing) is original and not a reproduction.
