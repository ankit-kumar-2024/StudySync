import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  PlayCircle,
  BookOpen,
  FileText,
  HelpCircle,
  Calendar,
  CheckCircle2,
  Flame,
  TrendingUp,
  Lock,
  Cpu,
  Check,
  ShieldCheck,
  Layers,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  // Dynamic typing preview in the Hero Sync AI command bar
  const samplePrompts = [
    "Build a Complete Full-Stack MERN Course in 14 days...",
    "Generate 50 practice questions on React Hooks & State...",
    "Create a PDF study book & video lectures for Operating Systems...",
    "Plan my 7-day revision sprint with daily deadlines...",
  ];
  const [promptIdx, setPromptIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentPrompt = samplePrompts[promptIdx];
    const speed = isDeleting ? 22 : 48;

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentPrompt.length) {
        setTypedPlaceholder(currentPrompt.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      } else if (!isDeleting && charIdx === currentPrompt.length) {
        setTimeout(() => setIsDeleting(true), 1700);
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

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim() || samplePrompts[promptIdx];
    navigate(`/app/chat?prompt=${encodeURIComponent(query)}`);
  };

  // Demo Modal & Billing Toggle
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  // Testimonials Carousel
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "B.Tech Computer Science • Final Year",
      avatar: "PS",
      text: "Sync AI asked 5 quick questions and generated an entire DBMS course with YouTube lectures, downloadable PDF books, and 50-question practice tests for every chapter.",
    },
    {
      name: "Arjun Verma",
      role: "Competitive Exam & GATE Aspirant",
      avatar: "AV",
      text: "Every time I retake a 50-question topic test, the questions are completely fresh. Having my course deadlines and module progress synced in Study Planner keeps me on track.",
    },
    {
      name: "Sneha Nair",
      role: "Full-Stack Developer & BCA Scholar",
      avatar: "SN",
      text: "The unified dark workspace feels like an engineering IDE for studying—I can watch lectures in-app, read the generated PDF book side-by-side, and track my readiness score.",
    },
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Campus / Support Inquiry Form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    role: "Undergraduate Student",
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
        message: "",
      });
      setTimeout(() => setContactSuccess(false), 4500);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden scroll-smooth relative">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* ============================================================== */}
      {/* 1. GLASS NAVBAR                                                */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070A11]/85 backdrop-blur-2xl border-b border-slate-800/80">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                StudySync
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                SATMS 3.0
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              ["#features", "Features"],
              ["#how-it-works", "5-Step Sync AI"],
              ["#ecosystem", "Ecosystem"],
              ["#stories", "Stories"],
              ["#pricing", "Plans"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/70 transition-all"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative z-10 pt-32 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1624] border border-indigo-500/30 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-xs font-bold text-indigo-300 tracking-wide">
                Sync AI Course Architect • Videos, PDF Books & 50-Q Tests
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              One Prompt.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                A Complete Course
              </span>{" "}
              Built Around Your Deadline.
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              Answer 5 guided questions in Sync AI—get curated YouTube video
              lectures, downloadable PDF books, dynamic 50-question practice
              tests, and an automated Study Planner in seconds.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition-all inline-flex items-center gap-2"
              >
                <span>Launch Student Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#0F1624] hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-cyan-400" />
                <span>Interactive Tour</span>
              </button>
            </div>

            {/* Trust / Metrics Strip */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-md border-t border-slate-800/80">
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-white">
                  5 Steps
                </p>
                <p className="text-[11px] text-slate-400">
                  Sync AI Course Wizard
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-cyan-400">
                  50 Qs
                </p>
                <p className="text-[11px] text-slate-400">
                  Fresh Test Every Run
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-indigo-400">
                  100%
                </p>
                <p className="text-[11px] text-slate-400">In-App Video & PDF</p>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Sync AI Preview Window */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Floating Streak Badge */}
            <div className="hidden sm:flex absolute -top-5 -right-3 z-20 bg-[#0F1624]/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">14-Day Streak</p>
                <p className="text-[10px] text-slate-400">Top 5% consistency</p>
              </div>
            </div>

            {/* Floating Readiness Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 z-20 bg-[#0F1624]/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Readiness 92%</p>
                <p className="text-[10px] text-emerald-400 font-semibold">
                  +8% after 50-Q drill
                </p>
              </div>
            </div>

            {/* Glass Browser Card */}
            <div className="rounded-3xl bg-[#0F1624] shadow-2xl border border-slate-800 overflow-hidden">
              <div className="bg-[#0B0F19] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-[#070A11] px-3 py-0.5 rounded-md border border-slate-800">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>studysync.app/sync-ai</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-5 space-y-4">
                <form
                  onSubmit={handleHeroSearch}
                  className="relative flex items-center"
                >
                  <Cpu className="w-4 h-4 text-cyan-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={typedPlaceholder}
                    className="w-full pl-10 pr-24 py-3 bg-[#070A11] border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                  >
                    Ask AI
                  </button>
                </form>

                {/* Sync AI Output Preview Tiles */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => navigate("/app/videos")}
                    className="p-3 bg-[#070A11] rounded-xl border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-slate-200">
                        Video Lectures
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded">
                      In-App
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/books")}
                    className="p-3 bg-[#070A11] rounded-xl border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-slate-200">
                        PDF Books
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                      Export
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/tests")}
                    className="p-3 bg-[#070A11] rounded-xl border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-200">
                        Practice Tests
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
                      50 Qs
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/planner")}
                    className="p-3 bg-[#070A11] rounded-xl border border-slate-800 hover:border-amber-500/50 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200">
                        Study Planner
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                      Tracked
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center gap-2.5 text-xs text-indigo-200">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <p className="truncate text-[11px]">
                    <strong>Sync AI:</strong> Validated 5-question course
                    builder ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CORE FEATURES BENTO GRID                                    */}
      {/* ============================================================== */}
      <section
        id="features"
        className="relative z-10 py-20 border-t border-slate-800/70 bg-[#0B0F19]/60 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
              Unified Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything Synced in One Dark Workspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              No switching tabs between YouTube, PDF readers, mock test portals,
              and study planners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/app/chat")}
              className="group p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Strict 5-Step Sync AI Builder
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sync AI collects your course title, topics, PDF preference,
                  video preference, and completion deadline—validating every
                  input before generating your curriculum.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-400 inline-flex items-center gap-1">
                Open Sync AI <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            <div
              onClick={() => navigate("/app/books")}
              className="group p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Per-Topic PDF Books & Video Watch UI
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every topic gets 1 embedded YouTube lecture and 1 downloadable
                  PDF book, sharing the exact same distraction-free watch view
                  across Books and Video Lessons.
                </p>
              </div>
              <span className="text-xs font-bold text-cyan-400 inline-flex items-center gap-1">
                Browse Library <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            <div
              onClick={() => navigate("/app/tests")}
              className="group p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Dynamic 50-Question Practice Tests
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Attempt a 50-question timed exam on any course topic—every
                  attempt generates 50 brand-new questions and updates your
                  Study Planner & Readiness Score.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1">
                Start 50-Q Test <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. HOW THE 5-STEP SYNC AI WORKFLOW WORKS                       */}
      {/* ============================================================== */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-widest">
              Guided Creation Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Idea to Complete Course in 5 Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "Course Name",
                desc: "Give your custom course any title you want.",
              },
              {
                step: "02",
                title: "Target Topics",
                desc: "List all chapters or concepts you want to master.",
              },
              {
                step: "03",
                title: "Books & PDFs",
                desc: "Choose whether to generate downloadable PDF study books.",
              },
              {
                step: "04",
                title: "Video Lectures",
                desc: "Attach curated YouTube lectures for every topic.",
              },
              {
                step: "05",
                title: "50-Q Tests & Deadline",
                desc: "Enable 50-Q tests and set your completion timeline.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-3xl bg-[#0F1624] border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <span className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center">
                  {item.step}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. ECOSYSTEM SHOWCASE                                          */}
      {/* ============================================================== */}
      <section
        id="ecosystem"
        className="relative z-10 py-20 border-t border-slate-800/70 bg-[#0B0F19]/60 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/app/planner")}
            className="p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-amber-500/40 cursor-pointer transition space-y-3"
          >
            <span className="px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase">
              Deadline Tracker
            </span>
            <h3 className="text-base font-bold text-white">
              Study Planner & Progress Bars
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every pending course appears in your Study Planner with live
              deadline countdowns, module checkboxes, and a 25-minute Pomodoro
              timer.
            </p>
          </div>

          <div
            onClick={() => navigate("/app/analytics")}
            className="p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition space-y-3"
          >
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-300 text-[10px] font-bold uppercase">
              Performance Insights
            </span>
            <h3 className="text-base font-bold text-white">
              Exam Readiness Analytics
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track your weighted Exam Readiness Score, test accuracy trends,
              and export JSON reports in one click.
            </p>
          </div>

          <div
            onClick={() => navigate("/app/assignments")}
            className="p-6 rounded-3xl bg-[#0F1624] border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition space-y-3"
          >
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">
              Coursework
            </span>
            <h3 className="text-base font-bold text-white">
              Tasks & Assignment Vault
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manage daily tasks with live countdowns and upload homework
              submissions up to 10MB with status tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. STUDENT TESTIMONIALS                                        */}
      {/* ============================================================== */}
      <section id="stories" className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
              Student Stories
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Built for Focused Exam Preparation
            </h2>
          </div>

          <div className="p-8 sm:p-10 bg-[#0F1624] rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex justify-center text-amber-400 text-base tracking-widest">
              ★★★★★
            </div>
            <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
              “{testimonials[activeTestimonial].text}”
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold flex items-center justify-center text-xs">
                {testimonials[activeTestimonial].avatar}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx
                      ? "w-7 bg-indigo-500"
                      : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PRICING PLANS                                               */}
      {/* ============================================================== */}
      <section
        id="pricing"
        className="relative z-10 py-20 border-t border-slate-800/70 bg-[#0B0F19]/60 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
              Transparent Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Start Free, Upgrade Anytime
            </h2>

            <div className="flex items-center justify-center gap-3 pt-2">
              <span
                className={`text-xs font-semibold ${
                  !isAnnual ? "text-white" : "text-slate-500"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  isAnnual ? "bg-indigo-600" : "bg-slate-700"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-xs font-semibold ${
                  isAnnual ? "text-white" : "text-slate-500"
                }`}
              >
                Annual{" "}
                <span className="text-cyan-400 font-bold">(Save 25%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="p-7 rounded-3xl bg-[#0F1624] border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Student Free</h3>
                <div className="text-3xl font-extrabold text-white">$0</div>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Sync AI
                    5-Step Course Builder
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> In-App Video
                    & PDF Reader
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Study Planner
                    & Task Manager
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition"
              >
                Create Free Account
              </Link>
            </div>

            {/* Pro */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#151E33] to-[#0F1624] border-2 border-indigo-500 shadow-2xl shadow-indigo-600/15 flex flex-col justify-between space-y-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </span>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Pro Scholar</h3>
                <div className="text-3xl font-extrabold text-white">
                  {isAnnual ? "$69" : "$8"}
                  <span className="text-xs font-normal text-slate-400">
                    {isAnnual ? " / year" : " / month"}
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Unlimited Sync
                    AI Courses & PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Unlimited
                    50-Question Practice Tests
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Exam Readiness
                    Analytics & Export
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs text-center shadow-lg shadow-indigo-600/25 transition"
              >
                Start Pro Workspace
              </Link>
            </div>

            {/* Campus */}
            <div className="p-7 rounded-3xl bg-[#0F1624] border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">
                  Campus / Batch
                </h3>
                <div className="text-3xl font-extrabold text-white">
                  $25{" "}
                  <span className="text-xs font-normal text-slate-400">
                    / seat
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Cohort
                    Assignment Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Custom
                    Syllabus Distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Dedicated
                    Academic Support
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition"
              >
                Contact Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. CONTACT FORM                                                */}
      {/* ============================================================== */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-[#0F1624] rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
            <p className="text-xs text-slate-400">
              Questions about StudySync or institutional deployments? Send us a
              message.
            </p>
          </div>

          {contactSuccess && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                Message received! Our academic team will respond shortly.
              </span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-800 focus:border-indigo-500 rounded-xl text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="you@university.edu"
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-800 focus:border-indigo-500 rounded-xl text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                placeholder="How can StudySync help you or your institution?"
                className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-800 focus:border-indigo-500 rounded-xl text-white focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingContact}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmittingContact ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. DEMO MODAL                                                  */}
      {/* ============================================================== */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1624] rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  StudySync — Sync AI Workflow Tour
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-[#070A11] border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-xl">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">
                5 Questions &rarr; Videos + PDF Books + 50-Q Tests
              </h4>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Sign in, open Sync AI Builder, enter your course title, topics,
                and completion deadline, and watch StudySync generate your
                entire learning workspace automatically.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowDemoModal(false);
                  navigate("/register");
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Get Started Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. FOOTER                                                     */}
      {/* ============================================================== */}
      <footer className="relative z-10 w-full bg-[#0B0F19] text-slate-500 py-10 text-xs border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 StudySync (SATMS v3.0) — BCSP-064 Project Workspace.</p>
          <div className="flex gap-5 font-semibold text-slate-400">
            <Link to="/login" className="hover:text-white transition">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Register
            </Link>
            <Link to="/app" className="hover:text-white transition">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
