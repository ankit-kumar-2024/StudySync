import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  IconChecklist,
  IconBook,
  IconQuiz,
  IconSparkle,
  IconTrendingUp,
} from "../components/common/Icons";
import { updateTaskDeadline } from "../store/slices/tasksSlice";

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.items);
  const tests = useSelector((state) => state.tests.availableTests);
  const resources = useSelector((state) => state.resources.items);

  const [selectedTask, setSelectedTask] = useState(null);
  const [newDeadlineInput, setNewDeadlineInput] = useState("");

  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdownString = (isoString) => {
    const diff = new Date(isoString).getTime() - Date.now();
    if (diff <= 0) return "Overdue";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return hours > 24
      ? `${Math.floor(hours / 24)}d ${hours % 24}h left`
      : `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleUpdateDeadline = (e) => {
    e.preventDefault();
    if (!newDeadlineInput || !selectedTask) return;
    dispatch(
      updateTaskDeadline({
        id: selectedTask.id,
        deadline: new Date(newDeadlineInput).toISOString(),
      }),
    );
    setSelectedTask(null);
  };

  const aiPrompts = [
    "Explain Calculus Chapter 7 PYQ",
    "Generate 7-day revision plan",
    "Show my weak Physics topics",
  ];

  return (
    <div className="space-y-6 sm:space-y-10 w-full pb-12 font-['Inter',sans-serif] text-[#121c2a]">
      {/* 1. Hero AI Section */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#3525cd] via-[#4338ca] to-[#712ae2] p-4 sm:p-6 md:p-8 text-white shadow-xl shadow-[#3525cd]/15 overflow-hidden">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[10px] sm:text-[11px] font-semibold">
            <IconSparkle className="w-3.5 h-3.5 shrink-0" />
            <span>SATMS Ace AI Assistant</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            How can Ace accelerate your prep today?
          </h1>

          <div
            onClick={() => navigate("/app/chat")}
            className="flex items-center w-full bg-white text-[#121c2a] rounded-2xl p-2 sm:p-2.5 shadow-lg cursor-pointer hover:ring-4 hover:ring-white/20 transition-all gap-2"
          >
            <div className="pl-2 sm:pl-3 text-[#3525cd] shrink-0">
              <IconSparkle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Ask anything or search your notes, PYQs..."
              className="w-full bg-transparent text-xs sm:text-sm focus:outline-none cursor-pointer placeholder:text-gray-400 min-w-0"
            />
            <button
              type="button"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#3525cd] text-white text-xs font-semibold shrink-0 cursor-pointer"
            >
              Ask Ace
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-indigo-200 text-[10px] sm:text-[11px]">
              Suggested:
            </span>
            {aiPrompts.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  navigate(`/app/chat?prompt=${encodeURIComponent(chip)}`)
                }
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/25 text-[10px] sm:text-[11px] transition-all cursor-pointer truncate max-w-full"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Tasks Due Soon */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <IconChecklist className="w-5 h-5 text-[#3525cd] shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-[#121c2a] truncate">
              Tasks Due Soon
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => navigate("/app/tasks")}
              className="px-3 py-1.5 rounded-xl bg-[#3525cd] text-white text-xs font-semibold shadow-xs cursor-pointer hover:bg-[#2c1ea8]"
            >
              + Create
            </button>
            <button
              onClick={() => navigate("/app/tasks")}
              className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>

        {/* Responsive Horizontal Scroll Container */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTask(task);
                setNewDeadlineInput(task.deadline.slice(0, 16));
              }}
              className="shrink-0 w-60 sm:w-64 bg-white rounded-2xl border border-[#dee9fc] p-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#3525cd]">
                    {task.subject}
                  </span>
                  <span
                    className={
                      task.priority === "high"
                        ? "text-[#ba1a1a]"
                        : "text-[#3525cd]"
                    }
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#121c2a] line-clamp-2 leading-snug">
                  {task.title}
                </h3>
              </div>
              <div className="pt-3 mt-3 border-t border-[#dee9fc]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] sm:text-[11px] text-[#ba1a1a] font-bold">
                  {getCountdownString(task.deadline)}
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans text-[#3525cd] font-bold">
                  {task.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Resource Vault Shortcuts */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconBook className="w-5 h-5 text-[#712ae2] shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-[#121c2a]">
              Resource & Practice Vault
            </h2>
          </div>
          <button
            onClick={() => navigate("/app/books")}
            className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div
            onClick={() => navigate("/app/books")}
            className="p-4 bg-white rounded-2xl border border-[#dee9fc] cursor-pointer hover:shadow-md transition-all"
          >
            <div className="aspect-video rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#6366f1] p-3 flex flex-col justify-between text-white">
              <IconBook className="w-6 h-6" />
              <span className="text-xs font-bold">
                Textbooks & PYQs ({resources.length} Vault Items)
              </span>
            </div>
            <h3 className="text-xs font-bold mt-2">Books & Archive Sheets</h3>
          </div>

          <div
            onClick={() => navigate("/app/tests")}
            className="p-4 bg-white rounded-2xl border border-[#dee9fc] cursor-pointer hover:shadow-md transition-all"
          >
            <div className="aspect-video rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] p-3 flex flex-col justify-between text-white">
              <IconQuiz className="w-6 h-6" />
              <span className="text-xs font-bold">
                Timed Mock Papers ({tests.length} tests ready)
              </span>
            </div>
            <h3 className="text-xs font-bold mt-2">Exam Practice Vault</h3>
          </div>

          <div
            onClick={() => navigate("/app/planner")}
            className="p-4 bg-white rounded-2xl border border-[#dee9fc] cursor-pointer hover:shadow-md transition-all sm:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video rounded-xl bg-gradient-to-tr from-[#712ae2] to-[#a855f7] p-3 flex flex-col justify-between text-white">
              <IconSparkle className="w-6 h-6" />
              <span className="text-xs font-bold">AI Timetable Planner</span>
            </div>
            <h3 className="text-xs font-bold mt-2">Schedule & Time Slots</h3>
          </div>
        </div>
      </section>

      {/* 4. Completion Progress */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <IconTrendingUp className="w-5 h-5 text-[#10b981] shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-[#121c2a]">
            Completion Progress
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-2xl border border-[#dee9fc] space-y-2"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#121c2a] truncate mr-2">
                  {task.title}
                </span>
                <span className="font-bold text-[#3525cd]">
                  {task.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#dee9fc] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3525cd] rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Deadline Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-xl border border-[#dee9fc]">
            <h3 className="text-sm font-bold text-[#121c2a]">
              Change Task Deadline
            </h3>
            <p className="text-xs text-[#464555] truncate">
              {selectedTask.title}
            </p>
            <input
              type="datetime-local"
              value={newDeadlineInput}
              onChange={(e) => setNewDeadlineInput(e.target.value)}
              className="w-full p-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-3.5 py-1.5 rounded-xl bg-gray-100 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDeadline}
                className="px-4 py-1.5 rounded-xl bg-[#3525cd] text-white font-bold cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
