import { Link } from "react-router-dom";

export default function PublicShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] font-sans">
      <header className="sticky top-0 z-30 border-b border-[#1A1D19] bg-[#08090A]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              RI<span className="text-[#00E28A]">$</span>E
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-[#7C867E] tracking-widest uppercase">Finance</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/about" className="text-[#9AA39C] hover:text-[#F2F5F2]">About</Link>
            <Link to="/research" className="text-[#9AA39C] hover:text-[#F2F5F2]">Research</Link>
            <Link to="/login" className="px-4 py-2 rounded-lg text-[#C9D1CB] hover:text-[#F2F5F2]">Log in</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">{children}</main>
    </div>
  );
}
