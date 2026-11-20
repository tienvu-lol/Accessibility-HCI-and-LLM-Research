import math
import unittest

from Study.analysis import kappa

# judge rows x human cols over (both, wcag, tie); judge 20/6/2, humans 19/7/2, 22 agree
MATRIX = {("both", "both"): 17, ("both", "wcag"): 2, ("both", "tie"): 1,
          ("wcag", "both"): 2, ("wcag", "wcag"): 4,
          ("tie", "wcag"): 1, ("tie", "tie"): 1}


def worked_items():
    items, i = [], 0
    for (j, h), c in MATRIX.items():
        for _ in range(c):
            items.append((f"i{i}", j, [h, h, h]))
            i += 1
    return items


class KappaTest(unittest.TestCase):
    def test_worked_example(self):
        judge, human, ex = kappa.collapse(worked_items())
        self.assertEqual(ex, 0)
        self.assertEqual(len(judge), 28)
        p_o = sum(a == b for a, b in zip(judge, human)) / 28
        self.assertAlmostEqual(p_o, 0.786, places=3)
        k = kappa.cohen(judge, human)
        self.assertAlmostEqual(k, 0.53, places=2)
        p_e = (20 * 19 + 6 * 7 + 2 * 2) / 28 ** 2
        self.assertAlmostEqual(p_e, 0.543, places=3)

    def test_perfect_agreement(self):
        self.assertEqual(kappa.cohen(list("abab"), list("abab")), 1.0)
        self.assertEqual(kappa.fleiss([["a", "a", "a"], ["b", "b", "b"]]), 1.0)
        self.assertEqual(kappa.fleiss([["a", "a", "a"]] * 3), 1.0)

    def test_fleiss_known_value(self):
        rows = [["a", "a", "b"], ["a", "b", "b"], ["a", "a", "a"], ["b", "b", "b"]]
        # P_i = 1/3,1/3,1,1 -> 2/3; p_a=p_b=0.5 -> P_e=.5; kappa=1/3
        self.assertAlmostEqual(kappa.fleiss(rows), 1 / 3)

    def test_majority_and_exclusion(self):
        self.assertEqual(kappa.majority(["a", "a", "b"]), "a")
        self.assertIsNone(kappa.majority(["a", "b", "c"]))
        items = [("x", "a", ["a", "b", "c"]), ("y", "a", ["a", "a", "b"])]
        judge, human, ex = kappa.collapse(items)
        self.assertEqual((judge, human, ex), (["a"], ["a"], 1))

    def test_bootstrap_deterministic(self):
        items = worked_items()
        site_of = {it[0]: f"s{n % 10}" for n, it in enumerate(items)}
        a = kappa.cluster_bootstrap(items, site_of, n=200, seed=7)
        b = kappa.cluster_bootstrap(items, site_of, n=200, seed=7)
        self.assertEqual(a, b)
        self.assertLessEqual(a[0], a[1])
        self.assertNotEqual(a, kappa.cluster_bootstrap(items, site_of, n=200, seed=8))

    def test_gate(self):
        self.assertEqual(kappa.gate(0.5, 0.5), "use")
        self.assertEqual(kappa.gate(0.4, 0.4), "use")
        self.assertEqual(kappa.gate(0.5, 0.18), "drop-judge")
        self.assertEqual(kappa.gate(0.3, 0.9), "drop-rubric")
        self.assertEqual(kappa.gate(float("nan"), 0.9), "drop-rubric")

    def test_gate_table(self):
        items = worked_items()
        site_of = {it[0]: f"s{n % 10}" for n, it in enumerate(items)}
        rows = kappa.gate_table({"Q1": items}, site_of, n=50, seed=1)
        self.assertEqual(rows[0]["decision"], "use")
        self.assertEqual(rows[0]["n_excluded_1_1_1"], 0)
        self.assertFalse(math.isnan(rows[0]["cohen_ci_lo"]))


if __name__ == "__main__":
    unittest.main()
