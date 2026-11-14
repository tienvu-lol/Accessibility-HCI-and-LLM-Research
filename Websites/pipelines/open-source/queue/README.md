# Open-source queue

`manifest.json` holds twelve research tasks and forty-eight build tasks — slots 07, 08, 09 and 10 in each of the twelve categories.

Every task starts `planned`. Allowed states are `planned`, `prepared`, `running`, `completed` and `blocked`, and `run_id` links the task to its most recent run directory.

Unlike the Codex queue, these states are written by the scripts, because this pipeline actually executes: `run-research.mjs` and `run-build.mjs` set `running` when they start a model and `completed` or `blocked` when they finish. That is execution bookkeeping about a task, not dataset state and not acceptance. `metadata/assignments.csv` remains the dataset's register, and only `sync-register.mjs` writes it.

A build task depends on its category's research task, and separately on the approval gate that `buildReadiness` checks — the four open-source rows of the category must be filled, verified, approved and synchronized with the register before a build will start. The queue does not enforce that; the readiness check does.

Default concurrency is two (`config.execution.max_concurrent_builds`). A build refuses to start when the queue already shows that many running builds. This is a bookkeeping check, not a lock: two processes started at the same instant can both pass it, so run builds from one place, or use separate checkouts if you need real parallelism.

Forty queued entries mean forty planned replicas. They do not mean any category is researched, approved, generated or accepted.
