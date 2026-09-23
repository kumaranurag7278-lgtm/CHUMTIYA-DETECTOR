# Personality Reveal

Build a simple, polished, funny personality-survey website called "CHUTIYA DETECTOR".

IMPORTANT:

This is a small fun project, NOT a real psychological test. Keep the implementation simple. Do not add login, signup, database, backend, leaderboard, profiles, authentication, admin panel, payment system, or unnecessary features.

## CORE USER FLOW

The entire website should have only 3 stages:

1. Landing screen

2. Survey — one question per screen

3. Final result screen

The experience should feel like a smooth full-screen interactive quiz.

---

# 1. LANDING SCREEN

Create a minimal, visually striking landing page.

Main heading:

"CHUTIYA DETECTOR"

Subtitle:

"Let's find out what's actually wrong with you."

Primary button:

"DETECT CHUTIYA"

When the user clicks the button, the landing screen should transition smoothly into the first survey question.

Do not show the questions on the landing page.

---

# 2. SURVEY

The survey contains around 10 questions.

IMPORTANT UX RULE:

Show ONLY ONE QUESTION AT A TIME.

Do NOT put all questions on one page.

Each question should occupy almost the entire viewport and feel like its own screen.

Layout:

- Question number / progress at the top

- Large question in the center

- 4–5 answer buttons underneath

- Clean spacing

- Minimal distractions

Example:

03 / 10

"Do you think going to parties or concerts is mostly a waste of time?"

[ Definitely ]

[ Usually ]

[ Sometimes ]

[ Not really ]

[ Absolutely not ]

When the user selects an answer:

1. Store the answer in JavaScript state.

2. Do NOT require a separate "Next" button.

3. Automatically animate the current question out.

4. Slide the next question into view.

5. Continue until all questions are answered.

The transition should feel like:

Current question → slides left/out

Next question → slides in from the right

Use smooth CSS transitions/animations.

The animation should be quick and satisfying, around 400–600ms.

The user should never see two questions at the same time.

Include a small progress indicator such as:

01 / 10

02 / 10

03 / 10

You can also use a subtle progress bar.

---

# 3. QUESTIONS

The questions should NOT be generic "are you lazy?" personality-test questions.

The entire joke of the website is that it detects whether someone has an exaggerated tendency to think that other people are stupid, annoying, pointless, or beneath them.

Questions should explore:

- intellectual superiority

- cynicism

- social judgment

- thinking other people are stupid

- dislike of mainstream behavior

- social isolation

- overthinking

- self-awareness

- intolerance toward other people's interests

- thinking "everyone is an idiot except me"

Use questions such as:

1.

"Do you think going to parties or concerts is mostly a waste of time?"

2.

"Do you feel that most people in your country are chutiya?"

3.

"Do you have fewer friends because you think most people are stupid or annoying?"

4.

"When someone enjoys something you consider pointless, how do you usually react?"

5.

"How often do you think you're smarter than most people around you?"

6.

"Would you rather spend a Friday night alone than go out with a group?"

7.

"Do you think people who blindly follow trends are basically NPCs?"

8.

"When someone strongly disagrees with you, what's your first assumption?"

9.

"Do you frequently look at other people's decisions and think, 'Why the fuck would you do that?'"

10.

"Do you ever genuinely feel like everyone around you is an idiot except you?"

Rewrite/improve the wording where necessary so the questions feel natural and entertaining.

The questions should feel increasingly revealing as the survey progresses.

Do NOT make every question obviously point toward the same answer.

---

# 4. ANSWER SCORING

Each answer should contribute a hidden numerical score.

Higher score = stronger "chutiya" tendency.

Do not show the scoring system to the user.

For example:

Answer values can range from 0–4.

0 = low chutiya tendency

1 = mild

2 = neutral

3 = high

4 = very high

Calculate the total score after the final question.

Convert it into a percentage:

percentage = (totalScore / maximumPossibleScore) * 100

Round the final percentage to an integer.

Do NOT randomly generate the result.

The result must actually depend on the user's answers.

---

# 5. RESULT CLASSIFICATION

Create several result ranges.

Example:

0–20:

"Surprisingly Normal"

21–40:

"Slightly Sus"

41–60:

"Certified Chutiya"

61–80:

"Advanced Chutiya"

81–95:

"Premium Chutiya"

96–100:

"Final Boss Chutiya"

You can adjust the exact ranges if needed to make the results feel balanced.

The result page should prominently display:

"YOUR CHUTIYA LEVEL"

Then:

"73%"

Then:

"Advanced Chutiya"

Then a short personalized explanation.

---

# 6. PERSONALIZED RESULT TRAIT

This is an important part of the final result.

Based on the user's answers, determine a PRIMARY TRAIT.

Possible traits:

- Intellectual Superiority Complex

- Chronic Cynicism

- Social Judgment

- Main Character Syndrome

- Professional Overthinker

- Anti-Mainstream Syndrome

- People Are Annoying™

- Surprisingly Normal

The trait should be determined from the user's answers rather than randomly selected.

For example, if the user repeatedly gives answers indicating they think they're smarter than others:

PRIMARY TRAIT:

"Intellectual Superiority Complex"

Description:

"You don't necessarily hate people. You just seem to have reached the statistically impressive conclusion that you're surrounded by idiots."

If the user scores highly on judging other people's lifestyles:

PRIMARY TRAIT:

"Social Judgment"

Description:

"You have opinions about how other people live their lives. Unfortunately, nobody asked."

If the user scores highly on isolation/avoiding people:

PRIMARY TRAIT:

"People Are Annoying™"

Description:

"You could probably get along with people. You just seem to have decided that most of them aren't worth the trouble."

If the user scores low:

PRIMARY TRAIT:

"Surprisingly Normal"

Description:

"Against all odds, you appear capable of accepting that other people can enjoy things you don't."

Keep descriptions short, funny, and slightly insulting.

Do NOT make them genuinely abusive or hateful.

---

# 7. RESULT SCREEN DESIGN

The result screen should feel more dramatic than the survey.

Example:

YOUR CHUTIYA LEVEL

73%

ADVANCED CHUTIYA

PRIMARY TRAIT

Intellectual Superiority Complex

"You don't necessarily hate people. You just seem to have reached the statistically impressive conclusion that you're surrounded by idiots."

Then optionally a small button:

"TRY AGAIN"

The retry button should reset the survey state and return the user to question 1.

No sharing system is required.

---

# 8. VISUAL DESIGN

Make the website look modern and intentional rather than like a college HTML assignment.

Design direction:

- Dark background

- High contrast typography

- Minimal interface

- Large bold typography

- Slightly absurd / irreverent aesthetic

- Smooth animations

- Rounded answer buttons

- Subtle hover effects

- Good spacing

- Responsive on desktop and mobile

Do NOT overload it with:

- gradients everywhere

- excessive cards

- unnecessary icons

- random illustrations

- huge amounts of text

- complicated navigation

The joke should come from the content and presentation.

Use a strong modern sans-serif font.

The landing page should feel dramatic.

The survey should feel clean.

The result page should feel slightly ridiculous.

---

# 9. ANIMATIONS

Animations are important.

Landing → Survey:

- smooth fade/slide transition

Question transition:

- selected answer briefly highlights

- current question slides left

- next question slides in from right

- progress indicator updates smoothly

Result:

- percentage can animate from 0 → final score

- result classification can fade/scale into view

Keep animations fast and smooth.

Do not use excessive bouncing or distracting animations.

---

# 10. RESPONSIVENESS

The website must work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

On mobile:

- Questions should fit comfortably

- Answer buttons should be easy to tap

- Text should not overflow

- Animations should remain smooth

- The main content should stay vertically centered

---

# 11. TECHNICAL REQUIREMENTS

Keep the architecture simple.

Prefer:

HTML

CSS

JavaScript

If using React, keep it lightweight and component-based.

Suggested components if using React:

App

Landing

Question

Survey

ProgressBar

Result

Keep all survey questions and scoring data in a simple JavaScript data structure.

Example conceptual structure:

questions = [

{

    question: "...",

    answers: [

      { text: "...", score: 0 },

      { text: "...", score: 1 },

      { text: "...", score: 2 },

      { text: "...", score: 3 },

      { text: "...", score: 4 }

    ]

}

]

Do not create a backend.

Do not use a database.

Do not store personal information.

No external API is required.

---

# 12. IMPORTANT SCOPE LIMIT

This is intentionally a SMALL project.

Do NOT add:

- Login

- Signup

- Database

- User accounts

- Leaderboards

- Social feeds

- Comments

- AI chatbot

- Admin dashboard

- Payment

- Analytics dashboard

- Complex backend

- Authentication

- Email collection

The only meaningful interaction should be:

START → ANSWER QUESTIONS → GET RESULT → RETRY

Focus heavily on making those three stages polished.

---

# 13. CODE QUALITY

Write clean, readable code.

Keep survey data separate from UI logic where practical.

Use semantic HTML where applicable.

Avoid unnecessary dependencies.

Make the project easy for a beginner/intermediate developer to understand and modify.

Add comments only where they actually help.

Most importantly:

DO NOT overengineer this project.

The final website should feel like a polished 2–5 minute internet experience that someone would send to a friend saying:

"Bro take this test 💀"

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
