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
  FileText,
  ArrowRight,
} from "lucide-react";
import { updateTaskDeadline } from "../store/slices/tasksSlice";

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.tasks.items);
  const availableTests = useSelector((state) => state.tests.availableTests);
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
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
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
    <div className="space-y-8 w-full pb-12 text-slate-100">
      {/* Sync AI Command Hero */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] border border-indigo-500/30 p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Welcome back, {user?.name || "Student"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            What would you like Sync AI to create today?
          </h1>

          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Ask any doubt freely, generate a repeatable shuffled practice test,
            get PDF/code homework solutions, or build a complete course with
            video lectures, PDF books & deadlines.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => navigate("/app/chat")}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" /> Open Sync AI Agent{" "}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Workspace Status Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate("/app/books")}
          className="p-5 bg-[#0F1624] border border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Books & PDFs</h3>
          <p className="text-xs text-slate-400">
            {resources.length === 0
              ? "Empty — create via Sync AI"
              : `${resources.length} items in vault`}
          </p>
        </div>

        <div
          onClick={() => navigate("/app/videos")}
          className="p-5 bg-[#0F1624] border border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <PlayCircle className="w-6 h-6 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Video Lectures</h3>
          <p className="text-xs text-slate-400">
            {savedCourses.length === 0
              ? "No course videos yet"
              : `${savedCourses.length} active video courses`}
          </p>
        </div>

        <div
          onClick={() => navigate("/app/tests")}
          className="p-5 bg-[#0F1624] border border-slate-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <HelpCircle className="w-6 h-6 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Practice Tests</h3>
          <p className="text-xs text-slate-400">
            {availableTests.length === 0
              ? "No tests created yet"
              : `${availableTests.length} repeatable tests`}
          </p>
        </div>

        <div
          onClick={() => navigate("/app/planner")}
          className="p-5 bg-[#0F1624] border border-slate-800 hover:border-amber-500/50 rounded-2xl cursor-pointer transition-all space-y-2"
        >
          <Clock className="w-6 h-6 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Study Planner</h3>
          <p className="text-xs text-slate-400">
            {savedCourses.length === 0
              ? "No active deadlines"
              : `${savedCourses.length} courses tracked`}
          </p>
        </div>
      </section>

      {/* Active Courses Overview (Only shows when created via Sync AI) */}
      {savedCourses.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Active Sync AI Courses
            </h2>
            <button
              type="button"
              onClick={() => navigate("/app/planner")}
              className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
            >
              Track Progress →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedCourses.map((course) => {
              const total = course.courseData?.modules?.length || 1;
              const done = (course.completedModules || []).length;
              const pct = Math.min(100, Math.round((done / total) * 100));
              return (
                <div
                  key={course.id}
                  onClick={() => navigate("/app/planner")}
                  className="p-5 bg-[#0F1624] border border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer space-y-3"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white truncate pr-3">
                      {course.title}
                    </span>
                    <span className="text-cyan-400 font-bold shrink-0">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {done}/{total} Topics Completed • Target:{" "}
                    {course.timeBoundLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tasks Section */}
      {tasks.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Tasks Due Soon</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/app/tasks")}
              className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setNewDeadlineInput(task.deadline.slice(0, 16));
                }}
                className="shrink-0 w-64 bg-[#0F1624] rounded-2xl border border-slate-800 hover:border-indigo-500/40 p-4 cursor-pointer flex flex-col justify-between"
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
            ))}
          </div>
        </section>
      )}

      {/* Recent Test Attempts */}
      {testHistory.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Recent Practice Test Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testHistory.slice(0, 3).map((att) => (
              <div
                key={att.attempt_id}
                onClick={() => navigate("/app/tests")}
                className="p-4 bg-[#0F1624] rounded-2xl border border-slate-800 space-y-2 cursor-pointer hover:border-emerald-500/40"
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
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F1624] border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
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
              className="w-full p-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-xs text-white"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
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
