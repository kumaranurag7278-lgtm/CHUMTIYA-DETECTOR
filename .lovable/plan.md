# CHUTIYA DETECTOR — Plan

A single-page, three-stage joke personality quiz. No backend, no accounts, no storage.

## Flow

```text
LANDING  ->  SURVEY (10 screens, 1 question each)  ->  RESULT  ->  TRY AGAIN
```

## 1. Landing
- Full-viewport, near-black background, oversized "CHUTIYA DETECTOR" headline with tight tracking.
- Subtitle: "Let's find out what's actually wrong with you."
- Single button: "DETECT CHUTIYA" — fades/slides the landing out and the first question in.
- Small disclaimer line in muted text: not a real test.

## 2. Survey
- One question per screen, vertically centered, occupying the viewport.
- Top: "03 / 10" counter plus a thin progress bar that animates on each answer.
- Center: large question text.
- Below: 5 rounded, full-width answer buttons with subtle hover/press states.
- Selecting an answer highlights it for ~150ms, then the current question slides left and out while the next slides in from the right (~450ms). Only one question visible at any time.
- No Next button. State held in React (`step`, `answers[]`).
- Reduced-motion preference respected (crossfade instead of slide).

## 3. Questions and scoring
- 10 questions in a plain data file, ordered from light to increasingly revealing.
- Wording based on the provided list, polished for flow; answer sets vary per question (not always the same 5 labels) so the "correct" answer is not always in the same position — a few questions are reverse-scored so the high-score option is not always last.
- Each answer carries `score` 0–4 and a `trait` tag: superiority, cynicism, judgment, isolation, overthinking, anti-mainstream, main-character.
- `percentage = round(total / (questions.length * 4) * 100)`. Fully deterministic — no randomness.

## 4. Result
- Bands: 0–20 Surprisingly Normal, 21–40 Slightly Sus, 41–60 Certified Chutiya, 61–80 Advanced Chutiya, 81–95 Premium Chutiya, 96–100 Final Boss Chutiya.
- Primary trait = highest accumulated trait score across answers; if the overall percentage is ≤ 20, the trait is forced to "Surprisingly Normal". Ties broken by a fixed trait priority order.
- Layout: "YOUR CHUTIYA LEVEL" label, huge percentage counting up 0 → final over ~1s, band name scaling/fading in, then "PRIMARY TRAIT" with its short, funny, mildly insulting description.
- "TRY AGAIN" resets state back to question 1 (landing skipped).

## 5. Visual design
- Dark background, one hot accent colour for the progress bar, selected state and the result percentage; everything else near-white/greys.
- Strong modern sans (Space Grotesk headings / Inter-style body) loaded via a `<link>` in the root route head.
- All colours as semantic tokens in `src/styles.css`; no gradients-everywhere, no icons, no cards.
- Responsive: fluid type via `clamp()`, comfortable tap targets, content stays centred on mobile.

## Technical notes
- Rewrites `src/routes/index.tsx` as the only route; adds page `head()` with app-specific title/description/OG tags.
- Files: `src/data/questions.ts` (questions + traits + result bands), `src/components/Landing.tsx`, `src/components/Survey.tsx`, `src/components/QuestionCard.tsx`, `src/components/ProgressBar.tsx`, `src/components/Result.tsx`, plus scoring helpers in `src/lib/scoring.ts`.
- Stage machine (`landing | survey | result`) lives in the index route component.
- Animations via CSS keyframes/transitions defined in `src/styles.css`. No new dependencies.
