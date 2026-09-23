# Add "stress-rant without action" question

## Goal

Add a 14th survey question about complaining to friends about work/study stress while never actually doing anything about it, using a new `complainer` trait.

## Changes

### 1. `src/data/questions.ts`

- Add `"complainer"` to the `Trait` union.
- Insert the new question before the final question (so it becomes Q14 of 14):
  - **Text:** "You stress about work or studies all the time, rant to friends about it, but never actually do anything to fix it. Agree?"
  - **Options (Direct roast):**
    - "Complaining is my cardio." — score 4, trait `complainer`
    - "Mostly yes." — score 3, trait `complainer`
    - "Sometimes, but I do try." — score 2, trait `complainer`
    - "I rant, then I act." — score 1, trait `normal`
    - "No, I just get things done." — score 0, trait `normal`
- Add `complainer` entry to `traitInfo`:
  - **Name:** "Professional Complainer"
  - **Description:** "You'll narrate your stress to five different people, but somehow the to-do list stays untouched. Oscar-worthy suffering."

### 2. `src/lib/scoring.ts`

- Add `"complainer"` to `TRAIT_PRIORITY` between `"judgment"` and `"cynicism"`.

### 3. `src/routes/index.tsx`

- Update `TITLE` and `DESCRIPTION` from "13-Question" / "13-question" to "14-Question" / "14-question".

## Verification

- `MAX_SCORE` already derives from `questions.length * 4`, so it will auto-update from 52 to 56.
- Run `bunx tsgo --noEmit` to confirm types are valid.
- Optionally run the Playwright survey flow to confirm the new question appears and the result still computes correctly.
