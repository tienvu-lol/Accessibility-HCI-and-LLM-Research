"""Parse and apply fenced file blocks from a repair response (J004). Model output is untrusted."""
from __future__ import annotations
import difflib
import re
from pathlib import PurePosixPath


class ParseError(Exception):
    pass


_FENCE_OPEN = re.compile(r"^```([^\n`]*)$")


def _label_path(info: str) -> str | None:
    toks = info.strip().split()
    if not toks:
        return None
    for tok in reversed(toks):
        for pre in ("path=", "file=", "filename="):
            if tok.lower().startswith(pre):
                tok = tok[len(pre):]
        if ":" in tok:
            tok = tok.rsplit(":", 1)[1]
        tok = tok.strip("\"'")
        if "." in tok or "/" in tok:
            return tok
    return None


def validate_rel_path(path: str, allowed: set[str]) -> str:
    if not path or "\x00" in path or "\\" in path or path.startswith("/") or re.match(r"^[A-Za-z]:", path):
        raise ParseError(f"rejected path (absolute or unsafe): {path!r}")
    parts = PurePosixPath(path).parts
    if any(p in ("..", ".") for p in parts) or ".." in path.split("/"):
        raise ParseError(f"rejected path (escapes workspace): {path!r}")
    norm = PurePosixPath(*parts).as_posix()
    if norm not in allowed:
        raise ParseError(f"rejected path (not an existing fixture file): {path!r}")
    return norm


def parse_response(raw: str, allowed: set[str]) -> dict[str, str]:
    """Return {relative path: complete file text}. Any bad block rejects the whole response."""
    files: dict[str, str] = {}
    lines = raw.replace("\r\n", "\n").split("\n")
    i = 0
    while i < len(lines):
        m = _FENCE_OPEN.match(lines[i])
        if not m:
            i += 1
            continue
        label = _label_path(m.group(1))
        j = i + 1
        body = []
        while j < len(lines) and lines[j].rstrip() != "```":
            body.append(lines[j])
            j += 1
        if j >= len(lines):
            raise ParseError("unterminated code fence (response may be truncated)")
        i = j + 1
        if label is None:
            raise ParseError("fenced block without a relative-path label")
        path = validate_rel_path(label, allowed)
        if path in files:
            raise ParseError(f"duplicate block for {path!r}")
        files[path] = "\n".join(body) + "\n"
    if not files:
        raise ParseError("no labeled file blocks found in response")
    return files


def normalize_code(text: str) -> str:
    return "\n".join(l.rstrip() for l in text.replace("\r\n", "\n").split("\n")).strip()


def unified_diff(before: dict[str, str], after: dict[str, str]) -> str:
    out = []
    for path in sorted(set(before) | set(after)):
        a, b = before.get(path), after.get(path)
        if a == b:
            continue
        out.extend(difflib.unified_diff((a or "").splitlines(keepends=True), (b or "").splitlines(keepends=True),
                                        fromfile=f"a/{path}", tofile=f"b/{path}"))
        if out and not out[-1].endswith("\n"):
            out.append("\n\\ No newline at end of file\n")
    return "".join(out)
