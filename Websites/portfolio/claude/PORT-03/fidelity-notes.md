<!-- Protocol: WEB-REPLICA-V1.0 | Replica: PORT-03 | Category: personal portfolio (motion / 3D designer) | Source: Andreas Wannerstedt https://andreaswannerstedt.se/ -->
# Fidelity notes: Juno Salvi ↔ andreaswannerstedt.se

**Original:** https://andreaswannerstedt.se/ (fetched and confirmed live on 2026-11-09; an Adobe Portfolio site).
**Replica:** Juno Salvi, a fictional one-person studio in Stockholm. Only the structure is copied. No brand names, copy, images, logos or code from the original are reused, and no claim is made about the real owner.

## Mirrored from the original

| Original | Replica |
|---|---|
| Minimal header: wordmark on the left, two nav items (Projects, About) on the right | Wordmark plus role on the left, nav on the right; the nav is longer because the replica has more pages |
| The work grid *is* the home page and the primary navigation | `index.html` leads with the gallery; tiles are the main route into the site |
| Dense grid of image tiles with the title beneath, no hover captions over the image | Same: still, title and client/year in a caption bar under the frame |
| One detail page per project, at a root-level slug | `project-<slug>.html`, five of them |
| Work is predominantly short looping animation, presented as stills in the grid | Looping pieces are marked with an animated loop mark and a "loop" tag; the rest are stills |
| Social icon row (Vimeo, Behance, Instagram and others), no inline contact form | Social row in the footer; the email address is in the footer and on the contact page |
| Short About page with a biography, a client list and an email address | `about.html` with the same ingredients, expanded with process and tools |
| Footer with a back-to-top link and a platform credit | Footer with a back-to-top link and a colophon link in place of the platform credit |
| No search, no filtering, no theme switch, no cookie banner | No theme switch and no banner here either; search and filtering are brief requirements |

## Adapted, to meet the research brief and a clean WCAG 2.2 AA baseline

- **Stills, not video.** The source's work is video. A replica that must run offline from a folder cannot ship a reel, so every piece is a labelled SVG placeholder and the showreel page is an explicitly labelled demo player. This is the single largest departure and it is deliberate.
- **Motion is simulated honestly, and controllable.** Rather than pretending there is no motion, the looping tiles carry small CSS-animated SVG marks. They are inline rather than `<img>` for a specific reason: one control in the header can then pause every loop at once. An animated file inside an `<img>` could not be paused that way.
- **A gallery with filters.** The source grid is unfiltered. The brief requires category filters and client-side search, so the gallery gained a kind filter, a text search, a result count and an empty state — plus a grid/list view switcher, which gives the research set a component the other two replicas do not have.
- **Project pages gained structure.** The source's detail pages are mostly image sequences. Here each case study has a carousel of stills with a caption and a live region, a facts table, credits, a lesson pull-quote and previous/next navigation.
- **An estimator instead of a price list.** Services are a brief requirement; a motion studio quoting by length and revisions makes a calculator the natural interactive element, and it is a different kind of component from the filters and forms elsewhere in the set.
- **External links are marked.** The source's outbound links are unmarked. Here each carries an arrow plus visually hidden "(opens an external site)" text, and points at a platform home page rather than any real account.

## Added for test coverage (not on the original)

`reel.html` (demo player, six chapters, live region), `services.html` (four packages, estimator, process list), `notes.html` plus three notes with sidebars, permalink copying and prev/next, `contact.html` (brief form with a date field, a budget fieldset and an availability sidebar), `search.html` (17-entry client-side index), `accessibility.html`, `colophon.html`, `404.html`, breadcrumbs on every page except the home page, a client wall, a client quote, an awards list, and an availability card with a live Stockholm clock.

## Left out

- **Any real video or audio.** Noted above; the consequence is that captions and audio description cannot be evaluated on this replica, which the accessibility statement says plainly.
- **A theme toggle.** Deliberate: this site follows `prefers-color-scheme` only. The toggle in the brief is assigned to PORT-02, so the set contains both patterns.
- **A shop or print sales.** Assigned to the photographer and illustrator replicas in the ten-site plan.
- **Thirty-nine project pages.** The source has about that many; five case studies plus four outbound entries give the same shape at a size a reviewer can actually read.
- **Platform chrome.** The source is built on Adobe Portfolio and carries its credit and markup conventions; this replica is hand-written, so none of that is reproduced.

## Defects on the original that were deliberately not copied

Observed on the live site on 2026-11-09, recorded as reference points — candidate issues to plant later rather than inherit.

1. Looping animation plays automatically with no control to stop it, and no respect for a reduced-motion preference.
2. Tiles are images with titles underneath; the link text and the image carry the same name, which a screen reader reads twice.
3. The grid has no filtering, sorting or search, so thirty-nine projects can only be found by scrolling.
4. There is no skip link and the page has little landmark structure, so a keyboard user traverses the whole grid to reach the footer.
5. Project pages have no previous/next navigation and no breadcrumb, so the only route back is the browser's back button.

The replica fixes all five: motion is controllable and off by default for anyone who asks, the gallery is filterable and searchable, tiles have a single accessible name, every page has landmarks and a skip link, and every case study has breadcrumbs and a pager.

## Protocol conformance

**No outstanding deviations from `RULES.md`.** One conflict arose and was resolved:

- **Bootstrap 5.3.3 and jQuery 3.7.1 were used in the first build and have been removed.** The
  project lead's portfolio brief asked for Bootstrap 5 and jQuery; `RULES.md` section 2 prohibits
  both. Per the precedence note in `RULES.md`, the conflict was reported rather than silently
  resolved, and the lead chose removal. On 2026-11-10 `assets/vendor/` was deleted and everything
  that had depended on it was reimplemented in vanilla JavaScript and CSS: the dropdown menu and the slide-in navigation (the carousel was already
  hand-written), plus the form
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
