import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Bot, PenLine, TrendingUp, Flame, ChevronRight, CheckCircle2, Circle, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { MODULES, CHALLENGES, CERTIFICATE_THRESHOLD, Pill, SectionLabel } from "./AppPages";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { completed, challengeAnswers, streak } = useProgress();

  const doneCount = completed.size;
  const totalModules = MODULES.length;
  const nextModule = MODULES.find((m) => m.built && !completed.has(m.id)) || null;
  const answeredCount = Object.keys(challengeAnswers).length;
  const firstName = (profile?.name || "there").split(" ")[0];

  return (
    <div className="space-y-12">
      {/* GREETING */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <SectionLabel>Your dashboard</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Welcome back, {firstName}.</h1>
          <p className="text-[#9AA39C] mt-2">
            {doneCount === 0
              ? "Let's start with your first module."
              : `You've completed ${doneCount}/${totalModules} modules. Keep going.`}
          </p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-[#0E3B27]/30 border border-[#1E6B48]/40 rounded-full px-4 py-2 shrink-0">
            <Flame size={16} className="text-[#5CFFB0]" />
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>
        )}
      </section>

      {/* CONTINUE — next best action */}
      {nextModule && (
        <section
          onClick={() => navigate(`/learn/${nextModule.id}`)}
          className="cursor-pointer bg-gradient-to-br from-[#0E3B27]/30 to-[#0E100E] border border-[#1E6B48]/40 rounded-2xl p-6 flex items-center justify-between gap-4 hover:border-[#00E28A]/60 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">{nextModule.icon}</span>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-1">Continue learning</div>
              <div className="font-semibold text-lg">{nextModule.title}</div>
              <p className="text-sm text-[#9AA39C]">{nextModule.desc}</p>
            </div>
          </div>
          <ChevronRight className="text-[#5CFFB0] shrink-0" />
        </section>
      )}

      {/* THE LOOP — Learn -> Tutor -> Challenge -> Progress, as the actual product structure */}
      <section>
        <SectionLabel>Your RI$E features</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4">
          <FeatureCard
            icon={BookOpen}
            title="Learn"
            stat={`${doneCount}/${totalModules} modules done`}
            desc="Short lessons, zero jargon, PKR examples throughout."
            onClick={() => navigate("/learn")}
          />
          <FeatureCard
            icon={Bot}
            title="RI$E AI Tutor"
            stat="Ask anything, anytime"
            desc="A conversational tutor for follow-up questions — in English or Urdu."
            onClick={() => navigate("/ai")}
          />
          <FeatureCard
            icon={PenLine}
            title="Challenges"
            stat={`${answeredCount}/${CHALLENGES.length} answered`}
            desc="Apply what you learned to real PKR scenarios."
            onClick={() => navigate("/challenges")}
          />
          <FeatureCard
            icon={TrendingUp}
            title="Progress"
            stat={answeredCount >= CERTIFICATE_THRESHOLD ? "Certificate unlocked" : `${streak}-day streak`}
            desc="Track your streak, modules, and completion certificate."
            onClick={() => navigate("/progress")}
          />
        </div>
      </section>

      {/* MODULE PATH — makes the structured curriculum visible, not just a features grid */}
      <section>
        <SectionLabel>Your learning path</SectionLabel>
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl divide-y divide-[#1A1D19]">
          {MODULES.map((m) => {
            const isDone = completed.has(m.id);
            return (
              <button
                key={m.id}
                disabled={!m.built}
                onClick={() => m.built && navigate(`/learn/${m.id}`)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                  m.built ? "hover:bg-[#141712] cursor-pointer" : "opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="text-lg shrink-0">{m.icon}</span>
                <span className="flex-1 text-sm font-medium">{m.title}</span>
                {!m.built ? (
                  <Lock size={15} className="text-[#3A403C]" />
                ) : isDone ? (
                  <CheckCircle2 size={15} className="text-[#5CFFB0]" />
                ) : (
                  <Circle size={15} className="text-[#3A403C]" />
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, stat, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-[#0E100E] border border-[#1E211C] rounded-xl p-5 hover:border-[#00E28A]/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <Icon size={20} className="text-[#5CFFB0]" />
        <Pill tone="accent">{stat}</Pill>
      </div>
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-[#9AA39C] mt-1">{desc}</p>
    </button>
  );
}
