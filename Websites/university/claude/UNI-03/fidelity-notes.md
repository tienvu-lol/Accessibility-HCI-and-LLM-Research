# UNI-03 fidelity notes

Reference: Northern Virginia Community College, https://www.nvcc.edu/ (verified by curl 2026-11-10, HTTP 200; **no page was rendered in a browser**, so layout, dropdown behavior and visual design below are inferred from the HTML description in `Websites/pipelines/claude/research/UNI.md`). Replica: Harbor Valley Community College (fictional).

## Page and component mapping

| Area | Reference observation | Replica | Status |
| --- | --- | --- | --- |
| Skip link | "Skip To Main Content" link in header | First focusable element on every page, `href="#main-content"` | replicated |
| Utility bar: Quick Links dropdown | College Safety, Contact Us, Directory, Bookstore, Libraries, Schedule of Classes, Catalog, Testing Centers, NOVA Service Portal, Forms, Closings | Directory, Schedule of Classes, Locations, Contact Us, Service Portal sign-in (demo dialog) | approximated (items with no local page omitted); portal **simulated** |
| Utility bar: Info For dropdown | 9 audience links | 5 audience links to local pages/anchors | approximated |
| Language list | Google Translate, ~20 languages | 4-language disclosure that only shows a "demo" message | **simulated** |
| Apply / Give / Request Info buttons | Three buttons, external portals | Apply -> `apply.html`, Request Info -> `visit.html#request-info`; Give omitted | approximated / omitted |
| Site search | GET form to `/search`, `q` | GET form to `search.html`, searches a local page+program index | replicated (local data) |
| Primary nav | Six dropdown groups (Academics, Admissions & Aid, Student Resources, Student Life, About, News likely) | Five disclosure groups + a News link; open on click/Enter/Space (not hover); mobile "Menu" disclosure | approximated; News group treated as a single link because the reference's News group was not captured |
| Home hero | h3 "Support for Every Journey" + CTAs | h1 with same idea in original words, three CTAs, SVG illustration | replicated structure; heading level differs (replica uses h1) |
| Home sections | Find What Works, You get, Advising & Support, Student Resources, Financial Aid Options, stats block, Got questions? | Same order: Find What Works (program quick search), You Get, Advising & Support (with Student Resources list), Financial Aid Options, At a Glance stats, Got Questions? | replicated order; the stats block label ("Six ...") was cut off in research, so its content is invented |
| Footer | Connect with Us, Academics, Campus, Tools | Same four groups, original links; fictional-site notice added | replicated / intentionally added notice |
| Program finder | Text "Search for programs" (auto-submit), Degree select, Interest select; results rendered client-side from an API | Same three controls; live filtering over 14 inline programs; count, empty state, clear | replicated controls; results **simulated** (API not fetched) |
| Program detail | Not inspected | `program-detail.html?id=` | **intentionally added** |
| Schedule of Classes | Page exists (content not captured) | Search over 10 invented sections with campus/format/open-seat filters | approximated, **intentional filter additions** |
| Academic Calendar | Page exists (content not captured) | Term select + date table | approximated |
| Admissions & Aid, Apply, Financial Aid, Tuition & Costs, Visit & Connect | Pages exist; hub links in nav | One page each with original copy; admissions pages share a sidebar local nav | approximated (page body content not captured; sidebar is an addition) |
| Apply flow | External application portal | Practice form with validation + demo success | **simulated** |
| Visit page | Campus tour, virtual tour, webinar/event links on an external hub | Three option cards + visit/information request form | approximated; form **intentionally added** |
| Tuition calculator | Not observed | Credits x residency estimator, labeled demo | **intentionally added** |
| Student Resources, Student Life | Hub pages with many sub-pages | One page each with anchored sections used by menu links | approximated (sub-pages collapsed to sections) |
| Locations | Page exists | Four cards (three campuses + online) | approximated |
| College Directory | Search form with people/other radio choice | Radio People/Offices + validated query + 14 invented entries | replicated pattern; data **simulated** |
| News | Page exists | Search + category filter over 8 stories | approximated; filter **intentionally added** |
| 404 | Not inspected | `404.html` with links back | required addition |

## Omitted / unverified

- Omitted: Give button, chat widget (Gideon Taylor hook), Honors Program, Study Abroad, Divisions, Workforce pages, Bookstore, Catalog, Forms, Closings, ~15 other reference nav items without a local page.
- Unverified: real page layouts, colors, typography, dropdown/hover behavior, exact home-page copy and the News menu group. Colors and type are original choices (navy, gold, teal; system font stack), not copied.

## Material deviations and rationale

- Dropdowns use click/keyboard disclosure buttons with `aria-expanded` instead of hover, for keyboard access and consistency on touch.
- Menus link only to existing local pages or anchors, to avoid dead links (Rules section 5).
- No external fonts, Google Translate, chat or API; all behavior uses inline sample data.

## Research-relevant observations

- The reference exposes a heavy utility/mega-nav before the main content; the skip link addresses it. The replica keeps that structure (three utility dropdowns + six primary items), which is a navigation-density challenge worth noting for evaluation.
- The reference's program finder is API-driven (`data-auto-submit`); the replica filters on every input event and announces the result count through a `role="status"` region.
- Pages were assembled with a throwaway generator script (not in the repo), so header/footer markup is identical across pages.
