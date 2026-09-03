import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Bot, Send, Mic, Volume2, Loader2, ShieldAlert, User } from "lucide-react";
import { SectionLabel, AI_QUICK_QUESTIONS, AI_RESPONSES, DEFAULT_AI_RESPONSE, SPEECH_LOCALE } from "./AppPages";
import { useAuth } from "../context/AuthContext";

// Each message: { id, role: 'user' | 'tutor', question?, simple, urdu, like15, example, followups, view }

export default function AiTutorChat({ lang }) {
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  const topic = searchParams.get("topic");

  const [messages, setMessages] = useState(() =>
    topic
      ? []
      : [{
          id: "welcome",
          role: "tutor",
          simple: `Hi ${profile?.name ? profile.name.split(" ")[0] : "there"} 👋 I'm your RI$E tutor. Ask me anything about money — inflation, saving, investing, digital finance, whatever's on your mind.`,
          view: "simple",
          followups: [],
        }]
  );
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");
  const scrollRef = useRef(null);

  const speechSupported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const locale = SPEECH_LOCALE[lang] || "en-US";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Deep-linked from a Learn module — greet with a topic-aware opener and
  // immediately ask the first real question so the loop feels continuous.
  useEffect(() => {
    if (topic) {
      ask(`Can you tell me more about ${topic}?`, topic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const askGemini = async (q, topicHint) => {
    const history = messages
      .filter((m) => m.role === "tutor" && m.question)
      .map((m) => ({ question: m.question, simple: m.simple }));
    const res = await fetch("/api/ask-gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, lang, history, topic: topicHint }),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  };

  const ask = async (q, topicHint) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery("");
    setLoading(true);

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);

    let result;
    try {
      result = { ...(await askGemini(trimmed, topicHint)) };
    } catch (err) {
      const key = trimmed.toLowerCase();
      result = AI_RESPONSES[key] || DEFAULT_AI_RESPONSE;
      result.followups = result.followups || [];
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        role: "tutor",
        question: trimmed,
        view: lang === "ur" ? "urdu" : "simple",
        ...result,
      },
    ]);
    setLoading(false);
  };

  const setMessageView = (id, view) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, view } : m)));
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
    <div className="max-w-2xl mx-auto flex flex-col" style={{ minHeight: "70vh" }}>
      <SectionLabel>RI$E AI Tutor</SectionLabel>
      <div className="flex items-center gap-2 mb-1">
        <Bot className="text-[#5CFFB0]" size={22} />
        <h2 className="text-2xl font-black tracking-tight">Your personal finance tutor</h2>
      </div>
      <p className="text-xs text-[#7C867E] mb-6">
        Educational only, not financial advice — always double-check important decisions with a trusted adult.
      </p>

      {/* CHAT THREAD */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1" style={{ maxHeight: "55vh" }}>
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] bg-[#0E3B27]/50 border border-[#1E6B48]/40 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm flex items-start gap-2">
                <span>{m.text}</span>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[85%] flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#0E3B27] flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-[#5CFFB0]" />
                </div>
                <div className="bg-[#0E100E] border border-[#1E211C] rounded-2xl rounded-tl-sm p-4">
                  {m.simple !== undefined && (
                    <>
                      <div className="flex gap-2 mb-3">
                        {[["simple", "Simple"], ["urdu", "Urdu"], ["like15", "Explain like I'm 15"]].map(([k, label]) => (
                          <button
                            key={k}
                            onClick={() => setMessageView(m.id, k)}
                            className={`text-[11px] px-2.5 py-1 rounded-full border ${
                              m.view === k ? "border-[#00E28A] text-[#5CFFB0] bg-[#0E3B27]/30" : "border-[#1E211C] text-[#9AA39C]"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-[#C9D1CB] leading-relaxed" dir={m.view === "urdu" ? "rtl" : "ltr"}>
                          {m[m.view]}
                        </p>
                        {ttsSupported && (
                          <button
                            onClick={() => speak(m[m.view], m.view === "urdu" ? "ur" : lang)}
                            className="shrink-0 p-1.5 rounded-lg border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0]"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                      {m.example && (
                        <div className="mt-3 pt-3 border-t border-dashed border-[#242822] text-xs text-[#9AA39C]">
                          <span className="text-[#5CFFB0] font-mono uppercase tracking-widest text-[10px]">Example — </span>
                          {m.example}
                        </div>
                      )}
                      {m.followups && m.followups.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.followups.map((f) => (
                            <button
                              key={f}
                              disabled={loading}
                              onClick={() => ask(f)}
                              className="text-[11px] px-2.5 py-1 rounded-full border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0] disabled:opacity-40"
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex gap-2.5 items-center text-sm text-[#9AA39C] pl-9">
            <Loader2 size={14} className="animate-spin text-[#5CFFB0]" /> Your tutor is thinking…
          </div>
        )}
      </div>

      {/* STARTER PROMPTS (only before the conversation gets going) */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 my-4">
          {AI_QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              disabled={loading}
              onClick={() => ask(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#1E211C] text-[#9AA39C] hover:border-[#00E28A] hover:text-[#5CFFB0] disabled:opacity-40"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {listening && <p className="text-xs text-[#5CFFB0] mt-3">Listening… speak your question now.</p>}
      {voiceNote && <p className="text-xs text-[#7C867E] mt-3">{voiceNote}</p>}

      {/* COMPOSER */}
      <div className="flex gap-2 mt-4 sticky bottom-0 bg-[#08090A] pt-2">
        <input
          value={query}
          disabled={loading}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && query.trim() && ask(query)}
          placeholder={lang === "ur" ? "پیسے سے متعلق کچھ پوچھیں…" : "Ask your tutor something…"}
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
      <div className="mt-3 flex items-start gap-2 text-xs text-[#7C867E] bg-[#08090A] border border-[#1A1D19] rounded-lg p-3">
        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
        RI$E AI is an educational tutor, not a financial adviser — it won't recommend specific stocks, crypto, or products.
      </div>
    </div>
  );
}
