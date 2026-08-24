import React, { useState, useEffect, useRef } from "react";
import {
  Home, BookOpen, Bot, Trophy, TrendingUp, Info, Globe,
  CheckCircle2, Circle, Flame, Award, ChevronRight, Send,
  Sparkles, Lock, ArrowRight, Landmark, ShieldAlert, PiggyBank,
  Mic, Volume2, X, Download, ClipboardList, Star, Medal, Loader2
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

// requiresModule maps a badge to the module id that earns it.
// "ai-learner" isn't tracked yet (no AI-usage logging), so it's left unearnable for now.
const BADGES = [
  { id: "first-save", label: "First Save", icon: "🐖", requiresModule: "saving" },
  { id: "money-basics", label: "Money Basics", icon: "💵", requiresModule: "money-basics" },
  { id: "inflation-explorer", label: "Inflation Explorer", icon: "🎈", requiresModule: "inflation" },
  { id: "ai-learner", label: "AI Learner", icon: "🤖", requiresModule: null },
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
    q: "You get Rs. 500 as Eid money. What's the smartest first move?",
    difficulty: "easy",
    options: [
      { label: "Spend it all on snacks today", explain: "Fun once, but Rs. 500 spent instantly teaches your brain that money is only for immediate wants." },
      { label: "Set aside at least Rs. 150 before spending the rest", explain: "Paying yourself first — even a small chunk — builds the saving habit before spending eats it all." },
      { label: "Give it all to a friend to hold", explain: "That doesn't solve anything — you still need a plan for the money, not just a different pocket." },
    ],
  },
  {
    q: "A shopkeeper gives you Rs. 50 too much in change. What's the right move?",
    difficulty: "easy",
    options: [
      { label: "Keep it, it's not your problem", explain: "It technically is — that Rs. 50 came from the shopkeeper's own pocket by mistake." },
      { label: "Point out the mistake and return it", explain: "Right call. Honesty in small money moments is what builds trust — and it's just the right thing to do." },
      { label: "Ask for more since they made a mistake", explain: "Taking advantage of someone else's error isn't smart money behavior, it's just unfair." },
    ],
  },
  {
    q: "Your friend asks to borrow Rs. 200 'just for today.' What matters most before lending?",
    difficulty: "easy",
    options: [
      { label: "Nothing, friends should always say yes", explain: "Even with friends, lending without a plan often turns money into an awkward relationship problem." },
      { label: "Whether you can afford to not get it back", explain: "Smart lending means only lending what you're okay losing — that protects both the money and the friendship." },
      { label: "How much interest you can charge them", explain: "Charging interest on a casual favor to a friend usually damages trust more than it earns you money." },
    ],
  },
  {
    q: "Which of these is closest to a 'need' rather than a 'want'?",
    difficulty: "easy",
    options: [
      { label: "A new pair of AirPods", explain: "Nice to have, but not essential — that makes it a want, not a need." },
      { label: "Bus fare to get to school", explain: "Correct — this is something you require to function day to day, a genuine need." },
      { label: "The newest phone model", explain: "An upgrade to something you may already own is almost always a want, however tempting." },
    ],
  },
  {
    q: "You have Rs. 2,000 in a piggy bank at home. What's the main risk?",
    difficulty: "easy",
    options: [
      { label: "It could be lost, stolen, or spent impulsively since it's easy to access", explain: "Exactly — physical cash at home is convenient but has zero protection and zero growth." },
      { label: "It earns too much interest", explain: "Cash at home earns no interest at all — that's actually part of the problem." },
      { label: "The bank will charge you a fee for it", explain: "Money that isn't in a bank isn't touched by bank fees — that's not the real risk here." },
    ],
  },
  {
    q: "What does 'living within your means' actually mean?",
    difficulty: "easy",
    options: [
      { label: "Spending less than or equal to what you earn", explain: "That's the definition — your outflow shouldn't exceed your inflow, consistently." },
      { label: "Never spending any money at all", explain: "That's extreme avoidance, not a sustainable financial habit." },
      { label: "Spending exactly what your richest friend spends", explain: "Comparing your spending to someone else's income is a common trap, not a sound plan." },
    ],
  },
  {
    q: "You want to buy a Rs. 3,000 jacket but only have Rs. 1,200. Which is the healthiest approach?",
    difficulty: "easy",
    options: [
      { label: "Buy it now on a friend's credit card and pay them back 'eventually'", explain: "Vague repayment plans on borrowed money are exactly how small debts spiral." },
      { label: "Save the remaining Rs. 1,800 over a few weeks, then buy it", explain: "Delayed gratification with a clear savings target — the lowest-risk, most sustainable path." },
      { label: "Take a loan from an informal lender", explain: "For a Rs. 1,800 gap, informal high-interest borrowing is wildly disproportionate to the need." },
    ],
  },
  {
    q: "What's the safest place to keep money you'll need next month?",
    difficulty: "easy",
    options: [
      { label: "A regular savings account", explain: "Accessible, safe, and simple — appropriate for money you'll need soon." },
      { label: "Locked in a 5-year fixed deposit", explain: "Locking up money you need in a month means you can't access it without penalties." },
      { label: "Invested in a volatile stock", explain: "Money needed soon shouldn't be exposed to the risk of a short-term value drop." },
    ],
  },
  {
    q: "Your monthly allowance is Rs. 5,000. You spend Rs. 5,300 most months. What's happening?",
    difficulty: "easy",
    options: [
      { label: "You're building savings", explain: "Spending more than you receive is the opposite of building savings — it's a shortfall." },
      { label: "You're running a small deficit that will eventually cause problems", explain: "Right — consistently spending more than you earn means debt or borrowing fills the gap over time." },
      { label: "Nothing, Rs. 300 is too small to matter", explain: "Small gaps repeated every month compound into a real problem — it's not too small to matter." },
    ],
  },
  {
    q: "Why is it smart to track your spending, even roughly?",
    difficulty: "easy",
    options: [
      { label: "It's required by banks", explain: "Banks don't require personal tracking — this is about your own awareness, not a rule." },
      { label: "You can't manage money you can't see clearly", explain: "Exactly — most overspending happens because people underestimate where money actually goes." },
      { label: "It guarantees you'll get rich", explain: "Tracking helps awareness, but it's not a guarantee of wealth on its own." },
    ],
  },
  {
    q: "You want to buy something costing Rs. 1,500 but it is not urgent. What is the smartest approach?",
    difficulty: "easy",
    options: [
      { label: "Buy it immediately with savings meant for something else", explain: "Raiding savings meant for another goal usually just delays that other goal instead of solving anything." },
      { label: "Wait a few days, then decide if you still want it", explain: "A short cooling-off period is a simple, proven way to filter real wants from impulse." },
      { label: "Buy it on credit even though it is not urgent", explain: "Using borrowed money for a non-urgent purchase adds unnecessary cost and risk." },
    ],
  },
  {
    q: "A 'want' becomes a smart purchase mainly when...",
    difficulty: "easy",
    options: [
      { label: "It's on sale, no matter what", explain: "A discount on something you don't need is still money leaving your pocket unnecessarily." },
      { label: "It fits comfortably within a budget you've already planned for", explain: "That's the key — a want is fine when it doesn't compromise your needs or savings." },
      { label: "Someone else is buying the same thing", explain: "Peer pressure isn't a financial plan — what matters is your own budget, not others' choices." },
    ],
  },
  {
    q: "Which best describes an 'emergency fund'?",
    difficulty: "easy",
    options: [
      { label: "Money set aside specifically for unexpected costs, not everyday spending", explain: "Correct — it's a buffer for the unplanned, kept separate from regular spending money." },
      { label: "Your entire savings, all in one place, for any use", explain: "Mixing emergency money with general spending money defeats the purpose — it gets used too easily." },
      { label: "Money you borrow only during emergencies", explain: "An emergency fund is money you already have set aside, not money you plan to borrow later." },
    ],
  },
  {
    q: "You receive Rs. 10,000 as a gift. Splitting it into spend/save/give is an example of...",
    difficulty: "easy",
    options: [
      { label: "Overcomplicating something simple", explain: "It's actually a very simple, common budgeting habit — not overengineering." },
      { label: "Basic budgeting in action", explain: "Right — giving every rupee a purpose, even informally, is the essence of budgeting." },
      { label: "A bank requirement", explain: "No bank requires this — it's a personal money habit, entirely optional but useful." },
    ],
  },
  {
    q: "What's the main danger of impulse buying?",
    difficulty: "easy",
    options: [
      { label: "It always means the item is low quality", explain: "Impulse purchases can be decent quality — the issue is the decision process, not the product." },
      { label: "It skips the step of checking if you can actually afford it comfortably", explain: "Exactly — impulse buys bypass the pause where you'd normally weigh cost against your budget." },
      { label: "It's illegal in most stores", explain: "Impulse buying isn't illegal — it's a financial habit issue, not a legal one." },
    ],
  },
  {
    q: "You lend Rs. 300 to a classmate with no discussion of when they'll repay. Best practice going forward?",
    difficulty: "easy",
    options: [
      { label: "Assume it'll sort itself out eventually", explain: "Vague expectations are exactly how small loans between friends turn awkward or get forgotten." },
      { label: "Agree on a rough repayment timeframe upfront next time", explain: "Even a casual 'by next week' avoids confusion and protects the friendship." },
      { label: "Never speak to them about money again", explain: "Avoiding the topic entirely doesn't resolve anything — a simple conversation does." },
    ],
  },
  {
    q: "Why might a 'buy one get one free' deal not actually save you money?",
    difficulty: "easy",
    options: [
      { label: "It never does — such deals are always a scam", explain: "That's too extreme — many such deals are genuine, the issue is more specific than that." },
      { label: "If you weren't planning to buy either item, you're spending money you wouldn't have otherwise", explain: "Right — a 'deal' on something you didn't need isn't really a saving, it's new spending." },
      { label: "The store loses money on every such deal", explain: "Store margins aren't really the consumer's concern here — the question is about your own spending." },
    ],
  },
  {
    q: "What is a 'fixed expense'?",
    difficulty: "easy",
    options: [
      { label: "An expense that stays roughly the same every month, like rent", explain: "Correct — fixed expenses are predictable and recur at a similar amount." },
      { label: "An expense you can skip entirely if money is tight", explain: "Fixed expenses are typically obligations you can't easily skip — that's what makes them 'fixed'." },
      { label: "Money spent only once in a lifetime", explain: "A one-time cost isn't what 'fixed' refers to here — fixed means recurring and predictable." },
    ],
  },
  {
    q: "If your income is irregular (like freelance work), what's a smart budgeting habit?",
    difficulty: "easy",
    options: [
      { label: "Spend based on your best month, every month", explain: "Basing spending on your highest-earning month sets you up to overspend in leaner months." },
      { label: "Budget based on your lowest typical month, and save the extra in good months", explain: "This creates a buffer, so leaner months don't cause a crisis." },
      { label: "Don't budget at all since income changes anyway", explain: "Irregular income actually makes budgeting more important, not less." },
    ],
  },
  {
    q: "Your parents give you Rs. 1,000/week. After 4 weeks you've saved Rs. 400. What does that suggest?",
    difficulty: "easy",
    options: [
      { label: "You're saving 10% of what you receive", explain: "Rs. 400 saved out of Rs. 4,000 received is 10%, not what's stated in the option — check the math again." },
      { label: "You're saving 10% of what you receive", explain: "Actually Rs. 400 / Rs. 4,000 = 10% — this is the correct read of the numbers." },
      { label: "You've saved nothing meaningful", explain: "Saving 10% consistently over time is a solid, meaningful habit, not nothing." },
    ],
  },
  {
    q: "What's the simplest reason to avoid carrying large amounts of cash around?",
    difficulty: "easy",
    options: [
      { label: "Cash physically loses value the longer you hold it", explain: "Cash doesn't degrade on its own — the risk here is loss or theft, not physical decay." },
      { label: "It's easily lost or stolen, with no way to recover it", explain: "Correct — unlike a bank account, physical cash has no backup or protection if it's gone." },
      { label: "Shops refuse cash payments", explain: "Most shops in Pakistan still widely accept cash — this isn't the real concern." },
    ],
  },
  {
    q: "Which is the better long-term habit: saving Rs. 100/day or saving Rs. 3,000 once a month?",
    difficulty: "easy",
    options: [
      { label: "They're mathematically similar, but daily saving builds a stronger habit", explain: "Both add up to roughly the same amount, but small consistent actions build habits more reliably than one big monthly effort." },
      { label: "Monthly saving is always better because it's less effort", explain: "Less frequent effort doesn't make it better — habit-building research favors small, consistent actions." },
      { label: "Neither matters since the total is the same", explain: "The total may be similar, but the psychological habit-forming effect is genuinely different." },
    ],
  },
  {
    q: "What does it mean when someone says 'pay yourself first'?",
    difficulty: "easy",
    options: [
      { label: "Pay off all your friends before anyone else", explain: "This phrase has nothing to do with paying others — it's about your own saving habit." },
      { label: "Set aside savings before spending on anything else", explain: "Correct — it means treating savings like a non-negotiable expense, prioritized first." },
      { label: "Give yourself a bonus every payday", explain: "This isn't about bonuses — it's about prioritizing saving over spending." },
    ],
  },
  {
    q: "A friend says 'I don't need a budget, I just know where my money goes.' What's the risk in that thinking?",
    difficulty: "easy",
    options: [
      { label: "There's no risk — memory is just as reliable as writing it down", explain: "Most people significantly underestimate their own spending when relying on memory alone." },
      { label: "Without tracking, small leaks in spending often go unnoticed until they add up", explain: "Exactly — this is one of the most common reasons budgets help, even simple ones." },
      { label: "Budgets are only useful for businesses, not individuals", explain: "Personal budgeting is just as valuable as business budgeting — the principle is the same." },
    ],
  },
  {
    q: "You get Rs. 800 pocket money weekly. What's a reasonable weekly savings target for a beginner?",
    difficulty: "easy",
    options: [
      { label: "Rs. 0 — save later once you 'have more'", explain: "Waiting to 'have more' before starting to save is a common trap — habits matter more than amount at first." },
      { label: "Rs. 100–150, adjusted as needed", explain: "A modest, sustainable percentage (roughly 12–19%) is realistic and builds the habit without feeling painful." },
      { label: "Rs. 800 — save all of it", explain: "Saving 100% leaves nothing for anything else, which usually isn't sustainable long-term." },
    ],
  },
  {
    q: "Which is the clearest sign of good money habits at a young age?",
    difficulty: "easy",
    options: [
      { label: "Spending everything immediately because 'you're young, enjoy it'", explain: "This mindset often delays the habit-building that makes bigger goals possible later." },
      { label: "Occasionally setting aside even small amounts consistently", explain: "Consistency, even in small amounts, is the actual foundation of good financial habits." },
      { label: "Only worrying about money once you have a job", explain: "Waiting until later misses years of habit-building time that compounds in value." },
    ],
  },
  {
    q: "What's the main purpose of a receipt when you buy something?",
    difficulty: "easy",
    options: [
      { label: "It's just a formality with no real use", explain: "Receipts serve real purposes — proof of purchase, returns, and tracking spending." },
      { label: "Proof of purchase that helps with returns and tracking spending", explain: "Correct — receipts are a small but useful tool for both accountability and awareness." },
      { label: "It guarantees the item will never break", explain: "A receipt alone doesn't guarantee anything about product quality or durability." },
    ],
  },
  {
    q: "If two shops sell the same item, one for Rs. 500 and one for Rs. 550, what should you check before assuming the cheaper one is better?",
    difficulty: "easy",
    options: [
      { label: "Nothing — cheaper is always better", explain: "Price alone doesn't tell the whole story — quality, warranty, or authenticity might differ." },
      { label: "Whether the item, condition, or service is actually the same", explain: "Comparing price without comparing what you're actually getting can be misleading." },
      { label: "The shop's opening hours", explain: "Opening hours have nothing to do with comparing the value of the item itself." },
    ],
  },
  {
    q: "Your sibling says, 'money problems only happen to poor people.' What's the more accurate view?",
    difficulty: "easy",
    options: [
      { label: "That's true — wealthy people never mismanage money", explain: "People at every income level can face money problems if spending isn't managed well." },
      { label: "Money habits matter at every income level, not just for people with less", explain: "Correct — poor financial habits can cause problems regardless of how much someone earns." },
      { label: "Money problems are entirely random and unrelated to habits", explain: "Habits and decisions play a real role — it's not purely random chance." },
    ],
  },
  {
    q: "You have Rs. 15,000 saved. A 6-month fixed deposit offers 12% annual interest. Roughly how much interest would you earn in 6 months?",
    difficulty: "medium",
    options: [
      { label: "Roughly Rs. 1,800", explain: "12% annually on Rs. 15,000 is Rs. 1,800 per year, but for 6 months it should be halved." },
      { label: "Roughly Rs. 900", explain: "Correct — half of the annual 12% (Rs. 1,800) for a 6-month period is about Rs. 900." },
      { label: "Roughly Rs. 3,600", explain: "This would be the interest over 2 years at that rate, not 6 months." },
    ],
  },
  {
    q: "Your friend says 'I put Rs. 5,000 in a scheme that promises 20% return every month.' What's the biggest red flag?",
    difficulty: "medium",
    options: [
      { label: "20% is too specific a number to be real", explain: "Specificity isn't the issue — the size and consistency of the promised return is." },
      { label: "Monthly returns that high and guaranteed are a classic sign of a scam or Ponzi scheme", explain: "Correct — legitimate investments rarely guarantee high, consistent monthly returns; this pattern matches most financial scams." },
      { label: "Nothing, some investments really do return that much", explain: "Consistent 20% monthly returns don't exist sustainably in legitimate markets — this should raise serious doubt." },
    ],
  },
  {
    q: "Inflation is running at roughly 12% a year. Your savings account pays 6% interest. What's actually happening to your money's real value?",
    difficulty: "medium",
    options: [
      { label: "It's growing, since you're earning interest", explain: "Nominally it's growing, but relative to rising prices, it's actually losing purchasing power." },
      { label: "It's losing real value, because prices are rising faster than your interest earnings", explain: "Correct — when inflation outpaces your interest rate, your money buys less over time despite 'growing' on paper." },
      { label: "It's staying exactly the same in real terms", explain: "A 6% gain against 12% inflation is a real loss of roughly 6% in purchasing power, not neutral." },
    ],
  },
  {
    q: "You're comparing two credit offers: one at 24% annual interest, another at 2% monthly interest. Which is more expensive?",
    difficulty: "medium",
    options: [
      { label: "The 24% annual one", explain: "2% monthly compounds to roughly 24%+ annually (actually closer to 26.8% compounded) — likely more expensive, not less." },
      { label: "The 2% monthly one — it compounds to a higher effective annual rate", explain: "Correct — 2% every month compounds to about 26.8% a year, higher than a flat 24% annual rate." },
      { label: "They're exactly identical", explain: "They look similar at a glance, but monthly compounding makes the 2%/month option more expensive overall." },
    ],
  },
  {
    q: "A shop offers 0% installment payments on a Rs. 60,000 laptop over 12 months. What should you still check?",
    difficulty: "medium",
    options: [
      { label: "Nothing — 0% means completely free financing, no catch possible", explain: "Many 0% offers include processing fees or inflated upfront prices — it's worth checking the fine print." },
      { label: "Whether there's a processing fee or inflated cash price built into the deal", explain: "Correct — 'interest-free' offers sometimes recover costs through fees or higher base pricing." },
      { label: "The color options available", explain: "Cosmetic choices don't affect whether the financing terms are genuinely favorable." },
    ],
  },
  {
    q: "You earn Rs. 40,000/month. Rent is Rs. 15,000, food is Rs. 10,000, transport is Rs. 5,000. What percentage of income is left for savings and other spending, at most?",
    difficulty: "medium",
    options: [
      { label: "25%", explain: "Rs. 30,000 spent out of Rs. 40,000 leaves Rs. 10,000, which is 25% — actually correct, double check this against the other option." },
      { label: "25%", explain: "Correct — Rs. 30,000 in fixed costs out of Rs. 40,000 leaves Rs. 10,000, or 25%, for everything else." },
      { label: "75%", explain: "75% would mean only Rs. 10,000 was spent, but the fixed costs listed already total Rs. 30,000." },
    ],
  },
  {
    q: "What does it mean if a stock's price is described as 'volatile'?",
    difficulty: "medium",
    options: [
      { label: "It always goes up over time", explain: "Volatility describes fluctuation, not a guaranteed direction — it can rise or fall sharply." },
      { label: "Its price moves up and down significantly over short periods", explain: "Correct — volatility refers to the size and frequency of price swings, not their direction." },
      { label: "It's a type of savings account", explain: "Volatility is a concept related to markets and investments, not standard savings accounts." },
    ],
  },
  {
    q: "You're offered a loan with a low advertised rate, but the lender doesn't mention 'processing fees' until you sign. What's this an example of?",
    difficulty: "medium",
    options: [
      { label: "Standard practice, nothing to worry about", explain: "Hidden fees revealed only at signing are a known warning sign of predatory or opaque lending." },
      { label: "A hidden cost that makes the real cost of borrowing higher than advertised", explain: "Correct — undisclosed fees are exactly how the real cost of a loan can end up higher than the headline rate suggests." },
      { label: "A legal requirement in every loan", explain: "Transparent lenders disclose fees upfront — it's not a universal requirement to hide them." },
    ],
  },
  {
    q: "A friend suggests putting all your savings into one relative's new business for 'guaranteed high returns.' What's the core financial mistake here?",
    difficulty: "medium",
    options: [
      { label: "There's no mistake — trusting family is always safe with money", explain: "Trust and financial risk are different things — even well-meaning family businesses can fail." },
      { label: "Concentrating all your money in one single, unproven investment with a 'guaranteed' promise", explain: "Correct — this combines two red flags: lack of diversification and an unrealistic guarantee." },
      { label: "The business idea itself is automatically bad", explain: "The idea's quality isn't really the point — the mistake is the all-in, guaranteed-return framing." },
    ],
  },
  {
    q: "Your bank statement shows a 'markup rate' of 22% on a credit card balance. What does 'markup' mean here?",
    difficulty: "medium",
    options: [
      { label: "A one-time joining fee", explain: "A joining fee is a separate, one-time charge — markup refers to something ongoing." },
      { label: "The interest charged on the unpaid balance", explain: "Correct — in Pakistani banking terms, 'markup' commonly refers to the interest rate applied to unpaid amounts." },
      { label: "A discount for early repayment", explain: "Markup isn't a discount — it's a cost applied to the balance, the opposite of a reward for paying early." },
    ],
  },
  {
    q: "If Rs. 100,000 grows at 8% compounded annually, roughly how much will it be worth after 10 years?",
    difficulty: "medium",
    options: [
      { label: "Roughly Rs. 180,000", explain: "This underestimates compounding — Rs. 100,000 at 8% for 10 years compounds to closer to Rs. 216,000." },
      { label: "Roughly Rs. 216,000", explain: "Correct — compound growth at 8% annually over 10 years takes Rs. 100,000 to roughly Rs. 216,000." },
      { label: "Roughly Rs. 108,000", explain: "That would only reflect a single year's growth, not 10 years of compounding." },
    ],
  },
  {
    q: "A scam text says 'Your Easypaisa account will be blocked in 1 hour unless you verify by sharing your PIN.' What's the smartest response?",
    difficulty: "medium",
    options: [
      { label: "Reply quickly with the PIN to avoid losing access", explain: "This is exactly the panicked reaction scammers are engineering — real providers never ask for your PIN." },
      { label: "Ignore the message and, if worried, contact the official provider directly through verified channels", explain: "Correct — never respond to the message directly; verify independently through official numbers or the app." },
      { label: "Forward the PIN to a friend to double-check first", explain: "Sharing your PIN with anyone, even briefly, still exposes it — the right move is to never share it at all." },
    ],
  },
  {
    q: "What's the difference between a 'debit card' and a 'credit card' in simple terms?",
    difficulty: "medium",
    options: [
      { label: "They're identical, just different colors", explain: "They function very differently — one spends your own money, the other spends borrowed money." },
      { label: "A debit card spends your own money directly; a credit card spends borrowed money you repay later", explain: "Correct — this is the core distinction, and it's why credit cards involve interest if unpaid." },
      { label: "A credit card can only be used online", explain: "Both debit and credit cards can generally be used both online and in physical stores." },
    ],
  },
  {
    q: "A 'grace period' on a credit card typically means...",
    difficulty: "medium",
    options: [
      { label: "A time window to pay your balance in full without being charged interest", explain: "Correct — pay within the grace period and you typically avoid interest entirely on that balance." },
      { label: "A period where the bank forgives your entire debt", explain: "A grace period isn't debt forgiveness — it's simply a window to pay without incurring interest." },
      { label: "Extra time to spend more without any limit", explain: "It relates to repayment timing, not an increase in your spending limit." },
    ],
  },
  {
    q: "Why might diversifying investments (spreading money across different things) reduce risk?",
    difficulty: "medium",
    options: [
      { label: "It guarantees you'll never lose money", explain: "Diversification reduces risk, but it doesn't eliminate the possibility of loss entirely." },
      { label: "If one investment performs poorly, others may perform better, balancing overall risk", explain: "Correct — diversification spreads exposure so a single bad outcome doesn't sink your entire portfolio." },
      { label: "It increases your returns automatically", explain: "Diversification primarily manages risk, not a guaranteed boost to overall returns." },
    ],
  },
  {
    q: "You see a Facebook ad: 'Invest Rs. 10,000, double it in 7 days, guaranteed!' What's the correct read?",
    difficulty: "medium",
    options: [
      { label: "A legitimate, fast investment opportunity worth trying", explain: "Doubling money in 7 days with a 'guarantee' has no basis in legitimate finance — this pattern is almost always fraudulent." },
      { label: "An almost certain scam — no legitimate investment guarantees returns like that, that fast", explain: "Correct — the combination of a guarantee and an unrealistic timeframe is a textbook scam pattern." },
      { label: "A risky but potentially real crypto opportunity", explain: "Even in volatile markets like crypto, guaranteed short-term doubling isn't how legitimate investing works." },
    ],
  },
  {
    q: "What's the risk of only making 'minimum payments' on a credit card balance?",
    difficulty: "medium",
    options: [
      { label: "There's no risk — minimum payments keep you in good standing forever", explain: "Minimum payments avoid late fees, but interest keeps accruing on the remaining balance, often for a long time." },
      { label: "Interest keeps accumulating on the unpaid balance, so the debt can grow for a long time", explain: "Correct — minimum payments are designed to barely cover interest, meaning the principal shrinks very slowly." },
      { label: "Your credit limit automatically increases", explain: "Minimum payments don't automatically raise your limit — that's a separate bank decision." },
    ],
  },
  {
    q: "You're deciding between paying off a Rs. 20,000 debt at 18% interest, or investing Rs. 20,000 expecting 10% returns. What's generally smarter?",
    difficulty: "medium",
    options: [
      { label: "Investing, since any return is better than none", explain: "An 18% cost of debt outweighs a 10% expected investment return — the math favors paying off debt first." },
      { label: "Paying off the debt first, since its interest rate is higher than the expected investment return", explain: "Correct — it rarely makes sense to invest at a lower expected return than the guaranteed cost of your debt." },
      { label: "It makes no difference either way", explain: "The gap between 18% cost and 10% return is significant — this decision does matter." },
    ],
  },
  {
    q: "What does 'liquidity' mean when talking about an investment?",
    difficulty: "medium",
    options: [
      { label: "How easily it can be converted to cash without losing significant value", explain: "Correct — high liquidity means quick, low-loss access to your money; low liquidity means the opposite." },
      { label: "How much profit it guarantees", explain: "Liquidity is about accessibility of funds, not a measure of expected profit." },
      { label: "Whether it's related to water or oil companies", explain: "This is a finance term about accessibility, unrelated to any specific industry." },
    ],
  },
  {
    q: "A lender advertises 'no credit check needed, instant approval.' Why might this be a warning sign?",
    difficulty: "medium",
    options: [
      { label: "It's not a warning sign — it's just convenient", explain: "Lenders that skip standard checks often charge much higher rates or fees to offset their risk." },
      { label: "Skipping standard checks can mean the lender compensates with very high interest or hidden fees", explain: "Correct — 'no checks, instant approval' often signals the cost is being recovered elsewhere, usually through steep terms." },
      { label: "It means the loan is interest-free", explain: "Ease of approval has no relationship to whether interest is charged — these are separate features." },
    ],
  },
  {
    q: "If the PKR depreciates against the USD, what generally happens to imported goods' prices in Pakistan?",
    difficulty: "medium",
    options: [
      { label: "They tend to become more expensive in rupee terms", explain: "Correct — a weaker rupee means it takes more PKR to buy the same USD-priced imported goods." },
      { label: "They tend to become cheaper", explain: "Depreciation raises the rupee cost of anything priced in foreign currency, not lowers it." },
      { label: "Prices are unaffected by currency changes", explain: "Import prices are directly tied to exchange rates, so this isn't accurate." },
    ],
  },
  {
    q: "Your 'net worth' is best described as...",
    difficulty: "medium",
    options: [
      { label: "Your monthly salary", explain: "Net worth isn't about income flow — it's a snapshot of total value at a point in time." },
      { label: "What you own (assets) minus what you owe (debts)", explain: "Correct — this is the standard definition, capturing your overall financial position." },
      { label: "The amount of cash in your wallet right now", explain: "Cash on hand is just one small part of the full picture, not the whole measure." },
    ],
  },
  {
    q: "A stablecoin is pegged 1:1 to the USD, but you notice it's trading at a 5% premium in the local market. What does this most likely indicate?",
    difficulty: "hard",
    options: [
      { label: "The stablecoin issuer has changed the peg", explain: "A trading premium in the local market usually reflects local supply/demand dynamics, not a change in the underlying peg itself." },
      { label: "Limited local USD liquidity access is pushing people to pay extra for dollar-equivalent exposure", explain: "Correct — premiums like this often reflect real-world friction in accessing dollars, not a flaw in the peg mechanism." },
      { label: "The stablecoin is a scam", explain: "A trading premium alone doesn't indicate fraud — it's a liquidity signal, common during currency stress." },
    ],
  },
  {
    q: "A company reports 'revenue growth of 40%' but 'net profit down 10%.' What does this combination suggest?",
    difficulty: "hard",
    options: [
      { label: "The company is doing extremely well overall", explain: "Rising revenue with falling profit suggests rising costs are outpacing sales growth — not an unambiguous win." },
      { label: "Costs or expenses are likely rising faster than sales, squeezing profitability", explain: "Correct — this is a classic sign of margin compression, worth investigating further before assuming health." },
      { label: "The numbers must be a reporting error", explain: "This combination is common and plausible in real financial reporting — not inherently an error." },
    ],
  },
  {
    q: "Why might a central bank raise interest rates during high inflation?",
    difficulty: "hard",
    options: [
      { label: "To make borrowing more expensive, which tends to reduce spending and cool price rises", explain: "Correct — higher rates discourage borrowing/spending, which can help slow demand-driven inflation over time." },
      { label: "To directly print more currency", explain: "Raising interest rates is a monetary policy tool distinct from currency printing — they work differently." },
      { label: "To immediately lower all prices in the economy", explain: "Rate hikes influence prices gradually through demand, not through an immediate, direct price reset." },
    ],
  },
  {
    q: "A bond's price and interest rates generally move in what relationship?",
    difficulty: "hard",
    options: [
      { label: "They move in the same direction", explain: "Bond prices and interest rates typically move in the opposite direction, not the same one." },
      { label: "They typically move in opposite directions", explain: "Correct — when interest rates rise, existing bond prices generally fall, and vice versa." },
      { label: "They have no relationship at all", explain: "There's a well-established inverse relationship here, not an absence of connection." },
    ],
  },
  {
    q: "What's the primary risk of an informal (non-bank) lending network relying on personal trust rather than contracts?",
    difficulty: "hard",
    options: [
      { label: "There's essentially no risk if people are trustworthy", explain: "Even trustworthy relationships can break down over money disputes, and there's no formal recourse if they do." },
      { label: "Disputes have no formal legal recourse, so recovery of funds relies entirely on relationships", explain: "Correct — without contracts, resolving a dispute depends purely on goodwill, which is a real structural risk." },
      { label: "It's always more expensive than formal lending", explain: "Informal lending isn't necessarily more expensive — the core risk here is about enforceability, not cost." },
    ],
  },
  {
    q: "If a currency depreciates rapidly, why might some people rush to convert savings into US dollars or stablecoins?",
    difficulty: "hard",
    options: [
      { label: "To protect purchasing power against further local currency devaluation", explain: "Correct — this is a common hedge: converting to a more stable currency to avoid losing further value in local terms." },
      { label: "Because dollars are more colorful and easier to count", explain: "This is not a genuine financial reason — the motivation is about value preservation, not usability." },
      { label: "It's a legal requirement during depreciation", explain: "There's no such legal requirement — this behavior is a voluntary financial decision." },
    ],
  },
  {
    q: "A mutual fund's 'expense ratio' is 2% annually. Why does this matter over a long investment horizon?",
    difficulty: "hard",
    options: [
      { label: "It's a one-time fee that barely affects returns", explain: "Expense ratios are charged annually, not once — over decades, this compounds into a significant cost." },
      { label: "Charged every year, it compounds and can meaningfully erode long-term returns", explain: "Correct — a seemingly small annual fee, compounded over many years, can significantly reduce overall growth." },
      { label: "It only applies if the fund loses money", explain: "Expense ratios apply regardless of performance — they're charged whether the fund gains or loses value." },
    ],
  },
  {
    q: "Why can a 'diversified' portfolio still lose significant value during a broad market crash?",
    difficulty: "hard",
    options: [
      { label: "Diversification is fake and doesn't work at all", explain: "Diversification does reduce specific risks, but it doesn't eliminate broad, market-wide (systemic) risk." },
      { label: "Diversification reduces individual asset risk but not broad, market-wide systemic risk", explain: "Correct — when nearly everything falls together in a crash, spreading across similar assets offers limited protection." },
      { label: "It only applies to bonds, not stocks", explain: "Diversification principles apply across asset types, not exclusively to bonds." },
    ],
  },
  {
    q: "What does 'inverted yield curve' commonly signal to economists?",
    difficulty: "hard",
    options: [
      { label: "Strong, sustained economic growth ahead", explain: "An inverted yield curve is more commonly interpreted as a warning sign, not a growth signal." },
      { label: "A potential upcoming economic slowdown or recession", explain: "Correct — historically, an inverted yield curve has often preceded economic downturns, though it's not a certainty." },
      { label: "That all banks are about to fail", explain: "This is an overstatement — it's an economic indicator, not a direct signal of bank failure." },
    ],
  },
  {
    q: "A company offers you 'equity' instead of a cash salary for part-time work. What's the core trade-off?",
    difficulty: "hard",
    options: [
      { label: "Equity is always worth more than cash, so it's a better deal", explain: "Equity's value is uncertain and depends entirely on the company's future success — it's not automatically better." },
      { label: "You trade guaranteed cash now for uncertain, potentially larger value later, tied to company performance", explain: "Correct — this is a real risk/reward trade-off: certainty now versus speculative upside later." },
      { label: "There's no real difference between the two", explain: "Cash and equity behave very differently in terms of risk, timing, and certainty of value." },
    ],
  },
  {
    q: "Why might a government intentionally allow some inflation rather than aiming for exactly 0%?",
    difficulty: "hard",
    options: [
      { label: "Mild, controlled inflation can support economic activity and gives room to lower rates during downturns", explain: "Correct — most central banks target modest inflation (not zero) partly to maintain flexibility and encourage spending/investment." },
      { label: "0% inflation is technically impossible to achieve", explain: "It's not that 0% is impossible — it's a deliberate policy choice with specific economic reasoning." },
      { label: "Inflation targets don't actually exist", explain: "Most central banks, including the SBP, do set explicit inflation targets as policy tools." },
    ],
  },
  {
    q: "What's a key difference between a Ponzi scheme and a legitimate high-risk investment?",
    difficulty: "hard",
    options: [
      { label: "A Ponzi scheme pays early investors using new investors' money rather than real profit; legitimate investments generate real returns from actual activity", explain: "Correct — this structural dependence on new money (rather than real value creation) is the defining feature of a Ponzi scheme." },
      { label: "Ponzi schemes are always run by strangers, never people you know", explain: "Ponzi schemes frequently involve trusted community or family networks — familiarity doesn't rule it out." },
      { label: "There's no real difference — both are equally risky", explain: "Legitimate risky investments can lose money honestly; Ponzi schemes are fundamentally fraudulent by design." },
    ],
  },
  {
    q: "How can a rising USD/PKR exchange rate simultaneously help exporters and hurt importers?",
    difficulty: "hard",
    options: [
      { label: "It can't — it only ever affects one group", explain: "Exchange rate shifts typically have opposite effects on exporters versus importers simultaneously." },
      { label: "Exporters earn more rupees per dollar of sales, while importers pay more rupees for the same foreign goods", explain: "Correct — a weaker rupee makes exports relatively cheaper for foreign buyers while making imports more expensive locally." },
      { label: "It only affects the government, not businesses", explain: "Exchange rate movements have very direct, real effects on individual businesses' costs and revenues." },
    ],
  },
  {
    q: "Why do credit rating agencies matter for a country trying to borrow internationally?",
    difficulty: "hard",
    options: [
      { label: "They have no real influence — ratings are just symbolic", explain: "Credit ratings directly influence the interest rates a country pays and its access to international lending." },
      { label: "A lower credit rating typically means higher borrowing costs, since lenders demand more return for perceived risk", explain: "Correct — ratings signal risk to lenders, and riskier borrowers are charged higher rates to compensate." },
      { label: "Ratings only affect private companies, never governments", explain: "Sovereign credit ratings for countries are a major, closely watched category in global finance." },
    ],
  },
  {
    q: "What's the danger of 'survivorship bias' when looking at successful investors' stories?",
    difficulty: "hard",
    options: [
      { label: "There's no danger — successful stories are the most reliable data", explain: "Success stories overrepresent the winners while hiding the many failures that used similar strategies." },
      { label: "You only see the winners, missing all the people who used similar strategies and failed", explain: "Correct — this skews perception of risk, making a strategy look safer or more reliable than it really is." },
      { label: "It only applies to sports, not finance", explain: "Survivorship bias is a well-documented issue specifically relevant to investment strategy evaluation." },
    ],
  },
  {
    q: "A 'CBDC' (Central Bank Digital Currency) differs from a stablecoin mainly because...",
    difficulty: "hard",
    options: [
      { label: "A CBDC is issued and backed directly by a country's central bank, while stablecoins are typically issued by private companies", explain: "Correct — this issuer distinction affects trust, regulation, and how each is backed." },
      { label: "They're functionally identical in every way", explain: "Issuance authority, regulatory backing, and trust structures differ meaningfully between the two." },
      { label: "CBDCs can only be used for international trade", explain: "CBDCs are generally designed for broad domestic use, not restricted to international trade." },
    ],
  },
  {
    q: "Why might a company with strong profits still face a cash flow crisis?",
    difficulty: "hard",
    options: [
      { label: "Profit and cash are always the same thing, so this can't happen", explain: "Profit (accounting) and cash flow (actual money movement) are genuinely different, and this mismatch is common." },
      { label: "Profit can include unpaid invoices or non-cash items, meaning actual cash on hand may be much lower", explain: "Correct — a company can be profitable on paper while struggling to pay bills due to timing gaps in actual cash receipt." },
      { label: "Cash flow crises only happen to companies with losses", explain: "Cash flow issues can affect profitable companies too — profit doesn't guarantee available cash." },
    ],
  },
  {
    q: "What is 'moral hazard' in the context of financial bailouts?",
    difficulty: "hard",
    options: [
      { label: "When knowing you'll be rescued from bad decisions encourages taking on more risk than you otherwise would", explain: "Correct — this is the core concern: safety nets can unintentionally encourage riskier behavior." },
      { label: "A legal term for insurance fraud", explain: "Moral hazard is a broader economic concept about incentive structures, not specifically a fraud charge." },
      { label: "A rule that prevents any bailouts from happening", explain: "Moral hazard describes a risk of bailouts, not a rule against them — it's a concern, not a prohibition." },
    ],
  },
  {
    q: "Why is 'past performance' of an investment fund not a reliable guarantee of future results?",
    difficulty: "hard",
    options: [
      { label: "Because market conditions, competition, and circumstances change, and past success doesn't guarantee those conditions repeat", explain: "Correct — this is precisely why regulators require this disclaimer; conditions that drove past returns can shift entirely." },
      { label: "Past performance data is usually fabricated", explain: "Most disclosed performance data is accurate — the issue is relevance to the future, not honesty about the past." },
      { label: "It actually is a reliable guarantee, contrary to common advice", explain: "This directly contradicts a near-universal principle in finance, backed by extensive evidence." },
    ],
  },
  {
    q: "How can a country experience both a strong stock market and a struggling broader economy at the same time?",
    difficulty: "hard",
    options: [
      { label: "This combination is impossible — they always move together", explain: "Stock markets and the broader 'real' economy can diverge for various reasons, including sector concentration or investor expectations." },
      { label: "Markets reflect expectations and specific large companies' performance, which don't always mirror the average person's economic experience", explain: "Correct — a handful of large, thriving companies can drive index performance even while broader employment or wages struggle." },
      { label: "It only happens in fictional economies", explain: "This divergence is a well-documented, real phenomenon observed in many actual economies." },
    ],
  },
  {
    q: "What's the main critique of relying purely on GDP growth as a measure of a country's financial wellbeing?",
    difficulty: "hard",
    options: [
      { label: "There's no valid critique — GDP captures everything that matters", explain: "GDP is a useful but incomplete measure — it misses distribution of wealth, informal economy activity, and wellbeing factors." },
      { label: "It doesn't capture how income is distributed, informal economic activity, or broader wellbeing", explain: "Correct — a rising GDP can coexist with worsening inequality or living standards for large parts of the population." },
      { label: "GDP measures only stock market performance", explain: "GDP measures total economic output, not the stock market specifically — this conflates two different things." },
    ],
  },
  {
    q: "Why do some economists argue remittances (money sent home by overseas workers) can both help and create long-term risk for a country like Pakistan?",
    difficulty: "hard",
    options: [
      { label: "Remittances only ever help, with no downsides", explain: "While remittances provide crucial support, heavy reliance on them can create structural dependency risks." },
      { label: "They boost foreign currency inflows and household income, but heavy reliance can mask deeper structural economic issues", explain: "Correct — remittances are genuinely valuable, but an economy leaning on them may underinvest in other productive sectors." },
      { label: "Remittances are classified as foreign debt", explain: "Remittances are income transfers, not debt — they don't need to be repaid, unlike loans." },
    ],
  },
  {
    q: "A 'liquidity crisis' at a bank most precisely refers to...",
    difficulty: "hard",
    options: [
      { label: "The bank being fundamentally insolvent with negative net worth", explain: "Insolvency and a liquidity crisis are related but distinct — a liquidity crisis is specifically about short-term access to cash." },
      { label: "The bank being temporarily unable to meet short-term cash demands, even if it holds long-term valuable assets", explain: "Correct — liquidity issues are about timing and access to cash, not necessarily overall financial health." },
      { label: "A marketing term with no real financial meaning", explain: "This is a well-defined, serious financial concept used to describe real banking crises." },
    ],
  },
  {
    q: "Why might two economists disagree on whether raising the minimum wage will help or hurt low-income workers overall?",
    difficulty: "hard",
    options: [
      { label: "One of them must simply be wrong about basic economics", explain: "This is a genuinely contested area in economics, with credible research and reasoning on multiple sides." },
      { label: "They may weigh differently the trade-off between higher pay per worker and potential reduced hiring or hours", explain: "Correct — this reflects real, ongoing debate in economics about employment elasticity and wage effects, not simple error." },
      { label: "Minimum wage economics is settled science with only one correct answer", explain: "This remains an actively debated topic among economists, not a fully settled question." },
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

const NAME_STORAGE_KEY = "rise-finance-user-name";
const CHALLENGE_PROGRESS_KEY = "rise-finance-challenge-progress";
const COMPLETED_MODULES_KEY = "rise-finance-completed-modules";
const VISIT_LOG_KEY = "rise-finance-visit-log";

export default function RiseFinanceApp() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("en");
  const [openModuleId, setOpenModuleId] = useState(null);
  // Real progress only — no pre-seeded fake completion. New users start at 0/10.
  const [completed, setCompleted] = useState(new Set());
  const [streak, setStreak] = useState(0);

  // Name identity — asked before Challenges so the certificate can carry it
  const [userName, setUserName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // where to go once name is set

  // Challenge progress lives at the top level so the Certificate page can read it
  const [challengeAnswers, setChallengeAnswers] = useState({}); // { [index]: optionIndex }

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem(NAME_STORAGE_KEY);
      if (savedName) setUserName(savedName);
      const savedProgress = window.localStorage.getItem(CHALLENGE_PROGRESS_KEY);
      if (savedProgress) setChallengeAnswers(JSON.parse(savedProgress));
      const savedCompleted = window.localStorage.getItem(COMPLETED_MODULES_KEY);
      if (savedCompleted) setCompleted(new Set(JSON.parse(savedCompleted)));

      // Real learning streak: log today's visit, count back consecutive days.
      const today = new Date().toISOString().slice(0, 10);
      const rawLog = window.localStorage.getItem(VISIT_LOG_KEY);
      const log = rawLog ? JSON.parse(rawLog) : [];
      if (!log.includes(today)) log.push(today);
      window.localStorage.setItem(VISIT_LOG_KEY, JSON.stringify(log));
      let count = 0;
      let cursor = new Date();
      const dateSet = new Set(log);
      while (dateSet.has(cursor.toISOString().slice(0, 10))) {
        count += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
      setStreak(count);
    } catch (e) {
      /* localStorage unavailable — app still works, just without persistence */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHALLENGE_PROGRESS_KEY, JSON.stringify(challengeAnswers));
    } catch (e) {}
  }, [challengeAnswers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COMPLETED_MODULES_KEY, JSON.stringify([...completed]));
    } catch (e) {}
  }, [completed]);

  const saveName = (name) => {
    setUserName(name);
    try { window.localStorage.setItem(NAME_STORAGE_KEY, name); } catch (e) {}
    setShowNameModal(false);
    if (pendingAction) {
      setTab(pendingAction);
      setPendingAction(null);
    }
  };

  const requireName = (destination) => {
    if (userName) {
      setTab(destination);
    } else {
      setPendingAction(destination);
      setShowNameModal(true);
    }
  };

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
                onClick={() => {
                  setOpenModuleId(null);
                  if (item.id === "challenges") requireName("challenges");
                  else setTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  tab === item.id || (item.id === "challenges" && (tab === "certificate"))
                    ? "bg-[#141712] text-[#5CFFB0]" : "text-[#9AA39C] hover:text-[#F2F5F2]"
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
              onClick={() => {
                setOpenModuleId(null);
                if (item.id === "challenges") requireName("challenges");
                else setTab(item.id);
              }}
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

      {showNameModal && (
        <NameModal
          onSubmit={saveName}
          onClose={() => { setShowNameModal(false); setPendingAction(null); }}
        />
      )}

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {tab === "home" && <HomePage setTab={setTab} lang={lang} t={t} completed={completed} streak={streak} />}
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
        {tab === "challenges" && (
          <ChallengesPage
            userName={userName}
            answers={challengeAnswers}
            setAnswers={setChallengeAnswers}
            onViewCertificate={() => setTab("certificate")}
          />
        )}
        {tab === "certificate" && (
          <CertificatePage
            userName={userName}
            answers={challengeAnswers}
            onBack={() => setTab("challenges")}
          />
        )}
        {tab === "survey" && <SurveyPage onBack={() => setTab("home")} />}
        {tab === "progress" && <ProgressPage completed={completed} streak={streak} />}
        {tab === "research" && <ResearchPage />}
        {tab === "about" && <AboutPage />}
      </main>

      <footer className="border-t border-[#1A1D19] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7C867E]">
          <div className="flex items-center gap-4">
            <button onClick={() => setTab("survey")} className="hover:text-[#5CFFB0] transition-colors flex items-center gap-1">
              <ClipboardList size={12} /> Give feedback
            </button>
            <span className="font-mono">MVP v0.2</span>
          </div>
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
/* NAME MODAL — asked before Challenges, so the certificate can carry it  */
/* ------------------------------------------------------------------ */

function NameModal({ onSubmit, onClose }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed.length < 2) return;
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl p-6 max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#7C867E] hover:text-[#F2F5F2]">
          <X size={18} />
        </button>
        <div className="text-2xl mb-2">🏆</div>
        <h3 className="text-xl font-bold">What's your name?</h3>
        <p className="text-sm text-[#9AA39C] mt-2">
          We'll use this to put your name on your shareable certificate once you finish the challenges.
        </p>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. Rahul Kumar"
          className="mt-4 w-full bg-[#08090A] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A]"
        />
        <button
          onClick={submit}
          disabled={value.trim().length < 2}
          className="mt-4 w-full px-4 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOME PAGE                                                          */
/* ------------------------------------------------------------------ */

function HomePage({ setTab, lang, t, completed, streak }) {
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
              ["Quiz average", "—"],
              ["Learning streak", `${streak} day${streak === 1 ? "" : "s"}${streak > 0 ? " 🔥" : ""}`],
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

      {/* EARLY TESTER CTA — replaces fictional testimonials until real ones exist */}
      <section className="bg-gradient-to-br from-[#0E3B27]/40 to-[#0E100E] border border-[#1E6B48]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <Pill tone="accent">Early access</Pill>
          <p className="mt-3 text-lg font-semibold max-w-md">We're still testing RI$E — be one of the first to try it.</p>
          <p className="text-sm text-[#9AA39C] mt-1">No fake reviews here. Try a lesson and tell us what worked and what didn't — real feedback shapes what we build next.</p>
        </div>
        <button onClick={() => setTab("survey")} className="shrink-0 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm flex items-center gap-2">
          Give feedback <ChevronRight size={15} />
        </button>
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
  const [loading, setLoading] = useState(false);
  const [usedLiveAI, setUsedLiveAI] = useState(false);

  const speechSupported =
    typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const locale = SPEECH_LOCALE[lang] || "en-US";

  // Calls the Vercel serverless function at /api/ask-gemini, which securely
  // calls the Gemini API using the GEMINI_API_KEY environment variable.
  // Falls back to the local mock responses if the call fails (e.g. running
  // locally without the env var set, or if Gemini is temporarily down).
  const askGemini = async (q) => {
    const res = await fetch("/api/ask-gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, lang }),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    // Expected shape: { simple, urdu, like15, example }
    return data;
  };

  const ask = async (q) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setQuery("");
    setView(lang === "ur" ? "urdu" : "simple");

    try {
      const res = await askGemini(trimmed);
      setCurrent({ question: trimmed, ...res });
      setUsedLiveAI(true);
    } catch (err) {
      // Fallback: local mock response bank, for offline dev or if the API key isn't configured yet
      const key = trimmed.toLowerCase();
      const res = AI_RESPONSES[key] || DEFAULT_AI_RESPONSE;
      setCurrent({ question: trimmed, ...res });
      setUsedLiveAI(false);
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && query.trim() && ask(query)}
          placeholder={lang === "ur" ? "پیسے سے متعلق کچھ پوچھیں…" : "Ask something about money…"}
          dir={lang === "ur" ? "rtl" : "ltr"}
          className="flex-1 bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A] disabled:opacity-50"
        />
        <button
          onClick={startListening}
          disabled={loading}
          title="Ask by voice"
          className={`px-4 py-3 rounded-lg border transition-colors disabled:opacity-40 ${
            listening ? "border-[#00E28A] bg-[#0E3B27]/40 text-[#5CFFB0] animate-pulse" : "border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0]"
          }`}
        >
          <Mic size={16} />
        </button>
        <button
          onClick={() => query.trim() && ask(query)}
          disabled={loading}
          className="px-4 py-3 rounded-lg bg-[#00E28A] text-[#06110B] disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>

      {listening && <p className="text-xs text-[#5CFFB0] mb-4">Listening… speak your question now.</p>}
      {voiceNote && <p className="text-xs text-[#7C867E] mb-4">{voiceNote}</p>}

      <div className="flex flex-wrap gap-2 mb-8">
        {AI_QUICK_QUESTIONS.map((q) => (
          <button key={q} disabled={loading} onClick={() => ask(q)} className="text-xs px-3 py-1.5 rounded-full border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0] disabled:opacity-40">
            {q}
          </button>
        ))}
      </div>

      {loading && (
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5 flex items-center gap-3 text-sm text-[#9AA39C]">
          <Loader2 size={16} className="animate-spin text-[#5CFFB0]" /> Thinking…
        </div>
      )}

      {!loading && current && (
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-[#7C867E]">You asked</div>
            <Pill tone={usedLiveAI ? "accent" : "default"}>{usedLiveAI ? "Live Gemini" : "Offline sample"}</Pill>
          </div>
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

const CERTIFICATE_THRESHOLD = 20; // minimum challenges to unlock the certificate

function ChallengesPage({ userName, answers, setAnswers, onViewCertificate }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? CHALLENGES : CHALLENGES.filter((c) => c.difficulty === filter);
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.min(100, Math.round((answeredCount / CHALLENGES.length) * 100));
  const canGetCertificate = answeredCount >= CERTIFICATE_THRESHOLD;

  const diffTone = { easy: "default", medium: "accent", hard: "accent" };
  const diffLabel = { easy: "Easy", medium: "Medium", hard: "Hard" };

  return (
    <div className="max-w-2xl">
      <SectionLabel>Daily Challenges</SectionLabel>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Think fast. Learn faster.</h2>
          <p className="text-[#9AA39C]">
            {CHALLENGES.length} real-world scenarios across 3 difficulty tiers{userName ? `, ${userName}` : ""}. Takes seconds each.
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-6 bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
        <div className="flex justify-between items-center text-xs font-mono text-[#7C867E] mb-2">
          <span>PROGRESS</span>
          <span className="text-[#5CFFB0]">{answeredCount} / {CHALLENGES.length} answered</span>
        </div>
        <div className="h-2 rounded-full bg-[#1A1D19] overflow-hidden">
          <div className="h-full bg-[#00E28A] transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-[#7C867E]">
            {canGetCertificate
              ? "You've unlocked your completion certificate 🎉"
              : `Answer ${CERTIFICATE_THRESHOLD - answeredCount} more to unlock your certificate`}
          </p>
          <button
            onClick={onViewCertificate}
            disabled={!canGetCertificate}
            className="text-xs px-3 py-2 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Medal size={14} /> View certificate
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 mt-6 mb-6">
        {["all", "easy", "medium", "hard"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border capitalize ${
              filter === f ? "border-[#00E28A] bg-[#0E3B27]/30 text-[#5CFFB0]" : "border-[#1E211C] text-[#9AA39C]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((c) => {
          const ci = CHALLENGES.indexOf(c);
          const picked = answers[ci];
          return (
            <div key={ci} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="font-medium">{c.q}</p>
                <span className="shrink-0">
                  <Pill tone={diffTone[c.difficulty]}>{diffLabel[c.difficulty]}</Pill>
                </span>
              </div>
              <div className="space-y-2">
                {c.options.map((opt, oi) => {
                  const isPicked = picked === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => setAnswers((a) => ({ ...a, [ci]: oi }))}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm ${
                        isPicked ? "border-[#00E28A] bg-[#0E3B27]/30 text-[#5CFFB0]" : "border-[#1E211C] text-[#C9D1CB] hover:border-[#3A403C]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {picked !== undefined && (
                <div className="mt-3 text-sm text-[#9AA39C] bg-[#08090A] rounded-lg p-3 border border-[#1E211C]">
                  {c.options[picked].explain}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CERTIFICATE PAGE — canvas-rendered, downloadable as PNG            */
/* ------------------------------------------------------------------ */

function CertificatePage({ userName, answers, onBack }) {
  const canvasRef = useRef(null);
  const answeredCount = Object.keys(answers).length;
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    // background
    ctx.fillStyle = "#08090A";
    ctx.fillRect(0, 0, W, H);

    // border
    ctx.strokeStyle = "#00E28A";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.strokeStyle = "#1E6B48";
    ctx.lineWidth = 1;
    ctx.strokeRect(38, 38, W - 76, H - 76);

    // header
    ctx.textAlign = "center";
    ctx.fillStyle = "#5CFFB0";
    ctx.font = "bold 22px monospace";
    ctx.fillText("RI$E FINANCE", W / 2, 110);

    ctx.fillStyle = "#7C867E";
    ctx.font = "13px monospace";
    ctx.fillText("CERTIFICATE OF COMPLETION", W / 2, 140);

    ctx.fillStyle = "#F2F5F2";
    ctx.font = "16px sans-serif";
    ctx.fillText("This certifies that", W / 2, 210);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText(userName || "Your Name", W / 2, 270);

    ctx.fillStyle = "#C9D1CB";
    ctx.font = "16px sans-serif";
    ctx.fillText(`has completed ${answeredCount} financial literacy challenges`, W / 2, 320);
    ctx.fillText("as part of the RI$E Finance program", W / 2, 348);

    ctx.fillStyle = "#7C867E";
    ctx.font = "13px monospace";
    ctx.fillText(dateStr, W / 2, 410);

    ctx.fillStyle = "#5CFFB0";
    ctx.font = "12px monospace";
    ctx.fillText("rise-finance-rosy.vercel.app", W / 2, 440);

    ctx.strokeStyle = "#242822";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100, 470);
    ctx.lineTo(W / 2 + 100, 470);
    ctx.stroke();
    ctx.fillStyle = "#7C867E";
    ctx.font = "11px sans-serif";
    ctx.fillText("Rahul Kumar · Founder, RI$E Finance", W / 2, 488);
  }, [userName, answeredCount, dateStr]);

  const download = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `RISE-Finance-Certificate-${(userName || "student").replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-2xl">
      <button onClick={onBack} className="text-sm text-[#7C867E] hover:text-[#F2F5F2] mb-6">← Back to challenges</button>
      <SectionLabel>Certificate</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2">Your completion certificate</h2>
      <p className="text-[#9AA39C] mb-6">Download it and share it on LinkedIn or with your school.</p>

      <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-4 overflow-x-auto">
        <canvas ref={canvasRef} width={720} height={520} className="w-full h-auto rounded-lg" />
      </div>

      <div className="flex gap-3 mt-5">
        <button onClick={download} className="px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm flex items-center gap-2">
          <Download size={15} /> Download PNG
        </button>
      </div>

      <p className="text-xs text-[#7C867E] mt-4">
        Tip: on LinkedIn, add this under "Licenses & Certifications" as a self-directed project, or attach it to a post about your financial literacy work.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SURVEY PAGE                                                        */
/* ------------------------------------------------------------------ */

function SurveyPage({ onBack }) {
  const [form, setForm] = useState({ name: "", age: "", city: "", familiarity: "", feedback: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    try {
      const existing = JSON.parse(window.localStorage.getItem("rise-finance-surveys") || "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString() });
      window.localStorage.setItem("rise-finance-surveys", JSON.stringify(existing));
    } catch (e) {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl">
        <div className="bg-[#0E3B27]/30 border border-[#1E6B48]/40 rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h2 className="text-2xl font-black">Thank you!</h2>
          <p className="text-[#9AA39C] mt-2">Your feedback helps shape where RI$E Finance goes next.</p>
          <button onClick={onBack} className="mt-6 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <button onClick={onBack} className="text-sm text-[#7C867E] hover:text-[#F2F5F2] mb-6">← Back</button>
      <SectionLabel>Feedback</SectionLabel>
      <h2 className="text-3xl font-black tracking-tight mb-2">Help us improve RI$E</h2>
      <p className="text-[#9AA39C] mb-8">A quick 5-question survey — takes under a minute.</p>

      <div className="space-y-5">
        <Field label="Your name">
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A]" />
        </Field>
        <Field label="Age">
          <input value={form.age} onChange={(e) => update("age", e.target.value)} type="number" className="w-full bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A]" />
        </Field>
        <Field label="City">
          <input value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A]" />
        </Field>
        <Field label="Before using RI$E, how familiar were you with personal finance?">
          <div className="flex gap-2 flex-wrap">
            {["Not at all", "A little", "Somewhat", "Very"].map((opt) => (
              <button
                key={opt}
                onClick={() => update("familiarity", opt)}
                className={`text-xs px-3 py-2 rounded-full border ${form.familiarity === opt ? "border-[#00E28A] bg-[#0E3B27]/30 text-[#5CFFB0]" : "border-[#1E211C] text-[#9AA39C]"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Any feedback or feature requests?">
          <textarea value={form.feedback} onChange={(e) => update("feedback", e.target.value)} rows={4} className="w-full bg-[#0E100E] border border-[#1E211C] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00E28A] resize-none" />
        </Field>
      </div>

      <button
        onClick={submit}
        disabled={!form.name.trim()}
        className="mt-6 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Submit feedback
      </button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-[#5CFFB0] mb-2 block">{label}</label>
      {children}
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
          <Row label="Quiz average" value="—" />
          <Row label="Concepts learned" value={`${done * 3}`} />
        </div>
      </div>

      <div className="mt-8">
        <SectionLabel>Badges</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const earned = b.requiresModule ? completed.has(b.requiresModule) : false;
            return (
              <div key={b.id} className={`rounded-xl border p-4 text-center ${earned ? "border-[#1E6B48]/50 bg-[#0E3B27]/20" : "border-[#1A1D19] opacity-40"}`}>
                <div className="text-2xl">{b.icon}</div>
                <div className="text-xs mt-2 text-[#C9D1CB]">{b.label}</div>
                {earned && <Award size={12} className="text-[#5CFFB0] mx-auto mt-1" />}
              </div>
            );
          })}
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
        "Examines why financial literacy remains largely absent from Pakistani school curricula despite multiple policy initiatives, identifying five structural drivers — curricular gaps, socio-economic disparity, cultural silence around money, gender inequality, and limited program reach. The paper documents real consequences including reliance on informal lending and vulnerability to fraud, then proposes a three-tier reform strategy: curriculum integration, school-based financial practice, and embedded digital tools — including a conceptual framework for an AI-assisted financial decision aid that directly shaped this app.",
      topics: ["Financial literacy", "Youth finance", "Pakistan's financial ecosystem"],
      file: "/teen-financial-illiteracy-pakistan.pdf",
    },
    {
      title: "Stablecoins & the Rupee: How Digital Dollars Behave When a Currency Depreciates — A Pakistan Case Study",
      author: "Rahul Kumar",
      date: "August 2026",
      abstract:
        "Examines how stablecoins behave as the rupee depreciates, drawing on comparative evidence from Venezuela and India to show that stablecoin 'premiums' widen during both currency crises and regulatory supply shocks — functioning as a real-time gauge of liquidity access rather than pure sentiment. Applies this framework to Pakistan's emerging stablecoin and CBDC landscape, arguing the dominant use case is financial inclusion and remittance-cost reduction rather than speculation, and outlines policy implications for capturing those benefits safely.",
      topics: ["FinTech", "Stablecoins", "Digital currencies"],
      file: "/stablecoins-rupee-pakistan.pdf",
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
              <a
                href={p.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-2 rounded-lg border border-[#00E28A]/40 text-[#5CFFB0] hover:bg-[#0E3B27]/30 flex items-center gap-2"
              >
                Read Research <ArrowRight size={13} />
              </a>
              <a
                href={p.file}
                download
                className="text-xs px-3 py-2 rounded-lg border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A]/40 hover:text-[#5CFFB0] flex items-center gap-2"
              >
                Download PDF
              </a>
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
    </div>
  );
}
