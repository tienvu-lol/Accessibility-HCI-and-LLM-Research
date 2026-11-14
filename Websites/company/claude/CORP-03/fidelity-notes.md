# CORP-03 fidelity notes

Reference: https://about.gitlab.com/ (verified 2026-11-10 via curl, approved 2026-11-13). Replica brand: Northcairn / Cairn (fictional). Source content was treated as untrusted data; all copy here is original.

## Page mapping
The 17 reference pages in the research block map to 15 local pages (see README sitemap); several reference pages were not rebuilt (see pruned list). The reference's two careers pages (landing and full list) are merged into `jobs.html`. Customer detail is represented by one invented story.

## Replicated (structure and patterns from the research block)
- Header with mega-menu groups (Platform, Solutions, Resources, Company), Pricing as a plain link, right-side utility links (Talk to sales, Request a demo, Get free trial), search affordance.
- Home section order: hero, "one control plane" feature panels, industry cards, latest blog cards, customer proof, closing call to action.
- Pricing: three tiers in the reference's pattern (free tier, per-user annual tier, "Let's talk" tier) and an `aria-expanded` accordion/comparison pattern. **No billing-period toggle** was built because the research recorded none.
- Customers page with tabs; blog index with search input and category filter; careers list with two select filters and an accordion list; contact-sales form.
- Footer link groups (plans, platform, solutions, company).

## Approximated
- Mega-menu contents (reduced to local pages and fictional capability names).
- Careers filter option lists (7 locations, 10 departments instead of about 33 options).
- Blog category filtering is JS-driven (the research marked it as inferred).
- Site-wide search: reference has an input on every page; here it is a dialog over an inline 15-entry index.
- Pricing comparison: sample 14-row table (the reference has many accordion sections).

## Simulated
Contact-sales and demo forms (the reference's sales form is a third-party embedded form whose fields were not visible in static HTML; field set here is original and invented), free trial, job applications, search.

## Intentionally added
- A visible fictional-site banner and a pricing "fictional figures" notice (protocol requirement, not in the reference).
- Plan comparison table with text "Included / Not included" (accessibility addition; the reference's exact table was not examined).
- Request-a-demo form shares the validation code with contact sales.
No billing toggle, docs search or other category-typical extra was added.

## Omitted / pruned navigation targets (not linked anywhere)
Reference nav and footer targets without a local page were removed, not redirected: the extra platform sub-pages (source management, artifact, secrets, agent platform and context entries, explore-the-platform), industry and company-size solution pages, the top-tier plan page, docs (separate host), learning, demo hub and series, services, community, partners, events, press, handbook, leadership page, investor relations, trust and AI transparency centres, newsletter, support and customer portals, sign in, language list, status, terms, privacy, install and quick-start guides, the resources and all-jobs-detail pages, and individual blog and customer detail pages other than one story. Blog cards and most story cards are therefore unlinked static content with an explanatory note.

## Unverified
Mega-menu hover vs click behavior, real filter option counts after JS runs, page-level visual design, and the contents of the sales form fields were not verified against the live site during this build.

## Research-relevant observations
Pricing uses disclosure widgets heavily (reference: 76 `aria-expanded` occurrences); the replica keeps disclosure state in native buttons. Contrast of dark footer/CTA bands was a design risk and was checked by axe only.
