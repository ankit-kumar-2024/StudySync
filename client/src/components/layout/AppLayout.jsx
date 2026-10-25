import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";

export default function AppLayout() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const location = useLocation();

  // Show Insights sidebar ONLY on the Dashboard page ("/app")
  const isDashboard =
    location.pathname === "/app" || location.pathname === "/app/";

  return (
    <div className="bg-[#f8f9ff] text-[#121c2a] font-['Inter',sans-serif] min-h-screen">
      <Header
        onToggleSidebar={() => setLeftOpen(!leftOpen)}
        onToggleInsights={isDashboard ? () => setRightOpen(!rightOpen) : null}
        isInsightsOpen={isDashboard && rightOpen}
        showInsightsToggle={isDashboard}
      />
      <LeftSidebar isOpen={leftOpen} />

      {/* Right Sidebar renders ONLY on the Dashboard */}
      {isDashboard && <RightSidebar isOpen={rightOpen} />}

      <div
        className={`transition-all duration-300 ease-in-out ${
          leftOpen ? "pl-64" : "pl-0"
        } ${isDashboard && rightOpen ? "pr-80" : "pr-0"}`}
      >
        <main className="pt-16 min-h-screen flex flex-col justify-between">
          <div className="p-4 sm:p-6 min-w-0">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
