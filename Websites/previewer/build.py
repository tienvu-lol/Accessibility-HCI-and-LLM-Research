"""Bundle every replica under Websites/ (plus the restaurant zips) into ReplicaPreview.exe.

Usage: python Websites/previewer/build.py     -> Websites/previewer/dist/ReplicaPreview.exe
Needs the .NET 10 SDK. The exe is self-contained; end users need nothing installed.
"""
import html, json, re, shutil, subprocess, sys, zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
WEBSITES = HERE.parent
REPO = WEBSITES.parent
STAGE = HERE / "obj" / "stage"
SITES_ZIP = HERE / "obj" / "sites.zip"


def title_of(index: Path) -> str:
    m = re.search(r"<title>(.*?)</title>", index.read_text(encoding="utf-8", errors="replace"), re.S | re.I)
    return html.unescape(m.group(1).strip()) if m else index.parent.name


def source_of(site: Path) -> str:
    try:
        return json.loads((site / "component-inventory.json").read_text(encoding="utf-8")).get("source_url") or ""
    except (OSError, ValueError):
        return ""


def stage() -> list[dict]:
    shutil.rmtree(STAGE, ignore_errors=True)
    STAGE.mkdir(parents=True)
    sites = []
    # <category>/<model-group>/<ID>/index.html, per MODEL_ALLOCATION.md section 3
    for index in sorted(WEBSITES.glob("*/*/*/index.html")):
        site = index.parent
        category, group = site.parent.parent.name, site.parent.name
        if group not in ("claude", "codex", "open-source"):
            continue
        dest = STAGE / category / group / site.name
        shutil.copytree(site, dest)
        sites.append(dict(category=category, group=group, id=site.name, path=f"{category}/{group}/{site.name}"))
    # Restaurant batch predates the layout and ships as REST-xx.zip files.
    for z in sorted((REPO / "restaurant websites").glob("REST-*.zip")):
        with zipfile.ZipFile(z) as zf:
            zf.extractall(STAGE / "restaurant")
        sites.append(dict(category="restaurant", group="unrecorded", id=z.stem, path=f"restaurant/{z.stem}"))
    for s in sites:
        root = STAGE / s["path"]
        if not (root / "index.html").exists():
            sys.exit(f"no index.html in staged site {s['path']}")
        s["name"], s["source"] = title_of(root / "index.html"), source_of(root)
    return sites


def gallery(sites: list[dict]) -> str:
    sections = []
    for category in sorted({s["category"] for s in sites}):
        items = "".join(
            f'<li><a href="{html.escape(s["path"])}/index.html">{html.escape(s["id"])}: {html.escape(s["name"])}</a>'
            f'<span class="meta">Model group: {html.escape(s["group"])}'
            + (f' · Reference: {html.escape(s["source"])}' if s["source"] else "")
            + "</span></li>"
            for s in sites if s["category"] == category)
        heading = category.replace("-", " ").capitalize()
        sections.append(f'<section aria-labelledby="h-{category}"><h2 id="h-{category}">{heading}</h2><ul>{items}</ul></section>')
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Replica preview: {len(sites)} sites</title>
<style>
body{{font:16px/1.5 system-ui,sans-serif;max-width:60rem;margin:0 auto;padding:1.5rem;color:#1a1a1a;background:#fff}}
h1{{margin-top:0}} h2{{border-bottom:2px solid #ddd;padding-bottom:.25rem;margin-top:2rem}}
ul{{list-style:none;padding:0}} li{{margin:.5rem 0}} a{{color:#0b57d0;font-weight:600}} a:focus-visible{{outline:3px solid #0b57d0;outline-offset:2px}}
.meta{{display:block;color:#555;font-size:.875rem;overflow-wrap:anywhere}}
</style></head>
<body><main><h1>Website replicas ({len(sites)})</h1>
<p>Static replicas from the Accessibility-HCI-and-LLM-Research dataset, opened from local files. All names and content are fictional. The reference URLs are research metadata, not links.</p>
{''.join(sections)}
</main></body></html>"""


def main() -> None:
    sites = stage()
    (STAGE / "index.html").write_text(gallery(sites), encoding="utf-8")
    SITES_ZIP.unlink(missing_ok=True)
    shutil.make_archive(str(SITES_ZIP.with_suffix("")), "zip", STAGE)
    subprocess.run(["dotnet", "publish", str(HERE / "ReplicaPreview.csproj"), "-c", "Release", "-o", str(HERE / "dist")], check=True)
    print(f"Bundled {len(sites)} sites -> {HERE / 'dist' / 'ReplicaPreview.exe'}")


if __name__ == "__main__":
    main()
