# FASH-03 fidelity notes

Replica: **Curbside Signal** (fictional). Reference: Hypebeast, https://hypebeast.com/ (research metadata only; the name is not used on the site). Source verified 2026-11-12 by HTTP GET via curl; approved 2026-11-13. Stratum: fashion blog, trend and street-style content site.

**Snapshot caveat.** The research block records that the home and section pages are very heavy and change by the hour. Everything below describes one observation recorded in `Websites/pipelines/claude/research/FASH.md`, not stable structure. The prune list therefore reflects that snapshot only. No reference HTML was copied; no live re-check was needed for the build.

## Page mapping

| Reference page | Local page | Treatment |
| --- | --- | --- |
| `/` home | `index.html` | Approximated: lead story + headline list, top stories, section strips, latest feed, sidebar. Layout inferred from the headline-link/card-grid pattern the research block marks as inferred. |
| `/fashion` | `fashion.html` | Approximated section front with topic chips and sort (chips are an addition). |
| `/footwear` | `footwear.html` | Same pattern. |
| `/art`, `/design`, `/lifestyle`, `/music` | `culture.html` | Merged into one page; the "Culture" dropdown links to `culture.html?tag=Art` etc. This is a scope merge, not a replication of four pages. |
| `/magazine` | `magazine.html` | Approximated; issue "plates" gallery and lightbox are an intentional addition. |
| `/directory` (Brands) | `brands.html` | Approximated with 20 invented labels, text and type filters. |
| `/author/<name>` | `author.html?a=` | Approximated with five invented writers. |
| `/search?s=` | `search.html?q=` | Replicated pattern (query-string search), run over inline sample data. |
| article page (`/YYYY/MM/slug`) | `article.html?id=` | Approximated; one template, 30 sample stories, rendered from inline data (a01 is also static in the HTML). |
| (none) | `404.html` | Required by protocol. |

## Intentional additions (not confirmed on the reference)
- `calendar.html` release calendar, labelled sample data on the page, in the home sidebar and in the nav. The research record does not list a release calendar.
- `newsletter.html` simulated sign-up (the research record marks newsletter as inferred only).
- Image gallery with lightbox on `magazine.html`.
- Topic chips, sort selects and "load more" on lists (research block: infinite scroll or "load more" is inferred, not confirmed).
- `about.html` combined about/contact/privacy page standing in for a handful of footer targets.

## Replicated / approximated / simulated
- Replicated: primary nav order (Fashion, Footwear, culture group, Magazine, Brands), utility search, dropdown menu, mobile disclosure, footer link groups, `/author/` and `?s=` URL patterns as local equivalents.
- Approximated: card grids, section order, typography (system fonts only, no web fonts).
- Simulated: search, filters, load more, calendar marking, newsletter, all on inline data. No network, no storage.
- Placeholders: all imagery is abstract SVG (14 compositions plus a logo). Thumbnails inside linked cards are decorative (`alt=""`); lead, article and gallery images carry text alternatives.

## Pruned for scope (ordinary scope prunes)
Reference nav or footer targets that were not rebuilt are simply not linked; no stand-in page exists.
- Videos (`/videos`), Brand Rankings (`/brands/ranking`), Hypebeast100 (`/hb100`).
- Separate Art, Design, Lifestyle and Music pages (merged into `culture.html`).
- The language switcher and its many locale links.
- "More" menu items beyond the three local pages; sister-site links.
- Footer items: Advertise, Newsroom, Investor, Group, Careers, separate Privacy/Terms/Contact pages (a combined `about.html` covers contact and a sample privacy note).

## Omitted on policy (separate list, content guardrail)
- Store / shop link and any commerce affordance (no cart, checkout, price, payment).
- Account / login.
- Resale, investment, price or hype-value commentary; authentication or counterfeit-related content.
- Real people, brands, silhouettes, colourways, events and collaborations (all invented; the reference's name is absent from the site).
- Photography (replaced by abstract SVG).
- Brand Rankings is also omitted partly because ranking framing drifts toward market-value commentary.

## Unverified / limitations
- Section order on the home page is inferred; the research block marks the hero/grid structure as inferred from the headline-link pattern.
- Sample brand and product names were invented by the generator and were not searched against trademark registries; some coincidental overlap with real names cannot be excluded.
- Observed reference heaviness (about 383 KB home HTML) is not reproduced.
