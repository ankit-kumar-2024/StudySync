import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoLessonPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(3);
  const [searchFilter, setSearchFilter] = useState("");

  const stepsList = [
    { num: 1, duration: "18 min", status: "completed" },
    { num: 2, duration: "24 min", status: "active" },
    { num: 3, duration: "20 min", status: "pending" },
    { num: 4, duration: "25 min", status: "pending" },
  ];

  return (
    <div className="flex flex-col w-full font-['Inter',sans-serif] text-[#121c2a] space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Course Topics */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] p-4 flex flex-col gap-3">
            <h2 className="text-sm font-bold text-[#121c2a]">Course Lessons</h2>
            <div className="flex items-center gap-2 bg-[#eff4ff] px-3 py-1.5 rounded-xl border border-[#dee9fc]/70">
              <input
                className="bg-transparent border-none outline-none text-xs text-[#121c2a] w-full"
                placeholder="Filter topics..."
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <button className="w-full text-left p-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc] font-bold text-[#3525cd]">
                Unit 4: Reaction Mechanisms
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-white border border-[#dee9fc]/70 font-semibold text-[#121c2a] hover:bg-[#eff4ff]">
                Unit 5: Coordination Chemistry
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-white border border-[#dee9fc]/70 font-semibold text-[#121c2a] hover:bg-[#eff4ff]">
                Unit 6: Thermodynamics
              </button>
            </div>
          </div>
        </aside>

        {/* Center Column: Video Player Canvas */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          <section className="bg-white rounded-2xl shadow-xs border border-[#dee9fc] overflow-hidden flex flex-col">
            <div className="relative w-full aspect-video bg-gray-950 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6 text-indigo-300">
                <svg
                  className="w-full h-full max-h-64 opacity-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 720 340"
                >
                  <g
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
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
                    <path d="M 310 170 L 360 140 L 410 170" />
                    <text
                      className="font-mono text-sm font-bold"
                      fill="currentColor"
                      stroke="none"
                      x="350"
                      y="75"
                    >
                      O⁻
                    </text>
                  </g>
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

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-[#3525cd]/90 text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all z-10"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            <div className="p-4 bg-[#eff4ff]/60 border-b border-[#dee9fc] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#3525cd] font-bold uppercase tracking-wider">
                  Step {activeStep} of 4 • Lecture 4.2
                </span>
                <h2 className="text-xs font-bold text-[#121c2a]">
                  Aldol Condensation & Enolate Chemistry (Acid vs. Base
                  Catalysis)
                </h2>
              </div>
              <span className="text-xs font-bold text-[#121c2a]">
                Dr. K. Raman • IIT Bombay
              </span>
            </div>
          </section>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#dee9fc]">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl border border-[#dee9fc] text-xs font-semibold hover:bg-[#eff4ff] cursor-pointer"
            >
              Previous Step
            </button>
            <span className="text-xs font-bold text-[#3525cd]">
              Active Step: {activeStep} / 4
            </span>
            <button
              onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
              className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
