import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
# Prefer this checkout's sources over any editable install pointing elsewhere.
sys.path.insert(0, str(ROOT / "src"))

import pytest  # noqa: E402
from uirepairgym.schemas import (AxeNode, AxeReport, AxeRule, AxeSummary, CheckResult, Evaluation,  # noqa: E402
                                 TaskReport)
from uirepairgym.runner.config import RunConfig  # noqa: E402

FAKE_KEY = "sk-ant-FAKEKEY-0123456789abcdef"


def stub_evaluate(site_dir, fixture, out_dir, browser):
    """Schema-valid stand-in for Worker A's evaluator. Marked in html_hash prefix-free; never touches Chromium."""
    site_dir, out_dir = Path(site_dir), Path(out_dir)
    html = (site_dir / fixture.entrypoint).read_text()
    viol = []
    if "lang=" not in html:
        viol.append(AxeRule(id="html-has-lang", impact="serious", help="<html> element must have a lang attribute",
                            nodes=[AxeNode(target=["html"], html="<html>")]))
    if "<img" in html and "alt=" not in html:
        viol.append(AxeRule(id="image-alt", impact="critical", help="Images must have alternate text",
                            nodes=[AxeNode(target=["img"], html="<img src=hero.svg>")]))
    (out_dir / "screenshot.png").write_bytes(b"\x89PNG stub")
    (out_dir / "axe.json").write_text(json.dumps({"stub": True}))
    return Evaluation(
        html_hash="a" * 64, browser=browser, screenshot_path="screenshot.png",
        axe=AxeReport(axe_version="4.13.0", raw_path="axe.json",
                      summary=AxeSummary(violation_rules=len(viol), violation_nodes=len(viol), incomplete_rules=0,
                                         incomplete_nodes=0, passes_rules=5),
                      violations=viol, incomplete=[], passes=["document-title"]),
        task=TaskReport(task_id=fixture.task.id, completed=False,
                        checks=[CheckResult(name="keyboard-focus-visible", status="fail", detail="outline removed")]),
    )


@pytest.fixture
def evaluate():
    return stub_evaluate


@pytest.fixture
def make_cfg(tmp_path):
    def _make(**over):
        d = {"fixture_manifest": str(ROOT / "fixtures/demo.manifest.json"),
             "fixture_dir": str(ROOT / "fixtures/demo"),
             "mode": "mock", "provider": {"name": "mock"}, "runs_dir": str(tmp_path / "runs"),
             "max_iterations": 2, "budget": {"max_calls": 3}}
        d.update(over)
        return RunConfig.model_validate(d)
    return _make


@pytest.fixture
def fixture_copy(tmp_path):
    """Writable copy of manifest+fixture for tests that deliberately stress immutability."""
    dst = tmp_path / "fx"
    dst.mkdir()
    shutil.copytree(ROOT / "fixtures/demo", dst / "demo")
    shutil.copy(ROOT / "fixtures/demo.manifest.json", dst / "demo.manifest.json")
    return dst
