# Restaurant category — reset to planned (2026-11-13)

This category currently contains **no replicas**. All ten slots are registered in
`metadata/assignments.csv` with status `planned`, and no reference source is verified or approved.

## What was removed and why

On 2026-11-13 the pre-protocol batch of ten sites (`REST-01.zip` … `REST-10.zip`) and the
`restaurant-replicas-protocol.zip` bundle were deleted at the operator's instruction.

Two reasons, both recorded at the time:

- **Prohibited technology.** Every one of the ten sites loaded **Bootstrap 5.3.3** and
  **jQuery 3.7.1** from `assets/vendor/`. `Rules.md` (WEB-REPLICA-V1.0) section 4 prohibits both.
  The sites were built on 2026-11-07, before the protocol was adopted, and the earlier decision
  had been to document the deviation rather than remove it. Keeping them would have left this
  category non-comparable to the other eleven on the exact dimension the study measures.
- **Unrecorded provenance.** No zip contained `generation-metadata.json`, and all ten register
  rows had an empty `model_group` and `model_id`. The operator states all ten were produced by
  Claude Opus 5.5; **no artifact in the repository corroborates that**, so it is recorded here as
  an operator statement, not verified provenance.

The deleted archives were copied to the session scratchpad before removal. That location is
temporary and is not a repository backup.

## Allocation

The category follows the standard 3 Claude / 3 Codex / 4 open-source split of
`MODEL_ALLOCATION.md` §2. Directories `claude/` and `codex/` exist but are empty;
`open-source/` is created by the open-source pipeline when its first build runs.

| Slot | ID | Model group | Sampling stratum |
|---|---|---|---|
| 01 | REST-01 | Claude | small local independent |
| 02 | REST-02 | Claude | BBQ / smokehouse |
| 03 | REST-03 | Claude | fine dining |
| 04 | REST-04 | Codex | vegan / health |
| 05 | REST-05 | Codex | multi-location group |
| 06 | REST-06 | Codex | pizzeria |
| 07 | REST-07 | Open-source | fast-casual chain |
| 08 | REST-08 | Open-source | ethnic (Xi'an Chinese) |
| 09 | REST-09 | Open-source | brewery (age gate) |
| 10 | REST-10 | Open-source | cafe / bakery |

The strata are carried over from the deleted batch and are recorded in
`metadata/source-inventories/restaurant.csv`. The source names that batch used are retained in
that file for continuity only — **none is re-verified or re-approved**, and the Phase A research
and approval gate in `Rules.md` section 3 applies in full before any slot is built.

## Rebuilding

Each slot must be produced by its assigned group under its own pipeline, one replica per
delivery, at `restaurant/<model-group>/REST-xx/`, with the complete deliverable set required by
`Rules.md` section 8 including `generation-metadata.json`. Nothing here may be marked accepted
without a QC run that actually executed.
