# Fidelity notes — REST-03 (Vane & Alder)

## READ FIRST: this replica's information architecture is INFERRED, not observed
The approved reference (Eleven Madison Park, https://www.elevenmadisonpark.com/) returned **zero `h1`, `h2` and `h3` elements in raw HTML on two separate verification passes** (2026-11-14, HTTP GET, no browser rendering). Its content is rendered client-side. Its recorded complexity is `unknown`. Section hierarchy, section order, copy hierarchy, visual layout and the behavior of its 28 buttons were **not observed**. This was approved knowingly under Rules.md section 5 (inferred features must be labeled).

**Observed (evidence from raw HTML only):** the 12-page URL surface; 3 `<nav>` elements; nav text About Us, Team, Magic Farms, Events, Stories, Gift Cards, "Folder: About", "Folder: Shop", cart count, FAQs, Press & Accolades, Careers, Contact Us, Accessibility Statement; 43 images; 28 buttons; one form with `given-name`, `surname`, `email` (newsletter); off-site reservations (Resy) and external PDF wine list; a published accessibility statement; `/about` and `/ourrestaurant` byte-identical.

**My invention, not replication (all of the following):**
- The order, headings and content of every page body, including the home page (hero, "The evening" cards, journal teasers, visit band).
- Page-level layout, visual design, colors and type. Nothing is claimed about the look of the reference.
- Which pages sit in the "About" and "Shop" menus (the reference had "Folder: About"/"Folder: Shop" labels but their contents were not observed); the Menu, Events, Stories and Contact placement in the nav.
- The widgets: team bio disclosures, farm seasonal tabs, story dialog, FAQ search, press and careers filters, demo cart. These are accessible interaction patterns chosen to give the research something to evaluate, **not a replication of the reference's 28 buttons**, whose purpose is unknown.
- All copy, names, data, press items, roles and prices.

## Page mapping
| Replica page | Reference route | Status |
|---|---|---|
| index.html | / | Approximated (route observed, content inferred) |
| about.html | /ourrestaurant, /about | Approximated. Duplicate routes collapsed to one page |
| team.html | /team | Approximated |
| events.html | /events | Approximated; inquiry form is an addition |
| stories.html | /stories | Approximated |
| lantern-fields.html | /magic-farms | Approximated (renamed to fictional farm) |
| faq.html | /faq | Approximated |
| press.html | /press-and-accolades | Approximated |
| careers.html | /careers | Approximated; demo application form is an addition |
| gift-cards.html | /giftcards | Simulated (no payment) |
| contact.html | /contact | Approximated; form and hours are additions |
| accessibility.html | /accessibility-statement (nav link only; not among the 12 verified pages) | Approximated; describes this replica only |
| menu.html | none | **Intentional addition** (category-typical; reference has no browsable menu page) |
| reservations.html | none (off-site Resy) | **Intentional addition, simulated** |
| 404.html | n/a | Added per Rules.md |

## Component mapping
- **Replicated (from observation):** a three-`nav` structure (primary, utility, footer); nav item labels in fictionalized form; newsletter form with first name, last name, email fields (`autocomplete` given-name/family-name/email); presence of an accessibility statement link; single route for the duplicate About page.
- **Approximated:** About and Shop disclosure menus; cart count in the utility nav.
- **Simulated:** reservations, gift card purchase and checkout, newsletter, contact, events and careers forms. Each is labeled on the page.
- **Intentionally added:** menu page and dietary filter, reservation request, wine sample table, events and careers forms, breadcrumbs, story dialog, farm tabs, search and filter controls.
- **Omitted:** off-site properties (home goods, wine club, bar) and the external wine PDF; related-property links; any element of unobserved rendered design.
- **Unverified:** everything about rendered appearance, the contents of the two folder menus, what the 28 buttons do, and whether the rendered nav matches raw HTML.

## Research-relevant observations
- Navigation pruning follows the 2026-11-13 convention: only built pages are linked.
- Image counts are not matched (43 observed vs. 6 reusable SVGs here); images are generic placeholders.
- Platform clues (Squarespace) were recorded in research; this replica uses none of its code.
- The evidence gap means this slot is a weaker fidelity baseline than REST-01/02; analyses of "fidelity" should treat REST-03 as structure-inferred.
