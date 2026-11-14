# UNI-03 fidelity notes

Replica: Cardinal Ridge Community College (fictional). Reference: Northern Virginia Community College, https://www.nvcc.edu/ (research metadata only). Source verified 2026-11-10 (HTTP GET via curl, per `Websites/pipelines/claude/research/UNI.md`), approved 2026-11-13. The builder did not re-fetch or render the reference; everything below about the reference comes from that research block. Dropdown behaviour in the reference was read from HTML only and was never observed rendered.

## Page mapping

| Reference page | Local page | Status |
| --- | --- | --- |
| Home | index.html | Approximated: hero, Find What Works, You get, Advising & Support, Financial Aid Options, stats, Got questions, in the recorded order. The reference "Six ..." stats block text was cut off in research, so the stats content is invented. |
| Find a Program | programs.html, program.html | Simulated. The reference form posts to an API that was not fetched, so its result data, ordering and filter options are **unobserved**. Local finder (text query, Degree, Interest, plus an added Campus filter) runs over 31 invented records. Program detail is an intentional addition (the reference's result detail was not observed). |
| Academic Calendar | calendar.html | Approximated; term/type filters are an intentional addition. Dates invented. |
| Admissions & Aid | admissions.html | Approximated. |
| Apply to NOVA | apply.html | Simulated. Reference links to an external portal; local page has a labeled demo sign-in dialog and a practice interest form. |
| Financial Aid | financial-aid.html | Approximated. |
| Tuition & Costs | tuition.html | Approximated; calculator is an intentional addition. |
| Visit & Connect | visit.html | Approximated. Reference tour/webinar links go to third-party services and are omitted. Request Info form is a labeled demo (reference links to an external portal). |
| Student Resources | student-resources.html | Approximated as one page with anchored sections. |
| Student Life | student-life.html | Approximated, short. |
| Locations | locations.html | Approximated with five invented locations. |
| Directory | directory.html | Replicated pattern (people/offices choice) over 24 invented people and 8 offices. |
| News | news.html | Approximated; filter/search is an intentional addition. |
| Schedule of Classes | omitted | Not mapped (no inventory slot; no local page, so no nav link). |

## Header and navigation
- Replicated: skip link, Quick Links dropdown, Info For dropdown, Apply / Request Info buttons, search form, main nav groups (Academics, Admissions & Aid, Student Resources, Student Life, About) as button-triggered dropdowns, News link, mobile Menu disclosure, four-group footer (Connect with Us, Academics, Campus, Tools).
- Approximated: dropdown contents list only items that have a local page. Quick Links omits Bookstore, Catalog, NOVA Service Portal, Forms (no local equivalent). Info For omits Alumni, Employers, Faculty & Staff. The reference "Give" button is omitted. "Closings" maps to News filtered to Alerts.
- Site search: the reference searches the whole site (`/search?q=`). The local search form submits to the program finder, so scope is programs only (labeled "demo scope").
- Google Translate language list: a prohibited third-party embed. Replaced by a clearly labeled non-functional "Language (demo)" dropdown whose choices only show a status message; page language does not change.
- Gideon Taylor chat hook: omitted (third-party widget). No substitute.
- Social links: omitted (none observed in the research block).

## Branding and content
Name, mark, colors, copy and all records are original/fictional. SVGs are placeholders. Phone numbers use 555 prefixes. No NOVA logos, text or media were used.

## Unverified / not observed
Real program-finder results and filter option lists, real dropdown behaviour at runtime, News dropdown group contents, footer link lists, the real mobile layout.

## Research-relevant observations
- The reference exposes many utility controls (two dropdowns, language list, search, three buttons) above a six-group mega-nav; the replica keeps that density, which adds many tab stops before main content (the skip link mitigates this).
- Dropdown panels are plain disclosure buttons, not ARIA menus, to keep keyboard semantics simple.
