import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flame, BookOpen, Clock, Sparkles, ArrowUpRight } from "lucide-react";

export default function RightSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.items);
  const resources = useSelector((state) => state.resources.items);
  const testHistory = useSelector((state) => state.tests.history);

  const urgentTasks = tasks.filter((t) => t.status === "pending").slice(0, 3);
  const savedCourses = resources.filter(
    (r) => r.file_type?.toLowerCase() === "course" || r.courseData,
  );
  const dailyGoal = user?.daily_goal_hours || 5;
  const avgScore = testHistory.length
    ? Math.round(
        testHistory.reduce((s, a) => s + a.percentage, 0) / testHistory.length,
      )
    : 0;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 xl:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-16 bottom-0 z-40 border-l border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur-xl transition-all duration-300 ease-out overflow-hidden ${
          isOpen
            ? "w-80 translate-x-0"
            : "translate-x-full xl:translate-x-0 xl:w-0"
        }`}
      >
        <div className="w-80 h-full p-4 space-y-4 overflow-y-auto">
          <div className="flex justify-between items-center xl:hidden pb-1">
            <span className="text-xs font-bold text-white">Live Insights</span>
            <button
              onClick={onClose}
              className="text-xs font-bold p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Streak & Goal Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#121929] to-[#0F1624] p-4 border border-slate-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Focus Streak
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                14 Days
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full"
                style={{ width: "72%" }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Daily Target: {dailyGoal}h</span>
              <span className="font-bold text-cyan-400">
                {user?.exam_target}
              </span>
            </div>
          </div>

          {/* Stat Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate("/app/planner")}
              className="rounded-2xl bg-[#0F1624] hover:border-indigo-500/40 p-3.5 border border-slate-800 cursor-pointer transition"
            >
              <p className="text-[10px] font-semibold text-slate-400">
                Active Courses
              </p>
              <p className="text-2xl font-extrabold text-white mt-1">
                {savedCourses.length}
              </p>
            </div>
            <div
              onClick={() => navigate("/app/analytics")}
              className="rounded-2xl bg-[#0F1624] hover:border-emerald-500/40 p-3.5 border border-slate-800 cursor-pointer transition"
            >
              <p className="text-[10px] font-semibold text-slate-400">
                Quiz Accuracy
              </p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {avgScore}%
              </p>
            </div>
          </div>

          {/* Course Timelines */}
          <div className="rounded-2xl bg-[#0F1624] p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Course Deadlines
              </h4>
              <button
                onClick={() => navigate("/app/planner")}
                className="text-[10px] font-bold text-indigo-400 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                Planner <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <ul className="space-y-2 text-xs">
              {savedCourses.length === 0 ? (
                <li
                  onClick={() => navigate("/app/chat")}
                  className="p-3 rounded-xl bg-[#070A11] border border-dashed border-slate-800 text-slate-400 hover:text-indigo-300 text-center text-[11px] cursor-pointer transition"
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                  Build your first course with Sync AI
                </li>
              ) : (
                savedCourses.slice(0, 3).map((course) => (
                  <li
                    key={course.id}
                    onClick={() => navigate("/app/planner")}
                    className="p-2.5 rounded-xl bg-[#070A11] border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                  >
                    <p className="font-semibold text-slate-100 truncate">
                      {course.title}
                    </p>
                    <p className="text-[10px] text-amber-400 font-semibold mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.deadline
                        ? `Due ${new Date(course.deadline).toLocaleDateString()}`
                        : course.timeBoundLabel || "In Progress"}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Urgent Tasks */}
          <div className="rounded-2xl bg-[#0F1624] p-4 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white">Upcoming Deadlines</h4>
            <ul className="space-y-2 text-xs">
              {urgentTasks.length === 0 ? (
                <li className="p-2.5 rounded-xl bg-[#070A11] text-slate-500 text-center text-[11px]">
                  No pending tasks!
                </li>
              ) : (
                urgentTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-2.5 rounded-xl bg-[#070A11] border border-slate-800"
                  >
                    <p className="font-semibold text-slate-100 truncate">
                      {task.title}
                    </p>
                    <p className="text-[10px] text-rose-400 font-bold mt-0.5">
                      {new Date(task.deadline).toLocaleDateString()} •{" "}
                      {task.priority.toUpperCase()}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
