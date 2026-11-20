import csv
import tempfile
import unittest
from pathlib import Path

from Study.tools.judge import blind

SITES = [f"UNI-{i:02d}" for i in range(1, 11)]


def make_tree(root):
    root = Path(root)
    (root / "sample").mkdir()
    with open(root / "sample" / "sites.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["site_id", "slice_files"])
        for s in SITES:
            w.writerow([s, "index.html;apply.html;css/styles.css"])
    for s in SITES:
        for cond in blind.JUDGE_CONDITIONS:
            for n in (1, 2):
                d = root / "runs" / "A1" / cond / s / f"iter{n}"
                (d / "css").mkdir(parents=True)
                (d / "index.html").write_text(
                    f"<!-- repaired under {cond} -->\n<html data-condition=\"{cond}\">"
                    f"<body>iter{n} WCAG Nielsen naive condition: {cond}</body></html>", encoding="utf-8")
                (d / "apply.html").write_text("<html>apply</html>", encoding="utf-8")
                (d / "css" / "styles.css").write_text(f"/* {cond} */ a{{}}", encoding="utf-8")
    return root


class BlindTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = make_tree(self.tmp.name)
        self.runs = self.root / "runs"

    def tearDown(self):
        self.tmp.cleanup()

    def item(self, site, seed, key="blinding_key.csv"):
        return blind.build_item(site, "A1", self.runs, seed, key_path=self.root / key)

    def test_same_seed_same_mapping(self):
        a = self.item("UNI-01", 7, "k1.csv")
        b = self.item("UNI-01", 7, "k2.csv")
        self.assertEqual(a["labels"], b["labels"])
        self.assertEqual(sorted(a["labels"]), blind.LABELS)
        self.assertEqual(sorted(a["labels"].values()), sorted(blind.JUDGE_CONDITIONS))

    def test_different_sites_differ(self):
        maps = {tuple(self.item(s, 7, f"{s}.csv")["labels"].items()) for s in SITES}
        self.assertGreater(len(maps), 1)

    def test_no_condition_names_in_output(self):
        item = self.item("UNI-01", 7)
        for files in item["variants"].values():
            self.assertEqual(len(files), 3)
            for path, html in files.items():
                for name in blind.JUDGE_CONDITIONS:
                    self.assertNotIn(name, path.lower())
                    self.assertNotIn(name, html.lower())

    def test_uses_final_iteration(self):
        item = self.item("UNI-01", 7)
        for files in item["variants"].values():
            self.assertIn("iter2", files["index.html"])

    def test_key_csv(self):
        self.item("UNI-01", 7)
        self.item("UNI-01", 7)  # idempotent
        with open(self.root / "blinding_key.csv", newline="", encoding="utf-8") as f:
            rows = list(csv.reader(f))
        self.assertEqual(rows[0], ["site_id", "arm", "label_shown", "condition"])
        self.assertEqual(len(rows), 6)
        self.assertEqual([r[2] for r in rows[1:]], blind.LABELS)

    def test_clean_path(self):
        self.assertEqual(blind.clean_path("css/wcag-styles.css"), "css/styles.css")
        self.assertEqual(blind.clean_path("naive/both.html"), "f/f.html")
        self.assertEqual(blind.clean_path("baseline/baseline.html"), "f/f.html")


if __name__ == "__main__":
    unittest.main()
