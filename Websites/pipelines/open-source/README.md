# Open-source pipeline — slots 07–10

Forty-eight replicas: four slots in each of the twelve categories (university, healthcare, company, e-commerce, news, government, fashion, weather, nonprofit, church, portfolio, restaurant). Claude holds slots 01–03, Codex 04–06, this group 07–10, which is the 40% share in `MODEL_ALLOCATION.md` §2.

This is the only one of the three pipelines that **executes**. Claude's runs through pi-subagents; Codex's prepares a brief and hands it to a session. This one calls open-weight models over an OpenAI-compatible API, writes the files they emit, runs the shared QC against the result, and records what actually happened. You supply one API key per slot in the environment; the orchestrator drives the rest.

## What runs where

| | Research (Phase A) | Build (Phase B) |
|---|---|---|
| Who chooses sources | one declared model, for all four slots | fixed: the approved row |
| Who fetches the web | the orchestrator (`verify-sources.mjs`) | nobody; the agent gets the recorded evidence |
| Who writes files | the orchestrator, into `research/` | the orchestrator, into `<category>/open-source/<ID>/` only |
| Who runs QC | nobody | the orchestrator (`tools/qc/qc.js`) |
| What the model has | no browser, no shell, no filesystem | the same, plus the file protocol |

The agents cannot verify a site, run code or test anything, so they are told not to claim they did. Every verification claim in the dataset traces to an HTTP record in `research/evidence/`, and every QC claim to a report in `runs/`.

## Four models, one per slot

`MODEL_ALLOCATION.md` §2 allows one or several open-source models across the four slots but requires the mapping to be declared before generation, not assumed. Declare each slot:

```sh
node Websites/pipelines/open-source/scripts/declare-models.mjs --slot 7 \
  --model-id "org/Model-Name" \
  --weights-url https://huggingface.co/org/Model-Name \
  --license apache-2.0 \
  --provider together \
  --base-url https://api.together.xyz/v1 \
  --key-env OS_SLOT_07_API_KEY \
  --eligibility-note "open weights under apache-2.0, confirmed 2026-11-13 by <person>" \
  --declared-by "<project lead>"
```

That writes `models.json`, which is provenance and belongs in git. **`--key-env` takes the name of an environment variable, never a key.** The keys stay in your shell:

```sh
export OS_SLOT_07_API_KEY=...   # and 08, 09, 10
node Websites/pipelines/open-source/scripts/declare-models.mjs --show
```

Any host that exposes `POST {base_url}/chat/completions` works — Together, Fireworks, Groq, DeepInfra, OpenRouter, Hyperbolic, Nebius, or a local vLLM, llama.cpp or Ollama server. `open_weights` is recorded from your eligibility note; no script can verify a licence, and `Rules.md` does not treat open-source and open-weight as interchangeable, so write what you actually checked.

Validation refuses placeholder values, a non-open-weight declaration, a key pasted where a variable name belongs, and a missing environment variable at build time. It prints a note, not an error, when the four slots do not use four distinct models — that is allowed, as long as it is declared.

A **partial declaration is allowed**, so a single-slot test run needs only that slot's model and key. Commands check the slots they actually use: researching slot 07 needs slot 07 declared, and building `UNI-07` needs slot 07 declared, each with a note about the rest. `validate.mjs --models` is the full pre-generation check and wants all four.

## Running it

Everything runs from the repository root with a bare Node 20+ runtime. No install is needed for the pipeline itself; only the shared QC has dependencies.

```sh
node Websites/pipelines/open-source/scripts/validate.mjs                 # config, allocation, register
node Websites/pipelines/open-source/scripts/validate.mjs --models        # plus the model declaration
node --test Websites/pipelines/open-source/tests/pipeline.test.mjs       # 21 tests, no network, no API
```

### 1. Research one category

```sh
node Websites/pipelines/open-source/scripts/run-research.mjs UNI --dry-run   # see the prompt first
node Websites/pipelines/open-source/scripts/run-research.mjs UNI             # all four slots
node Websites/pipelines/open-source/scripts/run-research.mjs UNI --slot 7    # one slot only
```

`--slot` takes one slot or a comma list, for a test run or to redo a single slot. A partial run writes its notes to `research/<PREFIX>-<slots>.md`, merges its rows into the one `research/proposals/<PREFIX>-rows.json` by source ID, and leaves the category's queue task `prepared` with the slots done so far rather than `completed`. During a partial run the category's other open-source references are treated as reserved, exactly like Claude's and Codex's, so a later run cannot pick a site this one used. `--model-slot` chooses which declared model does the research; it defaults to the lowest slot in the run.

Three exchanges with real fetches in between: the model proposes three candidates per slot; the orchestrator fetches them and reports status, title, redirects and navigation links; the model picks one site per slot and names the interior pages it wants; those are fetched too; then it writes the Phase A blocks and the four proposed inventory rows. Candidates that another group already holds are listed in the prompt as off limits, read from the shared inventory.

Output: `research/UNI.md`, `research/evidence/UNI-http-<date>.json`, `research/proposals/UNI-rows.json`. All proposals — nothing is approved and the central register is untouched.

### 2. Coordinate and approve

```sh
node .../sync-register.mjs rows UNI
node .../sync-register.mjs approve UNI --approved-by "<project lead>" \
  --approval-reference "<where the decision is recorded>"
```

`rows` copies this group's four rows into `metadata/source-inventories/university.csv` with the approval cells still empty. `approve` fills them and synchronizes source URL, model ID and approval date into `metadata/assignments.csv`. Both edit only slots 07–10; every other record keeps its exact bytes. Review `research/UNI.md` before approving — the approval is a real decision about real sources, and Claude's Phase A waiver does not transfer here.

### 3. Build one replica

```sh
node .../validate.mjs --ready UNI-07
node .../run-build.mjs UNI-07 --operator "<your name>"
```

Readiness is scoped to this group: the four open-source rows of that category must be complete, verified, approved and synchronized, with no URL duplicating any other row in the category, and the slot's declared model must match the approved assignment with its key present. Incomplete Claude or Codex rows do not block it (`MODEL_ALLOCATION.md` §4).

Then the build runs: a plan turn, then file turns until the model says it is done and every required file exists, bounded by `max_build_turns`. Files are written only inside `<category>/open-source/<ID>/`, limited to the site root and `css/`, `js/`, `assets/`, `data/`, to the allowed extensions, and screened for remote CDNs, frameworks, npm requires, bad JSON and oversized files. A rejected file is reported back to the model with the reason; it is never written.

After delivery the raw output is copied to `runs/<run-id>/initial/` before anything else touches it, so the study keeps the uncorrected artifact. Then the shared QC runs, and up to `max_repair_rounds` correction rounds follow, each with its own QC report. Finally the orchestrator normalizes `generation-metadata.json` — identifiers, model attribution, approval, revisions, real timestamps — and sets the seven validation gates from the QC run that actually executed, disclosing that edit in `human_edits`.

```sh
node .../record-qc.mjs UNI-07 --run <RUN-ID>       # re-run QC on its own
node .../sync-register.mjs delivered UNI-07 --run <RUN-ID>
node .../sync-register.mjs log --message "what happened"
```

## Files

| Path | Purpose |
|---|---|
| `config.json` | Allocation, paths, approval policy, execution and API limits |
| `models.json` | The declared slot-to-model mapping; env var names only, never keys |
| `categories.json` | Twelve categories, ten slot strata each, page types, interactions, simulation limits |
| `schemas/` | Strict schemas for both config files, checked without dependencies |
| `prompts/` | `system.md`, `research.md`, `build.md`, `repair.md` — authored for this group |
| `scripts/lib.mjs` | CSV, schema checks, path containment, readiness, redaction, register edits |
| `scripts/provider.mjs` | OpenAI-compatible client, retries, token accounting, redacted transcripts |
| `scripts/fileproto.mjs` | The file-emission protocol: parser, path and content guards, bounded writer |
| `scripts/verify-sources.mjs` | Real HTTP verification with robots.txt respected |
| `scripts/qc-runner.mjs` | Runs the shared QC and maps it to the seven gates |
| `queue/manifest.json` | Twelve research and forty-eight build tasks with dependencies |
| `runs/<run-id>/` | Task, run record, snapshots, transcript, initial artifact, QC reports |
| `tests/` | 23 tests over a synthetic fixture and a local mock endpoint |

## What this pipeline will not do

- No commits, pushes, publication or merges, ever.
- No approval it was not explicitly given, and no inheritance of another group's waiver.
- No `failures=0` from a QC run that did not execute: a crashed or browser-less run is recorded as unavailable, and the gates stay `not-tested`.
- No overwriting an existing replica. Regenerating is a recorded decision: move the old one first.
- No writing outside the one slot directory of the one replica being built.
- No key in any file, log, transcript or run record; anything matching a known key shape or a secret-looking environment value is redacted before it reaches disk.
- No acceptance. A completed run with a clean QC report is `submitted`. A human reviewer decides the rest, and interaction review, screen-reader testing, zoom and visual fidelity remain outside this script.

## Honest limits

The agents work from HTTP-fetched markup, so a replica mirrors the reference's *markup* structure, not its rendered appearance; nothing in this arm has seen a reference site rendered. The QC tool scans each page's initial state at 1280px and 375px with axe-core — it does not exercise menus, filters, forms, dialogs or keyboard flows, so `interaction` stays `not-tested` until someone reviews them. A QC pass is recorded as `accessibility: partial`, never as conformance.

Because each model group gets different reference sites, outcome differences may reflect reference difficulty rather than model capability (`MODEL_ALLOCATION.md` §7). This arm adds two more sources of variance worth recording in any analysis: the four slots may use four different models, and generation here is a multi-turn file-emission loop with a bounded correction stage, which is not the same harness as Claude's agent runs or Codex's session. Keep the run records — turns used, tokens, retries, rejected files, repair rounds — with the results.
