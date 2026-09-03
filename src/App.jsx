import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminFeedback from "./pages/AdminFeedback";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProgressProvider, useProgress } from "./context/ProgressContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import LearnRoute from "./pages/LearnRoute";
import AiTutorChat from "./pages/AiTutorChat";

import {
  ChallengesPage, CertificatePage, ProgressPage, SurveyPage, ResearchPage, AboutPage,
} from "./pages/AppPages";

// Thin wrappers that connect the existing (unmodified) page components to
// routing + the new auth/progress contexts, instead of App-level prop drilling.

function ChallengesRoute() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { challengeAnswers, setChallengeAnswers } = useProgress();
  return (
    <ChallengesPage
      userName={profile?.name}
      answers={challengeAnswers}
      setAnswers={setChallengeAnswers}
      onViewCertificate={() => navigate("/certificate")}
    />
  );
}

function CertificateRoute() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { challengeAnswers } = useProgress();
  return <CertificatePage userName={profile?.name} answers={challengeAnswers} onBack={() => navigate("/challenges")} />;
}

function ProgressRoute() {
  const { completed, streak } = useProgress();
  return <ProgressPage completed={completed} streak={streak} />;
}

function SurveyRoute() {
  const navigate = useNavigate();
  return <SurveyPage onBack={() => navigate("/dashboard")} />;
}

function AppRoutes() {
  const [lang, setLang] = useState("en");
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#08090A] flex items-center justify-center text-[#7C867E] text-sm font-mono">
        Loading…
      </div>
    );
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      <Route path="/admin-feedback" element={<AdminFeedback />} />

      {/* Everything below requires an account */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <ProgressProvider>
              <AppShell lang={lang} setLang={setLang}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/learn" element={<LearnRoute lang={lang} />} />
                  <Route path="/learn/:moduleId" element={<LearnRoute lang={lang} />} />
                  <Route path="/ai" element={<AiTutorChat lang={lang} />} />
                  <Route path="/challenges" element={<ChallengesRoute />} />
                  <Route path="/certificate" element={<CertificateRoute />} />
                  <Route path="/progress" element={<ProgressRoute />} />
                  <Route path="/survey" element={<SurveyRoute />} />
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppShell>
            </ProgressProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
