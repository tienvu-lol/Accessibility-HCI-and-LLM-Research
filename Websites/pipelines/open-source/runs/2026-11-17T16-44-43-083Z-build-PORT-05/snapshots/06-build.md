# Phase B — build one replica

You build exactly one static website replica: the single approved source in your task, into the single directory the orchestrator writes for you. One run is one replica. Do not start a second site, do not change the source, and do not widen the page map. If the approved source, its page map or the model attribution in your task looks wrong or missing, stop and say so — that is a real blocker, not permission to choose for yourself.

The build runs over several exchanges. Emit files through the file protocol, end each reply with a status line, and the orchestrator writes what you send and tells you what it wrote. It also tells you when a file was rejected and why; fix and resend that file.

## Suggested order

1. **Plan.** No files yet. List the local pages from the approved map, the shared components each page uses, the sample datasets you will inline and their row counts, and the interactions you will implement. Keep it short.
2. **Shell.** `css/styles.css`, `js/main.js`, `index.html`. These three set the pattern every later page follows.
3. **Pages.** Two or three per reply, in the map's order, then `404.html`.
4. **Assets.** Local `.svg` placeholders as you need them.
5. **Documentation.** `README.md`, `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json`.

## Technology — the hard boundary

Semantic HTML5, standard CSS3, and vanilla JavaScript using browser-native APIs. One `css/styles.css` and one `js/main.js` shared by every page unless complexity genuinely demands a split.

Prohibited, without exception: React, Vue, Angular, Svelte and any other framework or component system; jQuery, Bootstrap, Tailwind, any CSS framework, UI kit or icon font; TypeScript, JSX, templating engines, npm packages, bundlers, any build step; PHP, Python, server-side includes, databases, APIs, authentication, backends; remote CDNs, web fonts loaded over the network, third-party widgets, trackers and embeds.

Every page must work by opening the file directly in a browser — `file://`, no server. So: relative paths only, never a root-absolute `/path`; no `fetch()` of local JSON, because browsers block it over `file://` — inline your demo data as JavaScript arrays or objects; all images local, `.svg` preferred. If any feature would need a local HTTP server, drop it rather than requiring one. `href="#"`, dead buttons and controls that silently do nothing are failures: every visible control either works on local data or is clearly labelled a non-functional demonstration.

## Fidelity and originality

Reproduce the reference's information architecture, layout patterns, hierarchy, navigation structure and interaction patterns. Do not reproduce its identity: use a fictional organization name, original prose, and original placeholder artwork. No real logos, wordmarks, seals, trademarks, copyrighted text, real photographs, real staff, real testimonials or real statistics. Nothing may claim a measured outcome or an endorsement.

Build only what the evidence in your task supports. The category checklist is conditional — omit a feature the reference does not have, and label anything you add on purpose as an intentional addition in the fidelity notes. No universal homepage template, no page-count quota, no hundreds of mock records: enough sample data to exercise filters, empty states, errors and keyboard flows, with the counts stated in the README.

Where the reference's flow depends on a real service — payment, ordering, reservation, application, login, portal, donation, subscription — implement a simulation with a clearly marked demo outcome, or an accessible non-functional demonstration with an explanation. Never imply that a transaction, submission or account action really happened. Follow your category's simulation restrictions exactly; some categories forbid plausible-looking content outright, such as live weather alerts or health advice.

## Accessibility baseline

Target WCAG 2.2 Level AA as an implementation standard. Every page needs: `<html lang>`; a skip link to `#main-content` that is the first focusable element and visible on focus; `<main id="main-content">` plus header, nav and footer landmarks; exactly one `<h1>` and a logical heading order with no skipped levels; native `<button>`, `<a>`, `<input>` and `<label>` in preference to ARIA, with ARIA only where native semantics fall short; programmatic labels on every field, with inline errors, an error summary, and focus moved to the problem; `aria-expanded` on disclosures and menus; Escape closing menus and dialogs, with focus returned to the trigger; a visible focus indicator everywhere; text alternatives that carry meaning, and `alt=""` on decorative art; sufficient contrast, and state never signalled by colour alone; responsive reflow with no horizontal scrolling at 375px; and `prefers-reduced-motion` respected.

Write that this is a WCAG-oriented baseline. Do not write that the site is compliant or conformant — no audit has happened. Do not introduce defects on purpose.

## Research instrumentation

Tag every meaningful region and reusable component instance with stable kebab-case attributes: `data-section` for the page region, `data-component` for the recognizable UI pattern, both where they apply. The same pattern keeps the same `data-component` value across pages and sites, for example `site-header`, `primary-nav`, `card-grid`, `contact-form`, `site-footer`. Add `data-instance` where one page holds several instances. Do not tag incidental spans. These are research metadata and never a substitute for semantic HTML or ARIA.

## Required documentation

- `README.md` — replica ID; category; fictional branding; the approved source URL; verification method and date exactly as the task states them; how to open the site locally; the full sitemap; the page-to-source mapping; sample dataset row counts; interaction and simulation notes; the seven QC gates of `Rules.md` section 9 reported as pass, fail or not tested; and what was not tested. Screen readers, zoom, manual keyboard walkthroughs and non-Chromium browsers are not tested unless the orchestrator tells you they were.
- `fidelity-notes.md` — page by page and component by component, what is replicated, approximated, simulated, intentionally added, omitted or unverified, with a reason for every material deviation, and anything worth knowing for the research.
- `component-inventory.json` — valid JSON in the `Rules.md` section 8 shape: every unique component with its selector, the pages it actually appears on, its behaviours, its keyboard expectations, and its real status and validation state.
- `generation-metadata.json` — valid JSON in the `MODEL_ALLOCATION.md` section 6 shape. Copy the identifiers, model attribution, approval and revision values from your task verbatim; they are recorded facts, not fields to fill from memory. Leave `validation_summary` gates at `not-tested` — the orchestrator sets them from the real QC run — and never copy another group's model IDs or dates.

## Finishing

Your last reply emits `=== STATUS: COMPLETE ===` and a short closing note: the fictional name, the page and file counts, the interactions you implemented, and every deviation and limitation you know of. Then stop. The orchestrator runs the shared QC and comes back if anything failed. Preparation is not delivery, QC passing is not acceptance, and acceptance is a human decision made elsewhere.
