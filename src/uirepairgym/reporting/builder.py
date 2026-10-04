"""Build a self-contained-ish accessible HTML report from a run bundle.

Rules (MAIN M06/M09): read only the manifest and files it references; absent numbers are
rendered as 'not available' (never 0); every string from the bundle is untrusted and is
HTML-escaped by Jinja2 autoescape; no metrics are computed except differences of present counts.
"""
from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any, Optional
from urllib.parse import quote

from jinja2 import Environment, FileSystemLoader, select_autoescape

from ..schemas import RunManifest

NA = "not available"
TEMPLATE_DIR = Path(__file__).parent / "templates"

MODE_BANNERS = {
    "mock": (
        "MOCK",
        "This run used a mock provider on synthetic data. It cannot satisfy the live-demo gate, "
        "and its numbers are not measurements.",
    ),
    "live": (
        "LIVE",
        "This run called a real model and evaluated real renders. It is a single run: it demonstrates the "
        "pipeline and is not a benchmark finding.",
    ),
    "replay": (
        "REPLAY",
        "This report was re-rendered from previously saved artifacts. It is not a new measurement.",
    ),
}

DELTA_METRICS = [
    ("Violation rules", "violation_rules"),
    ("Violation nodes", "violation_nodes"),
    ("Incomplete rules", "incomplete_rules"),
    ("Incomplete nodes", "incomplete_nodes"),
    ("Passing rules", "passes_rules"),
]
IMPACT_ORDER = ["critical", "serious", "moderate", "minor"]


def fmt(v: Any, unit: str = "") -> str:
    """Show None as 'not available' (never 0)."""
    return NA if v is None else f"{v}{unit}"


def fmt_unknown(v: Any, unit: str = "") -> str:
    return "unknown" if v is None else f"{v}{unit}"


def compute_delta(prev: Optional[int], cur: Optional[int]) -> str:
    """Difference cur - prev, only when BOTH numbers are present."""
    if prev is None or cur is None:
        return NA
    d = cur - prev
    return "no change (0)" if d == 0 else f"{d:+d}"


def diff_lines(text: str) -> list[dict]:
    out = []
    for line in text.splitlines():
        if line.startswith(("+++", "---")):
            cls = "meta"
        elif line.startswith("@@"):
            cls = "hunk"
        elif line.startswith("+"):
            cls = "add"
        elif line.startswith("-"):
            cls = "del"
        else:
            cls = "ctx"
        out.append({"cls": cls, "text": line})
    return out


class _Assets:
    """Copies referenced run files under <out_dir>/assets/<run-relative path>; returns relative hrefs."""

    def __init__(self, run_dir: Path, out_dir: Path):
        self.run = run_dir.resolve()
        self.out = out_dir
        self.cache: dict[str, tuple[Optional[str], Optional[str]]] = {}

    def add(self, rel: Optional[str]) -> tuple[Optional[str], Optional[str]]:
        """Return (href, problem). href is relative to the report; problem explains why it is missing."""
        if not rel:
            return None, "no path recorded"
        if rel in self.cache:
            return self.cache[rel]
        res: tuple[Optional[str], Optional[str]]
        try:
            if Path(rel).is_absolute():
                res = (None, "absolute path not allowed")
            else:
                src = (self.run / rel).resolve()
                if not src.is_relative_to(self.run):
                    res = (None, "path outside run directory")
                elif not src.is_file():
                    res = (None, "file not found")
                else:
                    sub = src.relative_to(self.run).as_posix()
                    dst = self.out / "assets" / sub
                    dst.parent.mkdir(parents=True, exist_ok=True)
                    if dst.resolve() != src:
                        shutil.copyfile(src, dst)
                    res = ("assets/" + quote(sub), None)
        except OSError as e:  # unreadable/unwritable: surface it, don't crash the report
            res = (None, f"could not copy ({type(e).__name__})")
        self.cache[rel] = res
        return res

    def read_text(self, rel: Optional[str]) -> Optional[str]:
        if not rel or Path(rel).is_absolute():
            return None
        try:
            src = (self.run / rel).resolve()
            if src.is_relative_to(self.run) and src.is_file():
                return src.read_text(encoding="utf-8", errors="replace")
        except OSError:
            pass
        return None


def _artifact(assets: _Assets, label: str, rel: Optional[str]) -> dict:
    href, problem = assets.add(rel)
    return {"label": label, "rel": rel, "href": href, "problem": problem}


def _axe_ctx(ev, assets: _Assets) -> dict:
    if ev is None:
        return {"state": "no_evaluation"}
    if ev.axe is None:
        return {"state": "no_axe", "error": ev.axe_error}
    a, s = ev.axe, ev.axe.summary
    impacts = [k for k in IMPACT_ORDER if k in s.by_impact] + sorted(k for k in s.by_impact if k not in IMPACT_ORDER)
    notes = []
    if len(a.violations) != s.violation_rules:
        notes.append(f"Summary reports {s.violation_rules} violation rule(s) but {len(a.violations)} rule detail(s) are recorded.")
    detail_nodes = sum(len(r.nodes) for r in a.violations)
    if detail_nodes != s.violation_nodes:
        notes.append(f"Summary reports {s.violation_nodes} violation node(s) but {detail_nodes} node detail(s) are recorded.")
    by_sum = sum(s.by_impact.values())
    if s.by_impact and by_sum != s.violation_nodes:
        notes.append(f"By-impact counts sum to {by_sum}; summary reports {s.violation_nodes} violation node(s).")
    return {
        "state": "ok", "report": a, "summary": s, "impacts": impacts, "notes": notes,
        "raw": _artifact(assets, "Raw axe JSON", a.raw_path) if a.raw_path else None,
    }


def _model_ctx(mc, assets: _Assets) -> Optional[dict]:
    if mc is None:
        return None
    if mc.model is not None:
        model = mc.model
    else:
        model = "none (mock)" if mc.mode == "mock" else "unknown"
    u = mc.usage
    return {
        "call": mc, "model": model,
        "params": json.dumps(mc.request_params, indent=2, sort_keys=True, default=str) if mc.request_params else None,
        "tokens_in": fmt_unknown(u.input_tokens), "tokens_out": fmt_unknown(u.output_tokens),
        "latency": fmt_unknown(u.latency_s, " s"), "cost": fmt_unknown(u.estimated_cost_usd, " USD (estimate)"),
        "pricing_basis": u.pricing_basis,
        "prompt": _artifact(assets, "Prompt", mc.prompt_path),
        "response": _artifact(assets, "Raw model response", mc.response_path),
    }


def build_context(manifest: RunManifest, run_dir: Path, out_html: Path) -> dict:
    assets = _Assets(run_dir, out_html.parent)
    iterations = []
    prev_ev = None
    for it in manifest.iterations:
        ev = it.evaluation
        axe = _axe_ctx(ev, assets)
        shots = []
        if it.index != 0:  # before = previous iteration's rendering
            shots.append({"role": "Before", "of": "previous iteration", "rel": prev_ev.screenshot_path if prev_ev else None,
                          "has_eval": prev_ev is not None})
        shots.append({"role": "Baseline" if it.index == 0 else "After", "of": f"iteration {it.index}",
                      "rel": ev.screenshot_path if ev else None, "has_eval": ev is not None})
        for s in shots:
            s["href"], s["problem"] = assets.add(s["rel"]) if s["has_eval"] else (None, "no evaluation recorded")
        delta = None
        if it.index != 0:
            ps = prev_ev.axe.summary if (prev_ev and prev_ev.axe) else None
            cs = ev.axe.summary if (ev and ev.axe) else None
            delta = []
            for lbl, key in DELTA_METRICS:
                p = getattr(ps, key, None) if ps else None
                c = getattr(cs, key, None) if cs else None
                delta.append({"label": lbl, "prev": p, "cur": c, "delta": compute_delta(p, c)})
        diff_text = assets.read_text(it.diff_path)
        iterations.append({
            "it": it, "ev": ev, "axe": axe, "shots": shots, "delta": delta,
            "task": ev.task if ev else None,
            "model": _model_ctx(it.model_call, assets),
            "diff_lines": diff_lines(diff_text) if diff_text is not None else None,
            "diff_art": _artifact(assets, "Source diff", it.diff_path) if it.diff_path else None,
            "nielsen": ev.nielsen if ev else None,
        })
        prev_ev = ev

    run_arts = [_artifact(assets, "Run manifest (manifest.json)", "manifest.json")]
    if (run_dir / "events.jsonl").is_file():
        run_arts.append(_artifact(assets, "Event log (events.jsonl)", "events.jsonl"))

    if manifest.fixture_hash_after is None:
        immut = ("unknown", "UNKNOWN: fixture hash after the run was not recorded, so immutability is not verified.")
    elif manifest.fixture_hash_after == manifest.fixture_hash:
        immut = ("pass", "PASS: fixture hash after the run equals the hash before the run.")
    else:
        immut = ("fail", "FAIL: fixture hash after the run differs from the hash before the run.")

    label, text = MODE_BANNERS.get(manifest.mode, (str(manifest.mode).upper(), "Unknown run mode."))
    return {
        "m": manifest, "mode_label": label, "mode_text": text, "immut": immut,
        "iterations": iterations, "run_artifacts": run_arts, "NA": NA,
        "config_json": json.dumps(manifest.config, indent=2, sort_keys=True, default=str),
    }


def _env() -> Environment:
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(["html", "j2"], default=True),
        trim_blocks=True, lstrip_blocks=True,
    )
    env.filters["fmt"] = fmt
    env.filters["unknown"] = fmt_unknown
    return env


def render_report(manifest: RunManifest, run_dir: Path, out_html: Path) -> Path:
    run_dir, out_html = Path(run_dir), Path(out_html)
    out_html.parent.mkdir(parents=True, exist_ok=True)
    ctx = build_context(manifest, run_dir, out_html)
    out_html.write_text(_env().get_template("report.html.j2").render(**ctx), encoding="utf-8")
    return out_html


def build_report(run_dir: Path, out_html: Path) -> Path:
    """interfaces.ReportFn: read run_dir/manifest.json, write out_html plus out_html.parent/assets/."""
    run_dir = Path(run_dir)
    manifest = RunManifest.model_validate_json((run_dir / "manifest.json").read_text(encoding="utf-8"))
    return render_report(manifest, run_dir, Path(out_html))
