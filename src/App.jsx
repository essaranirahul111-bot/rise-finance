import React, { useState } from "react";
import {
  Home, BookOpen, Bot, Trophy, TrendingUp, Info, Globe,
  CheckCircle2, Circle, Flame, Award, ChevronRight, Send,
  Sparkles, Lock, ArrowRight, Landmark, ShieldAlert, PiggyBank,
  Mic, Volume2
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const MODULES = [
  {
    id: "money-basics",
    title: "Money Basics",
    difficulty: "Beginner",
    time: "8 min",
    icon: "💵",
    desc: "What money actually is, and why it only works if people trust it.",
    built: true,
    explanation:
      "Money is just something everyone agrees to accept in exchange for stuff. It's not valuable because of what it's made of — a Rs. 5,000 note is a piece of paper. It's valuable because everyone trusts it'll still be worth Rs. 5,000 tomorrow.",
    example:
      "You mow a lawn for Rs. 500. You could try trading that effort directly for groceries, but the shopkeeper doesn't need a lawn mowed. Money solves that — you get paid in something the shopkeeper *will* accept.",
    takeaway: "Money is a trust system, not a thing with built-in value.",
    quiz: [
      {
        q: "Why does a Rs. 1,000 note have value?",
        options: ["The paper is expensive", "People agree to accept it", "The government owns it"],
        correct: 1,
      },
      {
        q: "Money mainly solves the problem of...",
        options: ["Printing costs", "Trading things directly", "Bank holidays"],
        correct: 1,
      },
      {
        q: "If people stopped trusting a currency, it would...",
        options: ["Become worth more", "Lose its value", "Stay exactly the same"],
        correct: 1,
      },
    ],
    ur: {
      title: "پیسے کی بنیاد",
      explanation:
        "پیسہ دراصل ایک ایسی چیز ہے جسے سب لوگ کسی چیز کے بدلے قبول کرنے پر متفق ہوں۔",
    },
    roman: {
      title: "Paisay Ki Bunyaad",
      explanation:
        "Paisa asal mein woh cheez hai jise sab log kisi cheez ke badle qabool karne par muttafiq hon. Ye is liye qeemti nahi ke iska material mehnga hai — balke is liye ke aapko yaqeen hai ke kal bhi ye utna hi chalay ga.",
    },
  },
  {
    id: "budgeting",
    title: "Budgeting",
    difficulty: "Beginner",
    time: "10 min",
    icon: "📊",
    desc: "Giving every rupee a job before you spend it.",
    built: true,
    explanation:
      "A budget isn't a punishment — it's a plan for where your money goes before it disappears on its own. The simplest version: split what comes in into 'spend now,' 'save,' and 'give/share.'",
    example:
      "You get Rs. 3,000 allowance for the month. Try: Rs. 2,000 for regular spending, Rs. 800 saved, Rs. 200 for anything unexpected. Adjust the split — the point is that every rupee has a job.",
    takeaway: "A budget just means deciding where money goes before it decides for you.",
    quiz: [
      { q: "A budget is best described as...", options: ["A punishment", "A plan for your money", "A bank requirement"], correct: 1 },
      { q: "What's a reasonable first split of income?", options: ["100% spend now", "Spend / save / buffer", "Save 0%, spend all"], correct: 1 },
      { q: "Why keep a small 'unexpected' buffer?", options: ["It's required by law", "Surprises always cost money", "Banks ask for it"], correct: 1 },
    ],
    ur: { title: "بجٹ سازی", explanation: "بجٹ سزا نہیں، بلکہ یہ طے کرنے کا منصوبہ ہے کہ آپ کا پیسہ کہاں جائے گا۔" },
    roman: { title: "Budgeting", explanation: "Budget koi saza nahi — ye plan hai ke aapka paisa kahan jaye ga, iss se pehle ke woh khud hi kahin kharch ho jaye." },
  },
  {
    id: "saving",
    title: "Saving",
    difficulty: "Beginner",
    time: "7 min",
    icon: "🐖",
    desc: "Why 'saving what's left over' almost never works.",
    built: true,
    explanation:
      "Most people save whatever's left after spending — which is usually nothing. Flip it: save first, spend what's left. Even Rs. 50 a day adds up faster than people expect.",
    example:
      "Rs. 50 saved every day for a year is Rs. 18,250 — without touching your main spending money, just by moving it aside first.",
    takeaway: "Pay yourself first. Save before you spend, not after.",
    quiz: [
      { q: "The 'save first' method means...", options: ["Save whatever's left", "Set savings aside before spending", "Only save once a year"], correct: 1 },
      { q: "Rs. 50/day for a year is roughly...", options: ["Rs. 1,825", "Rs. 18,250", "Rs. 182,500"], correct: 1 },
      { q: "Small daily savings mainly work because of...", options: ["Bank bonuses", "Consistency adding up", "Luck"], correct: 1 },
    ],
    ur: { title: "بچت", explanation: "زیادہ تر لوگ خرچ کرنے کے بعد جو بچے وہ بچاتے ہیں — پہلے بچائیں، پھر خرچ کریں۔" },
    roman: { title: "Bachat", explanation: "Zyada tar log kharch karne ke baad jo bache woh bachate hain — jo aksar kuch nahi hota. Ulta karo: pehle bachao, phir jo bache woh kharch karo." },
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    difficulty: "Intermediate",
    time: "9 min",
    icon: "📈",
    desc: "Why your money can earn money on its own money.",
    built: true,
    explanation:
      "Compound interest means your money can earn returns, and then those returns can also start earning returns. It's growth building on top of growth, not a flat, fixed amount each year.",
    example:
      "Save Rs. 10,000 at 10% a year. After year 1: Rs. 11,000. After year 2, you earn 10% on Rs. 11,000 — not just the original Rs. 10,000 — so you get Rs. 12,100, not Rs. 12,000.",
    takeaway: "The earlier you start, the more time your money has to grow on itself.",
    quiz: [
      { q: "Compound interest grows on...", options: ["Only the original amount", "The original amount plus past growth", "A fixed yearly number"], correct: 1 },
      { q: "Rs. 10,000 at 10% after 2 years compounded is...", options: ["Rs. 12,000", "Rs. 12,100", "Rs. 11,000"], correct: 1 },
      { q: "Compound interest rewards you most for...", options: ["Starting early", "Starting late", "Timing the market"], correct: 0 },
    ],
    ur: { title: "کمپاؤنڈ سود", explanation: "کمپاؤنڈ سود کا مطلب ہے آپ کی رقم پر منافع ملتا ہے، اور پھر وہ منافع بھی مزید منافع کماتا ہے۔" },
    roman: { title: "Compound Interest", explanation: "Compound interest ka matlab hai aapka paisa munafa kamata hai, aur phir wo munafa bhi khud munafa kamata hai — sirf original amount par nahi." },
  },
  {
    id: "inflation",
    title: "Inflation",
    difficulty: "Intermediate",
    time: "8 min",
    icon: "🎈",
    desc: "Why the same Rs. 500 buys less every year.",
    built: true,
    explanation:
      "Inflation is when, over time, prices for most things slowly go up — so the same amount of money buys a little less than it used to. It's not one item getting more expensive, it's almost everything drifting up together.",
    example:
      "A plate of biryani that cost Rs. 150 a few years ago might cost Rs. 300 today. The biryani didn't change — the rupee's buying power did.",
    takeaway: "Money sitting still quietly loses value — which is exactly why saving and growing it matters.",
    quiz: [
      { q: "Inflation means prices are generally...", options: ["Falling", "Rising over time", "Frozen"], correct: 1 },
      { q: "If prices double but your savings don't grow, your money can now buy...", options: ["The same amount", "More", "Less"], correct: 2 },
      { q: "Inflation affects...", options: ["Only imported goods", "Almost everything gradually", "Only luxury items"], correct: 1 },
    ],
    ur: { title: "مہنگائی", explanation: "مہنگائی کا مطلب ہے کہ وقت کے ساتھ چیزوں کی قیمتیں بڑھتی ہیں، اس لیے وہی رقم پہلے سے کم چیزیں خرید سکتی ہے۔" },
    roman: { title: "Mehangai", explanation: "Mehangai ka matlab hai waqt ke saath cheezon ki qeematein barhti hain, is liye wohi paisa pehle se kam cheezein khareed sakta hai." },
  },
  {
    id: "banking",
    title: "Banking",
    difficulty: "Beginner",
    time: "6 min",
    icon: "🏦",
    desc: "What a bank actually does with your money.",
    built: true,
    explanation:
      "A bank isn't just a safe box for your money — the moment you deposit it, the bank lends most of it out to other people, and pays you a small share back as interest for letting them use it.",
    example:
      "You deposit Rs. 20,000. The bank keeps a small reserve and lends the rest to someone buying a motorcycle. You still get access to your Rs. 20,000 whenever you want — the bank just makes it work in the background.",
    takeaway: "A bank is more like a middleman moving money around than a box that just stores it.",
    quiz: [
      { q: "When you deposit money, the bank usually...", options: ["Locks it away untouched", "Lends most of it to others", "Sends it back to the government"], correct: 1 },
      { q: "The interest a savings account pays you comes from...", options: ["The bank's own pocket, for free", "Money earned lending your deposit out", "A government gift"], correct: 1 },
      { q: "A bank primarily acts as a...", options: ["Storage box", "Middleman moving money around", "Charity"], correct: 1 },
    ],
    ur: { title: "بینکاری", explanation: "بینک صرف پیسے کی حفاظت نہیں کرتا — جمع ہوتے ہی وہ اکثر رقم دوسروں کو قرض دے دیتا ہے۔" },
    roman: { title: "Banking", explanation: "Bank sirf paisay ki hifazat nahi karta — deposit hote hi woh aksar raqam doosron ko qarz de deta hai, aur aapko iske badle thora interest deta hai." },
  },
  {
    id: "credit-debt",
    title: "Credit & Debt",
    difficulty: "Intermediate",
    time: "10 min",
    icon: "💳",
    desc: "Good debt, bad debt, and how interest traps work.",
    built: true,
    explanation:
      "Debt isn't automatically bad — borrowing to build something (like a small business tool) can be worth it. The trap is borrowing for things that lose value fast, at high interest, without a clear plan to repay.",
    example:
      "Borrowing Rs. 5,000 from an informal lender who wants Rs. 6,000 back in a month is a 20% monthly rate — that adds up fast and is very different from a small, planned loan with clear terms.",
    takeaway: "Ask two questions before borrowing: what's the real cost, and how exactly will I repay it?",
    quiz: [
      { q: "Debt is automatically...", options: ["Always bad", "Always good", "Neither — it depends on the terms and purpose"], correct: 2 },
      { q: "A key warning sign of a debt trap is...", options: ["Low, clear interest", "Very high interest with no repayment plan", "A written contract"], correct: 1 },
      { q: "Before borrowing, it's smart to ask...", options: ["Nothing, just take it", "What's the real cost and how will I repay it", "Only how fast can I get the money"], correct: 1 },
    ],
    ur: { title: "قرض اور ادھار", explanation: "قرض خود بخود برا نہیں ہوتا — مسئلہ زیادہ سود اور بغیر منصوبے کے قرض لینے میں ہے۔" },
    roman: { title: "Qarz Aur Udhaar", explanation: "Qarz khud buh khud bura nahi hota — masla zyada sood aur bagair plan ke qarz lene mein hai. Udhaar lene se pehle sochein: asal cost kya hai, aur wapas kaise karenge." },
  },
  {
    id: "investing",
    title: "Investing Basics",
    difficulty: "Advanced",
    time: "12 min",
    icon: "📉",
    desc: "Risk, return, and why investing isn't gambling.",
    built: true,
    explanation:
      "Investing means putting money into something — a business, property, stocks — hoping it grows in value over time. Unlike saving, there's real risk: it can also lose value. The key difference from gambling is that investing is based on real, ongoing value (a business making profit, a property being useful), not pure chance.",
    example:
      "Rs. 10,000 in a savings account might slowly grow to Rs. 10,500 in a year, safely. The same Rs. 10,000 invested in a small business could grow to Rs. 13,000 — or shrink to Rs. 8,000 — depending on how the business does.",
    takeaway: "More potential growth usually means more risk — the goal is understanding that trade-off, not avoiding it blindly.",
    quiz: [
      { q: "What separates investing from gambling?", options: ["Nothing, they're the same", "Investing is based on real ongoing value, not pure chance", "Investing always guarantees profit"], correct: 1 },
      { q: "Compared to saving, investing usually has...", options: ["Less risk, less potential growth", "More risk, more potential growth", "The exact same risk"], correct: 1 },
      { q: "A smart first step before investing is...", options: ["Investing your entire savings at once", "Understanding what you're investing in and the risk", "Just following a friend's tip blindly"], correct: 1 },
    ],
    ur: { title: "سرمایہ کاری کی بنیاد", explanation: "سرمایہ کاری کا مطلب ہے پیسہ کسی چیز میں لگانا جس کی قیمت وقت کے ساتھ بڑھنے کی امید ہو، مگر اس میں خطرہ بھی شامل ہے۔" },
    roman: { title: "Sarmaya Kari Ki Bunyaad", explanation: "Sarmaya kari ka matlab hai paisa kisi cheez mein lagana jiski qeemat waqt ke saath barhne ki umeed ho — lekin bachat ke bar-aks, isme nuqsan ka khatra bhi hota hai." },
  },
  {
    id: "digital-scams",
    title: "Digital Payments & Scams",
    difficulty: "Beginner",
    time: "7 min",
    icon: "🛡️",
    desc: "Spotting common money scams before they spot you.",
    built: true,
    explanation:
      "As more money moves through phones — Easypaisa, JazzCash, bank apps — scammers have moved there too. Most scams work by creating urgency or fear ('your account will be blocked!') to make you act before you think.",
    example:
      "A common scam: a call claiming to be your bank, saying there's 'suspicious activity,' and asking for your PIN or OTP code 'to verify.' No real bank will ever ask for your PIN or OTP over a call — that's the giveaway.",
    takeaway: "Real banks and services never ask for your PIN or OTP. If anything creates urgency and asks for that, it's a scam.",
    quiz: [
      { q: "A major red flag in scams is...", options: ["A calm, no-pressure message", "Urgency and pressure to act immediately", "An official-looking logo"], correct: 1 },
      { q: "Should you ever share your PIN or OTP over a call?", options: ["Yes, if they say they're from the bank", "Never — real banks don't ask for it", "Only if it's urgent"], correct: 1 },
      { q: "If something feels urgent and asks for private codes, the safest move is to...", options: ["Act fast to avoid losing money", "Pause and verify independently before doing anything", "Share the info to be safe"], correct: 1 },
    ],
    ur: { title: "ڈیجیٹل ادائیگیاں اور فراڈ", explanation: "زیادہ تر فراڈ جلد بازی یا خوف پیدا کر کے آپ کو سوچے بغیر عمل کرنے پر مجبور کرتے ہیں۔" },
    roman: { title: "Digital Payments Aur Scams", explanation: "Zyada tar scams jaldbazi ya khauf paida kar ke aapko sochay bagair amal karne par majboor karte hain. Koi bhi asli bank kabhi PIN ya OTP nahi maangta." },
  },
  {
    id: "ai-money",
    title: "AI + Money",
    difficulty: "Intermediate",
    time: "8 min",
    icon: "🤖",
    desc: "Using AI tools to think through money decisions.",
    built: true,
    explanation:
      "AI tools (like this one) can help explain financial concepts, compare hypothetical scenarios, and answer questions in plain language — but they're not financial advisers. They're best used for learning and understanding, not for deciding exactly what to do with real money.",
    example:
      "You could ask an AI to explain what a 'fixed deposit' is, or to walk through how a 12% vs 8% interest rate compares over 5 years — genuinely useful for learning. Asking it which specific stock to buy is a very different, riskier use.",
    takeaway: "Use AI to understand your options better — not as a substitute for your own judgment or a real professional's advice.",
    quiz: [
      { q: "AI tools are most useful for money topics when...", options: ["Picking specific stocks to buy", "Explaining concepts and comparing scenarios", "Replacing a financial adviser entirely"], correct: 1 },
      { q: "A good use of AI here is asking it to...", options: ["Guarantee investment returns", "Explain what a financial term means", "Tell you exactly what to do with your savings"], correct: 1 },
      { q: "AI-generated financial info should be...", options: ["Trusted completely without checking", "Used for learning, then verified independently", "Ignored entirely"], correct: 1 },
    ],
    ur: { title: "اے آئی اور پیسہ", explanation: "اے آئی مالیاتی تصورات سمجھانے میں مددگار ہے، مگر یہ مالیاتی مشیر کا متبادل نہیں۔" },
    roman: { title: "AI Aur Paisa", explanation: "AI maali tasawwurat samjhane mein madadgar hai, magar yeh financial adviser ka mutabadil nahi — seekhne ke liye istemal karo, faisla khud karo." },
  },
];

const BADGES = [
  { id: "first-save", label: "First Save", icon: "🐖", earned: true },
  { id: "money-basics", label: "Money Basics", icon: "💵", earned: true },
  { id: "inflation-explorer", label: "Inflation Explorer", icon: "🎈", earned: false },
  { id: "ai-learner", label: "AI Learner", icon: "🤖", earned: false },
];

const TESTIMONIALS = [
  { name: "Ayesha K.", role: "Grade 11, Lahore", quote: "Finally explained compound interest in a way that actually made sense.", demo: true },
  { name: "Bilal R.", role: "A-Levels, Karachi", quote: "The daily challenges take like 30 seconds and I actually remember them.", demo: true },
  { name: "Zara M.", role: "Grade 9, Islamabad", quote: "I like that it's in Roman Urdu too — I understand it faster.", demo: true },
];

const AI_QUICK_QUESTIONS = [
  "What is inflation?",
  "How does a bank make money?",
  "What's the difference between saving and investing?",
  "Explain compound interest.",
  "What is a bank run?",
];

const AI_RESPONSES = {
  "what is inflation?": {
    simple: "Inflation is when, over time, things generally cost more than they used to — so the same amount of money buys a little less each year.",
    urdu: "مہنگائی کا مطلب ہے کہ وقت کے ساتھ چیزوں اور خدمات کی اوسط قیمتیں بڑھتی ہیں۔",
    like15: "Imagine your favorite snack cost Rs. 50 last year. This year it's Rs. 55. Nothing changed about the snack — but your rupees buy a little less of it now. That creeping price rise, across almost everything, is inflation.",
    example: "A cup of chai that cost Rs. 30 five years ago might cost Rs. 60 today — same chai, weaker rupee.",
  },
  "how does a bank make money?": {
    simple: "Banks take deposits from people like you, lend that money to others at a higher interest rate, and keep the difference.",
    urdu: "بینک آپ کی جمع کردہ رقم کو دوسروں کو زیادہ شرح سود پر قرض دیتے ہیں اور فرق اپنے پاس رکھتے ہیں۔",
    like15: "Say you put Rs. 10,000 in a savings account earning 5%. The bank lends that same money to someone else at 15%. You get your 5%, the bank pockets the other 10%. That gap is basically the business.",
    example: "You earn Rs. 500/year on your Rs. 10,000 deposit. The bank might earn Rs. 1,500/year lending it out. The Rs. 1,000 difference is the bank's profit.",
  },
  "what's the difference between saving and investing?": {
    simple: "Saving is putting money aside safely for later. Investing is putting money into something that can grow — but can also lose value.",
    urdu: "بچت پیسے کو محفوظ طریقے سے رکھنا ہے، جبکہ سرمایہ کاری میں نقصان کا خطرہ بھی ہوتا ہے۔",
    like15: "Saving is like keeping snacks in the fridge for later — safe, predictable, always there. Investing is more like planting seeds — it can grow into a lot more, but there's no guarantee, and sometimes the crop fails.",
    example: "Rs. 10,000 in a savings account might slowly earn 5%. Rs. 10,000 invested might earn 15% some years — or lose value in others.",
  },
  "explain compound interest.": {
    simple: "Compound interest means your money earns returns, and then those returns start earning returns too — growth on top of growth.",
    urdu: "کمپاؤنڈ سود کا مطلب ہے آپ کی رقم پر منافع ملتا ہے، اور پھر وہ منافع بھی مزید منافع کماتا ہے۔",
    like15: "Year 1: Rs. 10,000 grows to Rs. 11,000. Year 2, you don't just earn interest on the original Rs. 10,000 — you earn it on the full Rs. 11,000. That snowball effect is compounding.",
    example: "Rs. 10,000 at 10% becomes Rs. 11,000 after year 1, then Rs. 12,100 after year 2 — not Rs. 12,000.",
  },
  "what is a bank run?": {
    simple: "A bank run is when a lot of people rush to withdraw their money from a bank at the same time, usually out of fear the bank might fail.",
    urdu: "بینک رن اس وقت ہوتا ہے جب بہت سے لوگ ایک ساتھ اپنا پیسہ بینک سے نکالنے کی کوشش کرتے ہیں۔",
    like15: "Since banks only keep a fraction of deposits on hand (the rest is lent out), if everyone tries to withdraw at once, the bank can run out of cash — even if it's fundamentally fine. That panic itself can cause real problems.",
    example: "This is part of why governments create deposit insurance — to reassure people their money is safe even if a bank runs low on cash.",
  },
};

const DEFAULT_AI_RESPONSE = {
  simple: "That's a great question — for this demo, RI$E AI has ready answers for a few starter topics. Try one of the quick questions below to see how it works.",
  urdu: "یہ ایک بہت اچھا سوال ہے — اس ڈیمو میں چند بنیادی موضوعات کے تیار جوابات موجود ہیں۔",
  like15: "This demo version only knows a handful of topics right now — tap one of the suggested questions to see RI$E AI in action.",
  example: "Try: \"What is inflation?\" or \"Explain compound interest.\"",
};

const UI_TEXT = {
  en: {
    nav: { home: "Home", learn: "Learn", ai: "AI Tutor", challenges: "Challenges", progress: "Progress", research: "Research", about: "About" },
    heroTag: "Built for Pakistani youth",
    heroTitle: ["Understand Money.", "Build Your", "Future."],
    heroSub: "RI$E makes financial literacy simple, practical, and built for the next generation.",
    ctaStart: "Start Learning",
    ctaAi: "Try RI$E AI",
  },
  ur: {
    nav: { home: "ہوم", learn: "سیکھیں", ai: "اے آئی ٹیوٹر", challenges: "چیلنجز", progress: "پیش رفت", research: "تحقیق", about: "تعارف" },
    heroTag: "پاکستانی نوجوانوں کے لیے",
    heroTitle: ["پیسے کو سمجھیں۔", "اپنا", "مستقبل بنائیں۔"],
    heroSub: "RI$E مالیاتی تعلیم کو آسان، عملی اور نئی نسل کے لیے قابلِ فہم بناتا ہے۔",
    ctaStart: "سیکھنا شروع کریں",
    ctaAi: "RI$E AI آزمائیں",
  },
  roman: {
    nav: { home: "Home", learn: "Seekhein", ai: "AI Tutor", challenges: "Challenges", progress: "Progress", research: "Research", about: "Tafseel" },
    heroTag: "Pakistani nojawano ke liye",
    heroTitle: ["Paisay Ko Samjhein.", "Apna", "Mustaqbil Banayein."],
    heroSub: "RI$E maali taleem ko asaan, amali aur nai nasal ke liye samajhne laiq banata hai.",
    ctaStart: "Seekhna Shuru Karein",
    ctaAi: "RI$E AI Azmayein",
  },
};

// Speech recognition / synthesis locale codes per app language
const SPEECH_LOCALE = { en: "en-US", ur: "ur-PK", roman: "ur-PK" };

const CHALLENGES = [
  {
    q: "You receive Rs. 1,000. How would you divide it?",
    options: [
      { label: "Spend all Rs. 1,000", explain: "Totally your call sometimes — but if this is the pattern every time, there's nothing left for goals or emergencies." },
      { label: "Save all Rs. 1,000", explain: "Great discipline — though a small 'spend' amount is usually sustainable long-term without feeling deprived." },
      { label: "Spend Rs. 700 / Save Rs. 300", explain: "A common, sustainable split — most of it usable now, a real chunk still building for later." },
    ],
  },
  {
    q: "Something costs Rs. 500 today and Rs. 550 next year. What happened?",
    options: [
      { label: "The item got better", explain: "Not necessarily — the item may be identical. This is more often about the rupee's buying power shifting." },
      { label: "Inflation", explain: "Exactly — the price rising while the item stays the same is the classic sign of inflation." },
      { label: "A bank fee", explain: "Bank fees don't usually explain broad price increases across items — inflation is the more likely cause." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */

const Pill = ({ children, tone = "default" }) => {
  const tones = {
    default: "bg-[#141712] text-[#9AA39C] border-[#242822]",
    accent: "bg-[#0E3B27] text-[#5CFFB0] border-[#1E6B48]",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] tracking-wide uppercase px-2 py-1 rounded-full border ${tones[tone]}`}>
      {children}
    </span>
  );
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[#5CFFB0] font-mono text-xs tracking-[0.2em] uppercase">{children}</span>
    <span className="flex-1 h-px bg-[#1E211C]" />
  </div>
);

/* ------------------------------------------------------------------ */
/* MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function RiseFinanceApp() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("en");
  const [openModuleId, setOpenModuleId] = useState(null);
  const [completed, setCompleted] = useState(new Set(["money-basics"]));
  const [streak] = useState(4);

  const t = UI_TEXT[lang];
  const navItems = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "learn", label: t.nav.learn, icon: BookOpen },
    { id: "research", label: t.nav.research, icon: Landmark },
    { id: "ai", label: t.nav.ai, icon: Bot },
    { id: "challenges", label: t.nav.challenges, icon: Trophy },
    { id: "progress", label: t.nav.progress, icon: TrendingUp },
    { id: "about", label: t.nav.about, icon: Info },
  ];

  const openModule = MODULES.find((m) => m.id === openModuleId);

  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-[#1A1D19] bg-[#08090A]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <button onClick={() => setTab("home")} className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              RI<span className="text-[#00E28A]">$</span>E
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-[#7C867E] tracking-widest uppercase">Finance</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setTab(item.id); setOpenModuleId(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  tab === item.id ? "bg-[#141712] text-[#5CFFB0]" : "text-[#9AA39C] hover:text-[#F2F5F2]"
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>

        {/* mobile nav */}
        <nav className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setOpenModuleId(null); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${
                tab === item.id ? "bg-[#0E3B27] text-[#5CFFB0] border-[#1E6B48]" : "text-[#9AA39C] border-[#1A1D19]"
              }`}
            >
              <item.icon size={13} />
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {tab === "home" && <HomePage setTab={setTab} lang={lang} t={t} completed={completed} />}
        {tab === "learn" && !openModule && (
          <LearnPage completed={completed} onOpen={(id) => setOpenModuleId(id)} />
        )}
        {tab === "learn" && openModule && (
          <ModulePage
            mod={openModule}
            lang={lang}
            completed={completed.has(openModule.id)}
            onComplete={() => setCompleted((prev) => new Set(prev).add(openModule.id))}
            onBack={() => setOpenModuleId(null)}
          />
        )}
        {tab === "ai" && <AiTutorPage lang={lang} />}
        {tab === "challenges" && <ChallengesPage />}
        {tab === "progress" && <ProgressPage completed={completed} streak={streak} />}
        {tab === "research" && <ResearchPage />}
        {tab === "about" && <AboutPage />}
      </main>

      <footer className="border-t border-[#1A1D19] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7C867E]">
          <span>RI$E Finance — educational demo. Not financial advice. Built by Rahul Kumar.</span>
          <span className="font-mono">MVP v0.1</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LANGUAGE TOGGLE                                                    */
/* ------------------------------------------------------------------ */

function LangToggle({ lang, setLang }) {
  const opts = [
    { id: "en", label: "EN" },
    { id: "ur", label: "اردو" },
    { id: "roman", label: "Roman" },
  ];
  return (
    <div className="flex items-center gap-1 bg-[#101210] border border-[#1E211C] rounded-full p-1">
      <Globe size={13} className="text-[#7C867E] ml-1" />
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => setLang(o.id)}
          className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
            lang === o.id ? "bg-[#0E3B27] text-[#5CFFB0]" : "text-[#7C867E]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOME PAGE                                                          */
/* ------------------------------------------------------------------ */

function HomePage({ setTab, lang, t, completed }) {
  const isUrdu = lang === "ur";
  const totalModules = MODULES.length;
  const doneCount = completed ? completed.size : 0;
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="pt-6 md:pt-12">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div dir={isUrdu ? "rtl" : "ltr"}>
            <Pill tone="accent">{t.heroTag}</Pill>
            <h1 className="mt-5 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              {t.heroTitle[0]}
              <br />
              {t.heroTitle[1]} <span className="text-[#00E28A]">{t.heroTitle[2]}</span>
            </h1>
            <p className="mt-5 text-[#9AA39C] text-lg max-w-md">
              {t.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setTab("learn")} className="px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm hover:bg-[#5CFFB0] transition-colors flex items-center gap-2">
                {t.ctaStart} <ArrowRight size={15} />
              </button>
              <button onClick={() => setTab("ai")} className="px-5 py-3 rounded-lg border border-[#242822] text-[#F2F5F2] font-semibold text-sm hover:border-[#00E28A] transition-colors flex items-center gap-2">
                <Sparkles size={15} className="text-[#5CFFB0]" /> {t.ctaAi}
              </button>
            </div>
          </div>

          <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl p-5 font-mono text-sm">
            <div className="flex justify-between text-[#7C867E] text-xs mb-4 pb-3 border-b border-dashed border-[#242822]">
              <span>LEARNING LEDGER</span>
              <span>YOUR PROGRESS</span>
            </div>
            {[
              ["Modules completed", `${doneCount} / ${totalModules}`],
              ["Quiz average", doneCount > 0 ? "91%" : "—"],
              ["Learning streak", doneCount > 0 ? "4 days 🔥" : "0 days"],
              ["Concepts learned", `${doneCount * 3}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 text-[#C9D1CB]">
                <span className="text-[#7C867E]">{k}</span>
                <span className="text-[#5CFFB0]">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["10", "Learning modules"],
          ["AI", "Tutor, always on"],
          ["3", "Languages supported"],
          ["Rs. 0", "Cost to start"],
        ].map(([num, label]) => (
          <div key={label} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
            <div className="text-2xl font-black text-[#00E28A] font-mono">{num}</div>
            <div className="text-xs text-[#9AA39C] mt-1">{label}</div>
          </div>
        ))}
      </section>

      {/* FEATURED COURSES */}
      <section>
        <SectionLabel>Featured modules</SectionLabel>
        <div className="grid md:grid-cols-3 gap-4">
          {MODULES.filter((m) => m.built).slice(0, 3).map((m) => (
            <div key={m.id} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5 hover:border-[#00E28A]/40 transition-colors cursor-pointer" onClick={() => setTab("learn")}>
              <div className="text-2xl mb-3">{m.icon}</div>
              <div className="font-semibold">{m.title}</div>
              <p className="text-sm text-[#9AA39C] mt-1">{m.desc}</p>
              <div className="flex gap-2 mt-3">
                <Pill>{m.difficulty}</Pill>
                <Pill>{m.time}</Pill>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DAILY CHALLENGE PREVIEW */}
      <section className="bg-gradient-to-br from-[#0E3B27]/40 to-[#0E100E] border border-[#1E6B48]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <Pill tone="accent">Daily challenge</Pill>
          <p className="mt-3 text-lg font-semibold max-w-md">"You receive Rs. 1,000. How would you divide it?"</p>
          <p className="text-sm text-[#9AA39C] mt-1">Takes 30 seconds. Teaches a real concept every time.</p>
        </div>
        <button onClick={() => setTab("challenges")} className="shrink-0 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm flex items-center gap-2">
          Try today's challenge <ChevronRight size={15} />
        </button>
      </section>

      {/* AI TUTOR PREVIEW */}
      <section>
        <SectionLabel>Ask RI$E AI</SectionLabel>
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl p-6 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2"><Bot size={20} className="text-[#5CFFB0]" /> Your always-on money tutor</h3>
            <p className="text-sm text-[#9AA39C] mt-2">Ask anything about money in plain English, Urdu, or Roman Urdu. Get simple answers, real PKR examples, and a quick quiz to check it stuck.</p>
            <button onClick={() => setTab("ai")} className="mt-4 text-sm text-[#5CFFB0] flex items-center gap-1">
              Open AI Tutor <ArrowRight size={14} />
            </button>
          </div>
          <div className="bg-[#08090A] border border-[#1E211C] rounded-xl p-4 text-sm space-y-2">
            <div className="text-[#7C867E]">You asked</div>
            <div className="text-[#F2F5F2]">"What is inflation?"</div>
            <div className="text-[#7C867E] mt-3">RI$E AI</div>
            <div className="text-[#C9D1CB]">Inflation is when things generally cost more over time, so the same money buys a little less each year.</div>
          </div>
        </div>
      </section>

      {/* BUILT FOR YOUNG PEOPLE */}
      <section className="grid md:grid-cols-3 gap-4">
        {[
          [PiggyBank, "No jargon, ever", "Every concept explained the way you'd explain it to a friend — not a textbook."],
          [ShieldAlert, "No real money involved", "This is a learning space, not a trading app. Nothing here touches your bank account."],
          [Landmark, "Made for Pakistan", "PKR examples, local context, and Urdu support — not translated from somewhere else."],
        ].map(([Icon, title, body]) => (
          <div key={title} className="p-5 rounded-xl border border-[#1E211C]">
            <Icon size={20} className="text-[#5CFFB0] mb-3" />
            <div className="font-semibold">{title}</div>
            <p className="text-sm text-[#9AA39C] mt-1">{body}</p>
          </div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section>
        <SectionLabel>What early users say · demo testimonials</SectionLabel>
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
              <p className="text-sm text-[#C9D1CB]">"{t.quote}"</p>
              <div className="mt-4 text-xs">
                <span className="text-[#F2F5F2] font-medium">{t.name}</span>
                <span className="text-[#7C867E]"> · {t.role}</span>
              </div>
              <Pill>Fictional / demo</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LEARN PAGE                                                         */
/* ------------------------------------------------------------------ */

function LearnPage({ completed, onOpen }) {
  return (
    <div>
      <SectionLabel>Learn</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2">10 modules. Zero jargon.</h2>
      <p className="text-[#9AA39C] mb-8">Each one takes under 10 minutes and ends with a quick quiz.</p>

      <div className="grid md:grid-cols-2 gap-4">
        {MODULES.map((m) => {
          const isDone = completed.has(m.id);
          return (
            <button
              key={m.id}
              disabled={!m.built}
              onClick={() => m.built && onOpen(m.id)}
              className={`text-left bg-[#0E100E] border rounded-xl p-5 transition-colors ${
                m.built ? "border-[#1E211C] hover:border-[#00E28A]/40 cursor-pointer" : "border-[#1A1D19] opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-2xl">{m.icon}</div>
                {m.built ? (
                  isDone ? <CheckCircle2 size={18} className="text-[#5CFFB0]" /> : <Circle size={18} className="text-[#3A403C]" />
                ) : (
                  <Lock size={16} className="text-[#3A403C]" />
                )}
              </div>
              <div className="font-semibold mt-3">{m.title}</div>
              <p className="text-sm text-[#9AA39C] mt-1">{m.desc}</p>
              <div className="flex gap-2 mt-3">
                <Pill>{m.difficulty}</Pill>
                <Pill>{m.time}</Pill>
                {!m.built && <Pill>Coming soon</Pill>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MODULE DETAIL PAGE                                                 */
/* ------------------------------------------------------------------ */

function ModulePage({ mod, lang, completed, onComplete, onBack }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const title = lang === "ur" ? mod.ur?.title : lang === "roman" ? mod.roman?.title : mod.title;
  const explanation = lang === "ur" ? mod.ur?.explanation : lang === "roman" ? mod.roman?.explanation : mod.explanation;

  const score = mod.quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);

  return (
    <div className="max-w-2xl">
      <button onClick={onBack} className="text-sm text-[#7C867E] hover:text-[#F2F5F2] mb-6">← Back to modules</button>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{mod.icon}</span>
        <div className="flex gap-2">
          <Pill>{mod.difficulty}</Pill>
          <Pill>{mod.time}</Pill>
        </div>
      </div>
      <h1 className="text-3xl font-black tracking-tight mt-2" dir={lang === "ur" ? "rtl" : "ltr"}>{title}</h1>

      <div className="mt-6 bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-2">Explanation</div>
        <p className="text-[#C9D1CB] leading-relaxed" dir={lang === "ur" ? "rtl" : "ltr"}>{explanation}</p>
      </div>

      {mod.example && (
        <div className="mt-4 bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-2">PKR example</div>
          <p className="text-[#C9D1CB] leading-relaxed">{mod.example}</p>
        </div>
      )}

      {mod.takeaway && (
        <div className="mt-4 bg-[#0E3B27]/30 border border-[#1E6B48]/40 rounded-xl p-5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-2">Key takeaway</div>
          <p className="text-[#F2F5F2] font-medium">{mod.takeaway}</p>
        </div>
      )}

      {/* QUIZ */}
      <div className="mt-8">
        <SectionLabel>Quick quiz</SectionLabel>
        <div className="space-y-4">
          {mod.quiz.map((q, i) => (
            <div key={i} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
              <p className="font-medium mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[i] === oi;
                  const isCorrect = submitted && oi === q.correct;
                  const isWrong = submitted && isSelected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setAnswers((a) => ({ ...a, [i]: oi }))}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                        isCorrect ? "border-[#00E28A] bg-[#0E3B27]/40 text-[#5CFFB0]" :
                        isWrong ? "border-[#E2004D]/60 bg-[#3B0E1E]/40 text-[#FF7CA3]" :
                        isSelected ? "border-[#00E28A]/60 bg-[#141712]" : "border-[#1E211C] text-[#C9D1CB] hover:border-[#3A403C]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < mod.quiz.length}
            className="mt-5 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Submit answers
          </button>
        ) : (
          <div className="mt-5 flex items-center gap-4">
            <span className="font-mono text-[#5CFFB0]">{score}/{mod.quiz.length} correct</span>
            {!completed && (
              <button onClick={onComplete} className="px-4 py-2 rounded-lg border border-[#00E28A] text-[#5CFFB0] text-sm">
                Mark module complete
              </button>
            )}
            {completed && <Pill tone="accent">Completed ✓</Pill>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI TUTOR PAGE                                                      */
/* ------------------------------------------------------------------ */

function AiTutorPage({ lang }) {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);
  const [view, setView] = useState("simple");
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");

  const speechSupported =
    typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const locale = SPEECH_LOCALE[lang] || "en-US";

  const ask = (q) => {
    const key = q.trim().toLowerCase();
    const res = AI_RESPONSES[key] || DEFAULT_AI_RESPONSE;
    setCurrent({ question: q, ...res });
    setView(lang === "ur" ? "urdu" : "simple");
    setQuery("");
  };

  const startListening = () => {
    if (!speechSupported) {
      setVoiceNote("Voice input isn't supported in this browser — try typing instead.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = locale;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setVoiceNote("");
    setListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      setListening(false);
      ask(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      setVoiceNote("Didn't catch that — check mic permissions, or type your question below.");
    };
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const speak = (text, forcedLang) => {
    if (!ttsSupported) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = SPEECH_LOCALE[forcedLang || lang] || "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="max-w-2xl">
      <SectionLabel>AI Tutor</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-2">
        <Bot className="text-[#5CFFB0]" /> Ask RI$E AI
      </h2>
      <p className="text-[#9AA39C] mb-2">RI$E AI is an educational assistant — not a financial adviser. It won't recommend specific stocks, crypto, or products.</p>
      <p className="text-xs text-[#7C867E] mb-6">Works with typing or voice, in English or Urdu — pick your language from the top bar.</p>

      <div className="flex gap-2 mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && query.trim() && ask(query)}
          placeholder={lang === "ur" ? "پیسے سے متعلق کچھ پوچھیں…" : "Ask something about money…"}
          dir={lang === "ur" ? "rtl" : "ltr"}
          className="flex-1 bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A]"
        />
        <button
          onClick={startListening}
          title="Ask by voice"
          className={`px-4 py-3 rounded-lg border transition-colors ${
            listening ? "border-[#00E28A] bg-[#0E3B27]/40 text-[#5CFFB0] animate-pulse" : "border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0]"
          }`}
        >
          <Mic size={16} />
        </button>
        <button
          onClick={() => query.trim() && ask(query)}
          className="px-4 py-3 rounded-lg bg-[#00E28A] text-[#06110B]"
        >
          <Send size={16} />
        </button>
      </div>

      {listening && <p className="text-xs text-[#5CFFB0] mb-4">Listening… speak your question now.</p>}
      {voiceNote && <p className="text-xs text-[#7C867E] mb-4">{voiceNote}</p>}

      <div className="flex flex-wrap gap-2 mb-8">
        {AI_QUICK_QUESTIONS.map((q) => (
          <button key={q} onClick={() => ask(q)} className="text-xs px-3 py-1.5 rounded-full border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0]">
            {q}
          </button>
        ))}
      </div>

      {current && (
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
          <div className="text-xs text-[#7C867E] mb-1">You asked</div>
          <div className="font-medium mb-4">{current.question}</div>

          <div className="flex gap-2 mb-4">
            {[["simple", "Simple answer"], ["urdu", "Explain in Urdu"], ["like15", "Explain like I'm 15"]].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setView(k)}
                className={`text-xs px-3 py-1.5 rounded-full border ${view === k ? "border-[#00E28A] text-[#5CFFB0] bg-[#0E3B27]/30" : "border-[#1E211C] text-[#9AA39C]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-start justify-between gap-3">
            <p className="text-[#C9D1CB] leading-relaxed" dir={view === "urdu" ? "rtl" : "ltr"}>
              {current[view]}
            </p>
            {ttsSupported && (
              <button
                onClick={() => speak(current[view], view === "urdu" ? "ur" : lang)}
                title="Listen"
                className="shrink-0 p-2 rounded-lg border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0]"
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-[#242822]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-1">Example</div>
            <p className="text-sm text-[#9AA39C]">{current.example}</p>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-[#7C867E] bg-[#08090A] rounded-lg p-3">
            <ShieldAlert size={14} className="mt-0.5 shrink-0" />
            Educational only — always verify important financial info with a trusted adult or professional.
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CHALLENGES PAGE                                                    */
/* ------------------------------------------------------------------ */

function ChallengesPage() {
  const [pickedIdx, setPickedIdx] = useState({});

  return (
    <div className="max-w-2xl">
      <SectionLabel>Daily Challenges</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2">Think fast. Learn faster.</h2>
      <p className="text-[#9AA39C] mb-8">Small scenarios, real financial concepts. Takes seconds each.</p>

      <div className="space-y-6">
        {CHALLENGES.map((c, ci) => (
          <div key={ci} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
            <p className="font-medium mb-4">{c.q}</p>
            <div className="space-y-2">
              {c.options.map((opt, oi) => {
                const picked = pickedIdx[ci] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => setPickedIdx((p) => ({ ...p, [ci]: oi }))}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm ${
                      picked ? "border-[#00E28A] bg-[#0E3B27]/30 text-[#5CFFB0]" : "border-[#1E211C] text-[#C9D1CB] hover:border-[#3A403C]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {pickedIdx[ci] !== undefined && (
              <div className="mt-3 text-sm text-[#9AA39C] bg-[#08090A] rounded-lg p-3 border border-[#1E211C]">
                {c.options[pickedIdx[ci]].explain}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PROGRESS PAGE — "passbook" signature element                      */
/* ------------------------------------------------------------------ */

function ProgressPage({ completed, streak }) {
  const total = MODULES.length;
  const done = completed.size;

  return (
    <div className="max-w-2xl">
      <SectionLabel>Progress</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-6">Your learning passbook</h2>

      <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl overflow-hidden">
        <div className="border-b border-dashed border-[#242822] px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-xs tracking-widest text-[#7C867E] uppercase">RI$E · Learning Passbook</span>
          <Flame size={16} className="text-[#00E28A]" />
        </div>
        <div className="px-6 py-5 font-mono text-sm space-y-3">
          <Row label="Modules completed" value={`${done} / ${total}`} />
          <Row label="Current streak" value={`${streak} days`} />
          <Row label="Quiz average" value="91%" />
          <Row label="Concepts learned" value={`${done * 3}`} />
        </div>
      </div>

      <div className="mt-8">
        <SectionLabel>Badges</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((b) => (
            <div key={b.id} className={`rounded-xl border p-4 text-center ${b.earned ? "border-[#1E6B48]/50 bg-[#0E3B27]/20" : "border-[#1A1D19] opacity-40"}`}>
              <div className="text-2xl">{b.icon}</div>
              <div className="text-xs mt-2 text-[#C9D1CB]">{b.label}</div>
              {b.earned && <Award size={12} className="text-[#5CFFB0] mx-auto mt-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#7C867E]">{label}</span>
      <span className="text-[#5CFFB0]">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ABOUT PAGE                                                         */
/* ------------------------------------------------------------------ */

function ResearchPage() {
  const papers = [
    {
      title: "Teen Financial Illiteracy in Pakistan: Causes, Consequences, and Pathways to Reform",
      author: "Rahul Kumar",
      date: "July 2026",
      abstract:
        "Examines why financial literacy is almost entirely absent from Pakistani youth education, tracing the gap to both school curricula and household financial habits. The paper documents the real-world consequences — debt vulnerability, poor savings behavior, susceptibility to scams — and proposes concrete interventions, including grassroots workshops and accessible digital tools, several of which directly shaped the design of this app.",
      topics: ["Financial literacy", "Youth finance", "Pakistan's financial ecosystem"],
    },
    {
      title: "Stablecoins and Rupee Volatility: A Study on Pakistan's Currency Landscape",
      author: "Rahul Kumar",
      date: "August 2026",
      abstract:
        "Explores how stablecoins could function as a practical hedge against rupee volatility for everyday Pakistanis, particularly those without easy access to foreign currency accounts. The paper weighs the accessibility benefits against regulatory and adoption barriers, situating the analysis within Pakistan's broader fintech and monetary landscape.",
      topics: ["FinTech", "Stablecoins", "Digital currencies"],
    },
  ];

  const allTopics = ["Financial literacy", "FinTech", "Stablecoins", "Digital currencies", "Youth finance", "Pakistan's financial ecosystem"];

  return (
    <div className="max-w-2xl">
      <SectionLabel>Research</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2">The research behind RI$E</h2>
      <p className="text-[#9AA39C] mb-8">Original research exploring financial literacy, fintech, and the future of money.</p>

      <div className="space-y-5">
        {papers.map((p) => (
          <div key={p.title} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-6">
            <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
            <p className="text-xs text-[#7C867E] mt-2">{p.author} · {p.date}</p>
            <p className="text-sm text-[#C9D1CB] leading-relaxed mt-4">{p.abstract}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {p.topics.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                disabled
                title="Upload the PDF to enable this"
                className="text-xs px-3 py-2 rounded-lg border border-[#00E28A]/40 text-[#5CFFB0] opacity-50 cursor-not-allowed flex items-center gap-2"
              >
                Read Research <ArrowRight size={13} />
              </button>
              <button
                disabled
                title="Upload the PDF to enable this"
                className="text-xs px-3 py-2 rounded-lg border border-[#1E211C] text-[#7C867E] opacity-50 cursor-not-allowed flex items-center gap-2"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SectionLabel>Research topics</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {allTopics.map((t) => <Pill key={t} tone="accent">{t}</Pill>)}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 text-xs text-[#7C867E] bg-[#0E100E] border border-[#1E211C] rounded-lg p-4">
        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
        PDF links activate once the papers are uploaded.
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-xl">
      <SectionLabel>About</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-4">A student-led initiative.</h2>
      <p className="text-[#C9D1CB] leading-relaxed">
        RI$E Finance is a student-led initiative exploring how technology can make financial education more accessible to young people.
      </p>
      <p className="text-[#9AA39C] leading-relaxed mt-4">
        The long-term vision combines financial literacy, AI literacy, Urdu accessibility, and practical education — starting with Pakistani youth, who are rarely taught this in school.
      </p>
      <p className="text-sm text-[#7C867E] mt-6">Built by Rahul Kumar.</p>
      <div className="mt-6 flex items-start gap-2 text-xs text-[#7C867E] bg-[#0E100E] border border-[#1E211C] rounded-lg p-4">
        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
        This is an early-stage demo. It does not handle real money, connect to bank accounts, or provide personalized financial advice.
      </div>
    </div>
  );
}
