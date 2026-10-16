"""CLI entrypoint: python -m uirepairgym {schema,validate,run,report,eval} ... (J001 owns wiring).

`run`, `eval` and `report` import their components lazily so each worker lane can land independently.
"""
from __future__ import annotations
import argparse, importlib, json, sys
from pathlib import Path
from . import CONTRACT_VERSION
from .schemas import Evaluation, FixtureManifest, RunManifest

MODELS = {"fixture": FixtureManifest, "evaluation": Evaluation, "run": RunManifest}


def cmd_schema(a):
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    for name, m in MODELS.items():
        (out / f"{name}.schema.json").write_text(json.dumps(m.model_json_schema(), indent=2, sort_keys=True) + "\n")
    print(f"wrote {len(MODELS)} schemas to {out}")


def cmd_validate(a):
    kind = a.kind
    data = json.loads(Path(a.path).read_text())
    MODELS[kind].model_validate(data)
    print(f"OK {kind} {a.path} (contract {CONTRACT_VERSION})")


def _lazy(mod, fn):
    try:
        return getattr(importlib.import_module(mod, __package__), fn)
    except (ImportError, AttributeError) as e:
        sys.exit(f"component not available yet: {mod}.{fn} ({e})")


def cmd_run(a):
    _lazy(".runner", "main")(a.config, mode_override=a.mode)


def cmd_eval(a):
    _lazy(".evaluators", "cli_main")(a.fixture_dir, a.out)


def cmd_report(a):
    p = _lazy(".reporting", "build_report")(Path(a.run_dir), Path(a.out) if a.out else Path(a.run_dir) / "report.html")
    print(f"report written: {p}")


def main(argv=None):
    ap = argparse.ArgumentParser(prog="uirepairgym", description="UIRepairGym demo CLI")
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("schema", help="write JSON Schemas"); s.add_argument("--out", default="schemas"); s.set_defaults(f=cmd_schema)
    v = sub.add_parser("validate", help="validate a JSON file"); v.add_argument("kind", choices=MODELS); v.add_argument("path"); v.set_defaults(f=cmd_validate)
    r = sub.add_parser("run", help="execute a bounded run from config"); r.add_argument("--config", required=True); r.add_argument("--mode", choices=["live", "mock"]); r.set_defaults(f=cmd_run)
    e = sub.add_parser("eval", help="evaluate a fixture dir (screenshot/axe/task)"); e.add_argument("fixture_dir"); e.add_argument("--out", required=True); e.set_defaults(f=cmd_eval)
    p = sub.add_parser("report", help="render HTML report for a run dir"); p.add_argument("--run-dir", required=True); p.add_argument("--out"); p.set_defaults(f=cmd_report)
    a = ap.parse_args(argv); a.f(a)


if __name__ == "__main__":
    main()
