import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Bot, PenLine, TrendingUp, ArrowRight, ChevronRight,
  PiggyBank, ShieldAlert, Landmark, HelpCircle,
} from "lucide-react";
import { Pill, SectionLabel } from "./AppPages";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] font-sans">
      <header className="sticky top-0 z-30 border-b border-[#1A1D19] bg-[#08090A]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <span className="text-xl font-black tracking-tight">
            RI<span className="text-[#00E28A]">$</span>E
            <span className="hidden sm:inline text-[10px] font-mono text-[#7C867E] tracking-widest uppercase ml-2">Finance</span>
          </span>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 rounded-lg text-sm text-[#C9D1CB] hover:text-[#F2F5F2]">Log in</Link>
            <Link to="/signup" className="px-4 py-2 rounded-lg bg-[#00E28A] text-[#06110B] text-sm font-semibold">Sign up free</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-24">
        {/* HERO */}
        <section className="pt-10 md:pt-16 pb-4">
          <div className="max-w-2xl mx-auto text-center">
            <Pill tone="accent">Built for Pakistani youth</Pill>
            <h1 className="mt-5 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Understand Money.
              <br />
              Build Your <span className="text-[#00E28A]">Future.</span>
            </h1>
            <p className="mt-5 text-[#9AA39C] text-lg max-w-md mx-auto">
              RI$E makes financial literacy simple, practical, and built for the next generation — in English, Urdu, and Roman Urdu.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/signup" className="px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm hover:bg-[#5CFFB0] transition-colors flex items-center gap-2">
                Create free account <ArrowRight size={15} />
              </Link>
              <Link to="/login" className="px-5 py-3 rounded-lg border border-[#242822] text-[#F2F5F2] font-semibold text-sm hover:border-[#00E28A] transition-colors">
                Log in
              </Link>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="max-w-2xl mx-auto">
          <SectionLabel>Why this exists</SectionLabel>
          <p className="text-2xl md:text-3xl font-bold leading-snug">
            Most Pakistani teens finish school without ever learning how to save, budget, or avoid debt.
          </p>
          <p className="text-[#9AA39C] mt-3">
            It's not taught in class, and most apps that try are either too complicated or built for adults abroad. RI$E is built from scratch for teens, in Pakistan, in plain language.
          </p>
        </section>

        {/* THE LOOP — this is the differentiation, made visible */}
        <section>
          <SectionLabel>Why not just use ChatGPT?</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
            An AI chatbot gives you an answer. RI$E gives you a path.
          </h2>
          <p className="text-[#9AA39C] mt-2 max-w-2xl">
            Ask any AI "what is inflation?" and you get one paragraph, once, with no memory of whether it actually landed. RI$E runs the same question through a loop built specifically to make it stick — with Pakistani examples, in your language, with something to track at the end.
          </p>
          <div className="mt-8 flex flex-col md:flex-row items-stretch gap-3">
            {[
              [BookOpen, "1. Learn", "A short lesson on the concept — PKR examples, not generic ones."],
              [Bot, "2. Ask the tutor", "Confused on something specific? Ask RI$E AI, in English or Urdu."],
              [PenLine, "3. Challenge", "Apply it to a real scenario — not just multiple choice trivia."],
              [TrendingUp, "4. Progress", "It's tracked — streaks, completions, a certificate at the end."],
            ].map(([Icon, title, body], i, arr) => (
              <React.Fragment key={title}>
                <div className="flex-1 bg-[#0E100E] border border-[#1E211C] rounded-xl p-5">
                  <Icon size={20} className="text-[#5CFFB0] mb-3" />
                  <div className="font-semibold">{title}</div>
                  <p className="text-sm text-[#9AA39C] mt-1">{body}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center text-[#3A403C]">
                    <ChevronRight size={18} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section>
          <SectionLabel>Why trust RI$E</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          </div>

          <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl p-6 md:p-8 max-w-2xl mb-6">
            <Pill tone="accent">Backed by research</Pill>
            <p className="mt-3 text-lg font-semibold">Not just an app — built on real research into why teen financial literacy in Pakistan is so low.</p>
            <p className="text-sm text-[#9AA39C] mt-1">That research shaped what RI$E teaches and how it teaches it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
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
          </div>

          <div className="max-w-2xl">
            <div className="space-y-3">
              {[
                ["Is RI$E free?", "Yes, completely free. No hidden costs, no premium tier."],
                ["Does it connect to my bank account?", "No. RI$E never touches real money or bank accounts — it's a learning space only."],
                ["Who is it for?", "Pakistani teens who want to understand money before they're handling real income."],
              ].map(([q, a]) => (
                <div key={q} className="p-4 rounded-xl border border-[#1E211C] flex gap-3">
                  <HelpCircle size={18} className="text-[#5CFFB0] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{q}</div>
                    <p className="text-sm text-[#9AA39C] mt-1">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-gradient-to-br from-[#0E3B27]/40 to-[#0E100E] border border-[#1E6B48]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <Pill tone="accent">Early access</Pill>
            <p className="mt-3 text-lg font-semibold max-w-md">We're still testing RI$E — be one of the first to try it.</p>
            <p className="text-sm text-[#9AA39C] mt-1">Create a free account and start with your first module today.</p>
          </div>
          <Link to="/signup" className="shrink-0 px-5 py-3 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm flex items-center gap-2">
            Sign up free <ChevronRight size={15} />
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#1A1D19] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-xs text-[#7C867E] font-mono">MVP v0.3</div>
      </footer>
    </div>
  );
}
