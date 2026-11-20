"""Run one judge job: JSON job on stdin (no key; key is in env JUDGE_API_KEY) -> JSON result on stdout."""
import csv
import json
import os
import sys
import tempfile
from pathlib import Path

STUDY = Path(os.environ.get("STUDY_ROOT") or Path(__file__).resolve().parents[2])
sys.path.insert(0, str(STUDY / "tools" / "runner"))
sys.path.insert(0, str(STUDY / "tools" / "judge"))
import blind  # noqa: E402
import judge  # noqa: E402
import providers  # noqa: E402


def write_tree(root, job):
    for cond, files in job["variants"].items():
        base = (root / "runs" / job["arm"] / cond / job["site"] / "iter1").resolve()
        for rel, text in files.items():
            dest = (base / rel).resolve()
            if base not in dest.parents:
                raise ValueError("unsafe path %r" % rel)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(text, encoding="utf-8")


def main():
    job = json.load(sys.stdin)
    cfg = json.loads((STUDY / "config" / "repair-allocation.json").read_text(encoding="utf-8"))
    # reasoning != "disabled" so providers does not send a llama.cpp-only chat_template_kwargs to Gemini
    cfg["held_constant"]["reasoning"] = "enabled"
    cfg["arms"]["judge"] = {"provider": "openai", "base_url": job.get("base_url"), "model_id": job["model_id"],
                            "api_key_env": "JUDGE_API_KEY"}
    cfg["judge"]["model_id"] = job["model_id"]
    usage = {"input": 0, "output": 0}

    def complete_fn(prompt, _cfg):
        resp = judge._mock_complete(prompt) if os.environ.get("STUDY_MOCK") == "1" else providers.complete("judge", prompt, cfg)
        usage["input"] += resp["usage"].get("input", 0)
        usage["output"] += resp["usage"].get("output", 0)
        return resp

    call_id = job.get("call_id") or job["id"]
    try:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_tree(root, job)
            key_path = root / "blinding_key.csv"
            item = blind.build_item(job["site"], job["arm"], root / "runs", job["seed"],
                                    sites_csv=STUDY / "sample" / "sites.csv", key_path=key_path)
            rows = judge.judge_item(job["site"], job["arm"], item["variants"], item["labels"], cfg, call_id,
                                    root / "rankings.csv", complete_fn=complete_fn)
            with open(key_path, newline="", encoding="utf-8") as f:
                key_rows = list(csv.reader(f))[1:]
        out = {"rows": rows, "key_rows": key_rows, "usage": usage, "call_id": call_id}
    except (judge.JudgeParseError, providers.ProviderError, FileNotFoundError, KeyError, ValueError) as e:
        out = {"error": "%s: %s" % (type(e).__name__, e), "usage": usage, "call_id": call_id}
    print(json.dumps(out))


if __name__ == "__main__":
    main()
