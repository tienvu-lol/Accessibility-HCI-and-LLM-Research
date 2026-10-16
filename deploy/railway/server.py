"""Read-only static server for the frozen demo report (J009). Stdlib only; no model calls, no uploads.

Binds :: (dual-stack, also IPv4 0.0.0.0) on $PORT (default 8080); falls back to 0.0.0.0. Serves files under REPORT_DIR (default ./demo-report next to this file).
Routes: GET/HEAD / -> index.html ; /assets/... ; /EXPORT_MANIFEST.json ; GET /health -> 200 only when index.html exists.
Every other method -> 405. No request body is ever read.
"""
import json, mimetypes, os, socket, sys
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

    def _send(self, code, body=b"", ctype="text/plain; charset=utf-8", head=False, cache=None):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        for k, v in {**HEADERS, **({"Cache-Control": cache} if cache else {})}.items():
            self.send_header(k, v)
        self.end_headers()
        if not head:
            self.wfile.write(body)

    def _serve(self, head):
        route = urlsplit(self.path).path
        if route.rstrip("/") == "/health":
            ok = ready()
            body = json.dumps({"status": "ok" if ok else "unavailable", "report_ready": ok}).encode()
            return self._send(200 if ok else 503, body, "application/json", head, cache="no-store")
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
        sys.stdout.write("%s - %s\n" % (self.address_string(), fmt % args))
        sys.stdout.flush()


class DualStackServer(ThreadingHTTPServer):
    """Listen on :: with IPv4-mapped addresses so IPv4 (0.0.0.0) and IPv6 (Railway private network) both work."""
    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


def main():
    port = int(os.environ.get("PORT", "8080"))
    try:
        srv, host = DualStackServer(("::", port), Handler), "[::] (dual-stack, includes 0.0.0.0)"
    except OSError:  # IPv6 unavailable in this container
        srv, host = ThreadingHTTPServer(("0.0.0.0", port), Handler), "0.0.0.0"
    print(f"demo-report serving {REPORT_DIR} on {host}:{port} ready={ready()} port_from_env={'PORT' in os.environ}", flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
