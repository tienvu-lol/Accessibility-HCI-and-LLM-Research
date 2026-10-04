"""J005 report tests. Structural checks need no browser; the axe-on-report gate runs only if Chromium launches."""
from __future__ import annotations

import glob
import json
import os
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

import pytest

from uirepairgym.reporting import build_report, compute_delta, render_report
from uirepairgym.schemas import RunManifest

ROOT = Path(__file__).resolve().parents[2]
EXAMPLE = ROOT / "examples" / "run-example"
AXE_JS = ROOT / "src" / "uirepairgym" / "evaluators" / "vendor" / "axe.min.js"
XSS = '<script>alert("x")</script><img src=x onerror=alert(1)>'


class Structure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.headings: list[int] = []
        self.imgs: list[dict] = []
        self.links: list[str] = []
        self.scripts = 0
        self.title = ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.headings.append(int(tag[1]))
        if tag == "img":
            self.imgs.append(a)
        if tag == "script":
            self.scripts += 1
        if tag == "title":
            self._in_title = True
        for k in ("href", "src"):
            if tag in {"a", "img", "link", "script"} and a.get(k):
                self.links.append(a[k])

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def parse(html: str) -> Structure:
    p = Structure()
    p.feed(html)
    return p


def _bundle(tmp_path: Path) -> Path:
    dst = tmp_path / "run"
    shutil.copytree(EXAMPLE, dst)
    return dst


def _mutate(run: Path, fn) -> None:
    m = json.loads((run / "manifest.json").read_text())
    fn(m)
    (run / "manifest.json").write_text(json.dumps(m))


@pytest.fixture
def built(tmp_path):
    out = tmp_path / "out" / "index.html"
    build_report(EXAMPLE, out)
    return out, out.read_text(encoding="utf-8")


def test_example_builds_with_mock_banner(built):
    out, html = built
    assert out.is_file()
    assert "Run mode: MOCK" in html
    assert "cannot satisfy the live-demo gate" in html
    assert "not measurements" in html
    assert "example-mock-0001" in html
    assert "PASS: fixture hash after the run equals" in html
    assert "none (mock)" in html
    assert "unknown" in html  # usage tokens/latency/cost not recorded
    assert "Unavailable: no usability evaluator implemented" in html
    assert "partial automated evidence" in html and "One run is not a benchmark finding" in html


def test_structure(built):
    _, html = built
    s = parse(html)
    assert html.lower().startswith("<!doctype html>")
    assert s.lang == "en"
    assert s.title.strip()
    assert s.headings.count(1) == 1 and s.headings[0] == 1
    for prev, cur in zip(s.headings, s.headings[1:]):
        assert cur <= prev + 1, f"heading level skip {prev}->{cur}"
    assert s.imgs and all(i.get("alt", "").strip() for i in s.imgs)
    assert s.scripts == 0  # no JS required


def test_relative_links_resolve(built):
    out, html = built
    s = parse(html)
    checked = 0
    for ref in s.links:
        u = urlparse(ref)
        if u.scheme or ref.startswith("#"):
            continue
        assert not ref.startswith("/")
        assert (out.parent / unquote(u.path)).is_file(), ref
        checked += 1
    assert checked >= 6  # screenshots, manifest, prompt, response, diff
    for name in ("manifest.json",):
        assert (out.parent / "assets" / name).is_file()
    assert (out.parent / "assets/iterations/1/prompt.txt").is_file()


def test_report_folder_relocatable(built, tmp_path):
    out, _ = built
    moved = tmp_path / "moved"
    shutil.copytree(out.parent, moved)
    s = parse((moved / "index.html").read_text())
    for ref in s.links:
        if not urlparse(ref).scheme and not ref.startswith("#"):
            assert (moved / unquote(urlparse(ref).path)).is_file()


def test_delta_helper():
    assert compute_delta(3, 1) == "-2"
    assert compute_delta(1, 3) == "+2"
    assert compute_delta(2, 2) == "no change (0)"
    assert compute_delta(None, 1) == "not available"
    assert compute_delta(1, None) == "not available"
    assert compute_delta(None, None) == "not available"


def test_delta_not_available_when_count_none(tmp_path):
    m = RunManifest.model_validate_json((EXAMPLE / "manifest.json").read_text())
    # Pydantic would reject None in these int fields on load; construct directly to simulate an absent count.
    m.iterations[1].evaluation.axe.summary = m.iterations[1].evaluation.axe.summary.model_construct(
        violation_rules=None, violation_nodes=1, incomplete_rules=0, incomplete_nodes=0, passes_rules=10, by_impact={})
    out = render_report(m, EXAMPLE, tmp_path / "o" / "index.html")
    html = out.read_text()
    row = re.search(r"<th scope=\"row\">Violation rules</th><td>3</td><td>not available</td><td>not available</td>", html)
    assert row, "None count must render 'not available' for current and change"
    assert "<td>-4</td>" in html  # violation nodes 5 -> 1 still computed from present numbers
    assert "<td>0</td><td>not available" not in html


def test_missing_axe_is_not_zero(tmp_path):
    run = _bundle(tmp_path)

    def f(m):
        m["iterations"][1]["evaluation"]["axe"] = None
        m["iterations"][1]["evaluation"]["axe_error"] = "axe injection failed"

    _mutate(run, f)
    html = build_report(run, tmp_path / "o" / "index.html").read_text()
    assert "Axe results are not available" in html and "axe injection failed" in html
    assert re.search(r"Violation nodes</th><td>5</td><td>not available</td><td>not available</td>", html)


def test_xss_escaped(tmp_path):
    run = _bundle(tmp_path)

    def f(m):
        ev = m["iterations"][1]["evaluation"]
        ev["axe"]["violations"][0]["nodes"][0]["html"] = XSS
        ev["axe"]["violations"][0]["help"] = XSS
        ev["task"]["checks"][0]["detail"] = XSS
        ev["task"]["console_errors"] = [XSS]
        ev["nielsen"] = {"status": "provisional_unvalidated", "judge": XSS,
                         "findings": [{"heuristic": "H1", "severity": 2, "applicable": True, "evidence": XSS}]}
        m["iterations"][1]["model_call"]["provider"] = XSS
        m["iterations"][1]["model_call"]["error"] = XSS
        m["iterations"][1]["model_call"]["request_params"] = {"k": XSS}
        m["notes"].append(XSS)

    _mutate(run, f)
    (run / "iterations/1/diff.patch").write_text(f"--- a\n+++ b\n@@\n-old\n+{XSS}\n")
    html = build_report(run, tmp_path / "o" / "index.html").read_text()
    assert "<script" not in html.lower()
    assert "<img src=x" not in html
    assert "&lt;script&gt;" in html
    assert "UNVALIDATED LLM RATING" in html
    s = parse(html)
    assert s.scripts == 0 and all(i.get("src", "").startswith(("assets/", "data:")) for i in s.imgs)


def test_diff_styling(built):
    _, html = built
    assert '<span class="del">-&lt;html&gt;</span>' in html
    assert '<span class="add">+&lt;html lang=&#34;en&#34;&gt;</span>' in html


def test_missing_screenshot_and_artifacts(tmp_path):
    run = _bundle(tmp_path)
    (run / "iterations/1/screenshot.png").unlink()
    (run / "iterations/1/response.txt").unlink()
    (run / "iterations/1/diff.patch").unlink()
    html = build_report(run, tmp_path / "o" / "index.html").read_text()
    assert "Screenshot missing: file not found" in html
    assert "Raw model response missing" in html
    assert "Source diff missing" in html
    s = parse(html)
    for ref in s.links:
        if not urlparse(ref).scheme and not ref.startswith("#"):
            assert (tmp_path / "o" / unquote(urlparse(ref).path)).is_file()


def test_path_traversal_refused(tmp_path):
    run = _bundle(tmp_path)
    (tmp_path / "secret.txt").write_text("TOP-SECRET")

    def f(m):
        m["iterations"][1]["diff_path"] = "../secret.txt"
        m["iterations"][1]["model_call"]["prompt_path"] = "/etc/hostname"

    _mutate(run, f)
    out = tmp_path / "o" / "index.html"
    html = build_report(run, out).read_text()
    assert "TOP-SECRET" not in html
    assert not list((tmp_path / "o").rglob("secret.txt"))
    assert "path outside run directory" in html and "absolute path not allowed" in html


def test_modes_and_immutability_fail(tmp_path):
    for mode, text in (("live", "Run mode: LIVE"), ("replay", "Run mode: REPLAY")):
        run = _bundle(tmp_path / mode)
        _mutate(run, lambda m, mode=mode: m.update(mode=mode, fixture_hash_after="0" * 64))
        html = build_report(run, tmp_path / mode / "o.html").read_text()
        assert text in html and "cannot satisfy the live-demo gate" not in html
        assert "FAIL: fixture hash after the run differs" in html


def test_cli_module(tmp_path):
    from uirepairgym.reporting.__main__ import main
    out = tmp_path / "r" / "x.html"
    main([str(EXAMPLE), "--out", str(out)])
    assert out.is_file()


def _chromium() -> str | None:
    env = os.environ.get("UIREPAIRGYM_CHROMIUM_PATH")
    cands = [env] if env else []
    cands += sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))
    return next((c for c in cands if c and Path(c).is_file()), None)


def test_axe_zero_violations_on_report(built, tmp_path):
    pw = pytest.importorskip("playwright.sync_api")
    exe = _chromium()
    if not exe or not AXE_JS.is_file():
        pytest.skip("Chromium or vendored axe not available")
    out, _ = built
    try:
        with pw.sync_playwright() as p:
            browser = p.chromium.launch(executable_path=exe, args=["--no-sandbox"])
            results = {}
            for name, size in (("desktop", {"width": 1280, "height": 900}), ("mobile", {"width": 375, "height": 700})):
                page = browser.new_page(viewport=size)
                page.goto(out.resolve().as_uri())
                page.screenshot(path=f"/tmp/report-{name}.png", full_page=True)
                # open all <details> so hidden content is checked as well
                page.evaluate("document.querySelectorAll('details').forEach(d => d.open = true)")
                page.add_script_tag(path=str(AXE_JS))
                results[name] = page.evaluate("axe.run(document).then(r => r.violations.map(v => ({id: v.id, nodes: v.nodes.map(n => n.target)})))")
                overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                assert overflow <= 0, f"horizontal page scroll at {name} width: {overflow}px"
            browser.close()
    except Exception as e:  # browser cannot launch in this environment
        if type(e).__name__ in {"Error", "TimeoutError"} and "launch" in str(e).lower():
            pytest.skip(f"Chromium could not launch: {e}")
        raise
    assert results == {"desktop": [], "mobile": []}, results
