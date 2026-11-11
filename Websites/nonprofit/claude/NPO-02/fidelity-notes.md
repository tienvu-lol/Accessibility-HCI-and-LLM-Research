# Fidelity notes: NPO-02 (Larkfield Region Food Bank, fictional)

Reference: Capital Area Food Bank, <https://www.capitalareafoodbank.org/> (research metadata only; no names, logos, prose or media were copied).
Source evidence: the NPO-02 block of `Websites/pipelines/claude/research/NPO.md` (HTTP GET via curl, 2026-11-11T03:46Z, homepage 200, 127 KB). The generator did **not** re-fetch the reference; structure below comes from that inventory (page titles, nav labels, observed regions). Anything the inventory marks as not inspected is listed as **unverified**.

## Page mapping

| Local page | Reference page (inventory) | Status |
| --- | --- | --- |
| `index.html` | `/` | Replicated section order: hero (h1 + tagline), "hunger in every ZIP" band, partner cards, client story cards, "how we're helping", "hunger solutions for tomorrow" cards, See Our Impact, Donate/Volunteer/Partners CTA row, email sign-up, event cards. |
| `hunger.html` | `/hunger-in-our-region/` | Approximated: inventory gives title only. Facts, causes and a county table are original. |
| `what-we-do.html` | `/what-we-do/` | Approximated: overview plus one anchored section each for the sub-pages seen in the nav (Food+ Partnerships, Advocacy, Nutrition & Wellness, Farms & Gardening). Those sub-pages were not fetched. |
| `distribution.html` | `/what-we-do/direct-food-distribution-programs/` | Approximated: title only; program list as accordion is an original choice. |
| `impact.html` | `/impact/` | Approximated: title only; fiscal-year selector and food-source list are intentional additions. |
| `how-to-help.html` | `/how-to-help/` + `/how-to-help/ways-to-give/` | Two reference pages merged. Fundraising, corporate and workplace giving sections are anchored because the nav lists them. |
| `donate-food.html` | `/how-to-help/donate-food/` | Approximated: title only. Drop-off site filter is an intentional addition. |
| `donate.html` | `/donate/` (external giving platform) | **Simulated.** The real flow returned 403 and was never observed. Amount presets, other amount and one-time/monthly frequency follow common donor-form patterns; no payment fields. |
| `volunteer.html` | external volunteer subdomain | **Simulated and unverified.** Subdomain returned 200 with a generic title; content was not inspected. Shift list and form are intentional additions. |
| `events.html` | `/upcoming/` | Replicated card list idea (two event cards on the real homepage); type and month filters are intentional additions. |
| `blog.html` | `/blog/` | Approximated: title only. Category filter, search and inline "Read more" are intentional additions (no separate article pages). |
| `partners.html` | `/partners/` | Approximated: title only; type filter added. |
| `get-help.html` | `/find-food-assistance/` | Approximated: inventory *infers* a location search but did not inspect the form. ZIP/day/type finder over 14 invented locations. |
| `contact.html` | `/contact/` | Approximated: form fields not inspected. |
| `sign-up.html` | `/sign-up/` | Approximated: inventory says title only, form fields not inspected. |
| `404.html` | none observed | Required by protocol. |

## Components

- **Header / navigation**: replicated structure of logo, Donate button, search, and a primary nav with two dropdown parents (What We Do, How To Help) and Impact, Events & Campaigns, Blog, Partners, Get Help, Contact. Approximated: dropdowns open on click/Enter (no hover), and search opens a modal dialog over an inline 15-page index instead of a header search form. Mobile menu is an `aria-expanded` disclosure (the real mobile behavior was not inspected).
- **Footer**: the inventory did not inspect the footer; this one is original (four groups, fictional address, research disclaimer). No social links.
- **Breadcrumbs, page header**: intentional additions on interior pages (not verified on the reference).
- **Filters, sortable table, accordions, stat selector, form validation framework**: intentional additions or approximations; the reference's interactive pieces mostly live on external domains.
- **Forms**: all forms use `novalidate` plus shared JS: inline errors, an error summary that takes focus, and a demo-only success panel. Nothing is sent or stored.

## Omitted

- Careers, Hunger Report 2026 (external subdomain), the external-network link in the header, the ArcGIS ZIP map, the real Donate platform, real photography, individual client story pages and event detail pages.
- Real names: partner organizations, client stories, events, counties, towns, addresses and phone numbers are all invented. Phone numbers use the 555-01xx range.

## Research-relevant observations

- The reference homepage hero and card text is partly empty in raw HTML (per inventory), so card copy here is original and not a text-level replica.
- Demo statistics (meals, rates, people) are invented; each page that shows them carries a visible "sample data" notice.
- Both the real donate flow and volunteer flow are off-site on the reference; this replica brings simplified simulations in-site so accessibility of those patterns can be evaluated. They are labeled as additions on the pages themselves.
- Not pixel-matched: no claim of visual fidelity beyond information architecture and section order.
