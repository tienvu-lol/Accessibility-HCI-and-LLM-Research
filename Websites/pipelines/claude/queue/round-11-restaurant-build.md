# Round 11: build — restaurant (Restaurant & Food Service), Claude slots 01–03

**Status:** done 2026-11-14 — all three delivered, orchestrator-verified qc.js failures=0
**Category:** `restaurant`
**IDs:** REST-01, REST-02, REST-03
**Model group:** claude (`claude-sonnet-5-5`) · **Codex orchestrator covers slots 04–06 of the same category in parallel.**

## This round cannot launch yet

Phase A research **is done** as of 2026-11-14 — `Websites/pipelines/claude/research/REST.md`, with
34 recorded HTTP requests in `research/evidence/REST-http-2026-11-14.json`. All three references
returned HTTP 200 and are transcribed into the inventory with
`verification_result=verified`.

What is missing is **approval**:

- `approved_at`, `approved_by` and `approval_reference` are empty for REST-01, REST-02 and REST-03
  in `Websites/metadata/source-inventories/restaurant.csv`, so `Rules.md` section 3 blocks every
  build in this round.
- The 2026-11-13 approval record and Phase A waiver cover the ten original categories only, **not**
  restaurant.

The approval table at the end of `research/REST.md` lists three decisions the project lead should
make alongside yes/no: REST-03 (Eleven Madison Park) returned **no server-rendered headings at
all**, so its structure would be inferred rather than replicated; all three references are
Squarespace sites, giving this third no platform diversity; and all three delegate reservations
off-site, so no replica here exercises a real on-site booking form.

Note also that this research was performed by the orchestrator session (`claude-opus-5`) rather than
by a `claude-sonnet-5-5` worker, because pi-subagents was unavailable. Rounds 01–10 were researched
by workers.

## Why the category is empty

Ten restaurant replicas existed until 2026-11-13 and were deleted. All ten loaded Bootstrap 5.3.3
and jQuery 3.7.1, which `Rules.md` section 4 prohibits; they were built 2026-11-07, before the
protocol was adopted. No artifact recorded which model produced them. `Websites/restaurant/README.md`
and `metadata/change-log.md` hold the full record. **Do not treat the deleted batch as a reference
for the rebuild** — its strata are reusable, its sources are not re-approved, and its code violated
the technology rules.

## Before launching

1. `Websites/pipelines/claude/research/REST.md` exists and holds a `### REST-0N` block for each of
   the three slots.
2. All three rows in `Websites/metadata/source-inventories/restaurant.csv` are
   `verification_result=verified` and carry a non-empty `approved_at` / `approved_by` /
   `approval_reference`. Re-check the row rather than assuming it.
3. The three target directories `Websites/restaurant/claude/REST-0N/` do not already exist with
   content. The `restaurant/claude/` directory exists and is empty.
4. Check `Websites/metadata/change-log.md` for a Codex-coordinator entry covering this category, so
   both orchestrators know the round is open on both sides.

## Out-of-scope navigation targets — fixed convention (adopted 2026-11-13)

**Prune the navigation to pages that exist in the replica.** A reference nav or footer target that
is not rebuilt is simply not linked; dropdowns list only items with a local page. Do **not** route
un-rebuilt targets to a shared stand-in or `not-replicated` landing page. The rationale is recorded
in `round-10-church-build.md` and applies unchanged here: a shared stand-in makes link-graph and
navigation-depth measures reflect that choice rather than the replica or the model.

## Launch

Three concurrent builder agents, one per replica, each writing **only** inside
`Websites/restaurant/claude/<ID>/`.

Where pi-subagents and git worktrees are available:
```
subagent({ workflow: "Websites/pipelines/claude/workflow.js", cwd: "<repo root>", async: true, worktree: true, args: { phase: "build", prefixes: ['REST-01', 'REST-02', 'REST-03'] } })
```
Where they are not (plain Claude Code session): launch three `Agent` builders on
`claude-sonnet-5-5` with the Phase B brief from `workflow.js` (the `builds` block), substituting
this category's stratum and hints. Isolation is then by disjoint write path only — forbid every
index- or tree-modifying git command and require scratch files in a private `mktemp -d`.

## After it finishes

1. If the agents ran in worktrees, apply each handoff patch with `git apply`; it must touch only
   `Websites/restaurant/claude/<ID>/`.
2. **Re-run QC yourself** rather than trusting the agent's report:
   `node Websites/tools/qc/qc.js Websites/restaurant/claude/<ID>` must print `failures=0` for all three.
3. Verify `generation-metadata.json` in each replica: `model_id` `claude-sonnet-5-5`, `model_group`
   `claude`, the approved `source_url`, real UTC generation timestamps, `human_edits` reflecting any
   hand edit you made.
4. Fill each replica's row in `Websites/metadata/assignments.csv` — **Claude rows only, never a
   Codex row**: `status` `submitted`, `generated_at`, and confirm `source_name` / `source_url` /
   `approved_at`. Each row currently carries a note about the deleted pre-protocol batch; replace it
   rather than appending to it.
5. If QC fails, resume that agent with the QC output. Do not fix it by hand: `MODEL_ALLOCATION.md`
   section 6 requires disclosing human edits.
6. Append a round entry to `Websites/metadata/change-log.md` (append-only — the Codex coordinator
   writes to the same file).
7. Commit one replica per commit: `[restaurant][claude][<ID>] Add replica`.
