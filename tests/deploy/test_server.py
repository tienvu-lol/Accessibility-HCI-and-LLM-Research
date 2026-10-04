import json, os, subprocess, sys, time, urllib.error, urllib.request
from pathlib import Path
import pytest

SERVER = Path(__file__).resolve().parents[2] / "deploy/railway/server.py"


def start(report_dir, port):
    env = {**os.environ, "PORT": str(port), "REPORT_DIR": str(report_dir)}
    p = subprocess.Popen([sys.executable, str(SERVER)], env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    for _ in range(50):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=1); break
        except urllib.error.HTTPError: break
        except Exception: time.sleep(0.1)
    return p


def get(port, path, method="GET"):
    req = urllib.request.Request(f"http://127.0.0.1:{port}{path}", method=method)
    try:
        r = urllib.request.urlopen(req, timeout=3); return r.status, r.read(), r.headers
    except urllib.error.HTTPError as e:
        return e.code, e.read(), e.headers


def test_serving_health_and_readonly(tmp_path):
    (tmp_path / "assets").mkdir(); (tmp_path / "index.html").write_text("<h1>hi</h1>"); (tmp_path / "assets/a.txt").write_text("x")
    p = start(tmp_path, 18431)
    try:
        assert get(18431, "/health")[0] == 200
        s, b, h = get(18431, "/"); assert s == 200 and b"<h1>hi" in b and "text/html" in h["Content-Type"]
        assert get(18431, "/assets/a.txt")[0] == 200
        assert get(18431, "/../server.py")[0] == 404
        assert get(18431, "/%2e%2e/server.py")[0] == 404
        assert get(18431, "/", "POST")[0] == 405 and get(18431, "/x", "PUT")[0] == 405
    finally:
        p.terminate()


def test_health_unavailable_without_report(tmp_path):
    p = start(tmp_path, 18432)
    try:
        s, b, _ = get(18432, "/health"); assert s == 503 and json.loads(b)["report_ready"] is False
    finally:
        p.terminate()


def test_health_not_cached_and_trailing_slash(tmp_path):
    (tmp_path / "index.html").write_text("x")
    p = start(tmp_path, 18433)
    try:
        s, _, h = get(18433, "/health"); assert s == 200 and h["Cache-Control"] == "no-store"
        assert get(18433, "/health/")[0] == 200
        import socket
        try:
            c = socket.create_connection(("::1", 18433), timeout=2); c.close()
        except OSError:
            pytest.skip("IPv6 loopback unavailable")
    finally:
        p.terminate()
