import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart3,
  TrendingUp,
  Download,
  Award,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function AnalyticsPage() {
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.items);
  const testHistory = useSelector((state) => state.tests.history);
  const resources = useSelector((state) => state.resources.items);

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const taskCompletionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const avgQuizScore = testHistory.length
    ? Math.round(
        testHistory.reduce((sum, h) => sum + h.percentage, 0) /
          testHistory.length,
      )
    : 0;

  const savedCourses = resources.filter(
    (r) => r.file_type?.toLowerCase() === "course" || r.courseData,
  );
  const avgCourseProgress = savedCourses.length
    ? Math.round(
        savedCourses.reduce((sum, c) => {
          const total = c.courseData?.modules?.length || 4;
          const done = (c.completedModules || []).length;
          return sum + Math.min(100, Math.round((done / total) * 100));
        }, 0) / savedCourses.length,
      )
    : 0;

  // AI-Calculated Exam Readiness Score (Synopsis Objective #12)
  const readinessScore = Math.round(
    taskCompletionRate * 0.3 + avgQuizScore * 0.4 + avgCourseProgress * 0.3,
  );

  const handleExportReport = () => {
    const report = {
      student: user?.name,
      exam_target: user?.exam_target,
      generated_at: new Date().toISOString(),
      exam_readiness_score: `${readinessScore}%`,
      task_completion_rate: `${taskCompletionRate}%`,
      average_test_score: `${avgQuizScore}%`,
      course_syllabus_progress: `${avgCourseProgress}%`,
      test_attempts: testHistory,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StudySync_Analytics_Report.json`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-100 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800 rounded-3xl p-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
            <BarChart3 className="w-4 h-4" /> SATMS Analytics Engine
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            Progress & Exam Readiness Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Real-time performance metrics across your tasks, Sync AI courses,
            and 50-Q tests.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#121824] border border-indigo-500/30 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
            <span>Exam Readiness Score</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {readinessScore}%
          </p>
          <p className="text-[11px] text-slate-400">
            Weighted AI preparation index
          </p>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
            <span>Task Adherence</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {taskCompletionRate}%
          </p>
          <p className="text-[11px] text-slate-400">
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold">
            <span>Course Syllabus</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {avgCourseProgress}%
          </p>
          <p className="text-[11px] text-slate-400">
            {savedCourses.length} Sync AI courses
          </p>
        </div>

        <div className="p-5 bg-[#121824] border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
            <span>50-Q Test Average</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{avgQuizScore}%</p>
          <p className="text-[11px] text-slate-400">
            {testHistory.length} tests submitted
          </p>
        </div>
      </div>

      {/* Subject-Wise Performance Bar Chart */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">
          Test Performance Breakdown
        </h2>
        {testHistory.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            Complete a 50-question practice test to visualize subject-wise
            accuracy bars.
          </p>
        ) : (
          <div className="space-y-3">
            {testHistory.slice(0, 6).map((attempt) => (
              <div key={attempt.attempt_id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200 truncate pr-4">
                    {attempt.title || attempt.test_id}
                  </span>
                  <span className="font-bold text-indigo-400 shrink-0">
                    {attempt.score}/{attempt.total_marks} ({attempt.percentage}
                    %)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${attempt.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
