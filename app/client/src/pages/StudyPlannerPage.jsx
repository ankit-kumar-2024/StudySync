import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Sparkles,
  Check,
  Zap,
  Timer,
  BookOpen,
  PlayCircle,
  AlertCircle,
  Edit3,
  Plus,
} from "lucide-react";
import {
  toggleSlotStatus,
  setFullSchedule,
} from "../store/slices/plannerSlice";
import {
  toggleCourseModule,
  updateCourseDeadline,
  setActiveVideoFromCourse,
} from "../store/slices/resourcesSlice";

export default function StudyPlannerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const scheduleDays = useSelector((state) => state.planner.days);
  const testHistory = useSelector((state) => state.tests.history);
  const resources = useSelector((state) => state.resources.items);

  const savedCourses = resources.filter(
    (r) => r.file_type?.toLowerCase() === "course" || r.courseData,
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [activePomodoro, setActivePomodoro] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [successBanner, setSuccessBanner] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const [editingCourse, setEditingCourse] = useState(null);
  const [deadlineInput, setDeadlineInput] = useState("");

  const targetExam = user?.exam_target || "Your Target Exam";
  const dailyGoalHours = user?.daily_goal_hours || 5;

  useEffect(() => {
    let interval = null;
    if (activePomodoro && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds((sec) => sec - 1), 1000);
    } else if (pomodoroSeconds === 0) {
      setActivePomodoro(false);
    }
    return () => clearInterval(interval);
  }, [activePomodoro, pomodoroSeconds]);

  const formatPomoTime = () => {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getCourseStats = (course) => {
    const modules = course.courseData?.modules || [];
    const total = modules.length || 1;
    const completedList = course.completedModules || [];
    const completedCount = completedList.length;
    const percent = Math.min(100, Math.round((completedCount / total) * 100));
    return { total, completedCount, percent, modules, completedList };
  };

  const getDeadlineInfo = (isoDate) => {
    if (!isoDate) {
      return {
        label: "No deadline set",
        badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
      };
    }
    const diffMs = new Date(isoDate).getTime() - Date.now();
    const diffDays = Math.ceil(diffMs / 86400000);
    if (diffMs < 0) {
      return {
        label: `Overdue (${new Date(isoDate).toLocaleDateString()})`,
        badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      };
    }
    if (diffDays <= 2) {
      return {
        label: `Due in ${diffDays}d • ${new Date(isoDate).toLocaleDateString()}`,
        badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      };
    }
    return {
      label: `Due ${new Date(isoDate).toLocaleDateString()} (${diffDays}d left)`,
      badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    };
  };

  const handleToggleModule = async (course, moduleIndex) => {
    const current = course.completedModules || [];
    const updatedModules = current.includes(moduleIndex)
      ? current.filter((i) => i !== moduleIndex)
      : [...current, moduleIndex];

    dispatch(toggleCourseModule({ courseId: course.id, moduleIndex }));

    if (token) {
      await fetch(`http://localhost:5000/api/resources/${course.id}/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completedModules: updatedModules }),
      });
    }
  };

  const handleSaveDeadline = async (e) => {
    e.preventDefault();
    if (!editingCourse || !deadlineInput) return;

    const isoDeadline = new Date(deadlineInput).toISOString();
    dispatch(
      updateCourseDeadline({
        courseId: editingCourse.id,
        deadline: isoDeadline,
      }),
    );

    if (token) {
      await fetch(
        `http://localhost:5000/api/resources/${editingCourse.id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ deadline: isoDeadline }),
        },
      );
    }

    setEditingCourse(null);
    setDeadlineInput("");
    setSuccessBanner("Course deadline updated.");
    setTimeout(() => setSuccessBanner(""), 3500);
  };

  const handleGenerateAIPlan = async () => {
    setIsGenerating(true);
    const detectedWeakSpots = testHistory.flatMap((h) => h.weak_topics || []);
    const pendingCourses = savedCourses
      .filter((c) => getCourseStats(c).percent < 100)
      .map((c) => c.title);

    const priorityTopics = [...detectedWeakSpots, ...pendingCourses];
    const primaryFocus = priorityTopics[0] || "Your Sync AI Courses";

    try {
      const res = await fetch("http://localhost:5000/api/planner/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetExam,
          dailyGoalHours,
          weakTopics: priorityTopics,
        }),
      });
      const data = await res.json();
      if (res.ok && data.days) {
        dispatch(setFullSchedule(data.days));
        setSuccessBanner(
          `Sync AI recalibrated your timetable prioritizing: ${primaryFocus}`,
        );
        setTimeout(() => setSuccessBanner(""), 4500);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Empty State when no courses or schedule slots exist yet
  if (savedCourses.length === 0 && scheduleDays.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
          <Calendar className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-white">
          Your Study Planner Is Empty
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Open <strong>Sync AI Agent</strong> and choose{" "}
          <strong>Complete Course</strong> with a deadline—your course modules,
          progress bars, and daily timetable will appear here automatically.
        </p>
        <button
          type="button"
          onClick={() => navigate("/app/chat")}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" /> Build Course & Timeline in Sync AI
        </button>
      </div>
    );
  }

  const overallCourseProgress =
    savedCourses.length === 0
      ? 0
      : Math.round(
          savedCourses.reduce((sum, c) => sum + getCourseStats(c).percent, 0) /
            savedCourses.length,
        );

  const filteredCourses = savedCourses.filter((c) => {
    const { percent } = getCourseStats(c);
    if (courseFilter === "completed") return percent === 100;
    if (courseFilter === "in-progress") return percent < 100;
    return true;
  });

  const allSlots = scheduleDays.flatMap((d) => d.slots || []);
  const completedSlots = allSlots.filter(
    (s) => s.status === "completed",
  ).length;
  const adherenceRate =
    allSlots.length > 0
      ? Math.round((completedSlots / allSlots.length) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-slate-100 pb-14">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] rounded-3xl border border-indigo-500/30 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync AI Schedule & Course Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Adaptive Study Planner & Course Progress
          </h1>
          <p className="text-xs text-indigo-200">
            <strong>{savedCourses.length} Saved Courses</strong> • Daily Goal:{" "}
            <strong>{dailyGoalHours} Hours/Day</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateAIPlan}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shadow-lg transition-all disabled:opacity-50 self-start sm:self-auto flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {isGenerating ? "Recalibrating..." : "Recalibrate with Sync AI"}
          </span>
        </button>
      </div>

      {successBanner && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-[#0F1624] rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Course Completion</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300">
              {savedCourses.length} Courses
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Overall Mastery</span>
              <span className="text-cyan-400">{overallCourseProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${overallCourseProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-5 bg-[#0F1624] rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-indigo-400" />
              <span>Focus Sprint Timer</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">
              25m Sprint
            </span>
          </div>
          <div className="text-center py-1">
            <span className="text-3xl font-extrabold font-mono text-indigo-400">
              {formatPomoTime()}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActivePomodoro(!activePomodoro)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                activePomodoro
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              {activePomodoro ? "Pause" : "Start Sprint"}
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePomodoro(false);
                setPomodoroSeconds(25 * 60);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer hover:bg-slate-700"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-5 bg-[#0F1624] rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Schedule Adherence</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">
              {completedSlots}/{allSlots.length} Done
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Timeline Progress</span>
              <span className="text-emerald-400">{adherenceRate}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${adherenceRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Saved Courses with Deadlines & Module Progress */}
      {savedCourses.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Saved Courses & Deadline Tracker</span>
              </h2>
              <p className="text-xs text-slate-400">
                Check off completed topics to track progress toward your
                deadline.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-[#0F1624] p-1 rounded-xl border border-slate-800 text-xs">
                {["all", "in-progress", "completed"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCourseFilter(tab)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition cursor-pointer ${
                      courseFilter === tab
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("/app/chat")}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Course</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredCourses.map((course) => {
              const { total, completedCount, percent, modules, completedList } =
                getCourseStats(course);
              const deadlineInfo = getDeadlineInfo(course.deadline);

              return (
                <div
                  key={course.id}
                  className="bg-[#0F1624] border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 text-[10px] font-bold uppercase">
                        Sync AI Course
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold flex items-center gap-1 ${deadlineInfo.badgeClass}`}
                        >
                          <Clock className="w-3 h-3" />
                          {deadlineInfo.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCourse(course);
                            setDeadlineInput(
                              course.deadline
                                ? new Date(course.deadline)
                                    .toISOString()
                                    .slice(0, 16)
                                : "",
                            );
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                          title="Edit Deadline"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {course.title}
                      </h3>
                      {course.courseData?.overview && (
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {course.courseData.overview}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">
                          Completed {completedCount} of {total} Topics
                        </span>
                        <span
                          className={`font-bold ${
                            percent === 100
                              ? "text-emerald-400"
                              : "text-cyan-400"
                          }`}
                        >
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            percent === 100
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-indigo-500 to-cyan-400"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {modules.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        {modules.map((mod, mIdx) => {
                          const isChecked = completedList.includes(mIdx);
                          return (
                            <div
                              key={mIdx}
                              className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border text-xs transition ${
                                isChecked
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-slate-300"
                                  : "bg-[#070A11] border-slate-800 text-slate-200"
                              }`}
                            >
                              <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    handleToggleModule(course, mIdx)
                                  }
                                  className="w-4 h-4 rounded accent-indigo-500 cursor-pointer shrink-0"
                                />
                                <span
                                  className={`truncate font-medium ${
                                    isChecked
                                      ? "line-through text-slate-400"
                                      : ""
                                  }`}
                                >
                                  Topic {mIdx + 1}: {mod.moduleTitle}
                                </span>
                              </label>

                              {mod.video && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch(
                                      setActiveVideoFromCourse(mod.video),
                                    );
                                    navigate("/app/videos");
                                  }}
                                  className="px-2 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[10px] font-semibold inline-flex items-center gap-1 shrink-0 transition cursor-pointer"
                                >
                                  <PlayCircle className="w-3 h-3" />
                                  <span>Watch</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Day-by-Day Study Schedule */}
      {scheduleDays.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white">
            Deadline-Based Study Timetable
          </h2>
          {scheduleDays.map((dayPlan, dayIdx) => (
            <div
              key={dayPlan.day}
              className="bg-[#0F1624] rounded-2xl border border-slate-800 p-5 space-y-3"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{dayPlan.day}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold">
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
                          ? "bg-emerald-500/10 border-emerald-500/30 opacity-75"
                          : "bg-[#070A11] border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded font-mono">
                            {slot.time}
                          </span>
                          <span
                            className={`capitalize font-bold ${
                              isDone ? "text-emerald-400" : "text-amber-400"
                            }`}
                          >
                            {slot.status}
                          </span>
                        </div>
                        <h4
                          className={`text-xs font-bold leading-snug ${
                            isDone
                              ? "line-through text-slate-400"
                              : "text-white"
                          }`}
                        >
                          {slot.topic}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {slot.subject}
                        </p>
                      </div>

                      <button
                        type="button"
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
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-indigo-600 text-white hover:bg-indigo-500"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
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
        </section>
      )}

      {/* Edit Deadline Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F1624] border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div>
              <h3 className="text-sm font-bold text-white">
                Update Course Deadline
              </h3>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {editingCourse.title}
              </p>
            </div>

            <form onSubmit={handleSaveDeadline} className="space-y-4">
              <input
                type="datetime-local"
                required
                value={deadlineInput}
                onChange={(e) => setDeadlineInput(e.target.value)}
                className="w-full p-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Save Deadline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
