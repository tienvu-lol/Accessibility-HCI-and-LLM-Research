# NEWS-03 - Quillon Valley Public Media (fictional)

- **Replica ID:** NEWS-03 (category `news`, slot 3, stratum: public broadcaster / nonprofit newsroom), model group `claude`.
- **Fictional branding:** "Quillon Valley Public Media" (QVPM), in the invented Republic of Veloria / province of Ardenmere. All programmes, stations, call signs, people, places and stories are invented.
- **Approved source:** https://www.npr.org/ - verified 2026-11-10 by HTTP GET via curl (research record: `Websites/pipelines/claude/research/NEWS.md`, block NEWS-03); approved by the project lead 2026-11-13 (`approval-2026-11-13.md`). The source name appears only here and in the research documentation.

## Fictional-publication notice (read first)
This is the most important property of the replica. **Every page, including `404.html`, carries a visible fictional-publication notice inside the masthead** ("Fictional broadcaster. Every story, byline and quote on this site is invented sample content ... Nothing here is real news."). Story, audio-story and programme pages repeat it as a bordered box **directly above the headline**, before any body copy. The footer carries it a third time. All dates are in 2099 and labelled "Sample date". No breaking-news or alert banner exists, no live-data widget (weather, markets, scores, polls) exists, and no audio file exists.

## Run locally
Open `index.html` in any browser (works from `file://`; no server, no build, no network). Story, audio-story and programme pages are driven by `?id=` query strings (for example `story.html?id=s13`) from inline data in `js/main.js`; without JS they show a default item.

## Sitemap (15 pages)
`index.html` home; `news.html`, `land-sea.html`, `culture.html`, `music.html` section fronts; `story.html` (text story, id-driven); `audio-story.html` (silent demo player + sample transcript, id-driven); `shows.html` programme listing; `program.html` (programme + demo episode list, id-driven); `stations.html` station finder; `newsletters.html`; `donate.html`; `search.html`; `about.html`; `404.html`.

## Page-to-source mapping
| Local | Reference page (see research block) |
|---|---|
| index.html | https://www.npr.org/ |
| news.html | /sections/news/ (also stands for /sections/national/) |
| land-sea.html | /sections/climate/ (approximated with an invented low-stakes nature topic) |
| culture.html | /sections/culture/ |
| music.html | /music/ |
| shows.html | /podcasts-and-shows/ |
| program.html | /programs/morning-edition/ and /programs/all-things-considered/ (one invented template) |
| story.html | article variant (item 15) |
| audio-story.html | audio story with player and transcript (item 16) |
| newsletters.html | /newsletters/ |
| about.html | /about/ |
| search.html | /search/?query=... (static approximation) |
| donate.html | /donate/ (simulation) |
| stations.html | station-picker mount (intentional addition as a page; mount is empty in static source) |

## Features
Primary nav with four submenu disclosures and mobile menu; header search disclosure; story cards; Latest / Most read tabs (correct tab pattern); section filters with polite status and empty state; id-driven story pages with byline, dateline, tags, related items; silent demo audio player (play/pause, back/forward 15 s, speed, seek slider; never autoplays); sample transcript; programme list and episode list; station finder; newsletter form and donate form with inline errors, error summary and focus management; search over inline data with empty state; 404.

## Sample data counts
26 invented stories (8 news, 6 land and sea, 6 culture, 6 music; data in `js/main.js`), 12 of which have silent demo audio pages; 7 programmes; 8 stations; 4 newsletters.

## Simulation notes
Newsletter, donate, share, station choice and the audio player are demonstrations. Nothing is stored, sent or paid; success messages say so. Station choice lives only in page memory.

## QC gates (Rules.md section 9), from `node Websites/tools/qc/qc.js Websites/news/claude/NEWS-03` (final run: `pages=15 files=28 failures=0 warnings=0`)
| Gate | Result |
|---|---|
| Technology | pass (qc.js: no prohibited files, no remote requests at 1280 and 375) |
| Completeness | pass (qc.js link/asset audit; all required files present) |
| Structure | pass (landmarks, skip link, data-section/data-component; one h1 per page checked by grep) |
| Interaction | pass for the flows listed below, scripted with Playwright chromium |
| Accessibility | **partial**: axe-core rules at 1280px and 375px, no horizontal scroll at 375px, scripted keyboard checks. No manual screen reader, zoom, contrast-tool or voice-control testing. Not a conformance claim. |
| Traceability | pass (inventory generated from the actual pages) |
| Scope | pass |

Scripted flows checked: skip link first focus; submenu open and Escape; tab arrows, Home, focusable tabpanel; header search and results; search empty state; section filter and empty state; newsletter errors, summary focus, link-to-field, success; donate errors and success; audio demo play/forward/seek by keyboard and no media element; id-driven story; unknown id redirects to 404; station filter and selection; mobile menu and Escape.

## Not tested
Screen readers; browsers other than Chromium; reduced-motion rendering (styles present, not exercised); 200% zoom/text resizing; manual contrast measurement beyond axe; print; every `?id=` combination (each of the 26 ids was not individually opened).

## Known limitations
Story, audio-story and programme pages rely on JS for items other than the default; the no-JS fallback shows only one item and tabs show only the first panel. Header search and station label are not persisted between pages.
