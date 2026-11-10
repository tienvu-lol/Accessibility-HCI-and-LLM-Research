<!-- Protocol: WEB-REPLICA-V1.0 | Replica: PORT-01 | Category: personal portfolio (minimal one-page personal site) | Source: The Curious Creations of Tim Holman https://tholman.com/ -->
# Fidelity notes: Tobias Quill ↔ tholman.com

**Original:** https://tholman.com/ (fetched and confirmed live on November 9, 2026).
**Replica:** Tobias Quill, a fictional interactive developer. Only the structure is copied. No brand names, copy, images, logos or code from the original are reused, and no claim is made about the real owner.

## Mirrored from the original

| Original | Replica |
|---|---|
| Single page, single column, text first; no hero image and no decorative header art | `index.html` is a one-page layout, single column, text first, with no imagery above the fold |
| Page heading in the pattern "The Curious Creations of &lt;name&gt;" | "The curious contraptions of Tobias Quill" |
| One-line description of the person (tinkerer, maker) directly under the name | `.hero-sig` monospace line: fifteen years of front-end work, current role, workshop |
| A row of contact and social links immediately after the heading (email, GitHub, LinkedIn, Bluesky, X) | Utility bar with the email address plus a copy button; a full "Find me" list in the `#elsewhere` band and in the footer |
| Short introductory paragraph, conversational register | `.lede` paragraph in the same register |
| Long grouped lists of projects, toys and experiments, most of them linking out to other hosts | Three `link-list` groups — Toys, Tools people actually use, Oddities in the workshop — where 4 of 9 entries link out, exactly as the source mostly does |
| Professional background as a short list of current and previous roles | `#experience` timeline: 4 roles, 2011 to now |
| Talks and podcasts as a list of links | `#talks` list on the home page, with `talks.html` holding all six with anchors |
| `/post/<slug>` write-ups reached from the page rather than from a blog index | `post-*.html` write-ups, with `writing.html` added as an index (see "Adapted") |
| No search, no filtering, no theme switch, no cookie banner, no analytics chrome | No theme toggle and no analytics here either; search and filtering are additions required by the brief |

## Adapted, to meet the research brief and a clean WCAG 2.2 AA baseline

- **A navigation bar.** The source has no site nav, because it has no other pages. The brief requires a header with a utility bar, sticky nav, a dropdown and a mobile menu, so one was added: five primary items plus a "More" disclosure. The home page keeps the source's flat, navless *feel* through the "On this page" anchor list.
- **Link lists keep the shape, gain structure.** Each row is title · note · year, so the pattern stays scannable while giving a 44px target and an accessible name.
- **External links are marked.** The source's outbound links are unmarked. Here each one carries an arrow plus visually hidden "(opens an external site)" text, and points at a platform home page rather than any real account.
- **The order link.** The source has a nav-style link whose target is a bare `#` placeholder. The replica contains no `href="#"` at all; the equivalent slot is a real page (`contact.html`).
- **Case studies instead of bare links.** Five of the nine projects get a full case-study page, because the brief requires project detail pages with previous/next navigation. The remaining four stay as outbound links, which preserves the source's ratio.
- **One-page home, 23-page site.** The source is a single page. The brief requires Home, Work, case studies, About, Resume, Contact, Writing, plus extras, so the home page stays a faithful one-pager and the rest of the site hangs off it.

## Added for test coverage (not on the original)

`work.html` (tag chips, text search, result count, empty state), five case studies (facts sidebar, masonry gallery with a lightbox, lessons accordion, previous/next pager), `writing.html` (search, tag chips, 3-per-page pagination, sidebar), six post pages (article meta, copy-permalink, related reading, sidebar, older/newer pager), `about.html`, `resume.html` (download, print button, print stylesheet), `uses.html` (4 disclosures, 19 rows), `talks.html`, `contact.html` (validated enquiry form, budget fieldset, availability sidebar, "what happens next"), `search.html` (21-entry client-side index), `accessibility.html`, `colophon.html`, `404.html`, breadcrumbs on every page except home, a newsletter form in three places, and a JS availability card with a live studio clock and an "at the desk / away from the desk" badge.

## Left out

- **A theme toggle.** Deliberate: this replica follows `prefers-color-scheme` only. The light/dark toggle in the brief is assigned to PORT-02, PORT-05 and PORT-07, so the ten-site sample contains both patterns. Recorded here so the absence reads as a decision rather than an omission.
- **The source's playful interactive easter eggs** (cursor and canvas toys embedded in the page itself). The replica names such toys in its link lists but does not run them, so the baseline keeps a quiet motion profile.
- **An NDA / password-gated project.** Assigned to PORT-05 and PORT-07 in the set.
- **A shop, booking flow or cart.** Not conventional for this stratum; assigned to the photographer and illustrator replicas.
- **Real third-party embeds** (CodePen, GitHub, podcast players). Replaced with plain outbound links.

## Defects on the original that were deliberately not copied

Observed on the live page on November 9, 2026, and recorded as reference points — for example as candidate issues to plant later.

1. A navigation-style "Order" link whose `href` is a bare `#`, so it goes nowhere and is announced as a link with no destination.
2. Outbound links carry no indication that they leave the site, and several open destinations that differ in kind (repo, demo, article) with no cue which is which.
3. The page relies on link text alone for its grouping; the visual groups are not exposed as headed sections, so a screen reader hears one long list.
4. No skip link, because the page has no landmark structure to skip to.
5. No breadcrumb or return path from the `/post/<slug>` write-ups back to a listing, since no listing exists.

The replica fixes all five, which is the point of a clean baseline: issues can then be planted deliberately rather than inherited.

## Protocol conformance

**No outstanding deviations from `RULES.md`.** One conflict arose and was resolved:

- **Bootstrap 5.3.3 and jQuery 3.7.1 were used in the first build and have been removed.** The
  project lead's portfolio brief asked for Bootstrap 5 and jQuery; `RULES.md` section 2 prohibits
  both. Per the precedence note in `RULES.md`, the conflict was reported rather than silently
  resolved, and the lead chose removal. On 2026-11-10 `assets/vendor/` was deleted and everything
  that had depended on it was reimplemented in vanilla JavaScript and CSS: the dropdown menu, the slide-in navigation, the collapsible search panel,
  the accordions and the image lightbox (now a native `<dialog>`), plus the form
  controls, layout utilities and the base reset the site had been inheriting from Bootstrap. The
  primitives live at the end of `css/styles.css` and in `initUI()` in `js/main.js`.
- **No PHP.** The brief allowed PHP includes for shared partials; the decision was to inline the
  header and footer into every page instead, so the whole site opens from `file://` with no server.
- **Instrumentation.** `RULES.md` section 7 requires `<main id="main-content" data-section="main-content">`;
  the first build used `id="main"`. Corrected across every page, along with the skip-link target.
- **No browser storage.** Nothing is persisted; every control resets on reload.

Two defects surfaced while removing the libraries, both fixed:

1. `.visually-hidden` carried a `:not(:focus)` escape hatch, so a visually hidden heading that
   receives focus after pagination became visible and shifted the layout mid-interaction.
   Bootstrap's `!important` rule had been masking it. The class is now unconditional.
2. The slide-in navigation sits inside a sticky header, which is its own stacking context, so a
   backdrop appended to `<body>` painted over the panel and swallowed its close button. The
   backdrop is now inserted next to the panel instead.
