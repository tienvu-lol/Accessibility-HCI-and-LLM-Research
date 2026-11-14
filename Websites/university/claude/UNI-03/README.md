# UNI-03 - Cardinal Ridge Community College (fictional)

- Replica ID: UNI-03 | category: university (School / University) | slot 3 | stratum: community college | model group: claude
- Approved source (research metadata only): Northern Virginia Community College, https://www.nvcc.edu/ - verified 2026-11-10 by HTTP GET via curl, approved 2026-11-13 (see `Websites/pipelines/claude/research/`). This builder did not re-fetch it.
- Branding: fictional "Cardinal Ridge Community College"; placeholder SVG mark; original copy. All data is invented.
- Active-allocation note: built under the reduced active allocation (slots 01-06) in force on 2026-11-13.

## Run locally
Open `index.html` in a browser from disk. No server, build step, network or library is needed (vanilla HTML/CSS/JS, data inline in `js/main.js`).

## Sitemap and page-to-source mapping
| Local | Reference |
| --- | --- |
| index.html | Home |
| programs.html | Find a Program (API-loaded; data unobserved) |
| program.html?id=... | intentional addition (program detail) |
| calendar.html | Academic Calendar |
| admissions.html | Admissions & Aid |
| apply.html | Apply (simulation) |
| financial-aid.html | Financial Aid |
| tuition.html | Tuition & Costs |
| visit.html | Visit & Connect (+ Request Info demo) |
| student-resources.html | Student Resources |
| student-life.html | Student Life |
| locations.html | NOVA Locations |
| directory.html | College Directory |
| news.html | News |
| 404.html | - |

14 content pages + 404.html. Files delivered: 24 (15 HTML, css, js, 3 SVG, README, fidelity-notes, component-inventory.json, generation-metadata.json).

## Sample data
31 programs, 17 calendar dates, 10 news stories, 24 people + 8 offices, 5 locations. All fictional.

## Features
- Header: skip link, Quick Links and Info For dropdowns, demo-only Language dropdown, Apply/Request Info buttons, search, 5 dropdown nav groups + News, mobile Menu disclosure; Escape closes menus.
- Program finder: text query + Degree + Interest + Campus (Campus is an intentional addition), live count, empty state, reset, `?q=` and `?interest=` preload.
- Program detail, calendar filter, news filter/search, directory people/offices search, tuition calculator (intentional addition).
- Forms (apply practice form, portal sign-in dialog, request-info): required/email/min-length validation, inline errors, error summary receiving focus, demo success message. Nothing is sent or stored.

## Simulations and omissions
Application portal and sign-in are simulation only (labeled). Language list is a non-functional demo. Chat widget, virtual tour, external scheduling and translation are omitted. See `fidelity-notes.md`.

## QC (Rules.md section 9)
Run: `node Websites/tools/qc/qc.js Websites/university/claude/UNI-03` on 2026-11-13, pages=15, `pages=15 files=24 failures=0 warnings=0`.
| Gate | Result |
| --- | --- |
| 13 Technology | pass (qc.js prohibited-tech and remote-request checks; no frameworks, CDNs or fonts) |
| 14 Completeness | pass (required files present; qc.js broken link/asset check) |
| 15 Structure | pass for landmarks, skip link, data-section/data-component (qc.js); fidelity to reference hierarchy is a builder judgement from the research block only |
| 16 Interaction | pass for scripted Playwright flows: program search/filter/empty/reset, detail found/not-found, mobile menu + Escape, dropdown + Escape focus return, language demo, form errors + summary focus + success, dialog open/Escape/focus return, directory, calendar, news, calculator |
| 17 Accessibility | partial: axe-core (WCAG 2.0-2.2 A/AA + best practice) at 1280 and 375 with no failures and no horizontal scroll (qc.js); other items not tested below |
| 18 Traceability | manually inspected |
| 19 Scope | manually inspected; additions are labeled |

Not tested: screen readers, 200%/400% zoom and text-spacing overrides, a manual keyboard-only walkthrough, forced-colors mode, touch devices, browsers other than headless Chromium, contrast beyond axe's automated check, `prefers-reduced-motion` runtime behaviour (CSS rule present, no animations used). This is a WCAG 2.2 AA-oriented baseline, not a conformance claim.

## Known limitations
Program results are invented (reference data unobserved). Site search covers programs only. Dropdowns are disclosure buttons. Dialog uses native `<dialog>`.
