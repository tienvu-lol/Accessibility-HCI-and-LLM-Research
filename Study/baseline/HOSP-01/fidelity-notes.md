# Fidelity notes - HOSP-01 (Meridian Bay Health, fictional)

Reference: UCSF Health (https://www.ucsfhealth.org/), verified 2026-11-10 via curl, approved 2026-11-13. Source of structure: the `### HOSP-01` block of `Websites/pipelines/claude/research/HOSP.md`. I did not re-fetch the reference during this build; all structural claims come from that research block.

**Important:** search and filter result sets are not present in the reference's static HTML, so the reference's real result data (providers, locations, filter options, typeahead behavior) was **never observed**. Find-a-doctor, locations and every other search run over an invented inline dataset. Filter choices (specialty, location, language, gender, new patients, virtual visits) are category-typical assumptions, not observations.

## Page mapping
See the sitemap table in README.md. All 14 listed source pages were rebuilt; `provider.html` (a profile template inferred from the `/providers/<letter>` link pattern) was added as the fifteenth page.

## By component
| Component | Status |
|---|---|
| Skip link, header with logo, BayPortal and Request-appointment utility links | replicated (observed); portal link label is de-branded to the fictional BayPortal |
| Mobile menu button | replicated (observed) |
| Primary nav: Care, Medical Services, Find a Doctor, Locations | replicated (observed) |
| Care dropdown | approximated: reference lists Conditions / Treatments / Medical Tests; those targets were unusable (generic search page), so my dropdown lists the three local pages Conditions and Care, Emergency Department, Cancer Care |
| Home sections in order: hero, "Great care starts here" (three cards), specialties, doctors, stories carousel with play/pause and prev/next, news cards, locations, "I want to..." | replicated order (observed headings); copy original; hero image is a local SVG |
| Typeahead on find-a-doctor | simulated; label wording approximated; behavior inferred |
| Footer: collapsible groups, back-to-top | replicated structure; contents reduced to local pages (two groups instead of three) |
| Appointment form | simulated; fields inferred (page itself observed, form not inspected) |
| Provider profile | inferred; reference profile never fetched |
| Locations finder | inferred; no map |
| Patient portal page | The reference portal is a third-party vendor product with its own brand. The replica substitutes a fictional in-house portal, "BayPortal" (`patient-portal.html`), to avoid using a real trademark; this substitution is research-relevant (portal naming and branding differ from the reference). Simulated as a non-functional login dialog |
| Emergency bar (all pages) | **intentional addition** (category-typical emergency notice); reference has an ED service page only |
| Plan search on billing page | **intentional addition** to exercise search/empty state |
| Care-area search (names only) | approximated; reference `/care` search results not observed |
| 404 page | required by protocol |

## Pruned reference navigation targets (not linked anywhere)
Refer a patient, Search (`/search`), Virtual Visits, Second Opinion, Clinical trials (external), Conditions / Treatments / Medical tests submenu items, footer: Contact us, Patient relations, International services, Join our team, Donate, Leadership, Quality of patient care, Price transparency, News & stories, Media resources, Accessibility resources, nondiscrimination notice, the whole "Research & education" group, and "Follow us" social links. Nothing routes to a stand-in page.

## Omitted / unverified
No real photography, maps, social links, rankings claims or news. No claim is made that layout, spacing or colors match the reference; the visual design is original. Stack clues (Next.js, Sitecore, Tailwind-like) were not imitated.

## Medical-content guardrail
Copy is brochure-level placeholder text. Doctors, specialties, hours and availability are invented; no clinical guidance. The emergency notice only says to call a local emergency number.

## Research-relevant observations
Reference IA is nav-heavy (mega-nav, 3-group collapsible footer, typeahead) with a long single-page home; this replica reproduces that hierarchy with ~16 pages and many native disclosure/accordion patterns, filters, one dialog and one carousel.
