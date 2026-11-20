"""Write blinded variant pages for the human harness iframes.

Layout: <out>/<site>/<arm>/<label>/<cleaned page path>  (label = V1-V4 from blinding_key.csv).
"""
import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from Study.tools.judge import blind  # noqa: E402


def read_key(key_path, site, arm):
    with open(key_path, newline="", encoding="utf-8") as f:
        return {r["label_shown"]: r["condition"] for r in csv.DictReader(f)
                if r["site_id"] == site and r["arm"] == arm}


def materialize(runs, key, items_csv, sites_csv, out):
    with open(items_csv, newline="", encoding="utf-8") as f:
        items = list(csv.DictReader(f))
    for it in items:
        site, arm = it["site_id"], it["arm"]
        built = blind.build_item(site, arm, runs, it["seed"], sites_csv, key)
        if read_key(key, site, arm) != built["labels"]:
            raise ValueError(f"{key} disagrees with the seeded blinding for {site} {arm}")
        for label, pages in built["variants"].items():
            for page, html in pages.items():
                dest = Path(out) / site / arm / label / page
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(html, encoding="utf-8")
    return len(items)


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    for name in ("runs", "key", "items", "sites", "out"):
        p.add_argument(f"--{name}", required=True)
    a = p.parse_args(argv)
    n = materialize(a.runs, a.key, a.items, a.sites, a.out)
    print(f"materialized {n} items to {a.out}")


if __name__ == "__main__":
    main()
