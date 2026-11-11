# NEWS-03 - Larkspur Public Media (fictional) replica

| Field | Value |
| --- | --- |
| Replica ID | NEWS-03 (category `news`, slot 3, stratum: public broadcaster or nonprofit newsroom) |
| Model group / model | claude / `claude-sonnet-5-5` (see `generation-metadata.json`) |
| Fictional branding | **Larkspur Public Media** (invented name, SVG mark and four invented stations; not a real broadcaster) |
| Approved source URL | https://www.npr.org/ |
| Source verification | 2026-11-10, HTTP GET via curl (`-A "Mozilla/5.0"`): 200 on the home page, title "NPR - Breaking News, Analysis, Music, Arts & Podcasts : NPR", and 200 on all inventory pages; recorded in `Websites/pipelines/claude/research/NEWS.md`. Not re-fetched during generation. |
| Source approval | 2026-11-10. **The project lead waived the Phase A approval stop** and approved this reference directly. |
| Protocol | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 at commit a07e70e (branch websites/claude-replicas) |

This is a static, reference-inspired replica for an accessibility/usability research dataset. It is **not** a pixel-perfect copy and makes no claim of WCAG conformance. Every headline, name, number and station is invented; nothing is real news. Nothing is stored or sent anywhere (the chosen station is kept in `localStorage` only).

## Run locally

Open `index.html` in a modern browser. It works from `file://`: no server, build step or network. All data is inline (search records in `js/main.js`, everything else in the HTML).

## Sitemap (14 pages + 404)

| File | Page | Reference page it maps to |
| --- | --- | --- |
| `index.html` | Home | `/` |
| `news.html` | News section | `/sections/news/` |
| `national.html` | National | `/sections/national/` |
| `politics.html` | Politics | `/sections/politics/` |
| `health.html` | Health | `/sections/health/` |
| `culture.html` | Culture | `/sections/culture/` |
| `music.html` | Music | `/music/` |
| `podcasts.html` | Podcasts & Shows directory | `/podcasts-and-shows/` |
| `daybreak-edition.html` | Program page (stands in for Morning Edition) | `/programs/morning-edition/` |
| `newsletters.html` | Newsletter signup | `/newsletters/` |
| `about.html` | About, policies, contact (accordion) | `/about/` |
| `search.html` | Search with filter and sort | `/search/?query=climate` |
| `article.html` | Text article page | `/2026/11/09/g-s1-151625/...` (article) |
| `audio-story.html` | Audio story with player and transcript | `/2026/11/09/nx-s1-6034945/...` (audio story) |
| `404.html` | Not found | required by RULES.md |

Other files: `css/styles.css`, `js/main.js`, `assets/*.svg` (7 placeholders), `component-inventory.json`, `generation-metadata.json`, `fidelity-notes.md`, this README. 28 files in total.

Reference pages not given their own page: Climate section (menu links open search for "climate"), All Things Considered (a menu item opens search), the Donate page (replaced by a simulated dialog). Menu items without a page open `search.html?q=<term>`.

## Feature checklist

- Header: skip link, wordmark, station picker (dialog), Donate (simulated dialog), search dropdown, 4 mega-menu disclosures (News, Culture, Music, Podcasts & Shows) each with featured and directory lists, plus Newsletters / About / Press links; mobile "Menu" disclosure below 900px; Escape closes submenu, search and menu in turn.
- Home: lead story beside a 4-video "Watch" playlist with Previous/Next, story cards with demo "Listen" buttons, Top stories, Politics, Only on Larkspur, Elections and National blocks, newsletter promo.
- Section pages: breadcrumb, local nav (News), story grid with "Show more stories".
- Article: breadcrumb, byline, dateline, copy-link share tool, caption disclosure, topic tags, donate prompt (simulation), related stories. `article.html?story=<slug>` swaps headline/summary/section/date/byline from inline data.
- Audio story: Listen button + demo player bar, transcript disclosure.
- Search: query from the URL or form, type filter, relevance/newest sort, count status, empty state, validation on empty query.
- Podcasts: text + topic filter with live count and empty state; newsletters: required checkbox group + email with error summary; about: 8-item accordion.
- Footer: four link groups and legal strip; 404 page with search and routes home.

## Sample data counts

28 stories, 10 programs/podcasts in the search data, 4 newsletters (42 search records), 10 podcast cards, 5 episodes, 4 videos, 8 accordion entries, 4 stations.

## Interaction simulation notes

- Listen / Watch buttons open a bottom **demo player bar** that says no audio or video plays; there are no media files.
- Donate and the article support prompt open a dialog that says it is a simulation; Give (demo) shows a demo-success message and takes no data.
- Newsletter signup shows a demo-success message; nothing is subscribed or stored.
- Station picker uses a list of 4 fictional stations and remembers the choice in `localStorage`.
- Copy link uses the Clipboard API and shows a fallback message where the browser blocks it (e.g. some `file://` contexts).
- All story cards without a dedicated page open `article.html?story=<slug>`, which shares one placeholder article body (labeled on the page).

## QC results (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/news/claude/NEWS-03` on 2026-11-11 (UTC): `pages=15 files=28 failures=0 warnings=0` (axe-core at 1280px and 375px, link/asset audit, remote-request and JS-error checks).

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited file types or libraries, no remote requests at runtime; no build step |
| 14 Completeness | pass | qc.js: all required files, JSON valid, 0 broken links/assets; 14 mapped pages + 404 present |
| 15 Structure | pass (automated) | qc.js: lang, skip link, `main#main-content`, data-section/data-component on every page; landmarks checked by axe |
| 16 Interaction | pass | 41 scripted Playwright checks over `file://` (menus, dialogs, forms, search, filters, player, show-more) with 0 console errors; see fidelity-notes.md |
| 17 Accessibility review | partial pass | axe-core 4.14 wcag2a/2aa/21a/21aa/22aa + best-practice, 0 violations at 1280px and 375px; no horizontal scroll at 375px. Keyboard behavior only exercised through scripts |
| 18 Traceability | pass | inventory, sitemap and notes were produced from the delivered files |
| 19 Scope | pass | 14 pages (inside the 8-15 brief); additions are listed in fidelity-notes.md |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver/TalkBack), a human manual keyboard walkthrough, 200% / 400% zoom and text-spacing overrides, forced-colors mode, other browsers than Chromium, real touch devices, color-contrast beyond what axe computes, reduced-motion behavior in practice (the CSS rule exists), and the dialogs' behavior with assistive technology. No WCAG conformance claim is made.

## Known limitations

- Story detail pages are two real pages plus one parameterized placeholder; most stories share one body text.
- Search and filters work only over the inline sample records. Search needs JavaScript (noscript message shown).
- No consent banner, social links, station finder map, live player or donate flow were replicated (see fidelity-notes.md).
- The reference was fetched only for HTTP status and title in Phase A research; its look and content were not copied.
