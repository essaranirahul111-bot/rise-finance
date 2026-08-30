import { useState } from "react";

export default function AdminFeedback() {
  const [secret, setSecret] = useState("");
  const [submissions, setSubmissions] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/get-feedback?secret=${encodeURIComponent(secret)}`);
      if (!res.ok) throw new Error("Unauthorized or server error");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (e) {
      setError("Failed to load. Check your secret and try again.");
    }
    setLoading(false);
  };

  if (!submissions) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "monospace", color: "#F2F5F2" }}>
        <h2 style={{ marginBottom: 16 }}>Admin: Feedback</h2>
        <input
          type="password"
          placeholder="Enter admin secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 12, background: "#0E100E", border: "1px solid #1E211C", color: "#F2F5F2" }}
        />
        <button onClick={load} disabled={loading} style={{ padding: "10px 16px", background: "#00E28A", border: "none", borderRadius: 6, fontWeight: 600 }}>
          {loading ? "Loading..." : "View Feedback"}
        </button>
        {error && <p style={{ color: "#ff6b6b", marginTop: 12 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "monospace", color: "#F2F5F2" }}>
      <h2 style={{ marginBottom: 16 }}>Feedback Submissions ({submissions.length})</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1E211C", textAlign: "left" }}>
            <th style={{ padding: 8 }}>Date</th>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Age</th>
            <th style={{ padding: 8 }}>City</th>
            <th style={{ padding: 8 }}>Familiarity</th>
            <th style={{ padding: 8 }}>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1E211C" }}>
              <td style={{ padding: 8, fontSize: 12, color: "#9AA39C" }}>{new Date(s.submittedAt).toLocaleString()}</td>
              <td style={{ padding: 8 }}>{s.name}</td>
              <td style={{ padding: 8 }}>{s.age || "-"}</td>
              <td style={{ padding: 8 }}>{s.city || "-"}</td>
              <td style={{ padding: 8 }}>{s.familiarity || "-"}</td>
              <td style={{ padding: 8, maxWidth: 300 }}>{s.feedback || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
