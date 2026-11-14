# Claude batch queue

Build work is organised as **twelve per-category rounds**, one round per category, three replicas
per round (Claude slots 01–03). Portfolio was delivered on 2026-11-10, before this round structure
existed, so it has no round file; restaurant joined on 2026-11-13 as round 11. The Codex orchestrator runs slots 04–06 of the same category in
parallel from its own queue, so a category is complete when both orchestrators have finished their
half of it. Run rounds in order; do not open a second build round before the current one's three
replicas have all reached `failures=0`.

Slots 07–10 (open-source group) are outside this queue: they are registered as `planned` and have
no sources researched. See `MODEL_ALLOCATION.md` §2 "Active allocation".

## Research

| Batch | Phase | IDs | Status |
|---|---|---|---|
| 01 | research | UNI, HOSP, CORP, ECOM, NEWS | done 2026-11-10 |
| 02 | research | GOV, FASH, WX, NPO, CHUR | done 2026-11-12 |
| 03 | research | REST | done 2026-11-14 (orchestrator-performed) — **awaiting approval** |

Phase A approval for 30 Claude sources was recorded 2026-11-13 —
`pipelines/claude/research/approval-2026-11-13.md`. **It covers the ten original categories only.**
Portfolio's three sources carry their own `approved_at` of 2026-11-09 in the register. Restaurant's
three sources were researched and HTTP-verified on 2026-11-14 (`research/REST.md`) but are **not
approved** — `approved_at` is empty for REST-01/02/03, so `Rules.md` §3 still blocks round 11. The
pre-protocol restaurant batch was deleted on 2026-11-13.

## Build rounds

| Round | Category | IDs | Status |
|---|---|---|---|
| 01 | university | UNI-01, UNI-02, UNI-03 | done 2026-11-13 |
| 02 | healthcare | HOSP-01, HOSP-02, HOSP-03 | done 2026-11-13 |
| 03 | company | CORP-01, CORP-02, CORP-03 | done 2026-11-13 |
| 04 | e-commerce | ECOM-01, ECOM-02, ECOM-03 | done 2026-11-13 |
| 05 | news | NEWS-01, NEWS-02, NEWS-03 | done 2026-11-13 |
| 06 | government | GOV-01, GOV-02, GOV-03 | done 2026-11-13 |
| 07 | fashion | FASH-01, FASH-02, FASH-03 | done 2026-11-13 |
| 08 | weather | WX-01, WX-02, WX-03 | done 2026-11-14 |
| 09 | nonprofit | NPO-01, NPO-02, NPO-03 | queued |
| 10 | church | CHUR-01, CHUR-02, CHUR-03 | queued |
| 11 | restaurant | REST-01, REST-02, REST-03 | done 2026-11-14 |

Portfolio (PORT-01, PORT-02, PORT-03) was delivered 2026-11-10 outside this structure and has no round.

| Batch | Phase | IDs | Status |
|---|---|---|---|
| 09 | integrate | all 36 Claude replicas | queued |

## Register ownership

Two orchestrators write `metadata/assignments.csv` and `metadata/change-log.md` concurrently and
there is no locking. The Claude orchestrator writes **only** `model_group=claude` rows; the Codex
coordinator writes **only** `model_group=codex` rows; neither normalises the other's statuses.
`change-log.md` is append-only for both.

## History

Build work was previously grouped as batches 03–08: five replicas per batch, packed across category
boundaries (e.g. batch 03 was `UNI-01, UNI-02, UNI-03, HOSP-01, HOSP-02`). That conflicted with the
agreed one-category-at-a-time, three-replicas-per-orchestrator round structure, so those six files
were replaced by the ten round files above on 2026-11-13. No replica IDs were added or dropped —
the same 30 IDs are covered.
