"""C4 guards: response parsing, truncation check, convergence hash."""
import hashlib
import json
import re
from html.parser import HTMLParser


class ParseError(Exception):
    pass


_FILE_RE = re.compile(r"<<<FILE:\s*([^>\n]+?)\s*>>>[ \t]*\n?")


def parse_response(text):
    s = text.strip()
    if s.startswith("```"):
        raise ParseError("response is wrapped in a code fence")
    if not s.startswith("<<<EVAL>>>"):
        raise ParseError("response does not start with <<<EVAL>>>")
    if not s.endswith("<<<END>>>"):
        raise ParseError("missing <<<END>>>")
    body = s[len("<<<EVAL>>>"):-len("<<<END>>>")]
    m = _FILE_RE.search(body)
    eval_part = (body[:m.start()] if m else body).strip()
    try:
        ev = json.loads(eval_part)
    except ValueError as e:
        raise ParseError(f"invalid EVAL json: {e}")
    if not isinstance(ev, dict) or not isinstance(ev.get("findings"), list):
        raise ParseError("EVAL json must be an object with a findings list")
    files = {}
    if m:
        parts = _FILE_RE.split(body[m.start():])  # ['', path, content, path, content...]
        for path, content in zip(parts[1::2], parts[2::2]):
            if path in files:
                raise ParseError(f"duplicate file {path}")
            if content.endswith("\n"):
                content = content[:-1]
            files[path] = content
    if not files:
        raise ParseError("no files in response")
    return {"findings": ev["findings"], "files": files}


class _Text(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def text_chars(html):
    p = _Text()
    p.feed(html)
    p.close()
    return len(" ".join("".join(p.parts).split()))


def normalize_hash(files):
    h = hashlib.sha256()
    for path in sorted(files):
        c = re.sub(r"<!--.*?-->", "", files[path], flags=re.S)
        c = re.sub(r"/\*.*?\*/", "", c, flags=re.S)
        c = " ".join(c.split())
        h.update(path.encode() + b"\0" + c.encode() + b"\0")
    return h.hexdigest()


def check_truncation(out_files, in_files):
    for path, c in out_files.items():
        if path.endswith(".html") and not c.rstrip().lower().endswith("</html>"):
            return False, f"{path} missing </html>"
    out = sum(text_chars(c) for p, c in out_files.items() if p.endswith(".html"))
    inp = sum(text_chars(c) for p, c in in_files.items() if p.endswith(".html"))
    if out < 0.5 * inp:
        return False, f"text chars {out} < 50% of input {inp}"
    return True, ""
