import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password needs to be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { data, error } = await signUp(email.trim(), password, name.trim() || "RI$E Learner");
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data?.session) {
      navigate("/dashboard", { replace: true });
    } else {
      // Email confirmation is on for this Supabase project
      setCheckEmail(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-2xl font-black tracking-tight">
            RI<span className="text-[#00E28A]">$</span>E
          </span>
        </Link>

        {checkEmail ? (
          <div className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-6 text-center">
            <p className="font-semibold mb-2">Check your email</p>
            <p className="text-sm text-[#9AA39C]">We sent a confirmation link to {email}. Confirm it, then log in.</p>
            <Link to="/login" className="inline-block mt-4 text-sm text-[#5CFFB0] hover:underline">Go to login →</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-6 space-y-4">
            <h1 className="text-xl font-bold mb-1">Create your account</h1>
            <p className="text-sm text-[#9AA39C] mb-4">Free, forever. No bank details, ever.</p>

            <div>
              <label className="block text-xs text-[#7C867E] mb-1.5">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ahmed"
                className="w-full bg-[#08090A] border border-[#1E211C] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00E28A]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#7C867E] mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#08090A] border border-[#1E211C] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00E28A]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#7C867E] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#08090A] border border-[#1E211C] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00E28A]"
              />
            </div>

            {error && <p className="text-sm text-[#FF7CA3]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>

            <p className="text-sm text-[#7C867E] text-center pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#5CFFB0] hover:underline">Log in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
