import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// =========================================================================
// Inline SVG Icons (Material Symbols equivalents for clean, zero-dep render)
// =========================================================================
const IconPlay = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconPause = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
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

const IconChevronDown = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
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

const IconArrowLeft = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconDownload = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconVisibility = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function TaskWorkspacePage() {
  const navigate = useNavigate();

  // Active step & video player simulation states
  const [activeStep, setActiveStep] = useState(2);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(3); // 0: Description, 1: Transcript, 2: All Tests, 3: Course Materials
  const [searchFilter, setSearchFilter] = useState("");

  const stepsList = [
    {
      num: 1,
      duration: "18 min",
      status: "completed",
    },
    {
      num: 2,
      duration: "24 min",
      status: "active",
    },
    {
      num: 3,
      duration: "20 min",
      status: "pending",
    },
    {
      num: 4,
      duration: "25 min",
      status: "pending",
    },
  ];

  return (
    <div className="flex flex-col w-full font-['Inter',sans-serif] text-[#121c2a]">
      {/* ========================================================================= */}
      {/* 2. 3-COLUMN SPLIT WORKSPACE (Left: Modules, Center: Player, Right: Steps) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Module & Task Navigation Accordion (3 cols) */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-sm font-bold text-[#121c2a]">Course Tasks</h2>
            </div>

            {/* Quick Filter */}
            <div className="flex items-center gap-2 bg-[#eff4ff] px-3 py-1.5 rounded-xl border border-[#dee9fc]/70">
              <input
                className="bg-transparent border-none outline-none text-xs text-[#121c2a] w-full placeholder:text-[#777587]"
                placeholder="Filter tasks or topics..."
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            {/*  Tasks List */}
            <div className="flex flex-col gap-2 pt-1">
              {/* Unit 4 (Active Group) */}
              <div className="rounded-xl overflow-hidden bg-[#eff4ff]/60 border border-[#dee9fc]">
                <button
                  className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-[#121c2a] hover:bg-[#dee9fc]/50 transition-colors"
                  // onClick={() => toggleAccordion("unit4")}
                  type="button"
                >
                  <span className="truncate text-[#3525cd]">
                    Unit 4: Reaction Mechanisms
                  </span>
                </button>
              </div>

              {/* Unit 5 Collapsible */}
              <div className="rounded-xl overflow-hidden bg-white border border-[#dee9fc]/70">
                <button
                  className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-[#121c2a] hover:bg-[#eff4ff]"
                  // onClick={() => toggleAccordion("unit5")}
                  type="button"
                >
                  <span className="truncate">Unit 5: Coordination Chem</span>
                </button>
              </div>

              {/* Unit 6 Collapsible */}
              <div className="rounded-xl overflow-hidden bg-white border border-[#dee9fc]/70">
                <button
                  className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-[#121c2a] hover:bg-[#eff4ff]"
                  // onClick={() => toggleAccordion("unit6")}
                  type="button"
                >
                  <span className="truncate">Unit 6: Thermodynamics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Ace AI Coach Card */}
          <div className="bg-gradient-to-br from-[#3525cd] to-[#712ae2] text-white rounded-2xl p-4 shadow-sm relative overflow-hidden space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Ace AI Coach Active
              </span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Reaction mechanisms test weightage is 14% in JEE Advanced. You
              solved 8/10 enolate questions accurately this week!
            </p>
            <button
              onClick={() => navigate("/app/tests")}
              className="px-3 py-1.5 rounded-lg bg-white text-[#3525cd] text-xs font-bold hover:shadow transition-all"
              type="button"
            >
              Generate Quick Practice Set
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN: Main Content & Video Player (6 cols) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          {/* ========================================================================= */}
          {/* 1. TOP HEADER SUB-BAR / ACTIVE TASK BANNER                                */}
          {/* ========================================================================= */}
          <header className="w-full bg-white rounded-2xl shadow-xs border border-[#dee9fc] p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Breadcrumb & Task Metadata */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xs font-bold text-[#121c2a] truncate">
                    Task: Advanced Organic Reaction Mechanisms & Stereochemistry
                    Drill
                  </h1>
                </div>
              </div>

              {/* Quick Metrics & Primary Action */}
              <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                <button
                  onClick={() => navigate("/app/tasks")}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-semibold shadow-md shadow-[#3525cd]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  type="button"
                >
                  + Create
                </button>
              </div>
            </div>
          </header>
          {/* Video Player Card */}
          <section className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] overflow-hidden flex flex-col">
            {/* Simulated 16:9 Player Viewport */}
            <div className="relative w-full aspect-video bg-gray-950 flex items-center justify-center overflow-hidden group select-none">
              {/* Mechanism Board Canvas */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6">
                <svg
                  className="w-full h-full max-h-64 opacity-90 text-indigo-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 720 340"
                >
                  <g
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
                    {/* Molecule 1 */}
                    <path d="M 60 170 L 110 140 L 160 170" />
                    <path d="M 106 140 L 106 80" strokeWidth="3" />
                    <path d="M 114 140 L 114 80" strokeWidth="3" />
                    <text
                      className="font-mono text-sm font-bold"
                      fill="currentColor"
                      stroke="none"
                      x="100"
                      y="70"
                    >
                      O
                    </text>
                    <text
                      className="font-mono text-xs"
                      fill="currentColor"
                      stroke="none"
                      x="35"
                      y="180"
                    >
                      H₃C
                    </text>
                    <text
                      className="font-mono text-xs"
                      fill="currentColor"
                      stroke="none"
                      x="165"
                      y="180"
                    >
                      H
                    </text>

                    {/* Curly arrow & Base abstraction */}
                    <path
                      d="M 180 160 Q 230 110 270 140"
                      stroke="#f43f5e"
                      strokeDasharray="4 2"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="210"
                      cy="115"
                      fill="rgba(244,63,94,0.15)"
                      r="16"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                    />
                    <text
                      className="font-mono text-[11px] font-bold"
                      fill="#f43f5e"
                      stroke="none"
                      x="200"
                      y="120"
                    >
                      B:⁻
                    </text>

                    {/* Molecule 2 Enolate */}
                    <path d="M 310 170 L 360 140 L 410 170" />
                    <path d="M 358 140 L 358 85" strokeWidth="2" />
                    <text
                      className="font-mono text-sm font-bold"
                      fill="currentColor"
                      stroke="none"
                      x="350"
                      y="75"
                    >
                      O⁻
                    </text>
                    <path
                      d="M 365 145 L 405 170"
                      stroke="#a78bfa"
                      strokeWidth="3"
                    />
                    <text
                      className="font-mono text-xs"
                      fill="currentColor"
                      stroke="none"
                      x="290"
                      y="180"
                    >
                      H₂C
                    </text>
                    <text
                      className="font-mono text-xs"
                      fill="currentColor"
                      stroke="none"
                      x="415"
                      y="180"
                    >
                      H
                    </text>

                    {/* Product */}
                    <path d="M 520 170 L 560 140 L 600 170 L 640 140 L 680 170" />
                    <path d="M 560 140 L 560 90" strokeWidth="2.5" />
                    <text
                      className="font-mono text-xs font-bold"
                      fill="#34d399"
                      stroke="none"
                      x="550"
                      y="80"
                    >
                      OH
                    </text>
                    <path d="M 637 140 L 637 90" strokeWidth="3" />
                    <path d="M 643 140 L 643 90" strokeWidth="3" />
                    <text
                      className="font-mono text-sm font-bold"
                      fill="currentColor"
                      stroke="none"
                      x="632"
                      y="80"
                    >
                      O
                    </text>
                    <text
                      className="font-mono text-xs"
                      fill="currentColor"
                      stroke="none"
                      x="685"
                      y="175"
                    >
                      H
                    </text>
                  </g>
                  <rect
                    fill="rgba(15,23,42,0.85)"
                    height="44"
                    rx="8"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    width="310"
                    x="220"
                    y="245"
                  />
                  <text
                    className="font-mono text-[12px] font-semibold"
                    fill="#e0e7ff"
                    stroke="none"
                    x="235"
                    y="272"
                  >
                    Step 2: Nucleophilic enolate attack on C=O
                  </text>
                </svg>
              </div>

              {/* Central Play/Pause Control */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-[#3525cd]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs hover:scale-110 active:scale-95 transition-all z-10"
                type="button"
              >
                {isPlaying ? (
                  <IconPause className="w-6 h-6" />
                ) : (
                  <IconPlay className="w-6 h-6 ml-0.5" />
                )}
              </button>

              {/* Floating AI Query Button */}
              <button
                onClick={() =>
                  navigate(
                    "/app/chat?prompt=" +
                      encodeURIComponent(
                        "Explain step 2: Aldol Enolate mechanism at timestamp 12:48",
                      ),
                  )
                }
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 hover:bg-[#3525cd] text-white px-3 py-1 rounded-full text-xs backdrop-blur-md transition-all shadow-md"
                type="button"
              >
                <span>Ask Ace AI about timestamp 12:48</span>
                <IconArrowRight className="w-3 h-3" />
              </button>

              {/* Bottom Video Scrubbing Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col gap-1.5 z-10 text-white">
                <div className="relative w-full h-1 bg-white/30 rounded-full cursor-pointer flex items-center">
                  <div
                    className="h-full bg-[#4f46e5] rounded-full relative"
                    style={{ width: "52.8%" }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
                  <span>12:48 / 24:15</span>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      1080p 60fps
                    </span>
                    <span className="hover:text-white cursor-pointer">
                      1.25x
                    </span>
                    <span className="text-[#3525cd] bg-white px-1 py-0.2 rounded font-bold text-[10px]">
                      CC ON
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#eff4ff]/60 border-b border-[#dee9fc] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shrink-0">
                  <IconPlay className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[#3525cd] font-bold uppercase tracking-wider">
                    Step {activeStep} of 4 • Lecture 4.2
                  </span>
                  <h2 className="text-xs font-bold text-[#121c2a] truncate">
                    Aldol Condensation & Enolate Chemistry (Acid vs. Base
                    Catalysis)
                  </h2>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                <span className="text-xs font-bold text-[#121c2a]">
                  Dr. K. Raman
                </span>
                <span className="text-[10px] text-[#777587]">
                  IIT Bombay • Chemistry
                </span>
              </div>
            </div>
          </section>

          {/* TABBED LEARNING HUB */}
          <section className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] p-5 flex flex-col gap-4">
            {/* Tab Navigation */}
            <nav className="flex items-center gap-1.5 border-b border-[#dee9fc]/70 pb-3 overflow-x-auto text-xs font-bold">
              {[
                "Description",
                "Transcript & Timestamps",
                "Tests",
                "Materials",
              ].map((tabLabel, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === idx
                      ? "bg-[#3525cd] text-white shadow-xs"
                      : "text-[#464555] hover:text-[#121c2a] hover:bg-[#eff4ff]"
                  }`}
                  type="button"
                >
                  {tabLabel}
                </button>
              ))}
            </nav>

            {/* TAB CONTENT: Course Materials (Active index 3) */}
            {activeTab === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#121c2a]">
                      Course Assets, Textbooks & Materials
                    </h3>
                    <p className="text-xs text-[#464555]">
                      Downloadable handwritten notes and reference
                      chapters[cite: 8, 23].
                    </p>
                  </div>
                  <span className="text-xs text-[#777587]">4 Assets Ready</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: NCERT Standard PDF */}
                  <div className="bg-[#eff4ff]/60 border border-[#dee9fc] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
                          PDF
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-[10px] text-[#464555] font-semibold border border-[#dee9fc]">
                          NCERT Standard
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#121c2a] line-clamp-2">
                        NCERT Chemistry Class 12 - Chapter 12: Aldehydes &
                        Ketones
                      </h4>
                      <p className="text-[10px] text-[#777587]">
                        8.4 MB • 42 Pages • Exercises Included
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[#dee9fc]/60 text-xs">
                      <button
                        onClick={() =>
                          alert(
                            "Opening preview for NCERT Class 12 Chemistry...",
                          )
                        }
                        className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-gray-50 text-[#3525cd] font-semibold border border-[#dee9fc] flex items-center justify-center gap-1 shadow-2xs"
                        type="button"
                      >
                        <IconVisibility />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => alert("Downloading NCERT PDF...")}
                        className="p-1.5 rounded-lg bg-white hover:bg-[#3525cd] hover:text-white text-[#464555] border border-[#dee9fc]"
                        title="Download PDF"
                        type="button"
                      >
                        <IconDownload />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Peter Sykes Annotated */}
                  <div className="bg-[#eff4ff]/60 border border-[#dee9fc] rounded-2xl p-4 flex flex-col justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="w-8 h-8 rounded-lg bg-indigo-100 text-[#3525cd] text-xs font-bold flex items-center justify-center">
                          PDF
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3525cd] text-[10px] font-bold">
                          Faculty Annotated
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#121c2a] line-clamp-2">
                        Peter Sykes: Mechanism in Organic Chemistry (Annotated)
                      </h4>
                      <p className="text-[10px] text-[#777587]">
                        14.2 MB • JEE Adv Focus • Prof. Raman Notes
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[#dee9fc]/60 text-xs">
                      <button
                        onClick={() =>
                          alert("Opening Peter Sykes annotated notes...")
                        }
                        className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-gray-50 text-[#3525cd] font-semibold border border-[#dee9fc] flex items-center justify-center gap-1 shadow-2xs"
                        type="button"
                      >
                        <IconVisibility />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => alert("Downloading Peter Sykes PDF...")}
                        className="p-1.5 rounded-lg bg-white hover:bg-[#3525cd] hover:text-white text-[#464555] border border-[#dee9fc]"
                        title="Download PDF"
                        type="button"
                      >
                        <IconDownload />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Description (Index 0) */}
            {activeTab === 0 && (
              <div className="text-xs text-[#464555] space-y-2 leading-relaxed">
                <h4 className="font-bold text-[#121c2a]">Lecture Summary</h4>
                <p>
                  This module investigates nucleophilic addition-elimination
                  mechanisms occurring in basic and acidic media. High weightage
                  in JEE Advanced and university semester exam papers.
                </p>
              </div>
            )}

            {/* TAB CONTENT: Transcript & Timestamps (Index 1) */}
            {activeTab === 1 && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 hover:bg-[#eff4ff] rounded-lg cursor-pointer">
                  <span className="font-mono text-[#3525cd] font-bold bg-[#e2dfff] px-1.5 py-0.5 rounded text-[10px]">
                    [04:15]
                  </span>
                  <span>Proton abstraction by hydroxide ion</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#eff4ff] rounded-lg cursor-pointer">
                  <span className="font-mono text-[#3525cd] font-bold bg-[#e2dfff] px-1.5 py-0.5 rounded text-[10px]">
                    [08:30]
                  </span>
                  <span>Resonance stabilization of enolate intermediate</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#eff4ff] rounded-lg cursor-pointer">
                  <span className="font-mono text-[#3525cd] font-bold bg-[#e2dfff] px-1.5 py-0.5 rounded text-[10px]">
                    [14:20]
                  </span>
                  <span>Dehydration to α,β-unsaturated carbonyls</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: All Tests (Index 2) */}
            {activeTab === 2 && (
              <div className="p-4 bg-[#eff4ff] rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#121c2a]">
                    Aldol Mechanism Speed Drill
                  </h4>
                  <p className="text-gray-500 text-[11px]">
                    15 MCQ Questions • 20 mins timer
                  </p>
                </div>
                <button
                  onClick={() => navigate("/app/tests")}
                  className="px-4 py-2 bg-[#712ae2] hover:bg-[#5a00c6] text-white font-semibold rounded-xl"
                  type="button"
                >
                  Start Test Now
                </button>
              </div>
            )}
          </section>

          {/* Step Progression Bottom Bar */}
          <nav className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#dee9fc] hover:bg-[#eff4ff] text-xs font-semibold text-[#121c2a] transition-all w-full sm:w-auto justify-center"
            >
              <IconArrowLeft />
              <span>Previous Step</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold shadow-md shadow-[#3525cd]/20 transition-all"
              >
                <span>Next Step: Intramolecular Aldol</span>
                <IconArrowRight />
              </button>
            </div>
          </nav>
        </main>

        {/* RIGHT COLUMN: Step Navigation Mini-Stepper (3 cols) */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] py-4 flex flex-col gap-4 items-center">
            {/* Stepper Pipeline */}
            <div className="py-2 flex justify-center">
              <div className="relative flex flex-col items-center gap-5 w-full max-w-[210px]">
                {/* Vertical Bar */}
                <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-[#dee9fc]"></div>
                <div
                  className="absolute top-4 left-4 w-0.5 bg-[#3525cd] transition-all duration-300"
                  style={{ height: `${((activeStep - 1) / 3) * 100}%` }}
                ></div>

                {stepsList.map((step) => {
                  const isCurrent = activeStep === step.num;
                  const isDone = activeStep > step.num;

                  return (
                    <div
                      key={step.num}
                      onClick={() => setActiveStep(step.num)}
                      className="relative z-10 flex items-center justify-between w-full group cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-all ${
                          isDone
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                              ? "bg-[#3525cd] text-white ring-4 ring-[#e2dfff]"
                              : "bg-[#d9e3f6] text-[#464555]"
                        }`}
                      >
                        {isDone ? (
                          <IconCheck className="w-3.5 h-3.5" />
                        ) : (
                          step.num
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
