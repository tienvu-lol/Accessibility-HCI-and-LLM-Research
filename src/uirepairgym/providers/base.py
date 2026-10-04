"""Provider-side helpers shared by adapters (J004)."""
from __future__ import annotations
import re
from typing import Mapping, Optional
from ..schemas import ModelCall

_KEY_PATTERN = re.compile(r"sk-[A-Za-z0-9_\-]{8,}")


def redact(text: str, secrets: Optional[list[str]] = None) -> str:
    """Remove known secret values and API-key-shaped tokens from text destined for logs/artifacts."""
    for s in secrets or []:
        if s and len(s) >= 4:
            text = text.replace(s, "[REDACTED]")
    return _KEY_PATTERN.sub("[REDACTED]", text)


class ProviderError(Exception):
    """Provider call failed after transport retries. `call` carries partial ModelCall metadata."""

    def __init__(self, message: str, call: Optional[ModelCall] = None):
        super().__init__(message)
        self.call = call


def secrets_from_env(env: Mapping[str, str]) -> list[str]:
    v = env.get("ANTHROPIC_API_KEY")
    return [v] if v else []
