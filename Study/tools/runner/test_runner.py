import hashlib
import importlib
import json
import os
import re
import shutil
import sys
import tempfile
import types
import unittest
from html.parser import HTMLParser
from pathlib import Path
from unittest import mock

STUDY = Path(__file__).resolve().parents[2]


def _install_contract_stubs():
    """Stand-ins for C3/C4 when those packets are not merged yet; real modules win."""
    pkg = __package__ or ""
    for name in ("guards", "providers"):
        try:
            importlib.import_module(f"{pkg}.{name}" if pkg else name)
        except ImportError:
            break
    else:
        return

    class ParseError(Exception):
        pass

    class ProviderError(Exception):
        def __init__(self, msg, retryable=False):
            super().__init__(msg)
            self.retryable = retryable

    class _Text(HTMLParser):
        def __init__(self):
            super().__init__()
            self.skip, self.n = 0, 0

        def handle_starttag(self, tag, attrs):
            self.skip += tag in ("script", "style")

        def handle_endtag(self, tag):
            self.skip -= tag in ("script", "style")

        def handle_data(self, data):
            if not self.skip:
                self.n += len(" ".join(data.split()))

    def text_chars(html):
        p = _Text()
        p.feed(html)
        return p.n

    def normalize_hash(files):
        parts = []
        for path in sorted(files):
            t = re.sub(r"<!--.*?-->|/\*.*?\*/", "", files[path], flags=re.S)
            parts.append(path + "\0" + " ".join(t.split()))
        return hashlib.sha256("\0".join(parts).encode()).hexdigest()

    def parse_response(text):
        m = re.match(r"<<<EVAL>>>\n(.*?)\n<<<FILE: ", text, re.S)
        if not m or not text.rstrip().endswith("<<<END>>>"):
            raise ParseError("bad format")
        files = dict(re.findall(r"<<<FILE: (.+?)>>>\n(.*?)\n(?=<<<FILE:|<<<END>>>)", text, re.S))
        return {"findings": json.loads(m.group(1))["findings"], "files": files}

    def check_truncation(out, inp):
        if any(p.endswith(".html") and not t.rstrip().endswith("</html>") for p, t in out.items()):
            return False, "missing </html>"
        tc = lambda fs: sum(text_chars(t) for p, t in fs.items() if p.endswith(".html"))
        return (tc(out) >= 0.5 * tc(inp), "text ratio")

    def complete(arm, prompt, cfg):
        if os.environ.get("STUDY_MOCK") != "1":
            raise ProviderError("no network in stub", False)
        blocks = re.findall(r"<<<INPUT FILE: (.+?)>>>\n(.*?)\n(?=<<<INPUT FILE:|<<<END INPUT>>>)", prompt, re.S)
        body = "".join(f"<<<FILE: {p}>>>\n{c}\n" for p, c in blocks)
        return {"text": f'<<<EVAL>>>\n{{"findings":[]}}\n{body}<<<END>>>',
                "usage": {"input": 1, "output": 1}, "model_version": "mock", "latency_ms": 1}

    for name, attrs in (
        ("guards", dict(ParseError=ParseError, parse_response=parse_response, text_chars=text_chars,
                        normalize_hash=normalize_hash, check_truncation=check_truncation)),
        ("providers", dict(ProviderError=ProviderError, complete=complete)),
    ):
        mod = types.ModuleType(f"{pkg}.{name}" if pkg else name)
        mod.__dict__.update(attrs)
        sys.modules[mod.__name__] = mod
        if pkg:
            setattr(sys.modules[pkg], name, mod)


_install_contract_stubs()

if __package__:
    from . import providers, runner
else:
    import providers
    import runner

SITES = ["UNI-01", "PORT-03"]


def c2(files):
    body = "".join(f"<<<FILE: {p}>>>\n{t}\n" for p, t in files.items())
    return f'<<<EVAL>>>\n{{"findings":[]}}\n{body}<<<END>>>'


class RunnerTest(unittest.TestCase):
    def setUp(self):
        self.root = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, self.root, True)
        for d in ("prompts", "criteria", "config"):
            shutil.copytree(STUDY / d, self.root / d)
        (self.root / "sample").mkdir()
        shutil.copy(STUDY / "sample" / "sites.csv", self.root / "sample" / "sites.csv")
        for s in SITES:
            shutil.copytree(STUDY / "baseline" / s, self.root / "baseline" / s)
        self.cfg = json.loads((self.root / "config" / "repair-allocation.json").read_text(encoding="utf-8"))
        env = mock.patch.dict(os.environ, {"STUDY_MOCK": "1"})
        env.start()
        self.addCleanup(env.stop)

    def run_cli(self, conditions="wcag,both", max_iter="3"):
        runner.main(["--arms", "A1", "--conditions", conditions, "--sites", ",".join(SITES),
                     "--root", str(self.root), "--max-iter", max_iter])

    def cell(self, cond, site):
        return self.root / "runs" / "A1" / cond / site

    def status(self, cond, site, n):
        return json.loads((self.cell(cond, site) / f"iter{n}" / "status.json").read_text(encoding="utf-8"))

    def test_mock_converges_at_iter2(self):
        self.run_cli()
        for cond in ("wcag", "both"):
            for site in SITES:
                s1, s2 = self.status(cond, site, 1), self.status(cond, site, 2)
                self.assertEqual((s1["status"], s1["converged"], s1["prev_hash"]), ("ok", False, None))
                self.assertEqual((s2["status"], s2["converged"]), ("ok", True))
                self.assertEqual(s2["prev_hash"], s1["hash"])
                self.assertEqual(s1["model_id"], "claude-opus-5-5")
                self.assertGreater(s1["text_chars"], 0)
                self.assertFalse((self.cell(cond, site) / "iter3").exists())
                rels = {"UNI-01": "css/styles.css", "PORT-03": "assets/styles.css"}[site]
                self.assertTrue((self.cell(cond, site) / "iter1" / rels).is_file())
                raw = json.loads((self.cell(cond, site) / "iter1" / "response.json").read_text(encoding="utf-8"))
                self.assertEqual(set(raw), {"raw", "usage", "latency_ms", "model_version"})

    def test_request_deviations_are_recorded_with_the_iteration(self):
        real, note = providers.complete, ["temperature 0 not sent: claude-opus-5-5 rejects sampling parameters"]

        def with_deviation(arm, prompt, cfg):
            out = real(arm, prompt, cfg)
            out["request_deviations"] = note
            return out

        with mock.patch.object(providers, "complete", with_deviation):
            self.run_cli(conditions="wcag", max_iter="1")
        self.assertEqual(self.status("wcag", "UNI-01", 1)["request_deviations"], note)
        raw = json.loads((self.cell("wcag", "UNI-01") / "iter1" / "response.json").read_text(encoding="utf-8"))
        self.assertEqual(raw["request_deviations"], note)

    def test_no_deviation_field_when_the_request_matched_the_study_settings(self):
        self.run_cli(conditions="wcag", max_iter="1")
        self.assertNotIn("request_deviations", self.status("wcag", "UNI-01", 1))

    def test_rerun_skips_ok(self):
        self.run_cli()
        with mock.patch.object(runner.providers, "complete", side_effect=AssertionError("called")):
            self.run_cli()

    def test_prompt_from_template_and_criteria(self):
        seen = []
        real = runner.providers.complete

        def spy(arm, prompt, cfg):
            seen.append(prompt)
            return real(arm, prompt, cfg)

        with mock.patch.object(runner.providers, "complete", spy):
            runner.run_cell("A1", "both", runner.load_sites(self.root)["PORT-03"], self.cfg, self.root, 1)
        p = seen[0]
        self.assertIn("static portfolio website", p)
        self.assertIn('"num"', p)  # wcag criteria JSON substituted
        self.assertIn("H5", p)  # nielsen criteria JSON substituted
        self.assertIn("<<<INPUT FILE: assets/styles.css>>>", p)
        self.assertIn((self.root / "baseline/PORT-03/contact.html").read_text(encoding="utf-8"), p)
        self.assertIsNone(re.search(r"\{\{\w+\}\}", p))

    def test_truncated_retried_then_failed_and_not_kept(self):
        site = runner.load_sites(self.root)["UNI-01"]
        files = runner.read_files(self.root / "baseline" / "UNI-01", site["slice_files"].split(";"))
        cut = dict(files, **{"index.html": files["index.html"].replace("</html>", "")})
        resp = {"text": c2(cut), "usage": {"input": 1, "output": 1}, "model_version": "v", "latency_ms": 5}
        with mock.patch.object(runner.providers, "complete", return_value=resp) as m, \
                mock.patch.object(runner.time, "sleep") as slp:
            runner.run_cell("A1", "wcag", site, self.cfg, self.root, 3)
        self.assertEqual(m.call_count, 3)  # 1 try + 2 retries
        self.assertEqual(slp.call_count, 2)
        st = self.status("wcag", "UNI-01", 1)
        self.assertEqual((st["status"], st["attempts"]), ("failed", 3))
        self.assertEqual(sorted(p.name for p in (self.cell("wcag", "UNI-01") / "iter1").iterdir()),
                         ["response.json", "status.json"])
        self.assertFalse((self.cell("wcag", "UNI-01") / "iter2").exists())

    def test_failed_iteration_is_retried_on_rerun(self):
        site = runner.load_sites(self.root)["UNI-01"]
        err = runner.providers.ProviderError("boom", False)
        with mock.patch.object(runner.providers, "complete", side_effect=err) as m:
            runner.run_cell("A1", "wcag", site, self.cfg, self.root, 3)
        self.assertEqual(m.call_count, 1)  # non-retryable: no retries
        self.assertEqual(self.status("wcag", "UNI-01", 1)["status"], "failed")
        runner.run_cell("A1", "wcag", site, self.cfg, self.root, 3)
        self.assertEqual(self.status("wcag", "UNI-01", 1)["status"], "ok")


if __name__ == "__main__":
    unittest.main()
