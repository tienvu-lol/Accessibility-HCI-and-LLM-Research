"""Evaluate one rendered website state with Playwright/Chromium + vendored axe-core.

Heuristic limits (be honest when interpreting results):
* Axe is partial automated evidence only; passing axe does not imply WCAG conformance.
  Counts: ``violation_rules`` = distinct failing rules, ``violation_nodes`` = affected elements.
* Task: steps use Playwright ``fill``/``click``/``press`` (``fill`` sets values directly rather
  than typing via the keyboard, so keyboard operability is checked separately by the Tab check).
  Success = success_selector visible (and containing success_text if given) after the steps.
  A step that errors/times out gives completed=None and error set; it never counts as pass.
* preserved_text is checked against the rendered ``body`` inner text AFTER the task steps ran
  (so text revealed by the task, like a confirmation message, counts). If the steps could not
  run, the initial page text is used instead. Text hidden by CSS counts as missing.
* Tab reachability: presses Tab len(candidates)+2 times and checks that each candidate (visible,
  enabled a[href]/button/input/select/textarea/[tabindex>=0]) became document.activeElement.
  Does not cover custom widgets without tabindex, shadow DOM, iframes, or focus-trap subtleties.
* Focus visible: per element, compare computed outline / box-shadow / border / background /
  text-decoration before vs. while keyboard-focused. Any change counts as visible; no change
  fails. It does not measure the contrast/size of the indicator (WCAG 2.4.11/1.4.11), and
  changes made to other elements are not considered.
* Each evaluation uses fresh browser contexts (task runs in its own context); site_dir is only read.
* Non-file network requests are blocked (offline determinism, untrusted-site hygiene) and reported.
* The Nielsen report is always 'unavailable' here; no model is called.
* Evaluation.html_hash = sha256 of the entrypoint file bytes.
"""
from __future__ import annotations
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from ..paths import file_hash
from ..schemas import (AxeNode, AxeReport, AxeRule, AxeSummary, BrowserConfig, CheckResult,
                       Evaluation, FixtureManifest, NielsenReport, TaskReport)
from ..browser.launch import launch_chromium

AXE_JS = Path(__file__).parent / "vendor" / "axe.min.js"

CANDIDATES_JS = """
() => {
  const sel = 'a[href], button, input:not([type=hidden]), select, textarea, [tabindex]';
  const els = Array.from(document.querySelectorAll(sel)).filter(e => {
    if (e.disabled) return false;
    const ti = e.getAttribute('tabindex');
    if (ti !== null && parseInt(ti, 10) < 0) return false;
    const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  });
  window.__uirgEls = els;
  return els.map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') +
    (e.tagName === 'A' ? '[' + (e.textContent || '').trim().slice(0, 20) + ']' : ''));
}
"""
STYLE_JS = """
(i) => {
  const e = window.__uirgEls[i]; const c = getComputedStyle(e);
  return {outline: [c.outlineStyle, c.outlineWidth, c.outlineColor].join(' '),
          outline_visible: c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0,
          shadow: c.boxShadow, border: [c.borderTopColor, c.borderTopWidth, c.borderTopStyle].join(' '),
          bg: c.backgroundColor, deco: c.textDecorationLine};
}
"""
ACTIVE_JS = "() => window.__uirgEls.indexOf(document.activeElement)"


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _first(e: Exception) -> str:
    return f"{type(e).__name__}: {str(e).splitlines()[0] if str(e) else ''}"


def _conv_rule(r: dict) -> AxeRule:
    nodes = [AxeNode(target=[t if isinstance(t, str) else json.dumps(t) for t in n.get("target", [])],
                     html=n.get("html", "") or "", failure_summary=n.get("failureSummary", "") or "")
             for n in r.get("nodes", [])]
    return AxeRule(id=r["id"], impact=r.get("impact"), description=r.get("description", ""),
                   help=r.get("help", ""), tags=r.get("tags", []), nodes=nodes)


def _axe_report(raw: dict, raw_path: str) -> AxeReport:
    viol = [_conv_rule(r) for r in raw.get("violations", [])]
    inc = [_conv_rule(r) for r in raw.get("incomplete", [])]
    by_impact: dict[str, int] = {}
    for r in viol:
        k = r.impact or "unknown"
        by_impact[k] = by_impact.get(k, 0) + len(r.nodes)
    summ = AxeSummary(violation_rules=len(viol), violation_nodes=sum(len(r.nodes) for r in viol),
                      incomplete_rules=len(inc), incomplete_nodes=sum(len(r.nodes) for r in inc),
                      passes_rules=len(raw.get("passes", [])), by_impact=by_impact)
    return AxeReport(axe_version=raw.get("_axe_version", "unknown"), summary=summ, violations=viol,
                     incomplete=inc, passes=[r["id"] for r in raw.get("passes", [])], raw_path=raw_path)


class _Collector:
    def __init__(self):
        self.console: list[str] = []
        self.pageerrors: list[str] = []
        self.blocked: list[str] = []

    def attach(self, ctx, page):
        def route(r):
            u = r.request.url
            if u.startswith(("file:", "data:", "blob:", "about:")):
                r.continue_()
            else:
                self.blocked.append(u)
                r.abort()
        ctx.route("**/*", route)
        page.on("console", lambda m: self.console.append(f"{m.type}: {m.text}") if m.type == "error" else None)
        page.on("pageerror", lambda e: self.pageerrors.append(str(e)))
        page.on("requestfailed", lambda r: self.console.append(f"requestfailed: {r.url}")
                if r.url.startswith("file:") else None)


def _run_axe(page, out_dir: Path) -> AxeReport:
    page.evaluate(AXE_JS.read_text(encoding="utf-8"))
    raw = page.evaluate("""async () => {
        const r = await axe.run(document, {resultTypes: ['violations','incomplete','passes','inapplicable']});
        return JSON.parse(JSON.stringify(r)); }""")
    raw["_axe_version"] = page.evaluate("axe.version")
    (out_dir / "axe.json").write_text(json.dumps(raw, indent=2, sort_keys=True), encoding="utf-8")
    return _axe_report(raw, "axe.json")


def _keyboard_checks(page) -> list[CheckResult]:
    try:
        names = page.evaluate(CANDIDATES_JS)
        n = len(names)
        before = [page.evaluate(STYLE_JS, i) for i in range(n)]
        page.evaluate("() => { if (document.activeElement) document.activeElement.blur(); }")
        reached: dict[int, dict] = {}
        for _ in range(n + 2):
            page.keyboard.press("Tab")
            i = page.evaluate(ACTIVE_JS)
            if i >= 0 and i not in reached:
                reached[i] = page.evaluate(STYLE_JS, i)
        missing = [names[i] for i in range(n) if i not in reached]
        out = [CheckResult(name="keyboard_reachable", status="pass" if not missing and n else "fail",
                           detail=f"{len(reached)}/{n} interactive elements reached by Tab; "
                                  f"unreachable: {missing or 'none'}")]
        lines, bad = [], []
        for i in sorted(reached):
            b, a = before[i], reached[i]
            reasons = []
            if a["outline_visible"] and a["outline"] != b["outline"]:
                reasons.append("outline")
            if a["shadow"] != b["shadow"]:
                reasons.append("box-shadow")
            if a["border"] != b["border"]:
                reasons.append("border")
            if a["bg"] != b["bg"]:
                reasons.append("background")
            if a["deco"] != b["deco"]:
                reasons.append("text-decoration")
            lines.append(f"{names[i]}: " + ("visible via " + "+".join(reasons) if reasons else "NO visible change"))
            if not reasons:
                bad.append(names[i])
        out.append(CheckResult(name="focus_visible", status="fail" if bad or not reached else "pass",
                               detail=f"{len(bad)}/{len(reached)} focused elements show no visible indicator "
                                      f"(heuristic). " + "; ".join(lines)))
        return out
    except Exception as e:  # noqa: BLE001
        return [CheckResult(name="keyboard_reachable", status="error", detail=_first(e)),
                CheckResult(name="focus_visible", status="error", detail=_first(e))]


def _task(br, url: str, fixture: FixtureManifest, cfg: BrowserConfig, col: _Collector,
          initial_missing: list[str]) -> TaskReport:
    task = fixture.task
    rep = TaskReport(task_id=task.id, preserved_text_missing=initial_missing)
    ctx = br.new_context(viewport=cfg.viewport.model_dump())
    try:
        page = ctx.new_page()
        page.set_default_timeout(cfg.timeout_ms)
        col.attach(ctx, page)
        page.goto(url, wait_until="load")
        for k, s in enumerate(task.steps):
            desc = f"step {k + 1} {s.action} {s.selector or ''}".strip()
            try:
                if s.action == "fill":
                    page.fill(s.selector, s.value or "")
                elif s.action == "click":
                    page.click(s.selector)
                elif s.action == "press":
                    if s.selector:
                        page.focus(s.selector)
                    page.keyboard.press(s.value or "Enter")
                elif s.action == "tab":
                    page.keyboard.press("Tab")
                elif s.action == "goto_anchor":
                    page.evaluate("h => { location.hash = h }", s.value or "")
                page.wait_for_timeout(100)
            except Exception as e:  # noqa: BLE001
                rep.error = f"{desc} failed: {_first(e)}"
                rep.checks.append(CheckResult(name="task_steps", status="error", detail=rep.error))
                return rep
        rep.checks.append(CheckResult(name="task_steps", status="pass", detail=f"{len(task.steps)} steps executed"))
        try:
            page.wait_for_selector(task.success_selector, state="visible", timeout=min(cfg.timeout_ms, 3000))
            visible = True
        except Exception:  # noqa: BLE001 - not visible within window
            visible = False
        text_ok = True
        if visible and task.success_text:
            text_ok = task.success_text in (page.inner_text(task.success_selector) or "")
        rep.checks.append(CheckResult(name="success_selector_visible", status="pass" if visible else "fail",
                                      detail=task.success_selector))
        if task.success_text:
            rep.checks.append(CheckResult(name="success_text", status="pass" if visible and text_ok else "fail",
                                          detail=repr(task.success_text)))
        rep.completed = bool(visible and text_ok)
        body = page.inner_text("body")
        rep.preserved_text_missing = [t for t in fixture.preserved_text if t not in body]
    except Exception as e:  # noqa: BLE001
        rep.completed = None
        rep.error = _first(e)
        rep.checks.append(CheckResult(name="task", status="error", detail=rep.error))
    finally:
        ctx.close()
    return rep


def _save(ev: Evaluation, out_dir: Path) -> Evaluation:
    ev.finished_utc = _now()
    (out_dir / "evaluation.json").write_text(ev.model_dump_json(indent=2), encoding="utf-8")
    return ev


def evaluate(site_dir: Path, fixture: FixtureManifest, out_dir: Path, browser: BrowserConfig) -> Evaluation:
    """See module docstring. Writes screenshot.png, axe.json, evaluation.json under out_dir only."""
    from playwright.sync_api import sync_playwright
    site_dir, out_dir = Path(site_dir), Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    entry = (site_dir / fixture.entrypoint).resolve()
    cfg = browser.model_copy(deep=True)
    ev = Evaluation(html_hash=file_hash(entry) if entry.is_file() else "missing", browser=cfg,
                    nielsen=NielsenReport(status="unavailable", reason="no usability evaluator implemented"),
                    mode="live", started_utc=_now())

    def fail(msg: str) -> Evaluation:
        ev.axe_error = msg
        ev.task = TaskReport(task_id=fixture.task.id, completed=None, error=msg)
        return _save(ev, out_dir)

    if not entry.is_file():
        return fail(f"entrypoint not found: {fixture.entrypoint}")
    pw = sync_playwright().start()
    try:
        try:
            br = launch_chromium(pw)
        except Exception as e:  # noqa: BLE001
            return fail(f"browser launch failed: {e}")
        try:
            cfg.browser_version = br.version
            url = entry.as_uri()
            col = _Collector()
            checks: list[CheckResult] = []
            initial_missing: list[str] = []
            ctx = br.new_context(viewport=cfg.viewport.model_dump())
            try:
                page = ctx.new_page()
                page.set_default_timeout(cfg.timeout_ms)
                col.attach(ctx, page)
                page.goto(url, wait_until="load")
                try:
                    page.screenshot(path=str(out_dir / "screenshot.png"), full_page=True)
                    ev.screenshot_path = "screenshot.png"
                except Exception as e:  # noqa: BLE001
                    checks.append(CheckResult(name="screenshot", status="error", detail=_first(e)))
                n_con, n_err = len(col.console), len(col.pageerrors)
                try:
                    ev.axe = _run_axe(page, out_dir)
                    cfg.axe_version = ev.axe.axe_version
                except Exception as e:  # noqa: BLE001
                    ev.axe_error = _first(e)
                # axe itself XHRs file:// stylesheets (blocked by CORS) and logs errors; those are
                # produced by the instrument, not the site, so drop what was emitted during axe.run.
                del col.console[n_con:], col.pageerrors[n_err:]
                body = page.inner_text("body")
                initial_missing = [t for t in fixture.preserved_text if t not in body]
                checks += _keyboard_checks(page)
            except Exception as e:  # noqa: BLE001
                msg = f"page load failed: {_first(e)}"
                ev.axe_error = ev.axe_error or msg
                checks.append(CheckResult(name="page_load", status="error", detail=msg))
            finally:
                ctx.close()
            tcol = _Collector()
            t = _task(br, url, fixture, cfg, tcol, initial_missing)
            t.checks = checks + t.checks
            t.console_errors = list(dict.fromkeys(col.console + tcol.console))
            t.page_errors = list(dict.fromkeys(col.pageerrors + tcol.pageerrors))
            blocked = sorted(set(col.blocked + tcol.blocked))
            t.checks.append(CheckResult(name="external_requests_blocked", status="pass" if not blocked else "fail",
                                        detail=f"blocked: {blocked or 'none'}"))
            t.checks.append(CheckResult(name="preserved_text", status="pass" if not t.preserved_text_missing else "fail",
                                        detail=f"missing: {t.preserved_text_missing or 'none'}"))
            ev.task = t
        finally:
            br.close()
    except Exception as e:  # noqa: BLE001
        ev.task = ev.task or TaskReport(task_id=fixture.task.id, completed=None, error=_first(e))
        ev.axe_error = ev.axe_error or (None if ev.axe else _first(e))
    finally:
        pw.stop()
    return _save(ev, out_dir)


def _resolve(arg: str) -> tuple[Path, Path]:
    """Return (site_dir, manifest_path) from a manifest json path or a fixture dir."""
    p = Path(arg).resolve()
    if p.is_file():
        name = p.name[:-len(".manifest.json")] if p.name.endswith(".manifest.json") else p.stem
        return p.parent / name, p
    for cand in (p.parent / f"{p.name}.manifest.json", p / "manifest.json"):
        if cand.is_file():
            return p, cand
    raise SystemExit(f"no manifest found for {arg} (expected {p.name}.manifest.json next to it or manifest.json inside)")


def cli_main(fixture_dir: str, out: str) -> None:
    site, manifest = _resolve(fixture_dir)
    fixture = FixtureManifest.model_validate_json(manifest.read_text(encoding="utf-8"))
    ev = evaluate(site, fixture, Path(out), BrowserConfig())
    print(f"evaluation written: {Path(out) / 'evaluation.json'}")
    if ev.axe:
        print(f"axe {ev.axe.axe_version}: {ev.axe.summary.model_dump_json()}")
        print("violation rules: " + ", ".join(r.id for r in ev.axe.violations))
    else:
        print(f"axe unavailable: {ev.axe_error}")
    if ev.task:
        print(f"task completed={ev.task.completed} error={ev.task.error}")
        for c in ev.task.checks:
            print(f"  [{c.status}] {c.name}: {c.detail[:240]}")
    if not ev.axe:
        sys.exit(1)
