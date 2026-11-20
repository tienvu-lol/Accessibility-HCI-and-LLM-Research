"""LLM judge: build prompt, parse 14 rankings, un-blind, append judge_rankings.csv (C7)."""
import argparse
import csv
import json
import os
import re
import sys
from pathlib import Path

LABELS = ["V1", "V2", "V3", "V4", "V5"]
QUESTIONS = [
    ("Q1", "h1_visibility_of_status", "Visibility of system status"),
    ("Q2", "h2_match_real_world", "Match between system and the real world"),
    ("Q3", "h3_user_control", "User control and freedom"),
    ("Q4", "h4_consistency", "Consistency and standards"),
    ("Q5", "h5_error_prevention", "Error prevention"),
    ("Q6", "h6_recognition", "Recognition rather than recall"),
    ("Q7", "h7_flexibility", "Flexibility and efficiency of use"),
    ("Q8", "h8_minimalist_design", "Aesthetic and minimalist design"),
    ("Q9", "h9_error_recovery", "Help users recognize, diagnose, and recover from errors"),
    ("Q10", "h10_help", "Help and documentation"),
    ("Q11", "alt_text", "Image alt text: which better describes each image's purpose? "
            "(fails: filenames, \"image of...\", >15 words)"),
    ("Q12", "headings_labels", "Headings and labels: which better describe what follows?"),
    ("Q13", "error_messages", "Error messages: which tells you what to do, not just that something is wrong?"),
    ("Q14", "content_order", "Content order: reading top to bottom, which makes more sense?"),
]
QID_TO_NAME = {q: n for q, n, _ in QUESTIONS}
HEADER = ["site_id", "arm", "question", "condition", "rank", "judge_model", "call_id"]
ROOT = Path(__file__).resolve().parents[2]


class JudgeParseError(Exception):
    pass


def build_prompt(variants, template=None):
    """variants: {"V1": {path: html}, ...}"""
    if template is None:
        template = (ROOT / "prompts" / "judge.md").read_text(encoding="utf-8")
    blocks = []
    for label in LABELS:
        blocks.append(f"### {label}")
        for path, content in variants[label].items():
            blocks.append(f"<<<FILE: {path}>>>\n{content}")
    questions = "\n".join(f"- Q{i}: {d}" for i, (_, _, d) in enumerate(QUESTIONS, 1))
    return template.replace("{{variants}}", "\n".join(blocks)).replace("{{questions}}", questions)


def parse_response(text):
    """Return {"Q1": {"V1": int, ...}, ...}; ties allowed; raises JudgeParseError."""
    m = re.search(r"\{.*\}", text, re.S)
    if not m:
        raise JudgeParseError("no JSON object found")
    try:
        data = json.loads(m.group(0))
    except json.JSONDecodeError as e:
        raise JudgeParseError(f"invalid JSON: {e}")
    out = {}
    for qid, _, _ in QUESTIONS:
        if qid not in data or not isinstance(data[qid], dict):
            raise JudgeParseError(f"missing question {qid}")
        ranks = {}
        for label in LABELS:
            r = data[qid].get(label)
            if isinstance(r, bool) or not isinstance(r, int) or not 1 <= r <= 5:
                raise JudgeParseError(f"{qid}/{label}: bad rank {r!r}")
            ranks[label] = r
        out[qid] = ranks
    return out


def load_key(key_path, site, arm):
    """Return {label_shown: condition} for a (site, arm) from blinding_key.csv."""
    with open(key_path, newline="", encoding="utf-8") as f:
        labels = {r["label_shown"]: r["condition"] for r in csv.DictReader(f)
                  if r["site_id"] == site and r["arm"] == arm}
    if set(labels) != set(LABELS):
        raise ValueError(f"key for {site}/{arm} incomplete: {sorted(labels)}")
    return labels


def unblind(rankings, labels, site, arm, judge_model, call_id):
    rows = []
    for qid, name in QID_TO_NAME.items():
        for label in LABELS:
            rows.append([site, arm, name, labels[label], rankings[qid][label], judge_model, call_id])
    return rows


def append_rows(path, rows):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    new = not path.exists() or path.stat().st_size == 0
    with open(path, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new:
            w.writerow(HEADER)
        w.writerows(rows)


def _mock_complete(prompt):
    # Deterministic: V1 best ... V5 worst on every question.
    resp = {qid: {l: i + 1 for i, l in enumerate(LABELS)} for qid, _, _ in QUESTIONS}
    return {"text": json.dumps(resp), "usage": {"input": 0, "output": 0},
            "model_version": "mock", "latency_ms": 0}


def _complete(prompt, cfg):
    if os.environ.get("STUDY_MOCK") == "1":
        return _mock_complete(prompt)
    sys.path.insert(0, str(ROOT / "tools" / "runner"))
    from providers import complete
    return complete("judge", prompt, cfg)


def judge_item(site, arm, variants, labels, cfg, call_id, out_csv, complete_fn=None):
    """One call -> 56 un-blinded rows appended to out_csv. Returns rows."""
    prompt = build_prompt(variants)
    resp = (complete_fn or _complete)(prompt, cfg)
    rankings = parse_response(resp["text"])
    model = cfg.get("judge", {}).get("model_id", "mock")
    rows = unblind(rankings, labels, site, arm, model, call_id)
    append_rows(out_csv, rows)
    return rows


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", required=True)
    ap.add_argument("--arm", required=True)
    ap.add_argument("--variants", required=True, help="JSON file: {\"V1\":{path:html},...}")
    ap.add_argument("--root", default=str(ROOT))
    ap.add_argument("--call-id", required=True)
    args = ap.parse_args(argv)
    root = Path(args.root)
    cfg = json.loads((root / "config" / "repair-allocation.json").read_text(encoding="utf-8"))
    variants = json.loads(Path(args.variants).read_text(encoding="utf-8"))
    labels = load_key(root / "blinding_key.csv", args.site, args.arm)
    rows = judge_item(args.site, args.arm, variants, labels, cfg, args.call_id,
                      root / "verdicts" / "judge_rankings.csv")
    print(f"{len(rows)} rows appended")


if __name__ == "__main__":
    main()
