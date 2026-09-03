import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, Bot, Trophy, TrendingUp, Info, Landmark, ClipboardList, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LangToggle } from "../pages/AppPages";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/ai", label: "AI Tutor", icon: Bot },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/research", label: "Research", icon: Landmark },
  { to: "/about", label: "About", icon: Info },
];

function linkClasses(isActive, mobile) {
  if (mobile) {
    return `flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${
      isActive ? "bg-[#0E3B27] text-[#5CFFB0] border-[#1E6B48]" : "text-[#9AA39C] border-[#1A1D19]"
    }`;
  }
  return `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
    isActive ? "bg-[#141712] text-[#5CFFB0]" : "text-[#9AA39C] hover:text-[#F2F5F2]"
  }`;
}

export default function AppShell({ lang, setLang, children }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] font-sans">
      <header className="sticky top-0 z-30 border-b border-[#1A1D19] bg-[#08090A]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              RI<span className="text-[#00E28A]">$</span>E
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-[#7C867E] tracking-widest uppercase">Finance</span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClasses(isActive, false)}>
                <item.icon size={15} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} />
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 pl-2 pr-1 py-1.5 rounded-lg border border-[#1E211C] text-sm text-[#C9D1CB] hover:border-[#00E28A]/40"
              >
                <span className="w-6 h-6 rounded-full bg-[#0E3B27] text-[#5CFFB0] flex items-center justify-center text-xs font-bold shrink-0">
                  {(profile?.name || "?").charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[100px] truncate">{profile?.name}</span>
                <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-[#0E100E] border border-[#1E211C] rounded-lg shadow-xl overflow-hidden"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#FF7CA3] hover:bg-[#141712]"
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2 no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClasses(isActive, true)}>
              <item.icon size={13} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">{children}</main>

      <footer className="border-t border-[#1A1D19] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7C867E]">
          <div className="flex items-center gap-4">
            <NavLink to="/survey" className="hover:text-[#5CFFB0] transition-colors flex items-center gap-1">
              <ClipboardList size={12} /> Give feedback
            </NavLink>
            <span className="font-mono">MVP v0.3</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
