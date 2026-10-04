"""J003 browser/evaluator tests: run real Chromium + vendored axe on fixtures/demo (copied; never mutated)."""
import shutil
from pathlib import Path

import pytest

from uirepairgym.paths import tree_hash
from uirepairgym.schemas import BrowserConfig, Evaluation, FixtureManifest

ROOT = Path(__file__).resolve().parents[2]
FIXTURE = FixtureManifest.model_validate_json((ROOT / "fixtures/demo.manifest.json").read_text())
SITE = ROOT / "fixtures/demo"


def _chromium_ok() -> str:
    try:
        from playwright.sync_api import sync_playwright
        from uirepairgym.browser.launch import launch_chromium
        with sync_playwright() as pw:
            launch_chromium(pw).close()
        return ""
    except Exception as e:  # noqa: BLE001
        return f"Chromium cannot be launched: {str(e).splitlines()[0]}"


_WHY = _chromium_ok()
pytestmark = pytest.mark.skipif(bool(_WHY), reason=_WHY or "chromium available")

from uirepairgym.evaluators import evaluate  # noqa: E402


@pytest.fixture(scope="module")
def pristine(tmp_path_factory):
    out = tmp_path_factory.mktemp("eval")
    before = tree_hash(SITE)
    ev = evaluate(SITE, FIXTURE, out, BrowserConfig())
    return ev, out, before


def _rules(ev):
    return {r.id for r in ev.axe.violations}


def test_artifacts_written_and_valid(pristine):
    ev, out, before = pristine
    shot = out / ev.screenshot_path
    data = shot.read_bytes()
    assert len(data) > 1000 and data[:8] == b"\x89PNG\r\n\x1a\n"
    assert (out / ev.axe.raw_path).stat().st_size > 0
    assert (out / "evaluation.json").exists()
    Evaluation.model_validate_json((out / "evaluation.json").read_text())
    Evaluation.model_validate(ev.model_dump())
    assert ev.axe.axe_version == "4.13.0" == ev.browser.axe_version
    assert ev.browser.browser_version
    assert ev.nielsen.status == "unavailable"
    assert ev.nielsen.reason == "no usability evaluator implemented"


def test_site_dir_unchanged(pristine):
    ev, out, before = pristine
    assert tree_hash(SITE) == before == FIXTURE.content_hash


def test_axe_detects_documented_defects(pristine):
    ev, _, _ = pristine
    found = _rules(ev)
    for rule in ["html-has-lang", "image-alt", "color-contrast"]:
        assert rule in found, f"{rule} not detected; found {sorted(found)}"
    assert found & {"landmark-one-main", "region"}, "no landmark-ish rule detected"
    s = ev.axe.summary
    assert s.violation_rules == len(ev.axe.violations)
    assert s.violation_nodes == sum(len(r.nodes) for r in ev.axe.violations) >= s.violation_rules
    assert sum(s.by_impact.values()) == s.violation_nodes


def test_report_documented_defects_axe_misses(pristine, capsys):
    """Finding, not failure: documented defects that axe 4.13.0 does not flag on the pristine fixture."""
    ev, _, _ = pristine
    found = _rules(ev)
    expected = {
        "no lang": "html-has-lang", "landmarks": "region", "heading order": "heading-order",
        "img alt": "image-alt", "unlabeled inputs": "label", "contrast": "color-contrast",
        "non-descriptive link text": "link-name", "skip link": "bypass",
    }
    missed = {k: v for k, v in expected.items() if v not in found}
    with capsys.disabled():
        print(f"\n[J003 finding] axe violation rules: {sorted(found)}")
        print(f"[J003 finding] documented defects NOT detected by axe: {missed}")
    assert isinstance(missed, dict)


def test_task_and_keyboard(pristine):
    ev, _, _ = pristine
    t = ev.task
    assert t.completed is True and t.error is None
    c = {x.name: x for x in t.checks}
    assert c["keyboard_reachable"].status == "pass"
    assert c["focus_visible"].status == "fail"
    assert "NO visible change" in c["focus_visible"].detail
    assert t.preserved_text_missing == []
    assert t.console_errors == [] and t.page_errors == []


def test_deterministic_summary(pristine, tmp_path):
    ev, _, _ = pristine
    ev2 = evaluate(SITE, FIXTURE, tmp_path, BrowserConfig())
    assert ev2.axe.summary == ev.axe.summary
    assert [r.id for r in ev2.axe.violations] == [r.id for r in ev.axe.violations]


def test_broken_copy_task_fails(tmp_path):
    site = tmp_path / "site"
    shutil.copytree(SITE, site)
    html = site / "index.html"
    html.write_text(html.read_text().replace(
        '  <div id="thanks" class="thanks">Thank you! Check your inbox for the sign-up link.</div>\n', ""))
    assert "id=\"thanks\"" not in html.read_text()
    ev = evaluate(site, FIXTURE, tmp_path / "out", BrowserConfig())
    assert ev.task.completed is False
    assert ev.task.error is None
    assert "Thank you! Check your inbox for the sign-up link." in ev.task.preserved_text_missing


def test_step_error_is_error_not_pass(tmp_path):
    site = tmp_path / "site"
    shutil.copytree(SITE, site)
    html = site / "index.html"
    html.write_text(html.read_text().replace('id="email"', 'id="mail"'))
    fx = FIXTURE.model_copy(deep=True)
    ev = evaluate(site, fx, tmp_path / "out", BrowserConfig(timeout_ms=1500))
    assert ev.task.completed is None
    assert ev.task.error and "failed" in ev.task.error
    assert any(c.status == "error" for c in ev.task.checks)


def test_missing_entrypoint_is_error(tmp_path):
    ev = evaluate(tmp_path, FIXTURE, tmp_path / "out", BrowserConfig())
    assert ev.axe is None and ev.axe_error and ev.task.completed is None
