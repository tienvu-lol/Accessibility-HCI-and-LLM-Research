# Batch 07: build

**Status:** done 2026-11-11 (resumed after a rate-limit interruption)
**IDs:** FASH-03, WX-01, WX-02, WX-03, NPO-01

## Before launching
`Websites/pipelines/claude/research/<PREFIX>.md` exists for every prefix in this batch, and the working tree is clean: worktree-isolated agents need a clean checkout.

## Launch
```
subagent({ workflow: "Websites/pipelines/claude/workflow.js", cwd: "<repo root>", async: true, worktree: true, args: { phase: "build", prefixes: ["FASH-03", "WX-01", "WX-02", "WX-03", "NPO-01"] } })
```

## After it finishes
1. Each agent's handoff manifest (in its `artifactPaths`) holds a patch. Apply it with `git apply`; it should touch only `Websites/<category>/claude/<ID>/`.
2. Re-run QC yourself instead of trusting the agent's report: `node Websites/tools/qc/qc.js Websites/<category>/claude/<ID>` must print `failures=0`.
3. If QC fails, resume that agent with the QC output. Don't fix it by hand: `MODEL_ALLOCATION.md` §6 requires disclosing human edits.
4. Fill the site's row in `Websites/metadata/assignments.csv`: source_name, source_url, status `submitted`, approved_at `2026-11-10`, generated_at.
5. Commit one replica per commit: `[<category>][claude][<ID>] Add replica`.
