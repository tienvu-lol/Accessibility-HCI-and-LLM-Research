# NPO-01 — Harborlight Children's Fund (fictional)

- **Replica ID:** NPO-01 (slot 1, model group `claude`)
- **Category:** Nonprofit & Charity / large international humanitarian organisation
- **Fictional branding:** "Harborlight Children's Fund", tagline "For every child, a safe harbor". Original copy, invented lighthouse mark, local SVG placeholders. Not a real charity.
- **Approved source:** UNICEF global site, https://www.unicef.org/ (research metadata only)
- **Source verification:** 2026-11-11T03:46Z, HTTP GET via curl; homepage returned 200, title "UNICEF, for every child" (from `Websites/pipelines/claude/research/NPO.md`). The donate destination (help.unicef.org) returned 403 and was not inspected. Nav dropdown contents, footer column grouping and the country selector were not inspected.
- **Approval:** the project lead waived the Phase A approval stop and approved this source on 2026-11-10 (`source_approved_at` in `generation-metadata.json`).
- **Authoring note:** the 14 HTML pages share duplicated header/footer markup, as RULES.md allows. They were written by a throwaway scratch script outside the repo; the delivered site has no build step.

## Run locally
Open `index.html` in a browser (works from `file://`; no server, no network). All data is inline in `js/main.js`.

## Sitemap and page-to-source mapping
| Local page | Reference page |
| --- | --- |
| `index.html` | `/` |
| `who-we-are.html` | `/who-we-are` and `/who-we-are/transparency` (as sections) |
| `what-we-do.html` | `/what-we-do` |
| `reports.html` | `/reports` (Publications) |
| `stories.html` | `/stories` (press-release type filter stands in for the press centre) |
| `story-detail.html?id=…` | `/stories/five-years-girls-afghanistan-…` (article template; 6 sample stories) |
| `where-we-work.html` | `/where-we-work` |
| `take-action.html` | `/take-action` |
| `work-with-us.html` | `/take-action/work-with-us` |
| `emergency.html` | `/emergencies/nepal-flood` (emergency template, fictional "Karavel" event) |
| `faq.html` | `/about/frequently-asked-questions` |
| `donate.html` | external donate page (not inspected; simulated) |
| `subscribe.html` | `/take-action/subscribe` (inferred from homepage link) |
| `search.html` | `GET /search` header form |
| `404.html` | none (required by RULES.md) |

Not mapped: `/child-rights-convention` (omitted for scope).

## Feature checklist
- Header: utility bar (Press centre, language disclosure), logo, Donate button, search form, six-item primary nav with disclosure "mega" menus (inferred, not observed), mobile menu toggle.
- Footer: grouped links, legal/accessibility links, fictional-site notice.
- Breadcrumbs, local in-page nav, hero, alert banner, card grids, stats band, spotlight, promo links.
- Filter/search over inline data: reports, stories, country offices, opportunities, site search; empty states; query-string presets.
- Dialog (report summary), accordion with expand-all (FAQ), country detail panel.
- Forms with labels, hints, inline errors, error summary, focus management, demo success: donate, volunteer interest (intentional addition), newsletter.

## Sample data counts
6 stories, 8 reports, 14 country offices, 6 opportunities, 11 searchable pages, 7 FAQ items. Figures are invented.

## Simulation notes
Donation, volunteer and newsletter forms validate in the browser and show a labelled demo confirmation; nothing is sent, stored or charged. No card fields exist. Language links are plain text (no translations). Report "downloads" do not exist.

## QC gates (RULES.md section 9)
Automated run: `node Websites/tools/qc/qc.js Websites/nonprofit/claude/NPO-01` on 2026-11-11, pages=15 files=27 failures=0 warnings=0 (required files, JSON validity, links/assets, prohibited tech, remote requests, JS/console errors, landmarks/skip link/metadata, axe-core WCAG 2.0–2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll at 375px).

| Gate | Result |
| --- | --- |
| Technology | pass (qc.js; no framework, remote request or build step in the delivered files) |
| Completeness | pass (qc.js link/asset check; all 14 pages + 404 present) |
| Structure | pass (qc.js landmark and data-section/data-component check). Region order vs the reference is only partly verified (see fidelity-notes.md) |
| Interaction | pass: scripted Playwright flows, 22 checks, 0 page errors (see below) |
| Accessibility | partial: axe-core clean at 2 widths; no 375px overflow; focus/Escape flows scripted. Contrast, reduced motion, alt text and heading order were checked only by axe and code review |
| Traceability | pass (self-review of docs against files) |
| Scope | pass (14 pages, small sample data) |

Scripted flows checked: skip link first in tab order; mega menu open/Escape/focus return/one-open-at-a-time; language popover; mobile menu open/Escape; reports keyword, empty state, combined filters, dialog open/Escape/focus return; query-string preset; story detail by id; country search + detail focus; FAQ hash open + expand all; site search + empty; donate empty submit (summary focus, 3 errors), summary link focus, range/email errors, success with summary, restart; opportunity filter + prefill; volunteer errors; newsletter success.

**Not tested:** screen readers, 200% zoom/text resizing, a manual keyboard walkthrough of every page, Firefox/Safari, forced-colors mode, RTL rendering of the Arabic label, touch devices, manual contrast review. No claim of WCAG conformance is made; this is a WCAG 2.2 AA-oriented baseline only.

## Known limitations
Without JavaScript the filtered lists are empty; menus and accordions show all content. Only English. Mega-menu contents are inferred. Country figures are illustrative and not real statistics.
