# Update Question 4 wording

## Goal

Rewrite Question 4 so it captures the user's intent: feeling like the smartest person in the room while dismissing anyone who seems better as a chumtiya.

## Current state

Question 4 currently reads: "Do you usually feel like you're the smartest / most superior person in the room?"

## Proposed change

Replace Question 4 with:
"Do you feel like you're the smartest in the room — and anyone who seems better than you is probably just a chumtiya?"

Keep the existing five answer options and their scores/traits unchanged.

## Files to edit

- `src/data/questions.ts` — update the `question` string for the fourth entry.

## Verification

- Run `bunx tsgo --noEmit` to confirm no type errors.
- Optionally preview the survey to confirm the new wording displays correctly.
