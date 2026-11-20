"""Pure-python statistics for README section 8 (no numpy/scipy)."""
import math


def _gammaincc(a, x):
    """Regularized upper incomplete gamma Q(a, x)."""
    if x <= 0:
        return 1.0
    lg = math.lgamma(a)
    if x < a + 1:
        term = total = 1.0 / a
        n = a
        for _ in range(1000):
            n += 1
            term *= x / n
            total += term
            if abs(term) < abs(total) * 1e-15:
                break
        return 1.0 - total * math.exp(-x + a * math.log(x) - lg)
    tiny = 1e-300
    b = x + 1 - a
    c = 1 / tiny
    d = 1 / b
    h = d
    for i in range(1, 1000):
        an = -i * (i - a)
        b += 2
        d = an * d + b
        d = tiny if abs(d) < tiny else d
        c = b + an / c
        c = tiny if abs(c) < tiny else c
        d = 1 / d
        delta = d * c
        h *= delta
        if abs(delta - 1) < 1e-15:
            break
    return math.exp(-x + a * math.log(x) - lg) * h


def chi2_sf(x, df):
    return _gammaincc(df / 2.0, x / 2.0)


def average_ranks(values):
    """1-based ranks, ties get the mean rank."""
    order = sorted(range(len(values)), key=lambda i: values[i])
    ranks = [0.0] * len(values)
    i = 0
    while i < len(order):
        j = i
        while j + 1 < len(order) and values[order[j + 1]] == values[order[i]]:
            j += 1
        for t in range(i, j + 1):
            ranks[order[t]] = (i + j) / 2.0 + 1
        i = j + 1
    return ranks


def _tie_sum(blocks):
    total = 0.0
    for row in blocks:
        counts = {}
        for v in row:
            counts[v] = counts.get(v, 0) + 1
        total += sum(t ** 3 - t for t in counts.values())
    return total


def _rank_sums(blocks):
    k = len(blocks[0])
    rank_rows = [average_ranks(list(r)) for r in blocks]
    return [sum(r[j] for r in rank_rows) for j in range(k)]


def kendall_w(blocks):
    """Kendall's W over n blocks (raters) x k conditions, tie-corrected."""
    n, k = len(blocks), len(blocks[0])
    sums = _rank_sums(blocks)
    mean = n * (k + 1) / 2.0
    s = sum((x - mean) ** 2 for x in sums)
    denom = n * n * (k ** 3 - k) / 12.0 - n * _tie_sum(blocks) / 12.0
    return s / denom if denom > 0 else 0.0


def friedman(blocks):
    """blocks: n rows of k condition scores. Tie-corrected chi2, df, p, mean ranks, Kendall W."""
    n, k = len(blocks), len(blocks[0])
    sums = _rank_sums(blocks)
    mean_ranks = [s / n for s in sums]
    denom = n * k * (k + 1) - _tie_sum(blocks) / (k - 1)
    if denom <= 0:
        return {"chi2": 0.0, "df": k - 1, "p": 1.0, "mean_ranks": mean_ranks, "kendall_w": 0.0}
    mean = n * (k + 1) / 2.0
    s = sum((x - mean) ** 2 for x in sums)
    chi2 = 12.0 * s / denom
    return {"chi2": chi2, "df": k - 1, "p": chi2_sf(chi2, k - 1),
            "mean_ranks": mean_ranks, "kendall_w": kendall_w(blocks)}


def wilcoxon(x, y):
    """Paired two-sided signed-rank. Exact if n<=25 and no ties, else normal approx (tie + continuity corrected)."""
    d = [a - b for a, b in zip(x, y) if a != b]
    n = len(d)
    if n == 0:
        return {"w": 0.0, "n": 0, "p": 1.0}
    ranks = average_ranks([abs(v) for v in d])
    w_plus = sum(r for r, v in zip(ranks, d) if v > 0)
    w = min(w_plus, n * (n + 1) / 2.0 - w_plus)
    if n <= 25 and len(set(ranks)) == n:
        counts = [0] * (n * (n + 1) // 2 + 1)
        counts[0] = 1
        for r in range(1, n + 1):
            for s in range(len(counts) - 1, r - 1, -1):
                counts[s] += counts[s - r]
        p = min(1.0, 2.0 * sum(counts[:int(w) + 1]) / 2 ** n)
    else:
        groups = {}
        for r in ranks:
            groups[r] = groups.get(r, 0) + 1
        var = n * (n + 1) * (2 * n + 1) / 24.0 - sum(t ** 3 - t for t in groups.values()) / 48.0
        if var <= 0:
            return {"w": w, "n": n, "p": 1.0}
        z = (abs(w - n * (n + 1) / 4.0) - 0.5) / math.sqrt(var)
        p = min(1.0, math.erfc(max(z, 0.0) / math.sqrt(2)))
    return {"w": w, "n": n, "p": p}


def holm(pvals):
    """Holm step-down adjusted p-values (monotone), original order."""
    m = len(pvals)
    out = [0.0] * m
    running = 0.0
    for rank, i in enumerate(sorted(range(m), key=lambda i: pvals[i])):
        running = max(running, min(1.0, (m - rank) * pvals[i]))
        out[i] = running
    return out


def benjamini_hochberg(pvals):
    """BH step-up adjusted p-values (monotone), original order."""
    m = len(pvals)
    out = [0.0] * m
    running = 1.0
    order = sorted(range(m), key=lambda i: pvals[i])
    for rank in range(m - 1, -1, -1):
        i = order[rank]
        running = min(running, pvals[i] * m / (rank + 1))
        out[i] = running
    return out


def quadrant_counts(points):
    """points: (x, y) = (delta violation rate, net usability rank advantage), both - wcag.
    Lower-left (x<0, y<0) is the trade-off: violations improved, usability lost."""
    q = {"lower_left": 0, "lower_right": 0, "upper_left": 0, "upper_right": 0, "on_axis": 0}
    for x, y in points:
        if x == 0 or y == 0:
            q["on_axis"] += 1
        elif x < 0:
            q["lower_left" if y < 0 else "upper_left"] += 1
        else:
            q["lower_right" if y < 0 else "upper_right"] += 1
    total = len(points)
    q["total"] = total
    q["trade_off_share"] = q["lower_left"] / total if total else 0.0
    return q
