"""Checks the console attributed an A5/A6 run per arm, per key and per machine.

Used by e2e-open-arms.sh: argv = <state.json from /api/state> <the A5 key that was set in the console>.
"""
import json
import sys


def main(path, a5_key):
    st = json.load(open(path, encoding="utf-8"))
    a5_id = "a5:" + a5_key[-4:]
    rows = [u for u in st["recent_usage"] if u["arm"] in ("A5", "A6")]
    assert len(rows) == 2, "expected one usage row per open arm, got %r" % rows
    by = {u["arm"]: u for u in rows}

    # A5's key came from the console, so the row names it; A6's never left the laptop, so it reads local:<machine>
    assert by["A5"]["key_id"] == a5_id, by["A5"]
    assert by["A6"]["key_id"].startswith("local:"), by["A6"]
    assert by["A5"]["key_id"] != by["A6"]["key_id"], "the two arms must not share a key"
    for arm, u in sorted(by.items()):
        assert u["mock"] is False, u
        assert u["worker"].endswith(arm.lower()), (arm, u["worker"])
        assert u["input"] > 0 and u["output"] > 0, u
        assert u["model_id"], u
        print("  %s: machine=%-26s key=%-24s model=%s" % (arm, u["worker"], u["key_id"], u["model_id"]))

    keys = {k["id"]: k for k in st["projection"]["by_key"]}
    assert a5_id in keys, list(keys)
    assert any(k.startswith("local:") for k in keys), list(keys)
    machines = st["projection"]["by_machine"]
    assert len(machines) >= 2, machines
    for m in machines:
        print("  machine %-26s calls=%-3s tokens=%-8s spend=$%.2f arms=%s"
              % (m["id"], m["calls"], m["input"] + m["output"], m["cost_usd"], [a["arm"] for a in m["arms"]]))

    # and every finished cell is attributed to the machine that ran it
    chars = {m["char"]: m["id"] for m in st["machines"]}
    for arm in ("A5", "A6"):
        row = st["matrix_workers"][arm]["naive"]
        ran = [chars[c] for c in row if c in chars]
        assert ran, "no machine recorded for any %s cell (%r)" % (arm, row)
        assert all(r.endswith(arm.lower()) for r in ran), (arm, row, ran)
        print("  cells of %s ran on %s" % (arm, sorted(set(ran))))
    print("  attribution OK: separate keys, separate machines, per-cell provenance")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
