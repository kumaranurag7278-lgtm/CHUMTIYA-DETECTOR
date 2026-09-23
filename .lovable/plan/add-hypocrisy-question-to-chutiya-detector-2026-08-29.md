# Add hypocrisy question to CHUTIYA DETECTOR

## Goal

Add one new survey question that captures the "can't take a joke, but loves dishing them out" hypocrisy vibe, translated from the user's Hinglish prompt.

## Proposed wording

> "If someone makes fun of you or jokes about you, you get rage baited easily — but when you make fun of others, you find it hilarious. Agree?"

## Placement

Insert as question 6 (after the gossip/insecurities question and before the Friday-night question), so it sits with the other judgment/hypocrisy questions.

## Scoring

Use the same 5-answer scale as the other questions:

- "100%. I can dish it but I can't take it." — score 4, trait `judgment`
- "Mostly true." — score 3, trait `judgment`
- "Sometimes, depends on the joke." — score 2, trait `judgment`
- "I try not to make fun of people." — score 1, trait `normal`
- "No, I laugh at myself too." — score 0, trait `normal`

## Files to edit

1. `src/data/questions.ts`

- Insert the new question object at index 5.
- `MAX_SCORE` is already `questions.length * 4`, so it will auto-update from 48 to 52.

2. `src/routes/index.tsx`

- Update metadata that mentions "12 questions" to "13 questions".

## Verification

- Run a type check.
- Optionally run the Playwright survey flow to confirm the new question appears and the result percentage still calculates correctly.
