# Orchestration: hackloop, 1 orchestrator + 8 workers (2 laptops x 4)

Spec of record: `Study/README.md`. Build order S0-S5 (+ S7 analysis skeleton). S0 is done; S1-S5, S7 are 14 packets in `/packets`.

## Status vs `Study/README.md` section 11
| Step | State |
|---|---|
| S0 config, prompts, criteria, sites.csv, human_items.csv, baselines (60) | done (on main) |
| S0 open: A3/A4 model ids, A5/A6 serving, provider TBD in repair-allocation.json | human decision |
| S1 runner (r1,r2,r3) | packets ready |
| S2 scorer (s1-s4) | packets ready |
| S3 baseline score + 45-min probe verification (s5 + human) | s5 packet; run + manual verify are human/orch |
| S4 judge (j1,j2) | packets ready |
| S5 rating harness + rubric (h1,h2) | packets ready |
| S7 analysis (a1,a2) | packets ready (built early vs synthetic data) |
| S6 run (generation/scoring/judge) | after API keys; not hackloop work |

## Packet design (token-efficient)
Contract-first: `design/CONTRACTS.md` fixes every interface, so all 14 packets are independent (hackloop has no depends_on). Disjoint `files`, short goals, `plan_quotes` point at spec sections instead of pasting them. Workers: sonnet, 30 turns, $1.5 cap, 2 attempts, 2 reviews.

## Roster
| Machine | Workers |
|---|---|
| Orchestrator laptop | `hackloop orch` + workers `o1 o2 o3 o4` |
| Laptop 2 | workers `b1 b2 b3 b4` |
Hackloop leases packets dynamically; no pinning. Enqueue order = priority (critical path first): r3-runner s4-score j2-judge r1-guards r2-providers s1-axe s2-tab s3-axtree j1-blind h1-harness a1-kappa a2-stats s5-ceiling h2-rubric.

## Setup, every laptop (once)
1. `git clone`/pull the branch carrying `hackloop.toml`, `design/`, `Study/`; set `git config core.autocrlf false`.
2. Install: Git (with Git Bash), Node >= 22, Python >= 3.11, Claude Code CLI logged in (`claude --version`), `hackloop.exe` on PATH (same version as orchestrator).
3. `cd Study && npm ci && npx playwright install chromium`.
4. User env var `NODE_PATH` = absolute path of `<repo>\Study\node_modules` (worktrees resolve deps through it). Restart shell.
5. `hackloop init` then copy `Study/orchestration/worker.json` over `.hackloop/settings/worker.json` (`.hackloop/` is gitignored; this allow-list adds node/python test commands).
6. Run `hackloop doctor`: expect no FAIL.

## Network (hackloop never changes firewall)
- Orchestrator, elevated PowerShell: `New-NetFirewallRule -DisplayName 'hackloop' -Direction Inbound -Protocol TCP -LocalPort 8765 -RemoteAddress <laptop2 subnet>/24 -Action Allow -Profile Private,Public`.
- Laptop 2 needs only outbound TCP 8765. If Wi-Fi isolates clients (eduroam), use a cable and `hackloop orch --listen 192.168.77.1`.
- Copy `<repo>/.hackloop/ticket` (hl2:...) from orchestrator to laptop 2 (same path, or pass `--ticket-file`).

## Run
Orchestrator:
```
hackloop orch --repo .
for f in r3-runner s4-score j2-judge r1-guards r2-providers s1-axe s2-tab s3-axtree j1-blind h1-harness a1-kappa a2-stats s5-ceiling h2-rubric; do hackloop packet add packets/$f.json; done
hackloop worker --name o1   # repeat o2..o4, one terminal each
hackloop status --watch
```
Laptop 2: `hackloop worker --name b1` ... `b4` (ticket file in place).
Stop: `hackloop stop`; resume: `hackloop resume`; morning: `hackloop report`.
