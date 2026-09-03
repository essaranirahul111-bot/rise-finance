import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const ProgressContext = createContext(null);

function cacheKey(userId) {
  return `rise-finance-progress-cache-${userId}`;
}

function computeStreak(visitLog) {
  const dateSet = new Set(visitLog);
  let count = 0;
  let cursor = new Date();
  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [completed, setCompletedState] = useState(new Set());
  const [challengeAnswers, setChallengeAnswersState] = useState({});
  const [streak, setStreak] = useState(0);
  const [ready, setReady] = useState(false);

  // Load progress whenever the logged-in user changes.
  useEffect(() => {
    if (!user) {
      setCompletedState(new Set());
      setChallengeAnswersState({});
      setStreak(0);
      setReady(false);
      return;
    }

    let cancelled = false;

    // 1. Paint instantly from the local cache so the dashboard doesn't flash empty.
    try {
      const cached = JSON.parse(window.localStorage.getItem(cacheKey(user.id)) || "null");
      if (cached) {
        setCompletedState(new Set(cached.completed_modules || []));
        setChallengeAnswersState(cached.challenge_answers || {});
        setStreak(computeStreak(cached.visit_log || []));
      }
    } catch (e) { /* ignore corrupt cache */ }

    // 2. Fetch the real row from Supabase, creating one + logging today's visit.
    (async () => {
      const today = new Date().toISOString().slice(0, 10);
      let { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (!data) {
        const fresh = {
          user_id: user.id,
          completed_modules: [],
          challenge_answers: {},
          visit_log: [today],
        };
        await supabase.from("user_progress").insert(fresh);
        data = fresh;
      } else if (!(data.visit_log || []).includes(today)) {
        const visit_log = [...(data.visit_log || []), today];
        await supabase.from("user_progress").update({ visit_log }).eq("user_id", user.id);
        data = { ...data, visit_log };
      }

      if (cancelled) return;

      setCompletedState(new Set(data.completed_modules || []));
      setChallengeAnswersState(data.challenge_answers || {});
      setStreak(computeStreak(data.visit_log || []));
      setReady(true);
      window.localStorage.setItem(cacheKey(user.id), JSON.stringify(data));
    })();

    return () => { cancelled = true; };
  }, [user?.id]);

  const persist = useCallback((patch) => {
    if (!user) return;
    supabase.from("user_progress").update(patch).eq("user_id", user.id).then(({ error }) => {
      if (error) console.error("Failed to save progress:", error);
    });
    try {
      const cached = JSON.parse(window.localStorage.getItem(cacheKey(user.id)) || "{}");
      window.localStorage.setItem(cacheKey(user.id), JSON.stringify({ ...cached, ...patch }));
    } catch (e) { /* ignore */ }
  }, [user?.id]);

  const completeModule = useCallback((moduleId) => {
    setCompletedState((prev) => {
      if (prev.has(moduleId)) return prev;
      const next = new Set(prev).add(moduleId);
      persist({ completed_modules: [...next] });
      return next;
    });
  }, [persist]);

  const setChallengeAnswers = useCallback((updater) => {
    setChallengeAnswersState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      persist({ challenge_answers: next });
      return next;
    });
  }, [persist]);

  const value = { completed, challengeAnswers, setChallengeAnswers, completeModule, streak, ready };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
