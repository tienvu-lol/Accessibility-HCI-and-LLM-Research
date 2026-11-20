"""C3 provider interface: mock, Anthropic Messages, OpenAI-compatible (stdlib only)."""
import json
import os
import re
import socket
import time
import urllib.error
import urllib.request

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
TIMEOUT_S = 900


class ProviderError(Exception):
    def __init__(self, msg, retryable=False):
        super().__init__(msg)
        self.retryable = retryable


def _is_anthropic(arm_cfg):
    return arm_cfg.get("provider") == "anthropic" or (
        arm_cfg.get("provider") in (None, "TBD") and arm_cfg.get("family") == "claude")


def _mock(prompt):
    m = re.search(r"<<<INPUT FILE: [^>]*>>>.*?(?=<<<END INPUT>>>)", prompt, re.S)
    body = m.group(0) if m else ""
    parts = re.split(r"<<<INPUT FILE: ([^>]*)>>>\n?", body)
    out = ["<<<EVAL>>>", '{"findings":[]}']
    for path, content in zip(parts[1::2], parts[2::2]):
        out.append("<<<FILE: %s>>>" % path.strip())
        out.append(content.rstrip("\n"))
    out.append("<<<END>>>")
    text = "\n".join(out)
    return {"text": text, "usage": {"input": len(prompt) // 4, "output": len(text) // 4},
            "model_version": "mock", "latency_ms": 0}


def build_request(arm, prompt, cfg, api_key="KEY"):
    """Return (url, headers, body dict) from config only; sends nothing."""
    hc = cfg["held_constant"]
    a = cfg["arms"][arm]
    if _is_anthropic(a):
        body = {"model": a["model_id"], "max_tokens": hc["max_tokens"],
                "temperature": hc["temperature"],
                "messages": [{"role": "user", "content": prompt}]}
        if hc["reasoning"] == "disabled":
            body["thinking"] = {"type": "disabled"}
        headers = {"x-api-key": api_key, "anthropic-version": "2023-06-01",
                   "content-type": "application/json"}
        return a.get("base_url") or ANTHROPIC_URL, headers, body
    hosted = a.get("provider") in ("openai", "gemini")
    # OpenAI chat models reject max_tokens; hosted APIs reject the llama.cpp-only chat_template_kwargs
    limit = "max_completion_tokens" if a.get("provider") == "openai" else "max_tokens"
    body = {"model": a["model_id"], limit: hc["max_tokens"],
            "temperature": hc["temperature"], "top_p": hc["top_p"],
            "messages": [{"role": "user", "content": prompt}]}
    if hc["reasoning"] == "disabled" and not hosted:
        body["chat_template_kwargs"] = {"enable_thinking": False}
    headers = {"authorization": "Bearer " + api_key, "content-type": "application/json"}
    return (a["base_url"] or "").rstrip("/") + "/chat/completions", headers, body


def _parse(a, data, latency):
    try:
        u = data.get("usage", {})
        if _is_anthropic(a):
            text = "".join(b.get("text", "") for b in data["content"] if b.get("type") == "text")
            usage = {"input": u.get("input_tokens", 0), "output": u.get("output_tokens", 0)}
        else:
            text = data["choices"][0]["message"]["content"] or ""
            usage = {"input": u.get("prompt_tokens", 0), "output": u.get("completion_tokens", 0)}
    except (KeyError, IndexError, TypeError, AttributeError) as e:
        raise ProviderError("malformed provider response: %r" % e, retryable=False)
    return {"text": text, "usage": usage,
            "model_version": data.get("model") or a.get("model_version", ""),
            "latency_ms": latency}


def complete(arm, prompt, cfg):
    if os.environ.get("STUDY_MOCK") == "1":
        return _mock(prompt)
    a = cfg["arms"][arm]
    key = os.environ.get(a.get("api_key_env", ""))
    if not key:
        raise ProviderError("missing API key env %s" % a.get("api_key_env"), retryable=False)
    url, headers, body = build_request(arm, prompt, cfg, key)
    if not url.startswith("http"):
        raise ProviderError("no usable base_url for arm %s" % arm, retryable=False)
    req = urllib.request.Request(url, json.dumps(body).encode(), headers, method="POST")
    t0 = time.monotonic()
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_S) as r:
            data = json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ProviderError("HTTP %d" % e.code, retryable=(e.code == 429 or e.code >= 500))
    except (socket.timeout, TimeoutError) as e:
        raise ProviderError("timeout: %s" % e, retryable=True)
    except urllib.error.URLError as e:
        raise ProviderError("network error: %s" % e.reason, retryable=True)
    except ValueError as e:
        raise ProviderError("invalid JSON from provider: %s" % e, retryable=True)
    return _parse(a, data, int((time.monotonic() - t0) * 1000))
