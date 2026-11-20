"""Un-blind rater exports: raw A|B|tie + opaque left label -> {wcag,both,tie} + shown_left/shown_right.

Usage: merge_ratings.py --key blinding_key.csv --sidecar randomization.json --out human_ratings.csv export1.csv ...
"""
import argparse
import csv
import json

HEADER = ["site_id", "arm", "question", "rater_id", "verdict", "note", "shown_left", "shown_right", "ts"]


def merge(key_path, sidecar_path, export_paths):
    with open(key_path, newline="", encoding="utf-8") as f:
        cond = {(r["site_id"], r["arm"], r["label_shown"]): r["condition"] for r in csv.DictReader(f)}
    with open(sidecar_path, encoding="utf-8") as f:
        plans = json.load(f)
    out = []
    for path in export_paths:
        with open(path, newline="", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                plan = next((p for p in plans.get(r["rater_id"], [])
                             if (p["site_id"], p["arm"]) == (r["site_id"], r["arm"])), None)
                if plan is None:
                    raise ValueError(f"{path}: no plan for {r['rater_id']} {r['site_id']} {r['arm']}")
                left = cond[(r["site_id"], r["arm"], r["shown_left"])]
                if left != plan["shown_left"]:
                    raise ValueError(f"{path}: left pane contradicts sidecar for {r['site_id']} {r['arm']}")
                verdict = {"A": plan["shown_left"], "B": plan["shown_right"], "tie": "tie"}.get(r["verdict"])
                if verdict is None:
                    raise ValueError(f"{path}: bad verdict {r['verdict']!r}")
                out.append({**r, "verdict": verdict,
                            "shown_left": plan["shown_left"], "shown_right": plan["shown_right"]})
    return out


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--key", required=True)
    p.add_argument("--sidecar", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("exports", nargs="+")
    a = p.parse_args(argv)
    rows = merge(a.key, a.sidecar, a.exports)
    with open(a.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, HEADER, extrasaction="ignore", lineterminator="\n")
        w.writeheader()
        w.writerows(rows)
    print(f"wrote {len(rows)} rows to {a.out}")


if __name__ == "__main__":
    main()
