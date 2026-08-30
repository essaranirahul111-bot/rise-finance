// Vercel Serverless Function — /api/ask-gemini
//
// Securely calls the Google Gemini API using the GEMINI_API_KEY environment
// variable (set in Vercel → Settings → Environment Variables). The key is
// never exposed to the browser — this function runs server-side only.
//
// Security hardening added:
//  - Origin lock: only requests from allowed origins are served
//  - Rate limiting: per-IP sliding window (in-memory; resets on cold start —
//    good enough at current traffic, upgrade to Vercel KV/Upstash if this
//    function ever runs across many concurrent instances)
//  - Input validation: rejects empty / oversized / non-string payloads
//
// Request body:  { question: string, lang: "en" | "ur" | "roman" }
// Response body: { simple: string, urdu: string, like15: string, example: string }

// ---- Config ----
const ALLOWED_ORIGINS = [
  "https://risefinance.money",
  "https://www.risefinance.money",
  "https://rise-finance-rosy.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];
const MAX_QUESTION_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // per IP per window

// ---- In-memory rate limit store (per function instance) ----
// NOTE: this resets whenever Vercel spins up a new instance (cold start),
// and isn't shared across instances. It stops casual abuse/bill-runaway
// today; for real scale, swap this for Vercel KV or Upstash Redis.
const rateLimitStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  return false;
}

// Periodically clean up old entries so the Map doesn't grow forever
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 5) {
      rateLimitStore.delete(ip);
    }
  }
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function isAllowedOrigin(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export default async function handler(req, res) {
  // --- CORS / origin lock ---
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Reject requests from origins not on the allowlist (blocks other sites
  // from calling this endpoint using your API key/quota). Allow requests
  // with no Origin header (e.g. curl/server-to-server/local testing) to
  // pass through — tighten this further if you don't need that.
  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  // --- Rate limiting ---
  cleanupRateLimitStore();
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too many requests. Please slow down and try again in a minute." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
  }

  // --- Input validation ---
  const { question } = req.body || {};
  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "A 'question' string is required" });
  }
  const trimmedQuestion = question.trim();
  if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({
      error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).`,
    });
  }

  const systemPrompt = `You are RI$E AI, a friendly financial-literacy tutor for Pakistani teenagers using the RI$E Finance app.
Rules:
- Never give specific investment, stock, or crypto recommendations. Explain concepts only.
- Always use PKR (Rs.) in examples, grounded in everyday Pakistani life (chai, biryani, Easypaisa/JazzCash, etc).
- Keep each field concise: 2-4 sentences.
- Respond ONLY with valid JSON, no markdown fences, no preamble, matching exactly this shape:
{"simple": "...", "urdu": "... (in Urdu script) ...", "like15": "... (explained casually, like to a 15 year old, with an analogy) ...", "example": "... (one concrete PKR example) ..."}`;

  const userPrompt = `The student's question is: "${trimmedQuestion}"`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1500,
            responseMimeType: "application/json",
            thinkingConfig: {
              thinkingLevel: "minimal",
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ error: "Gemini API request failed" });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: "Gemini returned an empty response" });
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", rawText);
      return res.status(502).json({ error: "Gemini returned malformed JSON" });
    }

    const { simple, urdu, like15, example } = parsed;
    if (!simple || !urdu || !like15 || !example) {
      return res.status(502).json({ error: "Gemini response missing expected fields" });
    }

    return res.status(200).json({ simple, urdu, like15, example });
  } catch (err) {
    console.error("ask-gemini handler error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}