import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  GraduationCap,
  Sparkles,
  Bell,
  Search,
  PanelRight,
  Command,
} from "lucide-react";
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
  const [mobileQuery, setMobileQuery] = useState("");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "SS";

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (!mobileQuery.trim()) return;
    setShowMobileSearch(false);
    navigate(`/app/chat?prompt=${encodeURIComponent(mobileQuery)}`);
    setMobileQuery("");
  };

  const handleNotificationClick = (item) => {
    dispatch(markAsRead(item.id));
    setShowNotifMenu(false);
    if (item.type === "deadline") navigate("/app/tasks");
    else if (item.type === "ai_tip") navigate("/app/tests");
    else if (item.type === "graded") navigate("/app/assignments");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#0B0F19]/85 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Menu + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
            type="button"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/app" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                StudySync
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold tracking-wider">
                SATMS 3.0
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Glass Command Search Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div
            onClick={() => navigate("/app/chat")}
            className="relative flex items-center w-full cursor-pointer group"
          >
            <span className="absolute left-3.5 text-cyan-400 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-4 h-4" />
            </span>
            <input
              readOnly
              className="w-full h-10 pl-10 pr-28 bg-[#121929]/90 border border-slate-800 group-hover:border-indigo-500/60 text-slate-200 placeholder:text-slate-500 rounded-xl text-xs focus:outline-none cursor-pointer transition-all shadow-inner"
              placeholder="Ask Sync AI to build a course, PDF book, video & 50-Q test..."
            />
            <span className="absolute right-2 px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 text-indigo-200 border border-indigo-500/30 text-[10px] font-semibold inline-flex items-center gap-1">
              <Command className="w-2.5 h-2.5" /> Sync AI
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 justify-end shrink-0 relative">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl md:hidden cursor-pointer"
            type="button"
          >
            <Search className="w-5 h-5" />
          </button>

          {showInsightsToggle && onToggleInsights && (
            <button
              onClick={onToggleInsights}
              className="px-3 py-1.5 text-slate-300 hover:text-white bg-[#121929] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold transition-all hidden xl:inline-flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <PanelRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isInsightsOpen ? "Hide Insights" : "Insights"}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
              type="button"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold ring-2 ring-[#0B0F19]">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2.5 w-80 bg-[#0F1624] rounded-2xl shadow-2xl border border-slate-800 p-4 z-50 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-white">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => dispatch(markAllAsRead())}
                      className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">
                      All caught up!
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3 rounded-xl text-xs border cursor-pointer transition-all ${
                          n.is_read
                            ? "bg-[#070A11]/70 border-slate-800/70 text-slate-400"
                            : "bg-indigo-500/10 border-indigo-500/30 text-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span
                            className={
                              n.type === "deadline"
                                ? "text-rose-400"
                                : "text-cyan-400"
                            }
                          >
                            {n.title}
                          </span>
                          {!n.is_read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                          )}
                        </div>
                        <p className="text-[11px] mt-1 text-slate-300 leading-snug">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <Link
            to="/app/profile"
            className="flex items-center gap-2 pl-1 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-slate-800 group-hover:ring-indigo-400 transition-all">
              {initials}
            </div>
          </Link>
        </div>
      </div>

      {showMobileSearch && (
        <form
          onSubmit={handleMobileSearch}
          className="p-3 bg-[#0F1624] border-b border-slate-800 md:hidden flex gap-2"
        >
          <input
            type="text"
            value={mobileQuery}
            onChange={(e) => setMobileQuery(e.target.value)}
            placeholder="Ask Sync AI..."
            className="flex-1 px-3.5 py-2 bg-[#070A11] border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            Ask
          </button>
        </form>
      )}
    </header>
  );
}
