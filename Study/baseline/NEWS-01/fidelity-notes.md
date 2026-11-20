# NEWS-01 fidelity notes

Replica of the structure of **The Guardian US edition** (https://www.theguardian.com/us), verified 2026-11-10 by HTTP GET via curl, approved 2026-11-13. The reference is research metadata only. Everything on the replica is fictional: masthead "The Vellmoor Ledger", country "Orravia", all people, places, organisations and articles invented. The fictional-publication notice is on every page (see README).

## Page mapping (reference to replica)

| Reference page | Replica | Status |
| --- | --- | --- |
| /us (home) | index.html | replicated (structure and section order), approximated (content, no carousels) |
| /us-news | orravia.html ("Orravia news") | approximated |
| /world | abroad.html ("World news", imaginary countries) | approximated |
| /us/business | business.html | approximated, no market data |
| /us/technology | technology.html | approximated |
| /us/sport | sport.html | approximated, no scores or fixtures |
| /us/commentisfree | opinion.html | approximated |
| /us/culture | culture.html | approximated |
| /us/lifeandstyle | lifestyle.html | approximated |
| /email-newsletters | newsletters.html | simulated (form validates, nothing is stored or sent) |
| /us/podcasts | podcasts.html | simulated (Play buttons are labelled demos, no audio) |
| one dated article | article.html?id=a01..a33 | approximated; one static default plus JS render of the other 32 from inline data |
| (no equivalent) | search.html | intentional addition: the reference posts search to an outside engine and has no on-site results page |
| (no equivalent) | support.html | intentional addition, simulation only, standing in for the reference's support/print-subscription prompts |
| (none) | 404.html | required by Rules.md |

## Components

- **Replicated:** top utility bar; search affordance; masthead; primary nav with five groups (News, Opinion, Sport, Culture, Lifestyle) behind a disclosure button (reference uses a hidden checkbox; replica uses a button with aria-expanded and Escape support); section sub-nav; front sections with per-section Hide/Show buttons; hero/top story; card variants; article furniture (kicker, byline, related items, "Most viewed"); newsletter prompt; support prompt; footer groups.
- **Approximated:** the reference's carousels are rendered as plain card grids. "Latest" and "Most read" are shown as a tab pattern; the reference's "Most viewed" was observed but the tab switch is **inferred** in the research block, so the tabs are an intentional addition in that sense. The ranking is invented sample data and is labelled as such.
- **Intentional additions (labelled on the pages where visible):** on-site search with section filter and sort; per-section live text filter with empty state; membership demo form; podcast Play (demo) toggles.
- **Omitted, not present in the replica for lack of a fictional equivalent:** advertisement slots, comment counts and `#comments` anchors, consent banner (not checked in the reference), author pages (rel=author links), "Well actually", "Take part" beyond the support prompt, Wordiply.

## Not verified

The research block recorded that `/us/video`, `/info/about-guardian` and `/us/lifestyle` returned 404 during verification (the real lifestyle path is /lifeandstyle). Those proposed pages were **not mapped**. The `/search?q=` URL also returned 404 and was not mapped. I did not re-fetch the reference for this build; all structure comes from the approved research block. The consent banner and any paywall were never checked.

## Navigation pruning (convention: un-rebuilt targets are simply not linked; no stand-in page)

### A. Pruned for scope (ordinary scope decision)
Reference nav and footer targets not rebuilt: Print subscriptions, sign-in, Pictures, Video, Crosswords, Wordiply, Corrections, Tips, Digital Archive, About Us, Support us (replaced by the local demo page), Download the app, Guardian Weekly, Live events, Environment, Science, Soccer/NFL/NBA/MLB/MLS/NHL/WNBA/F1/Tennis/Golf (individual sport fronts), Film/Music/Books/Art & design/TV & radio/Stage/Classical/Games (individual culture fronts), Wellness/Fashion/Food/Recipes/Travel/Family/Home & garden/The Filter (individual lifestyle fronts), The Guardian view/Columnists/Cartoons/Opinion videos/Letters, footer: Help, Complaints & corrections, Contact us, SecureDrop, Privacy/Cookie/Tax/Terms, All topics, All writers, Advertise, Guardian Labs, Work with us, Accessibility settings, and all social links (these would be external).

### B. Omitted on policy (Fabricated-news guardrail, separate from scope)
US politics, Midterms 2026, US immigration (including the research block's example article about an enforcement incident and lawsuit), Ukraine, Middle East (war and conflict), Climate crisis (real-world current affairs), Money (financial advice), Health & fitness and Love & sex (health guidance), and any live-data widget (market tickers, scores, weather, polls). No real person, organisation, place or event appears. Article subjects are low-stakes evergreen fiction (see README).

## Research-relevant observations

- The reference is very dense (60+ nav links); the replica keeps the five-group disclosure but with fewer items, so navigation complexity is lower than the source.
- Datelines use an invented calendar ("Sample date 20 Bloomtide, Year 7") and invented places so a screenshot cannot be mistaken for a real edition.
