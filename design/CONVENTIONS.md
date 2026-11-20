# Conventions (every worker reads this; keep short)

- Spec of record: `Study/README.md`. Interfaces: `design/CONTRACTS.md`. Do not edit either.
- Touch ONLY files listed in your packet `files`. Nothing else.
- Python 3 stdlib only (no pip). JS: Node 24 CommonJS; only deps are `playwright` and `axe-core` (already installed in `Study/node_modules`). No new deps.
- Tests: Python `Study/tools/<dir>/test_<name>.py` (unittest); JS `Study/tools/<dir>/<name>.test.js` (node:test). Offline, no network, no API keys, no browser download. Use fixtures built inline or under `Study/tools/<dir>/fixtures/`.
- Read parameters from `Study/config/repair-allocation.json`; never hardcode model, temperature, max_tokens.
- Never hardcode `css/styles.css`; use `slice_files` from `Study/sample/sites.csv`.
- Small, readable code; one-line comments only for non-obvious why. No extra features.
- Finish: run your packet `checks`. Do not commit; the harness commits.
