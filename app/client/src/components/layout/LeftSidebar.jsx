import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  CheckSquare,
  Calendar,
  FileText,
  BookOpen,
  HelpCircle,
  PlayCircle,
  BarChart3,
  LifeBuoy,
  UserCog,
} from "lucide-react";

const primaryNav = [
  { label: "Dashboard", to: "/app", icon: LayoutDashboard, end: true },
  { label: "Sync AI Builder", to: "/app/chat", icon: Sparkles, badge: "AI" },
  { label: "Study Planner", to: "/app/planner", icon: Calendar },
  { label: "Books, PDFs & Courses", to: "/app/books", icon: BookOpen },
  { label: "Video Lessons", to: "/app/videos", icon: PlayCircle },
  { label: "50-Q Practice Tests", to: "/app/tests", icon: HelpCircle },
];

const workspaceNav = [
  { label: "Tasks & Workload", to: "/app/tasks", icon: CheckSquare },
  { label: "Assignments", to: "/app/assignments", icon: FileText },
  { label: "Progress & Analytics", to: "/app/analytics", icon: BarChart3 },
  { label: "Help & Guide", to: "/app/help", icon: LifeBuoy },
];

export default function LeftSidebar({ isOpen, onClose }) {
  const renderLink = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={onClose}
        className={({ isActive }) =>
          `group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25"
              : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
          }`
        }
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className="w-4 h-4 shrink-0" />
          <span className="truncate">{item.label}</span>
        </div>
        {item.badge && (
          <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[9px] font-bold">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl flex flex-col justify-between py-4 border-r border-slate-800/80 transition-all duration-300 ease-out ${
        isOpen
          ? "w-64 translate-x-0"
          : "-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden"
      }`}
    >
      <div className="w-64 h-full flex flex-col justify-between px-3.5">
        <div className="space-y-5 overflow-y-auto pr-0.5">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Learning Hub
            </p>
            {primaryNav.map(renderLink)}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Academic Tracker
            </p>
            {workspaceNav.map(renderLink)}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80">
          <NavLink
            to="/app/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
              }`
            }
          >
            <UserCog className="w-4 h-4 shrink-0" />
            <span>Profile & Preferences</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
