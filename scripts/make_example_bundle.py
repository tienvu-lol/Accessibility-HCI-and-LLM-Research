"""Generate examples/run-example/: a SYNTHETIC, mode=mock sample bundle illustrating the run schema.
Numbers here are illustrative placeholders for schema/report development ONLY, not measurements."""
import json, struct, zlib
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "examples" / "run-example"


def png(path, rgb):
    raw = b"".join(b"\x00" + bytes(rgb) * 64 for _ in range(32))
    def ch(t, d): return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + ch(b"IHDR", struct.pack(">IIBBBBB", 64, 32, 8, 2, 0, 0, 0)) + ch(b"IDAT", zlib.compress(raw)) + ch(b"IEND", b""))


def axe(v, vn, inc=0, incn=0, p=10):
    return {"axe_version": "4.13.0", "summary": {"violation_rules": v, "violation_nodes": vn, "incomplete_rules": inc, "incomplete_nodes": incn, "passes_rules": p, "by_impact": {"serious": vn}},
            "violations": [{"id": "image-alt", "impact": "critical", "description": "SYNTHETIC EXAMPLE", "help": "Images must have alternate text", "tags": ["wcag111"], "nodes": [{"target": ["img"], "html": "<img src=x>", "failure_summary": "example"}]}] if v else [],
            "incomplete": [], "passes": ["document-title"], "raw_path": None}

bc = {"browser": "chromium", "viewport": {"width": 1280, "height": 800}, "timeout_ms": 15000, "axe_version": "4.13.0"}
for d in ("iterations/0/input", "iterations/1/input", "iterations/1/output"):
    (root / d).mkdir(parents=True, exist_ok=True)
for d in ("iterations/0/input", "iterations/1/input"):
    (root / d / "index.html").write_text("<html><body><img src=x></body></html>\n")
(root / "iterations/1/output/index.html").write_text('<html lang="en"><body><img src=x alt="example"></body></html>\n')
png(root / "iterations/0/screenshot.png", (200, 180, 160)); png(root / "iterations/1/screenshot.png", (160, 190, 200))
(root / "iterations/1/diff.patch").write_text("--- a/index.html\n+++ b/index.html\n@@\n-<html>\n+<html lang=\"en\">\n")
(root / "iterations/1/prompt.txt").write_text("SYNTHETIC EXAMPLE PROMPT\n")
(root / "iterations/1/response.txt").write_text("SYNTHETIC EXAMPLE RESPONSE (mock provider)\n")
it0 = {"index": 0, "input_dir": "iterations/0/input", "output_dir": None, "status": "success", "changed": None,
       "evaluation": {"html_hash": "0" * 64, "browser": bc, "screenshot_path": "iterations/0/screenshot.png", "axe": axe(3, 5),
                      "task": {"task_id": "join-library", "completed": False, "checks": [{"name": "keyboard-focus-visible", "status": "fail", "detail": "example"}], "preserved_text_missing": []},
                      "nielsen": {"status": "unavailable", "reason": "no usability evaluator implemented"}, "mode": "mock"}}
it1 = {"index": 1, "input_dir": "iterations/1/input", "output_dir": "iterations/1/output", "status": "success", "changed": True, "diff_path": "iterations/1/diff.patch",
       "model_call": {"provider": "mock", "model": None, "mode": "mock", "request_params": {}, "prompt_path": "iterations/1/prompt.txt", "response_path": "iterations/1/response.txt", "usage": {}, "attempts": 1},
       "evaluation": {"html_hash": "1" * 64, "browser": bc, "screenshot_path": "iterations/1/screenshot.png", "axe": axe(1, 1),
                      "task": {"task_id": "join-library", "completed": True, "checks": [{"name": "keyboard-focus-visible", "status": "pass"}], "preserved_text_missing": []},
                      "nielsen": {"status": "unavailable", "reason": "no usability evaluator implemented"}, "mode": "mock"}}
m = {"contract_version": "0.1.0", "run_id": "example-mock-0001", "mode": "mock", "arm": "accessibility_only", "fixture_id": "demo-library", "fixture_hash": "f" * 64, "fixture_hash_after": "f" * 64,
     "config": {"max_iterations": 1}, "started_utc": "2026-10-03T00:00:00Z", "finished_utc": "2026-10-03T00:00:01Z", "status": "success", "stopping_reason": "iteration_cap", "iterations": [it0, it1],
     "visibility": "private", "notes": ["SYNTHETIC EXAMPLE BUNDLE - mock mode; values are not measurements"]}
(root / "manifest.json").write_text(json.dumps(m, indent=2) + "\n")
print("wrote", root)
