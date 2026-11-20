import io
import json
import os
import socket
import unittest
import urllib.error
from unittest import mock

try:
    from . import providers
except ImportError:
    import providers

CFG_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "config", "repair-allocation.json")
with open(CFG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)

PROMPT = ("intro\n<<<INPUT FILE: index.html>>>\n<html>a</html>\n"
          "<<<INPUT FILE: assets/styles.css>>>\nbody{}\n<<<END INPUT>>>\nrest")


class T(unittest.TestCase):
    def test_mock(self):
        with mock.patch.dict(os.environ, {"STUDY_MOCK": "1"}):
            r = providers.complete("A1", PROMPT, CFG)
        self.assertEqual(r["text"], '<<<EVAL>>>\n{"findings":[]}\n<<<FILE: index.html>>>\n'
                         '<html>a</html>\n<<<FILE: assets/styles.css>>>\nbody{}\n<<<END>>>')
        self.assertEqual(set(r), {"text", "usage", "model_version", "latency_ms"})

    def test_anthropic_body(self):
        url, h, b = providers.build_request("A2", "hi", CFG)
        self.assertIn("anthropic", url)
        self.assertEqual(b["temperature"], 0)
        self.assertEqual(b["max_tokens"], 32000)
        self.assertEqual(b["thinking"], {"type": "disabled"})
        self.assertEqual(b["model"], "claude-sonnet-5-5")

    def test_openai_body(self):
        cfg = json.loads(json.dumps(CFG))
        cfg["arms"]["A6"]["base_url"] = "http://localhost:8090/v1/"
        url, h, b = providers.build_request("A6", "hi", cfg)
        self.assertEqual(url, "http://localhost:8090/v1/chat/completions")
        self.assertEqual((b["temperature"], b["max_tokens"], b["top_p"]), (0, 32000, 1))
        self.assertEqual(b["chat_template_kwargs"], {"enable_thinking": False})
        self.assertEqual(b["messages"][0]["content"], "hi")

    def _err(self, exc):
        with mock.patch.dict(os.environ, {"A2_API_KEY": "k", "STUDY_MOCK": "0"}), \
                mock.patch("urllib.request.urlopen", side_effect=exc):
            with self.assertRaises(providers.ProviderError) as c:
                providers.complete("A2", "p", CFG)
        return c.exception.retryable

    def _http(self, code):
        return urllib.error.HTTPError("u", code, "m", {}, io.BytesIO(b""))

    def test_retryability(self):
        for code in (429, 500, 503):
            self.assertTrue(self._err(self._http(code)), code)
        for code in (400, 401, 404):
            self.assertFalse(self._err(self._http(code)), code)
        self.assertTrue(self._err(socket.timeout()))
        self.assertTrue(self._err(urllib.error.URLError("down")))

    def test_parse_anthropic(self):
        data = {"content": [{"type": "text", "text": "x"}],
                "usage": {"input_tokens": 3, "output_tokens": 4}, "model": "m1"}
        r = providers._parse(CFG["arms"]["A2"], data, 5)
        self.assertEqual((r["text"], r["usage"], r["model_version"]),
                         ("x", {"input": 3, "output": 4}, "m1"))


if __name__ == "__main__":
    unittest.main()

class HostedProviderBodyTest(unittest.TestCase):
    def _cfg(self, provider):
        cfg = json.loads(json.dumps(CFG))
        cfg["arms"]["A2"].update(provider=provider, base_url="https://x.test/v1", model_id="m", family="x")
        return cfg

    def test_openai_uses_max_completion_tokens_and_no_template_kwargs(self):
        _, _, b = providers.build_request("A2", "hi", self._cfg("openai"))
        self.assertIn("max_completion_tokens", b)
        self.assertNotIn("max_tokens", b)
        self.assertNotIn("chat_template_kwargs", b)

    def test_gemini_keeps_max_tokens_without_template_kwargs(self):
        _, _, b = providers.build_request("A2", "hi", self._cfg("gemini"))
        self.assertIn("max_tokens", b)
        self.assertNotIn("chat_template_kwargs", b)

    def test_self_hosted_still_disables_thinking(self):
        _, _, b = providers.build_request("A2", "hi", self._cfg("vt-arc-falcon-llamacpp"))
        self.assertEqual(b["chat_template_kwargs"], {"enable_thinking": False})
        self.assertIn("max_tokens", b)

