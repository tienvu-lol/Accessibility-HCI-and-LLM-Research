# Fidelity notes - FASH-02 (Linden Vael, invented house)

Source (research metadata only): Margaret Howell UK, https://www.margarethowell.co.uk/ , verified 2026-11-12 by curl (see the FASH-02 block in `Websites/pipelines/claude/research/FASH.md`). Not re-fetched during this build. Page titles were not extractable; the reference rate-limits (429), so one collection page was never verified.

## Source to replica mapping
| Reference page | Local page | Status |
| --- | --- | --- |
| `/` | index.html | approximated: hero with campaign entry and calls to action, collection entry, editorial teasers; shop CTA replaced with catalogue links |
| `/pages/news` | journal.html | approximated: index of editorial stories; mailing-list prompt moved to footer form |
| news story pages | article.html | approximated: 8 invented entries, pattern only |
| two AW26 lookbook pages | lookbook.html, lookbook-field.html | approximated; the carousel is **inferred** (the research block lists it as inferred), implemented with accessible controls |
| campaign page | campaign.html | approximated |
| photographs page | plates.html | approximated with abstract plates and a lightbox |
| about, sustainability | about.html, materials.html | approximated, all copy and claims invented |
| shops | stockists.html | approximated, filterable list of invented places (no map) |
| care and repair, contact, accessibility | care.html, contact.html, accessibility.html | approximated |
| `/collections/*` | collections.html | **intentional addition / demo**: the reference's collection and product depth is large and is a shop; it was treated as a demo, not reproduced |
| product pages | garment.html | **intentional addition / demo** |
| none observed | search.html | **intentional addition** |

## Components
Replicated pattern: mega-nav of Collections / Lookbooks / Journal / House / Stockists, simplified to dropdown buttons plus mobile disclosure. Simulated: newsletter, contact form. Omitted per section 4 policy: see list. Unverified: any behaviour of the reference not listed in the research block, including real nav hover behaviour, page titles, and the collection page.

## Content guardrail decisions
- Invented house, founder, town, mill, pottery, stockists, gallery and edits; no real person, brand, mill, retailer, magazine or certification appears. The reference's brand, designer, photographers, collaborators and story titles are not used or paraphrased.
- Every origin, craft and material statement is attached to an invented place and labelled invented. No sustainability or ethical claim is made; no certification mark is used. No founding year is stated.
- Imagery: 33 abstract SVG colour studies (generated shapes), each with a text alternative; garment silhouettes are abstract flats drawn inline. Silhouettes beside text are `aria-hidden`; the large garment visual has a label.
- Dimension tables are fictional garment flats with an explicit note that they are not advice about any person.
- Dates are marked as sample data (years 2031), phone numbers use the 555 exchange, the contact address uses a `.example` domain.

## Pruned for scope (reference nav and footer targets not rebuilt, therefore not linked)
Men / Women / second-line department mega-menus (collapsed to category links), sub-collections for individual accessories (bags, belts, gloves, hats, socks, ties, scarves) and home (kitchenware, books and stationery, calendar), the individual news story pages other than 8 invented entries, corporate, careers, terms, privacy and cookies, Instagram and Pinterest links, customer-service pages other than care and contact. No stand-in or `not-replicated.html` page is used.

## Omitted on policy (section 4, kept separate from scope prunes)
Shop and product purchase flow, "SHOP" calls to action, minicart, wishlist, account / login, payment and delivery pages, prices. The garment page says plainly that it is catalogue only.

## Research-relevant observations
Image-led pages concentrate accessibility risk in text alternatives, carousel semantics, lightbox focus and swatch naming; each is handled explicitly. All page text was written as original copy.
