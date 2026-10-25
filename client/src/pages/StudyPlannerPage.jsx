import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconCalendar,
  IconClock,
  IconSparkle,
  IconCheck,
  IconZap,
  IconTimer,
} from "../components/common/Icons";
import {
  toggleSlotStatus,
  setFullSchedule,
} from "../store/slices/plannerSlice";

export default function StudyPlannerPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const scheduleDays = useSelector((state) => state.planner.days);
  const testHistory = useSelector((state) => state.tests.history);

  const [isGenerating, setIsGenerating] = useState(false);
  const [activePomodoro, setActivePomodoro] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [successBanner, setSuccessBanner] = useState("");

  const targetExam = user?.exam_target || "JEE Advanced";
  const dailyGoalHours = user?.daily_goal_hours || 5;

  // Simple Pomodoro timer
  React.useEffect(() => {
    let interval = null;
    if (activePomodoro && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((sec) => sec - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setActivePomodoro(false);
      alert("Pomodoro Study Sprint Completed! Take a 5-minute break.");
    }
    return () => clearInterval(interval);
  }, [activePomodoro, pomodoroSeconds]);

  const formatPomoTime = () => {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Trigger AI schedule generation based on past test attempts & weak topics
  const handleGenerateAIPlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Collect detected weak topics from Redux test history
      const detectedWeakSpots = testHistory.flatMap((h) => h.weak_topics || []);
      const primaryFocus =
        detectedWeakSpots[0] || "Calculus Indefinite Integrals";

      const updatedSchedule = [
        {
          day: "Monday",
          slots: [
            {
              id: "s-101",
              time: "06:00 - 08:00 AM",
              subject: "Mathematics",
              topic: `${primaryFocus} (High Priority Revision)`,
              status: "pending",
            },
            {
              id: "s-102",
              time: "04:00 - 06:00 PM",
              subject: "Physics",
              topic: "Wave Optics Numericals & Mocks",
              status: "pending",
            },
            {
              id: "s-103",
              time: "08:00 - 09:00 PM",
              subject: "Chemistry",
              topic: "Aldol Mechanism Flashcards",
              status: "pending",
            },
          ],
        },
        {
          day: "Tuesday",
          slots: [
            {
              id: "s-104",
              time: "06:00 - 08:30 AM",
              subject: "Physics",
              topic: "Gauss Law & Electrostatics PYQ Set",
              status: "pending",
            },
            {
              id: "s-105",
              time: "05:00 - 07:00 PM",
              subject: "Mathematics",
              topic: "Definite Integrals Diagnostics Review",
              status: "pending",
            },
          ],
        },
        {
          day: "Wednesday",
          slots: [
            {
              id: "s-106",
              time: "06:00 - 08:00 AM",
              subject: "Chemistry",
              topic: "Coordination Compounds & Named Reactions",
              status: "pending",
            },
            {
              id: "s-107",
              time: "04:30 - 07:00 PM",
              subject: "Full Mock",
              topic: "3-Hour Timed Diagnostic Exam",
              status: "pending",
            },
          ],
        },
      ];

      dispatch(setFullSchedule(updatedSchedule));
      setIsGenerating(false);
      setSuccessBanner(
        `Ace AI has recalibrated your timetable for ${targetExam} prioritizing: ${primaryFocus}`,
      );
      setTimeout(() => setSuccessBanner(""), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-['Inter',sans-serif] text-[#121c2a]">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] rounded-3xl text-white shadow-xl shadow-[#3525cd]/15">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold">
            <IconSparkle className="w-3.5 h-3.5" />
            <span>AI Schedule Engine • SATMS v3.0</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Adaptive Timetable & Study Planner
          </h1>
          <p className="text-xs text-indigo-100">
            Target Exam: {targetExam} • Daily Commitment: {dailyGoalHours}{" "}
            Hours/Day
          </p>
        </div>

        <button
          onClick={handleGenerateAIPlan}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-white text-[#3525cd] text-xs font-bold shadow-md hover:bg-[#eff4ff] transition-all disabled:opacity-50 self-start sm:self-auto flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <IconSparkle className="w-4 h-4 text-[#3525cd]" />
          <span>
            {isGenerating
              ? "Synthesizing Timetable..."
              : "Regenerate Plan with AI"}
          </span>
        </button>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="p-3.5 bg-[#eff4ff] border border-[#3525cd]/30 text-[#3525cd] text-xs font-semibold rounded-2xl flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-[#3525cd]" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* 2. Pomodoro Focus Sprint Widget & Adherence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pomodoro Timer */}
        <div className="p-5 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#121c2a] flex items-center gap-1.5">
              <IconTimer className="w-4 h-4 text-[#3525cd]" />
              <span>Study Sprint Timer</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#3525cd]">
              25m Focus
            </span>
          </div>
          <div className="text-center py-2">
            <span className="text-3xl font-extrabold font-mono text-[#3525cd]">
              {formatPomoTime()}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActivePomodoro(!activePomodoro)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                activePomodoro
                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                  : "bg-[#3525cd] text-white hover:bg-[#2c1ea8]"
              }`}
            >
              {activePomodoro ? "Pause" : "Start Sprint"}
            </button>
            <button
              onClick={() => {
                setActivePomodoro(false);
                setPomodoroSeconds(25 * 60);
              }}
              className="px-3 py-1.5 rounded-xl bg-gray-100 text-[#464555] text-xs font-semibold cursor-pointer hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Adherence Rate */}
        <div className="p-5 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#121c2a]">
              Schedule Adherence
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              On Track
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span>Goal Progress</span>
              <span className="text-[#3525cd]">78%</span>
            </div>
            <div className="w-full h-2 bg-[#dee9fc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3525cd] rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
          <p className="text-[11px] text-[#464555]">
            14 of 18 planned study sessions completed this week.
          </p>
        </div>

        {/* AI Calibration Strategy */}
        <div className="p-5 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold text-[#121c2a] flex items-center gap-1.5">
            <IconZap className="w-4 h-4 text-amber-500" />
            <span>AI Priority Allocation</span>
          </span>
          <p className="text-xs text-[#464555] leading-relaxed">
            Time slots are balanced 45% Mathematics, 35% Physics, and 20%
            Chemistry based on diagnostic quiz test results.
          </p>
          <span className="text-[10px] text-gray-400 font-mono">
            Last calibrated: Today, 08:30 AM
          </span>
        </div>
      </div>

      {/* 3. Week Schedule Display */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#121c2a]">
          Day-by-Day Study Schedule
        </h2>
        {scheduleDays.map((dayPlan, dayIdx) => (
          <div
            key={dayPlan.day}
            className="bg-white rounded-2xl border border-[#dee9fc] p-5 shadow-xs space-y-3"
          >
            <div className="flex justify-between items-center border-b border-[#dee9fc]/60 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#121c2a] flex items-center gap-2">
                <IconCalendar className="w-4 h-4 text-[#3525cd]" />
                <span>{dayPlan.day}</span>
              </h3>
              <span className="text-[11px] text-[#464555] font-semibold">
                {dayPlan.slots.length} Planned Sessions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dayPlan.slots.map((slot) => {
                const isDone = slot.status === "completed";
                return (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                      isDone
                        ? "bg-[#eff4ff]/40 border-emerald-200 opacity-70"
                        : "bg-[#f8f9ff] border-[#dee9fc] hover:shadow-xs"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-[#3525cd] bg-white px-2 py-0.5 rounded border border-[#dee9fc] font-mono">
                          {slot.time}
                        </span>
                        <span
                          className={`capitalize font-bold ${
                            isDone ? "text-emerald-700" : "text-amber-600"
                          }`}
                        >
                          {slot.status}
                        </span>
                      </div>
                      <h4
                        className={`text-xs font-bold leading-snug ${
                          isDone
                            ? "line-through text-gray-500"
                            : "text-[#121c2a]"
                        }`}
                      >
                        {slot.topic}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        {slot.subject}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          toggleSlotStatus({
                            dayIndex: dayIdx,
                            slotId: slot.id,
                          }),
                        )
                      }
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDone
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-[#3525cd] text-white hover:bg-[#2c1ea8]"
                      }`}
                    >
                      <IconCheck className="w-3.5 h-3.5" />
                      <span>
                        {isDone ? "Mark Incomplete" : "Check Off Session"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
