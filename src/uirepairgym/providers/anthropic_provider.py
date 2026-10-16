"""Anthropic adapter via the official SDK (J004). NOT exercised against the live API in development."""
from __future__ import annotations
import time
from typing import Any, Callable, Optional
from ..interfaces import RepairRequest, RepairResponse
from ..schemas import ModelCall, Usage
from .base import ProviderError, redact


class AnthropicProvider:
    name = "anthropic"
    mode = "live"

    def __init__(self, model: str, api_key: Optional[str] = None, base_url: Optional[str] = None,
                 pricing: Optional[dict] = None, transport_retries: int = 1,
                 client: Any = None, sleep_fn: Callable[[float], None] = time.sleep):
        if not model:
            raise ValueError("model must be supplied explicitly")
        self.model = model
        self.pricing = pricing
        self.transport_retries = max(0, min(int(transport_retries), 2))
        self._secrets = [api_key] if api_key else []
        self._sleep = sleep_fn
        if client is None:
            import anthropic  # lazy: only needed for the real client
            kwargs: dict[str, Any] = {"api_key": api_key, "max_retries": 0}  # retries handled here, visibly
            if base_url:
                kwargs["base_url"] = base_url
            client = anthropic.Anthropic(**kwargs)
        self.client = client

    @staticmethod
    def _is_transport_error(exc: Exception) -> bool:
        try:
            import anthropic
        except ImportError:  # pragma: no cover
            return False
        if isinstance(exc, (anthropic.APIConnectionError, anthropic.APITimeoutError)):
            return True
        status = getattr(exc, "status_code", None)
        return isinstance(exc, anthropic.APIStatusError) and status in (408, 429, 500, 502, 503, 504, 529)

    def _cost(self, inp: Optional[int], out: Optional[int]) -> tuple[Optional[float], Optional[str]]:
        p = self.pricing
        if not p or inp is None or out is None or not p.get("pricing_basis"):
            return None, None
        cost = inp / 1e6 * p["input_usd_per_mtok"] + out / 1e6 * p["output_usd_per_mtok"]
        return round(cost, 6), p["pricing_basis"]

    def repair(self, request: RepairRequest) -> RepairResponse:
        params = {"model": self.model, "max_tokens": request.max_output_tokens,
                  "timeout_s": request.timeout_s, "transport_retries_allowed": self.transport_retries}
        attempts = 0
        t0 = time.monotonic()
        while True:
            attempts += 1
            try:
                resp = self.client.messages.create(
                    model=self.model, max_tokens=request.max_output_tokens,
                    system=request.system_prompt,
                    messages=[{"role": "user", "content": request.user_prompt}],
                    timeout=request.timeout_s)
                break
            except Exception as exc:  # noqa: BLE001
                if not self._is_transport_error(exc) or attempts > self.transport_retries:
                    msg = redact(f"{type(exc).__name__}: {exc}", self._secrets)
                    call = ModelCall(provider="anthropic", model=self.model, mode="live", request_params=params,
                                     usage=Usage(latency_s=round(time.monotonic() - t0, 3)),
                                     attempts=attempts, error=msg)
                    raise ProviderError(msg, call) from None
                self._sleep(min(2.0 ** attempts, 8.0))
        text = "".join(getattr(b, "text", "") for b in getattr(resp, "content", []) if getattr(b, "type", "") == "text")
        u = getattr(resp, "usage", None)
        inp = getattr(u, "input_tokens", None)
        out = getattr(u, "output_tokens", None)
        cost, basis = self._cost(inp, out)
        params = {**params, "response_id": getattr(resp, "id", None),
                  "response_model": getattr(resp, "model", None),
                  "stop_reason": getattr(resp, "stop_reason", None)}
        call = ModelCall(provider="anthropic", model=self.model, mode="live", request_params=params,
                         usage=Usage(input_tokens=inp, output_tokens=out,
                                     latency_s=round(time.monotonic() - t0, 3),
                                     estimated_cost_usd=cost, pricing_basis=basis),
                         attempts=attempts)
        return RepairResponse(raw_text=text, call=call)
