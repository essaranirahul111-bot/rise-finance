// Vercel Serverless Function — /api/ask-gemini
//
// Securely calls the Google Gemini API using the GEMINI_API_KEY environment
// variable (set in Vercel → Settings → Environment Variables). The key is
// never exposed to the browser — this function runs server-side only.
//
// Request body:  { question: string, lang: "en" | "ur" | "roman" }
// Response body: { simple: string, urdu: string, like15: string, example: string }

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
  }

  const { question } = req.body || {};
  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "A 'question' string is required" });
  }

  const systemPrompt = `You are RI$E AI, a friendly financial-literacy tutor for Pakistani teenagers using the RI$E Finance app.
Rules:
- Never give specific investment, stock, or crypto recommendations. Explain concepts only.
- Always use PKR (Rs.) in examples, grounded in everyday Pakistani life (chai, biryani, Easypaisa/JazzCash, etc).
- Keep each field concise: 2-4 sentences.
- Respond ONLY with valid JSON, no markdown fences, no preamble, matching exactly this shape:
{"simple": "...", "urdu": "... (in Urdu script) ...", "like15": "... (explained casually, like to a 15 year old, with an analogy) ...", "example": "... (one concrete PKR example) ..."}`;

  const userPrompt = `The student's question is: "${question.trim()}"`;

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
