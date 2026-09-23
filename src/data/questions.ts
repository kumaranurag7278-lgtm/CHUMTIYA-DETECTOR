export type Trait =
  | "superiority"
  | "cynicism"
  | "judgment"
  | "complainer"
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
    question: "Do you genuinely feel like everyone around you is a chumtiya except you?",
    answers: [
      { text: "Yes. And it's exhausting being right.", score: 4, trait: "main-character" },
      { text: "Mostly yes, with a few exceptions.", score: 3, trait: "superiority" },
      { text: "Some days, yes.", score: 2, trait: "cynicism" },
      { text: "No, I'm a chumtiya too sometimes.", score: 1, trait: "normal" },
      { text: "Not at all — I learn from people constantly.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Be honest: are parties and concerts mostly just loud rooms full of nothing?",
    answers: [
      { text: "Complete waste. Loud rooms full of nothing.", score: 4, trait: "anti-mainstream" },
      { text: "Usually, yeah.", score: 3, trait: "anti-mainstream" },
      { text: "Depends who's there.", score: 2, trait: "judgment" },
      { text: "Not really, they're fine.", score: 1, trait: "normal" },
      { text: "No, I actually love them.", score: 0, trait: "normal" },
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
    question: "Do you always feel like you're the smartest person in the room — and everyone else is a chumtiya?",
    answers: [
      { text: "Every room. Every time.", score: 4, trait: "superiority" },
      { text: "Most rooms, let's be real.", score: 3, trait: "superiority" },
      { text: "Sometimes, depends on the room.", score: 2, trait: "superiority" },
      { text: "Rarely.", score: 1, trait: "normal" },
      { text: "Never \u2014 plenty of people outclass me.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Do you gossip about people's insecurities or secrets for fun \u2014 and make jokes out of them?",
    answers: [
      { text: "It's basically my main hobby.", score: 4, trait: "judgment" },
      { text: "Often, and the jokes are good.", score: 3, trait: "judgment" },
      { text: "Sometimes, with close friends.", score: 2, trait: "judgment" },
      { text: "Rarely, and I feel bad after.", score: 1, trait: "normal" },
      { text: "Never \u2014 that's just cruel.", score: 0, trait: "normal" },
    ],
  },

  {
    question: "If someone makes fun of you or jokes about you, you get rage baited easily \u2014 but when you make fun of others, you find it hilarious. Agree?",
    answers: [
      { text: "100%. I can dish it but I can't take it.", score: 4, trait: "judgment" },
      { text: "Mostly true.", score: 3, trait: "judgment" },
      { text: "Sometimes, depends on the joke.", score: 2, trait: "judgment" },
      { text: "I try not to make fun of people.", score: 1, trait: "normal" },
      { text: "No, I laugh at myself too.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Are you the kind of person who always cancels plans at the last moment?",
    answers: [
      { text: "Always. My cancellation text is basically scheduled.", score: 4, trait: "isolation" },
      { text: "Very often — the plan sounded better yesterday.", score: 3, trait: "isolation" },
      { text: "Sometimes, if my social battery dies.", score: 2, trait: "isolation" },
      { text: "Rarely, and only for a real reason.", score: 1, trait: "normal" },
      { text: "Never. If I said I'll come, I show up.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "When you see people enjoying themselves or doing something different, is your first thought that they're chumtiya or cringe?",
    answers: [
      { text: "Immediately. The cringe detector never rests.", score: 4, trait: "judgment" },
      { text: "Usually — I judge first and ask questions never.", score: 3, trait: "judgment" },
      { text: "Sometimes, if it's genuinely ridiculous.", score: 2, trait: "judgment" },
      { text: "Rarely. It doesn't really affect me.", score: 1, trait: "normal" },
      { text: "No. Let people enjoy things.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Someone disagrees with you. Deep down, what's your first explanation?",
    answers: [
      { text: "They might know something I don't.", score: 0, trait: "normal" },
      { text: "We're probably defining the words differently.", score: 1, trait: "overthinking" },
      { text: "I replay the argument for the next three hours.", score: 2, trait: "overthinking" },
      { text: "They didn't understand what I said.", score: 3, trait: "superiority" },
      { text: "They're simply not equipped for this conversation.", score: 4, trait: "superiority" },
    ],
  },
  {
    question: "Have you ever ghosted or ditched old friends because you found new friends or better options?",
    answers: [
      { text: "Yes. Upgrades are upgrades — no regrets.", score: 4, trait: "judgment" },
      { text: "More than once, if I'm honest.", score: 3, trait: "isolation" },
      { text: "Maybe once. I handled it badly.", score: 2, trait: "judgment" },
      { text: "We drifted apart, but I didn't ghost them.", score: 1, trait: "normal" },
      { text: "No. New friends don't replace old ones.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Do you usually try to make yourself the centre of attention — or do some corny shit just to get noticed?",
    answers: [
      { text: "Obviously. Every room needs a main character.", score: 4, trait: "main-character" },
      { text: "Often. Silence feels like bad publicity.", score: 3, trait: "main-character" },
      { text: "Sometimes, when the room is too boring.", score: 2, trait: "main-character" },
      { text: "Rarely. I don't need the spotlight.", score: 1, trait: "normal" },
      { text: "Never. I'm happy letting others shine.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "When you mess up, do you play the victim and somehow make it everyone else's fault?",
    answers: [
      { text: "Baby, I cheated because I was depressed — this is somehow your fault.", score: 4, trait: "main-character" },
      { text: "Usually. Accountability ruins the storyline.", score: 3, trait: "main-character" },
      { text: "Sometimes, before I calm down and admit it.", score: 2, trait: "judgment" },
      { text: "Rarely. I try to own what I did.", score: 1, trait: "normal" },
      { text: "No. If I messed up, I say so.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Be honest: do you hate any community by heart?",
    answers: [
      { text: "Yes. And I have receipts.", score: 4, trait: "judgment" },
      { text: "A couple, quietly.", score: 3, trait: "judgment" },
      { text: "Maybe one, but I keep it to myself.", score: 2, trait: "judgment" },
      { text: "I dislike individuals, not groups.", score: 1, trait: "normal" },
      { text: "No, that's messed up.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Be honest: do you think the person who made this site is a chumtiya?",
    answers: [
      { text: "100% sala chumtiya hi hai.", score: 2, trait: "judgment" },
      { text: "Probably, yes.", score: 1, trait: "judgment" },
      { text: "A little, yeah.", score: 1, trait: "judgment" },
      { text: "I don't know.", score: 0, trait: "normal" },
      { text: "No, he seems cool.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "Are you a Modi bhakt? Does your Sanatan Dharma only come out near mosques — 'jaldi se Jai Shree Ram bol deta hoon, inki gaand jal jayegi, hahaha'?",
    answers: [
      { text: "Yes, proudly.", score: 4, trait: "main-character" },
      { text: "Pretty much.", score: 3, trait: "main-character" },
      { text: "I lean that way.", score: 2, trait: "judgment" },
      { text: "Not really.", score: 1, trait: "normal" },
      { text: "I don't even know what that means.", score: 0, trait: "normal" },
    ],
  },
  {
    question: "You stress about work or studies all the time, rant to friends about it, but never actually do anything to fix it. Agree?",
    answers: [
      { text: "Complaining is my cardio.", score: 4, trait: "complainer" },
      { text: "Mostly yes.", score: 3, trait: "complainer" },
      { text: "Sometimes, but I do try.", score: 2, trait: "complainer" },
      { text: "I rant, then I act.", score: 1, trait: "normal" },
      { text: "No, I just get things done.", score: 0, trait: "normal" },
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
  { min: 41, max: 60, label: "Certified Chumtiya" },
  { min: 61, max: 80, label: "Advanced Chumtiya" },
  { min: 81, max: 95, label: "Premium Chumtiya" },
  { min: 96, max: 100, label: "Final Boss Chumtiya" },
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
  complainer: {
    name: "Professional Complainer",
    description:
      "You'll narrate your stress to five different people, but somehow the to-do list stays untouched. Oscar-worthy suffering.",
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
