"""Run configuration + live-mode preflight (J004). Configs hold no secrets."""
from __future__ import annotations
import json
from pathlib import Path
from typing import Any, Literal, Mapping, Optional
from pydantic import BaseModel, ConfigDict, Field, ValidationError

HARD_ITERATION_CAP = 3
HARD_TRANSPORT_RETRY_CAP = 2


class ConfigError(Exception):
    """Actionable configuration/preflight failure. Messages never contain secret values."""


class _C(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Pricing(_C):
    input_usd_per_mtok: float = Field(ge=0)
    output_usd_per_mtok: float = Field(ge=0)
    pricing_basis: str = Field(min_length=3)  # e.g. "owner-supplied list price, <date>"


class ProviderCfg(_C):
    name: Literal["anthropic", "mock"] = "anthropic"
    model: Optional[str] = None
    pricing: Optional[Pricing] = None


class RetryCfg(_C):
    transport_retries: int = Field(default=1, ge=0, le=HARD_TRANSPORT_RETRY_CAP)


class BudgetCfg(_C):
    max_total_usd: Optional[float] = Field(default=None, gt=0)
    max_calls: int = Field(default=1, ge=1)


class RunConfig(_C):
    fixture_manifest: str
    fixture_dir: Optional[str] = None
    arm: Literal["baseline", "accessibility_only", "usability_only", "joint"] = "accessibility_only"
    mode: Literal["live", "mock"]
    provider: ProviderCfg = Field(default_factory=ProviderCfg)
    max_iterations: int = Field(default=1, ge=1, le=HARD_ITERATION_CAP)
    max_output_tokens: int = Field(default=8000, ge=256, le=64000)
    timeout_s: float = Field(default=120.0, gt=0, le=600)
    retry: RetryCfg = Field(default_factory=RetryCfg)
    budget: BudgetCfg = Field(default_factory=BudgetCfg)
    browser: dict[str, Any] = Field(default_factory=dict)
    runs_dir: str = "runs"


def find_base_dir(config_path: Path) -> Path:
    """Directory that relative paths in the config resolve against: cwd if it holds the manifest-relative
    files, otherwise the repo root (parent of configs/)."""
    return config_path.resolve().parent.parent


def load_config(config_path: str | Path, mode_override: Optional[str] = None) -> tuple[RunConfig, Path]:
    p = Path(config_path)
    try:
        data = json.loads(p.read_text())
    except OSError as e:
        raise ConfigError(f"cannot read config {p}: {e.strerror or e}") from None
    except json.JSONDecodeError as e:
        raise ConfigError(f"config {p} is not valid JSON: {e}") from None
    if mode_override:
        data["mode"] = mode_override
        if mode_override == "mock":
            data.setdefault("provider", {})["name"] = "mock"
    try:
        cfg = RunConfig.model_validate(data)
    except ValidationError as e:
        problems = "; ".join(f"{'.'.join(map(str, x['loc']))}: {x['msg']}" for x in e.errors())
        raise ConfigError(f"invalid config {p}: {problems}") from None
    if cfg.mode == "mock" and cfg.provider.name != "mock":
        raise ConfigError("mode 'mock' requires provider.name 'mock' (use --mode mock to override automatically)")
    if cfg.mode == "live" and cfg.provider.name == "mock":
        raise ConfigError("mode 'live' cannot use provider 'mock'; set provider.name to 'anthropic'")
    return cfg, find_base_dir(p)


def resolve_model(cfg: RunConfig, env: Mapping[str, str]) -> Optional[str]:
    return cfg.provider.model or env.get("UIREPAIRGYM_MODEL") or None


def preflight(cfg: RunConfig, env: Mapping[str, str]) -> None:
    """Refuse to start live mode unless model, explicit budget cap and credentials are present."""
    if cfg.arm in ("usability_only", "joint"):
        raise NotImplementedError(f"arm '{cfg.arm}' is not implemented in J004 (only 'baseline' and 'accessibility_only')")
    if cfg.mode != "live":
        return
    problems = []
    if not resolve_model(cfg, env):
        problems.append("no model set: put provider.model in the config or export UIREPAIRGYM_MODEL "
                        "(the runner never guesses a model ID)")
    if cfg.budget.max_total_usd is None:
        problems.append("budget.max_total_usd is not set: the owner must set an explicit spend cap before any live call")
    if cfg.budget.max_calls < 1:
        problems.append("budget.max_calls must be >= 1")
    if not env.get("ANTHROPIC_API_KEY"):
        problems.append("environment variable ANTHROPIC_API_KEY is not set (server-side only; never put it in a config)")
    if problems:
        raise ConfigError("live mode refused to start:\n  - " + "\n  - ".join(problems))
