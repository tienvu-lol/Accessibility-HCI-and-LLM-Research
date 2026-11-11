# Fidelity notes — NPO-01 (reference: UNICEF, https://www.unicef.org/)

Basis: curl-verified homepage HTML and page titles from Phase A (2026-11-11). Nothing was visually inspected in a browser.

## Replicated
- Homepage region order: emergency/press teasers area, hero, card sections, "our work", spotlight, promo links, newsletter call-to-action, large footer link list (names from the observed HTML).
- Header elements observed: language links, press centre link, Donate button, search form, six top-level nav labels (Who we are, What we do, Research and reports, Stories and features, Where we work, Take action).
- Page set and titles: who-we-are, what-we-do, reports, stories, article, where-we-work, take-action, work-with-us, emergency, FAQ.
- Story filter (the reference has a "mosaic curated" form, probably a filter).

## Approximated
- Hero: reference has "Water Under Fire" and "UNICEF, for every child" headings; replica uses one fictional hero.
- Reports, stories, country listings: reference listing behaviour was not inspected; replica uses keyword + select filters on inline data.
- Transparency page folded into a section of who-we-are.html.
- Press centre: filtered view of stories (type = Press release).

## Simulated
- Donate: the reference links to an external donation site (403 to curl). Amount/frequency form is invented and clearly labelled a simulation.
- Search: client-side over inline data (the reference uses a server-side Solr view).

## Intentionally added (not observed)
- Volunteer interest form on work-with-us.html.
- Dropdown/mega-menus (inferred only; Phase A saw top-level links only).
- Country-office search/filter with detail panel (reference selector inferred, not inspected).
- Report-summary dialog and opportunities filter.
- "On this page" local nav, FAQ expand-all.
- Fictional emergency ("Karavel floods") in place of the reference's Nepal flood.

## Omitted
Child rights convention page, evaluation/ethics/audit pages, Press centre as a separate site, language translations, carousels, multi-column footer group names, social links.

## Unverified
Exact header/footer grouping, nav dropdown contents, visual layout, colours, breakpoints, and the real donate flow.

## Research-relevant observations
- Reference stack is Drupal (jQuery, Views exposed forms); replica reproduces only observable behaviour with vani
- No UNICEF marks, text or images are used; all copy and graphics are original.
