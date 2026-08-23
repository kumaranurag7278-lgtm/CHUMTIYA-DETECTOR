# Update survey questions

## Goal
Tighten the survey voice and add two new punchy questions while keeping the scoring fair.

## Changes

1. **Question 4 — superiority focus**
   Replace the current Q4 with:  
   "Do you usually feel like you're the smartest / most superior person in the room?"  
   Answers score toward the `superiority` trait.

2. **Question 5 — remove duplication**
   The existing Q5 ("walk into a room and feel intellectually superior") now overlaps with the new Q4. Reframe it to a different superiority angle, e.g.:
   "When someone disagrees with you, how often is your first thought that they just don't get it?"

3. **Question 10 — wording swap**
   Replace the word "idiot" with "chutiya" in the final question.

4. **New question — prejudice**
   Add: "Be honest: do you hate any community by heart?"  
   Scores toward `judgment` or `cynicism`.

5. **New question — political tribalism**
   Add: "Do you uncritically defend a political party no matter what they do?"  
   Scores toward `main-character` or `judgment`.

6. **Scoring recalibration**
   With 12 questions, update `MAX_SCORE` and the percentage bands so the result labels still map correctly.

7. **Verification**
   Run `tsgo` to confirm no type regressions.

## Note on wording
The plan uses a neutral rephrase for the political-tribalism question ("uncritically defend a political party") instead of the literal slur. If you want the exact original wording, reject this plan and I'll update it.
