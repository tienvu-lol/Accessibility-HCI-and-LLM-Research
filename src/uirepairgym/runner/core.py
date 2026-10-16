"""Bounded repair-run lifecycle (J004, MAIN M03/M05/M06).

Writes runs/<run_id>/ per the J001 layout. Never writes into the fixture directory.
"""
from __future__ import annotations
import json
import os
import secrets
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from importlib import metadata
from pathlib import Path
from typing import Callable, Mapping, Optional

from ..interfaces import EvaluateFn, RepairProvider, RepairRequest
from ..paths import tree_hash
from ..providers import AnthropicProvider, MockProvider, ProviderError, redact
from ..schemas import (BrowserConfig, Evaluation, FixtureManifest, Iteration, ModelCall, RunManifest, Usage,
                       CONTRACT_VERSION)
from .config import HARD_ITERATION_CAP, ConfigError, RunConfig, load_config, preflight, resolve_model
from .parsing import ParseError, normalize_code, parse_response, unified_diff
from .prompts import build_prompt


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def default_evaluate(site_dir: Path, fixture: FixtureManifest, out_dir: Path, browser: BrowserConfig) -> Evaluation:
    from uirepairgym.evaluators import evaluate  # lazy: Worker A's component, needs Chromium
    return evaluate(site_dir, fixture, out_dir, browser)


def _read_tree(root: Path) -> dict[str, str]:
    """Text files of a workspace keyed by posix relative path (undecodable files are skipped)."""
    out = {}
    for p in sorted(root.rglob("*")):
        if p.is_file() and not any(part.startswith(".") for part in p.relative_to(root).parts):
            try:
                out[p.relative_to(root).as_posix()] = p.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
    return out


def _atomic_write(path: Path, text: str) -> None:
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(text, encoding="utf-8")
    os.replace(tmp, path)


def _git_commit(root: Path) -> Optional[str]:
    try:
        r = subprocess.run(["git", "rev-parse", "HEAD"], cwd=root, capture_output=True, text=True, timeout=5)
        return r.stdout.strip() or None if r.returncode == 0 else None
    except Exception:  # noqa: BLE001
        return None


def _versions() -> dict[str, str]:
    v = {"python": sys.version.split()[0], "contract": CONTRACT_VERSION}
    for pkg in ("pydantic", "anthropic", "playwright"):
        try:
            v[pkg] = metadata.version(pkg)
        except metadata.PackageNotFoundError:
            pass
    return v


class _Run:
    """Holds run state and persists manifest/events."""

    def __init__(self, run_dir: Path, manifest: RunManifest, secrets_: list[str]):
        self.dir = run_dir
        self.m = manifest
        self.secrets = secrets_
        self.events = run_dir / "events.jsonl"

    def event(self, name: str, **fields) -> None:
        rec = {"ts": _now(), "event": name, **fields}
        line = redact(json.dumps(rec, default=str), self.secrets)
        with self.events.open("a", encoding="utf-8") as f:
            f.write(line + "\n")

    def save(self) -> None:
        _atomic_write(self.dir / "manifest.json", self.m.model_dump_json(indent=2) + "\n")

    def rel(self, p: Path) -> str:
        return p.relative_to(self.dir).as_posix()

    def clean(self, s: str) -> str:
        return redact(s, self.secrets)

    def fail_note(self, msg: str) -> None:
        self.m.notes.append("ERROR: " + self.clean(msg))


def _normalize_eval_paths(ev: Evaluation, run: _Run, out_dir: Path) -> Evaluation:
    """Make artifact paths relative to the run dir regardless of evaluator convention."""
    def fix(p: Optional[str]) -> Optional[str]:
        if not p:
            return p
        q = Path(p)
        if q.is_absolute():
            try:
                return q.resolve().relative_to(run.dir.resolve()).as_posix()
            except ValueError:
                return p
        if (run.dir / q).exists():
            return q.as_posix()
        if (out_dir / q).exists():
            return (out_dir / q).relative_to(run.dir).as_posix()
        return p
    upd = {"screenshot_path": fix(ev.screenshot_path)}
    if ev.axe is not None:
        upd["axe"] = ev.axe.model_copy(update={"raw_path": fix(ev.axe.raw_path)})
    return ev.model_copy(update=upd)


def _make_provider(cfg: RunConfig, env: Mapping[str, str]) -> RepairProvider:
    if cfg.mode == "mock":
        return MockProvider()
    pricing = cfg.provider.pricing.model_dump() if cfg.provider.pricing else None
    return AnthropicProvider(model=resolve_model(cfg, env), api_key=env.get("ANTHROPIC_API_KEY"),
                             base_url=env.get("ANTHROPIC_BASE_URL") or None, pricing=pricing,
                             transport_retries=cfg.retry.transport_retries)


def _sanitized_config(cfg: RunConfig, env: Mapping[str, str]) -> dict:
    d = cfg.model_dump(mode="json")
    d["provider"]["model"] = resolve_model(cfg, env)
    d["provider"]["base_url_overridden"] = bool(env.get("ANTHROPIC_BASE_URL"))
    d["hard_iteration_cap"] = HARD_ITERATION_CAP
    return d


def run_experiment(cfg: RunConfig, base_dir: Path, *, evaluate_fn: Optional[EvaluateFn] = None,
                   provider: Optional[RepairProvider] = None, env: Optional[Mapping[str, str]] = None
                   ) -> tuple[Path, RunManifest]:
    """Execute one bounded run. Raises ConfigError/NotImplementedError before any artifact is created;
    after that, failures are recorded in the manifest and returned."""
    env = os.environ if env is None else env
    preflight(cfg, env)
    evaluate_fn = evaluate_fn or default_evaluate
    sec = [env["ANTHROPIC_API_KEY"]] if env.get("ANTHROPIC_API_KEY") else []

    manifest_path = (base_dir / cfg.fixture_manifest) if not Path(cfg.fixture_manifest).is_absolute() else Path(cfg.fixture_manifest)
    try:
        fixture = FixtureManifest.model_validate_json(manifest_path.read_text())
    except (OSError, ValueError) as e:
        raise ConfigError(f"cannot load fixture manifest {manifest_path}: {type(e).__name__}") from None
    if cfg.fixture_dir:
        fixture_dir = Path(cfg.fixture_dir) if Path(cfg.fixture_dir).is_absolute() else base_dir / cfg.fixture_dir
    else:
        fixture_dir = manifest_path.with_name(manifest_path.name.removesuffix(".manifest.json"))
    if not fixture_dir.is_dir():
        raise ConfigError(f"fixture directory not found: {fixture_dir}")
    if provider is None:
        provider = _make_provider(cfg, env)
    browser = BrowserConfig(**cfg.browser)

    runs_root = Path(cfg.runs_dir) if Path(cfg.runs_dir).is_absolute() else base_dir / cfg.runs_dir
    started = datetime.now(timezone.utc)
    run_id = f"{started:%Y%m%dT%H%M%SZ}-{secrets.token_hex(3)}"
    run_dir = runs_root / run_id
    run_dir.mkdir(parents=True, exist_ok=False)

    fixture_hash = tree_hash(fixture_dir)
    m = RunManifest(
        run_id=run_id, mode=cfg.mode, arm=cfg.arm, fixture_id=fixture.id, fixture_hash=fixture_hash,
        config=_sanitized_config(cfg, env), code_commit=_git_commit(base_dir), versions=_versions(),
        started_utc=_now(), status="partial", visibility="private",
    )
    if cfg.mode == "mock":
        m.notes.append("MOCK RUN: repair text is scripted, not model output; must not enter empirical comparisons.")
    if cfg.mode == "live" and cfg.budget.max_total_usd is not None and cfg.provider.pricing is None:
        m.notes.append("Cost is not tracked (no pricing configured); max_calls/max_iterations are the effective bounds.")
    run = _Run(run_dir, m, sec)
    run.event("run_started", run_id=run_id, mode=cfg.mode, arm=cfg.arm, fixture_hash=fixture_hash)
    run.save()

    try:
        _execute(run, cfg, fixture, fixture_dir, browser, evaluate_fn, provider)
    except Exception as e:  # noqa: BLE001 - always leave a manifest
        m.status, m.stopping_reason = "failed", "internal_error"
        run.fail_note(f"{type(e).__name__}: {e}")
        run.event("internal_error", error=run.clean(f"{type(e).__name__}: {e}"))
    finally:
        m.fixture_hash_after = tree_hash(fixture_dir)
        if m.fixture_hash_after != fixture_hash:
            m.status, m.stopping_reason = "failed", "fixture_mutated"
            run.fail_note("fixture directory hash changed during run")
        m.finished_utc = _now()
        run.event("run_finished", status=m.status, stopping_reason=m.stopping_reason)
        run.save()
    return run_dir, m


def _evaluate(run: _Run, fn: EvaluateFn, site: Path, fixture: FixtureManifest, out_dir: Path,
              browser: BrowserConfig, idx: int) -> Evaluation:
    run.event("evaluation_started", iteration=idx)
    ev = fn(site, fixture, out_dir, browser)
    ev = _normalize_eval_paths(ev, run, out_dir)
    run.event("evaluation_finished", iteration=idx, axe_ok=ev.axe is not None,
              task_completed=ev.task.completed if ev.task else None)
    return ev


def _execute(run: _Run, cfg: RunConfig, fixture: FixtureManifest, fixture_dir: Path, browser: BrowserConfig,
             evaluate_fn: EvaluateFn, provider: RepairProvider) -> None:
    m = run.m
    if m.fixture_hash != fixture.content_hash:
        m.status, m.stopping_reason = "failed", "fixture_hash_mismatch"
        run.fail_note("fixture tree hash does not match fixture manifest content_hash; refusing to run")
        return

    # ---- iteration 0: baseline of a pristine workspace copy
    it0_dir = run.dir / "iterations" / "0"
    ws = it0_dir / "input"
    shutil.copytree(fixture_dir, ws)
    it0 = Iteration(index=0, input_dir=run.rel(ws))
    m.iterations.append(it0)
    if tree_hash(ws) != m.fixture_hash:
        it0.status, it0.error = "failed", "workspace copy hash differs from fixture"
        m.status, m.stopping_reason = "failed", "workspace_copy_mismatch"
        run.fail_note(it0.error)
        return
    try:
        it0.evaluation = _evaluate(run, evaluate_fn, ws, fixture, it0_dir, browser, 0)
    except Exception as e:  # noqa: BLE001
        it0.status, it0.error = "failed", run.clean(f"{type(e).__name__}: {e}")
        m.status, m.stopping_reason = "failed", "evaluation_error"
        run.fail_note("baseline evaluation failed: " + it0.error)
        return
    run.save()
    if cfg.arm == "baseline":
        m.status, m.stopping_reason = "success", "baseline_only"
        return
    if it0.evaluation.axe is None:
        it0.status, it0.error = "failed", f"baseline axe result unavailable: {it0.evaluation.axe_error}"
        m.status, m.stopping_reason = "failed", "evaluation_error"
        run.fail_note(it0.error)
        return

    # ---- repair iterations
    prev_dir, prev_eval = ws, it0.evaluation
    calls, spent = 0, 0.0
    spent_known = True
    cap = min(cfg.max_iterations, HARD_ITERATION_CAP)
    completed_repairs = 0

    def finish(status_if_prior: str, reason: str, err: Optional[str] = None) -> None:
        m.stopping_reason = reason
        m.status = "partial" if (completed_repairs and status_if_prior == "failed") else status_if_prior
        if err:
            run.fail_note(err)

    for i in range(1, cap + 1):
        if calls >= cfg.budget.max_calls or (cfg.budget.max_total_usd is not None and spent_known
                                             and spent >= cfg.budget.max_total_usd):
            run.event("budget_exhausted", iteration=i, calls=calls, spent_usd=spent if spent_known else None)
            m.status, m.stopping_reason = "partial", "budget_exhausted"
            return
        it_dir = run.dir / "iterations" / str(i)
        in_dir, out_dir = it_dir / "input", it_dir / "output"
        shutil.copytree(prev_dir, in_dir)
        files = _read_tree(in_dir)
        it = Iteration(index=i, input_dir=run.rel(in_dir))
        m.iterations.append(it)
        run.event("iteration_started", iteration=i)

        system_prompt, user_prompt = build_prompt(cfg.arm, fixture, prev_eval, files)
        (it_dir / "prompt.txt").write_text(f"[system]\n{system_prompt}\n\n[user]\n{user_prompt}\n", encoding="utf-8")
        req = RepairRequest(system_prompt=system_prompt, user_prompt=user_prompt, files=files,
                            max_output_tokens=cfg.max_output_tokens, timeout_s=cfg.timeout_s)
        run.event("model_call_started", iteration=i, provider=provider.name)
        calls += 1
        try:
            resp = provider.repair(req)
        except ProviderError as e:
            call = e.call or ModelCall(provider=provider.name, mode=cfg.mode, error=run.clean(str(e)))
            call = call.model_copy(update={"prompt_path": run.rel(it_dir / "prompt.txt"), "error": run.clean(str(e))})
            it.model_call, it.status, it.error = call, "failed", run.clean(str(e))
            run.event("model_call_failed", iteration=i, error=it.error)
            finish("failed", "provider_error", f"provider error in iteration {i}: {it.error}")
            return
        except Exception as e:  # noqa: BLE001
            msg = run.clean(f"{type(e).__name__}: {e}")
            it.model_call = ModelCall(provider=provider.name, mode=cfg.mode, error=msg,
                                      prompt_path=run.rel(it_dir / "prompt.txt"))
            it.status, it.error = "failed", msg
            run.event("model_call_failed", iteration=i, error=msg)
            finish("failed", "provider_error", f"provider error in iteration {i}: {msg}")
            return

        (it_dir / "response.txt").write_text(resp.raw_text, encoding="utf-8")
        call = resp.call.model_copy(update={"prompt_path": run.rel(it_dir / "prompt.txt"),
                                            "response_path": run.rel(it_dir / "response.txt")})
        it.model_call = call
        if call.usage.estimated_cost_usd is None:
            spent_known = False  # unknown cost stays unknown; max_calls remains the enforced bound
        else:
            spent += call.usage.estimated_cost_usd
        run.event("model_call_finished", iteration=i, attempts=call.attempts, error=call.error)
        if call.error:
            it.status, it.error = "failed", run.clean(call.error)
            finish("failed", "provider_error", f"provider error in iteration {i}: {it.error}")
            return

        try:
            new_files = parse_response(resp.raw_text, set(files))
        except ParseError as e:
            it.status, it.error = "failed", f"parse error: {e}"
            run.event("parse_error", iteration=i, error=str(e))
            finish("failed", "parse_error", f"parse error in iteration {i}: {e}")
            return

        shutil.copytree(in_dir, out_dir)
        for path, text in new_files.items():
            (out_dir / path).write_text(text, encoding="utf-8")
        after = {**files, **new_files}
        diff = unified_diff(files, after)
        (it_dir / "diff.patch").write_text(diff, encoding="utf-8")
        it.output_dir, it.diff_path = run.rel(out_dir), run.rel(it_dir / "diff.patch")
        it.changed = any(normalize_code(files[p]) != normalize_code(after[p]) for p in new_files)
        run.event("diff_written", iteration=i, changed=it.changed, files=sorted(new_files))
        if not it.changed:
            run.event("iteration_finished", iteration=i, status="success", note="no_change")
            run.save()
            m.status, m.stopping_reason = "success", "no_change"
            return

        try:
            it.evaluation = _evaluate(run, evaluate_fn, out_dir, fixture, it_dir, browser, i)
        except Exception as e:  # noqa: BLE001
            it.status, it.error = "failed", run.clean(f"{type(e).__name__}: {e}")
            finish("failed", "evaluation_error", f"evaluation failed in iteration {i}: {it.error}")
            return
        completed_repairs += 1
        run.event("iteration_finished", iteration=i, status="success")
        run.save()
        prev_dir, prev_eval = out_dir, it.evaluation
        if prev_eval.axe is None:
            it.status, it.error = "failed", f"axe result unavailable after repair: {prev_eval.axe_error}"
            finish("failed", "evaluation_error", it.error)
            return
    m.status, m.stopping_reason = "success", "iteration_cap"


def main(config_path: str, mode_override: Optional[str] = None) -> Path:
    """CLI entry (`python -m uirepairgym run --config ...`)."""
    try:
        cfg, base = load_config(config_path, mode_override)
        run_dir, m = run_experiment(cfg, base)
    except (ConfigError, NotImplementedError) as e:
        sys.exit(f"error: {e}")
    print(f"run {m.run_id}: status={m.status} stopping_reason={m.stopping_reason} mode={m.mode}\nartifacts: {run_dir}")
    if m.status == "failed":
        sys.exit(1)
    return run_dir
