# Static UI repair task

You are repairing a two-page slice of a static {{category}} website. The slice is
three files: the home page, one content page, and the stylesheet they share. There
is no build step, no framework and no server; the files are opened directly in a
browser.

Work only inside these three files. Do not create new files, do not add external
resources, fonts, scripts or stylesheets, and do not introduce any network request.

## Input files

<<<INPUT FILE: index.html>>>
{{index_html_content}}
<<<INPUT FILE: {{form_page}}>>>
{{form_page_content}}
<<<INPUT FILE: {{stylesheet}}>>>
{{stylesheet_content}}
<<<END INPUT>>>

## Criteria

Evaluate and repair against the WCAG 2.2 success criteria supplied below as JSON.
These are the criteria in scope for this task; use them, and only them, as the
standard for what counts as a problem.

In each entry, `text` is the normative W3C text of the success criterion and
`static_html_test` is operational guidance for how that criterion applies to a static
HTML page. The `excluded` block lists criteria that are out of scope here, with the
reason; do not report findings against those.

{{wcag_criteria_json}}

In the `<<<EVAL>>>` JSON below, `criterion` is the WCAG success criterion number
exactly as it appears in the `num` field above, for example `"1.4.3"`.

## Procedure

Do these two steps in this order, in this one response.

1. **Evaluate first.** Read all three files and record every problem you find, as a
   list of findings. Do not repair anything while evaluating.
2. **Then repair.** Rewrite the three files so that the problems you recorded in
   step 1 are fixed. Repair only what your own evaluation found.

## Output format

Return exactly this and nothing else:

<<<EVAL>>>
{"findings":[{"criterion":"1.4.3","severity":"high","location":"nav a.secondary","issue":"...","fix":"..."}]}
<<<FILE: index.html>>>
...complete file...
<<<FILE: {{form_page}}>>>
...complete file...
<<<FILE: {{stylesheet}}>>>
...complete file...
<<<END>>>

### The `<<<EVAL>>>` block

One single line of valid JSON: an object with one key, `findings`, whose value is an
array of finding objects. Every finding object has exactly these five keys:

- `criterion` — see the Criteria section above for what goes here.
- `severity` — one of `"high"`, `"medium"`, `"low"`.
- `location` — a CSS selector identifying the element, prefixed with the file name
  when it is not `index.html`, e.g. `nav a.secondary` or
  `{{form_page}} form#apply input[name=email]`.
- `issue` — one sentence on what is wrong.
- `fix` — one sentence on the change you made for it.

If you find no problems, return `{"findings":[]}` and the three files unchanged.
Do not pretty-print the JSON and do not wrap it in a code fence.

### The `<<<FILE: ...>>>` blocks

- Exactly three file blocks, in the order shown: `index.html`, `{{form_page}}`,
  `{{stylesheet}}`. Use those three paths verbatim as the block names.
- Each block holds the **complete** file, from its first byte to its last —
  `<!DOCTYPE html>` through `</html>` for the two HTML files. Never a fragment, a
  diff, an excerpt, or a summary, and never a placeholder such as
  `<!-- unchanged -->`.
- Return all three files even if you changed nothing in one of them.
- Close the response with `<<<END>>>`.

## Hard constraints

- **No commentary.** No text before `<<<EVAL>>>`, between blocks, or after
  `<<<END>>>`. No preamble, no explanation, no notes on what you changed.
- **No markdown fences.** Do not wrap the JSON or the files in ``` fences. The HTML
  is returned as raw HTML, not escaped and not inside a JSON string.
- **Preserve every relative path exactly as written.** Do not rewrite `href`, `src`
  or `link` values, do not make them absolute, do not add a leading `/`, and do not
  rename or move files. The pages are loaded from disk and any rewritten path breaks
  them.
- **Preserve all visible text**, verbatim, except where a fix you recorded in step 1
  requires changing that text. Do not rewrite copy for tone, length or polish, do not
  translate, and do not delete sections, images, links, form fields or navigation
  items. Removing content is not a repair.
- Keep the page's existing structure, layout and visual design intact apart from your
  fixes. Keep the stylesheet's existing selectors working for both pages.
