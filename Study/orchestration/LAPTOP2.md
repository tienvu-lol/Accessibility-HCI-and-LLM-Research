# Task for the agent on laptop 2: become hackloop workers b1-b4

Goal: this laptop runs 4 hackloop workers for the orchestrator laptop. Do the steps in order; stop and report at the first failure. Details: `Study/orchestration/README.md`.

1. Get the files:
   `git fetch origin && git checkout study/hackloop-orchestration && git pull --ff-only`
   `git config core.autocrlf false`
2. Check tools exist: `git --version`, Git Bash, `node -v` (>= 22), `python --version` (>= 3.11), `claude --version` (logged in), `hackloop --version` (must match the orchestrator: 0.1.0). If `hackloop` is missing, ask the user for `hackloop.exe` and put it on PATH.
3. Deps: `cd Study; npm ci; npx playwright install chromium; cd ..`
4. Env (PowerShell, then open a new shell): `[Environment]::SetEnvironmentVariable("NODE_PATH", "$PWD\Study\node_modules", "User")`
5. `hackloop init`, then `Copy-Item Study\orchestration\worker.json .hackloop\settings\worker.json -Force`
6. `hackloop doctor`: must show no FAIL.
7. Ticket: ask the user for the `hl2:...` string from the orchestrator and save it to `.hackloop/ticket`. Never print it into shared logs.
8. Network: orchestrator listens on TCP 8765; this laptop needs outbound only. Confirm with `Test-NetConnection <orch-ip> -Port 8765`.
9. Start 4 workers, one terminal each: `hackloop worker --name b1` ... `b4`. Leave them running. `hackloop status` should list them.

Do not edit `design/`, `hackloop.toml`, `packets/`. Do not push.
