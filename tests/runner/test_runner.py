import json
from pathlib import Path

import pytest

from conftest import FAKE_KEY, ROOT
from uirepairgym.interfaces import RepairResponse
from uirepairgym.paths import tree_hash
from uirepairgym.providers import MockProvider, ProviderError
from uirepairgym.runner import ConfigError, load_config, run_experiment
from uirepairgym.runner import core
from uirepairgym.schemas import ModelCall, RunManifest

FIXTURE = ROOT / "fixtures/demo"


def run(cfg, evaluate, **kw):
    return run_experiment(cfg, ROOT, evaluate_fn=evaluate, env=kw.pop("env", {}), **kw)


class Scripted:
    """Provider returning a canned raw response; counts calls."""
    name, mode = "scripted", "mock"

    def __init__(self, fn):
        self.fn, self.calls = fn, 0

    def repair(self, req):
        self.calls += 1
        raw = self.fn(self.calls, req)
        return RepairResponse(raw_text=raw, call=ModelCall(provider="scripted", mode="mock"))


def test_mock_run_layout_and_valid_manifest(make_cfg, evaluate):
    before = tree_hash(FIXTURE)
    d, m = run(make_cfg(), evaluate)
    assert tree_hash(FIXTURE) == before
    assert m.fixture_hash == before == m.fixture_hash_after
    RunManifest.model_validate(json.loads((d / "manifest.json").read_text()))
    assert m.mode == "mock" and m.status == "success" and m.stopping_reason == "no_change"
    assert [i.index for i in m.iterations] == [0, 1, 2]
    i0, i1, i2 = m.iterations
    assert i0.model_call is None and i0.evaluation.screenshot_path == "iterations/0/screenshot.png"
    mc = i1.model_call
    assert (mc.provider, mc.model, mc.mode) == ("mock", None, "mock")
    assert mc.usage.input_tokens is None and mc.usage.output_tokens is None and mc.usage.estimated_cost_usd is None
    assert i1.changed is True and i2.changed is False
    assert i1.evaluation.axe.summary.violation_rules < i0.evaluation.axe.summary.violation_rules
    for rel in ["events.jsonl", "iterations/0/input/index.html", "iterations/0/screenshot.png", "iterations/0/axe.json",
                "iterations/1/input/index.html", "iterations/1/output/index.html", "iterations/1/prompt.txt",
                "iterations/1/response.txt", "iterations/1/diff.patch", "iterations/1/screenshot.png"]:
        assert (d / rel).exists(), rel
    assert "MOCK" in (d / "iterations/1/response.txt").read_text()
    diff = (d / "iterations/1/diff.patch").read_text()
    assert diff.startswith("--- a/index.html") and '+<html lang="en">' in diff
    events = [json.loads(l)["event"] for l in (d / "events.jsonl").read_text().splitlines()]
    assert events[0] == "run_started" and events[-1] == "run_finished" and "model_call_finished" in events
    prompt = (d / "iterations/1/prompt.txt").read_text()
    assert "html-has-lang" in prompt and "keyboard-focus-visible" in prompt and "Do not add JavaScript" in prompt
    assert "Maple Street Community Library" in prompt
    assert not (d.parent / "x").exists()


def test_run_ids_unique(make_cfg, evaluate):
    a, _ = run(make_cfg(max_iterations=1), evaluate)
    b, _ = run(make_cfg(max_iterations=1), evaluate)
    assert a != b


def test_fixture_mutation_detected(make_cfg, evaluate, fixture_copy):
    def evil(site, fx, out, br):
        (fixture_copy / "demo" / "index.html").write_text("tampered")
        return evaluate(site, fx, out, br)
    cfg = make_cfg(fixture_manifest=str(fixture_copy / "demo.manifest.json"), fixture_dir=str(fixture_copy / "demo"),
                   max_iterations=1)
    d, m = run(cfg, evil)
    assert m.status == "failed" and m.stopping_reason == "fixture_mutated"
    assert m.fixture_hash != m.fixture_hash_after
    assert (d / "manifest.json").exists()


def test_fixture_hash_mismatch_refuses(make_cfg, evaluate, fixture_copy):
    (fixture_copy / "demo" / "styles.css").write_text("/* changed */")
    cfg = make_cfg(fixture_manifest=str(fixture_copy / "demo.manifest.json"), fixture_dir=str(fixture_copy / "demo"))
    d, m = run(cfg, evaluate)
    assert m.status == "failed" and m.stopping_reason == "fixture_hash_mismatch" and m.iterations == []


def test_baseline_arm_evaluates_only(make_cfg, evaluate):
    _, m = run(make_cfg(arm="baseline"), evaluate)
    assert m.status == "success" and [i.index for i in m.iterations] == [0] and m.stopping_reason == "baseline_only"


@pytest.mark.parametrize("arm", ["usability_only", "joint"])
def test_other_arms_not_implemented(make_cfg, evaluate, arm):
    with pytest.raises(NotImplementedError, match="not implemented in J004"):
        run(make_cfg(arm=arm), evaluate)


def test_path_traversal_rejected(make_cfg, evaluate, tmp_path):
    prov = Scripted(lambda n, r: "```../evil.html\nPWNED\n```\n```/etc/passwd\nx\n```")
    d, m = run(make_cfg(max_iterations=1), evaluate, provider=prov)
    assert m.status == "failed" and m.stopping_reason == "parse_error"
    assert not (tmp_path / "evil.html").exists() and not (d.parent / "evil.html").exists()
    assert not (d / "iterations/1/output").exists()
    assert (d / "iterations/1/response.txt").exists()  # raw response preserved


@pytest.mark.parametrize("label", ["new_file.html", "iterations/../../x.html", "sub/../index.html/../../y"])
def test_non_fixture_or_escaping_paths_rejected(make_cfg, evaluate, label):
    prov = Scripted(lambda n, r: f"```{label}\nx\n```")
    _, m = run(make_cfg(max_iterations=1), evaluate, provider=prov)
    assert m.stopping_reason == "parse_error"


def test_truncated_response_is_parse_error(make_cfg, evaluate):
    prov = Scripted(lambda n, r: "```index.html\n<html>")
    _, m = run(make_cfg(max_iterations=1), evaluate, provider=prov)
    assert m.stopping_reason == "parse_error" and m.status == "failed"


def test_no_change_stops(make_cfg, evaluate):
    prov = Scripted(lambda n, r: "```index.html\n" + r.files["index.html"].replace("\n", "  \n") + "\n```")
    d, m = run(make_cfg(max_iterations=3, budget={"max_calls": 5}), evaluate, provider=prov)
    assert m.stopping_reason == "no_change" and m.status == "success" and prov.calls == 1
    assert m.iterations[1].changed is False and m.iterations[1].evaluation is None


def test_provider_error_recorded_with_artifacts(make_cfg, evaluate):
    class Boom:
        name, mode = "boom", "mock"

        def repair(self, req):
            raise ProviderError("upstream 500", ModelCall(provider="boom", mode="mock", attempts=2, error="upstream 500"))
    d, m = run(make_cfg(max_iterations=2), evaluate, provider=Boom())
    assert m.status == "failed" and m.stopping_reason == "provider_error"
    assert m.iterations[1].model_call.error == "upstream 500" and m.iterations[1].model_call.attempts == 2
    assert (d / "iterations/0/input/index.html").exists() and (d / "iterations/1/prompt.txt").exists()
    assert any(n.startswith("ERROR:") for n in m.notes)
    RunManifest.model_validate_json((d / "manifest.json").read_text())


def test_unexpected_provider_exception_recorded(make_cfg, evaluate):
    class Bad:
        name, mode = "bad", "mock"

        def repair(self, req):
            raise RuntimeError("kaboom")
    _, m = run(make_cfg(max_iterations=1), evaluate, provider=Bad())
    assert m.stopping_reason == "provider_error" and m.status == "failed"


def test_baseline_evaluation_error_recorded(make_cfg):
    def broken(*a):
        raise RuntimeError("no chromium")
    d, m = run(make_cfg(), broken)
    assert m.status == "failed" and m.stopping_reason == "evaluation_error" and m.iterations[0].status == "failed"
    assert (d / "manifest.json").exists()


def test_post_repair_evaluation_error_recorded(make_cfg, evaluate):
    n = {"c": 0}

    def flaky(site, fx, out, br):
        n["c"] += 1
        if n["c"] == 2:
            raise TimeoutError("page timeout")
        return evaluate(site, fx, out, br)
    d, m = run(make_cfg(), flaky)
    assert m.stopping_reason == "evaluation_error" and m.status == "failed"
    assert m.iterations[1].output_dir and (d / "iterations/1/output/index.html").exists()


def test_iteration_cap_hard_limit_3(make_cfg, evaluate, tmp_path):
    bad = tmp_path / "c.json"
    bad.write_text(json.dumps({"fixture_manifest": "x", "mode": "mock", "provider": {"name": "mock"}, "max_iterations": 4}))
    with pytest.raises(ConfigError, match="max_iterations"):
        load_config(bad)
    # always-changing provider is stopped at exactly 3 iterations even with a larger call budget
    prov = Scripted(lambda n, r: "```index.html\n" + r.files["index.html"] + f"\n<!-- v{n} -->\n```")
    cfg = make_cfg(max_iterations=3, budget={"max_calls": 99})
    _, m = run(cfg, evaluate, provider=prov)
    assert prov.calls == 3 and [i.index for i in m.iterations] == [0, 1, 2, 3]
    assert m.stopping_reason == "iteration_cap" and m.status == "success"


def test_cap_enforced_even_if_cfg_bypassed(make_cfg, evaluate):
    cfg = make_cfg(max_iterations=1)
    object.__setattr__(cfg, "max_iterations", 9)  # bypass validation deliberately
    prov = Scripted(lambda n, r: "```index.html\n" + r.files["index.html"] + f"\n<!-- v{n} -->\n```")
    cfg.budget.max_calls = 99
    _, m = run(cfg, evaluate, provider=prov)
    assert prov.calls == 3


def test_budget_exhausted_by_max_calls(make_cfg, evaluate):
    prov = Scripted(lambda n, r: "```index.html\n" + r.files["index.html"] + f"\n<!-- v{n} -->\n```")
    _, m = run(make_cfg(max_iterations=3, budget={"max_calls": 1}), evaluate, provider=prov)
    assert prov.calls == 1 and m.stopping_reason == "budget_exhausted" and m.status == "partial"


def test_budget_exhausted_by_cost(make_cfg, evaluate):
    class Costly(Scripted):
        def repair(self, req):
            r = super().repair(req)
            r.call.usage.estimated_cost_usd = 0.5
            return r
    prov = Costly(lambda n, r: "```index.html\n" + r.files["index.html"] + f"\n<!-- v{n} -->\n```")
    cfg = make_cfg(max_iterations=3, budget={"max_calls": 5, "max_total_usd": 0.4})
    _, m = run(cfg, evaluate, provider=prov)
    assert prov.calls == 1 and m.stopping_reason == "budget_exhausted"


# ---- live-mode refusal -----------------------------------------------------------------------

LIVE = {"mode": "live", "provider": {"name": "anthropic"}, "budget": {"max_calls": 1, "max_total_usd": 1.0}}


@pytest.mark.parametrize("over,env,needle", [
    ({"provider": {"name": "anthropic", "model": None}}, {"ANTHROPIC_API_KEY": FAKE_KEY}, "UIREPAIRGYM_MODEL"),
    ({"provider": {"name": "anthropic", "model": "m"}, "budget": {"max_calls": 1}}, {"ANTHROPIC_API_KEY": FAKE_KEY},
     "max_total_usd"),
    ({"provider": {"name": "anthropic", "model": "m"}}, {}, "ANTHROPIC_API_KEY"),
])
def test_live_refuses_without_requirements(make_cfg, evaluate, tmp_path, over, env, needle):
    cfg = make_cfg(**{**LIVE, **over})
    with pytest.raises(ConfigError) as ei:
        run(cfg, evaluate, env=env)
    assert needle in str(ei.value) and FAKE_KEY not in str(ei.value)
    assert not (tmp_path / "runs").exists()  # nothing started


def test_demo_config_refuses_as_shipped(capsys, monkeypatch):
    for k in ("UIREPAIRGYM_MODEL", "ANTHROPIC_API_KEY"):
        monkeypatch.delenv(k, raising=False)
    monkeypatch.setenv("ANTHROPIC_API_KEY", FAKE_KEY)
    with pytest.raises(SystemExit) as ei:
        core.main(str(ROOT / "configs/demo.json"))
    assert "refused to start" in str(ei.value) and FAKE_KEY not in str(ei.value)


def test_model_from_env_is_used(make_cfg, evaluate):
    cfg = make_cfg(**{**LIVE, "provider": {"name": "anthropic"}})

    class Fake:
        def __init__(self):
            self.kw = None
            self.messages = self

        def create(self, **kw):
            self.kw = kw
            raise RuntimeError("stop here")  # no network: fake client only
    from uirepairgym.providers import AnthropicProvider
    fake = Fake()
    prov = AnthropicProvider(model="env-model", api_key=FAKE_KEY, client=fake)
    _, m = run(cfg, evaluate, provider=prov, env={"ANTHROPIC_API_KEY": FAKE_KEY, "UIREPAIRGYM_MODEL": "env-model"})
    assert m.config["provider"]["model"] == "env-model"
    assert fake.kw["model"] == "env-model"


def test_shipped_configs_load():
    cfg, _ = load_config(ROOT / "configs/demo.json")
    assert cfg.mode == "live" and cfg.arm == "accessibility_only" and cfg.provider.model is None
    assert cfg.max_iterations == 1 and cfg.budget.max_total_usd is None
    cfg, _ = load_config(ROOT / "configs/mock.json")
    assert cfg.mode == "mock"
    cfg, _ = load_config(ROOT / "configs/demo.json", "mock")
    assert cfg.mode == "mock" and cfg.provider.name == "mock"


def test_main_mock_end_to_end(monkeypatch, tmp_path, evaluate, capsys):
    monkeypatch.setattr(core, "default_evaluate", evaluate)
    cfgp = tmp_path / "configs" / "mock.json"
    cfgp.parent.mkdir()
    data = json.loads((ROOT / "configs/mock.json").read_text())
    data.update(fixture_manifest=str(ROOT / "fixtures/demo.manifest.json"), runs_dir=str(tmp_path / "runs"))
    cfgp.write_text(json.dumps(data))
    d = core.main(str(cfgp))
    m = RunManifest.model_validate_json((d / "manifest.json").read_text())
    assert m.mode == "mock" and "status=success" in capsys.readouterr().out


# ---- secrets ---------------------------------------------------------------------------------

class _Usage:
    input_tokens, output_tokens = 1234, 567


class _Block:
    type = "text"

    def __init__(self, text):
        self.text = text


class _Resp:
    id, model, stop_reason, usage = "msg_1", "env-model", "end_turn", _Usage()

    def __init__(self, text):
        self.content = [_Block(text)]


class FakeClient:
    def __init__(self, behavior):
        self.behavior, self.n, self.kwargs = behavior, 0, []
        self.messages = self

    def create(self, **kw):
        self.n += 1
        self.kwargs.append(kw)
        return self.behavior(self.n, kw)


def _all_text(d: Path) -> str:
    return "\n".join(p.read_text(errors="ignore") for p in d.rglob("*") if p.is_file())


def test_secrets_never_saved_success_and_error(make_cfg, evaluate):
    from uirepairgym.providers import AnthropicProvider
    cfg = make_cfg(**{**LIVE, "max_iterations": 1, "provider": {"name": "anthropic", "model": "env-model",
                                           "pricing": {"input_usd_per_mtok": 1.0, "output_usd_per_mtok": 2.0,
                                                       "pricing_basis": "test fixture pricing"}}})
    env = {"ANTHROPIC_API_KEY": FAKE_KEY}

    def ok(n, kw):
        html = Path(FIXTURE / "index.html").read_text().replace("<html>", '<html lang="en">')
        return _Resp(f"```index.html\n{html}```")
    prov = AnthropicProvider(model="env-model", api_key=FAKE_KEY, client=FakeClient(ok), pricing=cfg.provider.pricing.model_dump())
    d, m = run(cfg, evaluate, provider=prov, env=env)
    assert m.mode == "live" and m.status == "success"
    u = m.iterations[1].model_call.usage
    assert (u.input_tokens, u.output_tokens) == (1234, 567) and u.estimated_cost_usd == pytest.approx(0.002368)
    assert u.pricing_basis == "test fixture pricing" and m.iterations[1].model_call.model == "env-model"
    assert FAKE_KEY not in _all_text(d)

    def leaky(n, kw):
        raise ValueError(f"bad auth header x-api-key: {FAKE_KEY}")
    prov = AnthropicProvider(model="env-model", api_key=FAKE_KEY, client=FakeClient(leaky))
    d, m = run(cfg, evaluate, provider=prov, env=env)
    assert m.stopping_reason == "provider_error"
    text = _all_text(d)
    assert FAKE_KEY not in text and "FAKEKEY" not in text and "[REDACTED]" in text


def test_secret_in_unexpected_exception_redacted(make_cfg, evaluate):
    class Leak:
        name, mode = "leak", "live"

        def repair(self, req):
            raise RuntimeError(f"oops {FAKE_KEY}")
    d, m = run(make_cfg(max_iterations=1), evaluate, provider=Leak(), env={"ANTHROPIC_API_KEY": FAKE_KEY})
    assert FAKE_KEY not in _all_text(d)
