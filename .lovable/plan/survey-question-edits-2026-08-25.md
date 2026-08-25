# Survey question edits

## Changes to `src/data/questions.ts`

1. **Remove question 5** — "Do you secretly enjoy being the most knowledgeable person in a conversation?" (superiority angle already covered by Q4).

2. **Remove question 9** — "How often do you look at someone's life choices and think, 'why would you do that?'"

3. **Add a new question** on gossip and mocking insecurities:
   "Do you gossip about people's insecurities or secrets for fun — and make jokes out of them?"
   Five answers scoring 4 down to 0, weighted toward the `judgment` trait at the high end and `normal` at the low end.

Net question count goes from 13 to 12. `MAX_SCORE` is derived from `questions.length`, so scoring and the percentage bands stay correct with no extra changes.

## Verification
Run `tsgo` to confirm no type regressions, and check the survey flow in the preview.
