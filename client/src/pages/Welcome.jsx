import React from "react";

// ==========================================
// SVG Icon Components (inline, no deps)
// ==========================================
const IconBookOpen = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconArrowRight = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconPlayCircle = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
  </svg>
);

const IconStar = ({ className = "w-4 h-4", filled = true }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconTrendingUp = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconZap = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconMail = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconAward = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const IconHeadphones = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const IconShare2 = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const IconCode = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconMonitor = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconAtSign = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

const IconLock = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconSearch = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconClock = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconFileText = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconCheckSquare = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const IconCpu = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const IconBook = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconBarChart2 = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconUserPlus = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const IconUploadCloud = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const IconLightbulb = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const IconShield = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconFire = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 23c4.97 0 9-4.03 9-9 0-1.23-.27-2.4-.74-3.47-.2-.45-.77-.55-1.1-.18l-1.44 1.6c-.3.33-.82.32-1.13-.01l-1.83-1.9c-.34-.36-.93-.35-1.27.02L11.2 12.4c-.33.37-.9.39-1.26.05l-.9-.86c-.35-.34-.93-.3-1.24.09L5.24 14.5c-.19.24-.53.22-.7-.03A8.96 8.96 0 0 0 3 14c0 4.97 4.03 9 9 9z" />
    <path
      d="M12 23c2.76 0 5-2.24 5-5 0-2.5-2.5-4.5-2.5-4.5S13 16 12 16s-1.5-2-1.5-2S8 15.5 8 18c0 2.76 1.76 5 4 5z"
      opacity="0.4"
    />
  </svg>
);

// ==========================================
// Main Component
// ==========================================
const StudySync = () => {
  return (
    <div className="bg-white text-[#121C2A] antialiased selection:bg-[#4F46E5] selection:text-white font-[Inter,sans-serif] [&_::-webkit-scrollbar]:hidden">
      {/* ========================================== */}
      {/* 2. FIXED NAVBAR                            */}
      {/* ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#EFF4FF] shadow-[0_2px_12px_rgba(79,70,229,0.06)]">
        <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            className="flex items-center gap-3 group focus:outline-none"
            href="#"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <IconBookOpen className="w-[22px] h-[22px]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-[#121C2A] group-hover:text-[#4F46E5] transition-colors">
                StudySync
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#4F46E5] text-[11px] font-semibold tracking-wide uppercase border border-indigo-100">
                SATMS
              </span>
            </div>
          </a>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#features"
            >
              Features
            </a>
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#library"
            >
              Library
            </a>
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#testimonials"
            >
              Testimonials
            </a>
            <a
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#contact"
            >
              Contact
            </a>
          </nav>
          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#464555] hover:text-[#4F46E5] hover:bg-[#EFF4FF] transition-all"
              href="#pricing"
            >
              Log In
            </a>
            <a
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-md shadow-indigo-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
              href="#pricing"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="w-full pt-20">
        {/* ========================================== */}
        {/* 3. HERO SECTION (id="hero")                */}
        {/* ========================================== */}
        <section
          className="relative overflow-hidden bg-gradient-to-b from-[#EFF4FF] via-white to-white pt-10 pb-20 lg:pt-16 lg:pb-28"
          id="hero"
        >
          {/* Glow ambient backdrops */}
          <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="pointer-events-none absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Hero Left Column (60% / col-span-7) */}
              <div className="lg:col-span-7 flex flex-col items-start gap-5 z-10">
                {/* Announcement Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4F46E5]"></span>
                  </span>
                  <span className="text-xs font-semibold text-[#4F46E5] tracking-wide">
                    SATMS StudySync v3.0 | AI-Powered Academic Workspace
                  </span>
                </div>
                {/* Main Catchy Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#121C2A] tracking-tight leading-[1.15]">
                  Organize Your Studies.
                  <br />
                  <span className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] bg-clip-text text-transparent">
                    Ace Your Exams.
                  </span>
                </h1>
                {/* Subheadline */}
                <p className="text-base sm:text-lg text-[#464555] max-w-2xl leading-relaxed">
                  StudySync is your AI-powered academic hub — track tasks, save
                  books, PDFs, notes and videos, take practice tests, and get
                  instant AI answers, all in one organized workspace.
                </p>
                {/* Call to Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
                  <a
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                    href="#pricing"
                  >
                    <span>Start Free Trial</span>
                    <IconArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#4F46E5]/30 text-[#4F46E5] font-semibold text-sm shadow-sm hover:bg-[#EFF4FF] transition-all duration-200"
                    href="#how-it-works"
                  >
                    <IconPlayCircle className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </a>
                </div>
                {/* Social Proof Row */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center -space-x-2.5">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4F46E5] border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm">
                      PS
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7C3AED] border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm">
                      DC
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm">
                      MP
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm">
                      45k+
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <IconStar className="w-4 h-4" />
                      <IconStar className="w-4 h-4" />
                      <IconStar className="w-4 h-4" />
                      <IconStar className="w-4 h-4" />
                      <IconStar className="w-4 h-4" />
                      <span className="text-sm font-bold text-[#121C2A] ml-1">
                        4.9/5
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#464555]">
                      Trusted by 45,000+ students across 120+ universities.
                    </span>
                  </div>
                </div>
              </div>
              {/* Hero Right Column (40% / col-span-5 Realistic Mockup) */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                {/* Top Floating Elevated Badge: 14-Day Streak */}
                <div className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 transition-transform hover:-translate-y-1">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#F59E0B]">
                    <IconFire className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#121C2A] leading-tight">
                      14-Day Streak 🔥
                    </p>
                    <p className="text-[11px] text-[#464555]">
                      Top 5% consistency
                    </p>
                  </div>
                </div>
                {/* Bottom Floating Elevated Badge: Readiness */}
                <div className="absolute -bottom-5 -left-3 sm:-left-5 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 transition-transform hover:-translate-y-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
                    <IconTrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#121C2A] leading-tight">
                      Exam Readiness 88% ↗
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold">
                      +6% ahead of schedule
                    </p>
                  </div>
                </div>
                {/* Browser Mockup Window */}
                <div className="w-full rounded-2xl bg-white shadow-2xl border border-indigo-100 overflow-hidden">
                  {/* Window Chrome Header */}
                  <div className="bg-gray-50 border-b border-gray-200/80 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs text-[#464555] flex items-center justify-center gap-1.5 flex-1 max-w-xs shadow-inner">
                      <IconLock className="w-[13px] h-[13px] text-gray-400" />
                      <span className="font-mono text-[11px] truncate">
                        satms.app/dashboard
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Live Sync
                      </span>
                    </div>
                  </div>
                  {/* Dashboard Interior Preview */}
                  <div className="p-4 sm:p-5 space-y-4 bg-[#F8FAFC]">
                    {/* Large AI Search Bar Inside Mockup */}
                    <div className="p-1.5 bg-white rounded-xl border border-indigo-100 shadow-sm flex items-center gap-2">
                      <IconCpu className="w-[18px] h-[18px] text-[#4F46E5] ml-2" />
                      <input
                        className="w-full text-xs bg-transparent border-0 focus:ring-0 text-[#121C2A] placeholder-[#464555]/60 outline-none p-0"
                        placeholder="Ask AI anything about your courses, PYQs..."
                        readOnly
                        type="text"
                      />
                      <button className="px-3 py-1.5 rounded-lg bg-[#4F46E5] text-white text-[11px] font-semibold shrink-0 shadow-sm">
                        Ask AI
                      </button>
                    </div>
                    {/* 2x3 Mini Grid of Category Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* 1. All Tasks */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between hover:border-indigo-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                            <IconCheckSquare className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            All Tasks
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#4F46E5] bg-indigo-50 px-1.5 py-0.5 rounded-md">
                          24
                        </span>
                      </div>
                      {/* 2. Saved Books & PDFs */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between hover:border-purple-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                            <IconBook className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            Books & PDFs
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#7C3AED] bg-purple-50 px-1.5 py-0.5 rounded-md">
                          18
                        </span>
                      </div>
                      {/* 3. Saved Videos */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between hover:border-teal-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                            <IconPlayCircle className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            Saved Videos
                          </span>
                        </div>
                        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-md">
                          9
                        </span>
                      </div>
                      {/* 4. Tests & Practice */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between hover:border-amber-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                            <IconClock className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            Tests & Practice
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#F59E0B] bg-amber-50 px-1.5 py-0.5 rounded-md">
                          7
                        </span>
                      </div>
                      {/* 5. Study Notes */}
                      <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
                            <IconFileText className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            Study Notes
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded-md">
                          14
                        </span>
                      </div>
                      {/* 6. AI Assistant */}
                      <div className="p-2.5 rounded-xl bg-white border border-rose-100 shadow-xs flex items-center justify-between hover:border-rose-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                            <IconCpu className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[#121C2A]">
                            AI Assistant
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                          Online
                        </span>
                      </div>
                    </div>
                    {/* Mini Smart Recommendation Bar */}
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-2">
                      <IconLightbulb className="w-[18px] h-[18px] text-[#4F46E5] shrink-0" />
                      <p className="text-[11px] text-[#121C2A] truncate">
                        <span className="font-bold text-[#4F46E5]">
                          Next recommended:
                        </span>{" "}
                        20 min revision on Calculus IV PYQs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 4. SECTION 3: FEATURES SHOWCASE (#features) */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-white" id="features">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#EFF4FF] text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100">
                Powerful Academic Tools
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                Everything You Need to Succeed
              </h2>
              <p className="text-base sm:text-lg text-[#464555]">
                Engineered for college and competitive exam students who demand
                focused execution.
              </p>
            </div>
            {/* 6-Card Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1: Task Management */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                    <IconCheckSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Task Management
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Prioritize homework, weekly assignments, and study goals
                    with integrated urgency matrix and automatic deadline
                    warnings.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* Feature 2: Books, PDFs & Notes Library */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                    <IconBook className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Books, PDFs & Notes Library
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Centralize textbooks, previous year papers, syllabi, and
                    class notes with lightning-fast OCR search and smart
                    tagging.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* Feature 3: Saved Videos */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <IconPlayCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Saved Videos
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Save YouTube tutorials, lecture recordings, and video
                    courses with timestamp bookmarks and AI concept extraction.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* Feature 4: Practice Tests */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center group-hover:bg-[#F59E0B] group-hover:text-white transition-colors">
                    <IconClock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Practice Tests
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Timed mock exams with simulated exam timers, instant
                    grading, negative marking calibrations, and deep
                    step-by-step solutions.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* Feature 5: Progress Analytics */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                    <IconBarChart2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Progress Analytics
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Visual dashboards revealing topic strengths, syllabus
                    coverage, time-on-task, and predicted exam readiness
                    percentages.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* Feature 6: AI Assistant */}
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <IconCpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Instant answers referencing your uploaded materials, formula
                    explanations, flashcard generation, and round-the-clock
                    tutoring.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#library"
                  >
                    <span>Learn more</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. SECTION 4: HOW IT WORKS (#how-it-works) */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-[#EFF4FF]" id="how-it-works">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100 shadow-xs">
                Seamless Onboarding
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                How StudySync Elevates Your Academic Journey
              </h2>
              <p className="text-base sm:text-lg text-[#464555]">
                From setup to straight A's in four structured, stress-free
                steps.
              </p>
            </div>
            {/* 4-step Horizontal Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-indigo-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-[#4F46E5] text-base font-bold flex items-center justify-center">
                      01
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#EFF4FF] text-[#4F46E5] text-xs font-semibold">
                      Fast Setup
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                    <IconUserPlus className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#121C2A]">Sign Up</h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Create your account in 30 seconds and enter your upcoming
                    exam dates, subjects, and study target targets.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-indigo-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-[#7C3AED] text-base font-bold flex items-center justify-center">
                      02
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-[#7C3AED] text-xs font-semibold">
                      One Library
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                    <IconUploadCloud className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#121C2A]">
                    Save Everything
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Drag-and-drop course PDFs, past exam question banks, YouTube
                    tutorials, and notes into an organized hub.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-indigo-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 text-base font-bold flex items-center justify-center">
                      03
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-500 text-xs font-semibold">
                      AI-Powered
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                    <IconCpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#121C2A]">
                    Practice & Ask AI
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Take timed practice tests and ask the integrated AI
                    companion questions straight from your lecture notes.
                  </p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-indigo-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#10B981] text-base font-bold flex items-center justify-center">
                      04
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#10B981] text-xs font-semibold">
                      Continuous Growth
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                    <IconTrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#121C2A]">
                    Track Progress
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Watch your readiness index climb as you check off high-yield
                    topics and eliminate conceptual blind spots.
                  </p>
                </div>
              </div>
            </div>
            {/* Sprint Mode Urgent Callout Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center shrink-0">
                  <IconLightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#121C2A]">
                    Have an upcoming exam in less than 30 days?
                  </h4>
                  <p className="text-sm text-[#464555] mt-0.5">
                    Our ‘Rapid Sprint Mode’ automatically condenses your
                    revision timeline to hit high-yield topics first.
                  </p>
                </div>
              </div>
              <a
                className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold whitespace-nowrap shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all"
                href="#pricing"
              >
                Try Sprint Mode
              </a>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 6. SECTION 5: LIBRARY PREVIEW (#library)   */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-white" id="library">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#EFF4FF] text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100">
                Centralized Hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                Your Entire Academic Library in One Place
              </h2>
              <p className="text-base sm:text-lg text-[#464555]">
                Tasks, books, notes, videos, and tests — organized into
                categories and searchable with AI.
              </p>
            </div>
            {/* Interactive-looking Mock AI Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border-2 border-indigo-100 shadow-md flex items-center gap-3 focus-within:border-[#4F46E5] transition-colors">
                <IconSearch className="w-5 h-5 text-[#4F46E5] ml-2" />
                <input
                  className="w-full text-sm sm:text-base bg-transparent border-0 focus:ring-0 text-[#121C2A] placeholder-[#464555]/70 outline-none p-0"
                  placeholder="Ask AI: 'Show me my Physics notes' or 'Solve 2023 PYQ Question 4'..."
                  readOnly
                  type="text"
                />
                <button className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold shrink-0 shadow-sm transition-colors flex items-center gap-1.5">
                  <IconCpu className="w-4 h-4" />
                  <span>Search AI</span>
                </button>
              </div>
            </div>
            {/* 6 Large Category Cards (2x3 Grid matching app hub) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. All Tasks (Indigo) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                      <IconCheckSquare className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold border border-indigo-100">
                      24 items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    All Tasks
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Study tasks, homework, and assignments with deadlines.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:text-[#4338CA]"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* 2. Saved Books & PDFs (Violet) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                      <IconBook className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold border border-purple-100">
                      18 items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Saved Books & PDFs
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Textbooks, PYQs, and reference documents.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] group-hover:text-purple-800"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* 3. Saved Videos (Teal) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <IconPlayCircle className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
                      9 items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Saved Videos
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Lecture recordings and tutorials.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:text-teal-900"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* 4. Tests & Practice (Amber) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center group-hover:bg-[#F59E0B] group-hover:text-white transition-colors">
                      <IconClock className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-[#F59E0B] text-xs font-bold border border-amber-100">
                      7 items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Tests & Practice
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Mock tests and practice quizzes.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F59E0B] group-hover:text-amber-800"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* 5. Study Notes (Emerald) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                      <IconFileText className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#10B981] text-xs font-bold border border-emerald-100">
                      14 items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    Study Notes
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Handwritten notes and AI summaries.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#10B981] group-hover:text-emerald-800"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              {/* 6. AI Assistant (Rose) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <IconCpu className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
                      Always available
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#121C2A]">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-[#464555] leading-relaxed">
                    Ask anything across your entire library.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100/80 mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 group-hover:text-rose-800"
                    href="#pricing"
                  >
                    <span>Open</span>
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 7. SECTION 6: TESTIMONIALS (#testimonials) */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-[#EFF4FF]/60" id="testimonials">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100 shadow-xs">
                Student Success Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                Loved by Top Scorers & Ambitious Learners
              </h2>
              <p className="text-base sm:text-lg text-[#464555]">
                Real students sharing how structured focus shifted their
                academic trajectory.
              </p>
            </div>
            {/* 3-Column Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Testimonial 1 */}
              <div className="p-7 rounded-2xl bg-white border border-indigo-50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-[#464555] italic leading-relaxed">
                    “StudySync revolutionized how I balance midterms and
                    research. My GPA went from 3.4 to 3.9 in two semesters! The
                    AI search across my notes is pure gold.”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center font-bold text-sm shadow-xs">
                    PS
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#121C2A]">
                      Priya Sharma
                    </p>
                    <p className="text-xs text-[#464555]">
                      Computer Science Major • Stanford '25
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="p-7 rounded-2xl bg-white border border-indigo-50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-[#464555] italic leading-relaxed">
                    “The AI assistant and practice test analytics saved me at
                    least 15 hours of disorganized stress every week during MCAT
                    prep. I finally felt in control.”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center font-bold text-sm shadow-xs">
                    DC
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#121C2A]">
                      David Chen
                    </p>
                    <p className="text-xs text-[#464555]">
                      Pre-Med Candidate • Johns Hopkins
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="p-7 rounded-2xl bg-white border border-indigo-50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                    <IconStar className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-[#464555] italic leading-relaxed">
                    “The category dashboard keeps everything — books, videos,
                    tests — in one place. The AI showed me exactly where my
                    Physics weak spots were, and I landed in the top 1%!”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shadow-xs">
                    MP
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#121C2A]">
                      Maya Patel
                    </p>
                    <p className="text-xs text-[#464555]">
                      Engineering Aspirant • Top 1% Percentile
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <span className="w-6 h-2 rounded-full bg-[#4F46E5] transition-all"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-indigo-300 transition-all"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-indigo-300 transition-all"></span>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 8. SECTION 7: PRICING (#pricing)           */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-[#EFF4FF]" id="pricing">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100 shadow-xs">
                Flexible Plans
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                Simple, Transparent Student Pricing
              </h2>
              <p className="text-base sm:text-lg text-[#464555]">
                Start free, upgrade as your exam milestones approach. Cancel
                anytime with a single click.
              </p>
            </div>
            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Plan 1: Free */}
              <div className="p-8 rounded-2xl bg-white shadow-sm flex flex-col justify-between space-y-8 border border-gray-100">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#121C2A]">Free</h3>
                    <p className="text-xs sm:text-sm text-[#464555] mt-1">
                      For individual students getting organized.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#121C2A]">
                      $0
                    </span>
                    <span className="text-sm text-[#464555]">/ month</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#464555]">
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Basic task management & kanban</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>5 Books & PDF uploads / month</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Standard deadline reminders</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Access to public student forum</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-gray-400 line-through">
                      <IconX className="w-4 h-4 text-[#EF4444]" />
                      <span>AI Assistant & Instant Solver</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full py-3 rounded-xl bg-[#EFF4FF] hover:bg-indigo-100 text-[#4F46E5] font-semibold text-sm transition-colors">
                  Choose Free
                </button>
              </div>
              {/* Plan 2: Pro Student (Featured) */}
              <div className="p-8 rounded-2xl bg-white shadow-2xl flex flex-col justify-between space-y-8 relative ring-2 ring-[#4F46E5]">
                {/* Most Popular Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-bold tracking-wide shadow-md">
                  MOST POPULAR
                </div>
                <div className="space-y-6 pt-1">
                  <div>
                    <h3 className="text-xl font-bold text-[#121C2A]">
                      Pro Student
                    </h3>
                    <p className="text-xs sm:text-sm text-[#464555] mt-1">
                      For serious, competitive exam prep.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#121C2A]">
                        $9
                      </span>
                      <span className="text-sm text-[#464555]">/ month</span>
                    </div>
                    <p className="text-xs text-[#4F46E5] font-semibold mt-1">
                      or $79/year (Save 27%)
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-[#121C2A]">
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>
                        <strong>Full AI Assistant</strong> across all your notes
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>
                        Unlimited library uploads (Books, PDFs, Videos)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Timed practice tests with AI feedback</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Advanced mastery & readiness analytics</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Multi-channel SMS + browser priority sync</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all">
                  Choose Pro
                </button>
              </div>
              {/* Plan 3: Institution */}
              <div className="p-8 rounded-2xl bg-white shadow-sm flex flex-col justify-between space-y-8 border border-gray-100">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#121C2A]">
                      Institution
                    </h3>
                    <p className="text-xs sm:text-sm text-[#464555] mt-1">
                      For colleges, universities & coaching centers.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#121C2A]">
                      $29
                    </span>
                    <span className="text-sm text-[#464555]">/ user / mo</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#464555]">
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Bulk license & cohort roster management</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Batch progress & cohort performance analytics</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Custom PYQ repository & syllabus publishing</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>LMS Integration (Canvas, Blackboard, Moodle)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#4F46E5]" />
                      <span>Dedicated account manager & SLA support</span>
                    </li>
                  </ul>
                </div>
                <a
                  className="w-full py-3 rounded-xl bg-[#EFF4FF] hover:bg-indigo-100 text-[#4F46E5] text-sm font-semibold text-center transition-colors block"
                  href="#contact"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 9. SECTION 8: CALL-TO-ACTION BANNER        */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] p-8 sm:p-14 text-center text-white shadow-2xl">
              {/* Subtle Blurred Background Radial Circles */}
              <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>
              <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs tracking-wider font-semibold">
                  Zero Risk • Get Started Today
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Ready to Transform Your Study Routine?
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                  Join over 45,000 students who organize everything in one
                  place, study smarter with AI, and consistently ace their
                  goals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-sm shadow-lg hover:bg-[#EFF4FF] transition-all hover:-translate-y-0.5 active:scale-95"
                    href="#pricing"
                  >
                    Get Started Free (No Credit Card Required)
                  </a>
                  <a
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-sm transition-all"
                    href="#contact"
                  >
                    Schedule Campus Demo
                  </a>
                </div>
                {/* Trust Row */}
                <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <IconShield className="w-4 h-4" />
                    <span>14-day full free trial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconX className="w-4 h-4" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconZap className="w-4 h-4" />
                    <span>99.9% uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 10. SECTION 9: CAMPUS INQUIRY (#contact)   */}
        {/* ========================================== */}
        <section className="py-20 lg:py-28 bg-[#EFF4FF]" id="contact">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left: Quick Info */}
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#4F46E5] text-xs uppercase tracking-wider font-semibold border border-indigo-100 shadow-xs">
                  Institutional Support & Queries
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121C2A] tracking-tight">
                  We're here to empower your campus.
                </h2>
                <p className="text-base text-[#464555] leading-relaxed">
                  Have questions about institution-wide licensing, syllabus
                  integration APIs, or student ambassador programs? Speak with
                  our academic solution architects.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#4F46E5] flex items-center justify-center shadow-sm border border-indigo-50">
                      <IconMail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#121C2A]">
                        Academic Inquiries
                      </p>
                      <p className="text-xs text-[#464555]">
                        academic@studysync.satms.edu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#4F46E5] flex items-center justify-center shadow-sm border border-indigo-50">
                      <IconAward className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#121C2A]">
                        Campus Rep Program
                      </p>
                      <p className="text-xs text-[#464555]">
                        ambassadors@studysync.satms.edu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#4F46E5] flex items-center justify-center shadow-sm border border-indigo-50">
                      <IconHeadphones className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#121C2A]">
                        24/7 Student Desk
                      </p>
                      <p className="text-xs text-[#464555]">
                        support@studysync.satms.edu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Campus Inquiry Form Card */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-white shadow-md border border-gray-100 space-y-6">
                  <h3 className="text-2xl font-bold text-[#121C2A]">
                    Send an Inquiry
                  </h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        "Thank you! Our academic team will respond within 24 hours.",
                      );
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#464555]">
                          Your Full Name
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#121C2A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm"
                          placeholder="e.g. Elena Rostova"
                          required
                          type="text"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#464555]">
                          University / Institution Email
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#121C2A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm"
                          placeholder="e.g. elena@mit.edu"
                          required
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#464555]">
                          Role
                        </label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#121C2A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm">
                          <option>Undergraduate Student</option>
                          <option>Postgraduate / Researcher</option>
                          <option>Faculty / Professor</option>
                          <option>Department Administrator</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#464555]">
                          Primary Target Exam / Goal
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#121C2A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm"
                          placeholder="e.g. GATE 2026 / USMLE Step 1"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#464555]">
                        Message or Inquiry Details
                      </label>
                      <textarea
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#121C2A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm resize-none"
                        placeholder="How can StudySync help you or your department achieve academic excellence?"
                        rows={4}
                      ></textarea>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-md shadow-indigo-500/25 transition-all"
                      type="submit"
                    >
                      Send Message & Schedule Consultation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================== */}
      {/* 11. 5-COLUMN FOOTER                        */}
      {/* ========================================== */}
      <footer className="w-full bg-[#121C2A] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 5 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
            {/* Col 1: Brand Intro & Socials */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-md">
                  <IconBookOpen className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-white">StudySync</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Smart Academic Task Management System (SATMS) engineered for
                high-trust academic focus, AI-powered notes, and exam mastery.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2 text-gray-400">
                <a
                  className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-[#4F46E5] hover:text-white flex items-center justify-center transition-colors"
                  href="#"
                >
                  <IconShare2 className="w-[17px] h-[17px]" />
                </a>
                <a
                  className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-[#4F46E5] hover:text-white flex items-center justify-center transition-colors"
                  href="#"
                >
                  <IconCode className="w-[17px] h-[17px]" />
                </a>
                <a
                  className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-[#4F46E5] hover:text-white flex items-center justify-center transition-colors"
                  href="#"
                >
                  <IconMonitor className="w-[17px] h-[17px]" />
                </a>
                <a
                  className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-[#4F46E5] hover:text-white flex items-center justify-center transition-colors"
                  href="#"
                >
                  <IconAtSign className="w-[17px] h-[17px]" />
                </a>
              </div>
            </div>
            {/* Col 2: Product Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                Product
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#features"
                  >
                    Task Management
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#library"
                  >
                    Books & PDFs Library
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#library"
                  >
                    Saved Videos
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#features"
                  >
                    Practice Tests
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#features"
                  >
                    AI Study Assistant
                  </a>
                </li>
              </ul>
            </div>
            {/* Col 3: Company Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#how-it-works"
                  >
                    About StudySync
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#testimonials"
                  >
                    Student Stories
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#pricing"
                  >
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#contact"
                  >
                    Campus Rep Program
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#contact"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            {/* Col 4: Resources Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Documentation
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    University Portals
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Academic Calendar API
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    System Status
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Research Ethics
                  </a>
                </li>
              </ul>
            </div>
            {/* Col 5: Campus Inquiry Box */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                Institutional Access
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Deploy StudySync across entire university faculties, coaching
                batches, or academic networks.
              </p>
              <div className="pt-1">
                <a
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  href="#contact"
                >
                  <span>Inquire for Campuses</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2025 SATMS (StudySync). All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-6">
              <a className="hover:text-gray-300 transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-gray-300 transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-gray-300 transition-colors" href="#">
                Cookie Preferences
              </a>
              <a className="hover:text-gray-300 transition-colors" href="#">
                FERPA/GDPR Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudySync;
