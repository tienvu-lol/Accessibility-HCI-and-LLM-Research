import json, subprocess, sys
from pathlib import Path
import pytest
from pydantic import ValidationError
from uirepairgym.schemas import FixtureManifest, RunManifest, Evaluation, NielsenFinding
from uirepairgym.paths import tree_hash

ROOT = Path(__file__).resolve().parents[1]


def test_example_bundle_validates():
    RunManifest.model_validate_json((ROOT / "examples/run-example/manifest.json").read_text())


def test_fixture_manifest_hash_matches_files():
    m = FixtureManifest.model_validate_json((ROOT / "fixtures/demo.manifest.json").read_text())
    assert tree_hash(ROOT / "fixtures/demo") == m.content_hash


def test_mode_required_and_validated():
    d = json.loads((ROOT / "examples/run-example/manifest.json").read_text())
    d["mode"] = "bogus"
    with pytest.raises(ValidationError):
        RunManifest.model_validate(d)
    del d["mode"]
    with pytest.raises(ValidationError):
        RunManifest.model_validate(d)


def test_missing_scores_are_null_not_zero():
    assert NielsenFinding(heuristic="H1").severity is None
    with pytest.raises(ValidationError):
        NielsenFinding(heuristic="H1", severity=5)


def test_extra_fields_rejected():
    with pytest.raises(ValidationError):
        Evaluation.model_validate({"html_hash": "x", "browser": {}, "bogus": 1})


def test_schemas_in_repo_are_current(tmp_path):
    subprocess.run([sys.executable, "-m", "uirepairgym", "schema", "--out", str(tmp_path)], check=True, capture_output=True)
    for f in tmp_path.glob("*.json"):
        assert (ROOT / "schemas" / f.name).read_text() == f.read_text()


def test_cli_help():
    assert subprocess.run([sys.executable, "-m", "uirepairgym", "--help"], capture_output=True).returncode == 0
