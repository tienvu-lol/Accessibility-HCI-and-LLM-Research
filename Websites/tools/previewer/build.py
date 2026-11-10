"""Bundle every replica under Websites/ (plus the restaurant zips) into ReplicaPreview.exe.

Usage: python Websites/tools/previewer/build.py [--no-exe]   -> Websites/tools/previewer/dist/ReplicaPreview.exe
The gallery lists every slot in Websites/metadata/assignments.csv, so slots that are
not generated yet show up as such. Needs the .NET 10 SDK; the exe itself is self-contained.
"""
import csv, html, json, re, shutil, subprocess, sys, zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
WEBSITES = HERE.parent.parent
REPO = WEBSITES.parent
STAGE = HERE / "obj" / "stage"
SITES_ZIP = HERE / "obj" / "sites.zip"
GROUPS = ("claude", "codex", "open-source")


def read_json(p: Path) -> dict:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def describe(root: Path, source: str = "") -> dict:
    m = re.search(r"<title>(.*?)</title>", (root / "index.html").read_text(encoding="utf-8", errors="replace"), re.S | re.I)
    qc = read_json(root / "generation-metadata.json").get("validation_summary") or {}
    passed = sum(v == "pass" for v in qc.values())
    return dict(
        name=html.unescape(m.group(1).strip()) if m else root.name,
        source=read_json(root / "component-inventory.json").get("source_url") or source,
        pages=len(list(root.glob("*.html"))),
        qc=f"{passed}/{len(qc)} gates pass" if qc else "not recorded",
    )


def stage() -> dict:
    """Copy each replica into STAGE; return {(category, id): info}."""
    shutil.rmtree(STAGE, ignore_errors=True)
    STAGE.mkdir(parents=True)
    sites = {}
    # <category>/<model-group>/<ID>/index.html, per MODEL_ALLOCATION.md section 3
    for index in sorted(WEBSITES.glob("*/*/*/index.html")):
        site, group, category = index.parent, index.parent.parent.name, index.parent.parent.parent.name
        if group not in GROUPS or category in ("pipelines", "tools"):
            continue
        rel = f"{category}/{group}/{site.name}"
        shutil.copytree(site, STAGE / rel)
        sites[(category, site.name)] = dict(group=group, path=rel, **describe(STAGE / rel))
    # The restaurant batch predates that layout: REST-xx.zip files, sources in its README table.
    rest = REPO / "restaurant websites"
    readme = (rest / "README.md").read_text(encoding="utf-8") if (rest / "README.md").exists() else ""
    rest_sources = dict(re.findall(r"^\| (REST-\d+) \|[^|]*\| (\S+) \|", readme, re.M))
    for z in sorted(rest.glob("REST-*.zip")):
        with zipfile.ZipFile(z) as zf:
            zf.extractall(STAGE / "restaurant")
        rel = f"restaurant/{z.stem}"
        if not (STAGE / rel / "index.html").exists():
            sys.exit(f"{z.name} has no {z.stem}/index.html")
        sites[("restaurant", z.stem)] = dict(group="", path=rel, **describe(STAGE / rel, rest_sources.get(z.stem, "")))
    return sites


def register() -> list[dict]:
    with open(WEBSITES / "metadata" / "assignments.csv", newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def gallery(sites: dict, rows: list[dict]) -> str:
    esc = html.escape
    seen, built, sections = set(), 0, []
    categories = list(dict.fromkeys([r["category"] for r in rows] + [c for c, _ in sites]))
    for category in categories:
        slots = [r for r in rows if r["category"] == category]
        # Sites on disk that the register does not list still get shown, flagged.
        slots += [dict(category=category, slot="", source_id=i, model_group=s["group"], notes="not in register")
                  for (c, i), s in sites.items() if c == category and not any(r["source_id"] == i for r in slots)]
        body = []
        for r in slots:
            s = sites.get((category, r["source_id"]))
            seen.add((category, r["source_id"]))
            group = r["model_group"] or (s or {}).get("group") or "not recorded"
            if s:
                built += 1
                name = f'<a href="{esc(s["path"])}/index.html">{esc(s["name"])}</a>'
                cells = [str(s["pages"]), esc(s["qc"]), esc(s["source"]) or "not recorded"]
            else:
                name = '<span class="pending">Not generated yet</span>'
                cells = ["", "", esc(r.get("source_url") or "")]
            note = f' <span class="note">({esc(r["notes"])})</span>' if r.get("notes") == "not in register" else ""
            body.append(f'<tr data-built="{"yes" if s else "no"}"><td>{esc(r["slot"])}</td><td>{esc(r["source_id"])}</td>'
                        f'<td>{name}{note}</td><td>{esc(group)}</td>' + "".join(f"<td>{c}</td>" for c in cells) + "</tr>")
        title = category.replace("-", " ").capitalize()
        count = sum(1 for r in slots if (category, r["source_id"]) in sites)
        sections.append(
            f'<section aria-labelledby="h-{esc(category)}"><h2 id="h-{esc(category)}">{esc(title)} '
            f'<span class="count">{count} of {len(slots)} generated</span></h2>'
            f'<div class="scroll" role="region" aria-label="{esc(title)} slots table, scrollable" tabindex="0"><table>'
            '<thead><tr><th scope="col">Slot</th><th scope="col">ID</th><th scope="col">Replica</th><th scope="col">Model group</th>'
            '<th scope="col">Pages</th><th scope="col">QC (from metadata)</th><th scope="col">Reference</th></tr></thead>'
            f'<tbody>{"".join(body)}</tbody></table></div></section>')
    total = len(seen)
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Replica preview: {built} of {total} generated</title>
<style>
body{{font:16px/1.5 system-ui,sans-serif;max-width:72rem;margin:0 auto;padding:1.5rem;color:#1a1a1a;background:#fff}}
h1{{margin-top:0}} h2{{border-bottom:2px solid #ddd;padding-bottom:.25rem;margin-top:2rem}}
.count{{font-size:1rem;font-weight:400;color:#555}}
.scroll{{overflow-x:auto}} .scroll:focus-visible{{outline:3px solid #0b57d0}}
table{{border-collapse:collapse;width:100%;font-size:.9375rem}}
th,td{{text-align:left;padding:.4rem .6rem;border-bottom:1px solid #e3e3e3;vertical-align:top}}
td:last-child{{overflow-wrap:anywhere;color:#555}}
a{{color:#0b57d0;font-weight:600}} a:focus-visible,input:focus-visible{{outline:3px solid #0b57d0;outline-offset:2px}}
.pending,.note{{color:#666;font-style:italic}}
.filter{{margin:1rem 0;padding:.75rem;background:#f4f6f8;border-radius:.375rem}}
.hide-pending tr[data-built="no"]{{display:none}}
</style></head>
<body><main><h1>Website replicas</h1>
<p>{built} of {total} registered slots are generated. These are static replicas from the Accessibility-HCI-and-LLM-Research dataset, opened from local files. All names and content are fictional. Reference URLs are research metadata, not links. QC shows what each site's <code>generation-metadata.json</code> records; it was not re-run when this gallery was built.</p>
<div class="filter"><input type="checkbox" id="only-built"> <label for="only-built">Show only generated sites</label></div>
{''.join(sections)}
</main>
<script>
document.getElementById('only-built').addEventListener('change', function (e) {{
  document.body.classList.toggle('hide-pending', e.target.checked);
}});
</script>
</body></html>"""


def main() -> None:
    sites = stage()
    (STAGE / "index.html").write_text(gallery(sites, register()), encoding="utf-8")
    SITES_ZIP.unlink(missing_ok=True)
    shutil.make_archive(str(SITES_ZIP.with_suffix("")), "zip", STAGE)
    print(f"Staged {len(sites)} sites -> {STAGE / 'index.html'}")
    if "--no-exe" not in sys.argv:
        subprocess.run(["dotnet", "publish", str(HERE / "ReplicaPreview.csproj"), "-c", "Release", "-o", str(HERE / "dist")], check=True)
        print(f"Built {HERE / 'dist' / 'ReplicaPreview.exe'}")


if __name__ == "__main__":
    main()
