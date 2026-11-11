# NPO-03 fidelity notes

Reference: https://www.aspca.org/ (Phase A notes in `Websites/pipelines/claude/research/NPO.md`, verified 2026-11-11T03:46Z via curl). No claim of pixel-level or exhaustive fidelity. This run did not re-fetch the reference.

## Page and component mapping

| Reference page / region | Local | Status |
| --- | --- | --- |
| Homepage seasonal banner ("Help us reach 200,000 meals...") | `index.html` alert banner + `<progress>` | Approximated. Copy rewritten; figures are invented |
| Homepage "You Can Make a Difference" with Donate / Advocate / Give Monthly | `index.html` card grid | Replicated structurally |
| "The Latest" and "Featured Highlights" (news, pets of the week) | `index.html` | Replicated structurally, original text |
| "Help the ASPCA Put a Stop to Animal Cruelty" appeal | `index.html` appeal panel | Approximated |
| Email-updates signup | `index.html` newsletter form | Simulated (no submission) |
| "Connect with us" social block | `index.html` | Approximated as text; no social links (no real channels) |
| Header: search form, Donate button, utility links (Adopt, NYC, News) | all pages | Replicated; utility links use Adopt, Local initiatives, News. "ASPCA Pro" omitted (no fictional counterpart) |
| Main nav links (programs, locations, ways to give, get involved, adopt, advocate) | three dropdowns + three plain links | Approximated. The reference's dropdown grouping was not observed (inferred) |
| `/about-us` | `about.html` | Approximated; leadership, history are invented |
| `/animal-care-recovery`, `/investigations-rescue`, `/improving-laws-animals` | three program pages | Approximated with one shared section pattern (overview, steps, FAQ, CTA); page contents were not read in Phase A, so their section order is inferred |
| `/helping-shelters-people-pets`, `/grants-and-scholarships` | `helping-shelters.html` | Merged (approximated) |
| `/adopt-pet` | `adopt.html` | Search/filter is **inferred**; sample pets are invented |
| `/pet-care` | `pet-care.html` | Tabs derived from the page title (Dog, Cat, Horse, Poison Control); content invented |
| `/get-involved`, `/get-involved/advocacy-center` | `get-involved.html`, `advocacy.html` | Advocacy action form is inferred |
| `/ways-to-give` | `ways-to-give.html` | Approximated |
| Donate form (secure.aspca.org): five amount radios, `recurs_monthly` | `donate.html` | Simulated. Observed field names only; amount values/labels were unverified, so $25-$250 and an "Other" option are invented |
| `/news` | `news.html` | Approximated with search, topic filter, show more |
| `/nyc` local-initiative template | `local-initiative.html` | Approximated as one data-driven template for five fictional hubs |
| OneTrust cookie button | footer "Cookie preferences" dialog | Simulated; stores nothing |
| Site search | `search.html` | Simulated over inline data |

## Intentional additions (not observed on the reference)

- Impact stats band on `about.html` (category-typical; labelled as sample figures).
- Poison-safety lookup (derived from the "Poison Control" page title).
- `search.html` results page (the header search needs a destination).
- Terms/privacy/accessibility sections on `about.html` (stand-ins for external legal pages).
- Dedication disclosure in the donate form.

## Omitted

- Volunteer signup and events: the reference does not show them (inferred from page titles in Phase A).
- Individual news article pages, ASPCA Pro, Puppy Industry, Farm Animals, Horse Welfare, Veterinary Services pages, Asheville/Oklahoma City/Miami/Los Angeles pages (scope: 8-15 pages).
- Real logos, photography, and any copied prose.

## Unverified

Footer groups, nav dropdown markup, donation amounts/labels, form field labels, reference accessibility behavior.

## Research-relevant observations

- The reference runs on Drupal with a OneTrust cookie SDK (Phase A stack clues); the replica reproduces neither.
- Observed donate pattern (amount radios + monthly toggle + other amount) is a high-risk accessibility area; here it is implemented with native radios inside labelled fieldsets, a visible-on-focus custom radio presentation and an aria-live impact line.
- Dropdown menus open on click only (no hover) so that keyboard and touch behavior match.
