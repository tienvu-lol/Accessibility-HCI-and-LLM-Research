"""Versioned contract types shared by runner, browser/evaluators, and reporting (J001).

Frozen names: see schemas/*.json (generated from these models by `python -m uirepairgym schema`).
Rules (MAIN M06): absent scores are None with a reason, never 0; mode is live|mock|replay.
"""
from __future__ import annotations
from typing import Any, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field

CONTRACT_VERSION = "0.1.0"
Mode = Literal["live", "mock", "replay"]
Status = Literal["success", "failed", "partial", "unimplemented"]
Arm = Literal["baseline", "accessibility_only", "usability_only", "joint"]


class _M(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Viewport(_M):
    width: int = 1280
    height: int = 800


class BrowserConfig(_M):
    browser: str = "chromium"
    browser_version: Optional[str] = None
    viewport: Viewport = Field(default_factory=Viewport)
    timeout_ms: int = 15000
    axe_version: Optional[str] = None


class TaskStep(_M):
    action: Literal["fill", "click", "press", "tab", "goto_anchor"]
    selector: Optional[str] = None
    value: Optional[str] = None


class TaskSpec(_M):
    id: str
    description: str
    steps: list[TaskStep]
    success_selector: str
    success_text: Optional[str] = None
    keyboard_only: bool = True


class FixtureManifest(_M):
    contract_version: str = CONTRACT_VERSION
    id: str
    version: str
    origin: str  # "synthetic" or source URL
    license: str
    redistributable: bool
    entrypoint: str
    assets: list[str] = []
    content_hash: str  # sha256 over sorted (relpath, bytes) of fixture files
    task: TaskSpec
    preserved_text: list[str]  # visible strings that must survive repair
    known_defects: list[str]  # human documentation; NOT complete WCAG coverage
    applicable_criteria: list[str] = []
    reset_procedure: str = "copy fixture directory into a fresh per-run workspace"
    baseline_refs: dict[str, str] = {}


class AxeNode(_M):
    target: list[str]
    html: str = ""
    failure_summary: str = ""


class AxeRule(_M):
    id: str
    impact: Optional[str] = None
    description: str = ""
    help: str = ""
    tags: list[str] = []
    nodes: list[AxeNode] = []


class AxeSummary(_M):
    violation_rules: int
    violation_nodes: int
    incomplete_rules: int
    incomplete_nodes: int
    passes_rules: int
    by_impact: dict[str, int] = {}  # violation node counts per impact


class AxeReport(_M):
    axe_version: str
    summary: AxeSummary
    violations: list[AxeRule]
    incomplete: list[AxeRule]
    passes: list[str]  # rule ids only
    raw_path: Optional[str] = None


class CheckResult(_M):
    name: str
    status: Literal["pass", "fail", "error", "skipped"]
    detail: str = ""


class TaskReport(_M):
    task_id: str
    completed: Optional[bool] = None  # None = not evaluated (see error)
    checks: list[CheckResult] = []
    preserved_text_missing: list[str] = []
    console_errors: list[str] = []
    page_errors: list[str] = []
    error: Optional[str] = None


class NielsenFinding(_M):
    heuristic: str  # H1..H10
    severity: Optional[int] = Field(default=None, ge=0, le=4)
    applicable: Optional[bool] = None
    evidence: str = ""


class NielsenReport(_M):
    status: Literal["unavailable", "provisional_unvalidated"] = "unavailable"
    reason: Optional[str] = None
    judge: Optional[str] = None
    findings: list[NielsenFinding] = []


class Evaluation(_M):
    """Output of the browser/evaluator component for one rendered website state."""
    contract_version: str = CONTRACT_VERSION
    html_hash: str
    browser: BrowserConfig
    screenshot_path: Optional[str] = None
    axe: Optional[AxeReport] = None
    axe_error: Optional[str] = None
    task: Optional[TaskReport] = None
    nielsen: NielsenReport = Field(default_factory=NielsenReport)
    mode: Mode = "live"  # evaluation itself is always measured; mock only marks synthetic examples
    started_utc: Optional[str] = None
    finished_utc: Optional[str] = None


class Usage(_M):
    input_tokens: Optional[int] = None
    output_tokens: Optional[int] = None
    latency_s: Optional[float] = None
    estimated_cost_usd: Optional[float] = None
    pricing_basis: Optional[str] = None


class ModelCall(_M):
    provider: str
    model: Optional[str] = None  # None when mock
    mode: Mode
    request_params: dict[str, Any] = {}
    prompt_path: Optional[str] = None
    response_path: Optional[str] = None
    usage: Usage = Field(default_factory=Usage)
    attempts: int = 1
    error: Optional[str] = None


class Iteration(_M):
    index: int  # 0 = baseline evaluation (no model call)
    input_dir: str
    output_dir: Optional[str] = None
    evaluation: Optional[Evaluation] = None  # evaluation of output_dir (or input for index 0)
    model_call: Optional[ModelCall] = None
    diff_path: Optional[str] = None
    changed: Optional[bool] = None
    status: Status = "success"
    error: Optional[str] = None


class RunManifest(_M):
    contract_version: str = CONTRACT_VERSION
    run_id: str
    mode: Mode
    arm: Arm
    fixture_id: str
    fixture_hash: str
    fixture_hash_after: Optional[str] = None  # must equal fixture_hash (immutability check)
    config: dict[str, Any] = {}
    code_commit: Optional[str] = None
    versions: dict[str, str] = {}
    started_utc: str
    finished_utc: Optional[str] = None
    status: Status
    stopping_reason: Optional[str] = None
    iterations: list[Iteration] = []
    visibility: Literal["private", "approved_demo"] = "private"
    notes: list[str] = []
