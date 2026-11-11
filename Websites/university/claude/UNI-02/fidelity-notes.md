# UNI-02 fidelity notes

Source: Swarthmore College, <https://www.swarthmore.edu/> (research metadata only; fictional "Alderbrook College" replica). Basis: the Phase A HTML-level research in `Websites/pipelines/claude/research/UNI.md` (curl, 2026-11-10). Nothing was rendered in a browser, so layout, colors and typography are **not** claimed to resemble the reference. The reference's own palette, logo and text were not reused.

Status vocabulary: replicated / approximated / simulated / intentionally added / omitted / unverified.

## Page mapping

| Local page | Reference | Status | Notes |
| --- | --- | --- | --- |
| index.html | `/` | approximated | Section order follows the researched sequence: hero → alumni voices/sustainability → weekend feature → "Watch" cards → "To Zero By Thirty-Five" → tuition guarantee → link list → living → Philadelphia opportunities → news. Copy is original. The "Watch" video cards link to text stories (no video). |
| meet.html | `/meet-swarthmore` | approximated | Single page with anchors for dropdown topics (Mission, Why Liberal Arts?, History, By the Numbers, Traditions, President). |
| academics.html | `/academics` | approximated + added | Reference shows a plain "Programs of Study" list; search/division/offered-as filtering is an **intentional addition**. First-year and Research sections stand in for dropdown topics. |
| department.html | `/biology` | approximated | One JS-rendered template for 19 sample departments; reference department internals were not examined, so section content is generic (about, sample courses, people). |
| design-your-own-major.html | `/academics/design-your-own-major` | approximated | Original steps and FAQ; actual reference process unverified. |
| academic-calendar.html | `/academics/academic-calendar` | approximated + added | Reference calendar content was not inspected; table with term/type filters is an addition. |
| admissions.html | `/admissions-aid` | approximated | Card hub to child pages. |
| apply.html | `/admissions-aid/apply-to-swarthmore` | approximated + simulated | Deadlines table, requirement disclosures; applicant portal sign-in is a simulation (the reference uses an external portal – inferred). |
| affordability.html | `/admissions-aid/affordability-access`, `/financial-aid` | merged | Tuition guarantee section from the nav list. Net price estimator is an **intentional addition**, labeled demo. |
| visit.html | `/admissions-aid/campus-tours-and-virtual-visits`, `/visit-swarthmore` | merged + simulated | Reference offers tour sign-up (likely external form – inferred), self-guided and virtual tours. Local form, schematic SVG map and text dialog are simulations. |
| campus-life.html | `/campus-life` | approximated | Sections correspond to the observed dropdown topics (arts, athletics, wellbeing, careers, clubs, living, sustainability). |
| news-events.html | `/news-events` | approximated + added | News filter is an addition. Events list is sample data. Social media section explains why no outbound social links exist. |
| stories.html | `/news-events/stories-swarthmore` | approximated | Five original fictional stories. |
| directory.html | `/directory` | approximated | The reference uses a React people-search with a combobox "Find faculty and staff…". Replica: search input plus role filter over 16 invented people; **no combobox/autocomplete** (plain results list). |
| search.html | `/search?keys=` | approximated | Replicates the GET `keys` contract against a local index. |
| 404.html | – | added | Required by protocol. |

## Component mapping

| Component | Status | Notes |
| --- | --- | --- |
| Utility bar (phone, A-Z Index, Calendar, Directory, Campus Map, Make A Gift, Visit) | approximated | A-Z Index and Make A Gift omitted (no local equivalent); other items link locally. Phone is a 555 placeholder. |
| Main horizontal navigation, 5 named groups | approximated | Group names are renamed originals in the same order and role. Only items with local destinations are included; each panel starts with an "overview" link because the group buttons only toggle. Reference uses ARIA `menuitem` roles; the replica uses plain disclosure buttons (`aria-expanded`) and lists – a deliberate accessibility-oriented deviation. |
| Sixth navigation group | unverified | Research could not confirm it. |
| Search flyout (GET `/search`, `keys`) | replicated (behavior) | |
| Accessibility options panel with Animation On/Off | replicated (behavior) | Implemented as a checkbox persisted in localStorage. |
| Hero ambient video with Pause/Play | approximated | CSS gradient animation with a pause button; starts paused for `prefers-reduced-motion`. |
| Footer (contact, social, feedback/accessibility, legal, two helpful-link columns, giving) | approximated | Social, giving omitted; feedback/legal point to an in-site demo notice. |
| Breadcrumbs / page header | added/approximated | Common in interior pages; exact reference pattern unverified. |
| Demo notice bar | intentionally added | Discloses the fictional/demo nature on every page. |
| Error summary / inline errors / demo success | intentionally added | Required by protocol; the reference's tour form is external (inferred). |

## Omitted

Course catalog, calendar and careers subdomains, application portal, giving, A-Z index, Campus Classifieds, Faculty Handbook and other deep link groups, real videos, photographs, the 6th nav group. These are external or not inspected.

## Research-relevant observations

- Nav panels are keyboard-operable buttons rather than hover-only menus; hover is an enhancement on hover-capable desktops.
- Dynamic lists (programs, calendar, news, directory, department detail, search) are JS-rendered from inline data; with JS disabled they show a `noscript` note. This is a deliberate trade-off for the single-template/data approach and a possible accessibility-evaluation variable.
- Placeholder SVG illustrations are decorative (`alt=""`); the campus map has descriptive alt text plus a text route.
- Sample date "today" for form validation is the visitor's local date.
