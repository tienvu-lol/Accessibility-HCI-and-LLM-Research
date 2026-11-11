# FASH-01 — Fable & Hem (fictional fashion magazine replica)

| Field | Value |
| :-- | :-- |
| Replica ID | FASH-01 (category `fashion`, slot 1, model group `claude`) |
| Stratum | Content-driven (Fashion) / fashion magazine / editorial publisher |
| Fictional brand | **Fable & Hem** (original name, wordmark and copy; no real logos or prose) |
| Approved source URL | https://www.harpersbazaar.com/ (research metadata only) |
| Source verification | 2026-11-10, HTTP GET with curl during Phase A research (`Websites/pipelines/claude/research/FASH.md`): home page returned 200 with a `<title>`; all 15 listed interior URLs returned 200. Page HTML was inspected but no JavaScript was run, so dropdown contents are unobserved. |
| Source approval | 2026-11-10. **The project lead waived the Phase A approval stop** and approved this reference; this run did not re-verify the live site. |
| Generation | `claude-sonnet-5-5`, autonomous agent run (see `generation-metadata.json`) |

## Run locally

Open `index.html` in a browser. No server, build step, network access or install is needed (`file://` works). All data is inline in `js/main.js`; there is no `fetch()`.

## Technology

Semantic HTML5, one `css/styles.css`, one `js/main.js` (vanilla JS), local SVG placeholders in `assets/`, system fonts. No frameworks, libraries, CDNs, web fonts, trackers or backends. The HTML pages and `js/main.js` were produced with a throwaway Node generator that is **not** part of the delivered site (the duplicated header and footer are therefore identical across pages); the output is plain static files.

## Sitemap and page-to-source mapping

| Local page | Reference page (harpersbazaar.com) |
| :-- | :-- |
| `index.html` | `/` home |
| `fashion.html` | `/fashion/` |
| `trends.html` | `/fashion/trends/` |
| `fashion-week.html` | `/fashion/fashion-week/` |
| `beauty.html` | `/beauty/` |
| `celebrity.html` | `/celebrity/` |
| `cover-stories.html` | `/cover-stories/` |
| `culture.html` | `/culture/` |
| `shopping.html` | `/shopping/` |
| `weddings.html` | `/wedding/` |
| `article.html` | an article page (`/fashion/a74389922/...`) |
| `author.html` | `/author/<id>/<slug>/` |
| `newsletter.html` | `/email/harpersbazaar-newsletter` |
| `search.html` | `/search/?q=dress` |
| `sitemap.html` | `/sitemap/` |
| `info.html` | footer company and legal links (**intentional addition**, condensed into one page) |
| `404.html` | required by RULES.md (not mapped to a reference page) |

That is 15 mapped reference pages plus 2 additions: 17 HTML files.

## Feature checklist

- Header with utility bar (Other editions disclosure, Newsletter, Sign in, Subscribe), wordmark, search, primary nav with per-section submenu buttons and a More menu; mobile Menu button opens a side-panel dialog with accordions.
- Home section order follows the reference's observed order: top stories, Fashion, Beauty, Celebrity News, Cover Stories, From the Magazine, Shopping, Film & TV/Culture, Trends, Runway Report, Podcast, More Stories with pagination (Royals omitted).
- Section pages with breadcrumbs, lead story, paginated story lists; trends page with topic filter chips and an empty state.
- Story page (`article.html?story=ID`), author page (`author.html?id=ID`), search with relevance/newest sort and section filter, newsletter form, demo sign-in dialog, shopping page with category filter and sort.
- Intentional additions: runway lookbook carousel on `fashion-week.html`; `info.html`; "Footwear" filter chip that has no matching stories (to show the empty state); a contributor with no stories (`author.html?id=a5`).

## Sample data counts

28 stories, 5 authors (one with no stories), 8 products, 6 SVG art placeholders, 1 portrait placeholder, 1 favicon. 17 HTML pages.

## Interaction simulation notes

- Newsletter, sign-in and the home sign-up form are **demos**: they validate, then show a "Demo complete" panel. Nothing is sent or stored.
- Shopping buttons ("View at retailer (demo)") only show a status message. Nothing can be bought. The Other editions list is plain text, not links.
- Search, filters, sort and paging run over the inline sample data. Only the default story (`tailoring-decade`) has its own body text; other `?story=` values swap the headline, summary, byline and art, and the page says the body is shared sample copy.
- Dropdowns open on click/keyboard only (no hover); the reference's behavior is unobserved.

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/fashion/claude/FASH-01` on 2026-11-11 (UTC): `pages=17 files=31 failures=0 warnings=0`. It covers required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0–2.2 A/AA + best-practice tags) at 1280px and 375px, and horizontal scroll, on every page. A separate scripted Playwright run (Chromium, desktop plus 375px, script kept outside the repo) exercised the flows listed below.

| Gate | Result | Basis |
| :-- | :-- | :-- |
| 13 Technology | pass | qc.js prohibited-tech and remote-request checks; no `fetch`, frameworks or CDNs; JS requests made no remote calls |
| 14 Completeness | pass | qc.js required files, broken link and asset checks |
| 15 Structure | pass (by inspection + qc.js) | landmarks, skip link, `data-section`/`data-component` present; section order compared to the Phase A notes, not to a fresh visit |
| 16 Interaction | pass (scripted) | scripted flows: skip link, submenu + Escape, side panel + Escape, sign-in/newsletter validation, summary link focus and demo success, header/page search, empty states, pagination, filters, sort, demo toast, carousel, mobile search disclosure |
| 17 Accessibility review | partial | axe-core automated scan passed (above); scripted focus/keyboard checks for menus, dialogs and forms. Manual items below not tested |
| 18 Traceability | pass | this README, `fidelity-notes.md` and `component-inventory.json` were written from the generated files; component page lists were scanned from the HTML |
| 19 Scope | pass | no framework, no extra features beyond the labeled additions |

**Not tested:** screen readers (NVDA, JAWS, VoiceOver, TalkBack); 200% / 400% zoom and text-spacing overrides; a full manual keyboard walkthrough of every page; Firefox and Safari; real touch devices; forced-colors mode; manual color-contrast review beyond axe; reduced-motion behavior beyond the CSS rule (the only motion is smooth scroll after paging, disabled when the preference is set); print styles. This is a WCAG-oriented baseline, **not** a conformance claim.

## Known limitations

- Reference submenu items were not in the static HTML, so submenu contents are inferred and link to local pages or searches.
- Only one story has real body text. Tracking, ads and personalization on the reference are intentionally omitted.
- Shop links, editions and sign-in are demos. Pagination and filters reset on reload (no URL state, except `?q=`, `?section=`, `?sort=`, `?cat=`, `?story=`, `?id=`).
- The Politics and Royals areas from the reference are omitted.
- Smooth scroll after changing page is a small motion effect; it respects `prefers-reduced-motion`.
