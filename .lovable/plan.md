# Add a meta question about the site creator

## Goal
Add a new self-aware survey question asking whether the user thinks the person who built the site is a chumtiya.

## Current state
The survey currently has 14 questions. The final question is labelled "Final question. Do you genuinely feel like everyone around you is a chumtiya except you?"

## Proposed change
Insert a new 14th question before the existing final question, making the survey 15 questions total.

New question:
"Be honest: do you think the person who made this site is a chumtiya?"

Answer options (score 4 to 0):
- "100%. Look at this UI." (score 4, trait: judgment)
- "Probably, yes." (score 3, trait: judgment)
- "A little, yeah." (score 2, trait: judgment)
- "I don't know them." (score 1, trait: normal)
- "No, they seem cool." (score 0, trait: normal)

## Files to edit
- `src/data/questions.ts` — insert the new question before the final question.
- Route metadata files — update references from "14 questions" / "14-question" to "15 questions" / "15-question".

## Verification
- Confirm `questions.length` becomes 15 and `MAX_SCORE` auto-calculates to `15 * 4 = 60`.
- Run `bunx tsgo --noEmit` to confirm no type errors.
- Optionally preview the survey to confirm the new question appears in the right place.
