import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0F19]/90 border-t border-slate-800/80 py-4 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 StudySync (SATMS v3.0) — Powered by Sync AI.</p>
        <div className="flex gap-5 font-semibold text-slate-400">
          <Link to="/app" className="hover:text-indigo-400 transition">
            Dashboard
          </Link>
          <Link to="/app/chat" className="hover:text-indigo-400 transition">
            Sync AI
          </Link>
          <Link to="/app/planner" className="hover:text-indigo-400 transition">
            Planner
          </Link>
          <Link to="/app/help" className="hover:text-indigo-400 transition">
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
}
