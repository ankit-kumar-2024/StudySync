import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconSchool,
  IconArrowRight,
  IconCheckSquare,
  IconBook,
  IconPlayCircle,
  IconFire,
  IconTrendingUp,
  IconZap,
  IconShield,
  IconClock,
  IconSearch,
  IconCpu,
  IconLightbulb,
  IconUserPlus,
  IconUploadCloud,
  IconMail,
  IconAward,
  IconHeadphones,
  IconShare2,
  IconCode,
  IconMonitor,
  IconAtSign,
  IconLock,
  IconCheck,
  IconStar,
} from "../components/common/Icons";

export default function Welcome() {
  const navigate = useNavigate();

  // 1. Dynamic typing in the Hero search preview
  const samplePrompts = [
    "Summarize Gauss's Law from Physics Vol 1...",
    "Show Indefinite Integration JEE Advanced PYQs...",
    "What are my weakest Chemistry topics?",
    "Generate a 7-day revision schedule for Math...",
  ];
  const [promptIdx, setPromptIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentPrompt = samplePrompts[promptIdx];
    const speed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentPrompt.length) {
        setTypedPlaceholder(currentPrompt.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      } else if (!isDeleting && charIdx === currentPrompt.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIdx > 0) {
        setTypedPlaceholder(currentPrompt.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setPromptIdx((prev) => (prev + 1) % samplePrompts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, promptIdx]);

  // Handle Search Submission -> Opens Ace Chat
  const handleHeroSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim() || samplePrompts[promptIdx];
    navigate(`/app/chat?prompt=${encodeURIComponent(query)}`);
  };

  // 2. Demo Video Modal State
  const [showDemoModal, setShowDemoModal] = useState(false);

  // 3. Billing Frequency State (Pricing Toggle)
  const [isAnnual, setIsAnnual] = useState(true);

  // 4. Testimonials Carousel State
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Major • Stanford '25",
      avatar: "PS",
      text: "StudySync revolutionized how I balance midterms and revision. The AI search across all my lecture notes and the automatic weak-topic diagnostic quizzes cut 10+ hours of stress every week!",
    },
    {
      name: "David Chen",
      role: "Pre-Med Candidate • Johns Hopkins",
      avatar: "DC",
      text: "The timed practice tests with negative marking calibration and instant step-by-step solutions saved my prep during MCAT season. I finally feel in full command of my schedule.",
    },
    {
      name: "Maya Patel",
      role: "Engineering Aspirant • Top 1% Percentile",
      avatar: "MP",
      text: "The central library keeps everything — NCERTs, PYQs, and recorded videos — neatly categorized. The AI showed me exactly where my Mechanics weak spots were, and my score spiked!",
    },
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 5. Contact / Campus Inquiry Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    role: "Undergraduate Student",
    targetGoal: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
      setContactForm({
        name: "",
        email: "",
        role: "Undergraduate Student",
        targetGoal: "",
        message: "",
      });
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white text-[#121C2A] antialiased selection:bg-[#3525cd] selection:text-white font-['Inter',sans-serif] overflow-x-hidden scroll-smooth">
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR                                                   */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#dee9fc]/70 transition-all">
        <div className="h-18 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-md shadow-[#3525cd]/25 group-hover:scale-105 group-hover:rotate-2 transition-all">
              <IconSchool className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#121C2A] group-hover:text-[#3525cd] transition-colors">
                StudySync
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold uppercase border border-[#dee9fc]">
                SATMS
              </span>
            </div>
          </Link>

          {/* Anchor Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              How It Works
            </a>
            <a
              href="#library"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Library Vault
            </a>
            <a
              href="#testimonials"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Stories
            </a>
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-white">
        <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#3525cd]/10 blur-3xl animate-pulse"></div>
        <div className="pointer-events-none absolute top-1/3 -right-24 w-[32rem] h-[32rem] rounded-full bg-[#712ae2]/10 blur-3xl animate-pulse"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dee9fc] shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3525cd] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3525cd]"></span>
                </span>
                <span className="text-xs font-bold text-[#3525cd] tracking-wide">
                  SATMS v3.0 • Simplified Academic Tracking & Management System
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#121C2A] tracking-tight leading-[1.12]">
                Organize Your Studies.{" "}
                <span className="bg-gradient-to-r from-[#3525cd] via-[#4338ca] to-[#712ae2] bg-clip-text text-transparent">
                  Ace Your Target Exams.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#464555] max-w-xl leading-relaxed">
                Centralize tasks, study materials, past question papers, and
                timed tests into an adaptive schedule optimized around your
                learning pace.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold text-xs shadow-lg shadow-[#3525cd]/25 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Start Free Workspace</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#dee9fc] text-[#3525cd] font-bold text-xs hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <IconPlayCircle className="w-4 h-4 text-[#3525cd]" />
                  <span>Watch Demo Video</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#3525cd] border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
                    SR
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-[#712ae2] border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
                    DC
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
                    MP
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#3525cd] text-white border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    +45k
                  </div>
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <span>★★★★★</span>
                    <span className="text-[#121c2a] ml-1">4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#464555]">
                    Trusted by 45,000+ competitive exam aspirants.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Search & Floating Badges */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="absolute -top-5 -right-3 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#dee9fc] flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-[#ba1a1a]">
                  <IconFire className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#121c2a]">
                    14-Day Streak 🔥
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Top 5% consistency
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#dee9fc] flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <IconTrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#121c2a]">
                    Readiness 88% ↗
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold">
                    +6% this sprint
                  </p>
                </div>
              </div>

              {/* App Window */}
              <div className="rounded-3xl bg-white shadow-2xl border border-[#dee9fc] overflow-hidden">
                <div className="bg-[#f8f9ff] border-b border-[#dee9fc] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#777587] bg-white px-3 py-0.5 rounded-md border border-[#dee9fc]/60">
                    <IconLock className="w-3 h-3 text-gray-400" />
                    <span>satms.app/workspace</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>

                <div className="p-5 space-y-4 bg-[#f8f9ff]/50">
                  {/* Working Form Input */}
                  <form
                    onSubmit={handleHeroSearch}
                    className="relative flex items-center"
                  >
                    <IconCpu className="w-4 h-4 text-[#3525cd] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={typedPlaceholder}
                      className="w-full pl-9 pr-20 py-2.5 bg-white border border-[#dee9fc] rounded-xl text-xs text-[#121c2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 px-3 py-1.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Ask AI
                    </button>
                  </form>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      onClick={() => navigate("/app/tasks")}
                      className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-[#3525cd] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <IconCheckSquare className="w-4 h-4 text-[#3525cd]" />
                        <span className="text-xs font-bold text-[#121c2a]">
                          Active Tasks
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#3525cd] bg-indigo-50 px-1.5 py-0.5 rounded">
                        24
                      </span>
                    </div>

                    <div
                      onClick={() => navigate("/app/books")}
                      className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-[#712ae2] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <IconBook className="w-4 h-4 text-[#712ae2]" />
                        <span className="text-xs font-bold text-[#121c2a]">
                          PYQ Vault
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#712ae2] bg-purple-50 px-1.5 py-0.5 rounded">
                        18
                      </span>
                    </div>

                    <div
                      onClick={() => navigate("/app/tests")}
                      className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-emerald-600 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <IconClock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-[#121c2a]">
                          Mock Tests
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        7
                      </span>
                    </div>

                    <div
                      onClick={() => navigate("/app/planner")}
                      className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-amber-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <IconZap className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-[#121c2a]">
                          AI Planner
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        Calibrated
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center gap-2 text-xs text-[#3525cd]">
                    <IconLightbulb className="w-4 h-4 shrink-0" />
                    <p className="truncate text-[11px] font-medium">
                      <strong>AI Tip:</strong> Revise Wave Optics 2023 PYQs
                      before test #3.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. DEMO VIDEO MODAL                                             */}
      {/* ============================================================== */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full shadow-2xl border border-[#dee9fc] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <IconPlayCircle className="w-5 h-5 text-[#3525cd]" />
                <h3 className="text-sm font-bold text-[#121c2a]">
                  StudySync Guided Product Walkthrough
                </h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-3 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#3525cd] flex items-center justify-center shadow-xl animate-pulse">
                <IconSchool className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-base font-bold">
                Interactive SATMS Walkthrough
              </h4>
              <p className="text-xs text-indigo-200 max-w-md">
                Experience the MERN stack workflow: Task Prioritization,
                Cloudinary PDF previewing, timed diagnostic mock examinations,
                and the AI study plan generator.
              </p>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  navigate("/app");
                }}
                className="px-5 py-2.5 bg-white text-[#3525cd] font-bold text-xs rounded-xl shadow-md hover:bg-[#eff4ff] cursor-pointer"
              >
                Launch Live App Instead →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. FEATURES SECTION                                             */}
      {/* ============================================================== */}
      <section
        className="py-20 bg-white border-t border-[#dee9fc]/70"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold uppercase tracking-wider border border-[#dee9fc]">
              Academic Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121c2a] tracking-tight">
              Engineered For High-Stakes Prep
            </h2>
            <p className="text-xs sm:text-sm text-[#464555]">
              Everything you need to transform disordered study habits into
              structured, trackable learning cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/app/tasks")}
              className="p-6 rounded-3xl bg-[#f8f9ff] border border-[#dee9fc]/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#3525cd] flex items-center justify-center shadow-xs group-hover:bg-[#3525cd] group-hover:text-white transition-all">
                  <IconCheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#121c2a]">
                  Task Management & Deadlines
                </h3>
                <p className="text-xs text-[#464555] leading-relaxed">
                  Subject-specific task cards with live countdown timers,
                  urgency matrices, and completion states.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#3525cd]">
                <span>Manage Workloads</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate("/app/books")}
              className="p-6 rounded-3xl bg-[#f8f9ff] border border-[#dee9fc]/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#712ae2] flex items-center justify-center shadow-xs group-hover:bg-[#712ae2] group-hover:text-white transition-all">
                  <IconBook className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#121c2a]">
                  PYQ & Document Vault
                </h3>
                <p className="text-xs text-[#464555] leading-relaxed">
                  Cloud storage for past question papers and textbooks with
                  in-browser previewing.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#712ae2]">
                <span>Open Library</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate("/app/tests")}
              className="p-6 rounded-3xl bg-[#f8f9ff] border border-[#dee9fc]/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <IconClock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#121c2a]">
                  Timed Diagnostic Tests
                </h3>
                <p className="text-xs text-[#464555] leading-relaxed">
                  Instant exam scoring with negative marking calibration and
                  automatic weak topic detection.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span>Start Practice</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PROCESS SECTION                                              */}
      {/* ============================================================== */}
      <section className="py-20 bg-[#f8f9ff]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#3525cd] text-[10px] font-bold uppercase tracking-wider border border-[#dee9fc] shadow-xs">
              4-Step Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121c2a] tracking-tight">
              From Setup to Exam Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Register & Set Targets",
                desc: "Set your target exam (JEE, NEET, GATE) and target study hours per day.",
                icon: IconUserPlus,
              },
              {
                num: "02",
                title: "Upload Past Papers",
                desc: "Organize PDFs and question vaults by subject and exam year.",
                icon: IconUploadCloud,
              },
              {
                num: "03",
                title: "Practice with Timers",
                desc: "Attempt mock papers and let Ace AI detect your specific weak spots.",
                icon: IconClock,
              },
              {
                num: "04",
                title: "Follow Adaptive Plan",
                desc: "Check off customized study sessions to maximize retention before the test.",
                icon: IconTrendingUp,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-[#dee9fc] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#3525cd] font-mono font-bold text-xs flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon className="w-6 h-6 text-[#3525cd]" />
                    <h3 className="text-sm font-bold text-[#121c2a]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#464555] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CENTRAL LIBRARY SHOWCASE                                     */}
      {/* ============================================================== */}
      <section className="py-20 bg-white" id="library">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold uppercase tracking-wider border border-[#dee9fc]">
              Everything In One Vault
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121c2a] tracking-tight">
              One Unified Academic Library
            </h2>
            <p className="text-xs sm:text-sm text-[#464555]">
              Say goodbye to fragmented folders. Store your notes, past
              questions, and lecture videos under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/app/books")}
              className="p-6 rounded-3xl bg-white border border-[#dee9fc] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold">
                  PDF & Notes Vault
                </span>
                <h3 className="text-base font-bold text-[#121c2a]">
                  PYQ Question Banks
                </h3>
                <p className="text-xs text-[#464555]">
                  Instant in-browser document previews with fast keyword search.
                </p>
              </div>
              <span className="text-xs font-bold text-[#3525cd] hover:underline">
                Explore Documents →
              </span>
            </div>

            <div
              onClick={() => navigate("/app/videos")}
              className="p-6 rounded-3xl bg-white border border-[#dee9fc] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-50 text-[#712ae2] text-[10px] font-bold">
                  Interactive Video
                </span>
                <h3 className="text-base font-bold text-[#121c2a]">
                  Mechanism Player
                </h3>
                <p className="text-xs text-[#464555]">
                  Interactive whiteboard vector mechanics and timestamp-linked
                  AI tutoring.
                </p>
              </div>
              <span className="text-xs font-bold text-[#712ae2] hover:underline">
                Launch Player →
              </span>
            </div>

            <div
              onClick={() => navigate("/app/assignments")}
              className="p-6 rounded-3xl bg-white border border-[#dee9fc] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Submissions
                </span>
                <h3 className="text-base font-bold text-[#121c2a]">
                  Homework Tracking
                </h3>
                <p className="text-xs text-[#464555]">
                  Submission file manager with status badges and teacher
                  feedback notes.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 hover:underline">
                View Assignments →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TESTIMONIALS (Interactive Carousel)                         */}
      {/* ============================================================== */}
      <section className="py-20 bg-[#f8f9ff]" id="testimonials">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#3525cd] text-[10px] font-bold uppercase tracking-wider border border-[#dee9fc] shadow-xs">
              Student Stories
            </span>
            <h2 className="text-3xl font-extrabold text-[#121c2a]">
              Loved by Top Scorers Nationwide
            </h2>
          </div>

          <div className="p-8 sm:p-10 bg-white rounded-3xl border border-[#dee9fc] shadow-xl space-y-6 relative transition-all duration-300">
            <div className="flex justify-center text-amber-400 text-lg">
              ★★★★★
            </div>
            <p className="text-sm sm:text-base text-[#464555] italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#3525cd] text-white font-bold flex items-center justify-center text-xs shadow-md">
                {testimonials[activeTestimonial].avatar}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#121c2a]">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-[10px] text-gray-500">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx
                      ? "w-6 bg-[#3525cd]"
                      : "w-2 bg-gray-200 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonial slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. PRICING WITH DYNAMIC BILLING TOGGLE                          */}
      {/* ============================================================== */}
      <section className="py-20 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold uppercase tracking-wider border border-[#dee9fc]">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121c2a] tracking-tight">
              Simple, Predictable Plans
            </h2>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <span
                className={`text-xs font-semibold ${!isAnnual ? "text-[#121c2a]" : "text-gray-400"}`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  isAnnual ? "bg-[#3525cd]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-xs font-semibold ${isAnnual ? "text-[#121c2a]" : "text-gray-400"}`}
              >
                Annual{" "}
                <span className="text-[#3525cd] font-bold">(Save 27%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-8 rounded-3xl bg-white border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#121c2a]">
                  Free Community
                </h3>
                <div className="text-3xl font-extrabold text-[#121c2a]">$0</div>
                <ul className="space-y-2.5 text-xs text-[#464555]">
                  <li className="flex items-center gap-2">
                    ✓ Full Task & Deadline Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ 5 Resource Library PDF Uploads
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Timed Diagnostic Quizzes
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-[#eff4ff] text-[#3525cd] font-bold text-xs text-center hover:bg-[#dee9fc] transition-all"
              >
                Choose Free
              </Link>
            </div>

            {/* Pro Student */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#3525cd] shadow-xl shadow-[#3525cd]/10 flex flex-col justify-between space-y-6 relative hover:scale-[1.02] transition-transform">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#3525cd] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Recommended
              </span>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#121c2a]">
                  Pro Student
                </h3>
                <div className="text-3xl font-extrabold text-[#121c2a]">
                  {isAnnual ? "$79" : "$9"}
                  <span className="text-xs font-normal text-gray-500">
                    {isAnnual ? " / year" : " / month"}
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#121c2a] font-medium">
                  <li className="flex items-center gap-2">
                    ✓ Everything in Free
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Full Ace AI Assistant Access
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Unlimited PYQ & Notes Cloud Vault
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Weak Topic Diagnostics Generator
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-[#3525cd] text-white font-bold text-xs text-center hover:bg-[#2c1ea8] transition-all shadow-md shadow-[#3525cd]/25"
              >
                Choose Pro
              </Link>
            </div>

            {/* Institution */}
            <div className="p-8 rounded-3xl bg-white border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#121c2a]">
                  Institution / Campus
                </h3>
                <div className="text-3xl font-extrabold text-[#121c2a]">
                  $29{" "}
                  <span className="text-xs font-normal text-gray-500">
                    / user
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#464555]">
                  <li className="flex items-center gap-2">
                    ✓ Cohort & Classroom Rosters
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Custom Syllabus Publishing
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Dedicated Support & Analytics
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="w-full py-2.5 rounded-xl bg-[#eff4ff] text-[#3525cd] font-bold text-xs text-center hover:bg-[#dee9fc] transition-all"
              >
                Contact Academic Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. CAMPUS & INSTITUTION INQUIRY FORM                            */}
      {/* ============================================================== */}
      <section className="py-20 bg-[#f8f9ff]" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dee9fc] shadow-lg space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-[#121c2a]">
                Campus & Department Inquiries
              </h3>
              <p className="text-xs text-[#464555]">
                Speak with our academic coordinators about batch deployments or
                study center integration.
              </p>
            </div>

            {contactSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Thank you! Our academic team will respond within 24 hours.
                </span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
                  />
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="e.g. elena@mit.edu"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Role / Department
                  </label>
                  <select
                    value={contactForm.role}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option>Undergraduate Student</option>
                    <option>Postgraduate / Researcher</option>
                    <option>Faculty / Professor</option>
                    <option>Department Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Target Exam / Goal
                  </label>
                  <input
                    type="text"
                    value={contactForm.targetGoal}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        targetGoal: e.target.value,
                      })
                    }
                    placeholder="e.g. GATE 2026 or JEE Advanced"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#464555] font-semibold mb-1">
                  Inquiry Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Tell us how StudySync can support your learning cohort..."
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full py-3 bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold rounded-xl transition-all shadow-md shadow-[#3525cd]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingContact ? "Sending..." : "Submit Campus Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FOOTER                                                     */}
      {/* ============================================================== */}
      <footer className="w-full bg-[#121c2a] text-gray-400 py-12 text-xs border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 StudySync (SATMS). BCSP-064 Project Submission.</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link to="/app" className="hover:text-white transition-colors">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
