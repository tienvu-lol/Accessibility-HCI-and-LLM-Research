# UNI-01 fidelity notes

Reference: University of Wisconsin-Madison (https://www.wisc.edu/), verified 2026-11-10 by curl (HTML only), approved 2026-11-13. Replica: fictional "Cedar Lake State University". No pixel fidelity is claimed; visual design, copy, colours, logo and imagery are original.

## Page mapping
| Local | Reference | Status |
| --- | --- | --- |
| index.html | / | replicated section order and headings (reworded), approximated visuals |
| academics.html | /academics/ | approximated (content not read in detail) |
| majors.html | /academics/majors/ | replicated as a list page; filter/search/dialog **intentionally added** (reference is a link page with no finder) |
| admissions.html | /admissions/ | replicated the three observed sections (affording, promise programs, professional schools); tuition table **intentionally added** because reference tuition 404s locally and links to a bursar subdomain |
| apply.html | /admissions/apply/ | approximated steps; form **simulated** (reference uses an external portal) |
| visit.html | /visit/ | approximated; visit request form and map placeholder **intentionally added** |
| directories.html | /directories/ | replicated purpose; behaviour **simulated** (reference loads a React LDAP lookup; its API was not fetched) |
| research, student-life, athletics, about, facts | same paths | approximated from page titles only; section contents invented |
| news.html, events.html | news.wisc.edu, today.wisc.edu | **simulated** stand-ins for separate sites; reference-only subdomain pages not replicated |
| services.html | utility and footer link targets | **intentionally added** local stand-in because those targets are external tools |
| search.html | /search/ | **simulated** over local data |

## Components
- Header: search form (replicated), flat 6-item Main Menu (replicated; no dropdowns, as observed), 14-item Utility Menu (replicated; targets local stand-ins). Mobile disclosure is **inferred** (not observed because the reference was not rendered).
- Hero with Visit and Apply buttons: replicated pattern.
- Home sections: all nine observed h2 topics reproduced in order with original wording.
- Footer: Popular, Resources, Quick links groups replicated; group-to-link assignment is partly inferred in the research, so it is also inferred here.
- Breadcrumbs, title band, accordions, tables, dialog: replica additions for interior pages (not observed).

## Omitted
Look-ahead container under the search input, cookie-consent script, site-alert script, Google Tag Manager/analytics, web fonts and fingerprinted assets (prohibited or not applicable), real photography, real logos and seals.

## Unverified
Dropdown or other JS behaviour of the reference; interior page content beyond titles and the sections recorded in the research block; accessibility of the reference.

## Research-relevant observations
- The reference main nav is flat, so the replica has no menu-bar dropdown; disclosure complexity exists only on mobile.
- Several rendered states (error summary, dialog, empty state) are produced by JavaScript at runtime; they were included in the axe checks.
- Form errors are shown on submit only, not on blur, because blur-time messages shifted layout and swallowed clicks during scripted testing.
