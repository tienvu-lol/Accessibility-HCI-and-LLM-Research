import httpx
import anthropic
import pytest

from conftest import FAKE_KEY
from test_runner import FakeClient, _Resp
from uirepairgym.interfaces import RepairRequest
from uirepairgym.providers import AnthropicProvider, MockProvider, ProviderError
from uirepairgym.runner.parsing import ParseError, parse_response, normalize_code

REQ = RepairRequest(system_prompt="s", user_prompt="u", files={"index.html": "<html><img src=a></html>"},
                    max_output_tokens=100, timeout_s=5)


def conn_error():
    return anthropic.APIConnectionError(request=httpx.Request("POST", "https://example.invalid"))


def test_mock_provider_deterministic_and_idempotent():
    a, b = MockProvider().repair(REQ), MockProvider().repair(REQ)
    assert a.raw_text == b.raw_text and "MOCK" in a.raw_text
    assert (a.call.provider, a.call.model, a.call.mode) == ("mock", None, "mock")
    files = parse_response(a.raw_text, {"index.html"})
    assert 'lang="en"' in files["index.html"] and "alt=" in files["index.html"]
    again = MockProvider().repair(REQ.model_copy(update={"files": files}))
    assert normalize_code(parse_response(again.raw_text, {"index.html"})["index.html"]) == normalize_code(files["index.html"])


def test_anthropic_requires_explicit_model():
    with pytest.raises(ValueError):
        AnthropicProvider(model="", api_key=FAKE_KEY, client=object())


def test_anthropic_records_params_usage_and_no_cost_without_pricing():
    c = FakeClient(lambda n, kw: _Resp("ok"))
    r = AnthropicProvider(model="m-x", api_key=FAKE_KEY, client=c).repair(REQ)
    kw = c.kwargs[0]
    assert kw["model"] == "m-x" and kw["max_tokens"] == 100 and kw["timeout"] == 5 and "temperature" not in kw
    assert r.raw_text == "ok" and r.call.attempts == 1 and r.call.mode == "live"
    assert r.call.usage.input_tokens == 1234 and r.call.usage.estimated_cost_usd is None
    assert FAKE_KEY not in r.call.model_dump_json()


def test_transport_retry_then_success():
    def beh(n, kw):
        if n == 1:
            raise conn_error()
        return _Resp("ok")
    sleeps = []
    c = FakeClient(beh)
    r = AnthropicProvider(model="m", api_key=FAKE_KEY, client=c, transport_retries=1, sleep_fn=sleeps.append).repair(REQ)
    assert r.call.attempts == 2 and c.n == 2 and len(sleeps) == 1


def test_transport_retries_capped_at_two():
    c = FakeClient(lambda n, kw: (_ for _ in ()).throw(conn_error()))
    p = AnthropicProvider(model="m", api_key=FAKE_KEY, client=c, transport_retries=10, sleep_fn=lambda s: None)
    with pytest.raises(ProviderError) as ei:
        p.repair(REQ)
    assert c.n == 3 and ei.value.call.attempts == 3 and ei.value.call.error


def test_non_transport_error_not_retried():
    def beh(n, kw):
        raise ValueError("invalid request")
    c = FakeClient(beh)
    with pytest.raises(ProviderError):
        AnthropicProvider(model="m", api_key=FAKE_KEY, client=c, transport_retries=2, sleep_fn=lambda s: None).repair(REQ)
    assert c.n == 1


def test_parse_variants_and_rejections():
    ok = parse_response("text\n```html index.html\nA\n```\n```css:styles.css\nB\n```\n", {"index.html", "styles.css"})
    assert ok == {"index.html": "A\n", "styles.css": "B\n"}
    for bad in ["```html\nA\n```", "no blocks", "```index.html\nA\n```\n```index.html\nB\n```", "```a/../../b.html\n```"]:
        with pytest.raises(ParseError):
            parse_response(bad, {"index.html"})
