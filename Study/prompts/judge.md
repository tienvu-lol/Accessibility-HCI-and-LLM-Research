# Usability ranking task

You are evaluating four versions of the same two-page static website, labelled
V1, V2, V3 and V4. The labels are arbitrary. Judge only what is in front of you.

## Variants

{{variants}}

## Task

For each of the 14 questions below, rank V1-V4 from best (rank 1) to worst. Rank
each question on its own; do not let one answer drive another.

**Ties are allowed.** If two or more variants are equally good on a question, give
them the same rank. Use ties whenever you cannot honestly separate them. Ranks are
integers from 1 to 4.

Questions:

{{questions}}

For Q11-Q14 judge form and contextual appropriateness from the HTML and any
screenshots. You cannot verify that alt text accurately depicts an image; judge
whether it is the right kind of text for that image's purpose (not a filename, not
"image of...", not empty when informative, not longer than 15 words).

## Output

Return one JSON object and nothing else: no commentary, no markdown fences. Keys
are "Q1" to "Q14"; each value maps "V1", "V2", "V3", "V4" to an integer rank.

{"Q1":{"V1":1,"V2":2,"V3":2,"V4":4},"Q2":{"V1":1,"V2":1,"V3":1,"V4":1},...}
