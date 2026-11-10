# Portfolio — Claude slots 01–03

Three static portfolio replicas built under `RULES.md` (WEB-REPLICA-V1.0) and
`MODEL_ALLOCATION.md` (WEB-REPLICA-ALLOCATION-V1.0). Every person, studio, project, all copy and
every image is fictional or a placeholder.

| Slot | ID | Replica (fictional) | Approved source | Stratum | Pages |
|---|---|---|---|---|---|
| 01 | PORT-01 | Tobias Quill | https://tholman.com/ | Minimal one-page personal site | 23 |
| 02 | PORT-02 | Priya Raman | https://brittanychiang.com/ | Software developer / engineer | 19 |
| 03 | PORT-03 | Juno Salvi | https://andreaswannerstedt.se/ | Motion / 3D designer, gallery-first | 19 |

Open `PORT-0x/index.html` in a browser. Each replica runs from `file://`, offline, with no server,
no build step and no network request. Per-replica detail is in each folder's `README.md`,
`fidelity-notes.md`, `component-inventory.json` and `generation-metadata.json`.

## Provenance

Model `claude-opus-5`, Claude Code CLI, interactive session, one replica per delivery. The Phase A
approval gate was observed: a ten-row source table was approved by the project lead on 2026-11-09
before any code was generated. Sources were verified by live HTTP fetch plus a web-search
cross-check on the same date.

## Validation

`node Websites/tools/qc/qc.js Websites/portfolio/claude/<ID>` — **failures=0, warnings=0** for all
three, 2026-11-10.

| | PORT-01 | PORT-02 | PORT-03 |
|---|---|---|---|
| axe-core 4.10.2, 0 violations | 69 runs | 57 runs | 57 runs |
| Scripted Playwright checks | 93/93 | 91/91 | 98/98 |
| JavaScript console errors | 0 | 0 | 0 |

Every page is scanned at 1280px light, 375px light and 1280px dark. **Not tested:** manual keyboard
walkthrough, screen readers, 200%/400% text zoom, real assistive-technology users; and on PORT-03,
captions and audio description, because no video file is bundled.

## Deliberate variation across the three

The replicas are built to differ, so the sample is not one site three times.

| | PORT-01 | PORT-02 | PORT-03 |
|---|---|---|---|
| Layout | Single column, text first, serif | Sticky identity rail + scrolling column, dark first | Full-width gallery grid, big display type |
| Theme | System setting only | Light/dark toggle, `localStorage`, no flash | System setting only |
| Lists | Blog pagination | Blog show-more; sortable archive table | Gallery filter + grid/list view switcher |
| Media | `<dialog>` lightbox | `<dialog>` lightbox | Hand-written carousel; demo reel player |
| Disclosures | Accordions | None | None |
| Motion | Position-only scroll reveal | Pointer spotlight, off under reduced motion | CSS-animated loop marks + a site-wide motion control (2.2.2) |
| Distinctive tool | Copy-email, availability clock | Table sorting with `aria-sort` | Price estimator with a live region |
| Script shape | One IIFE | Module object of init functions | Named features on a registry, fault-isolated |
| Storage | None | Theme only | None |

## Note on the first build

These three were first built with Bootstrap 5.3.3 and jQuery 3.7.1, which the project lead's brief
had asked for and `RULES.md` §2 prohibits. The conflict was reported, the lead chose removal, and
on 2026-11-10 both libraries were deleted and every widget that depended on them was reimplemented
in vanilla JavaScript and CSS. Details are in each replica's `fidelity-notes.md` and in
`metadata/change-log.md`.
