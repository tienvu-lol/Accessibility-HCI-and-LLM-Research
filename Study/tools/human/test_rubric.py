import re
import unittest
from pathlib import Path

RUBRIC = Path(__file__).resolve().parents[2] / "human" / "rubric.md"


class RubricTest(unittest.TestCase):
    def setUp(self):
        self.text = RUBRIC.read_text(encoding="utf-8")

    def test_14_headings(self):
        nums = [int(n) for n in re.findall(r"^## Q(\d+)\.", self.text, re.M)]
        self.assertEqual(nums, list(range(1, 15)))

    def test_no_condition_names(self):
        for word in ("wcag", "both", "naive", "nielsen"):
            self.assertIsNone(re.search(rf"\b{word}\b", self.text, re.I), word)

    def test_tie_and_note_rules(self):
        self.assertIn("**Tie rule:**", self.text)
        self.assertIn("**Note rule:**", self.text)


if __name__ == "__main__":
    unittest.main()
