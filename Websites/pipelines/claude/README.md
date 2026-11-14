# Claude pipeline (slots 01–03)

How the Claude model group generates its 3 replicas per category. Other model groups should keep their own pipeline in `pipelines/<group>/`.

- **Generator:** `claude-sonnet-5-5` through the `claude-bridge` provider, run as pi-subagents `worker` agents. The orchestrator session runs `claude-opus-5-5`.
- **Batches:** each batch has at most 5 agents, and batches run one after another. See `queue/README.md` for the order and status.
- **Phases:**
  1. **research:** one agent per category picks 3 references, one per stratum, and verifies them with HTTP GET via `curl`. No web-search tool is available. Results are in `research/<PREFIX>.md`.
  2. **build:** one agent per replica, each in its own git worktree, writes only `Websites/<category>/claude/<ID>/`. It must pass `Websites/tools/qc/qc.js` with `failures=0`.
- **Approval:** the project lead waived the RULES.md Phase A approval stop. It is recorded in `metadata/change-log.md` and in each replica's `generation-metadata.json`.

| File | Purpose |
|---|---|
| `workflow.js` | The pi-subagents workflow script. It holds the strata, the category hints and the exact agent briefs. |
| `queue/` | One file per batch, with the launch call and the checks to run before and after. |
| `research/` | Phase A source inventories, one per category prefix. |

| Prefix | Category | Strata (01 / 02 / 03) |
|---|---|---|
| UNI | university | large public research / small liberal-arts / community college |
| HOSP | healthcare | academic medical center / community hospital / children's hospital |
| CORP | company | national bank / regional bank or credit union / tech company |
| ECOM | e-commerce | DTC single brand / multi-category retailer / specialty retailer |
| NEWS | news | national daily / local or regional / public or nonprofit newsroom |
| GOV | government | city / state / federal agency |
| FASH | fashion | magazine / brand editorial / blog or trend site |
| WX | weather | national weather service / commercial portal / local TV or specialized |
| NPO | nonprofit | international charity / local community nonprofit / cause-focused charity |
| CHUR | church | large or multi-site / historic cathedral or parish / small congregation |
| PORT | portfolio | minimal one-page / software developer / motion or 3D designer |
| REST | restaurant | small local independent / BBQ or smokehouse / fine dining |
