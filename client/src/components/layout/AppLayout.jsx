import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";

export default function AppLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const location = useLocation();

  // Desktop screen auto-expand
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLeftOpen(true);
        setRightOpen(true);
      } else {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setLeftOpen(false);
    }
  }, [location.pathname]);

  const isDashboard =
    location.pathname === "/app" || location.pathname === "/app/";

  return (
    <div className="bg-[#f8f9ff] text-[#121c2a] font-['Inter',sans-serif] min-h-screen flex flex-col selection:bg-[#3525cd] selection:text-white">
      {/* Top Header */}
      <Header
        onToggleSidebar={() => setLeftOpen(!leftOpen)}
        onToggleInsights={isDashboard ? () => setRightOpen(!rightOpen) : null}
        isInsightsOpen={isDashboard && rightOpen}
        showInsightsToggle={isDashboard}
      />

      {/* Mobile Backdrop Overlay for Left Sidebar */}
      {leftOpen && (
        <div
          onClick={() => setLeftOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Navigation Left Sidebar */}
      <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

      {/* Right Insights Sidebar (Dashboard Only) */}
      {isDashboard && (
        <RightSidebar isOpen={rightOpen} onClose={() => setRightOpen(false)} />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          leftOpen ? "lg:pl-64" : "pl-0"
        } ${isDashboard && rightOpen ? "xl:pr-80" : "pr-0"}`}
      >
        <main className="pt-16 min-h-screen flex flex-col justify-between">
          <div className="w-full max-w-7xl mx-auto p-3 sm:p-5 md:p-6 lg:p-8 min-w-0">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
