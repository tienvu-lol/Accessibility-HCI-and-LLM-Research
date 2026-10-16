"""Deterministic MOCK repair provider (J004). Output is synthetic, never a model measurement."""
from __future__ import annotations
import re
import time
from ..interfaces import RepairRequest, RepairResponse
from ..schemas import ModelCall, Usage

MOCK_BANNER = "MOCK RESPONSE: deterministic scripted edit, not produced by any model. Excluded from empirical comparison."


def _repair_html(src: str) -> str:
    out = src
    if re.search(r"<html(?![^>]*\blang=)", out, re.I):
        out = re.sub(r"<html\b", '<html lang="en"', out, count=1, flags=re.I)

    def alt(m: re.Match) -> str:
        tag = m.group(0)
        if re.search(r"\balt=", tag, re.I):
            return tag
        label = "Mock alt text: logo" if "logo" in tag else "Mock alt text: illustration"
        return tag.replace("<img", f'<img alt="{label}"', 1)

    out = re.sub(r"<img\b[^>]*>", alt, out, flags=re.I)
    base = out

    def label(m: re.Match) -> str:
        tag = m.group(0)
        idm = re.search(r'\bid="([^"]+)"', tag)
        if not idm or f'for="{idm.group(1)}"' in base:
            return tag
        ph = re.search(r'\bplaceholder="([^"]+)"', tag)
        text = ph.group(1) if ph else idm.group(1)
        return f'<label for="{idm.group(1)}">{text}</label> {tag}'

    return re.sub(r"<input\b[^>]*>", label, out, flags=re.I)


class MockProvider:
    name = "mock"
    mode = "mock"

    def repair(self, request: RepairRequest) -> RepairResponse:
        t0 = time.monotonic()
        parts = [MOCK_BANNER, ""]
        for path, text in sorted(request.files.items()):
            if path.lower().endswith((".html", ".htm")):
                parts.append(f"```html {path}\n{_repair_html(text).rstrip(chr(10))}\n```\n")
        raw = "\n".join(parts)
        call = ModelCall(
            provider="mock", model=None, mode="mock",
            request_params={"deterministic": True, "max_output_tokens": request.max_output_tokens},
            usage=Usage(latency_s=round(time.monotonic() - t0, 6)),
            attempts=1,
        )
        return RepairResponse(raw_text=raw, call=call)
