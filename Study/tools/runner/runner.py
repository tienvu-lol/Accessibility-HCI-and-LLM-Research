"""C5 runner: per-arm concurrent repair loop with retries, resume and convergence."""
import argparse
import csv
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

try:
    from . import guards, providers
except ImportError:  # run as a script from this directory
    import guards
    import providers

CRITERIA = {"wcag_criteria_json": "wcag-2.2.json", "nielsen_criteria_json": "nielsen.json"}


def load_sites(root):
    with open(Path(root) / "sample" / "sites.csv", newline="", encoding="utf-8") as f:
        return {r["site_id"]: r for r in csv.DictReader(f)}


def read_files(base, rels):
    return {r: (Path(base) / r).read_text(encoding="utf-8") for r in rels}


def build_prompt(root, condition, site, files):
    sheet = site["stylesheet"]
    vals = {
        "category": site["category"], "form_page": site["form_page"], "stylesheet": sheet,
        "index_html_content": files["index.html"],
        "form_page_content": files[site["form_page"]],
        "stylesheet_content": files[sheet],
    }
    for key, name in CRITERIA.items():
        vals[key] = (Path(root) / "criteria" / name).read_text(encoding="utf-8")
    tpl = (Path(root) / "prompts" / f"{condition}.md").read_text(encoding="utf-8")
    # single pass so placeholders inside substituted file content are never re-expanded
    return re.sub(r"\{\{(\w+)\}\}", lambda m: vals.get(m.group(1), m.group(0)), tpl)


def write_json(path, obj):
    path.write_text(json.dumps(obj, indent=2), encoding="utf-8")


def attempt_loop(arm, prompt, in_files, cfg):
    """Returns (ok, out_files, resp, attempts, reason). Retries per held_constant.retry."""
    retry = cfg["held_constant"]["retry"]
    total = retry["max_retries"] + 1
    reason, resp = "", {}
    for attempt in range(1, total + 1):
        if attempt > 1:
            time.sleep(retry["backoff_ms"] / 1000)
        try:
            resp = providers.complete(arm, prompt, cfg)
            parsed = guards.parse_response(resp["text"])
        except providers.ProviderError as e:
            reason = f"provider: {e}"
            if not getattr(e, "retryable", False):
                return False, None, resp, attempt, reason
            continue
        except guards.ParseError as e:
            reason = f"parse: {e}"
            continue
        ok, why = guards.check_truncation(parsed["files"], in_files)
        if ok:
            return True, parsed["files"], resp, attempt, ""
        reason = f"truncated: {why}"
    return False, None, resp, total, reason


def html_chars(files):
    return sum(guards.text_chars(t) for r, t in files.items() if r.endswith(".html"))


def run_cell(arm, condition, site, cfg, root, max_iter):
    rels = site["slice_files"].split(";")
    cell = Path(root) / "runs" / arm / condition / site["site_id"]
    in_files = read_files(Path(root) / "baseline" / site["site_id"], rels)
    prev_hash = None
    for n in range(1, max_iter + 1):
        d = cell / f"iter{n}"
        sp = d / "status.json"
        if sp.exists():
            st = json.loads(sp.read_text(encoding="utf-8"))
            if st.get("status") == "ok":  # resume: reuse finished iteration
                if st["converged"]:
                    return
                in_files, prev_hash = read_files(d, rels), st["hash"]
                continue
        d.mkdir(parents=True, exist_ok=True)
        prompt = build_prompt(root, condition, site, in_files)
        ok, out, resp, attempts, reason = attempt_loop(arm, prompt, in_files, cfg)
        arm_cfg = cfg["arms"][arm]
        status = {
            "status": "ok" if ok else "failed", "iteration": n, "hash": "", "prev_hash": prev_hash,
            "converged": False, "text_chars": 0, "input_text_chars": html_chars(in_files),
            "attempts": attempts, "model_id": arm_cfg["model_id"],
            "model_version": resp.get("model_version", arm_cfg.get("model_version", "")),
            "usage": resp.get("usage", {"input": 0, "output": 0}),
            "latency_ms": resp.get("latency_ms", 0),
        }
        if resp:
            write_json(d / "response.json", {
                "raw": resp.get("text", ""), "usage": status["usage"],
                "latency_ms": status["latency_ms"], "model_version": status["model_version"]})
        if not ok:
            status["reason"] = reason  # failed output is never kept as files
            write_json(sp, status)
            return
        for rel, text in out.items():
            (d / rel).parent.mkdir(parents=True, exist_ok=True)
            (d / rel).write_text(text, encoding="utf-8")
        status["hash"] = guards.normalize_hash(out)
        status["text_chars"] = html_chars(out)
        status["converged"] = prev_hash == status["hash"]
        write_json(sp, status)
        if status["converged"]:
            return
        in_files, prev_hash = {r: out[r] for r in rels}, status["hash"]


def run_arm(arm, conditions, sites, cfg, root, max_iter):
    c = cfg["arms"][arm].get("concurrency")
    workers = c if isinstance(c, int) and c > 0 else 1  # non-numeric = not yet measured
    with ThreadPoolExecutor(workers) as ex:
        futs = [ex.submit(run_cell, arm, cond, s, cfg, root, max_iter)
                for cond in conditions for s in sites]
        for f in futs:
            f.result()


def main(argv=None):
    p = argparse.ArgumentParser()
    p.add_argument("--arms", required=True)
    p.add_argument("--conditions", required=True)
    p.add_argument("--sites", required=True)
    p.add_argument("--root", default="Study")
    p.add_argument("--max-iter", type=int)
    a = p.parse_args(argv)
    cfg = json.loads((Path(a.root) / "config" / "repair-allocation.json").read_text(encoding="utf-8"))
    max_iter = a.max_iter or cfg["held_constant"]["max_iterations"]
    catalog = load_sites(a.root)
    sites = [catalog[s] for s in a.sites.split(",")]
    arms, conditions = a.arms.split(","), a.conditions.split(",")
    # arms run in parallel so a slow arm does not throttle the others
    with ThreadPoolExecutor(len(arms)) as ex:
        futs = [ex.submit(run_arm, arm, conditions, sites, cfg, a.root, max_iter) for arm in arms]
        for f in futs:
            f.result()


if __name__ == "__main__":
    main()
