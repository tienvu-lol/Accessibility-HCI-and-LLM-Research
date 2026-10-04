"""Controlled export of ONE explicitly selected run into deploy/railway/demo-report/ (J009).

Only the generated report folder (index.html + assets/) and EXPORT_MANIFEST.json are written. Raw runs/, other runs,
and unlisted model responses are never copied wholesale. Refuses secret-looking content. Mock runs require --allow-mock
and stay visibly labeled by the report itself. Requires --approve-demo (owner/coordinator explicit selection).
Usage: python scripts/export_demo_report.py --run-dir runs/<id> --approve-demo [--allow-mock] [--out deploy/railway/demo-report]
"""
import argparse, hashlib, json, re, shutil, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SECRET_PATTERNS = [re.compile(p) for p in (r"sk-ant-[A-Za-z0-9_\-]{8,}", r"sk-[A-Za-z0-9]{20,}", r"AIza[0-9A-Za-z_\-]{20,}", r"(?i)api[_-]?key\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{16,}", r"-----BEGIN [A-Z ]*PRIVATE KEY-----")]


def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--run-dir", required=True)
    ap.add_argument("--out", default=str(ROOT / "deploy/railway/demo-report"))
    ap.add_argument("--approve-demo", action="store_true", help="explicit selection/approval of this run for display")
    ap.add_argument("--allow-mock", action="store_true")
    a = ap.parse_args()
    run_dir, out = Path(a.run_dir).resolve(), Path(a.out).resolve()
    if not a.approve_demo:
        sys.exit("refusing: pass --approve-demo to explicitly select this run for the frozen demo")
    manifest = json.loads((run_dir / "manifest.json").read_text())
    if manifest["mode"] != "live" and not a.allow_mock:
        sys.exit(f"refusing: run mode is {manifest['mode']!r}; pass --allow-mock to export a labeled non-live demo")
    with tempfile.TemporaryDirectory() as t:
        stage = Path(t) / "demo-report"; stage.mkdir()
        subprocess.run([sys.executable, "-m", "uirepairgym", "report", "--run-dir", str(run_dir), "--out", str(stage / "index.html")], check=True, cwd=ROOT)
        files = sorted(p for p in stage.rglob("*") if p.is_file())
        for f in files:
            if f.suffix in {".html", ".json", ".txt", ".patch", ".css", ".svg", ".jsonl"}:
                txt = f.read_text(errors="ignore")
                for pat in SECRET_PATTERNS:
                    if pat.search(txt):
                        sys.exit(f"refusing: secret-like pattern in {f.relative_to(stage)}")
        if out.exists():
            shutil.rmtree(out)
        shutil.copytree(stage, out)
    listing = {str(p.relative_to(out)): sha(p) for p in sorted(out.rglob("*")) if p.is_file()}
    (out / "EXPORT_MANIFEST.json").write_text(json.dumps({
        "source_run_id": manifest["run_id"], "mode": manifest["mode"], "fixture_id": manifest["fixture_id"],
        "fixture_hash": manifest["fixture_hash"], "code_commit": manifest.get("code_commit"),
        "approved_for_display": True, "files": listing,
        "note": "Frozen read-only export. Mode 'mock' means no live model call produced these results."}, indent=2) + "\n")
    print(f"exported {len(listing)} files from {manifest['run_id']} ({manifest['mode']}) -> {out}")


if __name__ == "__main__":
    main()
