export default async function handler(req, res) {
  const secret = req.query.secret || req.headers['x-admin-secret'];
  if (secret !== process.env.FEEDBACK_ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(process.env.KV_REST_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['LRANGE', 'feedback:submissions', '0', '-1']),
    });

    const data = await response.json();
    const submissions = (data.result || []).map((s) => JSON.parse(s));
    return res.status(200).json({ submissions });
  } catch (err) {
    console.error('get-feedback error:', err);
    return res.status(500).json({ error: 'Failed to fetch feedback' });
  }
}
