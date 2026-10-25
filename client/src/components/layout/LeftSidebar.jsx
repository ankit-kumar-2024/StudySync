import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconGrid,
  IconChecklist,
  IconBook,
  IconQuiz,
  IconUser,
  IconSparkle,
  IconCalendar,
  IconFileText,
} from "../common/Icons";

const navItems = [
  { label: "Dashboard", to: "/app", icon: IconGrid, end: true },
  { label: "Ace Chatbot", to: "/app/chat", icon: IconSparkle },
  { label: "Tasks & Workload", to: "/app/tasks", icon: IconChecklist },
  { label: "Study Planner", to: "/app/planner", icon: IconCalendar },
  { label: "Assignments", to: "/app/assignments", icon: IconFileText },
  { label: "Resource Library", to: "/app/books", icon: IconBook },
  { label: "Practice Tests", to: "/app/tests", icon: IconQuiz },
];

export default function LeftSidebar({ isOpen }) {
  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white flex flex-col justify-between py-4 shadow-xs border-r border-[#dee9fc]/50 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 h-full flex flex-col justify-between px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                    isActive
                      ? "bg-[#dee9fc] text-[#3525cd]"
                      : "text-[#464555] hover:bg-[#dee9fc]/50 hover:text-[#121c2a]"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-[#dee9fc]/60 space-y-1">
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-[#dee9fc] text-[#3525cd]"
                  : "text-[#464555] hover:bg-[#dee9fc]/50 hover:text-[#121c2a]"
              }`
            }
          >
            <IconUser className="w-4 h-4 shrink-0" />
            <span>Profile Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}