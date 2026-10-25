import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#dee9fc]/60 py-4 px-6 text-xs text-[#464555] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2025 StudySync (SATMS) — BCSP-064 Project Workspace.</p>
        <div className="flex gap-4 font-semibold text-[#3525cd]">
          <Link to="/app" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/app/tasks" className="hover:underline">
            Tasks
          </Link>
          <Link to="/app/chat" className="hover:underline">
            Ace Assistant
          </Link>
          <Link to="/app/profile" className="hover:underline">
            Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
