import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate(from, { replace: true });
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const { error } = await signInWithGoogle();
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
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

        <form onSubmit={handleSubmit} className="bg-[#0E100E] border border-[#1E211C] rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-[#9AA39C] mb-4">Log in to pick up where you left off.</p>

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
              placeholder="••••••••"
              className="w-full bg-[#08090A] border border-[#1E211C] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00E28A]"
            />
          </div>

          {error && <p className="text-sm text-[#FF7CA3]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#00E28A] text-[#06110B] font-semibold text-sm disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1E211C]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#0E100E] text-[#7C867E]">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#1E211C] border border-[#2A2E28] text-[#F2F5F2] font-semibold text-sm hover:bg-[#2A2E28] disabled:opacity-50 transition"
          >
            Sign in with Google
          </button>

          <p className="text-sm text-[#7C867E] text-center pt-2">
            New to RI$E?{" "}
            <Link to="/signup" className="text-[#5CFFB0] hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
