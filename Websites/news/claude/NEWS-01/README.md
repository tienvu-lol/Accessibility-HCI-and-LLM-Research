# NEWS-01 — The Larkfield Dispatch (US edition)

| Field | Value |
| --- | --- |
| Replica ID | NEWS-01 (slot 1, model group claude) |
| Category / stratum | news / national daily newspaper |
| Fictional branding | **The Larkfield Dispatch**, "US edition". Invented name, invented placeholder logo (`assets/logo.svg`), invented stories and people. Not affiliated with any real publication. |
| Approved source URL | https://www.theguardian.com/us (reference used for structure only; no logos, text or media copied) |
| Source verification | 2026-11-10, HTTP GET via `curl -sSL -A "Mozilla/5.0"`; home page returned 200, title "Latest news, sport and opinion from the Guardian". Recorded in `Websites/pipelines/claude/research/NEWS.md` (NEWS-01 block). Status: **verified** (not re-fetched during this run). |
| Source approval | 2026-11-10. **The project lead waived the Phase A approval stop** and approved the reference above. |
| Protocol | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 |

## Run locally

Open `index.html` in a browser (double-click works; no server, build step or network needed). All data is inline in `js/main.js`; there is no `fetch()`.

## Sitemap and page-to-source mapping

| Local page | Reference page (https://www.theguardian.com/...) |
| --- | --- |
| `index.html` | `/us` (US front) |
| `us-news.html` | `/us-news` |
| `us-politics.html` | `/us-news/us-politics` |
| `world.html` | `/world` |
| `business.html` | `/us/business` |
| `technology.html` | `/us/technology` |
| `sport.html` | `/us/sport` |
| `opinion.html` | `/us/commentisfree` |
| `culture.html` | `/us/culture` |
| `lifestyle.html` | `/us/lifeandstyle` |
| `newsletters.html` | `/email-newsletters` |
| `podcasts.html` | `/us/podcasts` |
| `crosswords.html` | `/crosswords` |
| `article.html` | one dated article page (`?id=s01` default; `?id=s02`..`s40` re-render other sample stories) |
| `search.html` | **intentional addition**: the reference posts search to an external engine, so it has no on-site results page |
| `404.html` | required by RULES.md |

That is 14 reference-mapped pages plus search and 404 (16 HTML files).

## Feature checklist

- Header: utility bar (Print subscriptions, Newsletters, Sign in), search form, five pillar links, "All sections" expanded menu (five groups, "View all" per group, secondary links); groups are aria-expanded disclosures below 740px.
- Section sub-navigation on section pages and the article.
- Home fronts in the reference order: top stories, US news, US politics, special report, in focus, features, the long read, opinion, sport, more top stories, newsletter prompt, what to read/watch/listen/play, lifestyle, take part. Each card front has a Hide/Show button (observed on the reference).
- Latest / Most read tabs (Most read observed on the reference; **Latest tab is an intentional addition**).
- Article: kicker, headline, standfirst, byline with `rel="author"`, dateline, date, read time, placeholder figure with caption, topics, related list, newsletter prompt, support prompt, sample comments, rail.
- Client-side search over the 40 sample stories with section filter, sort, empty state and no-query state.
- Newsletter sign-up with checkbox group and email validation, error summary, inline errors, focus management, demo success.
- Native `<dialog>` modals: sign in (demo), support / print subscriptions (simulation), out-of-scope notice for footer links without a local page.
- Podcast show/episode disclosures, crossword sample clues and a working clue check.
- 404 page with routes back to the front page and search.

## Sample data counts

40 stories across 9 sections (3 to 5 per section page), 6 newsletters, 4 podcast shows with 8 episodes, 3 puzzle cards, 3 sample comments, 5 most-read and 5 latest entries, 3 demo dialogs.

## Interaction simulation notes

- Sign in, support / print subscriptions, newsletter sign-ups and "Take part" are **simulations**: nothing is sent, stored or charged; each success message says so.
- Topic links in the menu and footer (for example Climate crisis, Soccer, Film) open `search.html?q=...` over the local sample set. Reference topics with no local page are therefore search shortcuts, not separate pages.
- Footer "About" links (About us, Help, Contact, Privacy, etc.) open an "Outside this replica" dialog instead of linking nowhere.
- Comments are read-only sample content. Podcast audio and interactive crossword grids are not implemented.

## Known limitations

- Layout and information architecture are approximations from the research notes, not pixel replicas; the reference's carousels, advertising slots, consent banner, paywall, live blogs, video and the ~60-link nav were not replicated in full (see `fidelity-notes.md`).
- Only one article page is statically written; other stories are rendered by JS from inline data (without JS they are not reachable, and search shows a "needs JavaScript" notice).
- Dates in the sample stories are fictional and fixed.
- Pages are duplicated HTML per page (no includes), so navigation markup is repeated by design.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/news/claude/NEWS-01` on 2026-11-11 (UTC): `pages=16 files=29 failures=0 warnings=0` (axe-core WCAG 2.0-2.2 A/AA + best-practice tags at 1280px and 375px for every page in its default state, plus required files, JSON validity, link/asset check, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, horizontal scroll at 375px).

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology check | **pass** | qc.js: no prohibited file types/libraries, no remote requests, no `fetch`/XHR warnings; plain HTML/CSS/JS, no build step. |
| 14 Completeness check | **pass** | qc.js: all required files present, no broken links or assets. 16 HTML pages. |
| 15 Structure check | **pass (automated + self-review)** | qc.js: `<main id="main-content">`, skip link, `lang`, `data-section`/`data-component` on every page. Region order compared with the research notes only; the reference was not re-opened. |
| 16 Interaction check | **pass** | A scripted Playwright run (28 assertions; scratch script, not committed) exercised: skip link, menu open/Escape/focus return, mobile group disclosure, tab arrow keys, Hide/Show, dialog open/validate/Escape/focus return, take-part and newsletter validation, error-summary link focus, search (results, empty, filter, no query, header search), article by id and not-found, clue check. All 28 passed. |
| 17 Accessibility review | **partial: automated pass, manual not tested** | axe-core is clean in the default state of every page at both widths (qc.js) and in 33 extra scripted states (menu open, mobile groups expanded, second tab, hidden section, error states, open dialogs, search states, article variants), 0 violations. See "Not tested". |
| 18 Traceability check | **pass (self-review)** | This README, `fidelity-notes.md` and `component-inventory.json` were written from the generated files; component page lists were computed from the HTML by script. |
| 19 Scope check | **pass (self-review)** | 14 reference pages + search + 404; 40 sample stories; no libraries. |

This is a WCAG 2.2 AA-**oriented** baseline. It is not a conformance claim and has not been audited.

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack): not tested.
- Manual full-keyboard walkthrough of every page: not done; only the scripted keyboard flows listed above.
- 200% / 400% zoom and text-spacing overrides: not tested (only 375px reflow via qc.js).
- Windows High Contrast / forced colors, dark mode: not tested.
- `prefers-reduced-motion`: CSS rule present; no animations exist; not exercised in a browser.
- Browsers other than Chromium (Playwright headless shell): not tested.
- Colour contrast beyond what axe-core evaluated: not manually checked; hover states and SVG placeholders not checked.
- Horizontal scroll at 375px with the menu or a dialog open: not checked (qc.js checks the default state).
- Touch target sizes beyond what axe reports: not measured.

## Generation provenance

See `generation-metadata.json`. Model claude-sonnet-5-5 via a pi-subagents worker run (`build-NEWS-01`), no human edits. The HTML pages, SVGs and the `js/main.js` data block were emitted by a throwaway local script kept outside the repository; the delivered site contains no build step.
