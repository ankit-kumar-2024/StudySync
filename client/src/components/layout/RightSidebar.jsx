import React from "react";
import { useSelector } from "react-redux";

export default function RightSidebar({ isOpen, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.items);

  const urgentTasks = tasks.filter((t) => t.status === "pending").slice(0, 3);

  const dailyGoal = user?.daily_goal_hours || 5;

  return (
    <>
      {/* Mobile/Tablet Backdrop for Right Sidebar */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 xl:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-16 bottom-0 z-40 border-l border-[#dee9fc]/60 bg-[#f8f9ff]/95 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-2xl xl:shadow-none overflow-hidden ${
          isOpen
            ? "w-80 translate-x-0"
            : "translate-x-full xl:translate-x-0 xl:w-0"
        }`}
      >
        <div className="w-80 h-full p-4 space-y-4 overflow-y-auto">
          {/* Mobile close button */}
          <div className="flex justify-between items-center xl:hidden pb-1">
            <span className="text-xs font-bold text-[#121c2a]">Insights</span>
            <button
              onClick={onClose}
              className="text-xs font-bold p-1 text-gray-500 hover:text-black cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          {/* Study streak card */}
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#dee9fc]/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#121c2a]">
                Study Streak
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                14 Days 🔥
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#dee9fc] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3525cd] to-[#712ae2] rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-[#464555]">
              <span>Today: 3.5h / {dailyGoal}.0h</span>
              <span className="font-bold text-[#3525cd]">70%</span>
            </div>
          </div>

          {/* Upcoming deadlines card */}
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#dee9fc]/50 space-y-3">
            <h4 className="text-xs font-bold text-[#121c2a]">
              Upcoming Submissions
            </h4>
            <ul className="space-y-2 text-xs">
              {urgentTasks.length === 0 ? (
                <li className="p-2.5 rounded-xl bg-white text-gray-400 text-center text-[11px]">
                  No pending deadlines!
                </li>
              ) : (
                urgentTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dee9fc]/40"
                  >
                    <p className="font-semibold text-[#121c2a] truncate">
                      {task.title}
                    </p>
                    <p className="text-[10px] text-[#ba1a1a] font-bold mt-0.5">
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
