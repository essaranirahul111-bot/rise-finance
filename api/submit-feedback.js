export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, age, city, familiarity, feedback } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (name.length > 200 || (feedback && feedback.length > 2000)) {
    return res.status(400).json({ error: 'Input too long' });
  }

  const submission = {
    name: name.trim(),
    age: age || null,
    city: city || null,
    familiarity: familiarity || null,
    feedback: feedback || null,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(process.env.KV_REST_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['LPUSH', 'feedback:submissions', JSON.stringify(submission)]),
    });

    if (!response.ok) throw new Error('Redis write failed');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('submit-feedback error:', err);
    return res.status(500).json({ error: 'Failed to save feedback' });
  }
}
