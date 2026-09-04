import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Bot, PenLine, TrendingUp, Flame, ChevronRight, ChevronDown, CheckCircle2, Circle, Lock, Sparkles, Target } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { MODULES, CHALLENGES, CERTIFICATE_THRESHOLD, Pill, SectionLabel } from "./AppPages";

const VISIBLE_MODULES = 5;

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { completed, challengeAnswers, streak } = useProgress();
  const [showAllModules, setShowAllModules] = useState(false);

  const doneCount = completed.size;
  const totalModules = MODULES.length;
  const nextModule = MODULES.find((m) => m.built && !completed.has(m.id)) || null;
  const nextModuleIndex = nextModule ? MODULES.findIndex((m) => m.id === nextModule.id) : -1;
  const answeredCount = Object.keys(challengeAnswers).length;
  const firstName = (profile?.name || "there").split(" ")[0];

  const behindOnChallenges = doneCount > 0 && answeredCount < doneCount;
  let todaysAction;
  if (behindOnChallenges) {
    todaysAction = {
      icon: Target,
      label: "Test what you learned",
      copy: `You've finished ${doneCount} module${doneCount === 1 ? "" : "s"} — put it into practice with a real scenario.`,
      cta: "Take a challenge",
      onClick: () => navigate("/challenges"),
    };
  } else if (doneCount === 0) {
    todaysAction = {
      icon: Sparkles,
      label: "Not sure where to start?",
      copy: "Ask RI$E AI to explain any money topic before you dive into a lesson.",
      cta: "Ask RI$E AI",
      onClick: () => navigate("/ai"),
    };
  } else {
    todaysAction = {
      icon: Sparkles,
      label: "Confused about something?",
      copy: "You're caught up on challenges. Ask RI$E AI a follow-up question, or keep going below.",
      cta: "Ask RI$E AI",
      onClick: () => navigate("/ai"),
    };
  }

  const visibleModules = showAllModules ? MODULES : MODULES.slice(0, VISIBLE_MODULES);
  const loopStage = doneCount === 0 ? "learn" : behindOnChallenges ? "challenge" : answeredCount > 0 ? "progress" : "ai";

  return (
    <div className="space-y-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <SectionLabel>Your dashboard</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Welcome back, {firstName}.</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <StatChip label="Modules" value={`${doneCount}/${totalModules}`} />
          <StatChip label="Challenges" value={`${answeredCount}/${CHALLENGES.length}`} />
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-[#0E3B27]/30 border border-[#1E6B48]/40 rounded-full px-3 py-1.5">
              <Flame size={14} className="text-[#5CFFB0]" />
              <span className="text-xs font-semibold">{streak}d streak</span>
            </div>
          )}
        </div>
      </section>

      {nextModule ? (
        <section
          onClick={() => navigate(`/learn/${nextModule.id}`)}
          className="cursor-pointer bg-gradient-to-br from-[#0E3B27]/30 to-[#0E100E] border border-[#1E6B48]/40 rounded-2xl p-6 hover:border-[#00E28A]/60 transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="text-3xl shrink-0">{nextModule.icon}</span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#5CFFB0] mb-1">
                  Continue learning · Module {nextModuleIndex + 1} of {totalModules}
                </div>
                <div className="font-semibold text-lg truncate">{nextModule.title}</div>
                <p className="text-sm text-[#9AA39C] mt-0.5">{nextModule.desc}</p>
              </div>
            </div>
            <ChevronRight className="text-[#5CFFB0] shrink-0" />
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-[#1A1D19] overflow-hidden">
            <div
              className="h-full bg-[#00E28A] rounded-full transition-all"
              style={{ width: `${(doneCount / totalModules) * 100}%` }}
            />
          </div>
        </section>
      ) : (
        <section className="bg-[#0E100E] border border-[#1E211C] rounded-2xl p-6 text-center">
          <p className="font-semibold">You've completed every available module 🎉</p>
          <p className="text-sm text-[#9AA39C] mt-1">More advanced modules are on the way — keep your streak going with challenges and RI$E AI.</p>
        </section>
      )}

      <section
        onClick={todaysAction.onClick}
        className="cursor-pointer bg-[#0E100E] border border-[#1E211C] rounded-xl p-5 flex items-center justify-between gap-4 hover:border-[#00E28A]/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#0E3B27]/40 flex items-center justify-center shrink-0">
            <todaysAction.icon size={16} className="text-[#5CFFB0]" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#7C867E] mb-0.5">Today</div>
            <div className="font-semibold text-sm">{todaysAction.label}</div>
            <p className="text-xs text-[#9AA39C] mt-0.5">{todaysAction.copy}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#5CFFB0] shrink-0">
          {todaysAction.cta} <ChevronRight size={14} />
        </span>
      </section>

      <section>
        <SectionLabel>Your RI$E journey</SectionLabel>
        <div className="grid md:grid-cols-4 gap-3">
          <LoopStage
            icon={BookOpen}
            title="Learn"
            stat={`${doneCount}/${totalModules} done`}
            desc={nextModule ? `Next: ${nextModule.title}` : "All caught up"}
            active={loopStage === "learn"}
            onClick={() => navigate("/learn")}
          />
          <LoopStage
            icon={Bot}
            title="RI$E AI"
            stat="Ask anytime"
            desc="Get unstuck on anything you just learned."
            active={loopStage === "ai"}
            onClick={() => navigate("/ai")}
          />
          <LoopStage
            icon={PenLine}
            title="Challenges"
            stat={`${answeredCount}/${CHALLENGES.length} done`}
            desc={behindOnChallenges ? "Test your last lesson" : "Apply what you know"}
            active={loopStage === "challenge"}
            onClick={() => navigate("/challenges")}
          />
          <LoopStage
            icon={TrendingUp}
            title="Progress"
            stat={answeredCount >= CERTIFICATE_THRESHOLD ? "Certificate unlocked" : `${streak}-day streak`}
            desc="See how far you've come."
            active={loopStage === "progress"}
            onClick={() => navigate("/progress")}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Your learning path</SectionLabel>
          {MODULES.length > VISIBLE_MODULES && (
            <button
              onClick={() => setShowAllModules((v) => !v)}
              className="flex items-center gap-1 text-xs text-[#9AA39C] hover:text-[#5CFFB0]"
            >
              {showAllModules ? "Show less" : `See all ${MODULES.length}`}
              <ChevronDown size={12} className={`transition-transform ${showAllModules ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl divide-y divide-[#1A1D19]">
          {visibleModules.map((m) => {
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

function StatChip({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-[#0E100E] border border-[#1E211C] rounded-lg px-3 py-1.5">
      <span className="text-sm font-bold leading-none">{value}</span>
      <span className="text-[9px] font-mono uppercase tracking-widest text-[#7C867E] mt-1">{label}</span>
    </div>
  );
}

function LoopStage({ icon: Icon, title, stat, desc, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl p-4 border transition-colors ${
        active
          ? "bg-[#0E3B27]/20 border-[#00E28A]/50"
          : "bg-[#0E100E] border-[#1E211C] hover:border-[#00E28A]/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon size={18} className={active ? "text-[#5CFFB0]" : "text-[#7C867E]"} />
        <Pill tone="accent">{stat}</Pill>
      </div>
      <div className="font-semibold text-sm">{title}</div>
      <p className="text-xs text-[#9AA39C] mt-1">{desc}</p>
    </button>
  );
}
