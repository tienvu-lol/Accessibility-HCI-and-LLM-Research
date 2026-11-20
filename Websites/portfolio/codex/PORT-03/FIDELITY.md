# Fidelity notes — replica 01

## Reference and evidence

Primary reference: https://brittanychiang.com/
Supporting archive: https://brittanychiang.com/archive
The reference homepage and archive were successfully opened during the selection stage. Its extracted content confirmed About, Experience, Projects, Writing, social destinations, a résumé link, selected-project links, a project archive, and a compact credit footer. Writing destinations are external on the reference. The source homepage describes its own use of Next.js and Tailwind; neither is used here.

Visual direction follows the selected reference’s dark, restrained personal-portfolio layout: a large identity column beside a narrow reading column, substantial vertical spacing, compact uppercase section navigation, muted body text, mint accents, date-led experience rows, thumbnail-and-text project cards, technology pills, and editorial writing summaries. Responsive rules convert the desktop columns into a stacked layout.

Browser access failed in this environment (“browser access host is unavailable”). No screenshot comparison, exact pixel measurement, browser runtime verification, or current DOM/style inspection was possible during implementation. This is an independently authored structural interpretation, not a verified pixel-identical clone. Exact typography, breakpoints, animations, spacing, and hover behavior remain approximations.

## Preserved architecture

- Compact personal homepage with About → Experience → Projects → Writing progression.
- Prominent identity/role introduction, supporting personal positioning, and professional history.
- Desktop persistent identity sidebar; content flows alongside it.
- Project thumbnails, concise descriptions, topic/technology pills, archive link, résumé CTA.
- Separate project archive with a compact tabular index.
- Small editorial writing list and credit area.

## Intentional content substitutions

- Fictional engineer Rowan Ellis replaces Brittany Chiang.
- Fictional employers, dates, project narratives, and article copy replace the owner’s material.
- Three locally authored abstract SVG interface studies replace photographs and project screenshots.
- Site-local contact actions replace real social profiles to avoid impersonation or misleading destinations.
- No borrowed photos, real endorsements, client logos, résumé, book/course products, or proprietary code.
- System sans-serif replaces the reference’s exact font dependency. No third-party asset requests.

## Research extensions, not observed original features

The following additions satisfy the approved research brief and should not be counted as faithful observations of the reference:

| Addition | Implementation |
| --- | --- |
| Utility bar and Explore menu | Sticky on compact layouts; native details dropdown with Escape/outside close |
| Local project details | Three full case-study documents rather than outbound project links |
| Local writing | Searchable listing and three article documents rather than external publications |
| Search and tag/category interaction | Client-side AND combination, live count, empty state |
| Contact / booking / newsletter | Native validation and in-memory demonstration success |
| NDA project | Explicitly insecure client-side demonstration gate |
| Masonry gallery and lightbox | CSS columns, native dialog, previous/next image controls |
| Theme control | In-memory light/dark variable switch |
| Availability and clock | Fictional availability plus New York time |
| Services / FAQ / Toolkit / Press | Separate extension pages, including native accordions |
| Testimonials | Fictional, manually operated carousel |
| Prints | Local placeholder catalogue and modal purchase simulation |
| CV and About | Expanded local documents plus plain-text résumé download |
| Footer | Expanded navigational columns to expose research pages |
| 404 | Standalone static error document; host routing must be configured |

No standalone video carousel is included: the manually operated testimonial carousel covers the carousel/slider interaction family without adding redundant homepage UI. A sidebar is represented by the identity column and the article table-of-contents panel. The design does not insert a generic marketing utility/header/footer stack into the reference’s core homepage merely to make it resemble the more complex sites in the study.

## Code and behavior fidelity

Rendered websites do not establish their internal architecture or coding syntax. This package reproduces page structure and visible interaction concepts using new HTML, CSS, and JavaScript. There is no React, framework emulation, dependency bundle, build tooling, database, backend logic, or network submission. All state is page-local and ephemeral; theme preferences and form values do not persist across navigation.

## Remaining verification

Manual browser checks should compare desktop at approximately 1440px and 1024px, mobile at 390px and 320px, and 200%/400% zoom. Verify native dialogs and date validation in Safari/Firefox/Chromium, keyboard paths, VoiceOver/NVDA announcements, target sizes, and contrast with ambient background effects. The included source-check results do not substitute for those checks.
