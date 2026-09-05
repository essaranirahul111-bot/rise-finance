import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#08090A] text-[#F2F5F2] flex flex-col items-center justify-center px-4 text-center">
      <SEO
        title="Page Not Found — RI$E Finance"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <span className="text-2xl font-black tracking-tight mb-6">
        RI<span className="text-[#00E28A]">$</span>E
      </span>
      <h1 className="text-5xl font-black tracking-tight mb-3">404</h1>
      <p className="text-[#9AA39C] mb-8 max-w-sm">
        This page doesn't exist, or it may have moved.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 rounded-lg bg-[#00E28A] text-[#08090A] font-semibold hover:bg-[#00c97a] transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
