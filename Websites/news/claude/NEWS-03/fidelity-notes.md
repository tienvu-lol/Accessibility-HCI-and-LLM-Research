# NEWS-03 fidelity notes

Source: https://www.npr.org/ (public broadcaster). **Basis for every "observed" statement below is the Phase A research block in `Websites/pipelines/claude/research/NEWS.md` (HTML markup read by an earlier research agent on 2026-11-10). The reference was not fetched or viewed again during generation, so visual design, spacing, colors and exact behavior were never observed and are not claimed.** All names, copy and images are original; "Larkspur Public Media" is fictional.

## Page mapping

| Local page | Reference page | Status |
| --- | --- | --- |
| `index.html` | `/` | Replicated structure: lead story with video playlist (previous/next), story cards with Listen modules, section blocks, player shelf. Approximated block order. |
| `news.html`, `national.html`, `politics.html`, `health.html`, `culture.html` | `/sections/news/`, `/national/`, `/politics/`, `/health/`, `/culture/` | Approximated: section heading, story list. The reference's real section layouts were not inspected. "Show more stories" is an **intentional addition** (inferred pattern). |
| `music.html` | `/music/` | Approximated: video promo (the reference has a Tiny Desk video promo) plus story list. |
| `podcasts.html` | `/podcasts-and-shows/` | Approximated directory. The text/topic filter is an **intentional addition**. |
| `daybreak-edition.html` | `/programs/morning-edition/` | Approximated program page with invented hosts and episodes. |
| `newsletters.html` | `/newsletters/` | Replicated as a signup page; checkbox group, validation and demo success are simulated. |
| `about.html` | `/about/` | Approximated; accordion layout and footer-linked topics (Ethics, Finances, Accessibility, Press, Corrections) are inferred. |
| `search.html` | `/search/?query=climate` | Simulated. The reference's results markup is client-rendered and was not found in the static HTML, so results are static sample data. Type filter and sort are **intentional additions**. |
| `article.html` | article page | Replicated: story title, byline, story-meta (date), share tools, topic tags, toggle caption. Related stories are an **intentional addition** (category-typical). |
| `audio-story.html` | audio story page | Approximated: audio module, transcript block (present only on audio stories in the reference). |
| `404.html` | none | Required by RULES.md. |

## Component mapping

| Reference component (observed in markup) | Replica | Status |
| --- | --- | --- |
| Main menu with mobile toggle (`navigation__toggle--open/--close`) | `[data-component='menu-toggle']` + `primary-nav` | Replicated as a disclosure under 900px |
| Four top items with submenus; featured and directory lists | `submenu` disclosures, News / Culture / Music / Podcasts & Shows | Replicated; item lists are renamed (fictional programs). Items without a local page open search. |
| Top links: Newsletters, About NPR, Press | same, "Press" opens `about.html` | Approximated |
| Search icon + dropdown | `search-toggle` + `search-dropdown` | Replicated; Enter submits to `search.html?q=` |
| Station-picker mount (empty in static HTML) | Station dialog with 4 fictional stations | Simulated; real behavior unknown |
| Donate mount | Donate button opening a simulated dialog | Simulated; the real donate flow was not inspected |
| Audio "Listen" modules with duration | `listen` buttons + demo player shelf | Simulated; no media, labeled demo |
| Video playlist with previous/next | `video-playlist` | Approximated (4 invented items, one visible at a time) |
| Player shelf (`player-shelf…`) | `media-player-shelf` | Simulated |
| Story card kinds (Congress, Only on NPR, Elections, National blocks) | Politics, Only on Larkspur, Elections, National | Approximated; "Congress" and "Book News" blocks omitted |
| Share tools, toggle caption, tags | `share-tools`, caption disclosure, `tag-list` | Replicated in concept. Share is reduced to Copy link. |
| Footer, 4 modules + legal strip | `site-footer` | Replicated groups; most links lead to `about.html` because no local page exists |

## Intentional additions (not observed in the reference)

Show-more on section pages, podcast filter, search type/sort controls, related-stories band, error summaries and inline errors on every form (required by the accessibility baseline), skip link, `data-*` instrumentation.

## Omitted

Climate section page, All Things Considered page, Donate page, real social links (Facebook/Instagram), NPR Shop / NPR Extra / Careers pages, consent/privacy-choices flow, "Text Only" version, any live data, audio and video files, the 23 Listen modules of the real home page (reduced to a handful).

## Unverified

Paywall or consent banners, nav dropdown item targets (not each opened in research), real search behavior, real station finder behavior, visual styling of the reference.

## Research-relevant observations

- Every menu panel is a disclosure button with `aria-expanded`; hover alone never opens a panel.
- The three highest-risk elements for assistive-technology comparison are the mega menu, the fixed demo player bar (which could obscure focused content; mitigated with `scroll-padding-bottom` and body padding) and the native `<dialog>` forms.
- Cards deliberately use decorative (`alt=""`) images since each headline link carries the meaning.
- Heading structure: one `h1` per page; blocks use `h2`; cards use `h3`; the home page `h1` is visually hidden because the reference home page was not seen to have a visible page title.
- Known decision: `<button>` elements named "Listen" include the story title in a visually hidden suffix so the visible label is contained in the accessible name.

## Interaction checks run

41 scripted Playwright (Chromium, `file://`) assertions passed with zero console errors: skip link focus and jump; submenu open/close, single-open and Escape focus return; search dropdown focus/Escape; support dialog empty-submit errors, summary focus, demo success, Escape and focus return; station dialog required select and label update; Listen opens/pauses/closes the demo player; playlist next; search results, empty-query error, empty state, type filter, sort; newsletter errors, summary-link focus, email-format error, demo success; podcast empty state and topic filter; show-more; article story swap; caption disclosure; accordion; 404; mobile menu, submenu and Escape order at 375px. These were scripted, not a human keyboard walkthrough.
