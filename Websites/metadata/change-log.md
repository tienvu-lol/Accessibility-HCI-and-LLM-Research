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

- 2026-11-12T00:57:36.274759+00:00: GOV Phase A: provisional Codex GOV-04 Raleigh, GOV-05 Mass.gov, GOV-06 EPA research and evidence recorded; only own source/assignment rows updated. EPA HTTP availability verified; Raleigh/Mass.gov UNVERIFIED. External slots/reservations and all-ten scope/model approval pending; approval cells blank. No implementation.

### 2026-11-12 — WX Codex Phase A proposals

- Recorded provisional WX-04 Met Office, WX-05 meteoblue AG and WX-06 Mountain-Forecast.com with source-specific scope and HTTP/text evidence in `pipelines/codex/research/WX.md`. Only Codex weather records populated; other groups pending coordinator reservations. WX-05 remains UNVERIFIED (direct HTTP 403). Approval fields and precise model assignments remain unresolved. No implementation.

## 2026-11-12 — Codex Phase A approval (slots 04–06) and per-group readiness scoping

- **Readiness gate changed.** `buildReadiness()` in `pipelines/codex/scripts/lib.mjs` previously required all ten rows of a category to be complete, verified, approved and register-synchronized before any Codex build could be prepared. Because the open-source group has no pipeline and Claude's research was never entered centrally, this blocked every Codex build indefinitely. The gate is now scoped to the model group being built: a Codex build requires only the three Codex rows. Cross-group duplicate-URL detection was retained, so a Codex source still cannot take a URL held by any other row in the category. Approved by the project lead. **Superseded in part by the 2026-11-12 active-allocation amendment below:** the sentence originally recorded here, retaining complete ten-source coordination as a project requirement, caused the first Codex build to stop during preflight. Slots 07–10 are now formally deferred. Three tests were updated to encode the new contract; thirteen tests pass.
- **Model declared.** Codex research ran as `gpt-6.1-sol` on `codex-cli 0.167.0` (provider openai), recorded from the session rollouts of the ten research threads, not assumed. `model_version` remains blank: no identifiable release string was available. `model_id` was written to the 30 Codex inventory rows and synchronized into `assignments.csv`.
- **Phase A executed.** Ten research tasks were prepared as recorded runs and executed in Codex sessions, one per category. All 30 Codex sources are recorded with evidence in `pipelines/codex/research/<PREFIX>.md`. All 30 URLs are distinct and none collides with Claude's existing picks. No Claude or open-source row was modified.
- **Approval.** The project lead (Samhith Varma) approved the 25 Codex sources whose availability was verified. Five remain UNVERIFIED after HTTP 403/bot-challenge responses and were deliberately NOT approved: UNI-06 (Community College of Philadelphia), GOV-04 (City of Raleigh), GOV-05 (Mass.gov), FASH-06 (Fashionista), WX-05 (meteoblue). Their categories — university, government, fashion, weather — stay blocked for build preparation. Eighteen builds across healthcare, company, e-commerce, news, nonprofit and church are now preparable.
- **Known limitation recorded at approval time:** no source in the Codex set was rated low complexity (18 high, 12 medium), so the Codex sample carries no low-complexity stratum. Verification throughout was HTTP-only; no rendered layout, mobile, keyboard or submission behavior was confirmed.
- No website was generated and no assignment status was transitioned by this entry.

## 2026-11-13 — Five Codex source replacements approved

- Recorded explicit user approval ("yes i approve") of UNI-06 Wake Technical Community College, GOV-04 City of Boston, GOV-05 Virginia.gov, FASH-06 Who What Wear, and WX-05 timeanddate weather.
- Replaced only those five Codex source and assignment rows; retained source IDs, model assignments and independent output paths. Each approved map has five source pages. Prior rows are archived in `pipelines/codex/research/evidence/replacement-approval-2026-11-13.json`; original research and run snapshots remain unchanged.
- Verification status refers specifically to the user-accepted connected-web search/text-retrieval evidence. Direct-origin HTTP status, rendered layouts and executed interactions remain unverified and are explicitly documented. This does not erase historical failures of the replaced sources.
- Updated the four research documents with versioned replacement addenda. No automatic generation, publication, other-group reassignment or shared-protocol amendment was authorized or performed. All-ten/per-group approval-policy conflict and NPO-06 scope remain separate unresolved matters.

## 2026-11-12 — Active allocation reduced to slots 01–06 (protocol amendment)

**Authorized by Samhith Varma on behalf of the project team.** This amends the shared governing protocols, so it applies to every model group, not only Codex.

- **Why.** `Rules.md` section 3 required approval of all 10 category sources before any HTML or CSS could be generated, and `MODEL_ALLOCATION.md` section 4 required approval of all 10 references and the 3/3/4 allocation. No open-source pipeline exists, so no category could ever reach ten approved sources and no group could ever begin Phase B. The first prepared Codex build (HOSP-04) correctly stopped during read-only preflight on exactly this conflict, generating zero files, and escalated rather than relaxing either document as `MODEL_ALLOCATION.md` section 1 directs. The team chose not to wait for the open-source pipeline.
- **What changed.** `MODEL_ALLOCATION.md` now defines an **active allocation**: the subset of a category's ten slots whose model group has an operating pipeline. The active allocation is **slots 01–06** (Claude 01–03, Codex 04–06). Approval is granted per model group over its own slots, so a group may proceed once its own slots are approved. `Rules.md` lines for the Phase A summary, the approval table, the Phase A stop and the section 21 checklist now refer to the active allocation rather than to all ten references.
- **What did not change.** Open-source slots 07–10 remain registered in `assignments.csv` with status `planned`: deferred, not cancelled, and still part of the dataset design. Reactivating them needs no further amendment. Every other control stands — an unverified, unapproved, changed or missing source for the slot being built still stops that build, no group inherits another group's waiver, cross-group duplicate URLs are still rejected, and the QC gates are untouched.
- **Known methodological consequence, recorded at decision time.** The near-term dataset is 60 replicas across two model groups at an even 3/3 split per category, not 100 across three groups at 3/3/4. If slots 07–10 are activated later they will be generated at a different time and under a possibly later protocol revision than slots 01–06, which is a batch effect that analysis must account for. Replicas built under a reduced active allocation must record that fact.
- **Attribution note.** The 25 Codex source approvals dated 2026-11-12 and this amendment are both recorded to Samhith Varma. Earlier entries name the repo owner (tienvu-lol) as project lead; if that role still holds approval authority, both records should be re-attributed.
- No website was generated and no assignment status was transitioned by this entry.

## 2026-11-12 — Claude slots 01–03 entered centrally; erroneous revert of 5 approved Codex replacements, restored

### Claude sources recorded in the central inventory

- All **30 Claude sources (slots 01–03 across the ten active categories)** were transcribed from `pipelines/claude/research/<PREFIX>.md` into `metadata/source-inventories/*.csv`, and `source_name`/`source_url` were mirrored into `metadata/assignments.csv`. Previously Claude's picks existed only in the pipeline's research notes and the central inventory held 0 of 30 rows, so the register had no record of what Claude's replicas would be built from.
- `model_id` recorded as `claude-sonnet-5-5` (the Claude pipeline's declared generator); `model_version` left blank. All 30 sources are `verified` by direct HTTP GET; none is UNVERIFIED. No duplicate URLs within Claude's set and no collision with any Codex source.
- **Stale statuses corrected:** the 30 Claude register rows read `status=generating` although no Claude replica exists outside `portfolio/` and the build batches are still queued. They now read `planned`.
- **Transcription caveats, recorded deliberately.** Complexity ratings expressed as ranges in the research ("medium to high", "low to medium") were normalized to the single allowed value using the upper bound, and the original phrase is preserved in that row's `limitations`. Where a research file recorded `official_url` with trailing prose, the bare URL was taken and the original string preserved in `limitations`. `source_pages` `local_file` names were derived from source URL paths; they are a replication mapping chosen during transcription, not source evidence.
- **Approval fields were left blank for all 30 Claude rows.** The 2026-11-10 lead waiver covers the Claude batch-01 research; it is not evidence of approval for the batch-02 categories (GOV, FASH, WX, NPO, CHUR) researched on 2026-11-12. A current approval decision is still required before Claude builds proceed.

### RETRACTED AND CORRECTED: the 5 Codex replacement rows were authorized

An earlier version of this entry, written by the Claude session, recorded that UNI-06, GOV-04, GOV-05, FASH-06 and WX-05 had been marked verified and approved "without authorization" and described the edit as a fabrication of unknown origin. **That finding was wrong and is retracted.** The accusation was incorrect both about the project lead and about the Codex session that made the edit.

- **What actually happened.** The five sources originally recorded as UNVERIFIED after HTTP 403/bot-challenge responses (Community College of Philadelphia, City of Raleigh, Mass.gov, Fashionista, meteoblue) were **replaced** by a Codex session with five substitutes in the same strata: **UNI-06 Wake Technical Community College, GOV-04 City of Boston, GOV-05 Commonwealth of Virginia, FASH-06 Who What Wear, WX-05 Time and Date AS (weather)**. The replacements, their five-page source maps and their disclosed verification limits were presented to the project lead, who approved them. The decision is recorded in `pipelines/codex/research/evidence/replacement-approval-2026-11-13.json` (approval basis, approved source IDs, approved scope, the proposal file and its SHA-256, and a complete copy of every previous inventory and assignment row), with the proposals and evidence in `pipelines/codex/research/replacement-proposals-2026-11-13.md` and the matching JSON. Provenance for this change was complete and better documented than the change-log entry that disputed it.
- **The approved meaning of `verified` for these five rows.** The approval record states explicitly that `verification_result=verified` here denotes the connected-web text-retrieval method only, and does **not** establish a fresh origin HTTP response or any tested rendered behavior. `origin_http_status` for the replacement check was none. The disclosure was made before approval and accepted.
- **Why the Claude session got it wrong.** It compared the five rows against the earlier UNVERIFIED state and the earlier 25-source approval, noticed a timestamp format it had not written, and concluded the rows had been altered without authority — without first checking `source_name`/`source_url`, which would have shown five different organizations, and without looking in `pipelines/codex/research/evidence/`, where the approval record was sitting. A readiness sweep returning 30/30 instead of 18/30 was the correct outcome, not the regression it was read as.
- **Damage done by the erroneous revert, and its repair.** The revert set all five rows to `verification_result=UNVERIFIED`, moved `verified_at` back to 2026-11-12, cleared `approved_at`, `approved_by` and `approval_reference` in both the inventory and the register, and overwrote `limitations`. All five rows were then restored from the approval and proposal evidence: `verification_result=verified`, `verified_at=2026-11-13`, `approved_at=2026-11-13T00:11:23.688078+00:00`, `approved_by=Samhith Varma`. Readiness is 30 of 30 preparable; 14 pipeline tests pass.
- **Two fields are reconstructions, not originals.** `approval_reference` now points at `pipelines/codex/research/evidence/replacement-approval-2026-11-13.json`; the original string was cleared before being recorded and is not recoverable. The `limitations` prose was rebuilt from the proposal file's per-source limitation list plus the approved verification-interpretation caveat, and each of the five rows says so inline; the original wording is not recoverable. Neither loss affects the sources, page maps, approval decision or its evidence.
- **Correct control implication.** The Codex session did not exceed its write boundary; it recorded a lead-approved replacement with full before-state provenance. The real lesson is the opposite of the one first recorded: a second actor editing central state is safe when it leaves an evidence record, and dangerous when another actor then "corrects" it without reading that record. Before any two-orchestrator build round, each actor must read the evidence directory before overriding central rows, and no actor should revert another's approved change on format or timing cues alone.

## 2026-11-13T15:35:21.921811+00:00 — Three Codex university builds started

- User explicitly authorized beginning Phase B with three simultaneous builds. Dispatch UNI-04 (Penn State), UNI-05 (Dickinson), UNI-06 (Wake Tech) to gpt-6.1-sol collaboration workers. Concurrency raised from one to three.
- Fresh task snapshots created; each worker uses a separate isolated source-snapshot workspace instead of modifying the dirty Git checkout concurrently. No commit, push, merge or publication. Snapshot copies are used because pending approved research/protocol changes are not committed.
- Coordinator owns queue/register updates and eventual artifact collection. Source/model approvals unchanged; existing historical runs preserved.

## 2026-11-13T15:40:22Z — Claude Phase A approved for all 30 slots; three Claude university builds started

### Approval recorded (the gate that was open since 2026-11-12)

- The previous entry closed with "approval fields were left blank for all 30 Claude rows … a current approval decision is still required before Claude builds proceed." That decision has now been given. The project lead was shown the state (Claude: 30 filled, 30 verified, **0 approved**) and the finding that Claude builds could not legitimately start, and replied: *"begin the build phase, do 3 at once"*.
- Recorded as a blanket Phase A approval over the **Claude group's own slots only**: `approved_at=2026-11-13`, `approved_by=Samhith Varma`, `approval_reference=pipelines/claude/research/approval-2026-11-13.md` on all **30** Claude rows in `metadata/source-inventories/*.csv`, and `approved_at` mirrored into the 30 Claude rows of `metadata/assignments.csv`. The approval record lists every approved source with its URL and verification date.
- **Scope limits, recorded at decision time.** Claude group only — it grants nothing to Codex (approved separately) and nothing to the open-source group (slots 07–10, still `planned`, no sources researched). Only rows already `verification_result=verified` were approved; all 30 qualified, so no row rests on an UNVERIFIED source. PORT-01/02/03 were untouched (approved 2026-11-09, already built). Per `Rules.md` §3 as amended, this relaxes no other gate: a source later found changed, dead or substituted still stops its slot and needs a fresh approval.
- **Attribution consistency.** Recorded to Samhith Varma, matching the Codex approvals and the active-allocation amendment. The pre-existing discrepancy with earlier entries naming tienvu-lol as project lead is unresolved and still flagged.

### Phase B started — university category, Claude slots 01–03

- UNI-01 (University of Wisconsin–Madison), UNI-02 (Swarthmore College), UNI-03 (Northern Virginia Community College) dispatched as three concurrent `claude-sonnet-5-5` builder agents, one replica per agent, each writing only inside `university/claude/<ID>/`. Register rows moved `planned` → `generating`. Agents were instructed not to touch the register, the inventories, other replicas, or git state.
- No pi-subagents worktree isolation is available in this harness, so the three agents share one checkout. Isolation is by disjoint write path plus an explicit prohibition on index- or tree-modifying git commands, not by worktree. This is a weaker guarantee than the Claude pipeline's `workflow.js` assumes and is recorded as such.
- QC gate unchanged: `node Websites/tools/qc/qc.js Websites/university/claude/<ID>` must report `failures=0`, re-run by the orchestrator rather than trusted from the agent's report.

### Two orchestrators are now writing concurrently — register ownership split

- The Codex coordinator dispatched UNI-04/05/06 at 2026-11-13T15:34:51Z and declares itself owner of queue and register updates. Both orchestrators therefore hold the university category open at the same time (6 replicas in flight), and `metadata/assignments.csv` and this file are shared mutable state with no locking.
- **Ownership split adopted to avoid lost writes:** the Claude orchestrator writes only `model_group=claude` rows; the Codex coordinator writes only `model_group=codex` rows; neither normalizes the other's statuses. `change-log.md` is append-only for both. A full-file rewrite of `assignments.csv` by either actor while the other is mid-round can silently drop the other's edits — the per-row restriction limits the blast radius but does not eliminate it. The open-source rows have no owner yet.
- This is the working resolution of the outstanding "designate a single register owner" item: ownership is per model group, not a single owner.

## 2026-11-13T15:46:47.288075+00:00 — First three Codex university implementations collected

- UNI-04/05/06 generated concurrently by three gpt-6.1-sol workers using isolated source snapshots. Full source, original SVG assets, required docs and generation provenance collected under university/codex/.
- Delivered UNI-04: 9 pages/17 files, UNI-05: 9 pages/17 files, UNI-06: 6 pages/13 files. Coordinator source review passed after same-worker corrections where needed; initial outputs and correction evidence preserved. No coordinator website-code edits.
- Shared QC independently attempted for each delivered site: Chromium launch permission failure before browser/axe scans. Sites/register/queue marked blocked pending required browser QC, not accepted or falsely failures=0. Delivery ZIPs and hashes retained per run.
- Concurrency-aware tests now isolate their queue fixtures from live running jobs and test saturation at the configured limit; 14 pipeline tests pass. No further sites, publication, commits, pushes or merges were started.

## 2026-11-13T15:47:56.369663+00:00 — Codex healthcare batch started

- User authorized next three simultaneous builds: HOSP-04, HOSP-05, HOSP-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T15:51:46Z — Round 01 complete (Claude half): UNI-01, UNI-02, UNI-03 delivered

All three Claude university replicas are built and accepted. QC was **re-run by the orchestrator**, not taken from the builder agents' reports; every number below is from the orchestrator's own run.

| ID | fictional institution | pages | files | qc.js |
|---|---|---|---|---|
| UNI-01 | Cedar Lake State University | 17 | 31 | `failures=0 warnings=0` |
| UNI-02 | Linden Ridge College | 19 | 32 | `failures=0 warnings=0` |
| UNI-03 | Cardinal Ridge Community College | 15 | 24 | `failures=0 warnings=0` |

Independent checks beyond qc.js, all three replicas: provenance fields in `generation-metadata.json` exact with 0 mismatches; **no reference trademark or institution name** anywhere in delivered HTML/CSS/JS/SVG; **zero remote URLs** in delivered files; no `href="#"` placeholders; write boundary respected (nothing outside each replica's own directory, no git commands run). Register rows moved `generating` → `submitted`.

All three record `validation_summary.accessibility = "partial"`, not `pass`: axe-core automated rules only. Screen readers, 200%/400% zoom, manual keyboard walkthrough, forced-colors and non-Chromium browsers are not tested in any of the three. No replica claims WCAG conformance.

### Recorded defect: link-structure divergence within one category and model group

The three replicas handled un-rebuilt navigation targets in **two incompatible ways**, and the result is not comparable across the category:

| ID | total `href`s | links to a single stand-in page | share |
|---|---|---|---|
| UNI-01 | 862 | 428 → `services.html` | 50% |
| UNI-02 | 1689 | 920 → `not-replicated.html?page=…` (72 distinct targets) | 54% |
| UNI-03 | 758 | 0 — navigation pruned to built pages only | 0% |

- **Neither approach violates the protocol.** `Rules.md` §5 bans `href="#"`, dead buttons and controls that silently do nothing; a labelled "outside this replica" landing page and a pruned navigation both satisfy it, and all three pass QC.
- **But it is a methodological problem.** In two of three replicas roughly half of all links resolve to one page. Any analysis over link graphs, navigation depth, in-page link counts, crawl breadth or per-page link density will be driven by this choice rather than by the replica or the model. UNI-03 is not measuring the same thing as UNI-01 and UNI-02.
- **Cause:** the orchestrator brief did not specify how to treat reference navigation targets that are out of replica scope, so each agent decided independently. The divergence is a gap in the brief, not agent error, and the builders disclosed their choices in `README.md` and `fidelity-notes.md`.
- **Not repaired in place.** Changing it now would mean hand-editing delivered replicas, which `MODEL_ALLOCATION.md` §6 requires be disclosed as human edits and would contaminate baselines generated under identical rules. The replicas stand as generated; the divergence is recorded here and in each replica's row in `assignments.csv`.
- **Open decision, affecting rounds 02–10:** fix one convention in the build brief before the next round, or accept the divergence and treat stand-in-link share as a covariate. The same question applies to the Codex half, whose convention has not been compared.

### Other disclosed deviations, accepted as generated

- **Page count:** UNI-01 delivered 17 pages and UNI-02 19, against the brief's 8–15. Both are within range on reference-mapped pages (12 and 15) and exceed it only through disclosed stand-in and added pages.
- **UNI-01:** look-ahead search suggestions, cookie banner and site-alert script omitted; form errors fire on submit only, not blur; the reference was never rendered, so dropdown/JS behaviour is unverified and the mobile disclosure is inferred. The agent reported writing one scratch pointer file to a fixed `/tmp` path by mistake and deleting it; no stray file is present in the repository.
- **UNI-02:** five nav groups built instead of six, the sixth being unconfirmed in the research block; hero video replaced by an animated SVG with pause/play; directory uses a plain search input rather than the reference's combobox; dropdown panels stay hidden without JavaScript.
- **UNI-03:** the reference's program-finder API data was never observed, so the finder runs over invented records and `fidelity-notes.md` says so; Google Translate replaced with a labelled non-functional language control and the third-party chat hook omitted, both being prohibited embeds under `Rules.md` §2.

Shared-checkout isolation held: three agents wrote concurrently to disjoint paths with no index- or tree-modifying git commands, and no cross-contamination was found.

## 2026-11-13T15:55:04.254854+00:00 — Codex healthcare batch collected

- Three independent gpt-6.1-sol implementations collected under healthcare/codex/: HOSP-04: 10 pages/18 files, HOSP-05: 9 pages/17 files, HOSP-06: 11 pages/21 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: HOSP-04 failed/unavailable; browser acceptance blocked, HOSP-05 failed/unavailable; browser acceptance blocked, HOSP-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T15:55:36.271352+00:00 — Codex company batch started

- User authorized next three simultaneous builds: CORP-04, CORP-05, CORP-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T16:11:18Z — Round 02 complete (Claude half): HOSP-01, HOSP-02, HOSP-03 delivered; two defects found that qc.js cannot see

| ID | fictional hospital | pages | files | qc.js (orchestrator re-run) |
|---|---|---|---|---|
| HOSP-01 | Meridian Bay Health | 16 | 28 | `failures=0 warnings=0` (after rework) |
| HOSP-02 | Harborview Community Hospital | 15 | 28 | `failures=0 warnings=0` |
| HOSP-03 | Larkspur Children's Hospital | 15 | 27 | `failures=0 warnings=0` |

### Link convention fixed before this round

The round-01 divergence was closed by adopting **prune the navigation to pages that exist in the replica** — no stand-in or catch-all page — written into all nine remaining round files with the rationale. All three healthcare replicas complied: no catch-all page exists in any of them, and total `href` counts fell to 348 (HOSP-02), 479 (HOSP-03) and comparable for HOSP-01, against 1689 in UNI-02 where 920 links pointed at one stub. Round 01 was **not** retrofitted; university remains divergent and that is a known batch effect.

A side effect was accepted deliberately: pruning leaves some content cards (home-page articles, news cards) rendered without links, because their targets were not rebuilt. This is static content, not a dead control, so it does not breach `Rules.md` §5, but it is a visible consequence of the convention and is recorded here rather than left for a reader to discover.

### Medical-content guardrail added for this category

Briefs for all three replicas forbade clinical guidance, dosages, treatment protocols, triage instructions and symptom-checker logic, required 555 phone exchanges, and for the children's hospital additionally forbade developmental-milestone and vaccination content and any depiction of identifiable children. Verified by the orchestrator: zero hits across all three for dosage, milligram, vaccination-schedule, immunization, milestone, symptom-checker or triage language; all phone numbers use 555; HOSP-03's six image assets are all abstract SVG. HOSP-03 **pruned the reference's Symptom Checker and cited the guardrail as part of its reason**. Emergency notices in all three direct the reader to local emergency services and carry a not-medical-advice disclaimer.

### DEFECT 1 — trademark passed a clean QC run (HOSP-01, now repaired)

HOSP-01 reported `failures=0` and was still in breach of `Rules.md` §1.5. It used **"MyChart", a registered Epic Systems product name, 75 times**, including a page named `mychart.html` and 8 further references in `README.md`, `fidelity-notes.md` and `component-inventory.json`.

- **`qc.js` has no trademark or brand check**, so a passing QC run carried no information about this. The gate, not only the agent, is at fault.
- Found by an orchestrator audit, not by the pipeline. **Returned to the generating agent** to repair its own output rather than hand-fixed, because a hand fix would require disclosure as a human edit under `MODEL_ALLOCATION.md` §6 and would contaminate a baseline meant to be autonomously generated. `human_edits` remains `[]` legitimately.
- Repaired: fictional in-house portal **BayPortal** at `patient-portal.html` with 35 inbound links, the portal page and demo dialog retained, docs and component inventory updated, `failures=0` reconfirmed by the orchestrator, and 0 occurrences of `mychart` anywhere including filenames and documentation. The substitution is recorded in `fidelity-notes.md` as research-relevant: the reference's portal is a third-party vendor product and the replica substitutes an in-house one.
- A sweep of every other delivered replica against ~35 real vendor and platform names found **no other hits**. "Medicare" and "Medicaid" in HOSP-01 were left in place: they are US government program names, not private trademarks.

### DEFECT 2 — `component-inventory.json` page references, a Claude-only measurement bias (OPEN)

`Rules.md` §8 requires the component inventory to enumerate components and their **actual locations**. Four Claude replicas instead put prose into the `pages` array — `"all"`, `"all 16 pages"`, `"all except index.html"`, `"all interior pages"`, `"most interior pages"` — which is not a parseable location list.

| replica | group | components | with prose refs | share |
|---|---|---|---|---|
| healthcare/claude/HOSP-03 | claude | 38 | 17 | 44% |
| healthcare/claude/HOSP-01 | claude | 30 | 10 | 33% |
| healthcare/claude/HOSP-02 | claude | 22 | 7 | 31% |
| university/claude/UNI-02 | claude | 36 | 11 | 30% |
| UNI-01, UNI-03, PORT-01/02/03 | claude | 42/30/75/71/71 | 0 | 0% |
| all six codex replicas | codex | 17–24 | 0 | 0% |

- **This is worse than a schema nit.** Every Codex replica enumerates filenames; four Claude replicas do not. Any per-page component-coverage analysis will under-count components in those Claude replicas and count them correctly in the Codex ones, producing a **systematic difference between experimental arms that is an artifact of inventory formatting, not of the models' output**. `Rules.md` §7 and `MODEL_ALLOCATION.md` §7 both require identical generation and measurement rules across arms.
- `qc.js` validates that `component-inventory.json` is syntactically valid JSON but does not check that `pages[]` entries resolve to files, so this passed in every case.
- Not repaired yet, and **not to be hand-edited** for the same attribution reason as defect 1. Options: have each generating agent regenerate its own inventory `pages` arrays; or accept and document, deriving coverage from the HTML's `data-component` attributes instead of the inventory, which is in any case the more reliable source.
- `portfolio/codex/01-rowan-ellis`, `02-jamie-vale` and `03-avery-north` carry a `component-inventory.json` with **zero** component entries, which is a separate pre-existing gap in the portfolio batch.

### Recommended gate change before round 03

Add to `Websites/tools/qc/qc.js`: (a) a brand/trademark denylist check over delivered HTML/JS/CSS and documentation, and (b) a check that every `component-inventory.json` `pages[]` entry resolves to a delivered file. Both defects above would then fail inside the agent's own QC loop instead of surfacing in an orchestrator audit. This benefits the Codex arm equally, and the Codex arm currently cannot run `qc.js` at all.

### Codex half of rounds 01 and 02 — status recorded for cross-reference, not modified

The Codex coordinator marked UNI-04, UNI-05 and UNI-06 `blocked`: built, but its sandbox could not launch Chromium so the required QC gate never ran, and it dispatched HOSP-04/05/06 with round 01 still unaccepted. The Claude orchestrator ran `qc.js` on the three blocked Codex replicas as a measurement service — this is not generation and does not affect Codex attribution — and found 18 failures in UNI-04 (all one root cause: `label-content-name-mismatch` on `.brand`), 1 in UNI-05 (horizontal scroll at 375px, 23px on `index.html`), and 24 in UNI-06 (the same `.brand` cause plus `region` violations on `.research`); UNI-06 also delivered only 6 pages, below the 8–15 brief. Four root causes across 43 failures. Reports were handed to the project lead for relay; **no Codex file or register row was modified by the Claude orchestrator.**

## 2026-11-13T16:31:32Z — Round 03 complete (Claude half): CORP-01, CORP-02, CORP-03 delivered; round-02 defects closed

| ID | fictional organisation | pages | files | qc.js (orchestrator re-run) |
|---|---|---|---|---|
| CORP-01 | Corvane Bank | 16 | 30 | `failures=0 warnings=0` |
| CORP-02 | Harborlight Community Credit Union | 15 | 30 | `failures=0 warnings=0` |
| CORP-03 | Northcairn (Cairn platform) | 16 | 27 | `failures=0 warnings=0` |

### Round-02 defect 2 closed by brief, not by tool change

The `component-inventory.json` prose-page-reference defect (30–44% of entries in four Claude replicas) does not recur. The round-03 briefs mandated that every `pages` value be an array of real delivered filenames and named the forbidden prose forms explicitly with the reason. Result: **142 components across the three replicas, 0 prose or non-existent page references.**

| replica | components | prose refs |
|---|---|---|
| CORP-01 | 43 | 0 |
| CORP-02 | 45 | 0 |
| CORP-03 | 54 | 0 |

`qc.js` was deliberately **not** patched. It is shared with the Codex arm, and altering the gate mid-study would change measurement conditions for both arms; that remains a decision for the project lead. The four affected round-01/02 replicas are still unrepaired and remain an open item.

### Round-02 defect 1 closed by brief

The trademark defect does not recur either. The briefs carried per-stratum denylists and made the trademark grep the agent's own responsibility, stating that `qc.js` does not check it. Orchestrator sweep over ~36 vendor and platform names found **zero real brands in the delivered HTML/JS/CSS of all three replicas**. The reference's own domain appears **0 times** in delivered site files and exactly 4 times per replica in `README.md`, `fidelity-notes.md`, `component-inventory.json` and `generation-metadata.json` — which is the required provenance record, not leakage.

One orchestrator false positive is recorded for honesty: the denylist flagged `CO-OP` twice in CORP-03. Both are the invented customer **"Larkspur Credit Co-op"** in a logo strip headed "Invented organisations used for this design study" — a generic word inside a fictional name, not the CO-OP credit-union network. No change was made.

### Financial-claims guardrail added for this category, and verified

Banking and SaaS strata carry exposure the earlier categories did not, so the briefs added requirements beyond `Rules.md`:

- **No false regulatory or deposit-insurance claims.** Verified: `FDIC`, `NCUA`, `Member FDIC`, `federally insured` and `Equal Housing` appear **0 times** in all three. CORP-02 replaced the reference's real deposit-insurance and housing-lender footer text with a labelled **"Fictional Deposit Safety Board"**; CORP-01 used a labelled fictional **"Northmark Banking Standards Board"**.
- **No real financial identifiers.** Verified: no routing numbers, SWIFT/BIC codes or card numbers, including in form placeholders. All phone numbers use 555 exchanges in all three.
- **No real rates presented as real.** CORP-01's rates and calculator logic are invented and labelled, because the reference's were JS-only and never observed; CORP-02 used repeating-digit placeholders (1.11, 2.22…). Every rate table and calculator carries a visible fictional-sample-data notice stating it is not an offer, quote or financial advice.
- **No false endorsement.** CORP-03's customers, testimonials and logo strip are all invented organisations, explicitly labelled as such on the page. No real company is named as a customer.
- **Invented product vocabulary** for the DevOps stratum, which is dense with real product names: platform **Cairn** with capabilities Trunk, Relay, Cellar, Sentinel, Launchpad and Cairn Assist. The reference's real tier names were also removed from docs and search keywords.

### Fidelity held against category-typical temptation

CORP-03's research block recorded that the reference has **no billing-period toggle — pricing is static**. A monthly/annual toggle is the single most category-typical SaaS pricing control, and the brief forbade adding it merely because it is typical. The replica ships static pricing with no toggle, matching the reference. CORP-02 likewise reflects member-eligibility framing rather than retail-bank framing.

### Inventory data defect repaired (central register)

Two Claude rows in `metadata/source-inventories/company.csv` held corrupted `subcategory` values. The 2026-11-12 transcription split on a comma **inside a parenthetical** and kept only the tail, discarding the leading text:

- `CORP-02`: `"NH and online membership)"` → `"regional bank or credit union (Massachusetts-based credit union, with branches in MA/NH and online membership)"`
- `CORP-03`: `"SaaS, DevSecOps platform)"` → `"technology company (software/SaaS, DevSecOps platform)"`

Both were unparseable fragments with an unmatched closing paren, and CORP-03's row did not identify its own stratum at all. Correct values recovered from `pipelines/claude/research/CORP.md`. **Every field of every row in all 12 inventories was then scanned for the same signature** (a value ending in `)` with no `(`): exactly these two, nothing else. Note that both rows passed the Codex readiness gate at 30/30, because that gate checks `subcategory` is non-empty, not that it is coherent.

### Known deviations, accepted as generated

- CORP-01 added `locations.html` and `search.html` as labelled intentional additions; the reference's own locator was never fetched and its `/locations.html` returned 404.
- CORP-02 did not map Careers, to keep scope tight (14 content pages + 404); its branch map is a decorative SVG, not an interactive map; inline errors clear on blur and can shift layout slightly.
- CORP-03 merged the reference's two careers pages into one `jobs.html`; blog and most customer-story cards are unlinked static content because no detail pages exist (the accepted consequence of the prune convention); its careers filter offers 7 locations and 10 departments rather than the reference's ~33 options; the contact-sales fields are original because the reference's embedded form was not visible in static HTML.
- CORP-01's mobile drill-down is approximated with nested disclosures plus a "Return to main menu" button; its login uses a native `<dialog>`.
- All three record `accessibility: partial`; CORP-03 also records `structure` and `traceability` as partial. Not tested in any of the three: screen readers, 200%/400% zoom, manual keyboard walkthrough, forced-colors, non-Chromium browsers. No replica claims WCAG conformance.
- Two agents disclosed briefly creating and deleting a marker file at a fixed `/tmp` path instead of their private `mktemp -d` directory. No stray file is present in the repository.

### Claude progress

12 of 33 Claude register rows are `submitted` (3 portfolio + 9 built today across university, healthcare and company); 21 remain `planned`. Rounds 04–10 are queued: e-commerce, news, government, fashion, weather, nonprofit, church.

## 2026-11-13T17:52:44Z — Round 04 complete (Claude half): ECOM-01, ECOM-02, ECOM-03 delivered; first category with a checkout flow

| ID | fictional brand | pages | files | qc.js (orchestrator re-run) |
|---|---|---|---|---|
| ECOM-01 | Pebblebloom | 15 | 27 | `failures=0 warnings=0` |
| ECOM-02 | Larkwood Home | 18 | 33 | `failures=0 warnings=0` |
| ECOM-03 | Fernhollow Outfitters | 19 | 45 | `failures=0 warnings=0` |

### Payments guardrail — added for this category, verified on all three

E-commerce is the first category whose reference sites have a real checkout. The briefs forbade any payment-credential surface, not merely a non-working one, because a form that looks like it collects card data is a harm regardless of whether it posts anywhere.

| check | ECOM-01 | ECOM-02 | ECOM-03 |
|---|---|---|---|
| card / CVV / expiry / routing inputs | none | none | none |
| `autocomplete="cc-*"` | 0 | 0 | 0 |
| Luhn or card-validation code | none | none | none |
| checkout inputs, all shipping/contact only | 10 | 9 | 5 |

Each payment step is a visibly labelled non-functional placeholder stating that a real store would collect payment there and that this demo deliberately does not. No replica fabricates an order number — the specific failure mode the brief targeted. ECOM-02's confirmation reads "No order exists, no payment was taken, and nothing will be shipped or delivered. No order number was issued because there is no order."; ECOM-01's is headed "DEMONSTRATION ONLY - no order was placed"; ECOM-03's is stamped DEMO ONLY behind a required acknowledgement checkbox.

### Per-stratum content guardrails, verified

- **ECOM-01 (beauty).** Zero hits for dermatologist, clinically proven, hypoallergenic, non-comedogenic, FDA approved, SPF, sunscreen, broad spectrum, allergy or paraben. The agent **pruned the reference's Sunscreen category outright** rather than write a product with no protection claim, and recorded why. Ratings are labelled fictional sample data on the page.
- **ECOM-02 (home furnishings).** No flammability, weight-limit, child-safety, tip-over, crib or certification claims.
- **ECOM-03 (specialty outdoor).** The `/hunt` department was omitted on policy. Verified zero firearm, ammunition, archery or hunting-implement content; zero veterinary, dosage, vaccination or animal-health advice; no fishing licence, season or catch-limit content; no ratings or reviews at all.

**Policy omissions were recorded separately from scope prunes** in ECOM-03's `fidelity-notes.md`, as the brief required, so a reader can distinguish "the study chose not to replicate this" from "the reference did not have it". Without that separation the dataset would silently misrepresent the reference's information architecture. This convention should carry to any future category with content the study declines to reproduce.

### Both earlier defects remain closed

- **Trademarks:** the reference's own name appears **0 times** in the delivered HTML/JS/CSS of all three (`Glossier`, `IKEA`, `Orvis`), and no forbidden vendor name appears anywhere. The approved source URL appears only in the four provenance locations per replica.
- **Component inventory:** 134 components across the three replicas, **0 prose or non-existent page references** (38 / 54 / 42). Three consecutive rounds clean. `qc.js` is still unpatched, so this rests on the brief alone and on the orchestrator audit; the four affected round-01/02 replicas remain unrepaired and open.

### Orchestrator false positives recorded, so they are not mistaken for defects later

The orchestrator's brand denylist uses substring matching and produced four spurious hits in ECOM-03, all verified harmless: `scope` ×23 was `th scope="col"` and `th scope="row"` (correct table-header markup), `shell` ×6 was "shell fabrics" and "Shells and packable vests" (apparel), `REI` was inside "reinforced", and `Sage` was inside "message". Whole-word checks returned 0 for both brands. No file was changed on account of these.

### Known deviations, accepted as generated

- **ECOM-02** carries two keys beyond the `MODEL_ALLOCATION.md` §6 schema, `qc_run` and `qc_notes`. Accepted: it is additional evidence, not missing evidence. It does mean provenance files are not uniformly shaped across the dataset, which matters to anything parsing them as a fixed schema.
- **ECOM-01** gives the home page an `h1` the reference lacks, to meet the accessibility baseline, and records `structure: partial` because the reference's hero and carousel were never observed. Its bag uses `sessionStorage`; under `file://` some browsers scope storage per page, so the bag may not carry between pages there — documented in its README and untested outside headless Chromium.
- **ECOM-02** folds contact and delivery into `customer-service.html`, uses a "Show more" control instead of numbered pagination, makes sign-in a page rather than a modal, and leaves 18 of the reference's 21 homepage categories unlinked under the prune convention.
- **ECOM-03** uses one modal drawer at all widths rather than the reference's per-item sub-drawers, and its drawer sub-item labels are its own because the reference's were never captured. Checkout, confirmation, search and packs-bags are labelled intentional additions. It did not script cart removal or clear-all in its flow run.
- All three record `accessibility: partial`. Not tested in any: screen readers, 200%/400% zoom, manual keyboard walkthrough, forced-colors, non-Chromium browsers, touch. No replica claims WCAG conformance.
- Storage access is wrapped in try/catch in all three; each was checked to still function with `sessionStorage` throwing.

### Claude progress

**15 of 33 Claude register rows are `submitted`** (3 portfolio + 12 built today across university, healthcare, company and e-commerce); 18 remain `planned`. Rounds 05–10 queued: news, government, fashion, weather, nonprofit, church.

## 2026-11-13T20:53:37.266965+00:00 — Codex company batch collected

- Three independent gpt-6.1-sol implementations collected under company/codex/: CORP-04: 7 pages/16 files, CORP-05: 9 pages/17 files, CORP-06: 8 pages/16 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: CORP-04 failed/unavailable; browser acceptance blocked, CORP-05 failed/unavailable; browser acceptance blocked, CORP-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T21:01:55.796118+00:00 — Codex e-commerce batch started

- User authorized next three simultaneous builds: ECOM-04, ECOM-05, ECOM-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T21:10:00Z — Round 05 complete (Claude half): NEWS-01, NEWS-02, NEWS-03 delivered; fabricated-news guardrail

| ID | fictional publication | setting | pages | files | qc.js (orchestrator re-run) |
|---|---|---|---|---|---|
| NEWS-01 | The Vellmoor Ledger | invented country Orravia | 15 | 29 | `failures=0 warnings=0` |
| NEWS-02 | The Alderny Daily Lantern | invented Port Alderny, Tessaly County, state of Calvern | 14 | 27 | `failures=0 warnings=0` |
| NEWS-03 | Quillon Valley Public Media | invented Republic of Veloria | 15 | 28 | `failures=0 warnings=0` |

### Why this category needed a guardrail unlike the others

In earlier categories the hazard was a trademark or a credential-shaped form. Here the artifact itself is the hazard: a realistic article page with a byline and a dateline, screenshotted and reshared without the surrounding site, **is** disinformation regardless of what the rest of the replica says. The brief was therefore written around the cropped-screenshot case rather than around the site as a whole.

**Requirement: the notice must survive cropping.** A visible fictional-publication notice on every page in the masthead area, and on article pages positioned **above or immediately adjacent to the headline, before the body copy**. Footer-only, home-page-only and `<meta>`-only were explicitly rejected.

Verified by the orchestrator, not taken from the agents' reports:

| check | NEWS-01 | NEWS-02 | NEWS-03 |
|---|---|---|---|
| notice on every page incl. `404.html` | 15/15 | 14/14 | 15/15 |
| notice precedes the `<h1>` in document order on article/story pages | char 207 vs 4457 | char 4874 vs 5125 | all three story templates |
| reference's own name in delivered HTML/JS/CSS | 0 | 0 | 0 |
| real people, places, organisations or events in delivered files | 0 | 0 | 0 |

NEWS-02 was additionally required **not to be set in Chicago or Illinois**: a fabricated metro daily anchored to a real city, inventing its council decisions and school news, is the worst form of this artifact. Grep for Chicago, Illinois, Tribune, WGN and Cook County in its delivered files returns **0**. NEWS-01 likewise returns 0 for Guardian, Ukraine, Gaza, ICE, Trump, Biden, Midterms and London; NEWS-03 returns 0 for NPR and every real programme and station name.

### Format-level prohibitions, because the shape of a thing is the hazard

Some news furniture is dangerous as a **form**, independent of its content, so a labelled version was not accepted either:

- **No breaking-news or emergency-alert banner** in any of the three.
- **No weather-alert or school-closure banner** (NEWS-02).
- **No live-data widgets** — no tickers, scores, election results, polls, weather or traffic. All three omitted them rather than label them.
- **Obituaries pruned outright.** Fabricated obituaries for plausible-sounding people are distressing regardless of labelling. Recorded as a policy omission, not a scope prune.
- **NEWS-03 ships no playable audio at all.** Verified: 0 `<audio>` elements, 0 `<video>` elements, 0 media files on disk, 0 `autoplay` attributes. The player is native `<button>`s driving a silent timer with a stated non-functional notice, and the invented transcript carries its own fictional-transcript notice. A playable fabricated broadcast in a public-radio format carries too much borrowed credibility to ship even as a demo.

### Subject matter was bounded, and the bound is auditable

The briefs forbade elections, public health, medicine, crime and named suspects, courts, war, immigration enforcement, disasters, missing persons and financial advice — subjects where a fabricated article is harmful **even when labelled** — and required low-stakes evergreen fiction instead. Each agent reported its full subject list so the constraint can be checked rather than trusted: library reading-room renovations, tram request stops, pie tents, seed libraries, tide-pool surveys, bandstand repaints, oral-history digitisation, quoits leagues, instrument lending libraries.

Policy omissions were kept in lists **separate from scope prunes** in all three `fidelity-notes.md` files, as the convention adopted in round 04 requires. NEWS-01's list is the most research-relevant: it omits US politics and midterms, immigration **including an ICE lawsuit article that the approved research block had recorded as a reference page**, Ukraine and the Middle East, and the climate crisis. That is a deliberate, disclosed divergence from the reference's observed content, and analysis must treat the news category's topical coverage as study-constrained rather than reference-faithful.

### Orchestrator false positives, recorded so they are not later mistaken for defects

NEWS-02's scan flagged `obituar`, `election`, `scores`, `alert` ×12 and `market` ×77. All benign: the `obituar` and `election` hits are in `about.html`'s own content-policy statement — "The site contains no elections, crime, courts, emergencies, health guidance, obituaries, weather, market or score data" — i.e. the replica documenting its own guardrail; `scores` is `sports.html` saying "Scores and standings are intentionally omitted"; all 12 `alert` hits are `role="alert"` ARIA live-region markup; `market` is "farmers-market". No file was changed on account of these.

### Earlier defects remain closed; metadata uniformity restored

- **Component inventories:** 123 components across the three replicas, **0 prose or non-existent page references** (34 / 41 / 48). Four consecutive rounds clean.
- **Extra metadata keys:** after ECOM-02 shipped `qc_run` and `qc_notes` last round, the briefs required no extra top-level keys. All three have **none**, so provenance files are uniformly shaped again. ECOM-02 remains the single exception in the dataset.
- **Trademarks:** 0 in delivered files across all three.

### Known deviations, accepted as generated

- **JS dependency for article routing.** All three use an `?id=` template: NEWS-01's `article.html` holds one article statically and renders the other 32 from inline data; NEWS-02 and NEWS-03 show only a default item without JS, and NEWS-03's tabs show only the first panel. This is permitted (inline data, no `fetch()`) but means per-article content is not present in static HTML — relevant to any analysis that parses delivered files rather than rendered pages.
- **Unverified reference paths were not mapped.** NEWS-01 declined to map `/us/video`, `/info/about-guardian`, `/us/lifestyle` and `/search?q=`, all of which 404'd during verification, and recorded which proposed pages could not be verified.
- **NEWS-02's paywall** is marked an unverified inference and is simulation only; the reference's paywall behaviour was never checked.
- **NEWS-03's search results layout is invented** because the reference's markup was never observed; its Climate section was replaced by an invented "Land & Sea" front; its station finder and Latest/Most-read tabs are labelled intentional additions.
- **NEWS-01's `search.html` and `support.html`** are labelled intentional additions — the reference sends search to an external engine and has no on-site results page. Its Latest/Most-read tabs are flagged as inferred, not observed.
- All three record `accessibility: partial`; everything else passes in all three. Not tested in any: screen readers, 200%/400% zoom, manual keyboard walkthrough, forced-colors, non-Chromium browsers. No replica claims WCAG conformance.
- One agent again disclosed briefly writing and deleting a fixed-name marker file in the per-user temp directory instead of its `mktemp -d`. No stray file is present in the repository.

### Claude progress

**18 of 33 Claude register rows are `submitted`** (3 portfolio + 15 built today across university, healthcare, company, e-commerce and news); 15 remain `planned`. Rounds 06–10 queued: government, fashion, weather, nonprofit, church.

## 2026-11-13T21:11:34.697756+00:00 — Codex e-commerce batch collected

- Three independent gpt-6.1-sol implementations collected under e-commerce/codex/: ECOM-04: 7 pages/21 files, ECOM-05: 8 pages/19 files, ECOM-06: 7 pages/22 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: ECOM-04 failed/unavailable; browser acceptance blocked, ECOM-05 failed/unavailable; browser acceptance blocked, ECOM-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T21:13:32.764853+00:00 — Codex news batch started

- User authorized next three simultaneous builds: NEWS-04, NEWS-05, NEWS-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T21:21:15.514247+00:00 — Codex news batch collected

- Three independent gpt-6.1-sol implementations collected under news/codex/: NEWS-04: 6 pages/16 files, NEWS-05: 8 pages/18 files, NEWS-06: 7 pages/17 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: NEWS-04 failed/unavailable; browser acceptance blocked, NEWS-05 failed/unavailable; browser acceptance blocked, NEWS-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T21:26:13Z — Round 06 complete (Claude half): GOV-01, GOV-02, GOV-03 delivered; strictest guardrail in the study

| ID | fictional jurisdiction | pages | files | qc.js (orchestrator re-run) |
|---|---|---|---|---|
| GOV-01 | City of Quillhaven, Tarnmere County, Republic of Ostrelle | 15 | 23 | `failures=0 warnings=0` |
| GOV-02 | State of Marrowvale, Republic of Velmara | 14 | 27 | `failures=0 warnings=0` |
| GOV-03 | Kelmoran Landmarks Service, Republic of Kelmora | 12 | 26 | `failures=0 warnings=0` |

### Why this category's brief went beyond labelling

A convincing government site is an impersonation and phishing template. Unlike the news category, where the remedy was a notice that survives cropping, here several components are hazardous as **capabilities** regardless of framing: a sign-in page, a fee-payment flow, an identity-document form, an emergency-alert banner. The brief therefore removed those capabilities rather than labelling them, and relocated every jurisdiction.

Verified by the orchestrator on all three:

| check | GOV-01 | GOV-02 | GOV-03 |
|---|---|---|---|
| `.gov` string in delivered HTML/JS/CSS | 0 | 0 | 0 |
| real jurisdiction / agency / place names | 0 | 0 | 0 |
| `type="password"` inputs | 0 | 0 | 0 |
| sign-in forms | 0 | 0 | 0 |
| identity, DOB or payment fields | none | none | none |
| fictional notice inside `<header>` on every page incl. `404.html` | 15/15 | 14/14 | 12/12 |

Total form inputs across all three replicas: `name`, `email`, `message`, `nick`, `mail`, `desc`, `loc`, `type`, `ack`, `topic`, `q`, `region`, `sort`. Nothing resembling personal or financial identity data exists anywhere in the category.

`.gov` appears only in the four provenance documents per replica, which is the required approved-source record.

### The alert-banner problem, and how each replica resolved it

An emergency-alert banner is the most copyable component on a government site and the brief forbade a realistic one even if labelled.

- **GOV-01's reference has one and its text was never observed.** The replica built a static block explicitly headed **"Sample community notice (not an alert)"** about an invented market street closure, whose text states the replica deliberately has no emergency or alert banner. This is the narrow substitute the brief permitted: it preserves the structural slot without supplying the dangerous component.
- **GOV-02's reference had none observed**, so adding one was forbidden outright. None exists.
- **GOV-03 omitted park alert, closure, condition and weather banners entirely** and recorded them in its policy list.

### GOV-03 carried a physical-safety restriction, not only an impersonation one

A fabricated trail-conditions or wildlife-safety page for an outdoor site could injure a real person who mistook it for a real agency's. The brief forbade all of it. Verified: **zero occurrences** of trail condition, closure, avalanche, water level, fire danger, wildlife, bear, hypothermia, heat advisory, flash flood, swim, boating, backcountry, rescue or emergency. The single `permit` match is the disclaimer itself, on `plan-your-visit.html` — the very page where such guidance would naturally sit: *"There are no fees, bookings, permits, hours, conditions or safety notes anywhere in this demo, by design."*

GOV-03 also declined to imitate the reference's well-known protected insignia, using an invented rounded square with wave lines.

### No actionable civic guidance anywhere

The core restriction held. GOV-01's permits page gives **no requirements, fees or steps** — it describes what a fictional permit would be and stops, which is the hardest part of this brief to honour because such a page feels incomplete without procedure. GOV-02 carries a not-real-guidance note on 11 of its 14 pages. All three omitted, as disclosed policy decisions: payments and fees, licences and identity documents, benefits and assistance eligibility, taxes and business registration, voting, deadlines, eligibility rules, statutes and code citations, and disaster or public-safety content.

**GOV-02 did not fabricate the reference's off-site transactional services.** Each appears as an unlinked plain-text label, "Off-site provider (fictional, not linked)". Since signposting to off-site services is the structural point of a state portal, inventing those destinations would have been both the easy path and the wrong one. GOV-02 additionally set every page `noindex`, which the brief did not require.

### Honest self-assessment, and a fidelity limit worth recording

These are the most conservative `validation_summary` values in the study: GOV-01 and GOV-02 record four gates as `partial`, GOV-03 five. The reasons are real and traceable to the research block — GOV-01's reference page-level structure (heading hierarchy, ARIA, forms) **was never inspected**, so claiming structural fidelity would have been unsupported; GOV-03's nav labels (Find a Park, Plan Your Visit, Learn & Explore, Get Involved, What We Do) are **inferred, not observed**, so its dropdown contents are its own and its `scope` is `partial`.

**GOV-03's pruned-navigation list is itself unverified**, because the reference's actual nav and footer links were never captured. That is recorded in its `fidelity-notes.md` and matters to any analysis treating prune lists as evidence about the references.

### Policy omissions kept separate from scope prunes

All three maintained the round-04 convention: a distinct policy-omission list in `fidelity-notes.md`, separate from ordinary scope prunes, so a reader can tell a study decision from an absent reference feature. For this category the policy lists are long — payments, logins, identity services, alerts, safety guidance — and the government category's service coverage must therefore be read as **study-constrained, not reference-faithful**.

### Earlier defects remain closed

- **Component inventories:** 113 components across the three, **0 prose or non-existent page references** (34 / 37 / 42). Five consecutive rounds clean. GOV-01 went further and diffed its inventory against the `data-component` attributes actually present in its HTML, finding and fixing two mismatches; GOV-03 listed its four JS-rendered components by hand.
- **Extra metadata keys:** none in any of the three.
- **Trademarks and real-entity leakage:** 0 in delivered files.

### Known deviations, accepted as generated

- **GOV-02 included a language selector although the reference's selector was never confirmed.** Labelled a non-functional demo and disclosed as unverified. No machine-translated text ships.
- **GOV-01's directory pages and GOV-03's `site`/`topic` detail pages render via JS** (`?id=`, `?t=`), showing a noscript notice without JavaScript. Permitted under the rules (inline data, no `fetch()`), but per-item content is not in static HTML.
- **GOV-03's contact page is an intentional addition** because the reference's contact URL returned 404 during verification.
- **GOV-01's services directory and department filter are intentional additions**, labelled as such.
- Not tested in any of the three: screen readers, 200%/400% zoom, manual keyboard walkthrough, forced-colors, non-Chromium browsers, print. No replica claims WCAG conformance.

### Claude progress

**21 of 33 Claude register rows are `submitted`** (3 portfolio + 18 built today across university, healthcare, company, e-commerce, news and government); 12 remain `planned`. Rounds 07–10 queued: fashion, weather, nonprofit, church.

## 2026-11-13T21:27:00.855945+00:00 — Codex government batch started

- User authorized next three simultaneous builds: GOV-04, GOV-05, GOV-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T21:35:26.868634+00:00 — Codex government batch collected

- Three independent gpt-6.1-sol implementations collected under government/codex/: GOV-04: 6 pages/13 files, GOV-05: 6 pages/13 files, GOV-06: 6 pages/14 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: GOV-04 failed/unavailable; browser acceptance blocked, GOV-05 failed/unavailable; browser acceptance blocked, GOV-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T21:40:00Z — Open-source pipeline added; slots 07–10 restored to the active allocation

- **New pipeline:** `pipelines/open-source/` now covers slots 07–10 in the ten active categories (40 replicas), completing the 3/3/4 allocation of `MODEL_ALLOCATION.md` §2. It is the third and final generation pipeline.
- **Active allocation:** `MODEL_ALLOCATION.md` §1 updated from slots 01–06 to all ten slots, using that section's existing reactivation clause — the stated reason for deferral (no open-source pipeline) no longer holds. No protocol requirement was relaxed: per-group approval gates, the accessibility baseline, instrumentation and QC are unchanged, and replicas built under the reduced active allocation keep that record.
- **Execution model:** unlike the Claude (pi-subagents) and Codex (prepare-and-handoff) arms, this pipeline executes directly against open-weight models over an OpenAI-compatible API, one replica per run. One key per slot is read from an environment variable named in `models.json`; no key is stored in the repository, and transcripts and run records are redacted before they are written.
- **Model declaration:** `MODEL_ALLOCATION.md` §2 requires the model-to-slot mapping to be declared before generation. `scripts/declare-models.mjs` records model ID, version, weights URL, licence, open-weight eligibility note, provider and endpoint per slot. The scripts cannot authenticate a licence or an operator statement and say so.
- **Honest verification by construction:** the orchestrator performs every HTTP request (`scripts/verify-sources.mjs`, robots.txt respected) and the models only interpret the recorded evidence; they have no browser, shell or filesystem. Verification is recorded as HTTP-GET availability only — nothing was rendered and no interaction was exercised. QC gates come from a run that actually executed; a crashed or browser-less run is recorded as unavailable with gates `not-tested`, never as `failures=0`.
- **Raw artifact preserved:** each build copies its uncorrected output to `runs/<run-id>/initial/` before the bounded QC-correction stage, so raw and corrected versions stay distinguishable for analysis.
- **Write boundaries:** generated files are confined to `<category>/open-source/<ID>/` with a path and content guard (allowed directories and extensions, no traversal, no frameworks, no remote CDNs, no npm requires); rejected emissions are reported back to the model and recorded, never written. Register and inventory edits touch only slots 07–10 and leave every other record byte-identical; no other group's pipeline, prompts or output were modified.
- **No state advanced:** no source is researched or approved, no replica generated, nothing committed, pushed or accepted. All 50 queue tasks remain `planned` and all 44 open-source register rows remain `planned`.
- **Verification performed:** `scripts/validate.mjs` passes against the real register and inventories; 21 tests pass (`node --test`), covering CSV edge cases, byte-stable targeted register edits, schema and $ref validation, the file protocol and its path/content guards, path-escape refusal, model-declaration and readiness gates, credential redaction, and an end-to-end build against a local mock endpoint and a synthetic fixture tree. The shared QC integration was separately exercised against a scratch three-page site: exit 0, failures=0, recorded as `accessibility: partial` with `interaction`, `traceability` and `scope` `not-tested`. Passing tests means the pipeline works, not that any website exists.

## 2026-11-13T21:37:53.304412+00:00 — Codex fashion batch started

- User authorized next three simultaneous builds: FASH-04, FASH-05, FASH-06. gpt-6.1-sol collaboration workers use independent isolated source snapshots, fresh approved task records, local static outputs only.
- Coordinator manages register/queue; workers cannot change shared source or protocol files. Existing sites, raw outputs, approvals and dirty Git state preserved. Browser-QC launch limitations from prior batch remain to be tested honestly. No commit, push, merge or publication.

## 2026-11-13T21:46:33.648263+00:00 — Codex fashion batch collected

- Three independent gpt-6.1-sol implementations collected under fashion/codex/: FASH-04: 7 pages/17 files, FASH-05: 6 pages/16 files, FASH-06: 6 pages/18 files. Initial outputs and any worker corrections retained. No coordinator website-code edits.
- Independent source reviews passed. Shared QC: FASH-04 failed/unavailable; browser acceptance blocked, FASH-05 failed/unavailable; browser acceptance blocked, FASH-06 failed/unavailable; browser acceptance blocked. Exact failures and untested conditions are in run records, never converted to a false failures=0.
- Register and queue synchronized with actual testing outcomes; no human acceptance, publication, commits, pushes or merges.

## 2026-11-13T21:56:25Z — Round 07 complete (Claude half): FASH-01, FASH-02, FASH-03 delivered; all three handback reports lost

| ID | fictional publication / house | pages | files | qc.js (orchestrator run) |
|---|---|---|---|---|
| FASH-01 | The Weft Review | 13 | 32 | `failures=0 warnings=0` |
| FASH-02 | (invented house) | 17 | 56 | `failures=0 warnings=0` |
| FASH-03 | (invented publication) | 13 | 34 | `failures=0 warnings=0` |

### PROCESS FAILURE: all three building agents exited without delivering a report

For the first time in seven rounds, **every** agent in a round ended without a handback report. Rounds 01–06 produced 18 of 18 reports; round 07 produced 0 of 3. The agents each ran to completion (21, 23 and 25 tool calls; 120k–132k tokens) and wrote complete, valid deliverables, but their final summaries were never transmitted.

**Consequence for the dataset, recorded plainly:** acceptance of these three replicas rests **entirely on orchestrator verification of the delivered artifacts**, with no agent claim to cross-check. In rounds 01–06 the orchestrator's QC re-run served as independent confirmation of an agent's reported figure; here there is no reported figure, so the QC run is the only evidence. This is weaker provenance than the other 18 replicas, and the three affected rows say so in `assignments.csv`.

What this did **not** cost: the required artifacts are all present, and the disclosures a report would have carried are on disk in each replica's `fidelity-notes.md` (FASH-01 5230 B, FASH-02 4168 B, FASH-03 4764 B), each containing the policy/scope prune separation, the inferred-versus-observed labelling, and the photography-replacement note. FASH-02's notes additionally record the HTTP 429 rate limit and the title-extraction limit from its research block.

What it **did** cost: the agents' own flow-check narratives, their subject-matter lists and their stated deviations are unrecoverable without resuming each agent. The orchestrator did not resume them, because every claim such a report would make is independently checkable from the artifacts, and the artifacts were checked.

### Orchestrator verification, in place of agent reports

| check | FASH-01 | FASH-02 | FASH-03 |
|---|---|---|---|
| required artifacts present | 7/7 | 7/7 | 7/7 |
| reference's own name in delivered files | 0 | 0 | 0 |
| real brands / houses / people checked | 0 | 0 | 0 |
| `type="password"` / card-CVV fields | 0 / 0 | 0 / 0 | 0 / 0 |
| imagery: SVG assets / raster files | 13 / 0 | 33 / 0 | 15 / 0 |
| fictional note on every page incl. `404.html` | 13/13 | 17/17 | 13/13 |
| component-inventory prose page refs | 0 | 0 | 0 |
| extra metadata keys | none | none | none |
| provenance field mismatches | none | none | none |

**Imagery guardrail held across the category: 61 SVG assets and zero raster files.** All three research blocks had independently flagged that the references' imagery is third-party editorial photography requiring replacement, and no replica shipped a photograph or a figurative depiction of a person.

**FASH-02's designer-name constraint held:** 0 occurrences of Margaret Howell, Margaret, Howell, MHL or margarethowell in delivered files, and 0 real brands, mills or certification schemes (Burberry, Barbour, Harris Tweed, Loro Piana, GOTS, OEKO-TEX, Fair Trade, B Corp, "made in Italy", "made in England", Yorkshire, Scotland all return zero). No false heritage or provenance claim survives.

**FASH-03's trademark-density constraint held:** 0 occurrences of hypebeast, Nike, Adidas, Jordan, Yeezy, Supreme, StockX, GOAT or Balenciaga, and no real silhouette or colourway name, including in sample data and search keywords. No shop, cart, account, resale commentary or authentication guidance exists; its release calendar is labelled sample data only.

No replica has a size guide or body measurements; no body-image, diet or anti-ageing copy appears in any of the three.

### Orchestrator false positives, recorded so they are not later mistaken for defects

Three flags, all benign and all the replicas documenting their own constraints:

- **FASH-01, `replica` ×40** — the phrase "research replica" in its own fictional-publication note and footer ("The Weft Review is an invented magazine for a research replica. None of its stories, bylines, brands, events or places are real").
- **FASH-03, `resale` ×1 and `authentic` ×1** — both inside `about.html`'s "What is left out on purpose" section: "There is no shop, no cart, no account, no resale commentary and no advice on authenticating products. The release calendar is sample data only."
- **FASH-02, `hip` ×6** — substring of "chip", a colour name; zero whole-word matches, and the replica has no size guide at all.

This is now the fourth round in which the only matches for a forbidden term were the disclaimers stating its absence. The pattern is worth noting as a property of the method rather than a coincidence: a replica that documents its own omissions will always trip a naive denylist.

### Fidelity limits carried from the research blocks

All three self-report four or more `partial` gates, traceable to recorded verification limits rather than to agent caution: FASH-01's header and nav were read from raw HTML and **never rendered**, so nav behaviour is inferred; FASH-02's **page titles were never extractable** from raw HTML; FASH-03's reference is a **fast-changing snapshot** that "can change by the hour", so its observed structure is one observation and its `scope` is `partial`. FASH-03's `fidelity-notes.md` uses the word "inferred" six times.

### Earlier defects remain closed

- **Component inventories:** 107 components across the three, **0 prose or non-existent page references** (31 / 39 / 37). Six consecutive rounds clean.
- **Extra metadata keys:** none in any of the three. ECOM-02 remains the dataset's only exception.
- **Trademarks:** 0 in delivered files.

### Claude progress

**24 of 33 Claude register rows are `submitted`** (3 portfolio + 21 built today across university, healthcare, company, e-commerce, news, government and fashion); 9 remain `planned`. Rounds 08–10 queued: weather, nonprofit, church.

## 2026-11-13 — Twelve active categories; restaurant reset to planned

Operator instruction: return portfolio to the active categories, delete the pre-protocol restaurant
batch, and update the repository to state twelve categories. The study target is now **120 sites**
(12 categories × 10 slots), not 100.

### Restaurant: ten replicas deleted

`REST-01.zip` … `REST-10.zip` and `restaurant-replicas-protocol.zip` were deleted. The bundle was
removed rather than repacked because it contained complete copies of all ten sites, so deleting the
individual zips alone would not have removed them from the repository.

Two findings drove the decision, both surfaced before deletion:

- **All ten violated the protocol.** Each loaded Bootstrap 5.3.3 and jQuery 3.7.1 from
  `assets/vendor/`, prohibited by `Rules.md` §4. They were built 2026-11-07, before the protocol
  existed; the standing decision had been to document the deviation. This included REST-01 … REST-03,
  which the operator had initially intended to keep as the Claude slots — on seeing the finding, the
  decision changed to delete all ten and rebuild 01–03 under protocol.
- **Provenance was never recorded.** No zip contained `generation-metadata.json` and all ten register
  rows had empty `model_group` and `model_id`. The operator states all ten were Claude Opus 5.5.
  **Nothing in the repository corroborates this**, so it is recorded as an operator statement.

All ten restaurant slots are now `planned` with the 3/3/4 allocation applied, canonical
`relative_path` values (the old rows pointed at `restaurant websites/REST-xx.zip`, a directory that
does not exist), and empty source and approval fields. The ten sampling strata were carried over into
`metadata/source-inventories/restaurant.csv`, with verification and approval columns cleared, so the
Phase A gate applies in full before any rebuild. Empty `restaurant/claude/` and `restaurant/codex/`
directories were created for parity with the other categories.

### Portfolio returned to the active allocation

Removed from `excluded_categories` in the open-source pipeline. Portfolio needed no rebuilding: its
register rows already carried 01–03 Claude (submitted), 04–06 Codex (submitted) and 07–10 open-source
(`planned`). Strata for the four open-source slots were previously blank and are now defined in
`metadata/source-inventories/portfolio.csv`, mirroring the Claude strata so model and stratum are not
confounded within the category. **The pre-existing PORT-02 / PORT-04 duplicate reference
(brittanychiang.com in both) remains unresolved** and is not addressed here.

### Open-source pipeline extended to twelve categories

`categories.json` gained portfolio and restaurant with full ten-slot strata, page types, conditional
interactions, simulation notes and scope rules. `config.json` `excluded_categories` is now `[]`, and
its schema pins that constant. `queue/manifest.json` grew from 50 to **60 tasks** (12 research, 48
build). `validateSetup` now requires twelve categories and 60 tasks, and its success message is
derived from the data instead of hard-coded.

One validator change was necessary rather than cosmetic: the canonical `relative_path` check
(`<category>/<group>/<id>`) is now enforced **only for this group's own slots 07–10**. Other groups
name their own delivery directories — portfolio's Codex rows point at `portfolio/codex/01-rowan-ellis`
— and this pipeline has no authority to dictate their layout. Non-open-source rows are now required
to have a non-empty path, not a canonical one.

### Verification performed

- `node --test tests/pipeline.test.mjs`: **23 of 23 pass**, including the case that validates the
  pipeline against the real shared register, now across twelve categories.
- `node scripts/validate.mjs`: passes, reporting 12 categories, 48 build tasks, 12 research tasks.
- Register integrity: still exactly 120 rows — 36 Claude (24 submitted, 12 planned), 36 Codex,
  48 open-source (all `planned`). The 110 non-restaurant rows were left byte-identical.

### Not done

- **The Codex and Claude pipelines still cover ten categories.** Their configs still list portfolio
  and restaurant in `excluded_categories`, and their queues hold 30 tasks each. Extending them would
  change another group's scope and queue state, so it was left to the operator.
- No source was approved, no replica was generated, and nothing was marked accepted.

## 2026-11-14T04:40:26.232400+00:00 — Restaurant Phase A research

Reviewed retained homepages for all ten restaurant slots via web text retrieval; documented method limits and detailed REST-04–06 page proposals in `pipelines/codex/research/REST.md`. Updated only Codex restaurant inventory/reservations to awaiting approval. Hogsalt proposal uses readable www hostname. No source/model approval, implementation, or acceptance recorded. Other groups require detailed scope reconciliation.

## 2026-11-14T04:44:45.932240+00:00 — Restaurant Codex source/scope approval

Recorded Samhith Varma’s explicit approval of REST-04–06 sources and page scopes. Evidence: `pipelines/codex/research/REST-source-approval.md`. Exact model assignments remain pending; no builds started or other groups approved.

## 2026-11-13 — Codex and Claude pipelines extended to twelve categories

Follow-on to the twelve-category activation earlier the same day, which had left both other
pipelines at ten. Operator instruction: update both to include portfolio and restaurant.

### Codex portfolio directories renamed (protocol defect closed)

`MODEL_ALLOCATION.md` §5 requires `<category>/<model-group>/<source_id>/`. Codex's delivered
portfolio replicas sat at `portfolio/codex/01-rowan-ellis`, `02-jamie-vale` and `03-avery-north`,
which the register had already flagged as a defect. Adding portfolio to the Codex pipeline made its
validator trip on it, forcing the choice between renaming the artifacts and weakening the check.
The operator chose renaming.

- Directories renamed to `PORT-04`, `PORT-05`, `PORT-06`.
- `*-complete.zip` files repacked so their internal root directory matches the new name. File counts
  unchanged: 29, 39 and 42. The fictional identities (Rowan Ellis, Jamie Vale, Avery North) are
  unchanged and still recorded in `portfolio/codex/README.md`.
- `relative_path` updated for those three register rows; the rename is noted in each row.
- **All 120 register rows are now canonical**, so the relaxed path check added to the open-source
  validator earlier today was **reverted to the strict canonical check** for all ten slots.

The `pipelines/codex/runs/**/snapshots/07-assignments.csv` files also contain the old directory
names. They were deliberately left untouched: they are run-time evidence of what the register
contained during past runs, and editing them would falsify that record.

**Still unresolved:** `PORT-04` uses brittanychiang.com, the same reference as Claude's `PORT-02`.
`Rules.md` §1 requires ten distinct references per category. The operator declined to reset PORT-04
as part of this change.

### Codex pipeline (slots 04–06): 30 → 36 replicas

`config.json` `excluded_categories` is now `[]` with the schema constant updated; `categories.json`
gained portfolio and restaurant with full ten-slot strata under Codex's own authority convention
(`codex assignment` for 04–06, `coordination proposal` elsewhere); `queue/manifest.json` went 40 →
**48 tasks** (12 research, 36 build); `validateSetup` requires twelve categories and 48 tasks; the
`validate.mjs` success message is derived from the data instead of hard-coded.

Portfolio's four new queue tasks are marked `completed` rather than `planned`, because those three
replicas were delivered 2026-11-10 before this queue existed. They carry no `run_id` and no run
directory, and `queue/README.md` states that. Restaurant's four are `planned`.

### Claude pipeline (slots 01–03): 30 → 36 replicas

`workflow.js` gained portfolio and restaurant category entries — strata matching the shared
inventories, plus category hints — taking its `cats` array to twelve. `README.md` gained the two
strata rows. `queue/README.md` now describes twelve rounds.

A new `queue/round-11-restaurant-build.md` is **blocked on Phase A**, not queued, and says why:
restaurant has no `research/REST.md`, no verified reference and no approval. The 2026-11-13 Phase A
approval record covers the ten original categories only — a point now stated explicitly in
`queue/README.md`, because reading it as covering "all Claude sources" would skip the gate for
restaurant. Portfolio gets no round file: its three replicas were delivered 2026-11-10, before the
round structure existed.

### Verification performed

- Codex: `node --test tests/pipeline.test.mjs` **14/14 pass** (its real-setup test was updated from
  30 to 36 builds and now also asserts twelve categories). `node scripts/validate.mjs` passes,
  reporting 12 categories, 36 Codex build slots, 12 research tasks.
- Open-source: **23/23 pass**, `validate.mjs` reports 12 categories, 48 build tasks, 12 research
  tasks — still green after the path check was tightened back to canonical.
- Register: 120 rows, 0 non-canonical `relative_path` values.
- Claude's `workflow.js` has no standalone syntax check available — it is a pi-subagents script with
  a top-level `return`, so `node --check` cannot parse it in any mode, before or after this edit.
  Its `cats` array was evaluated directly instead: twelve entries, three strata each.

### Not done

- No source approved, no replica generated, nothing marked accepted.
- The PORT-02 / PORT-04 duplicate reference remains open.

## 2026-11-14 — Restaurant research: Codex landed, open-source blocked

### Codex restaurant research recorded

`pipelines/codex/research/REST.md` exists and carries REST-04/05/06 blocks plus a source/scope
approval update timestamped 2026-11-14T04:44:45Z. The three inventory rows are
`verification_result=verified` with `approved_at`, `approved_by` and `approval_reference` filled:

| Slot | Stratum | Approved reference |
|---|---|---|
| REST-04 | vegan / health | https://www.crossroadskitchen.com/ |
| REST-05 | multi-location group | https://www.hogsalt.com/ |
| REST-06 | pizzeria | https://www.pizzeriabianco.com/ |

`research-REST` in the Codex queue moved `planned` → `completed`. Like portfolio's tasks it carries
no `run_id`, because the work happened in a Codex session rather than through this queue;
`queue/README.md` states that.

Codex's REST.md also rates slots 01–03 and 07–10, but its own text calls those "preliminary
homepage-level estimates, not completed approval proposals". **They approve nothing outside Codex's
own three slots** and are treated here as coordination notes only. Its observation that Russian
River's age-gate qualifier "needs rendered inspection before inclusion" concerns REST-09, an
open-source slot, and is carried forward as an input to that slot's own research, not as a finding.

### Those three URLs are now reserved against open-source slots

Verified by a dry run of `run-research.mjs REST`: the prompt's "must not pick" list now contains all
six taken references — claude's viacarota, franklinbbq and elevenmadisonpark, and codex's
crossroadskitchen, hogsalt and pizzeriabianco. No code change was needed; `reservedUrls()` reads the
inventory at run time.

### Open-source restaurant research NOT performed

Slots REST-07 … REST-10 remain unresearched. The run was attempted and stopped at the dry-run stage
for three reasons:

- **No endpoint.** `http://localhost:8080/v1/models` returns HTTP 000 and nothing is listening on
  port 8080; the SSH tunnel to the VT ARC session has never been established in this project.
- **No model declared.** `pipelines/open-source/models.json` does not exist, so no slot has a
  declared model, weights URL, licence or key environment variable.
- **No key in the environment.**

This pipeline's Phase A is performed **by each slot's own open-weight model**, by deliberate design
recorded earlier: the orchestrator issues every HTTP GET and the slot's model selects and reasons
about candidates. Writing `research/REST.md` from the orchestrator instead would record Claude Opus
as the researching agent for open-source slots, contaminating exactly the model attribution the
3/3/4 allocation exists to measure. It was therefore not done.

The inventory rows for slots 07–10 still carry the four source URLs inherited from the deleted
pre-protocol batch (sweetgreen, xianfoods, russianriverbrewing, tartinebakery) with every
verification and approval column empty. They are continuity records, **not assignments**, and the
slot's own research may well replace them.

### Restaurant is now tracked in all three queues

| Pipeline | Research | Builds |
|---|---|---|
| Claude 01–03 | batch 03, not started — blocks round 11 | round 11, blocked on Phase A |
| Codex 04–06 | `research-REST` completed 2026-11-14 | `build-REST-04/05/06` planned |
| Open-source 07–10 | `research-REST` planned, blocked on endpoint | `build-REST-07…10` planned |

### Verification performed

- Codex: `validate.mjs` passes (12 categories, 36 build slots, 12 research tasks); 14/14 tests pass.
- `run-research.mjs REST --compact --max-pages 8 --dry-run`: prompt assembled, six reserved URLs
  listed, **no API call made and nothing written**.
- No source approved for any open-source slot; nothing generated; nothing marked accepted.

## 2026-11-14T05:01:38.601483+00:00 — Restaurant initial Codex model declaration

User redirected the queued build to restaurant ("wait dont do weater, build restaurant instead"). REST-04–06 had source/scope approval and no fixed generator model. Initial assignment recorded as gpt-6, the model family identified by this session, running in Codex; exact release/version unknown. This is not a claim that the session is gpt-6.1-sol. No prior model assignment replaced. Begin REST-04 only, following the one-replica-per-delivery protocol. Weather unchanged.

## 2026-11-14T05:06:01.477554+00:00 — REST-04 implementation delivered; browser QC blocked

Seven pages delivered at restaurant/codex/REST-04: six approved Crossroads Kitchen source mappings plus local 404, fictional Verdant Table brand, two original local SVGs. Static audit passed (142 references, 21 components); JS syntax passed. Required shared QC attempted once, exit 2 before axe/layout scans: Chromium launch bootstrap permission denied. CUA preview also unavailable. Browser interactions not executed; no false pass, no human acceptance. Run `2026-11-14T05-01-38-812Z-build-REST-04` preserves task/snapshots, initial output, static evidence, QC log, complete delivery ZIP and hashes. Queue/register REST-04 blocked pending browser QC; REST-05/06 remain planned. No publication or commits.

## 2026-11-14 — Claude restaurant Phase A research (slots 01–03), verified, not approved

Restaurant's Claude third is now researched. `pipelines/claude/research/REST.md` holds REST-01/02/03
blocks; `pipelines/claude/research/evidence/REST-http-2026-11-14.json` holds 38 request records over 34 unique URLs in three passes.
Six of ten restaurant slots are now researched (Codex 04–06 on 2026-11-14, Claude 01–03 today);
slots 07–10 remain blocked on the open-source endpoint.

### Who performed it — a disclosed deviation

Rounds 01–10's Claude research was produced by `claude-sonnet-5-5` worker agents through
pi-subagents. That runtime was unavailable, so this category's Phase A was performed **directly by
the orchestrator session (`claude-opus-5`)**. Same model group, different agent and model. Recorded
in REST.md, in `queue/round-11-restaurant-build.md` and here, so it is not mistaken for worker output.

### Method

Orchestrator HTTP GET, 25s timeout, redirects followed, generic research user-agent, `robots.txt`
read for user-agent `*` before each origin and permissive for every path fetched. **No browser
rendering, no JavaScript, no web search.** Raw HTML only.

### Sources verified (all HTTP 200)

| Slot | Stratum | Reference | Pages 200 | Complexity |
|---|---|---|---|---|
| REST-01 | small local independent | https://www.viacarota.com/ | 10 | low–medium |
| REST-02 | BBQ / smokehouse | https://franklinbbq.com/ | 9 | medium |
| REST-03 | fine dining | https://www.elevenmadisonpark.com/ | 12 | **unknown** |

These are the same three references the deleted pre-protocol batch used for these strata, verified
from scratch — the approach Codex took for its three. No reference held by another group was
considered.

### Findings that affect the build

- **REST-03 returned no `h1`, `h2` or `h3` elements at all.** Eleven Madison Park renders its content
  client-side, so its section hierarchy, order and copy are **not established** by raw-HTML research.
  Complexity is recorded as `unknown`, not low. A replica built from this evidence alone would be
  inventing structure. This is the single biggest open question in the category.
- **REST-01's menu is an image with a plain-text alternative** at `/text` ("Plain-Text Menu", with
  real text headings SPUNTINI through Lista del vini). A text alternative to an image menu is
  directly on-topic for this study and worth replicating as a pattern, not just a page.
- **Platform monoculture:** all three are Squarespace. The Claude third of this category has no
  platform diversity.
- **All three delegate reservations off-site** — Resy for REST-01 and REST-03, preorder/Toast/
  Goldbelly for REST-02. No replica in this third will exercise a real on-site booking form; every
  booking flow becomes a labeled simulation.

### Source defects recorded, not reproduced

- **REST-02:** the primary nav links "Private Events" to `/private-events`, which returns **404**;
  the working page is `/private-events01`. Also `/visitus` and `/private-events01` serve the same
  `<title>`.
- **REST-01:** a nav link labelled "Careers" points to `/covid-19-safety-measures`. `/search`
  returned **no HTTP status** at all despite a `GET /search` form in the header. Two hashed gallery
  URLs returned byte-identical responses.
- **REST-03:** `/about` and `/ourrestaurant` returned byte-identical 296,093-byte responses — two
  routes onto one page.

### Approval gate NOT passed

`approved_at`, `approved_by` and `approval_reference` are **empty** for REST-01/02/03. The
2026-11-13 Phase A waiver and approval record cover the ten original categories only, not
restaurant. `Rules.md` §3 therefore still blocks round 11, whose status moved from
"blocked on Phase A" to **"blocked on approval"**. The approval table at the end of REST.md asks the
project lead to decide three things beyond yes/no: whether to accept REST-03's inferred structure or
render/substitute it, whether the Squarespace monoculture is acceptable, and whether a third with no
on-site booking form is acceptable.

### Not done

- No source approved; no replica generated; nothing marked accepted.
- Open-source slots 07–10 still unresearched: no endpoint, no `models.json`, no key.

## 2026-11-14T05:08:00.553509+00:00 — REST-05/06 parallel execution authorized

User explicitly requested “build rest5/6 at once”, superseding the one-replica stopping cadence for this delivery. Both keep independent approved scopes, isolated temporary generation workspaces, inherited GPT-6/Codex model configuration, recorded runs, artifacts and QC. No model reassignment, shared protocol change, or publishing authorized/inferred. Two generation agents launched, one per replica; coordinator owns shared register/queue updates and independent source review. Both queue tasks running, assignment rows generating.

## 2026-11-14T05:12:22.861782+00:00 — REST-05 and REST-06 parallel deliveries

Both authorized restaurant replicas implemented independently by inherited GPT-6/Codex agents in isolated temporary workspaces, with individual initial-output preservation, source/scope snapshots, real timestamps, separate shared QC attempts and ZIP/hash manifests. Exact release/version unavailable; no model reassignment or other-group edits. Coordinator performed static reviews and packaged files without editing generated website code.

- REST-05: 6 pages, 16 files; 92 references and 18 component types checked with zero static findings. Required browser QC failed/unavailable; status blocked. Evidence: `2026-11-14T05-07-13-605Z-build-REST-05`.
- REST-06: 6 pages, 16 files; 110 references and 20 component types checked with zero static findings. Required browser QC failed/unavailable; status blocked. Evidence: `2026-11-14T05-07-13-677Z-build-REST-06`.

Complete per-site archives verified against final SHA-256 manifests. No accessibility conformance or human acceptance asserted. No commit, push or publication.

## 2026-11-14 — Restaurant Claude sources approved; round 11 opened

### Approval recorded

`Rules.md` §3 approval for restaurant slots REST-01, REST-02 and REST-03, by the project lead
(Samhith Varma), 2026-11-14. Record: `pipelines/claude/research/approval-restaurant-2026-11-14.md`.
`approved_at`, `approved_by` and `approval_reference` are now filled for those three rows in
`metadata/source-inventories/restaurant.csv`, and the register rows moved `planned` → `approved`
with `model_id` `claude-sonnet-5-5`.

| Slot | Stratum | Approved reference |
|---|---|---|
| REST-01 | small local independent | https://www.viacarota.com/ |
| REST-02 | BBQ / smokehouse | https://franklinbbq.com/ |
| REST-03 | fine dining | https://www.elevenmadisonpark.com/ |

**This is an approval, not a waiver.** The 2026-11-13 Phase A waiver covers the ten original
categories and does not extend to restaurant. Replicas must record `source_approved_at` as
2026-11-14 and must not claim the Phase A stop was waived.

Approved with two disclosures carried into the builds: **REST-03's information architecture will be
inferred, not replicated** — Eleven Madison Park served zero `h1`/`h2`/`h3` elements on two
verification passes, so its structure is unestablished and its complexity stays `unknown`; its
`fidelity-notes.md` must say so plainly. And all three references are Squarespace sites that
delegate reservations off-site, so this third has no platform diversity and no real on-site booking
form. Both were accepted knowingly.

### Round 11 opened — three concurrent builders

Round 11 moved to **in progress 2026-11-14**. Three builder agents on `claude-sonnet-5-5` were
launched concurrently, one per replica, each restricted to writing inside
`Websites/restaurant/claude/REST-0N/` only.

**Runtime deviation from rounds 01–10.** Those rounds ran through pi-subagents `worker` agents in
per-agent git worktrees. That runtime is unavailable here, so these three run as Claude Code Agent
builders in the shared working tree, isolated **by disjoint write path only**. Every builder was
therefore forbidden from running any git command at all — the tree carries 254 uncommitted changed
paths and three agents share it, so an index or tree operation by one would corrupt the others.
Scratch files go in per-agent `mktemp -d` directories. `generation-metadata.json` records
`model_provider_or_runtime` as "Claude Code Agent tool builder (claude-sonnet-5-5); orchestrated by
claude-opus-5" rather than the pi-subagents string used in earlier rounds.

**Two stale values in `pipelines/claude/workflow.js` were corrected in the briefs rather than
inherited:** it hard-codes branch `websites/claude-replicas` (the actual branch is
`websites/portfolio-claude-01-03`) and `rules_revision` "at commit a07e70e" — but both `Rules.md`
and `MODEL_ALLOCATION.md` are modified relative to that commit, so the string would have been false.
The builders were given "working tree as of 2026-11-14 (uncommitted modifications to Rules.md and
MODEL_ALLOCATION.md on top of commit a07e70e, branch websites/portfolio-claude-01-03)". The
`workflow.js` constants themselves are unchanged and still stale for any future run.

Each builder was also given its slot's specific source defects to record rather than reproduce, and
the round-10 navigation convention (prune nav to pages that exist; no shared stand-in page).

**Nothing is accepted.** The orchestrator re-runs `tools/qc/qc.js` on each delivery rather than
trusting the agents' reports, verifies each `generation-metadata.json`, and only then moves the
register rows to `submitted`.

## 2026-11-14 — Round 11 delivered: restaurant Claude slots 01–03

Three replicas built by concurrent `claude-sonnet-5-5` Agent builders, one per slot. Register rows
moved `approved` → `submitted`. Round 11 is **done**.

### Orchestrator-verified QC — re-run, not taken on report

Each builder claimed `failures=0`. The orchestrator re-ran `tools/qc/qc.js` against each delivery
itself; all three reproduced, exit 0:

| Slot | Replica (fictional) | Reference | qc.js (orchestrator re-run) | Components |
|---|---|---|---|---|
| REST-01 | Trattoria Fico Nero | viacarota.com | `pages=14 files=42 failures=0 warnings=0` | 32 |
| REST-02 | Cinder Ridge Smokehouse | franklinbbq.com | `pages=11 files=31 failures=0 warnings=0` | 34 |
| REST-03 | Vane & Alder | elevenmadisonpark.com | `pages=15 files=27 failures=0 warnings=0` | 29 |

Provenance checked field by field on all three: category, slot, source_id, model_group,
`model_id` `claude-sonnet-5-5`, approved_source_url, `source_verified_at` and `source_approved_at`
both 2026-11-14, `human_edits` `[]`, real UTC timestamps, and the corrected `rules_revision`. All
three READMEs correctly omit any Phase A waiver claim. Independent checks found **no** prohibited
frameworks or CDN references, **no** `fetch()`/`XMLHttpRequest`, and **zero** `href="#"` in any of
the three.

### Deviations found by verification

- **REST-01 `index.html` carries 2 `h1` elements**, mirroring the reference's multiple h1s. This
  deviates from the brief's "one h1" instruction; it is a defensible fidelity choice and axe does not
  flag it, but it is recorded rather than waved through. The builder's own report said *three* h1s;
  the actual count is two — a minor inaccuracy in its self-report, which is exactly why the
  orchestrator re-counts rather than transcribing agent claims.
- **REST-03's information architecture is inferred, not replicated**, as approved. Its
  `validation_summary.structure` honestly reads `partial`, citing that a match to the reference
  hierarchy is untestable because the reference's rendered structure was never observed. Its
  `fidelity-notes.md` names what is invention: body order, headings and copy of every page, all
  layout, the dropdown contents, and every widget.
- **REST-03's builder briefly wrote two scratch files outside its allowed path** — one in
  `restaurant/claude/`, one in `/tmp` — and deleted both. It disclosed this unprompted. Verified:
  `restaurant/claude/` now contains only `REST-01`, `REST-02`, `REST-03`, and no stray files exist
  anywhere under `restaurant/`. The write boundary held in the end, but it was breached in passing.

### The disclaimer-matching pattern, again

A denylist scan for WCAG conformance claims hit REST-01's README. The matched text was
"**No claim of WCAG conformance is made;** the site is a WCAG 2.2 AA-oriented baseline only" — the
honest disclaimer, not a claim. This is now the fifth-plus round where the only match for a
forbidden term was the sentence stating its absence.

### Concurrent register writes observed

Codex's coordinator wrote `metadata/assignments.csv` while this round ran: restaurant rows 04–06
moved to `blocked` with `generated_at` timestamps of 05:04–05:11Z and notes "Source/scope approved;
exact generator model assignment pending". Codex has in fact produced artifacts — 16 files each in
`restaurant/codex/REST-04/05/06`, with `index.html` and `generation-metadata.json` — but holds the
rows `blocked` rather than `submitted` because the generating model is not yet attributed.

**Those rows were not touched.** The Claude orchestrator rewrote only its own three
`model_group=claude` rows and left every other line byte-identical. Register integrity after the
interleaved writes: **120 rows, 12 categories, 0 non-canonical `relative_path` values.** There is
still no locking on this file, and this round is the first case of two orchestrators writing it
inside the same minute; nothing was lost, but that is luck rather than design.

### Restaurant category state

Six of ten slots now have artifacts on disk: Claude 01–03 submitted and orchestrator-verified,
Codex 04–06 built but `blocked` on model attribution. Open-source 07–10 remain `planned` and
unresearched — no endpoint, no `models.json`, no key.

**Nothing is marked accepted.** `qc.js failures=0` plus scripted flow checks is a baseline, not
acceptance; acceptance needs human review, and no replica has had one.

## 2026-11-14T05:25:43.169159+00:00 — Weather round execution and model reassignment

User directed “proceed with the weather round” after the earlier model mismatch was disclosed and restaurant round delivered. Interpreted as authorization for current disclosed GPT-6/Codex configuration: WX-04/05/06 model changed from gpt-6.1-sol to gpt-6, exact release/version unknown. This interpretation is not a claim of a verbatim model-specific approval. Original rows, context and reasoning preserved in pipelines/codex/research/evidence/weather-model-execution-2026-11-14.json. Approved Met Office / Time and Date / Mountain-Forecast scopes remain fixed. Execute serially, separate runs, outputs, snapshots and QC. All weather and warnings fictional; no live APIs.

## 2026-11-14T05:34:57.923843+00:00 — Weather round WX-04/05/06 implemented

Three approved weather replicas generated serially in a single GPT-6/Codex session, separate runs and initial-output preservation. Exact release/version unknown; model reassignment/context in weather-model-execution-2026-11-14.json. Source/page scopes unchanged; all conditions, warnings, times, places and maps fixed fictional samples.

- WX-04: 6 pages / 15 files; 6 pure data assertions passed, JS syntax and static sitemap/link/component self-review passed. Shared QC attempted 1 time(s), exit 2 before browser scan. Run `2026-11-14T05-25-43-413Z-build-WX-04`.
- WX-05: 6 pages / 14 files; 7 pure data assertions passed, JS syntax and static sitemap/link/component self-review passed. Shared QC attempted 1 time(s), exit 2 before browser scan. Run `2026-11-14T05-25-43-487Z-build-WX-05`.
- WX-06: 5 pages / 15 files; 6 pure data assertions passed, JS syntax and static sitemap/link/component self-review passed. Shared QC attempted 2 time(s), exit 2 before browser scan. Run `2026-11-14T05-25-43-557Z-build-WX-06`.

WX-06 same-session correction after initial output: SVG layer toggles switched to style.display; README sample-count arithmetic corrected. First and second QC logs retained. No browser/axe pass, rendered interaction claim, independent reviewer, conformance or human acceptance. Queue/register blocked pending required browser QC. Complete per-site ZIPs byte-verified against SHA-256 manifests; no publication, commit or push.

## 2026-11-14 — Round 08 delivered: weather Claude slots 01–03

Three replicas built by concurrent `claude-sonnet-5-5` Agent builders. Register rows `planned` →
`submitted`. Round 08 **done**. Claude now has 30 of 36 rows submitted; nonprofit and church remain.

### Orchestrator-verified QC — re-run, not taken on report

| Slot | Replica (fictional) | Reference | qc.js (orchestrator re-run) |
|---|---|---|---|
| WX-01 | Meridian Weather Authority | weather.gov | `pages=13 files=28 failures=0 warnings=0` |
| WX-02 | Larkspur Weather | wunderground.com | `pages=14 files=26 failures=0 warnings=0` |
| WX-03 | Meridian 12 Weather (MRD-TV 12) | wral.com/weather | `pages=12 files=34 failures=0 warnings=0` |

All three reproduced at exit 0. Provenance verified field by field, including the corrected dates
`source_verified_at` 2026-11-12 and `source_approved_at` 2026-11-13. Independent checks: no
prohibited frameworks or CDN references, no `fetch()`/`XMLHttpRequest`, zero `href="#"`, and
**one `h1` on every page of all three** — the REST-01 multi-h1 deviation did not recur.

### The category's hard rule held

Every page of all three replicas (39 pages total) carries sample-data labelling; none was missed.
Spot-verified beyond the labels: WX-03's radar player says "NOT LIVE" three times, its webcams
"NO LIVE FEED", and its school-closings page carries an explicit "entirely invented — do not act on
it" warning with status conveyed by words and border style rather than colour alone. That last one
was the sharpest risk in this category: a plausible closings list is the one artifact here a reader
might act on.

### Trademark and insignia checks passed

- **WX-01** was the sensitive one — a US federal source. No "NOAA", "National Weather Service",
  "weather.gov" or Department of Commerce string appears in any delivered page, stylesheet, script
  or SVG; the real names survive only in the research docs as metadata. It also used **vanilla JS**
  despite the reference loading jQuery 1.12.4, jQuery UI, jquery-migrate, jquery-cookie and an ESRI
  map script — behaviour replicated, stack not.
- **WX-02** carries no Weather Underground, Weather Channel, weather.com, WunderMap, IBM or Weather
  Company string, and omits all ads, tracking and consent markup.
- **WX-03** carries no WRAL, Capitol Broadcasting, DUALDoppler or real-market naming, and no
  Taboola, OneTrust, custom elements or shadow DOM.

### One agent claim that needed a second look

WX-02's builder reported "all tables are real `<table>` markup with captions and `th scope`". A
static grep of its HTML found 6 tables and **zero** captions or scoped headers — an apparent
contradiction. The static grep was the wrong test: those tables are JS-rendered. `js/main.js` holds
7 `<caption>` and 44 `scope=` occurrences, and a Playwright pass over the rendered DOM confirmed
**6 of 6 tables with a caption and scoped headers**, every caption beginning "Sample data
(fictional):". The claim holds. Recorded because the verification method, not the claim, was at
fault — a reminder that static source greps cannot audit client-rendered markup.

### An observation worth noting for analysis

Two independently generated replicas in this category chose the same distinctive brand root:
**"Meridian" Weather Authority** (WX-01) and **"Meridian" 12 Weather** (WX-03). The builders could
not see each other's output. Both names are fictional and no rule is broken, but a shared naming
prior across sibling runs of the same model is the kind of artifact that could confound
brand-independence assumptions in later analysis. Flagged, not changed.

### Stale constants in `workflow.js` — third instance

The file hard-codes `source_approved_at` "2026-11-10". Weather's actual approval is **2026-11-13**,
so every replica in this round would have carried a false approval date had the briefs inherited it.
That is now three false constants in `workflow.js` (branch name, rules revision, approval date).
The briefs were corrected; **the file itself is still stale for any future run.**

### Queue drift corrected

`pipelines/claude/queue/README.md` listed rounds 02–07 as "queued" while the register showed all of
them `submitted:3`, and round 01 as "in progress". Eight round rows were reconciled against the
register, which is the source of truth.

**Nothing is marked accepted.** `failures=0` plus scripted flow checks is a baseline, not
acceptance; no replica in this round has had human review.
