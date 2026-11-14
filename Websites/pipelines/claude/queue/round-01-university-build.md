# Round 01: build — university (School (University)), Claude slots 01–03

**Status:** in progress 2026-11-13
**Category:** `university`
**IDs:** UNI-01, UNI-02, UNI-03
**Model group:** claude (`claude-sonnet-5-5`) · **Codex orchestrator covers slots 04–06 of the same category in parallel.**

## Before launching

1. `Websites/pipelines/claude/research/UNI.md` exists and holds a `### UNI-0N` block for each of the three slots.
2. All three rows in `Websites/metadata/source-inventories/university.csv` are `verification_result=verified` and carry a non-empty `approved_at` / `approved_by` / `approval_reference`. Phase A approval for all 30 Claude slots was recorded 2026-11-13 (`Websites/pipelines/claude/research/approval-2026-11-13.md`); re-check the row rather than assuming it, because a later source replacement voids that slot's approval.
3. The three target directories `Websites/university/claude/UNI-0N/` do not already exist with content.
4. Check `Websites/metadata/change-log.md` for a Codex-coordinator entry covering this category, so both orchestrators know the round is open on both sides.

## Launch

Three concurrent builder agents, one per replica, each writing **only** inside `Websites/university/claude/<ID>/`.

Where pi-subagents and git worktrees are available:
```
subagent({ workflow: "Websites/pipelines/claude/workflow.js", cwd: "<repo root>", async: true, worktree: true, args: { phase: "build", prefixes: ['UNI-01', 'UNI-02', 'UNI-03'] } })
```
Where they are not (plain Claude Code session): launch three `Agent` builders on `claude-sonnet-5-5` with the Phase B brief from `workflow.js` (the `builds` block), substituting this category's stratum and hints. Isolation is then by disjoint write path only — forbid every index- or tree-modifying git command and require scratch files in a private `mktemp -d`.

## After it finishes

1. If the agents ran in worktrees, apply each handoff patch with `git apply`; it must touch only `Websites/university/claude/<ID>/`.
2. **Re-run QC yourself** rather than trusting the agent's report: `node Websites/tools/qc/qc.js Websites/university/claude/<ID>` must print `failures=0` for all three.
3. Verify `generation-metadata.json` in each replica: `model_id` `claude-sonnet-5-5`, `model_group` `claude`, the approved `source_url`, real UTC generation timestamps, `human_edits` reflecting any hand edit you made.
4. Fill each replica's row in `Websites/metadata/assignments.csv` — **Claude rows only, never a Codex row**: `status` `submitted`, `generated_at`, and confirm `source_name` / `source_url` / `approved_at`.
5. If QC fails, resume that agent with the QC output. Do not fix it by hand: `MODEL_ALLOCATION.md` §6 requires disclosing human edits.
6. Append a round entry to `Websites/metadata/change-log.md` (append-only — the Codex coordinator writes to the same file).
7. Commit one replica per commit: `[university][claude][<ID>] Add replica`.
