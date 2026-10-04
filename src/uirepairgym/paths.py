"""Hashing/path helpers shared across components."""
import hashlib
from pathlib import Path


def tree_hash(root: Path) -> str:
    """sha256 over sorted (relative posix path, file bytes) pairs; ignores dotfiles dirs like .git."""
    h = hashlib.sha256()
    root = Path(root)
    for p in sorted(root.rglob("*")):
        if p.is_file() and not any(part.startswith(".") for part in p.relative_to(root).parts):
            h.update(p.relative_to(root).as_posix().encode())
            h.update(b"\0")
            h.update(p.read_bytes())
            h.update(b"\0")
    return h.hexdigest()


def file_hash(path: Path) -> str:
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()
