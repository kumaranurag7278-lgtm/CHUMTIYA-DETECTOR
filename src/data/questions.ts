export type Trait =
  | "superiority"
  | "cynicism"
  | "judgment"
  | "isolation"
  | "overthinking"
  | "anti-mainstream"
  | "main-character"
  | "normal";

export type Answer = {
  text: string;
  score: number; // 0 (low) - 4 (very high)
  trait: Trait;
};

export type Question = {
  question: string;
  answers: Answer[];
};

export const questions: Question[] = [
  {
    question: "Do you think going to parties or concerts is mostly a waste of time?",
    answers: [
      { text: "Complete waste. Loud rooms full of nothing.", score: 4, trait: "anti-mainstream" },
      { text: "Usually, yeah.", score: 3, trait: "anti-mainstream" },
      { text: "Depends who's there.", score: 2, trait: "judgment" },
      { text: "Not really, they're fine.", score: 1, trait: "normal" },
      { text: "No, I actually love them.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Be honest: what percentage of people in your country would you classify as chutiya?",
    answers: [
      { text: "Basically all of them.", score: 4, trait: "cynicism" },
      { text: "Comfortably the majority.", score: 3, trait: "cynicism" },
      { text: "About half, on a good day.", score: 2, trait: "cynicism" },
      { text: "A loud minority.", score: 1, trait: "normal" },
      { text: "People are mostly alright.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Do you have fewer friends because most people annoy you within ten minutes?",
    answers: [
      { text: "I have almost no friends, by design.", score: 4, trait: "isolation" },
      { text: "My circle keeps shrinking and I'm fine with it.", score: 3, trait: "isolation" },
      { text: "I'm selective, let's call it that.", score: 2, trait: "isolation" },
      { text: "I just don't have much time.", score: 1, trait: "normal" },
      { text: "No, I like having people around.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Someone is genuinely excited about something you consider pointless. What happens in your head?",
    answers: [
      { text: "I'm happy for them, honestly.", score: 0, trait: "normal" },
      { text: "Not my thing, but sure.", score: 1, trait: "normal" },
      { text: "I nod and quietly wonder why.", score: 2, trait: "judgment" },
      { text: "I lose a little respect for them.", score: 3, trait: "judgment" },
      { text: "I explain, at length, why it's stupid.", score: 4, trait: "judgment" },
    ],
  },
  {
    question: "How often do you catch yourself thinking you're the smartest person in the room?",
    answers: [
      { text: "Every room. Every time.", score: 4, trait: "superiority" },
      { text: "Most rooms, let's be real.", score: 3, trait: "superiority" },
      { text: "Sometimes, depends on the room.", score: 2, trait: "superiority" },
      { text: "Rarely.", score: 1, trait: "normal" },
      { text: "Never — plenty of people outclass me.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Friday night. Group plan just landed in your phone. What do you actually want?",
    answers: [
      { text: "Go out. Obviously.", score: 0, trait: "normal" },
      { text: "Go, but leave early.", score: 1, trait: "normal" },
      { text: "Depends entirely on my mood.", score: 2, trait: "isolation" },
      { text: "Make an excuse, stay in.", score: 3, trait: "isolation" },
      { text: "Mute the group. Alone is objectively better.", score: 4, trait: "isolation" },
    ],
  },
  {
    question: "People who blindly follow every trend are basically NPCs. Agree?",
    answers: [
      { text: "They're not even running their own software.", score: 4, trait: "anti-mainstream" },
      { text: "Mostly agree.", score: 3, trait: "anti-mainstream" },
      { text: "Some are, some aren't.", score: 2, trait: "judgment" },
      { text: "That's a bit harsh.", score: 1, trait: "normal" },
      { text: "Nah, people are allowed to like things.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Someone strongly disagrees with you. What's your very first assumption?",
    answers: [
      { text: "They might know something I don't.", score: 0, trait: "normal" },
      { text: "We're probably defining the words differently.", score: 1, trait: "overthinking" },
      { text: "I replay the argument for the next three hours.", score: 2, trait: "overthinking" },
      { text: "They didn't understand what I said.", score: 3, trait: "superiority" },
      { text: "They're simply not equipped for this conversation.", score: 4, trait: "superiority" },
    ],
  },
  {
    question: "How often do you look at someone's life choices and think, \"why would you do that?\"",
    answers: [
      { text: "Several times a day.", score: 4, trait: "main-character" },
      { text: "Most days.", score: 3, trait: "main-character" },
      { text: "Now and then.", score: 2, trait: "judgment" },
      { text: "Rarely — everyone's got reasons.", score: 1, trait: "normal" },
      { text: "Honestly never, not my business.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Final question. Do you genuinely feel like everyone around you is an idiot except you?",
    answers: [
      { text: "Yes. And it's exhausting being right.", score: 4, trait: "main-character" },
      { text: "Mostly yes, with a few exceptions.", score: 3, trait: "superiority" },
      { text: "Some days, yes.", score: 2, trait: "cynicism" },
      { text: "No, I'm an idiot too sometimes.", score: 1, trait: "normal" },
      { text: "Not at all — I learn from people constantly.", score: 0, trait: "normal" },
    ],
  },
];

export const MAX_SCORE = questions.length * 4;

export type Band = {
  min: number;
  max: number;
  label: string;
};

export const bands: Band[] = [
  { min: 0, max: 20, label: "Surprisingly Normal" },
  { min: 21, max: 40, label: "Slightly Sus" },
  { min: 41, max: 60, label: "Certified Chutiya" },
  { min: 61, max: 80, label: "Advanced Chutiya" },
  { min: 81, max: 95, label: "Premium Chutiya" },
  { min: 96, max: 100, label: "Final Boss Chutiya" },
];

export const traitInfo: Record<Trait, { name: string; description: string }> = {
  superiority: {
    name: "Intellectual Superiority Complex",
    description:
      "You don't necessarily hate people. You've just reached the statistically impressive conclusion that you're surrounded by idiots.",
  },
  cynicism: {
    name: "Chronic Cynicism",
    description:
      "You expect the worst from everyone, which means you're rarely disappointed and never invited anywhere.",
  },
  judgment: {
    name: "Social Judgment",
    description: "You have detailed opinions about how other people live. Unfortunately, nobody asked.",
  },
  isolation: {
    name: "People Are Annoying\u2122",
    description:
      "You could get along with people just fine. You've simply decided most of them aren't worth the battery life.",
  },
  overthinking: {
    name: "Professional Overthinker",
    description:
      "You've replayed a conversation from 2019 more times than you've replayed your favourite song. Impressive stamina.",
  },
  "anti-mainstream": {
    name: "Anti-Mainstream Syndrome",
    description:
      "The moment something becomes popular, it becomes beneath you. Your personality has a strict door policy.",
  },
  "main-character": {
    name: "Main Character Syndrome",
    description:
      "Everyone else is background cast in a film you're directing badly. The reviews are not in yet.",
  },
  normal: {
    name: "Surprisingly Normal",
    description:
      "Against all odds, you appear capable of accepting that other people can enjoy things you don't. Suspicious.",
  },
};
