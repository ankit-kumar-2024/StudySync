import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  IconMenu,
  IconSchool,
  IconSparkle,
  IconBell,
  IconSearch,
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "SR";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/90 backdrop-blur-xl shadow-xs border-b border-[#dee9fc]/70">
      <div className="h-16 w-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand & Sidebar Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-[#464555] hover:text-[#121c2a] hover:bg-[#dee9fc]/60 rounded-xl transition-colors cursor-pointer"
            type="button"
            aria-label="Toggle Navigation"
          >
            <IconMenu className="w-5 h-5" />
          </button>
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-sm shrink-0">
              <IconSchool className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#121c2a] xs:inline-block">
              StudySync
            </span>
          </Link>
        </div>

        {/* Right: Notification Center & Profile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 justify-end shrink-0 relative">
          {/* Toggle Insights (Dashboard Only) */}
          {showInsightsToggle && onToggleInsights && (
            <button
              onClick={onToggleInsights}
              className="px-3 py-1.5 text-[#464555] hover:text-[#121c2a] hover:bg-[#eff4ff] rounded-xl text-xs font-semibold transition-colors hidden xl:block cursor-pointer"
              type="button"
            >
              {isInsightsOpen ? "Hide Insights" : "Show Insights"}
            </button>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              aria-label="Notifications"
              className="relative p-2 text-[#464555] hover:bg-[#eff4ff] rounded-xl transition-colors cursor-pointer"
              type="button"
            >
              <IconBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[9px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#dee9fc] p-3 sm:p-4 z-50 space-y-3">
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

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
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
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]"></span>
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

          {/* User Profile Avatar */}
          <Link to="/app/profile" className="flex items-center gap-1.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
              {initials}
            </div>
          </Link>
        </div>
      </div>

      {/* Expandable Mobile Search Drawer */}
      {showMobileSearch && (
        <div className="p-3 bg-white border-b border-[#dee9fc] md:hidden">
          <div
            onClick={() => {
              setShowMobileSearch(false);
              navigate("/app/chat");
            }}
            className="flex items-center gap-2 p-2 bg-[#eff4ff] rounded-xl text-xs cursor-pointer text-gray-600"
          >
            <IconSparkle className="w-4 h-4 text-[#3525cd]" />
            <span>Search tasks, questions, or formulas...</span>
          </div>
        </div>
      )}
    </header>
  );
}
