"""Validity math (README section 7): Fleiss, Cohen, majority collapse, site-clustered bootstrap, gate.

An item is a tuple (item_id, judge_label, [r1, r2, r3]) of three human ratings.
"""
import math
import random
from collections import Counter

THRESHOLD = 0.40


def fleiss(items, raters=3):
    """Fleiss' kappa over rows of `raters` category labels."""
    rows = [Counter(r) for r in items]
    if not rows:
        return float("nan")
    p_bar = sum((sum(c * c for c in row.values()) - raters) / (raters * (raters - 1)) for row in rows) / len(rows)
    totals = Counter()
    for row in rows:
        totals.update(row)
    n = len(rows) * raters
    p_e = sum((c / n) ** 2 for c in totals.values())
    if p_e == 1:
        return 1.0  # every rating is the same single category
    return (p_bar - p_e) / (1 - p_e)


def cohen(a, b):
    """Cohen's kappa for two equal-length label sequences."""
    if len(a) != len(b):
        raise ValueError("cohen: sequences differ in length")
    n = len(a)
    if n == 0:
        return float("nan")
    p_o = sum(x == y for x, y in zip(a, b)) / n
    ca, cb = Counter(a), Counter(b)
    p_e = sum(ca[k] * cb[k] for k in ca) / (n * n)
    if p_e == 1:
        return 1.0
    return (p_o - p_e) / (1 - p_e)


def majority(ratings):
    """Majority label of 3 ratings, or None for a 1-1-1 split."""
    label, count = Counter(ratings).most_common(1)[0]
    return label if count >= 2 else None


def collapse(items):
    """Return (judge_labels, human_majorities, n_excluded) dropping 1-1-1 items."""
    judge, human, excluded = [], [], 0
    for _id, j, ratings in items:
        m = majority(ratings)
        if m is None:
            excluded += 1
        else:
            judge.append(j)
            human.append(m)
    return judge, human, excluded


def cohen_items(items):
    judge, human, _ = collapse(items)
    return cohen(judge, human)


def fleiss_items(items):
    return fleiss([ratings for _id, _j, ratings in items])


def _percentile(sorted_vals, q):
    pos = q * (len(sorted_vals) - 1)
    lo, hi = math.floor(pos), math.ceil(pos)
    return sorted_vals[lo] + (sorted_vals[hi] - sorted_vals[lo]) * (pos - lo)


def cluster_bootstrap(items, site_of, n=2000, seed=0, stat=cohen_items):
    """95% CI (lo, hi) of `stat(items)` resampling whole sites with replacement."""
    by_site = {}
    for it in items:
        by_site.setdefault(site_of[it[0]], []).append(it)
    sites = sorted(by_site)
    if not sites:
        return (float("nan"), float("nan"))
    rng = random.Random(seed)
    vals = []
    for _ in range(n):
        sample = [it for s in (rng.choice(sites) for _ in sites) for it in by_site[s]]
        v = stat(sample)
        if not math.isnan(v):
            vals.append(v)
    if not vals:
        return (float("nan"), float("nan"))
    vals.sort()
    return (_percentile(vals, 0.025), _percentile(vals, 0.975))


def gate(fleiss_k, cohen_k, threshold=THRESHOLD):
    """README section 7 gate: use / drop-judge / drop-rubric."""
    if not fleiss_k >= threshold:  # NaN fails
        return "drop-rubric"
    if not cohen_k >= threshold:
        return "drop-judge"
    return "use"


def gate_table(questions, site_of, n=2000, seed=0):
    """questions: {question_id: items}. Returns one row dict per question, sorted by id."""
    rows = []
    for q in sorted(questions):
        items = questions[q]
        _, _, excluded = collapse(items)
        f, c = fleiss_items(items), cohen_items(items)
        lo, hi = cluster_bootstrap(items, site_of, n=n, seed=seed)
        rows.append({
            "question": q, "fleiss": f, "cohen": c, "cohen_ci_lo": lo, "cohen_ci_hi": hi,
            "n_items": len(items), "n_excluded_1_1_1": excluded, "decision": gate(f, c),
        })
    return rows
