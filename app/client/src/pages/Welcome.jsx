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
  IconClock,
  IconCpu,
  IconLightbulb,
  IconUserPlus,
  IconUploadCloud,
  IconLock,
  IconCheck,
} from "../components/common/Icons";

export default function Welcome() {
  const navigate = useNavigate();

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
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    role: "Undergraduate Student",
    targetGoal: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

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

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim() || samplePrompts[promptIdx];
    navigate(`/app/chat?prompt=${encodeURIComponent(query)}`);
  };

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
    }, 800);
  };

  return (
    <div className="bg-white text-[#121C2A] antialiased selection:bg-[#3525cd] selection:text-white font-['Inter',sans-serif] overflow-x-hidden scroll-smooth">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#dee9fc]/70">
        <div className="h-18 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#712ae2] flex items-center justify-center text-white shadow-md shadow-[#3525cd]/25 group-hover:scale-105 transition-all">
              <IconSchool className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#121C2A]">
                StudySync
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold uppercase border border-[#dee9fc]">
                SATMS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              ["#features", "Features"],
              ["#how-it-works", "How It Works"],
              ["#library", "Library Vault"],
              ["#testimonials", "Stories"],
              ["#pricing", "Pricing"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#464555] hover:text-[#3525cd] hover:bg-[#eff4ff] transition-all"
              >
                {label}
              </a>
            ))}
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
              className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dee9fc] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#3525cd] animate-ping"></span>
              <span className="text-xs font-bold text-[#3525cd] tracking-wide">
                SATMS v3.0 • Gemini AI Study & Exam Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#121C2A] tracking-tight leading-[1.12]">
              Organize Your Studies.{" "}
              <span className="bg-gradient-to-r from-[#3525cd] via-[#4338ca] to-[#712ae2] bg-clip-text text-transparent">
                Ace Your Target Exams.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#464555] max-w-xl leading-relaxed">
              Generate AI courses & PDFs, watch embedded video lessons with
              clickable transcripts, take diagnostic tests, and track every
              milestone.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold text-xs shadow-lg shadow-[#3525cd]/25 flex items-center gap-2"
              >
                <span>Start Free Workspace</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#dee9fc] text-[#3525cd] font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <IconPlayCircle className="w-4 h-4 text-[#3525cd]" />
                <span>Watch Demo Video</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="rounded-3xl bg-white shadow-2xl border border-[#dee9fc] overflow-hidden">
              <div className="bg-[#f8f9ff] border-b border-[#dee9fc] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#777587] bg-white px-3 py-0.5 rounded-md border border-[#dee9fc]/60">
                  <IconLock className="w-3 h-3 text-gray-400" />
                  <span>studysync.app/workspace</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="p-5 space-y-4 bg-[#f8f9ff]/50">
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
                    className="w-full pl-9 pr-20 py-2.5 bg-white border border-[#dee9fc] rounded-xl text-xs text-[#121c2a] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3 py-1.5 bg-[#3525cd] text-white text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    Ask AI
                  </button>
                </form>

                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => navigate("/app/tasks")}
                    className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-[#3525cd] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <IconCheckSquare className="w-4 h-4 text-[#3525cd]" />
                      <span className="text-xs font-bold text-[#121c2a]">
                        Active Tasks
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#3525cd] bg-indigo-50 px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/books")}
                    className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-[#712ae2] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <IconBook className="w-4 h-4 text-[#712ae2]" />
                      <span className="text-xs font-bold text-[#121c2a]">
                        AI PDF Courses
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#712ae2] bg-purple-50 px-1.5 py-0.5 rounded">
                      PDF
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/tests")}
                    className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-emerald-600 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <IconClock className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-[#121c2a]">
                        AI Quizzes
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +4/-1
                    </span>
                  </div>

                  <div
                    onClick={() => navigate("/app/videos")}
                    className="p-3 bg-white rounded-xl border border-[#dee9fc] flex items-center justify-between hover:border-amber-500 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <IconZap className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-[#121c2a]">
                        Video Vault
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      In-App
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center gap-2 text-xs text-[#3525cd]">
                  <IconLightbulb className="w-4 h-4 shrink-0" />
                  <p className="truncate text-[11px] font-medium">
                    <strong>AI Tip:</strong> Watch embedded lectures with
                    clickable transcripts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-[#dee9fc] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-[#121c2a]">
                StudySync Guided Walkthrough
              </h3>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#3525cd] flex items-center justify-center shadow-xl">
                <IconSchool className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-base font-bold">
                Full-Stack MERN + Gemini AI Workspace
              </h4>
              <p className="text-xs text-indigo-200 max-w-md">
                Create an account to generate custom AI courses, export PDFs,
                take graded tests, and watch video lessons in-app.
              </p>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  navigate("/app");
                }}
                className="px-5 py-2.5 bg-white text-[#3525cd] font-bold text-xs rounded-xl cursor-pointer"
              >
                Launch Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-[#121c2a] text-gray-400 py-10 text-xs border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 StudySync (SATMS). Built with MERN Stack & Google Gemini AI.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-white">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-white">
              Register
            </Link>
            <Link to="/app" className="hover:text-white">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
