# Change log

## 2026-11-10 — Portfolio registered as a category; Claude slots 01–03 delivered

- **Category added.** `portfolio` had no rows in `assignments.csv`. It is now registered with all
  ten slots and the mandated 3 Claude / 3 Codex / 4 open-source split, plus
  `source-inventories/portfolio.csv`.
- **Claude slots 01–03 (PORT-01/02/03)** delivered at `portfolio/claude/`. Sources: tholman.com,
  brittanychiang.com, andreaswannerstedt.se. Model: `claude-opus-5` in an interactive Claude Code
  session.
- **Approval gate observed (RULES.md §3).** A ten-row approval table was presented on 2026-11-09
  and approved by the project lead before any code was generated. This differs from the Claude
  batch logged above, where the Phase A stop was waived.
- **Library conflict, reported and resolved.** The lead's portfolio brief required Bootstrap 5 and
  jQuery; `RULES.md` §2 prohibits both. Following the precedence note in `RULES.md`, the conflict
  was reported rather than silently resolved. The lead chose removal: on 2026-11-10 `assets/vendor/`
  was deleted from all three replicas and the dropdown, slide-in navigation, disclosures, image
  dialog, form controls, layout utilities and base reset were reimplemented in vanilla JS and CSS.
  `Websites/tools/qc/qc.js` now reports **failures=0, warnings=0** for all three.
- **Instrumentation corrected.** The first build used `<main id="main">`; `RULES.md` §7 requires
  `id="main-content"`. Fixed on every page, along with each skip-link target.
- **Codex set relocated, unchanged.** Three Codex portfolio replicas were moved from a top-level
  `portfolio websites/websites by codex/` folder into `portfolio/codex/`. No file inside them was
  modified.

### Unresolved, for the project lead

1. **Slot numbering.** The Codex directories are named `01-…`, `02-…`, `03-…`, but
   `MODEL_ALLOCATION.md` §2 assigns Codex slots 04–06. They are registered as slots 04–06 with
   their real directory names; renaming is the owning group's call.
2. **Duplicate reference.** `brittanychiang.com` is the source for both slot 02 (Claude, PORT-02)
   and slot 04 (Codex, `01-rowan-ellis`). §2 forbids duplicating a reference within a category, so
   one slot needs re-sourcing.
3. **Scope statement.** `metadata/source-inventories/README.md` still says "Portfolio and
   restaurant are outside this 100-site study", which now contradicts the register. Either the
   sentence or the category registration should change.
4. **Open-source slots 07–10** have no approved reference and are recorded as `planned`.

## 2026-11-10 — Claude slots 01–03 for 10 categories

- Categories: university, healthcare (hospital), company (banking & tech), e-commerce, news, government (public), fashion (content-driven), weather, nonprofit (& charity), church.
- Model: `claude-sonnet-5-5` via the `claude-bridge` provider, dispatched by pi-subagents from a `claude-opus-5-5` orchestrator session. One agent run per replica.
- **Approval-gate deviation (RULES.md §3):** the project lead (repo owner, tienvu-lol) told the agents to proceed without stopping at Phase A. References were chosen and verified by a research agent, and the lead's instruction stands in as approval. Each replica's `generation-metadata.json` records this.
- Restaurant rows were added to the register from `restaurant websites/README.md`. That batch predates this allocation protocol, and its model group was not recorded.

## 2026-11-10 — Codex pipeline setup (no generation)

- Confirmed project scope: ten active categories listed above, excluding portfolio and restaurant; fixed 3 Claude / 3 Codex / 4 open-source allocation per category. Legacy materials are preserved outside the active allocation.
- Added pipelines/codex configuration, category strata/checklists, research/build/correction prompts, forty planned tasks, validation/task-preparation/shared-QC-recording scripts, provenance snapshot format, and tests.
- Added blank ten-slot central source-inventory templates and format documentation. No sources, model IDs, verification evidence or approvals were fabricated or imported automatically.
- No website generation, model invocation, publication or assignment-status transition occurred. Model selection remains unresolved until declared from the actual generation runtime. Claude's approval waiver is not inherited.
- Existing Claude pipeline, shared generation/allocation rules, QC implementation and assignment rows were left unchanged.
