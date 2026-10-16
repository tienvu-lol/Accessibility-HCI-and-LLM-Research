"""Component interfaces (J001). Components exchange only these types and plain paths.

Evaluator (J003):  evaluate(site_dir, fixture, out_dir, browser) -> Evaluation
    - never calls a model; same BrowserConfig used before/after; writes screenshot + raw axe JSON under out_dir.
Provider (J004):   RepairProvider.repair(request) -> RepairResponse
    - never touches the original fixture; returns raw text + usage; mock must set mode='mock'.
Report (J005):     build_report(run_dir, out_html) -> Path
    - reads runs/<id>/manifest.json (RunManifest) and files it references; no invented metrics.
"""
from __future__ import annotations
from pathlib import Path
from typing import Callable, Optional, Protocol
from pydantic import BaseModel
from .schemas import BrowserConfig, Evaluation, FixtureManifest, ModelCall


class RepairRequest(BaseModel):
    system_prompt: str
    user_prompt: str
    files: dict[str, str]  # relative path -> current text
    max_output_tokens: int = 8000
    timeout_s: float = 120.0


class RepairResponse(BaseModel):
    raw_text: str
    call: ModelCall  # provider, model, mode, params, usage, attempts, error


class RepairProvider(Protocol):
    name: str
    mode: str

    def repair(self, request: RepairRequest) -> RepairResponse: ...


EvaluateFn = Callable[[Path, FixtureManifest, Path, BrowserConfig], Evaluation]
ReportFn = Callable[[Path, Path], Path]
