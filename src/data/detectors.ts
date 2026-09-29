export interface DetectorAnswer {
  text: string;
  score: number; // 0 to 3
}

export interface DetectorQuestion {
  question: string;
  context?: string;
  answers: DetectorAnswer[];
}

export interface DetectorBand {
  min: number;
  max: number;
  title: string;
  emoji: string;
  description: string;
}

export interface DetectorDefinition {
  id: "red-flag" | "toxic-friend" | "delulu";
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  emoji: string;
  themeColor: {
    primary: string;
    border: string;
    bgGlow: string;
    badgeBg: string;
    text: string;
  };
  questions: DetectorQuestion[];
  bands: DetectorBand[];
}

export const DETECTORS: Record<string, DetectorDefinition> = {
  "red-flag": {
    id: "red-flag",
    title: "Red Flag Detector",
    shortTitle: "Red Flag",
    tagline: "Is your partner or crush a walking red carpet, or just slightly sus?",
    badge: "Relationship Rizz & Trap Analysis",
    emoji: "🚩",
    themeColor: {
      primary: "#ef4444",
      border: "border-red-500/40",
      bgGlow: "from-red-500/10 to-transparent",
      badgeBg: "border-red-500/30 bg-red-500/10 text-red-400",
      text: "text-red-400",
    },
    bands: [
      {
        min: 0,
        max: 20,
        title: "Green Forest",
        emoji: "🌿",
        description: "Rare specimen. Shaadi kar lo isse pehle koi aur le jaye. Pure green flag energy.",
      },
      {
        min: 21,
        max: 45,
        title: "Mild Sus",
        emoji: "🟡",
        description: "Thoda caution zaroori hai, par training aur strict guidelines se line pe aa sakta hai.",
      },
      {
        min: 46,
        max: 70,
        title: "Certified Red Flag",
        emoji: "🚩",
        description: "Situationship ka international player. Katna tai hai, bas din aur waqt tay hona baaki hai.",
      },
      {
        min: 71,
        max: 85,
        title: "Lal Qila / Red Carpet",
        emoji: "🎪",
        description: "Yeh insaan nahi, chalti-phirti warning sign hai. Bhaag bro isse pehle therapy ka kharcha uthana pade!",
      },
      {
        min: 86,
        max: 100,
        title: "Chernobyl Radiation Leak",
        emoji: "☢️",
        description: "Guru Randwa pro max. FBI, RAW aur CID milkar bhi iske texts aur bahaane decode nahi kar sakte.",
      },
    ],
    questions: [
      {
        question: "Jab saamne wala online hoke bhi 4 ghante baad reply deta hai, uska reason kya hota hai?",
        answers: [
          { text: "Baby busy thi/thaa samjha karo na...", score: 0 },
          { text: "Phone silent pe tha aur achanak neend aa gayi thi.", score: 1 },
          { text: "Arey notification off tha aur main bas reels dekh raha tha.", score: 2 },
          { text: "Jaanbujh kar late reply karta hai taaki lage ki life bohot exciting hai aur upper hand bana rahe.", score: 3 },
        ],
      },
      {
        question: "Uska/Uski woh 'Best Friend' jiske baare me bola jaata hai: 'Chill bro, he/she is like a sibling to me'?",
        answers: [
          { text: "Normal friendship hai, proper boundaries maintained hain.", score: 0 },
          { text: "Har photo me dono ek dusre pe chadh ke pose dete hain.", score: 1 },
          { text: "Raat ke 2 baje 'as a friend' 1 ghante ki deep life talks chal rahi hoti hain.", score: 2 },
          { text: "Past me dono ka scene tha, par ab claim karte hain ki 'Hum dono bohot mature ho chuke hain.'", score: 3 },
        ],
      },
      {
        question: "Iske circle me aisi kitni 'CISTER' jaisi ladki dost hain?",
        answers: [
          { text: "1 (ek genuine childhood friend hai).", score: 0 },
          { text: "2 (college ki batchmates hain).", score: 1 },
          { text: "3 (har hafte nayi behn introduce hoti hai).", score: 2 },
          { text: "GURU RANDWA HAI SALA... itni 'cisters' hain ki poora parivaar register ho jaye!", score: 3 },
        ],
      },
      {
        question: "Ladaai ya argument ke baad uska primary reaction kya hota hai?",
        answers: [
          { text: "Shant hokar baat karta hai aur matter sort karta hai.", score: 0 },
          { text: "2 din ke liye silent treatment aur one-word replies 'k', 'hmm'.", score: 1 },
          { text: "'Acha theek hai meri hi galti hai na, khush ho jao ab!' (Passive aggressive taunt).", score: 2 },
          { text: "Baat itni ghuma deta hai ki 15 minute baad aap khud ro rahe hote ho aur sorry bol rahe hote ho.", score: 3 },
        ],
      },
      {
        question: "Jab past relationships ki baat nikalti hai, toh purane partners ka kya description milta hai?",
        answers: [
          { text: "'Vibe match nahi hui, we mutually parted ways.'", score: 0 },
          { text: "'Mera past mat poocho, bohot dard aur darkness hai.'", score: 1 },
          { text: "'Mere saare ex pagal/toxic the, bas main akela bechara saint tha.'", score: 2 },
          { text: "'Actually officially breakup nahi hua, hum pichle 9 mahine se break pe hain.'", score: 3 },
        ],
      },
      {
        question: "Commitment aur rishte ko naam dene par uska kya philosophy hai?",
        answers: [
          { text: "Clear clarity aur honesty.", score: 0 },
          { text: "'I really love the vibe, par main abhi labels me believe nahi karta.'", score: 1 },
          { text: "'Hum relationship me nahi hain, par agar tu kisi aur se baat karega toh mujhe gussa aayega.'", score: 2 },
          { text: "6 mahine se date kar rahe ho, par dosto ke saamne bolta hai: 'She/He is just a homie.'", score: 3 },
        ],
      },
      {
        question: "Milne ka plan banane ka track record kaisa hai?",
        answers: [
          { text: "Plan time pe set hota hai aur timely milte hain.", score: 0 },
          { text: "Aakhri 10 minute pe bolta hai: 'Yaar sudden headache ho gaya/mummy ne mana kar diya.'", score: 1 },
          { text: "Sirf tab milta hai jab uska apna kaam phasa ho ya koi aur dost free na ho.", score: 2 },
          { text: "Poora hafta dry text karega, fir achanak Saturday raat 11:45 PM: 'Wyd? Gedi pe chalein?'", score: 3 },
        ],
      },
      {
        question: "Uski Instagram following list me kya dekhne ko milta hai?",
        answers: [
          { text: "Normal dost, meme pages aur college batchmates.", score: 0 },
          { text: "Iska poora following list 'behen jaisi dosto' se hi bhara pada hai.", score: 1 },
          { text: "Close Friends story list alag-alag categories me divide karke rakhi hai.", score: 2 },
          { text: "Post like karega doosro ki, par tumhari story 23 ghante 59 minute baad dekhega.", score: 3 },
        ],
      },
      {
        question: "Aap dono ke saath ki photos aur stories ka kya scene hai?",
        answers: [
          { text: "Normal tag karta hai aur bina kisi natak ke stories daalta hai.", score: 0 },
          { text: "Sirf coffee mug aur aesthetic sneakers ki story jisme tumhara haath 2mm dikhe.", score: 1 },
          { text: "Tum usko tag karo toh repost karne me maut aati hai.", score: 2 },
          { text: "Publicly single banne ke liye bio me 'Focusing on my grind 📈' laga ke rakha hai.", score: 3 },
        ],
      },
      {
        question: "Jab aap apni genuine feeling ya problem express karte ho:",
        answers: [
          { text: "Dhyan se sunta hai aur solution nikaalta hai.", score: 0 },
          { text: "'Tu hamesha overreact karta/karti hai, itni si baat pe scene mat bana.'", score: 1 },
          { text: "Apni purani trauma story shuru kar deta hai taaki focus uske upar shift ho jaye.", score: 2 },
          { text: "'Lagta hai tujhe mujhpe trust hi nahi hai, humara rishta hi waste hai.'", score: 3 },
        ],
      },
    ],
  },

  "toxic-friend": {
    id: "toxic-friend",
    title: "Toxic Friend Detector",
    shortTitle: "Toxic Friend",
    tagline: "Is your friend a ride-or-die homie, or a snake in the grass?",
    badge: "Friendship Parasite & Betrayal Radar",
    emoji: "🐍",
    themeColor: {
      primary: "#10b981",
      border: "border-emerald-500/40",
      bgGlow: "from-emerald-500/10 to-transparent",
      badgeBg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      text: "text-emerald-400",
    },
    bands: [
      {
        min: 0,
        max: 20,
        title: "Jai-Veeru Ka Bhai",
        emoji: "🛡️",
        description: "100% Green Flag Dost. Iske liye kidney bhi de sakte ho, hamesha saath khada rahega.",
      },
      {
        min: 21,
        max: 45,
        title: "Average Bakchod",
        emoji: "😐",
        description: "Thodi chindi harqatein karta hai par crisis aane par sabse pehle daud kar aayega.",
      },
      {
        min: 46,
        max: 70,
        title: "Certified Aasteen Ka Saanp",
        emoji: "🐍",
        description: "Dosti ke bhes me leech. Aapka mental peace khaa raha hai aur secretly jealous hai.",
      },
      {
        min: 71,
        max: 85,
        title: "Parasite King",
        emoji: "☣️",
        description: "Bill splitting se leke crush churane tak me expert. Turant contact list se delete maaro.",
      },
      {
        min: 86,
        max: 100,
        title: "Annihilator / Mahathag 420",
        emoji: "💀",
        description: "Yeh dost nahi, aapka personal villain sponsored by trauma hai. Door reh bhai isse!",
      },
    ],
    questions: [
      {
        question: "Jab aapne usko apna koi saman ya cheez di ho, aur aap usse apna hi saman waapas maangne jao:",
        answers: [
          { text: "'Arey I am sorry lautana bhool gaya tha, le and thank you yaar!'", score: 0 },
          { text: "'Umm wait shaam tak deta hu... abhi kisi aur ko de di woh cheez maine.'", score: 1 },
          { text: "'Abe jaa na le kar!' (Muh phula leta hai aur uske baad baat nahi karta).", score: 2 },
          { text: "Aapka hi saman dene par aapko hi neecha dikhata hai: 'Itni sasti cheez ke liye ro raha hai, le apna kachra.'", score: 3 },
        ],
      },
      {
        question: "Jaise hi group me koi ladki ya crush aati hai, iska behavior kaisa ho jaata hai?",
        answers: [
          { text: "Normal rehta hai, aapko support karta hai aur proper wingman banta hai.", score: 0 },
          { text: "Achanak awaaz deep karke gentleman banne ki acting karta hai.", score: 1 },
          { text: "Cool banne ke chakkar me sabke saamne aapka mazak udata hai: 'Bhai tu naha ke toh aaya hai na?'", score: 2 },
          { text: "Aapka secret crush janne ke baad usi ke DMs me slide karke aapki hi burai shuru kar deta hai.", score: 3 },
        ],
      },
      {
        question: "Har baar khane jao toh bill splitting kaise hoti hai?",
        answers: [
          { text: "Dono bhai apna apna bill aapas me divide/split kar lete hain.", score: 0 },
          { text: "Usko jab tak 3 baar maango na, tab tak paise nahi deta.", score: 1 },
          { text: "Kabhi paise nahi deta aur maangne par muh banane lagta hai.", score: 2 },
          { text: "Once in a blue moon jaise-taise ₹50 dega, aur fir 50 logo ke saamne baith ke ginwayega: 'Maine khilaya tha.'", score: 3 },
        ],
      },
      {
        question: "Jab aapki koi badi achievement hoti hai (job lag gayi, exam nikal gaya, ya promotion mila):",
        answers: [
          { text: "Dil se khush hota hai aur party celebrate karta hai.", score: 0 },
          { text: "'Badhiya hai bhai, chal ab treat kab de raha hai?' (Normal chill reaction).", score: 1 },
          { text: "Pehle 2 second shakal utarti hai, fir bolta hai: 'Arey company toh average hi hai waise.'", score: 2 },
          { text: "Peeth peeche dusro se bolta hai: 'Iska toh luck chal gaya bhai / setting thi iski toh.'", score: 3 },
        ],
      },
      {
        question: "Aapne emotional hoke isko jo apna sabse bada private secret bataya tha:",
        answers: [
          { text: "Hamesha secret rakhta hai, full brotherhood trust.", score: 0 },
          { text: "Kisi teesre mutual dost ko casually bata deta hai.", score: 1 },
          { text: "Next day group me sabke saamne tease karta hai: 'Bata du kya kal tune kya bola tha?'", score: 2 },
          { text: "Aapse choti si behas hote hi poore college/group me aapka secret reveal kar deta hai.", score: 3 },
        ],
      },
      {
        question: "Plans ya situations me yeh compromise karne me kaisa hai?",
        answers: [
          { text: "Samajhta hai aur dono ki suvidha ke hisaab se adjust kar leta hai.", score: 0 },
          { text: "Thoda aana-kaani karta hai, par aakhri me maan jaata hai.", score: 1 },
          { text: "Extreme selfish hai, har cheez sirf iske mann aur comfort ke mutabik honi chahiye.", score: 2 },
          { text: "Agar isko zara sa bhi compromise karne bolo, toh muh bana ke baith jaata hai ya seedha jhagda karne lagta hai.", score: 3 },
        ],
      },
      {
        question: "Weekend pe jab aap dono ka plan bana ho:",
        answers: [
          { text: "Time pe ready rehta hai aur plan follow karta hai.", score: 0 },
          { text: "Aakhri 15 minute pe bahaana banata hai: 'Bhai tabiyat down lag rahi hai.'", score: 1 },
          { text: "Aapka plan cancel karke 2 ghante baad doosre group ke saath cafe ki story daalta hai.", score: 2 },
          { text: "Aapko bataye bina poora trip plan kar leta hai aur bolta hai: 'Arey hume laga tu busy hoga.'", score: 3 },
        ],
      },
      {
        question: "Agar aapka kisi se breakup ya lafda ho jaye:",
        answers: [
          { text: "Aapke saath khada rehta hai aur distract karta hai.", score: 0 },
          { text: "'Chhod na bhai, woh tere layak hi nahi thi.'", score: 1 },
          { text: "Breakup ke 48 ghante ke andar aapke ex ko follow request bhej ke story like karne lagta hai.", score: 2 },
          { text: "Ex ke saath secret texting shuru karke bolta hai: 'Mai toh bas hum dono ka patch-up karwane ki koshish kar raha tha.'", score: 3 },
        ],
      },
      {
        question: "Jab yeh aapko compliment deta hai, toh uska tone kaisa hota hai?",
        answers: [
          { text: "Genuine tareef: 'Bhai mast lag raha hai / sahi kaam kiya.'", score: 0 },
          { text: "'Theek hi lag raha hai waise, pehle se toh better hai.'", score: 1 },
          { text: "'Kapde toh ache hain par tere rang/muh pe suit nahi kar rahe.' (Hidden insult).", score: 2 },
          { text: "'Tujhe aisi ladki mil gayi? Bhai usko aankho me problem hai kya?'", score: 3 },
        ],
      },
      {
        question: "Jab aapko sach me kisi cheez ki urgently zaroorat ho (hospital, transport, emergency):",
        answers: [
          { text: "Bina sawaal pooche 15 minute me haazir ho jaata hai.", score: 0 },
          { text: "Call utha ke bolta hai 'Arey yaar mai abhi thoda door hu, dost ko bhejta hu.'", score: 1 },
          { text: "Phone ring hota rahega, call nahi uthayega aur 6 ghante baad text aayega: 'Phone silent pe tha, kya hua?'", score: 2 },
          { text: "Aapki zaroorat ke time gayab ho jaayega, aur agle din aake bolega: 'Bhai tera phone chhod, pata hai kal mera kitna bada nuksaan ho gaya?'", score: 3 },
        ],
      },
    ],
  },

  delulu: {
    id: "delulu",
    title: "Delulu Detector",
    shortTitle: "Delulu",
    tagline: "Delulu is the only solulu... but are you living in another dimension?",
    badge: "Fantasy, Manifestation & Scenario Diagnostic",
    emoji: "🦄",
    themeColor: {
      primary: "#ec4899",
      border: "border-pink-500/40",
      bgGlow: "from-pink-500/10 to-transparent",
      badgeBg: "border-pink-500/30 bg-pink-500/10 text-pink-400",
      text: "text-pink-400",
    },
    bands: [
      {
        min: 0,
        max: 20,
        title: "Grounded in Reality",
        emoji: "🪨",
        description: "Bhai tu itna practical hai ki sapne me bhi Excel sheet banata hoga. Boring par safe.",
      },
      {
        min: 21,
        max: 45,
        title: "Casual Daydreamer",
        emoji: "🌤️",
        description: "Thoda bohot khayali pulao chalta hai, safe limit ke andar hai. Reality se connect bacha hua hai.",
      },
      {
        min: 46,
        max: 70,
        title: "Certified Delulu Citizen",
        emoji: "🦄",
        description: "Story view ko pyaar samajhne ki bimari ho chuki hai. Sambhal jao, katne ki tayyari hai.",
      },
      {
        min: 71,
        max: 88,
        title: "Fantasyland Ka Prime Minister",
        emoji: "🏰",
        description: "11:11 dekh kar ex ki shaadi todne ka plan banane wale. Mental hospital ki booking chal rahi hai.",
      },
      {
        min: 89,
        max: 100,
        title: "Beyond Orbit / Multiverse Delulu God",
        emoji: "🛸",
        description: "NASA wale isko dhoondh rahe hain. Yeh insaan alag dimension me shaadi karke bachhe paal raha hai.",
      },
    ],
    questions: [
      {
        question: "Public transport ya cafe me kisi cute stranger ne galti se 2 second ke liye aapki taraf dekh liya:",
        answers: [
          { text: "'Normal hai bhai, bas idhar-udhar dekh raha/rahi hogi.'", score: 0 },
          { text: "'Shayad meri shirt ya baal ache lag rahe hain.'", score: 1 },
          { text: "'Pakka mujhpe crush ho gaya hai, bas aake baat karne me shy feel kar raha hai.'", score: 2 },
          { text: "Aankhein milte hi background me Arijit Singh bajne laga, aur maine man hi man hamare 2 bachho ke naam aur wedding hashtag decide kar liye.", score: 3 },
        ],
      },
      {
        question: "Aapne Instagram story daali aur crush ne 3 minute ke andar dekh li:",
        answers: [
          { text: "'Normal hai, Instagram scroll kar raha hoga toh feed me aa gayi.'", score: 0 },
          { text: "'Nice, active hai online.'", score: 1 },
          { text: "'Dekha? Notification on karke baitha hai mere liye, he/she is obsessed with me.'", score: 2 },
          { text: "'Usko pata tha maine yeh gaana uske liye hi lagaya tha... this is indirect telepathic communication.'", score: 3 },
        ],
      },
      {
        question: "Raat ko 1 baje bistar par sone se pehle dimaag me kya chal raha hota hai?",
        answers: [
          { text: "Kal ke tasks aur normal sleep thoughts.", score: 0 },
          { text: "Purani koi cringe memory jise soch ke chadar me muh chhupata hu.", score: 1 },
          { text: "Ek imaginary podcast interview jisme main famous billionaire banke apna struggle bata raha hu.", score: 2 },
          { text: "Ek 45-minute ki Oscar winning film jisme maine crush ko gundo se bachaya, ambulance aayi, aur usne rote hue mujhe confess kiya.", score: 3 },
        ],
      },
      {
        question: "Clock pe 11:11 dikh jaane ya gaadi ki plate pe 444/777 dikhne par aapka reaction:",
        answers: [
          { text: "'Bas time/number plate hai bhai.'", score: 0 },
          { text: "'Aesthetic coincidence hai.'", score: 1 },
          { text: "'Universe mujhe direct confirmation de raha hai ki mera ex waapas aane ke liye tadap raha hai.'", score: 2 },
          { text: "Diary me 55 baar red pen se 'He loves me and only me' likh kar lavender candle jala ke manifest kar raha hu.", score: 3 },
        ],
      },
      {
        question: "Crush ne apni public Spotify playlist me ek naya sad/romantic gaana add kiya:",
        answers: [
          { text: "'Gaana trending hoga isliye add kiya hoga.'", score: 0 },
          { text: "'Acha music taste hai.'", score: 1 },
          { text: "'Yeh lyrics 100% meri situation ko describe kar rahe hain, indirect hint de raha hai.'", score: 2 },
          { text: "Gaane ke lyrics ka screenshot leke 3 dosto ke group me 2 ghante se forensic debate chal rahi hai ki 'Tu' kiske liye use hua hai.", score: 3 },
        ],
      },
      {
        question: "Jab saamne wala obvious toxic red flag nikalta hai:",
        answers: [
          { text: "Turant distance banata hu aur door nikal jaata hu.", score: 0 },
          { text: "Thoda cautious rehta hu.", score: 1 },
          { text: "'Woh bura nahi hai, bas usko aaj tak kisi ne sachha pyaar nahi diya... main usko heal kar dunga/dungi.'", score: 2 },
          { text: "'Uska mujhe ignore karna aur gaali dena hi toh uska unique love language hai... deep down he/she cares.'", score: 3 },
        ],
      },
      {
        question: "Aapke 4 line ke paragraph pe saamne wale ne 14 ghante baad sirf 'Hmm' ya 'Haha' likha:",
        answers: [
          { text: "'Interest nahi hai isko, convo yahin khatam.'", score: 0 },
          { text: "'Busy hoga shayad.'", score: 1 },
          { text: "'Woh mere text ko padh ke itna nervous ho gaya ki uske paas shabdo ki kami pad gayi.'", score: 2 },
          { text: "''Haha' me 4 letters hain... 4 matlab 'L-O-V-E'... coded message bhej raha hai taaki nazar na lage.'", score: 3 },
        ],
      },
      {
        question: "Aapka practical career plan aur financial growth strategy kya hai?",
        answers: [
          { text: "Daily study, skill building aur job applications.", score: 0 },
          { text: "Normal career progress with some side hustles.", score: 1 },
          { text: "'Bas ek din koi reel achanak viral hogi aur seedha Dubai me penthouse le lunga.'", score: 2 },
          { text: "Zero mehnat karte hue din me 8 ghante sochna: 'Mera time aane wala hai, abhi bas main apni divine energy conserve kar raha hu.'", score: 3 },
        ],
      },
      {
        question: "Gym ya library me koi stranger aapke aas-paas aake baithta ya workout karta hai:",
        answers: [
          { text: "Apna kaam/workout karta hu aur nikal jaata hu.", score: 0 },
          { text: "Normal space sharing hai.", score: 1 },
          { text: "'Poori jagah khali thi par mere paas hi kyu aaya? Definitely trying to get my attention.'", score: 2 },
          { text: "'Usne dumbbell uthate waqt meri taraf dekha aur saans li... our cosmic connection is sealed.'", score: 3 },
        ],
      },
      {
        question: "Life me jab saare raaste band ho jayein aur reality chot pohnchaye:",
        answers: [
          { text: "Reality accept karke solution dhoondhta hu.", score: 0 },
          { text: "Thoda break leta hu fir try karta hu.", score: 1 },
          { text: "Reality ignore karke Pinterest pe aesthetic vision boards banata hu.", score: 2 },
          { text: "'Delulu is the only solulu... reality gayi tel lene, meri imaginary duniya me sab kuch mere hisaab se sorted hai.'", score: 3 },
        ],
      },
    ],
  },
};

export function getDetectorQuestions(detectorId: string, targetName?: string): DetectorQuestion[] {
  if (detectorId === "red-flag") {
    const name = targetName?.trim() || "Saamne wala";
    return [
      {
        question: `Jab ${name} online hoke bhi 4 ghante baad reply deta/deti hai, uska reason kya hota hai?`,
        answers: [
          { text: "Baby busy thi/thaa samjha karo na...", score: 0 },
          { text: "Phone silent pe tha aur achanak neend aa gayi thi.", score: 1 },
          { text: "Arey notification off tha aur main bas reels dekh raha tha.", score: 2 },
          { text: `Jaanbujh kar late reply karta hai taaki lage ki ${name} ki life bohot exciting hai aur upper hand bana rahe.`, score: 3 },
        ],
      },
      {
        question: `${name} ka/ki woh 'Best Friend' jiske baare me bola jaata hai: 'Chill bro, he/she is like a sibling to me'?`,
        answers: [
          { text: "Normal friendship hai, proper boundaries maintained hain.", score: 0 },
          { text: "Har photo me dono ek dusre pe chadh ke pose dete hain.", score: 1 },
          { text: "Raat ke 2 baje 'as a friend' 1 ghante ki deep life talks chal rahi hoti hain.", score: 2 },
          { text: "Past me dono ka scene tha, par ab claim karte hain ki 'Hum dono bohot mature ho chuke hain.'", score: 3 },
        ],
      },
      {
        question: `${name} ke circle me aisi kitni 'CISTER' ya 'BROTHER' jaisi close dostiyaan hain?`,
        answers: [
          { text: "1 (ek genuine childhood friend hai).", score: 0 },
          { text: "2 (college ki batchmates hain).", score: 1 },
          { text: "3 (har hafte naya 'sibling' introduce hota hai).", score: 2 },
          { text: `GURU RANDWA PRO MAX HAI... itne 'behen/bhai' hain ki poora parivaar register ho jaye!`, score: 3 },
        ],
      },
      {
        question: `Ladaai ya argument ke baad ${name} ka primary reaction kya hota hai?`,
        answers: [
          { text: "Shant hokar baat karta hai aur matter sort karta hai.", score: 0 },
          { text: "2 din ke liye silent treatment aur one-word replies 'k', 'hmm'.", score: 1 },
          { text: "'Acha theek hai meri hi galti hai na, khush ho jao ab!' (Passive aggressive taunt).", score: 2 },
          { text: "Baat itni ghuma deta hai ki 15 minute baad aap khud ro rahe hote ho aur sorry bol rahe hote ho.", score: 3 },
        ],
      },
      {
        question: `Jab past relationships ki baat nikalti hai, toh ${name} apne exes ko kaise describe karta/karti hai?`,
        answers: [
          { text: "'Vibe match nahi hui, we mutually parted ways.'", score: 0 },
          { text: "'Mera past mat poocho, bohot dard aur darkness hai.'", score: 1 },
          { text: "'Mere saare ex pagal/toxic the, bas main akela bechara saint tha.'", score: 2 },
          { text: "'Actually officially breakup nahi hua, hum pichle 9 mahine se break pe hain.'", score: 3 },
        ],
      },
      {
        question: `Commitment aur rishte ko official naam dene par ${name} ki kya philosophy hai?`,
        answers: [
          { text: "Clear clarity aur honesty.", score: 0 },
          { text: "'I really love the vibe, par main abhi labels me believe nahi karta.'", score: 1 },
          { text: "'Hum relationship me nahi hain, par agar tu kisi aur se baat karega toh mujhe gussa aayega.'", score: 2 },
          { text: "6 mahine se date kar rahe ho, par dosto ke saamne bolta hai: 'She/He is just a homie.'", score: 3 },
        ],
      },
      {
        question: `${name} ke saath milne ka plan banane ka track record kaisa hai?`,
        answers: [
          { text: "Plan time pe set hota hai aur timely milte hain.", score: 0 },
          { text: "Aakhri 10 minute pe bolta hai: 'Yaar sudden headache ho gaya/mummy ne mana kar diya.'", score: 1 },
          { text: `Sirf tab milta hai jab ${name} ka apna kaam phasa ho ya koi aur dost free na ho.`, score: 2 },
          { text: "Poora hafta dry text karega, fir achanak Saturday raat 11:45 PM: 'Wyd? Gedi pe chalein?'", score: 3 },
        ],
      },
      {
        question: `${name} ki Instagram following list me kya dekhne ko milta hai?`,
        answers: [
          { text: "Normal dost, meme pages aur college batchmates.", score: 0 },
          { text: "Iska poora following list 'behen/bhai jaisi dosto' se hi bhara pada hai.", score: 1 },
          { text: "Close Friends story list alag-alag categories me divide karke rakhi hai.", score: 2 },
          { text: "Post like karega doosro ki, par tumhari story 23 ghante 59 minute baad dekhega.", score: 3 },
        ],
      },
      {
        question: `Aap dono ke saath ki photos aur stories pe ${name} ka kya scene hota hai?`,
        answers: [
          { text: "Normal tag karta hai aur bina kisi natak ke stories daalta hai.", score: 0 },
          { text: "Sirf coffee mug aur aesthetic sneakers ki story jisme tumhara haath 2mm dikhe.", score: 1 },
          { text: "Tum usko tag karo toh repost karne me maut aati hai.", score: 2 },
          { text: "Publicly single banne ke liye bio me 'Focusing on my grind 📈' laga ke rakha hai.", score: 3 },
        ],
      },
      {
        question: `Jab aap apni genuine feeling ya insecurity express karte ho, tab ${name} kya bolta/bolti hai?`,
        answers: [
          { text: "Dhyan se sunta hai aur solution nikaalta hai.", score: 0 },
          { text: "'Tu hamesha overreact karta/karti hai, itni si baat pe scene mat bana.'", score: 1 },
          { text: "Apni purani trauma story shuru kar deta hai taaki focus uske upar shift ho jaye.", score: 2 },
          { text: "'Lagta hai tujhe mujhpe trust hi nahi hai, humara rishta hi waste hai.'", score: 3 },
        ],
      },
    ];
  }

  if (detectorId === "toxic-friend") {
    const name = targetName?.trim() || "Aapka dost";
    return [
      {
        question: `Jab aapne ${name} ko apna koi saman ya cheez di ho, aur aap usse apna hi saman waapas maangne jao:`,
        answers: [
          { text: "'Arey I am sorry lautana bhool gaya tha, le and thank you yaar!'", score: 0 },
          { text: "'Umm wait shaam tak deta hu... abhi kisi aur ko de di woh cheez maine.'", score: 1 },
          { text: "'Abe jaa na le kar!' (Muh phula leta hai aur uske baad baat nahi karta).", score: 2 },
          { text: `Aapka hi saman lene par aapko hi neecha dikhata hai: 'Itni sasti cheez ke liye ro raha hai, le apna kachra.'`, score: 3 },
        ],
      },
      {
        question: `Jaise hi group me koi ladki ya crush aati hai, ${name} ka behavior kaisa ho jaata hai?`,
        answers: [
          { text: "Normal rehta hai, aapko support karta hai aur proper wingman banta hai.", score: 0 },
          { text: "Achanak awaaz deep karke gentleman banne ki acting karta hai.", score: 1 },
          { text: "Cool banne ke chakkar me sabke saamne aapka mazak udata hai: 'Bhai tu naha ke toh aaya hai na?'", score: 2 },
          { text: `Aapka secret crush janne ke baad usi ke DMs me slide karke aapki hi burai shuru kar deta hai.`, score: 3 },
        ],
      },
      {
        question: `${name} ke saath bahar khane jao toh bill splitting me ${name} kya nautanki karta hai?`,
        answers: [
          { text: "Dono bhai apna apna bill barabar divide/split kar lete hain.", score: 0 },
          { text: `${name} ko jab tak 3 baar maango na, tab tak paise nahi deta.`, score: 1 },
          { text: "Kabhi paise nahi deta aur maangne par muh banane lagta hai.", score: 2 },
          { text: "Once in a blue moon jaise-taise ₹50 dega, aur fir 50 logo ke saamne baith ke ginwayega: 'Maine khilaya tha.'", score: 3 },
        ],
      },
      {
        question: `Jab aapki koi badi achievement hoti hai (job lag gayi, exam nikal gaya, ya promotion mila), tab ${name} ka asli reaction:`,
        answers: [
          { text: "Dil se khush hota hai aur party celebrate karta hai.", score: 0 },
          { text: "'Badhiya hai bhai, chal ab treat kab de raha hai?' (Normal chill reaction).", score: 1 },
          { text: "Pehle 2 second shakal utarti hai, fir bolta hai: 'Arey company toh average hi hai waise.'", score: 2 },
          { text: `Peeth peeche dusro se bolta hai: 'Iska toh luck chal gaya bhai / setting thi iski toh.'`, score: 3 },
        ],
      },
      {
        question: `Aapne emotional hoke ${name} ko jo apna sabse bada private secret bataya tha, uska kya hua?`,
        answers: [
          { text: "Hamesha secret rakhta hai, full brotherhood trust.", score: 0 },
          { text: "Kisi teesre mutual dost ko casually bata deta hai.", score: 1 },
          { text: "Next day group me sabke saamne tease karta hai: 'Bata du kya kal tune kya bola tha?'", score: 2 },
          { text: `Aapse choti si behas hote hi poore college/group me aapka secret reveal kar deta hai.`, score: 3 },
        ],
      },
      {
        question: `Plans ya hangout me ${name} adjust/compromise karne me kaisa hai?`,
        answers: [
          { text: "Samajhta hai aur dono ki suvidha ke hisaab se adjust kar leta hai.", score: 0 },
          { text: "Thoda aana-kaani karta hai, par aakhri me maan jaata hai.", score: 1 },
          { text: `Extreme selfish hai, har cheez sirf ${name} ke mann aur comfort ke mutabik honi chahiye.`, score: 2 },
          { text: "Agar isko zara sa bhi compromise karne bolo, toh muh bana ke baith jaata hai ya seedha jhagda karne lagta hai.", score: 3 },
        ],
      },
      {
        question: `Weekend pe jab aap dono ka plan bana ho, tab ${name} kya harkat karta hai?`,
        answers: [
          { text: "Time pe ready rehta hai aur plan follow karta hai.", score: 0 },
          { text: "Aakhri 15 minute pe bahaana banata hai: 'Bhai tabiyat down lag rahi hai.'", score: 1 },
          { text: "Aapka plan cancel karke 2 ghante baad doosre group ke saath cafe ki story daalta hai.", score: 2 },
          { text: "Aapko bataye bina poora trip plan kar leta hai aur bolta hai: 'Arey hume laga tu busy hoga.'", score: 3 },
        ],
      },
      {
        question: `Agar aapka kisi se breakup ya lafda ho jaye, toh ${name} kya karta hai?`,
        answers: [
          { text: "Aapke saath khada rehta hai aur distract karta hai.", score: 0 },
          { text: "'Chhod na bhai, woh tere layak hi nahi thi.'", score: 1 },
          { text: "Breakup ke 48 ghante ke andar aapke ex ko follow request bhej ke story like karne lagta hai.", score: 2 },
          { text: `Ex ke saath secret texting shuru karke bolta hai: 'Mai toh bas hum dono ka patch-up karwane ki koshish kar raha tha.'`, score: 3 },
        ],
      },
      {
        question: `Jab ${name} aapko compliment deta hai, toh uska tone kaisa hota hai?`,
        answers: [
          { text: "Genuine tareef: 'Bhai mast lag raha hai / sahi kaam kiya.'", score: 0 },
          { text: "'Theek hi lag raha hai waise, pehle se toh better hai.'", score: 1 },
          { text: "'Kapde toh ache hain par tere rang/muh pe suit nahi kar rahe.' (Hidden insult).", score: 2 },
          { text: "'Tujhe aisi ladki mil gayi? Bhai usko aankho me problem hai kya?'", score: 3 },
        ],
      },
      {
        question: `Jab aapko sach me kisi cheez ki urgently zaroorat ho (hospital, transport, emergency):`,
        answers: [
          { text: "Bina sawaal pooche 15 minute me haazir ho jaata hai.", score: 0 },
          { text: "Call utha ke bolta hai 'Arey yaar mai abhi thoda door hu, dost ko bhejta hu.'", score: 1 },
          { text: "Phone ring hota rahega, call nahi uthayega aur 6 ghante baad text aayega: 'Phone silent pe tha, kya hua?'", score: 2 },
          { text: `Aapki zaroorat ke time gayab ho jaayega, aur agle din aake bolega: 'Bhai tera phone chhod, pata hai kal mera kitna bada nuksaan ho gaya?'`, score: 3 },
        ],
      },
    ];
  }

  return DETECTORS[detectorId]?.questions || [];
}
