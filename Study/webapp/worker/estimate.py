"""Estimate per-call token sizes from runner.build_prompt: --study <dir> --out <file>."""
import argparse
import json
import sys
from pathlib import Path

CONDITIONS = ["naive", "wcag", "nielsen", "both"]


def estimate(study):
    study = Path(study)
    sys.path.insert(0, str(study / "tools" / "runner"))
    import runner  # noqa: E402

    cfg = json.loads((study / "config" / "repair-allocation.json").read_text(encoding="utf-8"))
    hc = cfg["held_constant"]
    sites = runner.load_sites(study)
    out, ins, outs = {}, [], []
    for sid, site in sites.items():
        files = runner.read_files(study / "baseline" / sid, site["slice_files"].split(";"))
        out_tokens = round(sum(len(t) for t in files.values()) / 4 * 1.1)
        out[sid] = {}
        for cond in CONDITIONS:
            n_in = len(runner.build_prompt(study, cond, site, files)) // 4
            out[sid][cond] = {"in": n_in, "out": out_tokens}
            ins.append(n_in)
            outs.append(out_tokens)
    cells = len(sites) * len(CONDITIONS)
    # upper bound: every iteration of every cell uses every retry
    per_arm = cells * hc["max_iterations"] * (hc["retry"]["max_retries"] + 1)
    out["mean_in"] = sum(ins) / len(ins)
    out["mean_out"] = sum(outs) / len(outs)
    out["calls_upper_bound"] = {a: per_arm for a, c in cfg["arms"].items() if "serving" not in c}
    return out


def main(argv=None):
    p = argparse.ArgumentParser()
    p.add_argument("--study", required=True)
    p.add_argument("--out", required=True)
    a = p.parse_args(argv)
    Path(a.out).write_text(json.dumps(estimate(a.study), indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
