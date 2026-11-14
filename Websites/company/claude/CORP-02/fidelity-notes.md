# Fidelity notes: CORP-02 (Harborlight Community Credit Union, fictional)

Reference: the approved CORP-02 source (a member-owned credit union with branches in two states and national online membership), verified 2026-11-10 by HTTP GET and approved 2026-11-13. Structure was taken from the research block only; this run did not re-fetch the reference. Source URL for the record: https://www.dcu.org/

## Page mapping
| Reference page (path) | Local page | Treatment |
| --- | --- | --- |
| `/` | index.html | replicated structure: hero with quick links, Benefits and Offers, What makes us different, member quotes, community, Bank from anywhere |
| `/bank/checking.html` | checking.html | approximated (facts, features, sample table, tier comparison) |
| `/bank/savings.html` | savings.html | approximated; dividend calculator is an inferred feature, simulated |
| `/bank/certificates.html` | certificates.html | approximated |
| `/borrow/vehicle-loans/auto-loans.html` | auto-loans.html | approximated; payment calculator is an intentional addition |
| `/borrow/mortgage-loans/home-mortgage-loans.html` | mortgages.html | approximated |
| `/borrow/credit-cards.html` | credit-cards.html | approximated |
| `/about/rates.html` | rates.html | replicated pattern: tabs plus a select, server-rendered captioned tables (5 tables instead of 59) |
| `/support-center.html` | support.html | approximated; searchable accordion FAQ is an intentional addition |
| `/support-center/branches-atms.html` | branches.html | approximated; reference has one table, locator filters are inferred/added |
| `/membership/become-a-member.html` | membership.html | approximated; eligibility check and join flow are simulations |
| `/financial-education-center.html` | education.html | approximated; filter is an intentional addition |
| `/contact.html` | contact.html | approximated, demo form |
| `/support-center/privacy-practices/accessibility.html` | accessibility.html | rewritten original statement |
| (none) | 404.html | required by protocol |

## Components
- Replicated (observed in research block): utility links, header search input with the placeholder phrase pattern, login area, a prominent loan-payment button, dropdown main navigation, tabbed rates tables, collapsible items (aria-expanded).
- Simulated: header login and loan payment, as labeled demo dialogs (no fields beyond generic demo text; password field is a demo field with warning). Search runs over an inline page index. Calculators do plain arithmetic.
- Intentionally added (not observed): loan calculator, branch locator filters and sort, education filter, eligibility check and join demo steps, FAQ search, contact form validation. The membership eligibility framing reflects the research note that this is a member-owned credit union with national online membership, regional only by branch footprint.
- Omitted/unverified: the real footer link groups were not extracted, so the local footer is original. The reference footer carries real deposit-insurance and housing-lender text; those are deliberately not reproduced. A clearly fictional regulator notice sits in that slot instead. No real vendor, network, ATM-network or payment-app names are used.

## Pruned navigation targets
Reference targets not rebuilt and therefore not linked: Insurance, Investments, Membership Application Status quick link (replaced by a Become a member link), Retirement, Specialty accounts, Business services, Debit cards, Personal and student and commercial lending, Newsroom, Leadership, Forms, Direct deposit, Wires, Check ordering, Disclosures, Plan, Services, Careers. Dropdowns list only existing pages. No catch-all page exists. Career page (source page 13) was not mapped to stay within scope (14 content pages plus 404).

## Deviations and observations
- Rate figures are repeating-digit placeholders on purpose so no value can be mistaken for a real rate.
- Reference pages are 250-600 KB; replica pages are a few KB. Rate tables are far fewer.
- The map is a decorative SVG, not an interactive map (the reference's locator mechanism was not identified).
- Logins: no real credential fields exist outside the demo dialog.
- Layout shift: inline errors are removed on blur after correction, which can move controls slightly.
