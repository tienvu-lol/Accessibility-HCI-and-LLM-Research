# Fidelity notes - UNI-02 (Linden Ridge College)

Source: Swarthmore College, https://www.swarthmore.edu/ (verified 2026-11-10 by curl; approved 2026-11-13). Observations come only from the approved research block in `Websites/pipelines/claude/research/UNI.md`; the live site was not re-fetched, and rendering/visual design of the reference was never observed. Nothing here claims pixel fidelity.

## Replicated (structure and patterns from the research block)
- Home page section order: hero with pause control and "Meet" button; alumni voices + sustainability; featured weekend; Watch cards; net-zero feature; tuition guarantee; link list; Living + Philadelphia-style opportunities; news.
- Header: utility links (phone, A-Z Index, Calendar, Directory, Campus Map, Make a Gift, Visit), main horizontal navigation with dropdown groups and ARIA menu roles, search flyout posting GET `keys` to a search page, accessibility options panel with animation on/off.
- Nav group labels and item order were mirrored in reworded, original form (Meet, Academics, Campus Life, Admissions & Aid, News & Events).
- Footer groups: contact, social, helpful links (two columns), feedback/accessibility and legal, giving.
- Page title pattern `Page :: Section :: College`.
- Academics page hosts the "Programs of Study" as a plain department list (no filters), as recorded.
- Department detail template (Biology), Design Your Own Major, Academic Calendar, Admissions & Aid, Apply, Affordability & Access, Financial Aid, Visit (three options), Campus Life, News & Events, Stories, Directory.

## Approximated
- Hero ambient video replaced with an animated SVG; pause/play and animation toggle control it.
- Directory: reference is a JS/React search with `role=combobox`; replica uses a search input with live results (no combobox popup).
- Page bodies are original copy of plausible content; the research block recorded titles and regions only, not body text.
- Calendar is a static table; the reference calendar is an external system.

## Simulated
- Tour sign-up form (reference sign-up inferred to be an external form): local validation, error summary, demo success; no data sent.
- Application, aid portal, catalog, calendar subdomains: not built; apply page carries a simulation notice.

## Intentionally added (not in the research block)
- `accessibility.html` (footer link target), `not-replicated.html` (landing page for unbuilt links), `search.html` results page, text virtual tour and self-guided route, Design Your Own Major as a menu item, the local-sidebar "In this section" panels, and sample tables (costs, deadlines, aid statistics).
- No filterable program finder was added.

## Omitted / unverified
- Sixth main-nav group (unconfirmed in the research; five built).
- Video content, social media links, Dash/Tripod/other external systems, A-Z index page, course catalog, individual departments other than Biology, mega-menu hover timing and animation details of the reference.
- ARIA `aria-posinset`/`aria-setsize` seen in the reference were not replicated.

## Research-relevant observations
- The ARIA menubar pattern makes keyboard behaviour (arrow keys, focus return on Escape) a major evaluation surface.
- A large share of navigation targets lead to a single explanatory page because the reference IA is broad (72 distinct targets).
- axe-core reported no violations at 1280px or 375px in the final run; that does not demonstrate WCAG conformance.
