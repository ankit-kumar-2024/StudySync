import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  IconMenu,
  IconSchool,
  IconSparkle,
  IconBell,
  IconCheck,
} from "../common/Icons";
import {
  markAsRead,
  markAllAsRead,
} from "../../store/slices/notificationsSlice";

export default function Header({
  onToggleSidebar,
  onToggleInsights,
  isInsightsOpen,
  showInsightsToggle,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Derive user initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "SR";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/85 backdrop-blur-xl shadow-xs border-b border-[#dee9fc]/60">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-[#464555] hover:text-[#121c2a] hover:bg-[#dee9fc] rounded-lg transition-colors cursor-pointer"
            type="button"
            aria-label="Toggle Navigation"
          >
            <IconMenu className="w-5 h-5" />
          </button>
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-sm">
              <IconSchool className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#121c2a]">
              StudySync
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#e2dfff] text-[#3525cd] text-[10px] font-bold">
              SATMS
            </span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl hidden sm:block">
          <div
            onClick={() => navigate("/app/chat")}
            className="relative flex items-center w-full cursor-pointer"
          >
            <span className="absolute left-3.5 text-[#777587]">
              <IconSparkle className="w-4 h-4" />
            </span>
            <input
              readOnly
              className="w-full h-10 pl-10 pr-4 bg-[#eff4ff]/70 text-[#121c2a] placeholder:text-[#777587] rounded-xl text-xs focus:outline-none cursor-pointer hover:bg-[#eff4ff] transition-all"
              placeholder="Ask Ace AI or search across tasks, notes, books, PYQs..."
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 justify-end min-w-[200px] relative">
          {showInsightsToggle && onToggleInsights && (
            <button
              onClick={onToggleInsights}
              className="px-3 py-1.5 text-[#464555] hover:text-[#121c2a] hover:bg-[#dee9fc] rounded-xl text-xs font-semibold transition-colors hidden md:block cursor-pointer"
              type="button"
            >
              {isInsightsOpen ? "Hide Insights" : "Show Insights"}
            </button>
          )}

          {/* Interactive Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              aria-label="Notifications"
              className="relative p-2 text-[#464555] hover:bg-[#dee9fc] rounded-xl transition-colors cursor-pointer"
              type="button"
            >
              <IconBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown (Module 10) */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#dee9fc] p-4 z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee9fc]/70">
                  <h4 className="text-xs font-bold text-[#121c2a]">
                    Notification Center
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => dispatch(markAllAsRead())}
                      className="text-[10px] font-bold text-[#3525cd] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-[11px] text-gray-400 py-4 text-center">
                      No notifications.
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => dispatch(markAsRead(n.id))}
                        className={`p-2.5 rounded-xl text-xs border cursor-pointer transition-all ${
                          n.is_read
                            ? "bg-[#f8f9ff] border-gray-100 text-gray-500"
                            : "bg-[#eff4ff] border-[#dee9fc] text-[#121c2a] font-semibold"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span
                            className={
                              n.type === "deadline"
                                ? "text-[#ba1a1a]"
                                : "text-[#3525cd]"
                            }
                          >
                            {n.title}
                          </span>
                          {!n.is_read && (
                            <span className="w-2 h-2 rounded-full bg-[#3525cd]"></span>
                          )}
                        </div>
                        <p className="text-[11px] mt-1 font-normal leading-snug">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <Link to="/app/profile" className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center text-white text-xs font-bold shadow-xs">
              {initials}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
