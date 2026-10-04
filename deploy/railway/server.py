"""Read-only static server for the frozen demo report (J009). Stdlib only; no model calls, no uploads.

Binds 0.0.0.0:$PORT (default 8080). Serves files under REPORT_DIR (default ./demo-report next to this file).
Routes: GET/HEAD / -> index.html ; /assets/... ; /EXPORT_MANIFEST.json ; GET /health -> 200 only when index.html exists.
Every other method -> 405. No request body is ever read.
"""
import json, mimetypes, os, sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPORT_DIR = Path(os.environ.get("REPORT_DIR", Path(__file__).resolve().parent / "demo-report")).resolve()
HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'",
    "Cache-Control": "public, max-age=300",
}
MAX_FILE = 25 * 1024 * 1024


def ready() -> bool:
    return (REPORT_DIR / "index.html").is_file()


def resolve(path: str):
    rel = unquote(urlsplit(path).path).lstrip("/") or "index.html"
    if rel.endswith("/"):
        rel += "index.html"
    if "\0" in rel:
        return None
    target = (REPORT_DIR / rel).resolve()
    if REPORT_DIR != target and REPORT_DIR not in target.parents:
        return None
    if target.is_dir():
        target = target / "index.html"
    return target if target.is_file() and target.stat().st_size <= MAX_FILE else None


class Handler(BaseHTTPRequestHandler):
    server_version = "demo-report"
    sys_version = ""

    def _send(self, code, body=b"", ctype="text/plain; charset=utf-8", head=False):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        for k, v in HEADERS.items():
            self.send_header(k, v)
        self.end_headers()
        if not head:
            self.wfile.write(body)

    def _serve(self, head):
        route = urlsplit(self.path).path
        if route == "/health":
            ok = ready()
            body = json.dumps({"status": "ok" if ok else "unavailable", "report_ready": ok}).encode()
            return self._send(200 if ok else 503, body, "application/json", head)
        target = resolve(self.path)
        if target is None:
            return self._send(404, b"not found\n", head=head)
        ctype = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        if ctype.startswith("text/") or ctype == "application/json":
            ctype += "; charset=utf-8"
        self._send(200, target.read_bytes(), ctype, head)

    def do_GET(self): self._serve(False)
    def do_HEAD(self): self._serve(True)

    def _deny(self): self._send(405, b"read-only\n")
    do_POST = do_PUT = do_DELETE = do_PATCH = do_OPTIONS = _deny

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    port = int(os.environ.get("PORT", "8080"))
    print(f"demo-report serving {REPORT_DIR} on 0.0.0.0:{port} ready={ready()}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()


if __name__ == "__main__":
    main()
