# Accessibility and Usability UI Repair Benchmark — MAIN

**Owner: Tien Vu. Created October 3, 2026 at his explicit request.**

This is the user-owned construction blueprint. Agents must read it but must not change it without Tien's explicit authorization for the specific change. Progress, implementation details, discoveries, and proposed changes belong in [JOBS.md](JOBS.md). Sections have stable IDs so jobs can point back to an exact goal.

## M00 — Context and source of truth

Project: Accessibility HCI and LLM Research; working implementation name: **UIRepairGym**. Goal: a reproducible environment for investigating how LLM repair affects accessibility and usability together, with inspectable experiment artifacts and a professional demonstration. NeurIPS is an aspiration, not a promised venue, acceptance, or established contribution.

Inputs to this blueprint:

- Tien's October 3 request for a protected MAIN.md, an agent contract, and a shared engineering job board.
- The project conversation **Hosting Experiment Stack**, October 3: understand Playwright, imported websites, Docker, API-based agents, and hosting; Railway for the always-on control plane, with VT Advanced Research Computing (ARC) as a potential later batch-compute backend.
- `Papers/Team Planning Report.docx`: WCAG-only versus Nielsen-only versus joint repair, trade-offs across axes, and the reliability of LLM usability feedback.
- `Papers/Mini Project Simulation.docx`: a static-web pilot, portfolio/e-commerce/restaurant examples, four arms, bounded iterative repair, and a possible 48-output pilot.
- `files.zip`: WCAG 2.2 Markdown/JSON reference material; derived text must be checked against W3C before being treated as authoritative.

Repository audit at starting commit `8500092c15203ba0e90c0f70a19cec67074911bc`: main and the supplied claude/uirepairgym-setup branch had the same commit. Visible contents were Literature/, Papers/, README.md, LICENSE, and files.zip. The archive contained WCAG reference files, not a runnable application. There was no visible runner, dashboard, API, Dockerfile, or deployment configuration. Any proposed code layout below is **planned**, not implemented.

The planning documents contain older inconsistencies (WCAG 2.1 versus 2.2; A/AA/AAA coverage; generated versus imported sites; illustrative model labels). Preserve those documents and resolve choices explicitly before the research pilot. Do not copy illustrative model names into a real run configuration without verification.

## M01 — Goal and boundaries

Build an experiment system that can:

1. Load a versioned website fixture and a concrete user task.
2. Render the baseline in a repeatable browser environment and capture evidence.
3. Ask a model to repair a copy under a declared feedback condition.
4. Re-render and independently evaluate each iteration on both accessibility and usability.
5. Save inputs, outputs, diffs, intermediate observations, failures, budgets, and provenance.
6. Compare conditions fairly and display inspectable results to the team.
7. Freeze approved data/code/configuration for a paper and public artifact release.

The contribution being investigated is the **interaction between accessibility and usability under repair**, including cross-axis regressions and whether joint feedback helps. Hosting, JSON formatting, a dashboard, and comparing model providers are engineering tools rather than sufficient novelty claims.

Tonight's target is a narrow end-to-end demonstration. It must not be presented as a statistically validated benchmark, a WCAG conformance certification, or proof that a usability judge is reliable.

## M02 — Research questions

- **RQ1:** Does accessibility-only repair improve detected accessibility while worsening usability or task behavior?
- **RQ2:** Does usability-only repair introduce accessibility regressions?
- **RQ3:** Does joint feedback improve the trade-off relative to either single-objective condition, under matched budgets?
- **RQ4:** How reliable is the LLM Nielsen evaluator against independent human assessment, and how does unreliable feedback affect repair?

A screenshot change alone is insufficient evidence for these questions. Preserve functionality/content constraints, include user-task checks, and report failures and uncertainty.

## M03 — Conditions and comparison design

| Arm | Feedback given to repair model | Evaluation afterward |
|---|---|---|
| Baseline | No repair; shared starting UI | Both axes plus task checks |
| Accessibility-only | Applicable WCAG findings | Both axes plus task checks |
| Usability-only | Nielsen findings | Both axes plus task checks |
| Joint | Both sets of findings | Both axes plus task checks |

For imported fixtures, baseline means the unchanged imported UI. For a generated-UI study, baseline means naive generation; generate once for each model/task/replicate and clone that same baseline into its repair arms. Do not quietly compare different starting pages. The final dataset track (generated, imported, or separately reported tracks) remains an owner decision.

Historical pilot proposal: 2 model families × 3 UI prompts/types × 2 independent repetitions × 4 arms = **48 final outputs**. This does not count all intermediate iterations and evaluations. It is a candidate pilot, not a funded or already executed experiment. Tonight can use one fixture/model for a demo; the full matrix comes later.

Match inputs, browser/viewport, allowed edits, feedback schema, iteration cap, and token/time budgets across repair arms. Proposed demo cap: at most three repair iterations, with exact normalized code equality/no change and exhausted budget as explicit stopping reasons. Equal caps do not imply equal actual cost; report actual usage. Preserve every iteration, including regressions. Statistical sample size and confirmatory design must be decided before larger runs.

## M04 — Dataset, tasks, and reset

Start with an owned, synthetic static HTML/CSS fixture exercising missing labels, image alternatives, contrast, landmarks, focus, and a simple navigation/form task. This avoids making a live external website a mutable benchmark. Add portfolio, e-commerce, and restaurant fixtures after the first path works.

Each fixture manifest must contain: stable ID; source URL or synthetic origin; revision/hash; license/redistribution status; local entrypoint; assets; intended task; expected content/functionality; applicable criteria; reset procedure; and baseline screenshot/check references. Live website mirroring does not guarantee completeness or permission. Keep source snapshots immutable and repairs in per-run workspaces.

Build a local task environment: task + baseline + action constraints + reset + observation + evaluation + terminal condition. WorkArena is a useful example of task-based browser benchmarking, but a browser-task success benchmark is not automatically a source-code repair benchmark. Do not imply a WorkArena dependency, reproduction, or copied task corpus unless implemented and verified.

WCAG reference extraction is a versioned data-preparation job. Do not treat everything in files.zip as verified ground truth simply because its filename says verified. Separate normative guidance from executable checks and recorded human judgments.

## M05 — System architecture

| Component | Responsibility | Initial versus later |
|---|---|---|
| Fixtures and configuration | Immutable inputs, arm/model/budget settings | Initial |
| Python experiment runner | Executes a bounded run, resets workspaces, stores provenance | Initial |
| Browser adapter | Playwright/Chromium observations, screenshots, task checks | Initial |
| Repair model adapter | API request/response, structured result, cost/latency metadata | Initial; one provider first |
| Evaluators | axe findings, task behavior, Nielsen evidence | Automated subset first; human validation later |
| Artifact store | HTML/CSS, screenshots, diffs, JSON reports, event logs | Local run folder first; private object storage later |
| FastAPI | Run submission/status/results, validation, access checks | After runnable CLI |
| Durable runtime queue | Run leasing, retries, concurrency/cost caps | After runnable CLI |
| PostgreSQL | Run metadata, runtime job states, indexes | Railway collaboration stage |
| Team dashboard | Select run, see status, compare before/after and download evidence | Minimal report first; Next.js dashboard later |
| Public research page | Methods, approved examples, frozen release/leaderboard | After release review |
| ARC adapter | Slurm arrays, Apptainer workers, optional open-weight inference | Optional later backend |

Execution sequence: configuration → immutable fixture → isolated workspace → baseline observation/evaluation → model feedback and repair → re-render/evaluate → bounded repeat → persisted artifact bundle → team report. The API queues work; browser/model work runs in a worker rather than holding an HTTP request open.

**Development agents** (Codex/Claude building the repository) coordinate through JOBS.md. **Experiment agents** (models repairing benchmark UIs) execute runtime jobs in the experiment queue. These are separate queues, responsibilities, and access boundaries.

Development interface-first rule: the runner's artifact/run schema is agreed before the report/API teams consume it. A provider adapter may be mocked for development only if run mode is clearly labeled and mock results never enter empirical comparisons.

## M06 — Run and artifact contract

A proposed initial layout is `runs/<run_id>/manifest.json`, `events.jsonl`, and `iterations/<index>/` containing input/output website files, screenshot(s), raw accessibility report, task-check report, Nielsen report if present, model response, and diff. A schema job will freeze actual filenames and field types before parallel implementation. Run IDs must be unique; fixtures must not be overwritten.

Minimum run metadata:

- Run/task/fixture IDs; input hash; source license; dataset/config/prompt/evaluator versions; code commit; dependency/browser/container versions.
- Arm; provider/model identifier and available revision; request parameters and supported seed; effective prompt/input modalities; viewport and task context.
- Started/finished timestamps; iteration; status/stopping reason; retry attempts; errors and timeouts.
- Raw model response and applied edits; latency; provider-reported tokens; estimated cost with pricing basis when known; unknown usage remains unknown.
- Raw axe findings including incomplete results; behavioral outcomes; scored Nielsen findings with evidence and applicability; validity/missing flags.
- Artifact paths/hashes and visibility classification; mode `live`, `mock`, or `replay`.

A run is successful only when required outputs exist and checks complete. A model response is not sufficient. Preserve failed runs as failed; absent scores are null with a reason, never zero. Retry transport failures separately from scientific repetitions. Pin configurations and log provider changes; external APIs cannot guarantee exact bitwise reproduction.

## M07 — Measurement and validity

**Accessibility:** use versioned axe-core checks mapped to declared WCAG coverage, retaining raw rule/element findings, severity, passes, and incomplete results. Count rule findings and affected elements explicitly; do not mislabel them as the number or percentage of all WCAG criteria satisfied. Automated checking covers only part of accessibility. Manual and task-specific assessment is needed for broader claims.

**Usability:** assess applicable Nielsen H1–H10 with a declared 0–4 severity rubric, explicit not-applicable/missing states, observed evidence, and a concrete user task. LLM ratings are provisional until validated against humans. Record judge identity, prompt, evidence access, and whether the repair model is also its judge. Independent evaluation and blinded human review are preferred for the research pilot.

**Functionality:** check preserved content, task completion, navigation/form behavior as applicable, console/page failures, and keyboard behavior. Deleting a broken feature is not a successful repair unless the task explicitly permits it.

**Cross-axis regressions:** for each evaluated repair transition, count an improvement on one axis paired with worsening on the other. Freeze severity aggregation, meaningful-change threshold, comparability rules, and denominator before analysis. Report accessibility→usability and usability→accessibility separately, with per-step and per-run summaries. Do not equate correlation with causation or compute a regression rate from missing usability data.

**Judge validation and analysis:** match predicted issues to adjudicated human issues; report precision/recall and false-positive definitions, agreement appropriate to the labels (including weighted kappa for ordinal severity where applicable), and disagreement examples. Pair arm comparisons by task/baseline/model/replicate; repeated repair steps are not independent samples. Paired Wilcoxon is a proposal in the planning report, subject to sample size, assumptions, multiple comparisons, and final analysis design. Include uncertainty, failure rates, cost, and sensitivity to judge choice.

Potential confounds to document: unequal evidence modalities, different starting UIs, unequal budgets, self-judge bias, training contamination, applicable-criterion differences, untested manual criteria, stochasticity, prompt drift, and selective reporting. Human-study procedure and any institutional review requirements must be settled with the research lead before recruiting participants or collecting study data.

## M08 — Hosting and execution backends

### M08a — Local first

Develop the full CLI path locally before deployment. A reproducible container can include the browser and its OS dependencies. Reset per run, bound resources/time, and keep target files separate from runner secrets. Browser contexts are session isolation, not a security sandbox for arbitrary executable code. Tonight's synthetic static fixture does not require arbitrary package installation or nested Docker.

### M08b — Railway control plane

Railway is the planned home for the always-on team dashboard, API/controller, PostgreSQL, runtime queue, and eventually private artifacts. It supports Dockerfile-based services. A service running a Docker image is not evidence that our worker can start arbitrary nested containers; verify the required sandbox/runtime capability before designing a Docker-socket-based executor.

Initial deployment may serve a frozen completed demo report; persistent storage must be explicit for new runs. Do not rely on a deployment's temporary filesystem surviving redeploys. Use a mounted persistent volume for an initial single worker or private object storage for shared artifacts, with DB metadata referencing objects. OAuth/institutional login with an application allowlist is the team-access design; a Railway account is not application authentication.

Provider API keys stay in server-side worker configuration. Users submit authorized configurations; they do not receive keys or unrestricted model-call endpoints. For an unauthenticated first presentation, expose only approved static sample results, not run submission or raw private artifacts. Multi-worker leases/retries/cost caps must be in place before concurrency increases.

### M08c — Optional VT ARC backend

ARC is a potential source of scheduled batch CPU/GPU capacity and research storage. Its documented scheduler is Slurm; the container path uses Apptainer. Access/allocation, outbound API connectivity, artifact transfer, headless-browser compatibility, storage retention, and site policies need confirmation. Do not assume unrestricted Docker, public inbound service access, immediate scheduling, or an approved allocation.

Closed frontier Claude/Gemini/OpenAI weights are not supplied for deployment on the cluster. ARC workers can potentially call their hosted APIs, subject to access/network policy and the same provider billing. GPUs are useful for open-weight inference or GPU workloads, not a requirement for API calls. A future open-weight server such as vLLM is an option to validate rather than an installed dependency.

Hybrid direction: Railway manages team interaction and metadata; ARC batch workers receive versioned run configurations and return artifacts through an authenticated transfer/API path. ARC is not a dependency for tonight's demo. Never run sustained experiment workloads on login nodes.

## M09 — Team access, presentation, and paper artifacts

Private team workspace: run configuration/status; before/after screenshots; source diff; findings and severity; task checks; model/arm/iteration metadata; latency/tokens/cost; downloads; failures and provenance. A minimal first report can be generated HTML instead of a full dashboard, provided it reads the actual artifact bundle.

Public research site: explain questions, method, limitations, approved examples, and release download links. Read from a versioned, explicitly approved frozen export rather than the live private experiment database. Keep raw private prompts, credentials, unlicensed website assets, and unpublished human-study data out of the release.

Paper-facing outputs: architecture/method figure, task/dataset table, paired results by arm/model, regression examples with evidence, evaluator agreement analysis, uncertainty/failures/cost, ablations, limitations, and an artifact reproduction guide. The dashboard helps inspect evidence; the release and scripts support reproducibility. A tiny demo cannot establish the proposed research findings.

## M10 — Milestones

| Stage | Definition of completion |
|---|---|
| Governance | Protected blueprint and agent contract; queue, ownership, dependencies, handoffs |
| Tonight's local demo | One fixture → measured baseline → one live model repair → measured re-evaluation → saved artifacts → readable before/after report |
| Demo extensions | Four arms on the same fixture; provisional Nielsen evidence; frozen hosted example if time permits |
| Shared execution | API, durable runtime queue, persistent artifacts, authenticated team dashboard, bounded costs/retries |
| Research pilot | Owner-approved dataset/coverage/models/matrix; validated rubric/judge; repeated matched runs |
| Scale | Additional tasks/models; optional ARC adapter after access and smoke testing |
| Release | Reviewed analysis, frozen dataset/code/configs, approved public presentation, paper artifacts |

The tonight plan and detailed task ownership are in DEMO_TONIGHT.md and JOBS.md. A failure to obtain provider access or deployment access must be reported rather than disguised as a live demo. Mock/replay mode can still demonstrate software behavior but cannot satisfy live-run evidence.

## M11 — Open owner decisions and external prerequisites

- Final corpus track: LLM-generated static pages, imported pages, or separately analyzed tracks.
- Exact WCAG version, levels, applicable subset, and manual assessment coverage; legacy prompts conflict with the WCAG 2.2 archive.
- Model families/IDs, judge independence, supported modalities, prompt policy, final sample size and budget.
- Usability ground truth, expert recruitment/adjudication, severity rubric, and regression threshold/denominator.
- Dataset licenses, raw artifact visibility, and release approval.
- Railway project/provider credentials and spending authorization for bounded live demo/pilot runs.
- ARC allocation and networking/container/browser constraints; implementation remains optional.
- Final publication framing and timeline, including whether the intended venue fits the resulting evidence.

Agents may implement compatible interfaces and synthetic fixtures. They may not resolve these research choices by editing MAIN.md. Questions and proposed decisions go into JOBS.md for Tien.

## M12 — Governance and evidence references

MAIN.md contains goals; JOBS.md decomposes them; COORDINATION.md controls engineering ownership; PROJECT_STRUCTURE.md maps folders; DEMO_TONIGHT.md sequences the demonstration. Jobs link to stable M-section anchors, and new discoveries return to the job board.

Official references checked October 3, 2026:

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) — normative guideline source.
- [W3C evaluating accessibility](https://www.w3.org/WAI/test-evaluate/) — tools do not determine full accessibility conformance alone.
- [Railway Dockerfiles](https://docs.railway.com/builds/dockerfiles) — image-based service deployment.
- [Railway volumes](https://docs.railway.com/volumes) — explicit persistent service storage.
- [ARC FAQ](https://docs.arc.vt.edu/usage/00faq.html) and [getting started](https://www.docs.arc.vt.edu/get_started.html) — accounts and allocations.
- [ARC Apptainer](https://docs.arc.vt.edu/software/apptainer.html) — container execution on ARC.

Repository planning documents provide the research direction, not verified claims that competing literature has not covered the topic. Literature novelty and implementation dependencies require their own review jobs.
