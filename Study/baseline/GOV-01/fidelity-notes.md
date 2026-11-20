# Fidelity notes - GOV-01 (fictional City of Quillhaven)

Reference: City of Boise, Idaho, https://www.cityofboise.org/, verified 2026-11-12, approved 2026-11-13. Research limits carried over: page-level structure (heading hierarchy, ARIA, forms) was never inspected, so heading order, landmarks and form design here come from the protocol's accessibility requirements, not from the reference. The reference alert text was time-sensitive and truncated, so its content was never observed.

## Replicated (information architecture as recorded)
Four audience sections (Residents, Visitors, Business, Government) plus Departments & Programs in the primary nav; "See all" link at the head of each dropdown; quick-link band on the home page (Public Meetings, Report an Issue, Permits, Trash and Recycling); government dropdown items (executive office, council, boards, report an issue); footer with link groups and organisation details.

## Approximated
Dropdown panels (the source's dropdown or mega-menu behaviour was inferred, not observed); header search (inferred); permits filter reusing the observed `category` and `search` query parameters; public meetings as a table with sample agendas (embedded third-party calendar never verified); report form (inferred).

## Simulated
Report-an-issue form (validation and demo outcome only); language selector (labelled non-functional demo; the source uses Google Translate markup, not reproduced).

## Intentionally added
Services directory with search and live-region count (services.html); department directory filter; sample non-emergency community notice on the home page (stands in for the alert banner); "illustrative only" notes on service-like pages; breadcrumb trail.

## Omitted on policy (government-impersonation guardrail)
- Alert banner: the real emergency/outage-style alert is not reproduced; replaced by one obviously fictional non-emergency market notice, no emergency format.
- Pay (Residents dropdown) and Utility Billing Services and Parking Tickets quick links: payments are prohibited.
- Pulse Point quick link (emergency-related): omitted.
- Real-process guidance (collection rules/schedules, permit requirements, licensing): not written; the Licensing and Building and Planning dropdown items fall under this as well as scope.
- Account login: none exists in the replica.
- Named officials: Mayor and Council pages have no individuals, even invented ones.

## Pruned for scope (not rebuilt, simply not linked; no stand-in page)
Parking Services, E-Newsletter, Recreation, Parking and Transportation, Arts and Culture, Tourism, Bids and Purchasing, Jobs, Keep Boise Cool (renamed topic not rebuilt), E-Motos, the "Get Directions" map link, individual See All sub-pages. Visitors has no dropdown because no local child page exists.

## Unverified
Source heading structure, ARIA, form markup, footer link groups, Public Meetings embed, whether alert banner is dismissible.

## Research-relevant observations
Dropdown panels use buttons with aria-expanded (a design choice of this replica). Tables stack into labelled blocks below 48rem. All data is inline; no fetch.
