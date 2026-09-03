import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { MODULES, LearnPage, ModulePage } from "./AppPages";

const DIFFICULTY_TO_CHALLENGE_TIER = { Beginner: "easy", Intermediate: "medium", Advanced: "hard" };

export default function LearnRoute({ lang }) {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { completed, completeModule } = useProgress();

  const mod = MODULES.find((m) => m.id === moduleId);

  if (!moduleId) {
    return <LearnPage completed={completed} onOpen={(id) => navigate(`/learn/${id}`)} />;
  }

  if (!mod) {
    navigate("/learn", { replace: true });
    return null;
  }

  return (
    <ModulePage
      mod={mod}
      lang={lang}
      completed={completed.has(mod.id)}
      onComplete={() => completeModule(mod.id)}
      onBack={() => navigate("/learn")}
      onAskTutor={() => navigate(`/ai?topic=${encodeURIComponent(mod.title)}`)}
      onGoToChallenges={() => navigate("/challenges")}
      relatedChallengeDifficulty={DIFFICULTY_TO_CHALLENGE_TIER[mod.difficulty]}
    />
  );
}
