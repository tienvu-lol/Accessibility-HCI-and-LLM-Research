# Fidelity notes: FASH-02 (Vesperine)

Source of observations: the Phase A research inventory (`Websites/pipelines/claude/research/FASH.md`, block FASH-02), gathered by curl on 2026-11-10 from https://www.toryburch.com/en-us/. This build run did **not** re-fetch the reference or take screenshots, so everything below is based on that inventory (HTML-level observations), not on a visual comparison. No pixel-level fidelity is claimed.

Labels: **replicated** (structure/pattern observed in the inventory), **approximated** (pattern followed, details invented), **simulated** (front-end stand-in for a service), **added** (not in the reference), **omitted**, **unverified**.

## Page mapping

| Reference page (inventory) | Local page | Status |
| --- | --- | --- |
| Home `/en-us/` | `index.html` | approximated: hero, category entry points, editorial teaser. The reference home is a commerce page (about 908 KB); only the shape of its entry points was kept |
| Tory Daily home | `journal.html` | replicated: sub-nav, search, card grid with Read More |
| Style / Culture / Travel / Issues landings | `journal-style.html`, `journal-culture.html`, `journal-travel.html`, `journal-issues.html` | replicated as category listings; sort control is added |
| Archive | `journal-archive.html` | approximated: the reference archive's exact controls are unverified; section/year/keyword filters are an addition |
| Blog post `bpid=742601` (runway report) | `article.html` | replicated: article with byline, share, related; `?bpid=` swap mirrors the reference's id-in-query pattern |
| Blog post `bpid=742204` (campaign) | `campaign.html` | approximated: the inventory only infers a slideshow (a slideshow plugin CSS is loaded); the carousel is inferred, not observed |
| Blog search results `q=dress` | `search.html` | replicated: GET `q` form; results come from inline data |
| Runway landing | `runway.html` | approximated |
| Runway SS27 live stream | `runway-show.html` | simulated: the stream is a dialog saying no video is included; the look gallery is an addition |
| About us | `about.html` | approximated: original copy and structure |
| Site map | `sitemap.html` | replicated as a nested link list |
| (none) | `demo.html` | added: target for shop, help, legal and social links |
| (none) | `404.html` | required by the protocol; not mapped |

Omitted: runway index and Our Impact (optional extras), product, cart, account and store-locator pages, and any commerce behaviour.

## Components

| Component | Status | Notes |
| --- | --- | --- |
| Header with search form | replicated (search form observed); the disclosure toggle is approximated | Reference has a visible `input[type=search][name=q]`; here it sits behind a Search button so the header stays compact on mobile |
| Primary nav (Gifts, Handbags, Shoes, Ready-To-Wear, Home, Accessories, Sport, Sale, Tory Daily, Runway) | approximated | Renamed to fictional equivalents: Bags, Shoes, Clothing, Home, Accessories, Active, Sale, Vesper Notes, Runway. Gifts was folded into panel columns |
| Mega-menu dropdowns with subnav titles | approximated | Titles used: Categories, Collections, Shops, By occasion, Gifts by price, Featured, Gifts. Real item text was not extracted in Phase A, so items are invented. Hover is inferred in the inventory; click, keyboard and Escape are added for accessibility |
| Mobile navigation | added/approximated | The inventory has no mobile observations; a Menu disclosure with nested accordion panels is provided |
| Tory Daily sub-nav (Issues, Style, Beauty, Culture, Travel, Entertaining, Music, Sport, Archive) | replicated | Four sections have pages; the other four link to a filtered archive |
| Card grid with Read More | replicated | |
| Share/Pinterest/Instagram links on posts | approximated | Replaced by Copy link and Email; social share links would need external services |
| Newsletter | approximated/simulated | Inventory: the word appears 6 times but no form was located. A labelled demo form is therefore an addition |
| Footer (Help, Shop, About, Follow Us, legal) | replicated | Same four column headings and legal row; links lead to `demo.html` except About, Vesper Notes, Runway and Site map |
| Slideshow | approximated | Inferred only |
| Ads and tracking | omitted | The reference carries heavy ads/tracking; none replicated |

## Intentional additions

Shop tiles, `demo.html`, sort control, archive filters, load more, look filter chips and look viewer, demo stream dialog, share block, error summary and inline validation patterns, skip link and instrumentation attributes required by the protocol.

## Deviations and rationale

- Fictional brand and original copy throughout (protocol requirement). Category names such as "Ready-To-Wear" and "Handbags" were renamed.
- Stories are held in one inline array and pre-rendered into the HTML at authoring time and re-rendered by JS when filters, sort or load more are used, so every card has a working link.
- Other season entries on `runway.html` are not linked because only one show page exists.

## Unverified

Exact reference dropdown labels, whether the reference has a newsletter form or a visible carousel, its mobile navigation, archive controls, heading structure, and accessibility quality. None of these were inspected in this run.

## Research-relevant observations

- The baseline deliberately contains no injected accessibility defects.
- Stateful widgets worth attention in later evaluation: mega-menu (hover plus click plus keyboard), the search disclosure, the carousel, two native dialogs, filter chips with `aria-pressed`, JS-rendered result lists announced through `role="status"` text, and an error summary that takes focus.
