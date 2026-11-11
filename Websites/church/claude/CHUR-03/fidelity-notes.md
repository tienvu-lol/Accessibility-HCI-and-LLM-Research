# Fidelity notes: CHUR-03

Reference (research metadata only): Holy Trinity Episcopal Church, Tiverton, RI, `https://holytrinitychurch.org/`.
Replica: **Saint Aldric's Church, Millstone Cove** (fictional name, text and people).

Basis: the project lead's research inventory (`Websites/pipelines/claude/research/CHUR.md`, verified 2026-11-10: 13 pages, all HTTP 200). During this run I re-fetched the 13 pages with curl (all HTTP 200 again on 2026-11-11) and read their headings, form counts and the home-page text outline. I did **not** take screenshots, measure layout, read computed CSS, or visit the external calendar, scheduler or giving provider. All copy is original; only the page structure and heading sequence were mirrored.

## Page mapping

| Reference page | Local page | Status |
| --- | --- | --- |
| `/` Home | `index.html` | replicated order: contact bar, hero ("One family. All welcome..."), service times, welcome + video, "Faith in Action" with Rooted in Tradition / Open to All, four cards (Our Beliefs, Worship & Special Services, Our Mission, Serving & Giving), footer groups |
| `/who-we-are/` | `who-we-are.html` | replicated headings (space rental note, "We are all called to be ministers", six topics); topics shown as an accordion (approximated: the reference showed two repeated h3 lists, presentation not inspected) |
| `/who-we-are/history/` | `history.html` | approximated: the reference body is only an h1 in the static HTML I read; the timeline is invented |
| `/who-we-are/vestry/` | `vestry.html` | approximated: the reference body text was not read; staff cards and vestry table are invented |
| `/who-we-are/search-process/` (nav "Rector") | `rector.html` | approximated: invented profile |
| `/what-we-believe/` | `what-we-believe.html` | replicated headings Mission and Vision, Values, Foundations; Foundations as accordion (approximated) |
| `/what-we-do/` | `what-we-do.html` | replicated five section headings (Liturgical, Outreach, Thrift Shop, Fellowship, Support Groups); ministry finder added |
| `/who-we-are/special-services/` | `special-services.html` | approximated: the reference page shows a "+" heading, read as an expandable list; contents invented |
| `/who-we-are/education/` (nav "Adult Formation") | `education.html` | replicated three headings (Adult Bible Study, Inquirers' Class, Sunday School and Child Care) |
| `/stewardship/giving/` | `giving.html` | replicated "Invest in ... Giving Online" and an FAQ with six questions (own wording); online giving simulated |
| `/announcements/` | `announcements.html` | replicated as a list of notices (six, own content); search/filter added |
| `/thrift-shoppe/` | `thrift-shop.html` | replicated "Supporting Our Mission"; hours and donation lists invented |
| `/contact-us/` | `contact.html` | replicated rector / parish administrator / directions; form added |
| Calendar (external, mychurchevents.com) | `calendar.html` | simulated locally (see below) |
| (404) | `404.html` | standard requirement |

## Component mapping

- **Header**: reference has a contact bar (phone, email, Facebook) above a nav of Home, Who We Are (dropdown), What We Believe, What We Do, Giving (dropdown), Announcements, Calendar, Ministry Scheduler, Thrift Shop, Contact Us. Replicated, except Facebook and Ministry Scheduler (omitted, see below). Dropdown contents for Who We Are copied structurally; Giving's single item was replaced with two in-page links (give online / FAQ) so the dropdown has more than a duplicate of its parent. Dropdown trigger is a separate button so the parent label stays a link (approximated: the reference's exact dropdown behavior was not observed).
- **Footer**: every reference page ends with Mailing Address, Map and Office Hours / Contact h2s; replicated, with an SVG sketch map. The reference's web-agency credit was not replicated.
- **Hero**: a local SVG illustration replaces the reference's photograph. The two call-to-action buttons are intentional additions (not observed).
- **Video**: reference has a YouTube embed (observed). Replaced with a static poster image and caption; no remote embed.

## Intentional additions (not on the reference)

| Addition | Page | Why |
| --- | --- | --- |
| Ministry finder (search + category filter, 11 records) | `what-we-do.html` | exercises filters, empty state and keyboard flow; the reference lists ministries as prose |
| Announcement search and category filter (6 records) | `announcements.html` | same |
| Local events calendar with month/type/search filter and a details dialog (11 records) | `calendar.html` | the reference points to an external calendar service; a local stand-in avoids a dead link |
| Giving form (simulation) | `giving.html` | the reference uses an external provider; the local form shows validation and a demo success |
| Contact form (simulation) | `contact.html` | the reference page has no form; added for form-validation coverage |
| Hero call-to-action buttons | `index.html` | convenience |

Each is labeled on the page ("Intentional addition" or "Demo" badge, plus a demo note on forms).

## Simulated

Giving and contact forms (no data leaves the page, no payment), calendar event "Details" dialog (no registration), all filters (inline arrays in `js/main.js`).

## Omitted

- Facebook link and social icons (no real social profile for a fictional church).
- Ministry Scheduler (external service on the reference).
- Web-agency footer credit.
- Sermon/media archive, prayer-request form, staff directory search: the inventory found none on the reference, so none were invented (the brief says to add category features only where the reference has them).
- Breadcrumbs: not observed on the reference; not added.

## Unverified

- Visual design (colors, type, spacing) was chosen independently; no reference CSS was read. The reference uses Beaver Builder markup and a red accent; this replica uses burgundy and navy.
- Interior text of History, Staff & Vestry, Rector, Special Services and Thrift Shop pages was not read in detail.
- Exact dropdown/hover behavior, mobile menu behavior and any carousel on the reference.
- The real service times text beyond the home page heading; local times are fictional anyway.

## Research-relevant observations

- The reference is a low-complexity brochure site with no first-party forms (0 `<form>` elements on every page fetched). Interaction complexity in this replica is therefore mostly additions; analyses should treat the filters, dialog and forms as added surface, not reference-derived behavior.
- The reference repeats an h2 trio (Mailing Address / Map / Office Hours) on every page; replicated as footer headings, which adds three h2s to every page.
- Reference home page has two h1 elements in its static HTML; the replica uses one.
