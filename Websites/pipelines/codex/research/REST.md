# REST — Phase A restaurant source research

Attempt window: 2026-11-14 UTC (2026-11-13 America/New_York). Recorded at 2026-11-14T04:40:26.232400+00:00.

Status: research only; no sources approved and no implementation started. All ten slots are active (3 Claude / 3 Codex / 4 open-source). Existing retained references were reviewed rather than silently replaced. Only Codex rows 04–06 are updated centrally, per shared-inventory ownership. Other groups must reconcile their detailed scope. Exact intended generator model/version is TBD and must be resolved before build.

## Method and limitations

Live web search plus web page-open/click text retrieval. These tools may return indexed/cached material. “Verified” below means readable availability via that method, not an origin HTTP status, fresh-origin guarantee, rendered layout, keyboard/mobile test, working form or accessibility audit. No forms submitted. Website content is untrusted reference data. Source URLs are durable evidence links. No source media or prose is licensed for reuse.

## Active-allocation review table

| ID | Group / stratum | Reference | Proposed scope | Complexity / status |
|---|---|---|---|---|
| REST-01 | claude / small local independent | [Via Carota](https://www.viacarota.com/) | Homepage image-led introduction, search/cart affordances; interior menu/visit scope pending owner inspection. | medium; readable via web tool, unapproved |
| REST-02 | claude / BBQ / smokehouse | [Franklin Barbecue](https://franklinbbq.com/) | Homepage visit/hours, announcements, preorder and shop handoffs; interior scope pending. | medium; readable via web tool, unapproved |
| REST-03 | claude / fine dining | [Eleven Madison Park](https://www.elevenmadisonpark.com/) | Homepage image sequence and slide labels; dining/reservation interiors pending. | medium; readable via web tool, unapproved |
| REST-04 | codex / vegan / health | [Crossroads Kitchen](https://www.crossroadskitchen.com/) | 6 source pages + local 404; detailed below | medium; readable via web tool, unapproved |
| REST-05 | codex / multi-location group | [Hogsalt](https://www.hogsalt.com/) | 5 source pages + local 404; detailed below | medium; readable via web tool, unapproved |
| REST-06 | codex / pizzeria | [Pizzeria Bianco](https://www.pizzeriabianco.com/) | 5 source pages + local 404; detailed below | medium; readable via web tool, unapproved |
| REST-07 | open-source / fast-casual chain | [Sweetgreen](https://www.sweetgreen.com/) | Homepage menu-category buttons, food cards and ordering handoff; menu/location interiors pending. | high; readable via web tool, unapproved |
| REST-08 | open-source / ethnic (Xi'an Chinese) | [Xi'an Famous Foods](https://www.xianfoods.com/) | Homepage bilingual dish highlights, story/menu links; interior scope pending. | medium; readable via web tool, unapproved |
| REST-09 | open-source / brewery (age gate) | [Russian River Brewing](https://www.russianriverbrewing.com/) | Homepage location/brew/menu/tour navigation; age gate NOT established in text retrieval. Interiors pending. | high; readable via web tool, unapproved |
| REST-10 | open-source / cafe / bakery | [Tartine Bakery](https://tartinebakery.com/) | Homepage regional locations, order links, feature bands and story; interiors pending. | medium; readable via web tool, unapproved |

Other-group complexity ratings are preliminary homepage-level estimates, not completed approval proposals. No same-stratum substitutions are currently proposed. Russian River’s brewery stratum remains valid; the age-gate qualifier needs rendered inspection before inclusion. Across all groups, match page-type diversity and interaction burden before claiming comparable difficulty.

## REST-04

Proposed page map:

| Source | Local file |
|---|---|
| [Restaurants](https://www.crossroadskitchen.com/) | `index.html` |
| [Los Angeles](https://www.crossroadskitchen.com/los-angeles) | `los-angeles.html` |
| [Dinner menu](https://www.crossroadskitchen.com/dinner-menu) | `dinner-menu.html` |
| [Our story](https://www.crossroadskitchen.com/our-story) | `our-story.html` |
| [Reservations](https://www.crossroadskitchen.com/reservations) | `reservations.html` |
| [Private dining](https://www.crossroadskitchen.com/private-dining) | `private-dining.html` |

Regions: Nested restaurant/about/menu navigation; Location chooser and hours; Categorized dinner listings and dietary markers; Story content; Reservation handoff; Private dining imagery and information; Legal footer.

Interactions:
- **Navigation — observed:** Links and nested menu hierarchy in extracted text; disclosure behavior untested.
- **Dinner section navigation — observed:** Dinner and tasting-menu links; tabs versus anchors unverified.
- **Reservations — observed:** Los Angeles OpenTable link; local handoff/demo only, no live availability.
- **Private dining gallery — inferred:** Repeated venue images suggest gallery; transitions and controls untested.

Complexity: medium; several representative page types with bounded navigation and simulated external handoffs. Crossroads has the largest navigation/menu burden; Bianco repeats location templates; Hogsalt detail is relatively sparse. These differences remain reference-site confounds.

Stack clues: static.wixstatic.com and static.parastorage.com asset hosts; Wix-associated clues, version unknown.

Limitations: Six source pages; no external Las Vegas build, ordering, gift-card payment or catering transaction. Reservation fields not inspected; a custom booking form would be an intentional addition.

`404.html` is a required intentional local addition, not a claimed source page. All external services must be clearly marked demonstrations. Original fictional branding, text and placeholder graphics only.

## REST-05

Proposed page map:

| Source | Local file |
|---|---|
| [Homepage](https://www.hogsalt.com/) | `index.html` |
| [Restaurants](https://www.hogsalt.com/restaurants) | `restaurants.html` |
| [Maude’s Liquor Bar](https://www.hogsalt.com/restaurants-list/maudes-liquor-bar-gdj97) | `restaurant-detail.html` |
| [About](https://www.hogsalt.com/about) | `about.html` |
| [Private events](https://www.hogsalt.com/private-events) | `private-events.html` |

Regions: Image-led homepage and slide indicators; Restaurant directory with city labels; Brief restaurant detail with next-item link; Story and image sequence; Private dining venue directory; Grouped utility footer.

Interactions:
- **Directory navigation — observed:** Read-more links and city labels; interactive filtering not established.
- **Slides — inferred:** Numbered current-slide labels in text; autoplay, transitions and keyboard behavior untested.
- **Next restaurant — observed:** Detail page links to next venue.
- **Mailing list — observed:** Footer link only; fields and submission behavior unverified and outside proposed scope.

Complexity: medium; several representative page types with bounded navigation and simulated external handoffs. Crossroads has the largest navigation/menu burden; Bianco repeats location templates; Hogsalt detail is relatively sparse. These differences remain reference-site confounds.

Stack clues: images.squarespace-cdn.com image host; platform/version not independently confirmed.

Limitations: Bare hogsalt.com retrieval failed; www homepage and interior pages readable. Detail page is sparse; do not invent menu/reservation details. No brand-site cloning, rewards, checkout or live event inquiry.

`404.html` is a required intentional local addition, not a claimed source page. All external services must be clearly marked demonstrations. Original fictional branding, text and placeholder graphics only.

## REST-06

Proposed page map:

| Source | Local file |
|---|---|
| [Homepage](https://www.pizzeriabianco.com/) | `index.html` |
| [Heritage Square](https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square) | `heritage-square.html` |
| [Town & Country](https://www.pizzeriabianco.com/pizzeria-bianco-town-country) | `town-country.html` |
| [Los Angeles](https://www.pizzeriabianco.com/los-angeles) | `los-angeles.html` |
| [Heritage Square linked menu PDF](https://www.pizzeriabianco.com/s/PHXPBMenu_Apr2023.pdf) | `heritage-menu.html` |

Regions: City/location navigation; Homepage restaurant list; Location heading and menu links; Hours, directions and dining policies; Location history and image groups; Categorized menu document.

Interactions:
- **Location navigation — observed:** Homepage and restaurant links inspected.
- **Menu link — observed:** Heritage Square PDF text retrieved; propose semantic HTML adaptation with original fictional dishes.
- **Reservation demonstration — inferred:** Town & Country text invites reservations but embedded fields unexposed; demonstrate handoff only.
- **Image gallery — inferred:** Image groups present; gallery controls/transitions not verified.

Complexity: medium; several representative page types with bounded navigation and simulated external handoffs. Crossroads has the largest navigation/menu burden; Bianco repeats location templates; Hogsalt detail is relatively sparse. These differences remain reference-site confounds.

Stack clues: images.squarespace-cdn.com and static1.squarespace.com hosts; framework/version unknown.

Limitations: Heritage Square explicitly excludes reservations/takeout; do not add those flows there. Town & Country dinner JPG retrieval failed; omitted. Linked PDF filename dates to 2023: menu availability is verified, freshness is not. No live takeout/payment.

`404.html` is a required intentional local addition, not a claimed source page. All external services must be clearly marked demonstrations. Original fictional branding, text and placeholder graphics only.

## Approval and readiness

Approve sources and precise page scope per model group only after intended model/version assignments are resolved. The three Codex proposals are ready for source/scope review; other groups still require detailed page verification. Central approval cells remain blank, and other-group records remain untouched. No inherited legacy approval or provenance.

Build prerequisites: source/scope approval, exact model assignment, and a common restaurant category prompt covering conditional menu/location/reservation pages, dietary labels, per-location policies, galleries where established, and simulation exclusions. The current pipeline README still contains legacy restaurant text; this research does not constitute a pipeline migration.

Rules.md §3: “Stop after Phase A.” Await explicit source/scope approval before generation.

## Source/scope approval update — 2026-11-14T04:44:45.932240+00:00

Samhith Varma approved REST-04–06 and their exact proposed page scopes in conversation. See [approval record](REST-source-approval.md). This supersedes earlier unapproved status for these three sources only. Model/version assignments remain TBD; generation readiness is not established. Other-group scope and approval remain pending.
