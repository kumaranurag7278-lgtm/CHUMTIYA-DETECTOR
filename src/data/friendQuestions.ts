export type FriendQuestion = {
  question: string;
  answers: {
    text: string;
    points: number; // 0 to 3 points of chumtiyapa
  }[];
};

export function getFriendQuestions(friendName: string): FriendQuestion[] {
  const name = friendName.trim() || "Your friend";
  return [
    {
      question: `When weekend plans are made in the group, what does ${name} do?`,
      answers: [
        { text: `Cancels 10 minutes prior with "bhai pet kharab ho gaya"`, points: 3 },
        { text: `Confirms enthusiastically, ghosts completely, replies next day at 2 PM`, points: 3 },
        { text: `Shows up, complains about the AC, drinks everyone's beverage`, points: 2 },
        { text: `Actually shows up on time (suspiciously rare occurrence)`, points: 0 },
      ],
    },
    {
      question: `How does ${name} react when someone proves them wrong in a debate?`,
      answers: [
        { text: `"Bhai tu samjha nahi main kya bol raha tha..."`, points: 3 },
        { text: `Sends 14 Instagram reels and a 3-hour podcast clip as "proof"`, points: 3 },
        { text: `Gets personally offended and brings up a mistake from 2019`, points: 2 },
        { text: `Calmly smiles, accepts it, and admits mistake (never seen before)`, points: 0 },
      ],
    },
    {
      question: `What is ${name}'s personal financial philosophy?`,
      answers: [
        { text: `Spends ₹4,000 on random Zara impulse buy, cries about ₹40 auto fare`, points: 3 },
        { text: `Borrows ₹500 for "emergency petrol", experiences sudden amnesia for 6 months`, points: 3 },
        { text: `"Crypto and F&O is guaranteed 10x easy money bro, trust me"`, points: 2 },
        { text: `Splits the bill instantly to the exact paisa`, points: 1 },
      ],
    },
    {
      question: `What does ${name}'s Instagram story feed usually look like?`,
      answers: [
        { text: `Cryptic heartbreak shayaris with dark emo music even though single`, points: 3 },
        { text: `47 stories a day, 40 of which are aesthetic cafe coffee cups`, points: 2 },
        { text: `Gym mirror selfies with caption "GRIND NEVER STOPS 🐺"`, points: 2 },
        { text: `Ghost mode: 0 posts, only stalks mutuals and sends reels at 3 AM`, points: 1 },
      ],
    },
    {
      question: `If ${name} gets stuck in traffic:`,
      answers: [
        { text: `Tells the cab driver "shortcut le lo bhai" and gets stuck for 2 more hours`, points: 3 },
        { text: `Honks aggressively at the red light timer while it is still on 45`, points: 3 },
        { text: `Starts giving an unsolicited lecture on urban infrastructure`, points: 2 },
        { text: `Silently puts on headphones and accepts fate`, points: 0 },
      ],
    },
    {
      question: `If you confront ${name} with this diagnosis right now:`,
      answers: [
        { text: `"Maine kab kiya aisa?! Tu hi sabse bada chumtiya hai"`, points: 3 },
        { text: `Will laugh like a villain and forward it to 5 other mutual friends`, points: 2 },
        { text: `Will take a screenshot and post it as a badge of honor`, points: 2 },
        { text: `Will act maturely and introspect on personal flaws (zero percent chance)`, points: 0 },
      ],
    },
  ];
}
