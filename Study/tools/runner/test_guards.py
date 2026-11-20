import unittest
from Study.tools.runner import guards as g

HTML = "<html><body><p>Hello world, this is some text.</p></body></html>"
GOOD = '<<<EVAL>>>\n{"findings":[]}\n<<<FILE: index.html>>>\n' + HTML + '\n<<<FILE: s.css>>>\na{}\n<<<END>>>'


class T(unittest.TestCase):
    def test_valid(self):
        r = g.parse_response(GOOD)
        self.assertEqual(r["findings"], [])
        self.assertEqual(r["files"], {"index.html": HTML, "s.css": "a{}"})

    def test_missing_end(self):
        with self.assertRaises(g.ParseError):
            g.parse_response(GOOD.replace("<<<END>>>", ""))

    def test_fenced(self):
        with self.assertRaises(g.ParseError):
            g.parse_response("```\n" + GOOD + "\n```")

    def test_bad_json(self):
        with self.assertRaises(g.ParseError):
            g.parse_response(GOOD.replace('{"findings":[]}', "nope"))

    def test_truncation(self):
        self.assertEqual(g.check_truncation({"index.html": HTML}, {"index.html": HTML}), (True, ""))
        ok, why = g.check_truncation({"index.html": HTML[:-7]}, {"index.html": HTML})
        self.assertFalse(ok)
        self.assertIn("</html>", why)
        small = "<html><body>Hi</body></html>"
        self.assertFalse(g.check_truncation({"index.html": small}, {"index.html": HTML})[0])

    def test_text_chars_skips_script(self):
        self.assertEqual(g.text_chars("<p>a  b</p><script>xxxx</script><style>y</style>"), 3)

    def test_hash(self):
        a = {"i.html": "<p>x</p>\n<!-- c -->", "s.css": "a{}/* c */"}
        b = {"i.html": "<p>x</p>   ", "s.css": "a{}"}
        self.assertEqual(g.normalize_hash(a), g.normalize_hash(b))
        self.assertNotEqual(g.normalize_hash(a), g.normalize_hash({**b, "i.html": "<p>y</p>"}))


if __name__ == "__main__":
    unittest.main()
