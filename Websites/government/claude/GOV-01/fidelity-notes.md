# GOV-01 fidelity notes

Replica of the information architecture and interaction patterns of **Boston.gov** (research metadata only; branding is fictional: "City of Port Alder"). Source evidence is the Phase A inventory block in `Websites/pipelines/claude/research/GOV.md` (verified 2026-11-10 by HTTP GET with curl; the home page returned 200, title "Homepage | Boston.gov"). This run did **not** re-fetch the reference and did not inspect it beyond that inventory. Only the home page markup was inspected in detail in Phase A; interior-page structure is inferred from page titles and the common template described in the inventory.

Status vocabulary: **replicated** (observed in the inventory), **approximated** (observed pattern, local simplification), **simulated**, **intentionally added**, **omitted**, **unverified**.

## Page mapping

| Local page | Reference page (from inventory) | Status |
| --- | --- | --- |
| `index.html` | `/` Homepage | replicated section order (date heading, Featured resources, Latest news, Featured videos, Stay Connected, Upcoming Events, Mayor, City Council); hero search approximated |
| `departments.html` | `/departments` | approximated: inventory says "Departments A-Z listing"; letter buttons + keyword search are local |
| `department-311.html` | `/departments/boston-311` | approximated (department template: overview, contact sidebar) |
| `service-parking-permit.html` | `/departments/parking-clerk/how-get-resident-parking-permit` | approximated how-to template; all steps, fees and rules are invented |
| `services.html` | `/city-boston-services-applications-and-permits` | approximated: search/type/department filters are an addition to the directory |
| `events.html` | `/events` | approximated list; filters unverified on the reference ("calendar views, filters and pagination ... not inspected") |
| `news.html` | `/news` | approximated; topic filter unverified on the reference |
| `public-notices.html` | `/public-notices` | approximated; type filter unverified |
| `neighborhoods.html` | `/neighborhoods` | approximated; parks and libraries sections added to back the "Places" menu entries |
| `city-clerk.html` | `/departments/city-clerk` | approximated department template |
| `city-council.html` | `/departments/city-council` | approximated; meeting schedule with agendas is an **intentional addition** |
| `feedback.html` | `/form/website-feedback-form` | form existence replicated; fields invented; **simulated** |
| `contact.html` | `/departments/mayors-office/contact-boston-city-hall` | approximated; also hosts the Accessibility and Privacy footer anchors |
| `report-problem.html` | none (311 flow is external and not fetched) | **intentional addition**, simulated |
| `404.html` | `/departments/311` returned a 404 page | approximated, route-back links only |

## Component mapping

| Component | Status | Notes |
| --- | --- | --- |
| Skip link | replicated | Reference has "Skip to Main Content"; local link targets `#main-content` |
| Alert banner (expandable) | approximated | Reference has a site-banner area with expandable items (CSS checkbox toggles). Local: button disclosure with `aria-expanded`, plus a dismiss button (dismiss is an addition). Text is invented sample content, not a live alert |
| Header utility links / nav | approximated | Links kept: Help / 311, Departments, Public notices, Pay and apply, Events, City news. **Omitted:** Guides (reference returned 503), Business Support, View City Projects, Newsletters nav links |
| "Places" and "Government" nav groups | approximated | Inventory says these groups come from link order and were not confirmed as top-level or nested; modeled as two dropdown disclosures. Menu items limited to destinations that exist locally (Cemeteries, Historic Districts, Schools, Boards pages omitted or mapped to a search) |
| Mobile menu | approximated | Reference uses a CSS checkbox burger; local uses a button with `aria-expanded` |
| Search | approximated | Reference has a search window with "Choose a search type" and an "Ask" AI mode. Local: panel with a search-type select that routes to a local page with `?q=`; the AI "Ask" mode is **omitted** |
| Translate | simulated | Reference has a Translate link; local is a labeled demo dialog that changes nothing |
| Hero | approximated | Reference has a hero-image paragraph; local hero adds a services search (intentional approximation) and an SVG illustration |
| Footer | approximated | 311 block + links list kept; links reduced to existing pages. Social/newsletter links omitted; the home page has a demo newsletter form |
| Videos | simulated | Cards open a dialog saying no video is included |
| Mayor / Council cards | approximated | Fictional people. No real names or photos |
| Meetings schedule | intentionally added | Category feature not confirmed on the reference |
| Report-a-problem form | intentionally added | Reference's 311 flow is external |

## Deviations and research notes

- Reference has no `<main>` element on the home page per the inventory; the replica adds `<main id="main-content">` (required by protocol), which makes it structurally better than the reference there.
- Reference menu triggers are `href="#"` links; replica uses `<button>` elements (protocol forbids `href="#"`).
- Event dates, notices, news and all names are invented sample data. Event dates are fixed (Nov-Dec 2026); only the "today" heading on the home page uses the client clock.
- Page content is rendered by JS from inline data on the list pages (services, departments, events, news, notices, neighborhoods); without JS those pages show only a notice. This is a research-relevant property (content depends on scripting) and is documented in the README limitations.
- Visual design is original (navy/gold, system fonts); no claim of visual fidelity to the reference.
- Unverified: actual reference menu behavior, the reference's page-level heading structure, its events/news filters and its form fields.
