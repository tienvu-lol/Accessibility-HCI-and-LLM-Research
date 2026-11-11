# CORP-02 fidelity notes

Replica of the structure of https://www.dcu.org/ (Digital Federal Credit Union), re-branded as the fictional **Fernhollow Credit Union**. Reference facts come only from the Phase A inventory (`Websites/pipelines/claude/research/CORP.md`, curl-based, verified 2026-11-10). I did not browse the reference myself during this run, so anything not in that inventory is marked unverified.

## Page mapping

| Replica page | Reference page (inventory) | Status |
| --- | --- | --- |
| `index.html` | `/` | replicated structure, approximated copy |
| `checking.html` | `/bank/checking.html` | approximated |
| `savings.html` | `/bank/savings.html` | approximated; calculator inferred |
| `certificates.html` | `/bank/certificates.html` | approximated |
| `auto-loans.html` | `/borrow/vehicle-loans/auto-loans.html` | approximated; calculator added |
| `mortgage.html` | `/borrow/mortgage-loans/home-mortgage-loans.html` | approximated; calculator added |
| `credit-cards.html` | `/borrow/credit-cards.html` | approximated |
| `rates.html` | `/about/rates.html` | replicated pattern (tabs, select, tables), tiny dataset |
| `support.html` | `/dcu-support-center.html` | approximated |
| `branches.html` | `/dcu-support-center/branches-atms.html` | approximated (table, no map) |
| `membership.html` | `/membership/become-a-member.html` | approximated |
| `education.html` | `/financial-education-center.html` | approximated |
| `careers.html` | `/careers.html` | approximated |
| `contact.html` | `/contact.html` | approximated |
| `accessibility.html` | `/dcu-support-center/privacy-practices/accessibility.html` | approximated |
| `404.html` | none (required by Rules.md) | intentional addition |

## Component mapping

- **Replicated** (observed in the inventory): top utility links, header login panel with username and password plus "forgot" link, "Pay my loan" button, search input with the placeholder idea, a dropdown main navigation, home hero with four quick links, home bands in the observed order (benefits and offers, what makes it different, member quotes, community, bank from anywhere), a rates page with tabs, a select and tables, `aria-expanded` collapsibles, a branches page with a table.
- **Approximated**: nav labels. Reference has Bank, Borrow, Plan, Learn, Support, Services, Membership; the replica uses Bank, Borrow, Learn, About, Support, Membership because the Plan and Services branches were not in the inventory. Rates sits under About as in the reference.
- **Simulated** (clearly labeled demos): login, Forgot credentials, Pay my loan, Membership application status, Schedule an appointment, app download, job Apply, membership request, contact message. They either open the demo dialog or show a "Demo only" status; nothing is stored or sent.
- **Intentionally added**: the demo banner and footer disclosure; the auto and mortgage payment estimators (category-typical, the reference calculators were not observed); the 404 page; the "Clear filters" buttons; a ZIP/town/name search on the branches list; Show-summary cards on the education page.
- **Omitted**: Insurance and Investments utility links, branded footer legal group (privacy, terms, NCUA/Equal Housing marks; the replica says it is not federally insured), social links, map widget, real calculators/tools beyond three, the 59-table rates dataset, article detail pages, newsroom/leadership pages, Spanish banner, cookie banner.
- **Unverified**: footer link groups of the reference, the real nav composition beyond the dropdown groups listed, calculator and locator internals, mobile layout of the reference.

## Research-relevant observations

- Rates and branch lists are generated from inline JS arrays after load, so their content depends on JavaScript. FAQ, articles and jobs behave the same way.
- Dropdowns open on click/Enter/Space (not hover) for keyboard and touch parity; the reference's trigger behavior was not observed.
- The login disclosure and search results panel are inside the header and are closed in the automated axe scans, so those open states were only checked by script, not by axe.
- All sample data is invented (fictional towns, 555-01xx numbers, round rates). Counts: 12 FAQ answers, 10 locations, 9 articles, 8 jobs, 5 rate-table groups with 3 to 6 rows each.
