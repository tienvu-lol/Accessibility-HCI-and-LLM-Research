"""S3 baseline ceiling gate: are baseline violation rates too close to zero to show repair?"""
import argparse
import csv
import statistics
import sys
from collections import defaultdict

THRESHOLD = 0.02  # median per-site violation_rate below this => WARN


def load(path, condition="baseline"):
    """Return (per-site mean rate dict, excluded rows as (site, status/reason))."""
    by_site = defaultdict(list)
    excluded = []
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if condition and row.get("condition", "") != condition:
                continue
            site = row.get("site_id", "?")
            status = (row.get("status") or "ok").strip()
            if status != "ok":
                excluded.append((site, status))
                continue
            try:
                by_site[site].append(float(row["violation_rate"]))
            except (KeyError, TypeError, ValueError):
                excluded.append((site, "bad violation_rate"))
    return {s: statistics.mean(v) for s, v in by_site.items()}, excluded


def evaluate(path, condition="baseline", threshold=THRESHOLD):
    per_site, excluded = load(path, condition)
    if not per_site:
        return {"median": None, "per_site": {}, "excluded": excluded, "verdict": "WARN"}
    med = statistics.median(per_site.values())
    return {"median": med, "per_site": per_site, "excluded": excluded,
            "verdict": "WARN" if med < threshold else "PASS"}


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--metrics", default="Study/metrics/metrics.csv")
    ap.add_argument("--condition", default="baseline", help="empty string = all rows")
    ap.add_argument("--threshold", type=float, default=THRESHOLD)
    a = ap.parse_args(argv)
    r = evaluate(a.metrics, a.condition, a.threshold)
    if r["median"] is None:
        print("median violation_rate: n/a (no usable rows)")
    else:
        print(f"median violation_rate: {r['median']:.4f} over {len(r['per_site'])} sites")
    for site in sorted(r["per_site"]):
        print(f"  {site}: {r['per_site'][site]:.4f}")
    print(f"excluded/failed rows: {len(r['excluded'])}")
    for site, why in r["excluded"]:
        print(f"  {site}: {why}")
    print(f"{r['verdict']} (threshold {a.threshold})")
    if r["verdict"] == "WARN":
        print("Baselines near ceiling: lean on normalized rates, behavioral probes, verbosity.")
    return 0  # gate is advisory; never fails the pipeline


if __name__ == "__main__":
    sys.exit(main())
