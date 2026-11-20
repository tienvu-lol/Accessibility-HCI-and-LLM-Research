# Websites: replica dataset

Static replicas of real websites, built as accessibility and usability test sites. Every category has 6 replicas, split by model group (`MODEL_ALLOCATION.md` §2):

| Slots | Model group | Directory |
|---|---|---|
| 01–02 | Claude | `<category>/claude/` |
| 03–04 | Codex | `<category>/codex/` |
| 05–06 | Open-weight | `<category>/open-source/` |

**Amended 2026-11-19 (v2.0).** The dataset was reduced from 10 to 6 replicas per
category. The former slots 03, 06, 08 and 09 were retired across every category,
their source IDs suffixed `-R`, and the replicas moved to `archive/` at the
repository root. Surviving slots were renumbered 01–06 and every reference was
rewritten. See `metadata/change-log.md` and `archive/README.md`.

Read `Rules.md` (generation protocol) and `MODEL_ALLOCATION.md` (allocation and provenance) before generating anything. They govern every model group.

## Layout

```
Websites/
├── Rules.md, MODEL_ALLOCATION.md    the two protocols
├── metadata/
│   ├── assignments.csv              one row per slot: 6 active + 4 retired per category
│   ├── change-log.md                assignment, source and model changes
│   └── source-inventories/          approved references, per category
├── <category>/<model-group>/<ID>/   one independent site per slot
├── pipelines/<model-group>/         how each model group generates its slots
└── tools/                           shared by every model group
    ├── qc/                          QC every replica must pass
    └── previewer/                   bundles all replicas into ReplicaPreview.exe
```

Active study categories (10): university, healthcare, company, e-commerce, news, government, fashion, weather, nonprofit, church.

Two further categories are registered in `metadata/assignments.csv`, giving twelve in total. **Portfolio** follows this layout at `portfolio/<model-group>/<ID>/`. **Restaurant** predates the layout, lives in `restaurant/` as zips (moved from `../restaurant websites/`), and has no recorded model group. Its ten `relative_path` values in `metadata/assignments.csv` still point at the old location and are stale.

## For each model group

- Write only to your own `<category>/<your-group>/` slots and to `pipelines/<your-group>/`.
- Keep any pipeline scripts, queues and research notes in `pipelines/<your-group>/`, so groups don't read or reuse each other's prompts. `pipelines/claude/` is the Claude group's pipeline.
- Run the same QC before you submit:
  - **Setup:** `cd Websites/tools/qc && npm ci`
  - **Run:** `node Websites/tools/qc/qc.js Websites/<category>/<group>/<ID>`. It must print `failures=0`.
- Update your rows in `metadata/assignments.csv`, and add a line to `metadata/change-log.md`.

## Status

See `metadata/assignments.csv`. To browse everything that exists, run `python Websites/tools/previewer/build.py`, then `Websites/tools/previewer/dist/ReplicaPreview.exe`. This needs the .NET 10 SDK to build; the exe itself runs anywhere on Windows x64. The gallery lists every slot, including ones not generated yet.

## Open-source configuration

The open-source pipeline lives in [pipelines/open-source/README.md](pipelines/open-source/README.md). It covers slots 07–10 in all twelve categories (48 sites). Unlike the other two, it executes: it calls open-weight models over an OpenAI-compatible API, writes the files they emit into one slot directory at a time, runs the shared QC, and records real HTTP verification, transcripts, token budgets and QC reports. One API key per slot is read from the environment; keys are never stored in the repository.

The slot-to-model mapping must be declared before generation (`scripts/declare-models.mjs`), since `MODEL_ALLOCATION.md` §2 permits one or several open-source models but no assumed mapping. Setup and research confer no source approval, and the Claude group's Phase A waiver does not extend to this group.

## Codex configuration

The Codex preparation pipeline lives in [pipelines/codex/README.md](pipelines/codex/README.md). It covers slots 04–06 in all twelve categories (36 sites), with validated configuration, per-category source inventories, exact task snapshots and shared-QC evidence capture. Setup does not start generation or confer source approval. Portfolio and restaurant were added to its queue on 2026-11-13. Portfolio slots 04–06 were already delivered and their directories were renamed that day to `PORT-03`/`PORT-04`/`PORT-R06` for `MODEL_ALLOCATION.md` §5; restaurant slots 04–06 are unbuilt and unapproved. See [source inventory format](metadata/source-inventories/README.md) for coordinated reference records.
