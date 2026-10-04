# Concurrent agent rules

Applies to Codex, Claude Code, other development agents, and any delegated workers. MAIN.md owns project intent; JOBS.md owns engineering work. This protocol is separate from the experiment runtime queue.

## Canonical board and roles

Initial shared integration/queue branch: `research/accessibility-usability-benchmark`. MAIN.md is protected on every branch, including job branches.

- **Owner (Tien):** decides goals/research scope, authorizes specific MAIN.md changes, external access/spending, and release decisions.
- **Queue/integration coordinator:** serializes board claims, controls shared files, checks dependencies, and integrates reviewed work. This role grants no authority over MAIN.md.
- **Worker:** implements a claimed job within declared paths and reports evidence/blockers.
- **Reviewer:** checks acceptance, reproducibility, scope, and protected-file diff; cannot self-approve a research result as human validation.

A session may hold several roles for a small demo, but record the identity and role. Suggested lane names in the initial plan are not claims.

## Claim protocol and actual concurrency

Markdown is not an atomic lock or distributed scheduler. Two agents reading a QUEUED row can both think they own it. Local file edits or an unpushed claim do not establish shared ownership.

Use one of these explicit modes:

1. **Coordinator mode (recommended):** workers submit a claim request via their handoff/job event to the coordinator. The coordinator updates and publishes JOBS.md on the canonical branch in order. Only begin coding once the canonical board names that session as owner.
2. **Git compare-and-swap mode (separate clones):** fetch the canonical branch, inspect current ownership/dependencies, add the claim in a board-only commit based on that head, and push normally. A rejected non-fast-forward push means ownership was not acquired. Fetch again, recheck availability and file overlap, and reconcile only the intended record; never force-push a claim. A successful fast-forward claim followed by a fresh read showing that owner establishes ownership. All participants must follow this protocol; Git alone does not enforce its semantics.

If working in a shared checkout, use coordinator mode; concurrent branch switching and staging can corrupt each other's work. Prefer separate clones or worktrees, one per session. A worktree needs its own branch; do not switch a shared workspace's branch under another worker.

Every claim records: job ID, unique agent/session name (for example claude-ui-20261003-01), UTC claim/heartbeat timestamp, branch `agent/<session>/<job-id>`, base SHA, owned files, dependencies, and next checkpoint. State which mode is used. Before implementation, re-read MAIN.md sections and the latest board.

If a worker cannot publish a claim or contact the coordinator, it may investigate read-only but must not treat stale board ownership as permission for overlapping writes.

## States and transitions

| State | Meaning | Next step |
|---|---|---|
| QUEUED | Available once dependencies are DONE; no owner yet | Claim |
| CLAIMED | Published owner and scope; implementation not begun | IN_PROGRESS or release |
| IN_PROGRESS | Worker actively edits within owned scope | REVIEW or BLOCKED |
| BLOCKED | Specific blocker and unblocking condition recorded | Resume after resolution |
| REVIEW | Code/evidence published; ready for review | INTEGRATED or back to worker |
| INTEGRATED | Reviewed commits incorporated in canonical branch | Verification |
| DONE | Integrated acceptance checks passed with evidence | Dependents may start |
| CANCELLED | Owner/coordinator records why it will not proceed | Preserve history |

Do not rewrite DONE history to hide failures. Changes after completion get a follow-up job. Dependencies normally require DONE; early interface consumers may start only when a published stable contract explicitly satisfies that dependency and the coordinator records it.

## File ownership and shared edits

No two active jobs own overlapping files unless the coordinator publishes a deliberate shared-edit procedure. Shared dependency manifests, lockfiles, root scripts, schemas, root agent entrypoints, and JOBS.md summary/index belong to the coordinator until assigned otherwise.

Workers update their own job record and append events; the coordinator reconciles those reports into the canonical queue. If workers directly publish board updates, each update must start from a fresh head. Do not replace all of JOBS.md with a stale local copy, reorder other agents' jobs, erase events, or resolve a conflict by choosing all of one version.

Review every queue conflict against both histories and preserve both reports. If a worker needs a new shared dependency, request it through the board/coordinator. Do not duplicate schemas to avoid coordination. Protect MAIN.md while rebasing/merging/cherry-picking; a commit that changes it requires Tien's specific authorization.

## Checkpoints, blockers, and recovery

Publish a checkpoint at a meaningful milestone and before a session ends; for active tonight work aim for a heartbeat every 30 minutes. This interval is a coordination convention, not a reliable automatic lease.

After a missed checkpoint, the coordinator first inspects branch/commit state and attempts to contact the owner. Do not steal a task because a timestamp is old. Reassignment requires an explicit coordinator entry recording existing progress, released ownership, and the new owner's scope. Preserve recoverable commits and never force-reset someone else's work.

Blocked reports name the error/evidence, affected dependencies, attempted fixes, exact access or decision needed, and independent work that can continue. Newly discovered tasks receive a job ID and a MAIN section before implementation.

## Integration and handoff

Publish work on the job branch. Report commit IDs, paths, commands and outcomes, acceptance evidence, mode (live/mock/replay), caveats, and follow-up IDs in JOBS.md. Reviewer verifies the diff relative to the recorded base SHA and checks MAIN.md has no unauthorized changes. Coordinator integrates sequentially and runs a targeted integrated check before DONE.

Do not merge to the repository's `main` branch or publish research artifacts merely because the engineering queue is complete. Integrating jobs into the shared research branch is routine queue work; release/owner decisions remain distinct.

## Blueprint proposals

Use the proposed-change ledger in JOBS.md. Include MAIN section, precise change, reason/evidence, implementation impact, and status NEEDS_OWNER_DECISION. Implementation may continue under the existing compatible blueprint. Agent agreement does not substitute for Tien's explicit approval.
