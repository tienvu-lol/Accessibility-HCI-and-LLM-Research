# NEWS-03 fidelity notes

Source: https://www.npr.org/ (verified 2026-11-10 via curl, approved 2026-11-13). Observations below come from the research block only; this build re-read nothing new. This replica is reference-inspired and makes no pixel-fidelity claim.

## Replicated (structure and patterns from the research block)
- Header: main menu with mobile toggle, search dropdown, station-picker mount, donate mount, four top items with submenus (News, Culture, Music, Podcasts & Shows) plus Newsletters and About links.
- Home order: lead story with side stories, story cards with "Listen" modules, section blocks, then promos.
- Article page: title, byline, story-meta (date, share tools, topic tags), related items; audio story with player and transcript.
- Footer: four modules (Read & Listen, Connect, About, Get Involved) and a legal strip.

## Approximated
- Search results: **the reference's search-results markup was never observed** (it appeared to be client-rendered, so it was absent from static HTML). The results list, scope select and empty state here are invented from general patterns.
- Climate section -> "Land & Sea" with invented shoreline, garden and observatory topics.
- Programme page: one template stands in for two reference programme pages.
- Latest / Most read tabs: included because the task asked for them; the research block does not record such a tab group on the reference, so treat them as an addition.
- Wordmark and colours are original.

## Simulated
Newsletter signup, donate (made-up currency "veloras"), share button, station choice, audio player. Each is labelled as a demo on the page.

## Intentionally added
Station finder as its own page (reference has only an empty mount); section filters; fictional notices in masthead, above story headlines and in footers; 404 page; breadcrumbs.

## Omitted
**Policy-driven omissions (fabricated-news guardrail), kept separate:**
- Sections and blocks: Politics, Elections, Health, Business, Race, and the home "Congress / Politics / Elections / National" blocks (subject matter excluded as harmful when fabricated).
- Video lead with WATCH promo and vertical video playlist (no simulated broadcast media).
- Any breaking-news or alert banner; any live-data widget (none existed to copy).
- Real programme names, real station names, real people (all programmes, hosts, stations and call signs are invented).
- Social-network links (Facebook, Instagram) and third-party mounts (real brands).
- Real audio: no media files; transcript is invented text.

**Scope prunes (ordinary, not policy):**
- News submenu: National, World, Science (no local page; National/World folded into the News front).
- Culture submenu: Movies, Television, Pop Culture, Food, Art & Design, Performing Arts, Gaming (one Culture front only).
- Music submenu: New Music Friday, All Songs Considered, Music Features, Live Sessions.
- Podcasts & Shows submenu: Weekend Edition, Here & Now, and the other named programmes beyond four invented ones; "More Podcasts & Shows" (the full list is shows.html).
- Top links: Press.
- Footer: Public Editor, Corrections, Transcripts, Contact & Help, Diversity, NPR Network (replaced by Station network), Ethics, Finances, Sponsor, Careers, Shop, Extra, Terms of Use, Privacy, Your Privacy Choices, Text Only.
- Section blocks: Book News & Features, Only on NPR.
- Consent banner and tag-manager behaviour (not observed, not built).
Per the fixed convention, none of these is linked and no stand-in page exists.

## Unverified
Station picker and donate-flow behaviour on the reference; consent banner; player behaviour beyond markup classes.

## Research observations
Public-broadcaster fronts rely on disclosure-heavy mega menus and many repeated card links; in this replica every card heading is a link, which makes link lists long for keyboard users.
