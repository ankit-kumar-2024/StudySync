import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckSquare,
  BookOpen,
  HelpCircle,
  Sparkles,
  TrendingUp,
  PlayCircle,
  Clock,
} from "lucide-react";
import { updateTaskDeadline } from "../store/slices/tasksSlice";

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.tasks.items);
  const testHistory = useSelector((state) => state.tests.history);
  const resources = useSelector((state) => state.resources.items);

  const savedCourses = resources.filter(
    (r) => r.file_type?.toLowerCase() === "course" || r.courseData,
  );

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

  const handleUpdateDeadline = async (e) => {
    e.preventDefault();
    if (!newDeadlineInput || !selectedTask) return;
    const deadlineIso = new Date(newDeadlineInput).toISOString();
    dispatch(
      updateTaskDeadline({ id: selectedTask.id, deadline: deadlineIso }),
    );
    setSelectedTask(null);

    await fetch(`http://localhost:5000/api/tasks/${selectedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deadline: deadlineIso }),
    });
  };

  return (
    <div className="space-y-8 w-full pb-12 font-['Inter',sans-serif] text-slate-100">
      {/* Hero Sync AI Course Builder Banner */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] border border-indigo-500/30 p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync AI Course & Exam Architect</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Build a complete course with Sync AI in 5 guided questions.
          </h1>

          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Tell Sync AI your course title, topics, and deadline—it
            automatically generates 1 YouTube lecture, 1 PDF book, and 1 dynamic
            50-question practice test per topic.
          </p>

          <div
            onClick={() => navigate("/app/chat")}
            className="flex items-center w-full bg-[#0B0F17] border border-slate-700 hover:border-indigo-400 rounded-2xl p-2.5 shadow-lg cursor-pointer transition-all gap-2"
          >
            <div className="pl-2 text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Click here to start the 5-step Sync AI Course Builder..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none cursor-pointer placeholder:text-slate-500"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 cursor-pointer"
            >
              Launch Sync AI
            </button>
          </div>
        </div>
      </section>

      {/* Quick Vault Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate("/app/books")}
          className="p-5 bg-[#121824] border border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Books & PDF Vault</h3>
          <p className="text-xs text-slate-400">
            {resources.length} study materials ready
          </p>
        </div>

        <div
          onClick={() => navigate("/app/videos")}
          className="p-5 bg-[#121824] border border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <PlayCircle className="w-6 h-6 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Video Lectures</h3>
          <p className="text-xs text-slate-400">
            Watch in-app with unified watch UI
          </p>
        </div>

        <div
          onClick={() => navigate("/app/tests")}
          className="p-5 bg-[#121824] border border-slate-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <HelpCircle className="w-6 h-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">50-Q Practice Tests</h3>
          <p className="text-xs text-slate-400">
            {testHistory.length} attempts recorded
          </p>
        </div>

        <div
          onClick={() => navigate("/app/planner")}
          className="p-5 bg-[#121824] border border-slate-800 hover:border-amber-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <Clock className="w-6 h-6 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Course Deadlines</h3>
          <p className="text-xs text-slate-400">
            {savedCourses.length} courses tracked
          </p>
        </div>
      </section>

      {/* Tasks Due Soon */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Tasks Due Soon</h2>
          </div>
          <button
            onClick={() => navigate("/app/tasks")}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
          >
            + Manage Tasks
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {tasks.length === 0 ? (
            <div className="p-6 bg-[#121824] rounded-2xl border border-slate-800 text-xs text-slate-400 w-full text-center">
              No tasks scheduled yet.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setNewDeadlineInput(task.deadline.slice(0, 16));
                }}
                className="shrink-0 w-64 bg-[#121824] rounded-2xl border border-slate-800 hover:border-indigo-500/40 p-4 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                      {task.subject}
                    </span>
                    <span
                      className={
                        task.priority === "high"
                          ? "text-rose-400"
                          : "text-cyan-400"
                      }
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-2">
                    {task.title}
                  </h3>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-rose-400 font-bold">
                    {getCountdownString(task.deadline)}
                  </span>
                  <span className="text-[11px] font-sans text-indigo-400 font-bold">
                    {task.progress}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {testHistory.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Recent 50-Q Test Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testHistory.slice(0, 3).map((att) => (
              <div
                key={att.attempt_id}
                onClick={() => navigate("/app/tests")}
                className="p-4 bg-[#121824] rounded-2xl border border-slate-800 space-y-2 cursor-pointer hover:border-emerald-500/40"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white truncate mr-2">
                    {att.title || att.test_id}
                  </span>
                  <span className="font-bold text-emerald-400">
                    {att.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${att.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">
              Change Task Deadline
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {selectedTask.title}
            </p>
            <input
              type="datetime-local"
              value={newDeadlineInput}
              onChange={(e) => setNewDeadlineInput(e.target.value)}
              className="w-full p-2.5 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDeadline}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
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
