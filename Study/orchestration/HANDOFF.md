# Handoff: fix hackloop 0.1.0 source bugs

Scope: only defects in the `hackloop` tool itself (Rust). Project/packet work is out of scope.

Where: binary `C:\Users\tient\bin\hackloop.exe` (v0.1.0, Rust; `cargo`/`rustc` 1.100 are installed). The source is NOT on this machine (searched `~/hack`, `~/.cargo`, repo). First find it (check `cargo install --list`, GitHub, the person who supplied the exe); if it can't be found, stop and report, since the workarounds hold. File:line references below come from laptop 2's agent reading the source; I (Windows agent) did not read them. Re-verify before editing.

Confidence: V = reproduced from ledger/logs, S = read in source by laptop 2, I = inferred.

## Bug 1: base-bundle fetch 500s under concurrency, and the lease is not released [V]
Symptom: `cannot prepare base: fetching base bundle: rpc 500: base bundle failed; lease will expire`. Three workers claiming in the same second: one succeeds, the others get 500 immediately. Reproduces after every merge (the base sha changes and all workers re-fetch at once). Seen on both laptops' workers.
Impact: the worker abandons the task but the lease stays held until `lease_ttl_s` (900 s), so the packet is unclaimable for 15 minutes, and the expiry counts as an attempt (see bug 5). Two workers were dead ~40 min this way.
Likely cause [I]: the orchestrator builds the base bundle (`git bundle`, files under `.hackloop/bundles`/`base.bundle`) on demand with no lock or cache, so concurrent requests for a new base sha collide on the same output file/worktree.
Fix: (a) generate the bundle once per base sha behind a mutex (or build it eagerly when the base moves) and serve the cached file; (b) when the worker fails in base preparation, send a release/abandon call so the task returns to `ready` immediately without incrementing `attempts`.
Test: spawn N concurrent bundle requests for a new sha; all must return 200 with identical bytes. Worker integration test: force a base-prep error, assert the task is `ready` and `attempts` unchanged.

## Bug 2: test-count parser only understands `# pass N` [V, S: `testcount.rs:34`]
Symptom: a green `node --test` run is reported as `tests: exit 0 and 0 tests passed (a green run needs exit 0 and at least one passed test)`. Node >= 24 uses the spec reporter even when piped and prints `ℹ pass N`; the TAP parser (`tap()`) never matches.
Impact: every Node-based packet fails on a Node 24+ machine regardless of correctness; the work is discarded.
Fix: either pass `--test-reporter=tap` when the check starts with `node --test` (and no reporter flag), or extend the parser to accept `ℹ pass N` (note the U+2139 glyph; strip ANSI). Prefer both. Keep the "exit 0 and >=1 passed" rule.
Test: feed captured outputs from Node 22 (TAP), Node 24/26 (spec), and unittest (`Ran N tests ... OK`) and assert the counts. Fixture for Node 24: `ℹ tests 2 / ℹ pass 2 / ℹ fail 0`.

## Bug 3: relative `--repo` breaks the worker's settings path [V, S: `runner.rs:141`, `worker.rs:201`, `main.rs:201` vs `orch.rs:120`]
Symptom: `Error: Settings file not found: <worktree>/.hackloop/settings/worker.json` (rc 1), exit before any model work; killed the first 12 packets on both OSes when started with the default `--repo .`.
Cause: settings path is built from `repo` + `.hackloop/settings/worker.json`; existence is checked from hackloop's cwd, but `claude` runs with cwd = the worktree, so the relative path resolves inside the worktree. `orch` canonicalizes the repo, `worker` does not.
Fix: canonicalize `--repo` at `main.rs:201` (same call as `orch.rs:120`); also make `runner.rs` pass an absolute settings path. Careful on Windows: `std::fs::canonicalize` returns `\\?\` verbatim paths; use `dunce::canonicalize` or strip the prefix if `claude` rejects it.
Test: start a worker with `--repo .` from the repo root and assert the settings path passed to the runner is absolute.

## Bug 4: no way to requeue a blocked task [V, S: `ledger.rs:201`]
`add_task` returns `LedgerError::Duplicate` for an existing id; `hackloop packet` only has `lint` and `add`. Blocked tasks are permanent, so the ledger fills with `-r2/-r3/...` copies, `status` is unreadable and `run complete` is meaningless.
Fix: add `hackloop packet requeue <id>` (or `hackloop unblock <id>`): `state='ready'`, `attempts=0`, `owner/lease_token=NULL`, `lease_until=0`, clear `blocker`; refuse on `merged`/`claimed`. Also a `cancel` (state `cancelled`) so redundant requeues can be stopped (today a duplicate claimed run cannot be cancelled and wastes about $0.15).
Test: block a task, requeue, assert it is claimable and `attempts == 0`.

## Bug 5: infrastructure failures consume attempts [V, S: `ledger.rs:159`, `ledger.rs:238`]
`ledger.rs:159` refuses claims at the attempt cap; `ledger.rs:238` sends an expired lease at the cap straight to `blocked` ("max attempts reached (lease expired)"). Combined with bug 1 and killed workers, one infra hiccup permanently kills a packet; the first 14 blocks were all infra, none a model failing the work. Default is `max_attempts = 3` (`config.rs:90`); this project had 2 until raised to 3.
Fix: only count an attempt when a session ran and its checks failed. Lease expiry, base-prep failure, worker crash, stop flag, and settings errors should return the task to `ready` without incrementing (or with a separate, higher `max_infra_retries`).
Test: expire a lease at attempts = cap-1; assert state `ready`, not `blocked`.

## Bug 6 (minor): stop/resume race right after orchestrator start [V]
`hackloop resume`/`status` issued within ~5 s of `hackloop orch` fail with `tcp connect error ... refused (os error 10061)` because the TLS listener is not bound yet, and `resume` silently leaves the stop flag set. Fix: bind the listener before returning from startup (or print "listening" only when bound) and make `resume` retry with backoff.

## Bug 7 (minor): stale repo lock after crash [V]
After a hard kill, `hackloop doctor` reported `lock held by pid N; stale if that process is gone`, and a new `orch` printed `another hackloop (pid N) holds this repo` when the pid was reused by an unrelated process. Fix: validate the pid is a hackloop process (image name/start time) before honoring the lock.

## Deliver
Rebuild (`cargo build --release`), run the crate's tests plus `hackloop selftest`, copy over `C:\Users\tient\bin\hackloop.exe` only while no orch/workers run (`hackloop stop`; the exe is locked while running), then restart per the order: orch, wait 10 s, `hackloop resume`, then workers (absolute `--repo`, `PYTHONDONTWRITEBYTECODE=1`). Laptop 2 must receive the same binary (same version string; mismatch breaks the link).
Do not push; commit to a branch of the hackloop repo, not this project repo.
