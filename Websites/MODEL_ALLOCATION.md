# MODEL_ALLOCATION.md — Multi-Model Generation and GitHub Organization

**Protocol ID:** WEB-REPLICA-ALLOCATION-V1.0  
**Companion to:** `RULES.md` (WEB-REPLICA-V1.0)  
**Purpose:** Allocate the 10 replicas in each website category across model groups, preserve model provenance, and enforce a consistent, auditable GitHub repository layout.

## 1. Authority and scope

This document **supplements, but does not replace, `RULES.md`**. All website-generation tasks must comply with its source verification and approval gate, implementation restrictions, accessibility baseline, HTML instrumentation, required artifacts, quality-control checks, and one-replica-per-delivery workflow. If an allocation or repository convention conflicts with `RULES.md`, stop and escalate the conflict rather than silently relaxing either document.

The allocation is **per category**, not an overall quota across the dataset. The full dataset target for every category is **10 distinct approved reference websites and 10 corresponding replicas**.

### Active allocation

A category's **active allocation** is the subset of its 10 slots whose model group has an operating generation pipeline. Slots outside it stay registered in `metadata/assignments.csv` with status `planned`; they are deferred, not cancelled, and are not dropped from the dataset design.

As of 2026-11-13 the active allocation is **all ten slots** (Claude 01–03, Codex 04–06, open-source 07–10). Slots 07–10 were deferred from 2026-11-12 while no open-source pipeline existed; that pipeline now exists at `pipelines/open-source/`, so they are restored to the active allocation under the clause below rather than by a protocol amendment. Authorized by Samhith Varma on behalf of the project team; see `metadata/change-log.md`.

Restoring slots to the active allocation does not approve any source or confer any waiver. Each group still passes its own approval gate over its own slots, and replicas built earlier under the reduced active allocation keep the record that they were generated at a different time, as required below.

A category is **deliverable at its active scope** when every slot in its active allocation is approved. Replicas built under a reduced active allocation must record that fact, because slots activated later are generated at a different time and under a possibly later protocol revision.

## 2. Mandatory generation allocation

| Model group | Replicas per category | Assigned slots | Share |
| --- | ---: | --- | ---: |
| Claude | 3 | 01–03 | 30% |
| Codex | 3 | 04–06 | 30% |
| Open-source models | 4 | 07–10 | 40% |
| **Total** | **10** | **01–10** | **100%** |

- **Claude** means generation performed by an explicitly recorded Claude model/version.
- **Codex** means generation performed by an explicitly recorded Codex model/version or coding-agent configuration; log the actual underlying model if identifiable.
- **Open-source** is an allocation group, **not one specific model**. Record the exact model, release/commit, and serving environment for each of the four slots. Confirm the selected model qualifies under the study's documented open-source/open-weight definition; these terms are not automatically interchangeable.
- The four open-source replicas **may use one or multiple eligible models**. The project lead must declare the precise model-to-slot mapping before generation; do not silently assume four different models.
- Model assignment is fixed when the Phase A source inventory is approved. Changes must be logged, with the original and replacement model, reason, date, and approval.

### Example assignment for any one category

| Slot | Stable reference ID (example) | Model group |
| --- | --- | --- |
| 01 | REST-01 | Claude |
| 02 | REST-02 | Claude |
| 03 | REST-03 | Claude |
| 04 | REST-04 | Codex |
| 05 | REST-05 | Codex |
| 06 | REST-06 | Codex |
| 07 | REST-07 | Open-source |
| 08 | REST-08 | Open-source |
| 09 | REST-09 | Open-source |
| 10 | REST-10 | Open-source |

Use each category's actual approved `source_id` prefix; `REST` is illustrative. Do not duplicate one reference site merely to fill a quota.

## 3. Required GitHub repository structure

Repository paths must group replicas **first by category, then by model group, then by the stable source ID**. This adds a model-group layer to the `<category>/<source_id>/` convention in `RULES.md` without changing the required contents of each individual replica folder.

```text
repository-root/
├── RULES.md
├── MODEL_ALLOCATION.md
├── README.md
├── metadata/
│   ├── assignments.csv
│   ├── source-inventories/
│   │   ├── restaurant.csv
│   │   └── ...
│   └── change-log.md
├── restaurant/
│   ├── claude/
│   │   ├── REST-01/
│   │   ├── REST-02/
│   │   └── REST-03/
│   ├── codex/
│   │   ├── REST-04/
│   │   ├── REST-05/
│   │   └── REST-06/
│   └── open-source/
│       ├── REST-07/
│       ├── REST-08/
│       ├── REST-09/
│       └── REST-10/
├── university/
│   ├── claude/
│   ├── codex/
│   └── open-source/
└── ...other-categories/
```

**Every leaf directory** (for example, `restaurant/claude/REST-01/`) must have the full independent-site deliverable required by `RULES.md`:

```text
REST-01/
├── index.html
├── ...approved-reference-mapped-pages.html
├── 404.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── ...local-assets
├── README.md
├── fidelity-notes.md
├── component-inventory.json
└── generation-metadata.json
```

`generation-metadata.json` is an **additional required artifact** under this companion protocol. Never replace or omit the three documentation artifacts required by `RULES.md`.

**Naming rules:** Directory names are lowercase kebab-case; model-group directory names must be exactly `claude`, `codex`, or `open-source`. Preserve stable source IDs even if a replica is moved or regenerated. Do not use personal names, model nicknames, or unversioned model names as substitutes for source IDs. No shared CSS/JS dependencies between individual replicas: each site must remain independently runnable.

## 4. Source selection and approval workflow

1. **Phase A:** Assemble and verify the 10 unique references per category following `RULES.md`. Include the model-group assignment and intended precise model/version (or explicitly mark `TBD`, which must be resolved before Phase B) in the approval inventory.
2. **Approval gate:** Obtain approval for the references and representative page scope of the category's **active allocation**, and for the slot assignment of each active group. Approval is granted per model group over its own slots: a group may proceed once its own slots are approved and need not wait for a group whose pipeline does not yet exist. Deferred slots require no approval while inactive. Stop before code generation.
3. **Phase B:** Deliver one approved replica at a time. The assigned model must produce the site under its designated directory using the same baseline protocol and category prompt.
4. **Record provenance:** Fill in `generation-metadata.json` and update the central assignment register when the replica is delivered.
5. **Validate:** Apply all `RULES.md` QC checks, report pass/fail/not-tested truthfully, and do not treat the existence of a file or an LLM's claim as evidence that testing occurred.
6. **Review:** A human reviewer checks folder placement, assignment counts, metadata, and all required per-site artifacts before accepting a pull request.

Do **not** let one model create three sites in a single Phase B response: `RULES.md` specifies one complete replica per delivery. Separate deliveries may be combined in a later Git commit or pull request if provenance remains clear.

## 5. Central assignment register

Maintain `metadata/assignments.csv` as the single index covering **every category and all 10 slots**. Use one row per replica and at least these columns:

```csv
category,slot,source_id,source_name,source_url,model_group,model_id,model_version,status,approved_at,generated_at,relative_path,reviewer,notes
restaurant,01,REST-01,,,,claude,,,planned,,,restaurant/claude/REST-01,,
```

The example row is a **placeholder**, not an approved or verified source. Suggested status vocabulary: `planned`, `researching`, `awaiting-approval`, `approved`, `generating`, `submitted`, `accepted`, `blocked`. Use ISO 8601 timestamps when known; leave unknown values blank rather than inventing them.

For each category, the register must show **exactly three** Claude rows, **three** Codex rows, and **four** open-source rows. No duplicate `source_id` in the same category; no missing slot; every `relative_path` must agree with its category and model group.

## 6. Per-replica provenance requirements

Each replica must include `generation-metadata.json` with the following fields (example values are placeholders):

```json
{
  "allocation_protocol": "WEB-REPLICA-ALLOCATION-V1.0",
  "generation_protocol": "WEB-REPLICA-V1.0",
  "category": "restaurant",
  "slot": 1,
  "source_id": "REST-01",
  "model_group": "claude",
  "model_id": null,
  "model_version": null,
  "model_provider_or_runtime": null,
  "generation_mode": null,
  "operator": null,
  "approved_source_url": null,
  "source_verified_at": null,
  "source_approved_at": null,
  "generation_started_at": null,
  "generation_completed_at": null,
  "rules_revision": null,
  "category_prompt_revision": null,
  "prompt_or_transcript_reference": null,
  "human_edits": [],
  "validation_summary": {
    "technology": "not-tested",
    "completeness": "not-tested",
    "structure": "not-tested",
    "interaction": "not-tested",
    "accessibility": "not-tested",
    "traceability": "not-tested",
    "scope": "not-tested"
  }
}
```

Fill values using actual recorded evidence, including the Git commit/revision or other durable prompt reference where possible. `null` means unknown/not yet recorded; it is not approval to deliver a completed replica with missing critical model/source attribution. If a model required manual completion, another model was used, or substantive human edits were made, disclose them. Do not mislabel mixed-model work as single-model generation.

## 7. Fairness and experimental controls

- Give every assigned generation model the **same `RULES.md` revision**, the same applicable category-level instructions, and comparable task boundaries and approval information.
- Record differences in tool access, web browsing, context limits, generation budgets, retries, and human intervention; these can affect output quality and accessibility results.
- Preserve raw generation outputs or reproducible prompt/transcript references where permitted, and distinguish unmodified outputs from human-corrected versions.
- **Design limitation:** Because each model group receives different source websites, differences in accessibility or fidelity outcomes may reflect **reference-site difficulty**, not only the generation model. Keep source complexity/stratum in the inventory and consider a matched or repeated-source comparison if the research aims to infer causal model-performance differences. Do not claim that 3/3/4 allocation alone guarantees a controlled model comparison.
- The baseline accessibility target, defects policy, and evaluation protocol remain those in `RULES.md`; do not inject or repair undocumented defects to favor any group.

## 8. GitHub contribution and acceptance rules

- Place files only under the assigned `category/model-group/source_id/` path; preserve the complete per-site directory structure.
- Use a dedicated branch or clearly scoped pull request per replica when practical. Suggested PR title: `[restaurant][claude][REST-01] Add approved replica`.
- In the PR description, identify the source ID, model group and exact model/version, reference approval, prompt/rules revision, tests actually performed, known limitations, and any manual or cross-model edits.
- Do not merge a replica if its source lacks approval, its attribution is unclear, required files are missing, relative paths are broken, or reported QC results lack evidence.
- Update `metadata/assignments.csv` and `metadata/change-log.md` whenever assignments, source choices, models, or final locations change.

## 9. Per-category completion checklist

A category is complete only when:

- [ ] Exactly 10 distinct approved references have stable source IDs.
- [ ] Exactly 3 complete replicas are under `claude/`.
- [ ] Exactly 3 complete replicas are under `codex/`.
- [ ] Exactly 4 complete replicas are under `open-source/`.
- [ ] All 10 replicas contain the `RULES.md` deliverables plus `generation-metadata.json`.
- [ ] Central assignment rows and site paths match the GitHub tree.
- [ ] Each model/version, verification record, approval, deviations, and validation status is documented.
- [ ] Human review has checked the allocation and traceability requirements.

**Final rule:** Do not start a new category or mark the current category complete merely because 10 folders exist. The 3/3/4 assignment, independent working sites, approved source inventory, documentation, and QC records must all be verified.
