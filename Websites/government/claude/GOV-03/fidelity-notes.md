# GOV-03 fidelity notes

## Reference and evidence
Reference: the national parks agency site at https://www.nps.gov/ (research metadata only), verified 2026-11-12 via curl HTTP GET, approved 2026-11-13. Only the structure recorded in the GOV.md research block was used. Nothing was re-captured for this build. Nav labels (Find a Park, Plan Your Visit, Learn & Explore, Get Involved, What We Do) are **inferred from section page titles, not observed in nav markup**. Dropdown contents are the builder's own and do not claim to mirror the reference.

## Replicated (structure)
- Header then global nav then hero then body then footer then identifier band order.
- Hero with a "Find a" block and a topic-navigation block; home links to one featured site.
- Large "explore by topic" link set (reduced to 8 topics).
- Directory page, per-site home and plan-your-visit page, topic page, news page, section pages (plan, learn, involved, about).

## Approximated
- Banner above nav: the reference has a government-style banner; here it is replaced with the fictional notice, which says the opposite.
- Footer plus identifier band: link groups and an identifier-like band with invented text.
- Search: the reference delegates to an external service; here header and hero search forms open the local directory with the query.
- Park-picker and state filters (inferred only): approximated as region and type filters.

## Simulated
Contact form (validation, error summary, focus, demo-only outcome that explicitly says nothing was sent).

## Intentionally added
Contact form page (the reference's guessed contact URL returned 404, so it was not observed); region/type filters; sort; news category filter; accordion on the plan page (reference accordion not observed); topic sub-menu in nav (second level).

## Pruned for scope (ordinary scope decisions)
Reference topic taxonomy pages beyond one sample topic page type; per-park sub-sections beyond overview and plan; the thousands of park sub-sites; department directory; any reference nav or footer target not rebuilt is simply not linked (no stand-in page). The exact reference nav and footer targets were never captured, so the pruned set cannot be enumerated and is unverified.

## Omitted on policy (government-impersonation guardrail), kept separate
- Government banner / official-website assurance text and any emblem imitation (the emblem is a plain invented rounded-square with wave lines).
- Park alert, closure, condition, weather or emergency banners (inferred in the reference; not built).
- Any safety, wildlife, hazard, trail, backcountry, water, fire, altitude, rescue or access guidance.
- Fees, entrance charges, reservations, permits, ticketing, donations, volunteer sign-up.
- Account login and any identity, date-of-birth or payment fields.
- Real places, real people, real agencies, partners, vendors, real government domains, and real phone numbers.
- Language selector (not observed; none built).
Pages contain disclaimers that name these topics only to say they are absent.

## Unverified
Reference nav dropdown contents and exact footer links; reference meetings calendar, alert component and language selector (not observed).

## Research-relevant observations
Because the reference search is external and unreproducible, local search results are fully synthetic. Exactly one h1 per page; site and topic h1 text is set from query-string data by JS.
