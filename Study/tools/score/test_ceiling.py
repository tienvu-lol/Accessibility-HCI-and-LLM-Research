import contextlib
import csv
import io
import os
import tempfile
import unittest

from Study.tools.score import ceiling

FIELDS = ["site_id", "condition", "breakpoint", "violation_rate", "status"]


def write(rows):
    fd, path = tempfile.mkstemp(suffix=".csv")
    with os.fdopen(fd, "w", newline="") as f:
        w = csv.DictWriter(f, FIELDS)
        w.writeheader()
        for r in rows:
            w.writerow(dict(zip(FIELDS, r)))
    return path


def rows(rates, status="ok"):
    return [(f"S{i}", "baseline", 1280, r, status) for i, r in enumerate(rates)]


class CeilingTests(unittest.TestCase):
    def run_eval(self, data):
        p = write(data)
        self.addCleanup(os.remove, p)
        return ceiling.evaluate(p)

    def test_near_zero_warns(self):
        r = self.run_eval(rows([0, 0, 0.005, 0.01, 0.3]))
        self.assertEqual(r["verdict"], "WARN")
        self.assertAlmostEqual(r["median"], 0.005)

    def test_normal_passes(self):
        r = self.run_eval(rows([0.1, 0.15, 0.2, 0.25, 0.3]))
        self.assertEqual(r["verdict"], "PASS")
        self.assertEqual(len(r["per_site"]), 5)

    def test_excluded_rows_reported(self):
        data = rows([0.2, 0.2]) + [("S9", "baseline", 1280, 0, "truncated"),
                                   ("S8", "baseline", 375, "", "failed")]
        r = self.run_eval(data)
        self.assertEqual(len(r["excluded"]), 2)
        self.assertNotIn("S9", r["per_site"])

    def test_other_conditions_ignored(self):
        data = rows([0.2, 0.2]) + [("S0", "wcag", 1280, 0.0, "ok")]
        r = self.run_eval(data)
        self.assertAlmostEqual(r["per_site"]["S0"], 0.2)

    def test_site_averages_breakpoints(self):
        data = [("A", "baseline", 1280, 0.1, "ok"), ("A", "baseline", 375, 0.3, "ok")]
        self.assertAlmostEqual(self.run_eval(data)["per_site"]["A"], 0.2)

    def test_cli_prints_and_exits_zero(self):
        p = write(rows([0, 0]))
        self.addCleanup(os.remove, p)
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            code = ceiling.main(["--metrics", p])
        self.assertEqual(code, 0)
        self.assertIn("WARN", buf.getvalue())
        self.assertIn("median violation_rate", buf.getvalue())


if __name__ == "__main__":
    unittest.main()
