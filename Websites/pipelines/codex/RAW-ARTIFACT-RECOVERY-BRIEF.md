# Context dump: recovering raw (pre-correction) artifacts for Codex slots 04–06

Written 2026-11-17 by the orchestrator running the open-weight arm (slots 07–10). Everything below
was read off disk today; nothing is inferred. Paths are relative to `Websites/`.

## 1. What the project lead wants

The delivered replica at `<category>/codex/<ID>/` should be the generating model's **uncorrected
first emission** — accessibility defects intact — so the dataset can serve as a baseline for a later
accessibility-repair experiment. `Rules.md` §125 is the governing clause: a near-clean baseline
creates a **ceiling effect**, and defect injection / repair must live outside the generation
protocol as separately versioned materials. Rebuilding is acceptable to the project lead if that is
what it takes.

The same requirement is being applied to slots 07–10, where the open-weight pipeline already
preserves `runs/<run-id>/initial/` before any correction, so a revert is a file copy. **The Codex
arm has no such snapshot.** That is the problem to solve.

## 2. What exists on disk, verified today

- **30 delivered replicas**, 10 categories × slots 04–06: CORP, ECOM, FASH, GOV, HOSP, NEWS, PORT,
  REST, UNI, WX. **CHUR-04/05/06 and NPO-04/05/06 do not exist** (church and nonprofit unbuilt).
- **39 run directories** under `pipelines/codex/runs/`: `28 blocked`, `11 prepared` by `run.json`
  status. No run reports `completed`.
- `config.json` has **no `preserve_initial_artifact` key** and `execution.mode =
  "prepare-and-handoff"`; this pipeline prepares briefs, it does not generate.
- **No git.** The directory is not a repository, so there is no history to recover from and no
  cheap revert. There is no backup of `metadata/` either.

### Per-run evidence that does exist

| Artifact | Where | What it is |
| --- | --- | --- |
| `build-site.py` | `runs/<id>/worker-evidence/` | The **generator script** that wrote the site. Deterministic Python, ~28 KB for NEWS-05. |
| `worker-evidence/` | 39 runs (varies) | Pre-correction evidence bundle: generator, static checker, correction log, hashes, handoff. |
| `worker-evidence-after-repair/` | **only 6 runs** | Post-correction copy of the same bundle. Runs: UNI-05, UNI-06, NEWS-05, NEWS-06, FASH-04, FASH-05. |
| `correction-log.json` | **only 2 runs** have a parseable one | Timestamped list of what was changed and why. |
| `final-artifact-sha256.json` | per run | Per-file SHA-256 of the delivered site. |
| `delivery.zip` | per run | Archive of the delivered site. For NEWS-05 its mtime (16:21) is **after** the correction timestamp (16:19), so it is the **post**-correction state. |
| `qc-<timestamp>.log` | per run | Shared QC output. |

## 3. The finding that should shape the plan

**The shared QC never successfully executed in this arm, so almost no QC-driven correction happened.**

- Across all `run.json` files: **31 recorded QC runs, every one `exit_code: 2, passed: false`**, and
  **12 runs with no QC record at all**.
- NEWS-05's correction log states the reason verbatim: `"browser launch permission denied;
  not-tested"`.
- Only **2 runs** have a parseable correction log. The corrections recorded there are:
  - `documentation-only` — "Record actual checks and blocked browser scope; **implementation
    unchanged**" (README.md, generation-metadata.json, component-inventory.json).
  - `same-worker coordinator-prompted correction` (NEWS-05).
  - NEWS-06: "Static audit found menu dialog inner navigation lacked expli…" and "Coordinator
    requested both metadata attributes on every mean…" — these **do** change markup and are
    accessibility-relevant.
- For NEWS-05, the live site still matches `final-artifact-sha256.json` exactly (18 files checked,
  0 differ), so delivered sites have not drifted since.

**CORRECTION (appended 2026-11-17, after a harder check — the paragraph that stood here claimed the
replicas were "probably already raw", and the evidence does not support that):**

- **NEWS-05 was corrected in its markup.** Its pre- and post-correction `final-artifact-sha256.json`
  differ on 8 files: `README.md`, `article.html`, `component-inventory.json`, `fidelity-notes.md`,
  `generation-metadata.json`, `index.html`, `js/main.js`, `politics.html`. Its correction log
  describes the first correction as `documentation-only` with "implementation unchanged", which
  **contradicts the hashes**. Treat that log as unreliable.
- **The evidence needed to check the rest barely exists.** Of 29 build runs:
  `delivery.zip` in 27, `worker-evidence/` in 21, `worker-evidence-after-repair/` in **6**,
  `worker-evidence/build-site.py` in **2**, `final-artifact-sha256.json` in **2**,
  `correction-log.json` in **2**. The two recovery levers described below therefore exist for 2 runs,
  not for the arm.
- **QC never ran** (31 recorded QC runs, all `exit_code: 2`), so there was no QC-driven repair loop.
  But the NEWS-05 and NEWS-06 corrections were *coordinator-prompted* and needed no QC, so "QC never
  ran" does not imply "nothing was corrected".

**Working conclusion:** at least the 6 runs with an after-repair bundle were corrected. For the
remaining ~24 replicas, rawness is **unverifiable from what is stored** — absence of a correction
bundle may mean no correction, or may mean the bundle was never captured, and `delivery.zip`
postdates correction where both exist. Establishing rawness for those will require either a
reproducible regeneration path or a decision to rebuild. Do not report them as raw without one.

Contrast with the open-weight arm, where QC did run: first-pass QC reported 26–421 failures per
replica and the repair rounds drove most to 0. If Codex's sites had been through that, they would be
clean. They are not, which is consistent with QC never running.

## 4. Questions to answer before changing anything

1. **Per replica, was the delivered artifact corrected at all?** The six runs with
   `worker-evidence-after-repair/` are the candidates. For the other 24, is there any evidence of
   post-generation editing? Compare `final-artifact-sha256.json` against the live site, and against
   `delivery.zip`, for all 30.
2. **Is `build-site.py` deterministic and still runnable?** For NEWS-05 the pre- and post-repair
   copies are **byte-identical**, which means corrections were applied to the *output*, not the
   generator. If so, re-running the preserved generator reproduces the pre-correction site exactly,
   and raw artifacts are recoverable **without any model call**. Verify by re-running it into a
   scratch directory and diffing against the live site — do not write into the replica path.
3. **For the corrected runs, what exactly changed?** NEWS-06's two implementation corrections are
   named in its log. Can the specific markup change be identified and reverted surgically, rather
   than rebuilding the replica?
4. **Does any correction predate the artifact hash record?** If `final-artifact-sha256.json` in
   `worker-evidence/` (pre) differs from the one in `worker-evidence-after-repair/` (post), the diff
   names every file the correction touched. That is the cheapest possible answer for those 6 runs.
5. **If a rebuild is genuinely required**, what model and runtime get declared? `config.json` ships
   model ID/version/runtime as null by design, and the README forbids inventing them. A rebuild
   changes model attribution unless the original declaration is recoverable from the run snapshots —
   and a replica rebuilt with a different model is **not comparable** to the one it replaces.

## 5. Constraints that apply to any fix

- **No commits, pushes, publication, or merges.** Nothing in this project does that.
- **Never overwrite a replica in place without preserving the old one first.** Regeneration is a
  recorded decision; move the existing directory and log it in `metadata/change-log.md`.
- **Do not touch another group's files.** Slots 01–03 (Claude) and 07–10 (open-weight) are out of
  scope. Claude's arm has *no* run records and no raw snapshots at all, so it cannot be reverted by
  any means currently on disk — that asymmetry is a known, separate problem.
- **Disclose every orchestrator-authored change** in `human_edits` in the replica's
  `generation-metadata.json`, and record metadata corrections in a dated corrections file. The
  open-weight arm's convention is `research/proposals/CORRECTIONS-<date>*.json`.
- **If the gates in `validation_summary` no longer describe what is on disk, set them to
  `not-tested`** rather than leaving a passing gate from a run that does not describe the artifact.
  Note that this arm's gates may already be wrong in the other direction: QC exited 2 everywhere, so
  no `accessibility` gate in this arm should read `pass`.
- Codex's QC blocker was **browser launch permission denied**. If QC is to run now, that has to be
  fixed first, and a QC run that cannot execute must be recorded as unavailable with gates
  `not-tested` — never as `failures=0`.

## 6. Suggested order of work

1. Build an inventory: for each of the 30 replicas, compare live files against
   `final-artifact-sha256.json` (pre and post copies where both exist) and against `delivery.zip`.
   Output a table: replica, corrected yes/no, which files, correction type.
2. For the 24 with no correction evidence: **declare them already raw**, record that finding, and
   change nothing on disk.
3. For the 6 with an after-repair bundle: diff the two hash files to get the exact file list, then
   decide per file between surgical revert and regeneration from the preserved `build-site.py`.
4. Only if 2 and 3 fail: rebuild, with the model declaration question (4.5) answered first.
5. Record the outcome in `metadata/change-log.md` and state plainly, per replica, whether the
   delivered artifact is the model's first emission.

## 7. Cross-arm context the project lead is tracking

- **Open-weight arm (slots 07–10):** 4 models — 07 Qwen3.6-35B-A3B (Apache-2.0), 08 Nemotron-3-Super-120B
  (NVIDIA Open Model License), 09 Llama-3.3-70B (Llama 3.3 Community License), 10 gpt-oss-120b
  (Apache-2.0). The arm is now described as **open-weight**, not open-source, because 08 and 09 are
  not OSI-approved; the machine identifier `open-source` is unchanged in paths and CSVs. Research is
  complete for all four slots; builds are in progress; a revert-to-raw script exists and is **paused**
  at the project lead's instruction until all builds finish.
- **Church and nonprofit builds are under an indefinite hold** for slots 07–10 (8 queue tasks marked
  `blocked` with a hold record). Codex's CHUR/NPO slots are simply unbuilt.
- Known model defects in Phase A metadata, likely relevant to any arm: fabricated `verified_at`
  dates (every slot did this; slot 09 wrote `2024-09-16` almost everywhere), empty required fields,
  non-permitted enum values, and nested page-map filenames. All corrected and disclosed.

## 8. Two findings from a partial test of the generator route (2026-11-17)

**The declared model is recoverable.** `runs/<id>/build-context.json` is written by `build-site.py`
itself and records the attribution. NEWS-05's says:

```
"model_id": "gpt-6.1-sol", "model_version": null,
"attribution": "Declared OpenAI collaboration worker model from task/session; no separate
                authenticated release string available"
```

That answers question 4.5 for any run whose generator or build-context survives: a rebuild can
declare the same model instead of inventing one. Check each run for `build-context.json` before
concluding attribution is lost.

**The generator runs, with one edit.** `build-site.py` hardcodes the original sandbox root
(`Path('/private/tmp/codex-news-05-a9usxzke/repository/Websites')`), which no longer exists. Replace
that one line with a scratch root and it executes under `python3 -I` with no network, no subprocess
and no deletions — it only writes under `<root>/news/codex/NEWS-05` and the run directory. A test run
reported `Generated 17 entries` and wrote 14 files into a scratch tree.

**Not yet verified:** whether those regenerated files hash-match
`worker-evidence/final-artifact-sha256.json` (the pre-correction record). The delivered site has 18
files and the scratch run produced 14, so the counts differ and the comparison matters. Expect
timestamped documentation files (`generation-metadata.json`, `build-context.json`) never to match,
since the script stamps `datetime.now()`; the HTML, CSS, JS and SVG files are the ones that should.
Do this comparison before trusting the generator route for any replica.
