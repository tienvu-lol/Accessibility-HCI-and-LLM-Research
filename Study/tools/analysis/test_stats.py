import math
import unittest

from Study.analysis import stats


class StatsTest(unittest.TestCase):
    def test_friedman_perfect(self):
        r = stats.friedman([[1, 2, 3]] * 3)
        self.assertAlmostEqual(r["chi2"], 6.0)
        self.assertEqual(r["df"], 2)
        self.assertAlmostEqual(r["p"], math.exp(-3), places=8)
        self.assertEqual(r["mean_ranks"], [1.0, 2.0, 3.0])
        self.assertAlmostEqual(r["kendall_w"], 1.0)

    def test_friedman_no_agreement(self):
        r = stats.friedman([[1, 2, 3], [3, 2, 1]])
        self.assertAlmostEqual(r["chi2"], 0.0)
        self.assertAlmostEqual(r["kendall_w"], 0.0)

    def test_chi2_sf_df1(self):
        self.assertAlmostEqual(stats.chi2_sf(3.841458820694124, 1), 0.05, places=8)

    def test_wilcoxon_exact(self):
        r = stats.wilcoxon([2, 4, 6, 8, 10], [1, 2, 3, 4, 5])
        self.assertEqual(r["w"], 0)
        self.assertAlmostEqual(r["p"], 0.0625)

    def test_wilcoxon_all_zero(self):
        self.assertEqual(stats.wilcoxon([1, 2], [1, 2])["p"], 1.0)

    def test_holm(self):
        got = stats.holm([0.01, 0.04, 0.03])
        for g, e in zip(got, [0.03, 0.06, 0.06]):
            self.assertAlmostEqual(g, e)

    def test_bh(self):
        got = stats.benjamini_hochberg([0.01, 0.04, 0.03])
        for g, e in zip(got, [0.03, 0.04, 0.04]):
            self.assertAlmostEqual(g, e)

    def test_monotone(self):
        p = [0.001, 0.2, 0.04, 0.5, 0.03, 0.9]
        order = sorted(range(len(p)), key=lambda i: p[i])
        for f in (stats.holm, stats.benjamini_hochberg):
            adj = f(p)
            vals = [adj[i] for i in order]
            self.assertEqual(vals, sorted(vals))
            self.assertTrue(all(a >= b for a, b in zip(adj, p)))

    def test_quadrants(self):
        q = stats.quadrant_counts([(-1, -1), (-2, -3), (-1, 2), (1, -1), (1, 1), (0, 1)])
        self.assertEqual(q["lower_left"], 2)
        self.assertEqual(q["on_axis"], 1)
        self.assertAlmostEqual(q["trade_off_share"], 2 / 6)


if __name__ == "__main__":
    unittest.main()
