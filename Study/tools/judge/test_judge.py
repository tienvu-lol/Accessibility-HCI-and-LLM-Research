import csv
import json
import os
import tempfile
import unittest
from pathlib import Path

from Study.tools.judge import judge


def good(tie=False):
    d = {f"Q{i}": {"V1": 1, "V2": 2, "V3": 3, "V4": 4} for i in range(1, 15)}
    if tie:
        d["Q3"] = {"V1": 1, "V2": 1, "V3": 3, "V4": 3}
    return d


LABELS = {"V1": "both", "V2": "wcag", "V3": "naive", "V4": "nielsen"}
VARIANTS = {l: {"index.html": f"<html>{l}</html>"} for l in judge.LABELS}


class JudgeTests(unittest.TestCase):
    def test_parser_accepts_ties(self):
        out = judge.parse_response("```json\n" + json.dumps(good(tie=True)) + "\n```")
        self.assertEqual(out["Q3"], {"V1": 1, "V2": 1, "V3": 3, "V4": 3})

    def test_parser_rejects_missing_question(self):
        d = good()
        del d["Q9"]
        with self.assertRaises(judge.JudgeParseError):
            judge.parse_response(json.dumps(d))

    def test_parser_rejects_bad_rank(self):
        d = good()
        d["Q1"]["V2"] = 7
        with self.assertRaises(judge.JudgeParseError):
            judge.parse_response(json.dumps(d))

    def test_unblind_and_row_count(self):
        rows = judge.unblind(judge.parse_response(json.dumps(good())), LABELS,
                             "UNI-01", "A1", "m", "c1")
        self.assertEqual(len(rows), 56)
        r = [x for x in rows if x[2] == "h9_error_recovery"]
        self.assertEqual({x[3]: x[4] for x in r},
                         {"both": 1, "wcag": 2, "naive": 3, "nielsen": 4})

    def test_mock_path_offline(self):
        old = os.environ.get("STUDY_MOCK")
        os.environ["STUDY_MOCK"] = "1"
        try:
            with tempfile.TemporaryDirectory() as d:
                out = Path(d) / "v" / "judge_rankings.csv"
                judge.judge_item("UNI-01", "A1", VARIANTS, LABELS, {}, "c1", out)
                with open(out, newline="") as f:
                    rows = list(csv.DictReader(f))
                self.assertEqual(len(rows), 56)
                self.assertEqual(list(rows[0]), judge.HEADER)
        finally:
            if old is None:
                os.environ.pop("STUDY_MOCK")
            else:
                os.environ["STUDY_MOCK"] = old

    def test_load_key_and_prompt(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "k.csv"
            with open(p, "w", newline="") as f:
                w = csv.writer(f)
                w.writerow(["site_id", "arm", "label_shown", "condition"])
                for l, c in LABELS.items():
                    w.writerow(["UNI-01", "A1", l, c])
            self.assertEqual(judge.load_key(p, "UNI-01", "A1"), LABELS)
            with self.assertRaises(ValueError):
                judge.load_key(p, "UNI-02", "A1")
        prompt = judge.build_prompt(VARIANTS)
        self.assertIn("Q14", prompt)
        self.assertNotIn("{{", prompt.split("## Output")[0])


if __name__ == "__main__":
    unittest.main()
