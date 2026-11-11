# Batch 09: integrate and publish

**Status:** paused 2026-11-11. Steps 1-2 done (33/33 claude sites failures=0; register counts and 30 submitted rows checked). Resume at step 3 (source-inventory claude rows); steps 4 (push + PR, needs project-lead go-ahead) and 5 not started.

1. Run QC on all 30 Claude sites; each must print `failures=0`:
   `for d in Websites/*/claude/*/; do node Websites/tools/qc/qc.js "$d" || echo "FAIL $d"; done`
2. Check `Websites/metadata/assignments.csv`: each category has 3 claude, 3 codex and 4 open-source rows, and all 30 claude rows are `submitted` with source_url filled.
3. Write the claude rows of `Websites/metadata/source-inventories/<category>.csv` from `research/` (RULES.md §3 fields).
4. Update `Websites/metadata/change-log.md`, push, and open a PR against `main`.
5. Rebuild the previewer: `python Websites/tools/previewer/build.py`. The exe stays out of git.
