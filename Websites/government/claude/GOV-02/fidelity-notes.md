# GOV-02 fidelity notes

Reference: New York State portal, https://www.ny.gov/ (approved source; verified over HTTP on 2026-11-10 per `Websites/pipelines/claude/research/GOV.md`). Replica: fictional **State of Aldermere** portal.

Basis of observations: the Phase A inventory, which was HTTP-only (titles, link text, landmark counts, class names). I did **not** browse the live site during this run, and I did not view the reference visually. Anything not listed in that inventory is **unverified** and is labeled so below. No pixel-level fidelity is claimed.

## Page mapping

| Reference page (from inventory) | Local page | Treatment |
| --- | --- | --- |
| Home, "The Official Website of New York State" | `index.html` | Replicated order: trust banner, header tools, mega-menu, Popular Topics chips, quick services, Helpful Guides cards, Discover section, footer emergency strip. Hero band is **approximated** (the inventory does not describe one). |
| Services & Benefits | `services-and-benefits.html` | Replicated as a topic directory using the 12 service topics from the menu. Keyword search and topic select are **intentionally added** (the inventory saw none). |
| Renew a Vehicle Registration Online | `service-vehicle-registration.html` | Replicated: "On this page" anchor list, step-by-step content. Fees table, FAQ accordion and demo "Start online" are **intentional additions / simulated**. |
| Apply or Recertify for SNAP | `service-food-assistance.html` | Replicated as a fictional "Food Support" page. Apply/Recertify tabs are **inferred** from the page title. Income table is invented. |
| (other services) | `service.html?id=...` | **Intentional addition**: one generic service page rendered by `main.js` from 22 inline records, so every directory entry has a working target. |
| State Agencies and Departments | `agencies.html` | Replicated as a directory (16 invented agencies). Search and A–Z filter are **intentional additions**. |
| Counties | `counties.html` | Replicated as a table of 12 invented counties. Search is an **intentional addition**. |
| Taxes | `taxes.html` | Approximated topic hub. |
| Start a Business | `start-business.html` | Approximated guide (five steps, FAQ). |
| Events | `events.html` | Approximated. 10 invented events including public meetings with agendas. Type/month/keyword filters are **intentional additions**. |
| New York State Government | `government.html` | Approximated overview; holidays table and alerts/contacts section (the latter from the footer alert strip). |
| Visit & Explore | `visit-and-explore.html` | Approximated; sections follow the menu (Arts and Culture, Historic Sites, Parks and Recreation) plus a foliage-report table (the reference's foliage report was only seen as a link). |
| Elections and Voting | `elections-and-voting.html` | Approximated; county board-of-elections finder is an **intentional addition**. |
| Accessibility (and `/privacy-policy`) | `accessibility.html` | Statement replicated in kind. Disclaimer and privacy are **merged** into this page (deviation to stay inside the page budget). The problem-report form is an **intentional addition** and is simulated. |
| `/search` (SearchStax) | `search.html` | Approximated: GET `?q=` over local data in four groups. |
| Spanish variant `es.ny.gov/homepage` | none | **Omitted.** The language selector is a labeled demo. |
| (error page) | `404.html` | Required by the protocol. |

## Component mapping

- **Trust banner** ("Official websites use ny.gov / Secure ny.gov websites use HTTPS"): replicated as a disclosure with fictional wording. The expand behavior is **inferred**.
- **Header tools**: log-in link (simulated with a demo dialog), language switcher (12 languages; the inventory read 3 of 14 names; the rest are **inferred**; selecting one only shows a notice), search form (GET to a local results page; clear button replicated).
- **Mega-menu**: four submenu titles replicated exactly as in the inventory; links are paraphrased and grouping is **inferred** from link order. Click-to-open, Escape and outside-click close are my implementation (the real behavior was not inspected). Mobile uses a Menu disclosure with accordion submenus.
- **Emergency/alert strip** (footer): replicated in spirit with fictional numbers (988 is the real national crisis line and is shown as text). The dismissible top-of-page **alert banner** on the home page is an **intentional addition**.
- **Popular Topics chips, quick links, cards**: replicated as lists of links; card images are decorative SVG placeholders.
- **Footer**: "Frequently Visited" menu and Accessibility / Disclaimer / Privacy / Events links replicated. "Mobile Apps", social links and "Site Credits" are **omitted** (no fictional equivalents worth inventing).
- **Utility classes / Tailwind-like styling**: not copied. One hand-written stylesheet is used.

## Omitted or not verified

- "News" in "Your Government", "Prison and Incarceration", "State Employees" menu entries: omitted to keep within 15 pages.
- Real branding, the state seal, logo and copy: not used. Emblem, wordmark and all text are original and fictional. Phone numbers use the 555-01xx range.
- Events filtering, directory filtering and the reference's actual menu keyboard behavior: **unverified** in the reference.
- Full-page visual layout, spacing, colors and typography: not compared to the reference.

## Research-relevant observations

- The reference's pages are text- and link-heavy with one large mega-menu; the main accessibility-relevant patterns here are the disclosure menu, the search form, filters with live result counts, tabs, and validated forms.
- Data-driven lists (services, agencies, counties, events, search results) are rendered by `main.js`. Without JavaScript these lists are empty. This is a known trade-off, noted in the README.
