# Trim question 9 and question 15

## Goal

Reword the disagreement question (question 9) with your five answers in Hinglish, and cut question 15 down to just the bhakt label with nothing after it.

## Question 9 — "someone disagrees with you"

New wording:

> If someone is arguing or disagreeing with you, what's the first thought that comes to your mind?

Answers, in this order:

1. "Are yeh toh chumtiya hi hai."
2. "Are kahin main hi toh chumtiya nahi?"
3. "I replay the argument for the next three hours." — unchanged
4. "I don't care what you say — I'm right."
5. "Bruh, misunderstanding hogayi hogi."

## Question 15 — the bhakt question

Everything after the label is deleted, so the question reads:

> Are you an andhbhakt — a godi bhakt?

The five existing answers stay exactly as they are ("Yes, proudly." down to "I don't even know what that means.").

## Technical details

File touched: `src/data/questions.ts` only.

- Question 9 (currently "Someone disagrees with you. Deep down, what's your first explanation?"): replace the question line and rewrite four of the five answer lines. Scores and traits: option 1 = 4 judgment, option 2 = 1 normal, option 3 = 2 overthinking (untouched), option 4 = 3 superiority, option 5 = 0 normal.
- Question 15: shorten the question string to "Are you an andhbhakt — a godi bhakt?" and leave its answers block untouched.
- Nothing else changes: question count stays 16, so the progress labels ("09 / 16"), the warning screen, swipe and Back/Next behaviour, scoring maths, result bands and share text all keep working as they do now.

## Verification

- Run the TypeScript check.
- Play the survey in the preview and confirm question 9 shows the new wording with the five Hinglish answers in order, question 15 shows only the bhakt label, and the result screen still appears with a percentage and a trait.
