# archive

Replicas retired from the active dataset on 2026-11-19 by the v2.0 slot-reduction
amendment (`Websites/MODEL_ALLOCATION.md` §2.0). **Nothing here was deleted and
nothing here is broken** — these are complete, QC'd replicas that were removed to
give a balanced per-category allocation.

## What happened

The dataset went from 10 replicas per category (3 Claude / 3 Codex / 4
open-weight) to 6 (2 / 2 / 2). Former slots **03, 06, 08 and 09** were retired
across all ten built categories — 40 replicas.

Retired source IDs carry an `-R` suffix (`UNI-03` → `UNI-R03`). That suffix is not
cosmetic: surviving slot 04 was renumbered to 03, so without it the historical run
records for the original `UNI-03` would be indistinguishable from those of the
renamed `UNI-04`.

## Layout

Mirrors `Websites/`, so a retired replica sits where you would expect it:

```
archive/<category>/<model-group>/<ID>-R<NN>/
```

Each directory still holds its full deliverable per `Websites/Rules.md` —
`index.html`, mapped pages, `404.html`, `css/`, `js/`, `assets/`, `README.md`,
`fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json`.

## Provenance

Register rows remain in `Websites/metadata/assignments.csv` with status `retired`
and `relative_path` pointing here. Pipeline run records, run evidence and source
inventories under `Websites/pipelines/` were rewritten to the `-R` IDs, so the
build history for each of these replicas is intact and findable.

## Note on the former slot 09

All ten Llama-3.3-70B replicas (`*-R09`) are degenerate: median `index.html` 875
bytes, median form controls 0, none meeting a 2 KB / 3 form-control threshold. The
probable cause is `max_tokens: 16000` for that slot in
`Websites/pipelines/open-source/models.json` against 32000 for every other slot,
truncating generation. Do not treat these as representative open-weight output.

## Reuse

These replicas are eligible for a future study, a held-out set, or regeneration.
If any is restored to the active dataset, restore its original slot number, drop
the `-R`, and log the change — the current 01–06 numbering assumes a 2/2/2
allocation and would have to be re-derived.
