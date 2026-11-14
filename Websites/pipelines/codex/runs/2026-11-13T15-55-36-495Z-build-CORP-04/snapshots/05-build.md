# Phase B — One Codex replica

Read the shared `Websites/Rules.md` and `Websites/MODEL_ALLOCATION.md` completely. Build exactly the single source in the exact task context. The selected source, approved page map, model, category, and output directory are fixed. Missing, changed, or unverifiable approval/source evidence must stop this task; do not substitute another source or inherit Claude's waiver.

## Scope and boundaries

Write website files only inside the assigned `Websites/<category>/codex/<ID>/`. Keep run evidence in this task's `pipelines/codex/runs/<run-id>/` directory. Do not touch another model group's files or prompts, the shared rules/QC, or unrelated websites. Use an isolated checkout for concurrent work; pipeline task preparation does not itself create worktrees or launch agents. Do not commit, push, publish, or send messages. One replica is one run and one delivery. Do not start another site automatically.

Confirm that the actual model/runtime matches the declared assignment before generation. If the underlying model cannot be identified, report that fact rather than invent an exact model name. Record start/completion timestamps from the real clock, available tools, generation budget if known, retries, and all human or cross-model changes. Preparation timestamps are not generation timestamps. Preserve the exact prompt and protocol snapshots.

## Implementation

Use semantic HTML5, CSS3, and vanilla JavaScript only. Follow the approved page map and observed information architecture, navigation, hero/above-the-fold hierarchy, content bands, sidebar where present, footer, and source-specific detail pages. The category checklist is conditional; omit nonexistent features or explicitly document approved research additions. Do not impose a universal homepage or arbitrary page-count quota.

Each site works independently through ordinary file:// navigation with relative paths, local placeholder artwork, and inline demo data. Default shared files within the site: css/styles.css and js/main.js. Repeat critical navigation HTML consistently. No frameworks, jQuery, Bootstrap, external UI libraries/fonts/CDNs, runtime package installation, templating, PHP, backend, database, external widgets, accounts, API calls, or build step. The shared external QC dependencies are permitted evaluation tools and must never be copied into the site.

Use fictional names, original prose, and original placeholder assets. No copied logos, seals, real testimonials, proprietary media, or claims of measured outcomes. Every visible control must work on meaningful local samples or be clearly identified as a nonfunctional demo. Forms validate with intelligible errors and useful focus/status feedback; payments, applications, appointments, subscriptions, portals, giving, and logins never perform real transactions. Follow the task's category-specific simulation restrictions.

Target the shared WCAG 2.2 AA baseline: landmarks, logical heading hierarchy, one H1, visible-on-focus skip link to main id="main-content", native controls, labels, descriptive feedback, visible focus, keyboard operation and Escape dismissal, dialog focus handling, readable contrast, responsive reflow, reduced motion, and useful image alternatives. Do not claim conformance or inject intentional defects. Instrument meaningful regions and reusable components with stable descriptive kebab-case data-section/data-component values; do not indiscriminately label incidental spans.

## Required output and provenance

Include all approved mapped pages, index.html, 404.html, css/styles.css, js/main.js, local assets, README.md, fidelity-notes.md, component-inventory.json, and generation-metadata.json. Use the schemas in the shared protocols. README includes source ID, actual verification method/date, complete sitemap and source mapping, sample dataset counts, interaction/simulation notes, run instructions, QC evidence, and limitations. Fidelity notes distinguish replicated, approximated, simulated, added, omitted, and unverified elements. Component inventory lists actual locations/selectors, behavior, keyboard expectations, and test status.

generation-metadata.json must accurately identify the category, numeric slot, stable source ID, model_group codex, actual declared model/version/runtime, operator, source URL/verification/approval evidence, real generation timestamps, durable protocol/prompt revisions, generation mode, human edits, and the seven validation gates. Use supplied SHA-256 snapshots as durable revisions; include additional commit references when known. Do not copy hardcoded Claude dates/model IDs or label unknown fields as verified. A changed model or scope requires a documented reassignment.

## Validation and handoff

Run the same shared QC as the other arms. If needed, install its locked dependencies from Websites/tools/qc using npm ci, outside the replica. Execute shared qc.js against this one output and retain the JSON/log evidence in this run directory; record-qc.mjs provides that wrapper. Report inability to execute browser tests as not-tested/blocked, never as failures=0. Do not weaken or edit the QC to pass.

Exercise the implemented interaction states separately: menus and keyboard dismissal, local search/filter/sort and empty results, validation and demo success, tabs/accordions, dialogs/focus return, and category-specific flows. Initial-page axe scans do not test these states. Record exact tests performed and untested screen-reader/zoom/browser/fidelity checks. Preserve the first QC report and log every correction/retry; distinguish the initial generated artifact from any repaired revision for study analysis.

Finish with complete files, a concise page/file count, source and verification status, actual QC outcome and evidence location, interactions tested, deviations, and remaining limits. Update run evidence; the coordinator updates only this Codex assignment row and change log after reviewing actual delivery. Prepared != generating, submitted != accepted, and successful automated QC != human acceptance. Stop after this site.
