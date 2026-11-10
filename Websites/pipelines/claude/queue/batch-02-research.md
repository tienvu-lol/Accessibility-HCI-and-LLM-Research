# Batch 02: research

**Status:** queued
**IDs:** GOV, FASH, WX, NPO, CHUR

## Before launching
The working tree is clean (`git status --short` prints nothing).

## Launch
```
subagent({ workflow: "Websites/pipelines/claude/workflow.js", cwd: "<repo root>", async: true, worktree: false, args: { phase: "research", prefixes: ["GOV", "FASH", "WX", "NPO", "CHUR"] } })
```

## After it finishes
1. Save each agent's final reply as `Websites/pipelines/claude/research/<PREFIX>.md`, minus any `acceptance-report` block (it holds local paths).
2. Spot-check one interior URL per site: `curl -sSL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" <url>`.
3. Re-run any prefix that came back UNVERIFIED or failed before a build batch uses it.
4. Commit: `[claude][research] Add <PREFIX> source inventories`.
