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
        self.assertEqual(b["max_tokens"], 32000)
        self.assertEqual(b["model"], "claude-sonnet-5-5")
        # claude-sonnet-5-5 rejects temperature and thinking "disabled" (HTTP 400), so neither is sent
        self.assertNotIn("temperature", b)
        self.assertEqual(b["thinking"], {"type": "between_tools"})

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



class ModelAwareAnthropicTest(unittest.TestCase):
    """Each Claude model gets only the settings it accepts; what could not be honoured is recorded."""

    def _cfg(self, model_id):
        cfg = json.loads(json.dumps(CFG))
        cfg["arms"]["A2"]["model_id"] = model_id
        return cfg

    def _body(self, model_id):
        return providers.build_request("A2", "hi", self._cfg(model_id))[2]

    def test_models_that_reject_sampling_and_disabled_thinking(self):
        # claude-opus-5-5 / fable: thinking cannot be disabled -> omitted, effort low; sampling omitted
        for m in ("claude-opus-5-5", "claude-fable-5-2", "claude-mythos-5-2"):
            b = self._body(m)
            self.assertNotIn("temperature", b, m)
            self.assertNotIn("thinking", b, m)
            self.assertEqual(b["output_config"], {"effort": "low"}, m)
        # claude-sonnet-5-5: thinking off is between_tools, no other field
        b = self._body("claude-sonnet-5-5")
        self.assertEqual((b.get("thinking"), "temperature" in b, "output_config" in b), ({"type": "between_tools"}, False, False))

    def test_models_that_accept_disabled_thinking_but_not_sampling(self):
        for m in ("claude-opus-5", "claude-opus-4-8", "claude-opus-4-7", "claude-sonnet-5", "claude-haiku-5-5"):
            b = self._body(m)
            self.assertNotIn("temperature", b, m)
            self.assertEqual(b["thinking"], {"type": "disabled"}, m)
            self.assertNotIn("output_config", b, m)

    def test_specific_ids_win_over_their_prefix(self):
        # "claude-opus-5-5" also starts with "claude-opus-5-"; it must not be treated like claude-opus-5
        self.assertNotIn("thinking", self._body("claude-opus-5-5"))
        self.assertEqual(self._body("claude-opus-5")["thinking"], {"type": "disabled"})
        self.assertNotIn("thinking", self._body("claude-opus-5-5-20261001"))
        self.assertEqual(self._body("claude-sonnet-5-5")["thinking"], {"type": "between_tools"})

    def test_older_and_unknown_models_keep_the_original_request(self):
        for m in ("claude-opus-4-6", "claude-sonnet-4-6", "claude-haiku-4-5", "claude-something-new"):
            b = self._body(m)
            self.assertEqual(b["temperature"], 0, m)
            self.assertEqual(b["thinking"], {"type": "disabled"}, m)
            self.assertEqual(providers.request_deviations("A2", self._cfg(m)), [], m)

    def test_deviations_are_reported(self):
        d = providers.request_deviations("A2", self._cfg("claude-opus-5-5"))
        self.assertEqual(len(d), 2)
        self.assertIn("temperature 0 not sent", d[0])
        self.assertIn("effort low", d[1])
        self.assertEqual(len(providers.request_deviations("A2", self._cfg("claude-opus-5"))), 1)  # sampling only
        self.assertEqual(providers.request_deviations("A6", CFG), [])  # self-hosted arm: nothing changes

    def test_reasoning_not_disabled_sends_no_thinking_setting(self):
        cfg = self._cfg("claude-opus-5-5")
        cfg["held_constant"]["reasoning"] = "enabled"
        b = providers.build_request("A2", "hi", cfg)[2]
        self.assertNotIn("thinking", b)
        self.assertNotIn("output_config", b)
        # only the sampling deviation remains: nothing was asked of thinking, so nothing differs there
        devs = providers.request_deviations("A2", cfg)
        self.assertEqual(len(devs), 1)
        self.assertIn("temperature 0 not sent", devs[0])

    def _ok_response(self, model):
        body = json.dumps({"content": [{"type": "text", "text": "x"}], "model": model,
                           "usage": {"input_tokens": 1, "output_tokens": 2}}).encode()
        resp = mock.MagicMock()
        resp.read.return_value = body
        resp.__enter__.return_value = resp
        return resp

    def test_result_carries_deviations_only_when_there_are_some(self):
        with mock.patch.dict(os.environ, {"A2_API_KEY": "k", "STUDY_MOCK": "0"}):
            with mock.patch("urllib.request.urlopen", return_value=self._ok_response("claude-opus-5-5")):
                r = providers.complete("A2", "p", self._cfg("claude-opus-5-5"))
            self.assertEqual(len(r["request_deviations"]), 2)
            with mock.patch("urllib.request.urlopen", return_value=self._ok_response("claude-opus-4-6")):
                r = providers.complete("A2", "p", self._cfg("claude-opus-4-6"))
            self.assertEqual(set(r), {"text", "usage", "model_version", "latency_ms"})

    def test_the_request_actually_sent_matches_the_model(self):
        sent = {}

        def fake(req, timeout=None):
            sent["body"] = json.loads(req.data)
            return self._ok_response("claude-sonnet-5-5")

        with mock.patch.dict(os.environ, {"A2_API_KEY": "k", "STUDY_MOCK": "0"}), mock.patch("urllib.request.urlopen", side_effect=fake):
            providers.complete("A2", "p", self._cfg("claude-sonnet-5-5"))
        self.assertNotIn("temperature", sent["body"])
        self.assertEqual(sent["body"]["thinking"], {"type": "between_tools"})


class ProviderErrorMessageTest(unittest.TestCase):
    def _fail(self, code, body):
        err = urllib.error.HTTPError("u", code, "m", {}, io.BytesIO(body))
        with mock.patch.dict(os.environ, {"A2_API_KEY": "k", "STUDY_MOCK": "0"}), \
                mock.patch("urllib.request.urlopen", side_effect=err):
            with self.assertRaises(providers.ProviderError) as c:
                providers.complete("A2", "p", CFG)
        return c.exception

    def test_anthropic_error_message_is_kept(self):
        body = json.dumps({"type": "error", "error": {"type": "invalid_request_error",
                           "message": "temperature: not supported for this model"}}).encode()
        e = self._fail(400, body)
        self.assertEqual(str(e), "HTTP 400: temperature: not supported for this model")
        self.assertFalse(e.retryable)

    def test_empty_or_non_json_body_keeps_the_plain_status(self):
        self.assertEqual(str(self._fail(400, b"")), "HTTP 400")
        self.assertEqual(str(self._fail(502, b"<html>bad gateway</html>")), "HTTP 502: <html>bad gateway</html>")
        self.assertTrue(self._fail(502, b"x").retryable)
        self.assertTrue(self._fail(429, b"{}").retryable)

    def test_message_is_trimmed_and_key_lookalikes_are_scrubbed(self):
        body = json.dumps({"error": {"message": "bad key sk-ant-api03-ABCDEFGH123456 " + "x" * 600}}).encode()
        msg = str(self._fail(401, body))
        self.assertNotIn("ABCDEFGH123456", msg)
        self.assertLessEqual(len(msg), len("HTTP 401: ") + 300)
