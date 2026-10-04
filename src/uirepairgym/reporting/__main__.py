"""python -m uirepairgym.reporting <run_dir> [--out file]"""
from __future__ import annotations
import argparse
from pathlib import Path
from .builder import build_report


def main(argv=None) -> None:
    ap = argparse.ArgumentParser(prog="python -m uirepairgym.reporting", description="Render an HTML report for a run directory")
    ap.add_argument("run_dir")
    ap.add_argument("--out", help="output HTML file (default: <run_dir>/report.html)")
    a = ap.parse_args(argv)
    run_dir = Path(a.run_dir)
    p = build_report(run_dir, Path(a.out) if a.out else run_dir / "report.html")
    print(f"report written: {p}")


if __name__ == "__main__":
    main()
