# Websites: replica dataset

Static replicas of real websites, built as accessibility and usability test sites. Every category has 10 replicas, split by model group (`MODEL_ALLOCATION.md` §2):

| Slots | Model group | Directory |
|---|---|---|
| 01–03 | Claude | `<category>/claude/` |
| 04–06 | Codex | `<category>/codex/` |
| 07–10 | Open-source | `<category>/open-source/` |

Read `Rules.md` (generation protocol) and `MODEL_ALLOCATION.md` (allocation and provenance) before generating anything. They govern every model group.

## Layout

```
Websites/
├── Rules.md, MODEL_ALLOCATION.md    the two protocols
├── metadata/
│   ├── assignments.csv              one row per slot: every category, all 10 slots
│   ├── change-log.md                assignment, source and model changes
│   └── source-inventories/          approved references, per category
├── <category>/<model-group>/<ID>/   one independent site per slot
├── pipelines/<model-group>/         how each model group generates its slots
└── tools/                           shared by every model group
    ├── qc/                          QC every replica must pass
    └── previewer/                   bundles all replicas into ReplicaPreview.exe
```

Active study categories (10): university, healthcare, company, e-commerce, news, government, fashion, weather, nonprofit, church.

Two further categories are registered in `metadata/assignments.csv`, giving twelve in total. **Portfolio** follows this layout at `portfolio/<model-group>/<ID>/`. **Restaurant** predates the layout, lives in `../restaurant websites/` as zips, and has no recorded model group.

## For each model group

- Write only to your own `<category>/<your-group>/` slots and to `pipelines/<your-group>/`.
- Keep any pipeline scripts, queues and research notes in `pipelines/<your-group>/`, so groups don't read or reuse each other's prompts. `pipelines/claude/` is the Claude group's pipeline.
- Run the same QC before you submit:
  - **Setup:** `cd Websites/tools/qc && npm ci`
  - **Run:** `node Websites/tools/qc/qc.js Websites/<category>/<group>/<ID>`. It must print `failures=0`.
- Update your rows in `metadata/assignments.csv`, and add a line to `metadata/change-log.md`.

## Status

See `metadata/assignments.csv`. To browse everything that exists, run `python Websites/tools/previewer/build.py`, then `Websites/tools/previewer/dist/ReplicaPreview.exe`. This needs the .NET 10 SDK to build; the exe itself runs anywhere on Windows x64. The gallery lists every slot, including ones not generated yet.

## Codex configuration

The Codex preparation pipeline lives in [pipelines/codex/README.md](pipelines/codex/README.md). It covers slots 04–06 in the ten active categories (30 sites), with validated configuration, per-category source inventories, exact task snapshots and shared-QC evidence capture. Setup does not start generation or confer source approval. Its 30-site scope is the ten active categories only; the portfolio and restaurant categories are registered separately and are not part of that queue, though Codex has already delivered portfolio slots 04–06. See [source inventory format](metadata/source-inventories/README.md) for coordinated reference records.
