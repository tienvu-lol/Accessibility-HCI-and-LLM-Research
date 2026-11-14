# Fidelity notes: GOV-02 (Marrowvale Portal, fictional)

Reference: Texas.gov, https://www.texas.gov/ (research metadata only). Verified 2026-11-12 by HTTP GET via curl; approved 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`). Stratum: state government portal / agency. Only the research block was used for structure; no reference markup, text or media was copied. No pages were re-fetched during this build.

## Guardrail summary
The fictional state "Marrowvale" in the "Republic of Velmara" is invented, with invented agencies, places and phone numbers (555 exchange). The domain `marrowvale-portal.example` is fictional and no government domain is written anywhere. A fictional-government notice sits in the masthead area (top of `<header>`, above the brand) on all 14 pages including `404.html`, repeated in the footer. There is a plain geometric emblem only (no seal, crest or flag). No real officials. No sign-in, payment, identity or personal-data fields. No alert banner. Service and topic pages carry a "not real guidance" note and describe only whimsical invented services.

## Page mapping
| Reference page | Replica | Treatment |
|---|---|---|
| Home | index.html | approximated: hero search with suggested queries, topic hubs, promo blocks |
| Search | search.html | replicated pattern, simulated over inline data |
| Government Services Directory | services.html | replicated pattern (category filter via `?category=`), invented 30 entries |
| State Agencies Directory | agencies.html | replicated pattern, invented 16 agencies |
| Licenses, IDs & Vehicles (topic hub) | permits-passes.html | approximated with an invented topic |
| Driver Licenses, IDs & Records (service detail) | permit-detail.html | approximated as an invented sample service page |
| Family & Support Services (topic hub) | community-learning.html | approximated with an invented topic |
| Starting a Business (how-to) | makers-markets.html | approximated as an invented topic hub, not a how-to |
| FAQ | faq.html | approximated, invented questions about the fictional site |
| Accessibility Resources and Support | accessibility.html | approximated |
| Sitemap | sitemap.html | replicated |
| About | about.html | approximated |
| (footer "Provide Feedback") | contact.html | approximated as a simulated form; see additions |

## Components
Replicated: banner position at top (reference USWDS-style gov banner is represented by the fictional notice with a disclosure), search affordance in header, topic-hub navigation with dropdowns and a mobile menu disclosure, hero search with suggested queries, promo blocks, grouped footer.
Simulated: search results, directory filters, feedback form (explicit demo-only outcome).
Intentionally added: none beyond the contact/feedback form, which is an approximation of the reference's footer "Provide Feedback" link. A language-selector demo was included because the reference markup contained translate markup; it is non-functional and labelled so (the selector itself was never confirmed on the reference). Fictional-notice banner and per-page "not real guidance" notes are guardrail additions.
Not observed and not added: meetings calendar, alert banner.

## Off-site transactional services
The reference mostly signposts to services hosted on external agency sites. These were NOT fabricated as transactional pages. Each is shown as a plain-text, unlinked label ("Off-site provider (fictional, not linked)") naming an invented `.example` host. Promo blocks for off-site companion services are labelled non-functional and go nowhere.

## Scope prunes (reference targets not rebuilt, not linked, no stand-in page)
Vehicle Registration; Handgun Licenses; Hunting & Fishing Licenses (also policy, see below); Business Support, Taxes (also policy); Birth/Marriage/Death Records; Education & Child Care, Health, Housing, Jobs, Moving, Public Safety, Veteran Support sub-pages (several also policy); Local Government Resources; Open Data Portal; History & Culture and Parks & the Outdoors landing pages (represented only by a directory category filter); Site Policies; AI Notice; Help and Support hub; external state links (Veterans Portal, Open Data, Records Locator, Homeland Security, fraud hotline); the staging-hostname footer link (not followed, not reproduced); Texas by Texas, Property Tax Transparency and TREO promo destinations.

## Policy-driven omissions (separate from scope)
- "Sign in to TxT" account button and any login or account flow: omitted (phishing surface).
- Fee, tax and property-tax payment or signposting: omitted; no payments of any kind.
- Driver licences, IDs and records, vehicle registration, birth/marriage/death records: no real-service pages; reference topics replaced by invented whimsical topics.
- Taxes, business registration/starting a business how-to steps, professional or handgun/hunting licensing: omitted.
- Food assistance, health, housing, jobs, benefits, veteran support: omitted.
- Disaster and emergency assistance, public safety: omitted; no alert or public-warning content of any kind.
- Voting & Elections: omitted.
- Any statute, deadline, eligibility or procedure text: omitted.
- AI-assisted search (`type=ai`): not built; local keyword search only.

## Unverified / limitations
The search results page, language selector and autocomplete of the reference were not tested or confirmed. Suggested queries on the replica are invented, not copied. No accessibility audit was done.
