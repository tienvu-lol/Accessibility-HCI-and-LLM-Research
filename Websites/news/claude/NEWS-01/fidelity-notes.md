# NEWS-01 fidelity notes

Reference: https://www.theguardian.com/us (US edition of a UK national daily), as documented in the Phase A research block `Websites/pipelines/claude/research/NEWS.md` (NEWS-01), verified by HTTP 200 on 2026-11-10. **Everything below about the reference comes from those notes (observed markup and page titles). The reference was not re-opened, rendered or screenshot during this build, so visual details (spacing, colours, type, breakpoints) are unverified and were not copied.**

## Page mapping

| Local | Reference | Status |
| --- | --- | --- |
| index.html | /us | Approximated: section order follows the notes (top stories, US news, US politics, special report, in focus, features, long read, opinion, sport, more top stories, newsletters, what to read/watch/listen/play, relationships, take part). "Editorials" folded into the opinion front; "Well actually" omitted. |
| us-news / us-politics / world / business / technology / sport / opinion / culture / lifestyle | matching section fronts | Approximated: one lead card plus grid, sub-navigation, rail with tabs. Reference carousels and per-section sub-fronts not replicated. |
| newsletters.html | /email-newsletters | Approximated: six invented newsletters, one validated form. |
| podcasts.html | /us/podcasts | Approximated: four invented shows; no audio. |
| crosswords.html | /crosswords | Approximated: sample clues; no playable grid. Clue-of-the-day check is an intentional addition. |
| article.html | one dated article | Approximated: furniture from notes (byline with rel=author, section/tag labels, Related rich link, Most viewed, newsletter prompt, support prompt, `#comments` anchor). Copy is invented; the real article topic was not reused. |
| search.html | none (reference posts to an external search engine; `/search?q=` is 404) | **Intentionally added**: on-site results over local data. |
| 404.html | none observed | Added as required by RULES.md. |

## Components

| Component | Status | Notes |
| --- | --- | --- |
| Header: utility bar, search, pillar nav | Replicated (structure) | Print subscriptions / Newsletters / Sign in observed. Search posts to `search.html` instead of an external engine (approximated). |
| Expanded menu (five groups, "View all", secondary links) | Approximated | Reference toggles with a hidden checkbox; replica uses a button with `aria-expanded`, Escape to close, and per-group disclosures on mobile (inferred behaviour). Link set reduced; topics without a page become local search links. |
| Section sub-nav (`#sub-nav`) | Approximated | |
| Story cards (feature/news/review/comment variants) | Approximated | Two variants only (image card, text card). Images are decorative SVG placeholders. |
| Hide button on fronts | Replicated (observed in markup) | |
| Carousels | Omitted | Replaced by wrapping grids. |
| Most viewed | Replicated; **Latest tab intentionally added** | Tabbed switch was inferred in the notes. |
| Newsletter prompt, support prompt | Simulated | Inline forms/dialog with explicit demo labelling. |
| Print subscriptions, Sign in | Simulated | Dialogs, no accounts. |
| Comments | Approximated | Read-only sample list; reference comment system omitted. |
| Footer groups | Approximated | Section groups replicated; About/legal links open an "Outside this replica" dialog; social links, Guardian Labs, advertise links omitted. |
| Advertising slots, consent banner, paywall/support banners, live blogs, video, Wordiply, digital archive, Download the app | Omitted / unverified | Not checked on the reference per the notes; not implemented. |

## Intentional additions (not on the reference per the notes)

- On-site search page with section filter, sort and empty states.
- "Latest" tab; clue-of-the-day check; error summary and inline validation patterns; out-of-scope dialog for footer links.

## Rationale for deviations

- No external search, fonts, images or scripts: required by RULES.md section 2.
- Topic links become search queries so that no link is dead and no `href="#"` is used.
- Dates and bylines are fictional; stories are dated 5-9 Nov 2026 to feel current, not to claim real events.

## Research-relevant observations

- Heavy reliance on a hidden-checkbox menu in the reference (per notes); the replica uses a button-controlled disclosure, so keyboard and screen-reader behaviour differ from the reference by design.
- The home front is very long (many repeated Hide-able sections); the replica keeps the long-page pattern with 11 hideable fronts.
- A large menu with 60+ links is simplified to about 40 links across five groups plus secondary links.
