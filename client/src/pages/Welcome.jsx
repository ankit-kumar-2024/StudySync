// WelcomePage.jsx
import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiPlayCircle,
  FiCheckCircle,
  FiSearch,
  FiTrendingUp,
  FiBell,
  FiBookOpen,
  FiClock,
  FiBarChart2,
  FiCheckSquare,
  FiCalendar,
  FiUploadCloud,
  FiUserPlus,
  FiList,
  FiZap,
  FiStar,
  FiX,
  FiCheck,
  FiShield,
  FiXCircle,
  FiActivity,
  FiCode,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
  FiMenu,
  FiX as FiClose,
} from "react-icons/fi";
import { FiCpu } from "react-icons/fi";

const WelcomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="bg-[#f8f9ff] font-sans text-[#121c2a] overflow-x-hidden">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-[#e6eeff] shadow-lg ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(79,70,229,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#4f46e5] flex items-center justify-center text-white">
              <FiBookOpen className="text-[20px]" />
            </div>
            <span className="text-[16px] font-semibold tracking-tight text-[#121c2a]">
              StudySync
              <span className="ml-2 text-[11px] uppercase text-[#4f46e5] px-2 py-0.5 rounded-full bg-[#e6eeff] font-semibold">
                SATMS
              </span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {[
              "features",
              "how-it-works",
              "pricing",
              "testimonials",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-3 py-1.5 rounded-lg text-[14px] text-[#464555] hover:text-[#121c2a] hover:bg-[#eff4ff] transition-colors capitalize"
              >
                {item.replace("-", " ")}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex px-4 py-2 rounded-xl text-[13px] font-medium text-[#464555] hover:text-[#121c2a] hover:bg-[#eff4ff] transition-colors">
              Login
            </button>
            <button className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-white bg-[#4f46e5] shadow-[0_2px_8px_rgba(79,70,229,0.25)] hover:bg-[#3525cd] transition-all">
              Get Started
            </button>
            <button
              className="md:hidden p-2 text-[#121c2a]"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <FiClose size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-[#e6eeff] px-6 py-4 flex flex-col gap-2">
            {[
              "features",
              "how-it-works",
              "pricing",
              "testimonials",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-left px-3 py-2 rounded-lg text-[14px] text-[#464555] hover:bg-[#eff4ff] capitalize"
              >
                {item.replace("-", " ")}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden py-16 bg-gradient-to-b from-[#eff4ff] via-[#f8f9ff] to-[#f8f9ff]">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4f46e5]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#8a4cfc]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT */}
              <div className="lg:col-span-6 flex flex-col items-start gap-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e6eeff] text-[#4f46e5] text-[13px] font-medium shadow-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#4f46e5] animate-ping" />
                  <span className="font-semibold">SATMS StudySync v2.4</span>
                  <span className="text-[#464555] font-normal">
                    | AI-Powered Academic Workspace
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#121c2a] tracking-tight leading-tight">
                  Organize Your Studies.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#8a4cfc]">
                    Ace Your Exams.
                  </span>
                </h1>

                <p className="text-[16px] text-[#464555] max-w-xl leading-relaxed">
                  SATMS is your AI-powered academic companion that tracks tasks,
                  manages deadlines, recommends PYQs, and builds personalized
                  study plans – all in one place.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => scrollTo("pricing")}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#4f46e5] text-white text-[16px] font-semibold shadow-md shadow-[#4f46e5]/25 hover:bg-[#3525cd] transition-all hover:scale-[1.01]"
                  >
                    Start Free Trial
                    <FiArrowRight />
                  </button>
                  <button
                    onClick={() => scrollTo("how-it-works")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#4f46e5] text-[16px] font-semibold shadow-sm hover:bg-[#eff4ff] transition-all"
                  >
                    <FiPlayCircle className="text-[22px]" />
                    Watch Demo
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8a4cfc] ring-2 ring-white flex items-center justify-center text-white text-[12px] font-bold"
                      >
                        {["PS", "DC", "MP"][i - 1]}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#eaddff] text-[#25005a] text-[12px] font-bold flex items-center justify-center ring-2 ring-white">
                      45k+
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="fill-amber-500" size={16} />
                      ))}
                      <span className="text-[13px] text-[#121c2a] font-semibold ml-1">
                        4.9/5
                      </span>
                    </div>
                    <span className="text-[12px] text-[#464555]">
                      Trusted by 45,000+ students across 120+ universities
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT MOCKUP */}
              <div className="lg:col-span-6 relative">
                {/* Floating Streak Widget */}
                <div className="absolute -top-6 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 text-[20px]">
                    🔥
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#464555] font-semibold">
                      Consistency
                    </p>
                    <p className="text-[16px] font-bold text-[#121c2a]">
                      14-Day Streak
                    </p>
                  </div>
                </div>

                {/* Browser Shell */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-[11px] text-[#464555] font-mono">
                        satms.app/workspace/finals-2025
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                      Live Sync
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#eff4ff] px-4 py-2 rounded-xl text-[#464555] text-[12px]">
                    <FiSearch size={16} />
                    <span>Search tasks, solved PYQs, lecture notes...</span>
                    <span className="ml-auto text-[11px] bg-[#e6eeff] px-2 py-0.5 rounded">
                      ⌘K
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[
                      "All Tasks",
                      "Urgent (3)",
                      "PYQs",
                      "Mock Tests",
                      "Math",
                      "CS",
                    ].map((tag, i) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap ${
                          i === 0
                            ? "bg-[#4f46e5] text-white font-semibold"
                            : "bg-[#e6eeff] text-[#464555] hover:text-[#121c2a]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Task Cards */}
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="p-4 rounded-xl bg-[#eff4ff] flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <h4 className="text-[16px] font-semibold text-[#121c2a]">
                            Linear Algebra PYQ Set #4
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
                          Due in 2h
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[12px] text-[#464555]">
                        <span>Eigenvalues, Diagonalization & Gram-Schmidt</span>
                        <span className="px-2 py-0.5 rounded bg-[#e6eeff] text-[#4f46e5] font-medium">
                          In Progress (70%)
                        </span>
                      </div>
                      <div className="w-full bg-[#d9e3f6] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#4f46e5] h-1.5 rounded-full w-[70%]" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#eff4ff] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-emerald-600 text-[20px]" />
                        <div>
                          <h4 className="text-[16px] font-semibold text-[#121c2a] line-through opacity-75">
                            Organic Chemistry Synthesis Flashcards
                          </h4>
                          <p className="text-[12px] text-[#464555]">
                            Reactions 40–85 Reviewed • Spaced Repetition
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                        Completed
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#eff4ff] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiBarChart2 className="text-[#4f46e5] text-[22px]" />
                        <div>
                          <h4 className="text-[16px] font-semibold text-[#121c2a]">
                            Database Systems Practice Test #2
                          </h4>
                          <p className="text-[12px] text-[#464555]">
                            Relational Algebra & B+ Trees • 60 Mins
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[20px] text-[#4f46e5] font-bold">
                          94%
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          +6% vs benchmark
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#4f46e5]/10 via-[#8a4cfc]/10 to-[#eff4ff] flex items-start gap-3">
                    <FiCpu className="text-[24px] text-[#4f46e5] mt-1" />
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#4f46e5]">
                          AI Study Companion
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#4f46e5]/10 text-[#4f46e5] text-[10px] font-semibold uppercase">
                          Smart Nudge
                        </span>
                      </div>
                      <p className="text-[12px] text-[#121c2a]">
                        "Review Fourier Transform theorem before 4 PM to stay
                        ahead of Friday's quiz! You have a 45-min optimal
                        learning window."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Readiness Widget */}
                <div className="absolute -bottom-8 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5]">
                    <FiTrendingUp size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#464555] font-semibold">
                      Exam Readiness
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[20px] font-bold text-[#121c2a]">
                        88%
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        +28% this term
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="w-full py-20 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
              <span className="px-4 py-1 rounded-full bg-[#e6eeff] text-[#4f46e5] text-[13px] uppercase tracking-wider font-semibold">
                Powerful Academic Tools
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#121c2a]">
                Everything You Need to Succeed
              </h2>
              <p className="text-[16px] text-[#464555]">
                Engineered specifically for college and competitive exam
                students who demand focused execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <FiCheckSquare />,
                  title: "Task Management",
                  desc: "Grid-based task tracking with deadlines, subject tags, syllabus weighting, and integrated Eisenhower matrix prioritization for razor-sharp focus.",
                  color: "primary",
                  link: "Explore matrix board",
                },
                {
                  icon: <FiCalendar />,
                  title: "AI Study Planner",
                  desc: "Personalized daily and weekly schedules dynamically adapted around your lecture timings, personal fatigue levels, and upcoming assignment peaks.",
                  color: "secondary",
                  link: "Adaptive scheduling",
                },
                {
                  icon: <FiBookOpen />,
                  title: "PYQ Library",
                  desc: "Upload, index, and auto-solve previous year question papers categorized by chapter, question difficulty, and historical recurring frequency.",
                  color: "primary",
                  link: "Search 10,000+ papers",
                },
                {
                  icon: <FiClock />,
                  title: "Practice Tests",
                  desc: "Timed mock tests with instant automated scoring, step-by-step mathematical explanations, and negative marking simulation for true exam readiness.",
                  color: "tertiary",
                  link: "Simulate exam mode",
                },
                {
                  icon: <FiBarChart2 />,
                  title: "Progress Analytics",
                  desc: "Interactive charts visualizing subject mastery, time distribution, exam readiness score, and revision velocity to eliminate blind spots.",
                  color: "emerald",
                  link: "View mastery breakdown",
                },
                {
                  icon: <FiBell />,
                  title: "Deadline Reminders",
                  desc: "Multi-channel email, SMS, and browser push notifications with proactive smart escalations so no deadline catches you off guard.",
                  color: "red",
                  link: "Configure sync rules",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-[26px] transition-colors ${
                      feature.color === "primary"
                        ? "bg-[#4f46e5]/10 text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-white"
                        : feature.color === "secondary"
                          ? "bg-[#8a4cfc]/10 text-[#8a4cfc] group-hover:bg-[#8a4cfc] group-hover:text-white"
                          : feature.color === "tertiary"
                            ? "bg-[#006a7c]/15 text-[#00505f] group-hover:bg-[#00505f] group-hover:text-white"
                            : feature.color === "emerald"
                              ? "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white"
                              : "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#121c2a]">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-[#464555] leading-relaxed">
                    {feature.desc}
                  </p>
                  <div
                    className={`mt-auto pt-2 flex items-center gap-1 text-[13px] font-semibold ${
                      feature.color === "primary"
                        ? "text-[#4f46e5]"
                        : feature.color === "secondary"
                          ? "text-[#8a4cfc]"
                          : feature.color === "tertiary"
                            ? "text-[#00505f]"
                            : feature.color === "emerald"
                              ? "text-emerald-700"
                              : "text-red-700"
                    }`}
                  >
                    <span>{feature.link}</span>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="w-full py-20 bg-[#eff4ff]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
              <span className="px-4 py-1 rounded-full bg-[#e6eeff] text-[#4f46e5] text-[13px] uppercase tracking-wider font-semibold">
                Seamless Onboarding
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#121c2a]">
                How StudySync Elevates Your Academic Journey
              </h2>
              <p className="text-[16px] text-[#464555]">
                From setup to straight A's in four structured, stress-free
                steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "1",
                  icon: <FiUserPlus />,
                  title: "Sign Up",
                  desc: "Create your account in 30 seconds and configure your milestone exam targets (GRE, GATE, USMLE, or Semester Finals).",
                  tag: "Fast Setup",
                  color: "primary",
                },
                {
                  step: "2",
                  icon: <FiList />,
                  title: "Add Tasks",
                  desc: "Rapidly ingest syllabi, homework assignments, upcoming lab dates, and recurring study blocks into your visual matrix.",
                  tag: "Intelligent Matrix",
                  color: "secondary",
                },
                {
                  step: "3",
                  icon: <FiUploadCloud />,
                  title: "Upload Resources",
                  desc: "Drop lecture PDFs, past exam sheets, question banks, and notes for automatic OCR indexing and AI topic tagging.",
                  tag: "OCR & Indexing",
                  color: "tertiary",
                },
                {
                  step: "4",
                  icon: <FiTrendingUp />,
                  title: "Track Progress",
                  desc: "Review live readiness metrics, spot knowledge gaps, and improve continuously with tailored AI study nudges.",
                  tag: "Continuous Growth",
                  color: "emerald",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        item.color === "primary"
                          ? "bg-[#4f46e5] text-white"
                          : "bg-[#e6eeff] text-[#4f46e5]"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`text-[28px] ${
                        item.color === "primary"
                          ? "text-[#4f46e5]"
                          : item.color === "secondary"
                            ? "text-[#8a4cfc]"
                            : item.color === "tertiary"
                              ? "text-[#00505f]"
                              : "text-emerald-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#121c2a]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#464555] leading-relaxed">
                    {item.desc}
                  </p>
                  <span
                    className={`mt-auto text-[11px] uppercase tracking-wider font-semibold ${
                      item.color === "primary"
                        ? "text-[#4f46e5]"
                        : item.color === "secondary"
                          ? "text-[#8a4cfc]"
                          : item.color === "tertiary"
                            ? "text-[#00505f]"
                            : "text-emerald-700"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Sprint Mode Banner */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center">
                  <FiZap size={24} />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-[#121c2a]">
                    Have an upcoming exam in less than 30 days?
                  </h4>
                  <p className="text-[12px] text-[#464555]">
                    Our "Rapid Sprint Mode" automatically condenses your
                    revision timeline.
                  </p>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-[#4f46e5] text-white text-[13px] font-semibold hover:bg-[#3525cd] transition-colors flex items-center gap-1">
                <span>Try Sprint Mode</span>
                <FiZap size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="w-full py-20 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
              <span className="px-4 py-1 rounded-full bg-[#e6eeff] text-[#4f46e5] text-[13px] uppercase tracking-wider font-semibold">
                Student Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#121c2a]">
                Loved by Top Scorers & Ambitious Learners
              </h2>
              <p className="text-[16px] text-[#464555]">
                Real students sharing how structured focus shifted their
                academic trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "Computer Science Major • Stanford '25",
                  quote:
                    "SATMS revolutionized how I balance university midterms and research. My GPA went from 3.4 to 3.9 in two semesters! The automated PYQ index is pure gold.",
                  initials: "PS",
                },
                {
                  name: "David Chen",
                  role: "Pre-Med Candidate • Johns Hopkins",
                  quote:
                    "The PYQ solver and AI scheduler saved me at least 15 hours of disorganized stress every single week during MCAT preparation. I finally felt in control.",
                  initials: "DC",
                },
                {
                  name: "Maya Patel",
                  role: "Engineering Aspirant • Top 1% Percentile",
                  quote:
                    "The practice test analytics showed me exactly where my weak spots were in Physics. Armed with targeted mock cycles, I landed in the top 1% percentile!",
                  initials: "MP",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, j) => (
                        <FiStar key={j} className="fill-amber-500" size={18} />
                      ))}
                    </div>
                    <p className="text-[14px] text-[#121c2a] italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8a4cfc] flex items-center justify-center text-white font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#121c2a]">
                        {t.name}
                      </h4>
                      <p className="text-[12px] text-[#464555]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button className="w-8 h-2 rounded-full bg-[#4f46e5]" />
              <button className="w-2 h-2 rounded-full bg-[#e6eeff] hover:bg-[#777587] transition" />
              <button className="w-2 h-2 rounded-full bg-[#e6eeff] hover:bg-[#777587] transition" />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="w-full py-20 bg-[#eff4ff]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
              <span className="px-4 py-1 rounded-full bg-[#e6eeff] text-[#4f46e5] text-[13px] uppercase tracking-wider font-semibold">
                Flexible Plans
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#121c2a]">
                Simple, Transparent Student Pricing
              </h2>
              <p className="text-[16px] text-[#464555]">
                Start free, upgrade as your exam milestones approach. Cancel
                anytime with a single click.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Free */}
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#121c2a]">
                      Free
                    </h3>
                    <p className="text-[12px] text-[#464555]">
                      For individual students starting out
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#121c2a]">
                      $0
                    </span>
                    <span className="text-[14px] text-[#464555]">/ month</span>
                  </div>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#121c2a]">
                    {[
                      "Basic task management & kanban",
                      "5 PYQ uploads / month",
                      "Standard deadline alerts",
                      "Access to public student forum",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FiCheck className="text-emerald-600" size={18} />
                        <span>{f}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-[#464555] line-through opacity-60">
                      <FiX size={18} />
                      <span>AI Study Planner</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full py-3 rounded-xl bg-[#e6eeff] text-[#4f46e5] font-semibold hover:bg-[#dee9fc] transition-colors">
                  Choose Free
                </button>
              </div>

              {/* Pro */}
              <div className="bg-white rounded-2xl p-6 shadow-xl relative flex flex-col justify-between gap-6 ring-2 ring-[#4f46e5]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8a4cfc] text-white text-[11px] uppercase tracking-wider font-bold shadow-md">
                  Most Popular
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#4f46e5]">
                      Pro Student
                    </h3>
                    <p className="text-[12px] text-[#464555]">
                      Everything for serious exam preparation
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-4xl font-bold text-[#121c2a]">
                      $9
                    </span>
                    <span className="text-[14px] text-[#464555]">/ month</span>
                    <span className="ml-2 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      Or $79/yr (Save 27%)
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#121c2a]">
                    {[
                      "Full AI study planner & auto-rescheduling",
                      "Unlimited PYQ uploads & instant AI solutions",
                      "Timed practice tests with AI feedback",
                      "Advanced subject mastery analytics",
                      "Multi-channel SMS + browser priority sync",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FiCheckCircle
                          className="text-[#4f46e5] fill-[#4f46e5]/10"
                          size={18}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full py-3.5 rounded-xl bg-[#4f46e5] text-white font-semibold hover:bg-[#3525cd] transition-all shadow-md shadow-[#4f46e5]/25">
                  Choose Pro
                </button>
              </div>

              {/* Institution */}
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#121c2a]">
                      Institution
                    </h3>
                    <p className="text-[12px] text-[#464555]">
                      For schools, universities & academies
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#121c2a]">
                      $29
                    </span>
                    <span className="text-[14px] text-[#464555]">
                      / user / mo
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3 text-[14px] text-[#121c2a]">
                    {[
                      "Bulk license & roster management",
                      "Batch progress & cohort analytics",
                      "Custom PYQ repository & syllabus publishing",
                      "LMS integration (Canvas, Blackboard, Moodle)",
                      "Dedicated account manager & SLA",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FiCheck className="text-emerald-600" size={18} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full py-3 rounded-xl bg-[#e6eeff] text-[#4f46e5] font-semibold hover:bg-[#dee9fc] transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="w-full py-16 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4f46e5] via-[#4f46e5] to-[#8a4cfc] p-8 md:p-16 text-white shadow-2xl flex flex-col items-center text-center gap-6">
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
                <span className="text-[11px] uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full self-center font-semibold">
                  Zero Risk • Get Started Today
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to Transform Your Study Routine?
                </h2>
                <p className="text-[16px] text-white/90">
                  Join over 45,000 students who study smarter, stress less, and
                  consistently ace their academic goals.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => scrollTo("pricing")}
                  className="px-7 py-3.5 rounded-xl bg-white text-[#4f46e5] font-semibold hover:bg-[#eff4ff] transition-all shadow-lg hover:scale-[1.01]"
                >
                  Get Started Free (No Credit Card Required)
                </button>
                <button className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all backdrop-blur-md">
                  Schedule Campus Demo
                </button>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 pt-4 text-white/80 text-[13px]">
                <div className="flex items-center gap-1.5">
                  <FiShield size={18} />
                  <span>14-day full free trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiXCircle size={18} />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiActivity size={18} />
                  <span>99.9% uptime SLA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="w-full bg-[#eff4ff] py-16">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Brand */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#4f46e5] flex items-center justify-center text-white">
                    <FiBookOpen size={22} />
                  </div>
                  <span className="text-[20px] font-bold tracking-tight text-[#121c2a]">
                    SATMS
                    <span className="ml-2 text-[11px] uppercase text-[#4f46e5] px-2 py-0.5 rounded-full bg-[#e6eeff] font-semibold">
                      STUDYSYNC
                    </span>
                  </span>
                </div>
                <p className="text-[14px] text-[#464555] max-w-sm leading-relaxed">
                  Smart Academic Task Management System — Empowering student
                  achievement with intelligent scheduling, PYQ archives, and
                  stress-free productivity workflows.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  {[FiTwitter, FiLinkedin, FiCode, FiYoutube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-lg bg-[#e6eeff] flex items-center justify-center text-[#464555] hover:text-[#4f46e5] transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Product */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[16px] font-semibold text-[#121c2a]">
                  Product
                </h4>
                <ul className="flex flex-col gap-2 text-[14px] text-[#464555]">
                  {[
                    "Features",
                    "Pricing",
                    "Interactive Demo",
                    "Changelog",
                    "Public Roadmap",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-[#4f46e5] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[16px] font-semibold text-[#121c2a]">
                  Company
                </h4>
                <ul className="flex flex-col gap-2 text-[14px] text-[#464555]">
                  {[
                    "About Us",
                    "Student Blog",
                    "Careers",
                    "Press Kit",
                    "Contact",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-[#4f46e5] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[16px] font-semibold text-[#121c2a]">
                  Resources
                </h4>
                <ul className="flex flex-col gap-2 text-[14px] text-[#464555]">
                  {[
                    "Help Center",
                    "Documentation",
                    "PYQ Archives",
                    "Community Forum",
                    "Student Data Security",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-[#4f46e5] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#464555] border-t border-[#d9e3f6]">
              <p>© 2025 SATMS (StudySync). All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Preferences",
                  "FERPA / GDPR Compliance",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-[#121c2a] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default WelcomePage;
