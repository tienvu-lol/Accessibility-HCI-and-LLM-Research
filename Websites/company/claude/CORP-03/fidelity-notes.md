# CORP-03 fidelity notes

Reference: https://about.gitlab.com/ (verified 2026-11-10, static HTML via curl; JS-rendered behavior **unverified**). Replica: "Forgeline", fictional. Source of truth for observations: `Websites/pipelines/claude/research/CORP.md` (CORP-03 block). Nothing below was observed directly by this build run beyond that inventory.

## Page mapping

| Reference | Replica | Status |
| --- | --- | --- |
| `/` | `index.html` | replicated structure: hero, "One control plane", industry band, "Latest from" blog cards, closing CTA; copy original |
| `/platform/` | `platform.html` | approximated: 11 capabilities in 4 groups drawn from the observed Platform menu |
| `/pricing/` | `pricing.html` | replicated: Free / Premium / Ultimate with "$0", "$29 per user/month billed annually", "Let's talk" (prices fictionalized in spirit; same structure), accordion comparison and FAQ |
| `/pricing/premium/` | `pricing-premium.html` | approximated |
| `/solutions/` | `solutions.html` | replicated grouping: Outcomes, By size, Industries (list copied in structure from the observed menu) |
| `/solutions/continuous-integration/` | `solutions-ci-cd.html` | approximated |
| `/customers/` | `customers.html` | replicated tabs pattern; 4 industries instead of the reference's 9 tabs |
| `/customers/nvidia/` | `customer-story.html` | approximated with a fictional customer |
| `/blog/` | `blog.html` | replicated search + category filter (filtering itself is *inferred* in the reference) |
| one `/blog/...` post | `blog-post.html` | simulated: article text rendered from inline data via `?post=` |
| `/sales/` | `contact-sales.html` | **intentional addition**: fields invented (reference form is Marketo-injected and unobserved) |
| `/request-a-demo/` | `request-demo.html` | **intentional addition** for field set, same reason |
| `/jobs/` | `careers.html` | approximated |
| `/jobs/all-jobs/` | `careers-all.html` | replicated: department + location selects and accordion list; keyword search is an addition |
| `/company/` | `company.html` | approximated; also hosts mission, leadership, trust and legal anchors |
| (n/a) | `404.html` | required by protocol |

## Component mapping

- **Header / navigation:** reference has `nav.navigation__desktop` with mega-menus for Platform, Solutions, Resources, a plain Pricing link, and a Company group plus right-side actions. Replicated as four click-toggled mega-menus plus Pricing, "Talk to sales", "Request a demo". Mobile disclosure is an approximation (reference mobile behavior unverified). Menu contents were reworded and mapped onto local pages and anchors; items without a local page were dropped.
- **Search:** reference has a site-wide search input on every page. Replaced with a header "Search" button opening a modal dialog over a 59-entry inline index (**approximated**, different affordance).
- **Footer:** grouped columns (platform, why, solutions, resources, company) plus legal row, mirroring the observed footer; Terms/Privacy/Accessibility point to anchors in `company.html` (**approximated**).
- **Pricing accordions:** reference uses many `aria-expanded` sections; replicated with button-driven accordions.
- **Tabs:** replicated with `role=tablist` and one shared panel.
- **Careers filters:** replicated as two selects over data attributes.

## Intentionally added (not observed on the reference)

- Header search dialog and the 59-entry index.
- Keyword filter on the careers list.
- Demo field sets for contact-sales and request-demo; validation rules, error summary and success panel.
- "Apply (demo)" buttons on roles.
- Breadcrumbs on interior pages (reference breadcrumbs not verified).

## Omitted

Language list, Sign in / portals, free-trial flow, cookie-consent banner, Swiftype-style search backend, Marketo form, docs site (off-domain), Press / Handbook / Investor / AI-transparency pages, `/get-started/`, `/resources/`, `/security/`. Billing-period toggle: the reference had none, so none is provided despite the category brief.

## Unverified

Rendered behavior of the reference menus (hover vs click), exact heading order, exact section order on pages other than the home headings listed in the inventory, mobile layout of the reference, real contact-form fields.

## Research-relevant observations

- Mega-menus have many links but only 4 groups of destinations locally, so several menu items deep-link to anchors on one page; anchors target `article` cards.
- The shared `.accordion-trigger` pattern is reused for pricing tables, FAQs and the job list (one `data-component="accordion"` across contexts).
- Data-driven pages (blog article, filters) depend on JS by design, matching "inline JS data, no fetch".
