# Round 04: build — e-commerce (E-commerce), Claude slots 01–03

**Status:** queued
**Category:** `e-commerce`
**IDs:** ECOM-01, ECOM-02, ECOM-03
**Model group:** claude (`claude-sonnet-5-5`) · **Codex orchestrator covers slots 04–06 of the same category in parallel.**

## Before launching

1. `Websites/pipelines/claude/research/ECOM.md` exists and holds a `### ECOM-0N` block for each of the three slots.
2. All three rows in `Websites/metadata/source-inventories/e-commerce.csv` are `verification_result=verified` and carry a non-empty `approved_at` / `approved_by` / `approval_reference`. Phase A approval for all 30 Claude slots was recorded 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`); re-check the row rather than assuming it, because a later source replacement voids that slot's approval.
3. The three target directories `Websites/e-commerce/claude/ECOM-0N/` do not already exist with content.
4. Check `Websites/metadata/change-log.md` for a Codex-coordinator entry covering this category, so both orchestrators know the round is open on both sides.

## Out-of-scope navigation targets — fixed convention (adopted 2026-11-13)

**Prune the navigation to pages that exist in the replica.** A reference nav or footer target that
is not rebuilt is simply not linked; dropdowns list only items with a local page. Do **not** route
un-rebuilt targets to a shared stand-in or `not-replicated` landing page.

Why this is fixed rather than left to the agent: in round 01 the three builders chose
independently, and UNI-01 sent 428 of 862 links and UNI-02 920 of 1689 links to a single stand-in
page while UNI-03 pruned and sent none. Roughly half of all links in two replicas resolved to one
page, which makes link-graph, navigation-depth and link-density measures reflect that choice rather
than the replica or the model. Both approaches satisfy `Rules.md` §5 (no `href="#"`, no dead
controls) and both pass QC, so this is a comparability decision, not a compliance one.

The round-01 university replicas were generated before this convention and are **not** retrofitted:
hand-editing them would require disclosing human edits under `MODEL_ALLOCATION.md` §6 and would
contaminate baselines meant to be generated under identical rules. University therefore diverges
from rounds 02-10 and `metadata/change-log.md` records it.

## Launch

Three concurrent builder agents, one per replica, each writing **only** inside `Websites/e-commerce/claude/<ID>/`.

Where pi-subagents and git worktrees are available:
```
subagent({ workflow: "Websites/pipelines/claude/workflow.js", cwd: "<repo root>", async: true, worktree: true, args: { phase: "build", prefixes: ['ECOM-01', 'ECOM-02', 'ECOM-03'] } })
```
Where they are not (plain Claude Code session): launch three `Agent` builders on `claude-sonnet-5-5` with the Phase B brief from `workflow.js` (the `builds` block), substituting this category's stratum and hints. Isolation is then by disjoint write path only — forbid every index- or tree-modifying git command and require scratch files in a private `mktemp -d`.

## After it finishes

1. If the agents ran in worktrees, apply each handoff patch with `git apply`; it must touch only `Websites/e-commerce/claude/<ID>/`.
2. **Re-run QC yourself** rather than trusting the agent's report: `node Websites/tools/qc/qc.js Websites/e-commerce/claude/<ID>` must print `failures=0` for all three.
3. Verify `generation-metadata.json` in each replica: `model_id` `claude-sonnet-5-5`, `model_group` `claude`, the approved `source_url`, real UTC generation timestamps, `human_edits` reflecting any hand edit you made.
4. Fill each replica's row in `Websites/metadata/assignments.csv` — **Claude rows only, never a Codex row**: `status` `submitted`, `generated_at`, and confirm `source_name` / `source_url` / `approved_at`.
5. If QC fails, resume that agent with the QC output. Do not fix it by hand: `MODEL_ALLOCATION.md` §6 requires disclosing human edits.
6. Append a round entry to `Websites/metadata/change-log.md` (append-only — the Codex coordinator writes to the same file).
7. Commit one replica per commit: `[e-commerce][claude][<ID>] Add replica`.
