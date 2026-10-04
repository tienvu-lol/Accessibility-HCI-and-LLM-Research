"""Static HTML run report (J005). Public entry: build_report(run_dir, out_html) -> Path."""
from .builder import build_report, compute_delta, render_report

__all__ = ["build_report", "render_report", "compute_delta"]
