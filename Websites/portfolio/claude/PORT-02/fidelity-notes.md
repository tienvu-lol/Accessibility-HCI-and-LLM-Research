<!-- Protocol: WEB-REPLICA-V1.0 | Replica: PORT-02 | Category: personal portfolio (software engineer) | Source: Brittany Chiang https://brittanychiang.com/ -->
# Fidelity notes: Priya Raman ↔ brittanychiang.com

**Original:** https://brittanychiang.com/ (fetched and confirmed live on November 9, 2026).
**Replica:** Priya Raman, a fictional frontend engineer. Only the structure is copied. No brand names, copy, images, logos or code from the original are reused, and no claim is made about the real owner.

## Mirrored from the original

| Original | Replica |
|---|---|
| Two-column layout: a fixed left column that does not scroll, and a scrolling content column | `.split` grid: a sticky `header.rail` and a scrolling `main.flow`, from 1024px upward |
| Left column holds the name as `h1`, the job title, a one-line pitch, an anchor nav and a social icon row | Same order: name, role, pitch, section nav, social icons, then the clock |
| Anchor nav of three sections (About, Experience, Projects), with a rule that widens on the active item | Five sections (About, Experience, Projects, Writing, Contact), same widening-rule treatment, driven by an IntersectionObserver |
| Content column: About prose, then a dated Experience list, then Projects, then Writing, then a build credit | Same sequence, with Contact added before the footer |
| Experience entries: date range in a narrow left cell, role · company as the heading, a paragraph, then technology pills | Identical row anatomy, six roles, 2015 to present |
| Project entries: thumbnail, title, summary, a headline statistic, technology pills | Identical anatomy, four featured projects |
| "View Full Résumé" and "View Full Project Archive" links out of the home page | "Read the full resume" and "View the full project archive" links in the same positions |
| `/archive`: a table of every project with Year, Title, Made at, Built with, and links | `archive.html` with the same four columns and 16 rows |
| Dark theme with a single accent colour and a pointer-following spotlight glow | Dark theme by default, one accent (violet rather than teal), and the same spotlight behaviour |
| No cookie banner, no analytics chrome, no newsletter on the home page | Same; the newsletter sits only in the writing sidebar |

## Adapted, to meet the research brief and a clean WCAG 2.2 AA baseline

- **A top bar on inner pages.** The source has no site navigation at all, because the home page is the site. The brief requires a header with a sticky nav, a dropdown and a mobile menu, so inner pages get one. The home page deliberately keeps **no top bar**: its rail is the `header`, which is the source's real architecture.
- **The archive became interactive.** The source's table is static. Here the columns sort (with `aria-sort` and a polite announcement), technology chips filter, and a search box narrows by text — the brief asks for filters and client-side search, and a table is the honest place to put them on an engineer's site.
- **A real theme toggle.** The source is dark only. The brief assigns the light/dark toggle to this replica, so there is a full light palette, a toggle that reports `aria-pressed`, persistence in `localStorage`, and a four-line inline script that applies the stored choice before first paint to avoid a flash.
- **The spotlight is conditional.** The source's glow follows the pointer unconditionally. Here it is removed entirely under `prefers-reduced-motion` and on devices without hover, and it is `aria-hidden` because it carries no information.
- **Résumé on the page, not only as a PDF.** The source links to a PDF. This replica has a print-ready `resume.html` plus a downloadable plain-text file, because a binary PDF cannot be inspected by the accessibility tooling this research uses.
- **External links are marked.** The source's outbound links are unmarked. Here each carries an arrow plus visually hidden "(opens an external site)" text, and points at a platform home page rather than any real account.

## Added for test coverage (not on the original)

Four case-study pages with a facts sidebar, a masonry gallery, a native `<dialog>` lightbox and previous/next navigation; `writing.html` with tag chips, text search and a show-more control (chosen over pagination so the ten-site set contains both patterns); four post pages with an article sidebar, tags, copy-permalink and an older/newer pager; `about.html`; `uses.html`; `contact.html` with a validated enquiry form, a timing fieldset and an availability sidebar; `search.html` over a 17-entry client-side index; `accessibility.html`; `colophon.html`; `404.html`; breadcrumbs on every page except the home page; and an availability card with a live Boston clock and an "at the keyboard / away" badge.

## Left out

- **The source's real content** — its employers, projects, article list and résumé. Everything here is invented.
- **An NDA / password-gated project.** Assigned to PORT-05 and PORT-07 in the ten-site plan.
- **A shop, booking flow or cart.** Not conventional for this stratum.
- **Third-party embeds** (GitHub stats, Spotify, Medium). Replaced with plain outbound links.
- **A blog platform.** Posts are static pages; there is no feed, no comments and no CMS.

## Defects on the original that were deliberately not copied

Observed on the live page on November 9, 2026, and recorded as reference points — candidate issues to plant later rather than inherit.

1. The entire site is one page plus an archive, with no way back to the home page from the archive other than the browser's back button or the logo.
2. Outbound links are unmarked, and several open destinations of different kinds (repository, demo, article) with no cue which is which.
3. The archive table is wide and, at narrow widths, scrolls horizontally without a focusable scroll region, so a keyboard user cannot reach the right-hand columns.
4. The pointer spotlight runs regardless of the visitor's motion preference.
5. There is no light theme and no control to request one, so the palette ignores a stated system preference.

The replica fixes all five: the archive has a focusable, labelled scroll region; outbound links are marked; the spotlight respects `prefers-reduced-motion`; and there is a real light theme with a toggle.

## Protocol conformance

**No outstanding deviations from `RULES.md`.** One conflict arose and was resolved:

- **Bootstrap 5.3.3 and jQuery 3.7.1 were used in the first build and have been removed.** The
  project lead's portfolio brief asked for Bootstrap 5 and jQuery; `RULES.md` section 2 prohibits
  both. Per the precedence note in `RULES.md`, the conflict was reported rather than silently
  resolved, and the lead chose removal. On 2026-11-10 `assets/vendor/` was deleted and everything
  that had depended on it was reimplemented in vanilla JavaScript and CSS: the dropdown menu and the slide-in navigation (the lightbox was already a
  native `<dialog>`), plus the form
  controls, layout utilities and the base reset the site had been inheriting from Bootstrap. The
  primitives live at the end of `css/styles.css` and in `initUI()` in `js/main.js`.
- **No PHP.** The brief allowed PHP includes for shared partials; the decision was to inline the
  header and footer into every page instead, so the whole site opens from `file://` with no server.
- **Instrumentation.** `RULES.md` section 7 requires `<main id="main-content" data-section="main-content">`;
  the first build used `id="main"`. Corrected across every page, along with the skip-link target.
- **`localStorage`** is used for one thing only: the chosen theme.

Two defects surfaced while removing the libraries, both fixed:

1. `.visually-hidden` carried a `:not(:focus)` escape hatch, so a visually hidden heading that
   receives focus after pagination became visible and shifted the layout mid-interaction.
   Bootstrap's `!important` rule had been masking it. The class is now unconditional.
2. The slide-in navigation sits inside a sticky header, which is its own stacking context, so a
   backdrop appended to `<body>` painted over the panel and swallowed its close button. The
   backdrop is now inserted next to the panel instead.
