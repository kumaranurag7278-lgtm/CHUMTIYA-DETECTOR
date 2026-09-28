export type FriendQuestion = {
  question: string;
  answers: {
    text: string;
    points: number; // 0 to 3 points of chumtiyapa
  }[];
};

export function getFriendQuestions(friendName: string): FriendQuestion[] {
  const name = friendName.trim() || "Aapka dost";
  return [
    {
      question: `Jab group me weekend ka plan banta hai, tab ${name} kya nautanki karta hai?`,
      answers: [
        { text: `Plan confirm karke aakhri 10 minute pe bolta hai "Bhai pet kharab ho gaya"`, points: 3 },
        { text: `Full haan bolta hai, fir phone switch off karke agle din dopahar 2 baje reply deta hai`, points: 3 },
        { text: `Aata hai par AC, khana aur sab cheez me nuks nikaal ke sabka mood kharab karta hai`, points: 2 },
        { text: `Time pe pahunch jata hai bina kisi bahane ke (aaj tak kabhi nahi dekha)`, points: 0 },
      ],
    },
    {
      question: `Jab kisi debate ya baat me ${name} galat saabit hota hai, toh reaction kaisa hota hai?`,
      answers: [
        { text: `"Bhai tu samjha hi nahi main actually kya bol raha tha..."`, points: 3 },
        { text: `14 Instagram reels aur 3 ghante ka podcast bhejke prove karne ki koshish karta hai`, points: 3 },
        { text: `Ego pe le leta hai aur 2019 ki koi purani baat beech me ghaseet leta hai`, points: 2 },
        { text: `Shanti se apni galti accept kar leta hai (aisa chamatkaar kabhi nahi hua)`, points: 0 },
      ],
    },
    {
      question: `Sach batana, kya ${name} saala phekta bohot zyada hai?`,
      answers: [
        { text: `Instagram pe 10 Bolero aur Scorpio ki pic laga kar background me Haryanvi gaane bajata hai`, points: 3 },
        { text: `Har doosre din bolta hai "Bhai apne upar tak link hain, neta-police sab jaante hain"`, points: 3 },
        { text: `Kisi aur ki car ya bike ke aage khade hoke 'Hustle & Grind' ka caption chipkata hai`, points: 2 },
        { text: `Nahi bhai, bilkul grounded aur seedha banda hai (jhooth bolne pe paap lagega)`, points: 0 },
      ],
    },
    {
      question: `Kya ${name} selfish hai aur aapke paise ka khaa kar ulta aapko hi ginata hai?`,
      answers: [
        { text: `Hamesha aapke paise se party karega, par ₹20 ke chai ka hisaab 6 mahine tak yaad dilayega`, points: 3 },
        { text: `Google Pay scan karte time uska 'Bank server down' ya OTP gayab ho jata hai`, points: 3 },
        { text: `"Bhai abhi tu de de, sham ko pakka transfer karta hu" bolke lifetime sanyaas le leta hai`, points: 2 },
        { text: `Hamesha apna hisaab barabar rakhta hai aur bina bole split karta hai`, points: 0 },
      ],
    },
    {
      question: `Kya ${name} public area me jaanwaro jaisa vyavhaar karta hai?`,
      answers: [
        { text: `Restaurant ya public me achanak zor-zor se gaaliyan bolta hai taaki sab use dekhein`, points: 3 },
        { text: `Waiter ya delivery wale par faltu ka rob jhaadta hai "Tujhe pata hai main kaun hu?"`, points: 3 },
        { text: `Public me aisi aisi cringe harkatein karta hai ki aapko uske saath chalne me sharam aati hai`, points: 3 },
        { text: `Civilized aur tameezdaar insaan ki tarah behave karta hai`, points: 0 },
      ],
    },
    {
      question: `Kya ${name} ladkiyon ke saamne zabardasti nonchalant aur ultra-cool banne ki acting karta hai?`,
      answers: [
        { text: `Ladki dekhte hi awaz bhari karke "I don't give a f**k" wala mysterious look deta hai`, points: 3 },
        { text: `Ladkiyon ke saamne cool banne ke chakkar me apne hi dosto ki beizzati karne lagta hai`, points: 3 },
        { text: `Achanak se phone nikaal ke fake serious business call pe baat karne ka natak karta hai`, points: 2 },
        { text: `Bilkul natural aur normal rehta hai bina kisi sasti acting ke`, points: 0 },
      ],
    },
    {
      question: `Kya ${name} khud ko sabse bada 30-markhan aur baaki sabko chumtiya kehta firta hai?`,
      answers: [
        { text: `Har sentence ke baad bolta hai "Bhai sab ke sab chumtiya hain, bas main hi akalmand hu"`, points: 3 },
        { text: `Agar aap sach bol do toh bolega "Maine kab kiya aisa?! Tu hi sabse bada chumtiya hai"`, points: 3 },
        { text: `Ye report dekh kar sharminda hone ke bajaye 5 aur mutual dosto ko forward karega hasne ke liye`, points: 2 },
        { text: `Nahi, sabki respect karta hai aur bohot humble hai (100% safed jhooth)`, points: 0 },
      ],
    },
  ];
}
