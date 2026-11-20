"""Blind the 5 variants (4 repaired conditions + baseline) of a (site, arm) as V1-V5 and record the key (C7)."""
import csv
import random
import re
from pathlib import Path

CONDITIONS = ["naive", "wcag", "nielsen", "both"]
JUDGE_CONDITIONS = CONDITIONS + ["baseline"]
LABELS = ["V1", "V2", "V3", "V4", "V5"]
KEY_HEADER = ["site_id", "arm", "label_shown", "condition"]

_COMMENT = re.compile(r"<!--.*?-->|/\*.*?\*/", re.S)
# "both" is ordinary English, so it is only stripped where it is clearly a marker.
_NAME_WORDS = re.compile(r"\b(?:wcag|nielsen|naive|baseline)\b", re.I)
_MARKER_ATTR = re.compile(
    r"\s(?:data-)?(?:condition|variant|arm)\s*=\s*(?:\"[^\"]*\"|'[^']*'|[^\s>]+)", re.I)
_BOTH_MARKER = re.compile(r"\b(?:condition|variant)\s*[:=]\s*both\b", re.I)
_ANY_NAME = re.compile("|".join(JUDGE_CONDITIONS), re.I)


def strip_markers(html):
    html = _COMMENT.sub("", html)
    html = _MARKER_ATTR.sub("", html)
    html = _BOTH_MARKER.sub("", html)
    return _NAME_WORDS.sub("", html)


def clean_path(path):
    """Remove condition names from every path segment; segments left empty become 'f'."""
    parts = []
    for seg in path.split("/"):
        stem, dot, ext = seg.rpartition(".")
        stem, ext = (stem, dot + ext) if dot else (seg, "")
        stem = _ANY_NAME.sub("", stem).strip("-_ ") or "f"
        parts.append(stem + ext)
    return "/".join(parts)


def _slice_files(site, sites_csv):
    with open(sites_csv, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["site_id"] == site:
                return r["slice_files"].split(";")
    raise KeyError(f"site {site} not in {sites_csv}")


def _final_iter_dir(root):
    iters = [(int(p.name[4:]), p) for p in root.glob("iter*") if p.name[4:].isdigit()]
    if not iters:
        raise FileNotFoundError(f"no iter dirs under {root}")
    return max(iters)[1]


def _shuffle(site, arm, seed):
    order = list(JUDGE_CONDITIONS)
    random.Random(f"{seed}|{site}|{arm}").shuffle(order)
    return dict(zip(LABELS, order))


def _key_has(key_path, site, arm):
    if not key_path.exists():
        return False
    with open(key_path, newline="", encoding="utf-8") as f:
        return any(r["site_id"] == site and r["arm"] == arm for r in csv.DictReader(f))


def build_item(site, arm, runs_root, seed, sites_csv=None, key_path=None):
    runs_root = Path(runs_root)
    sites_csv = Path(sites_csv) if sites_csv else runs_root.parent / "sample" / "sites.csv"
    key_path = Path(key_path) if key_path else runs_root.parent / "blinding_key.csv"
    files = _slice_files(site, sites_csv)
    labels = _shuffle(site, arm, seed)
    variants = {}
    for label, cond in labels.items():
        it = _final_iter_dir(runs_root / arm / cond / site)
        variants[label] = {
            clean_path(rel): strip_markers((it / rel).read_text(encoding="utf-8"))
            for rel in files
        }
    if not _key_has(key_path, site, arm):
        key_path.parent.mkdir(parents=True, exist_ok=True)
        new = not key_path.exists() or key_path.stat().st_size == 0
        with open(key_path, "a", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            if new:
                w.writerow(KEY_HEADER)
            w.writerows([site, arm, label, labels[label]] for label in LABELS)
    return {"labels": labels, "variants": variants}
