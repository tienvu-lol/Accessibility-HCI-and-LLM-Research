# FASH-01 fidelity notes

Replica of the structure of the approved source (W Magazine, https://www.wmagazine.com/, verified 2026-11-12 by HTTP GET via curl, approved 2026-11-13). The replica is an invented magazine, **The Weft Review**. No claim of pixel-perfect or exhaustive reproduction is made.

## Evidence limits (from the research block)
- Header and nav structure were read from raw HTML only; the reference was **never rendered in a browser**. All nav behaviour (flat link row, mobile disclosure, active-link marking, Escape to close) is **inferred, not observed**. The only observed header facts: a primary link set, a search form (`action="/search"`, `type="search"`, labelled), and no dropdown items in the raw HTML.
- Hero layout, any rotating lead or carousel, card proportions and typography were not observed; they are approximated.
- The `/latest` page title was not captured; the local title "Latest" is our own.
- The author page was not found in the reference, so none was built (bylines are plain text).
- Reference imagery is third-party editorial photography; the replica uses abstract SVG only.

## Page mapping
| Reference URL | Local page | Status |
|---|---|---|
| / | index.html | approximated: lead story, top stories, section strips, issue promo, newsletter band (order inferred) |
| /fashion | fashion.html | replicated as section card grid; filter bar is an intentional addition |
| /culture | culture.html | as above |
| /travel | travel.html | as above |
| /video | video.html | approximated; cards only, no playback (labelled demo) |
| /latest | latest.html | approximated; filters are an intentional addition |
| /wyouth | nextwave.html | approximated, renamed (invented "Next Wave") |
| /originals-issue-2026 | issue.html | approximated, renamed "The Makers Issue" |
| /newsletter | newsletter.html | simulated form |
| /fashion/<slug> article | article.html (static, with gallery) and story.html?id= (JS-rendered from inline data) | approximated |
| /search?q= | search.html?q= | simulated over inline data; works from file:// |
| (none) | 404.html | required by protocol |

12 reference pages mapped to 12 local pages plus 404.html (13 HTML files). `story.html` and the `article.html` gallery have no 1:1 reference page; the article template covers reference page 11.

## Replicated, approximated, simulated
- Replicated (from raw HTML evidence): primary link set (Fashion, Culture, Travel, Video, WYouth-equivalent, Originals-issue-equivalent, Latest, Newsletter); header search form posting `q`; section pages as headline-card grids; special-issue landing page; newsletter page; article page.
- Approximated: everything visual, section order on home, hero treatment.
- Simulated: search (client-side over ~31 inline stories), newsletter (validation and a success message that says nothing is stored or sent).

## Intentional additions (not observed on the reference)
Breadcrumbs; keyword/topic/section/sort filter bars with empty states; a non-autoplaying image gallery with lightbox on the article page (the research block only says a lead or gallery may rotate, which is unconfirmed); a fictional-publication note in the masthead of every page; a dynamic `story.html` template so that every card has a destination; skip link and reduced-motion handling beyond what the reference was shown to have.

## Pruned for scope (ordinary prunes, not linked anywhere)
- Subscribe link to an external dragonforms.com page (external subscription flow, would imply payment).
- Footer links to Advertise, DMCA, Privacy, Terms and California Privacy Notice (all external bdg.com targets).
- No dropdowns were built: none were observed in the raw HTML.
- No shared stand-in or `not-replicated.html` page is used; pruned targets are simply absent.

## Omitted on content policy (kept separate from scope prunes)
- **Beauty** section (`/beauty`): the stratum guardrail forbids appearance, skin, hair and cosmetic-efficacy content, so the section is not rebuilt and not linked.
- Real-person coverage: the reference's article is about a named real celebrity; the replica's article is about an invented mill. No real people, brands, magazines, events or places appear anywhere.
- Shop-this-look and affiliate links: not present in the evidence, none added; no prices, cart or checkout.

## Content notes
All people (bylines and one interviewee), brands (Hollowbrook Mills, Atelier Nimbrel, Maison Corvane, Pellam & Roe Trims, Studio Aldermere, Saltmarch Dye Works), places (Port Valmere, Kestrelmouth, Saltmarch, Brannoch, Anselbridge, Tolliver Quay), events (Meridian Cloth Week, the Spindle Prize) and the magazine name are invented. Copy is original and about cloth, craft and process only. Dates are sample data in 2031. Images are 12 abstract SVG compositions plus a favicon; alt text states the actual composition. Card thumbnails are marked decorative (empty alt) because the headline link carries the meaning.

## Research-relevant observations
Cards use a stretched-link pattern (single link per card, image decorative) and an explicit `ul role="list"`. The gallery is a "carousel" role-description group of slides with a polite counter; there is no autoplay at all, so no pause control is needed.
