"""Pack Study/runs of open-source arms into the /api/import NDJSON (gzip): one cell per line."""
import argparse
import base64
import gzip
import json
import urllib.request
from pathlib import Path

ALLOWED = {".html", ".css", ".json", ".js", ".svg", ".txt"}  # what the server accepts


def encode(path):
    raw = path.read_bytes()
    try:
        return {"enc": "utf8", "data": raw.decode("utf-8")}
    except UnicodeDecodeError:
        return {"enc": "base64", "data": base64.b64encode(raw).decode("ascii")}


def pack(runs, arms):
    runs = Path(runs)
    for arm in arms:
        for site_dir in sorted(p for p in (runs / arm).glob("*/*") if p.is_dir()):
            files = {f.relative_to(site_dir).as_posix(): encode(f)
                     for f in sorted(site_dir.rglob("*")) if f.is_file() and f.suffix in ALLOWED}
            if files:
                yield json.dumps({"cell": "%s/%s/%s" % (arm, site_dir.parent.name, site_dir.name), "files": files})


def main(argv=None):
    p = argparse.ArgumentParser()
    p.add_argument("--runs", required=True)
    p.add_argument("--arms", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--post", help="web base URL or full /api/import URL")
    p.add_argument("--token", help="value of the web console's `sid` login cookie")
    a = p.parse_args(argv)
    lines = list(pack(a.runs, a.arms.split(",")))
    body = gzip.compress(("\n".join(lines) + "\n").encode("utf-8"))
    Path(a.out).write_bytes(body)
    print("%d cells -> %s (%d bytes)" % (len(lines), a.out, len(body)))
    if a.post:
        url = a.post if a.post.rstrip("/").endswith("/api/import") else a.post.rstrip("/") + "/api/import"
        headers = {"Content-Type": "application/x-ndjson+gzip"}
        if a.token:
            headers["Cookie"] = "sid=" + a.token
        with urllib.request.urlopen(urllib.request.Request(url, body, headers, method="POST"), timeout=300) as r:
            print(r.read().decode("utf-8"))


if __name__ == "__main__":
    main()
