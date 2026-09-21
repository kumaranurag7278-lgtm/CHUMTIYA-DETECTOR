# Rework and reorder the survey questions

## Goal

Polish the requested wording, replace the specified questions, add three new personality questions, and arrange the full survey so it flows from lighter social habits into sharper behavior and finishes with the existing final question.

## Revised 17-question order

1. Parties and concerts feeling pointless — keep.
2. **Site creator:** Move the current site-creator question here, replacing and removing the current percentage-of-people question.
3. Having fewer friends because people quickly become annoying — keep.
4. **Smartest in the room:** Change to: “Do you always feel like you're the smartest person in the room — and everyone else is a chumtiya?” Keep its existing answer scores and superiority traits.
5. Gossiping about people's insecurities or secrets — keep.
6. Getting offended by jokes while enjoying jokes about others — keep.
7. **Cancelling plans:** Replace the current Friday-night question with: “Are you the kind of person who always cancels plans at the last moment?” Add five answers ranging from always cancelling to reliably showing up, scored toward isolation at the high end.
8. **Judging other people's fun:** Replace the trends/NPC question with: “When you see people enjoying themselves or doing something different, is your first thought that they're chumtiya or cringe?” Add five answers from immediate harsh judgment to letting people enjoy things, scored toward judgment at the high end.
9. Assuming people who disagree simply do not understand — keep.
10. **Ghosting old friends:** Add: “Have you ever ghosted or ditched old friends because you found new friends or better options?” Add five answers from doing it without regret to staying loyal, scored toward judgment/isolation.
11. **Attention-seeking:** Add: “Do you usually try to make yourself the centre of attention? Or do some corny shit to grab attention ?” Add five answers from constantly seeking attention to being comfortable outside the spotlight, scored toward main-character behavior.
12. **Playing the victim:** Add: “When you mess up, do you play the victim and somehow make it everyone else's fault?” Include a top-answer joke based on: “Baby i cheated on you because  — its your fault i was depressed .,” then scale down to accepting responsibility. Score the high end toward main-character/judgment.
13. Hating a community — keep.
14. Uncritically defending a political party — keep.
15. “Are you a Modi bhakt? Does your Sanatan Dharma only come out near mosques("jaldi se jai shree ram bol deta hu inki gaand jl jayegi hahahhaha? ” — keep.
16. Stressing and ranting about work/studies without acting — keep.
17. Existing “everyone around you is a chumtiya except you” final question — keep as the finale.
  &nbsp;

## Supporting updates

- Keep five answers per new/replaced question and use the existing 4-to-0 scoring style.
- Preserve all untouched questions, answers, traits, transitions, swipe behavior, disclaimer, sharing, retry confirmation, and result presentation.
- Update page metadata from 15 questions to 17 questions.
- Keep the existing dynamic score calculation; with 17 questions it reports a 68-point nominal ceiling, while the site-creator question intentionally remains capped at 2 as previously requested.

## Verification

- Confirm there are exactly 17 questions in the order above and the old percentage and trends/NPC questions are gone.
- Confirm each new question has five clear answers with valid traits and scores.
- Run the TypeScript check.
- Preview the flow to confirm the new Q2, Q4, Q7, Q8, additions, and final question appear in the correct positions.