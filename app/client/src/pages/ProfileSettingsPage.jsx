import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Bell, Shield, Check, Download } from "lucide-react";
import {
  updateProfile,
  updatePreferences,
  logout,
} from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProfileSettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const settings = useSelector((state) => state.auth.settings);
  const tasks = useSelector((state) => state.tasks.items);
  const resources = useSelector((state) => state.resources.items);
  const history = useSelector((state) => state.tests.history);

  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState("");

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    exam_target: user?.exam_target || "JEE Advanced",
    exam_date: user?.exam_date || "2026-05-25",
    daily_goal_hours: user?.daily_goal_hours || 5,
  });

  const [preferences, setPreferences] = useState({
    emailDeadlines: settings?.emailDeadlines ?? true,
    aiDailyTips: settings?.aiDailyTips ?? true,
    sprintModeAlerts: settings?.sprintModeAlerts ?? false,
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    setSaveStatus("Profile and exam targets updated!");
    setTimeout(() => setSaveStatus(""), 3500);
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePreferences(preferences));
    await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ settings: preferences }),
    });
    setSaveStatus("Notification channels saved!");
    setTimeout(() => setSaveStatus(""), 3500);
  };

  const handleExportJson = () => {
    const payload = { user, tasks, resources, test_history: history };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studysync_workspace_export.json";
    a.click();
  };

  const handleLogoutEverywhere = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Account & Preferences
          </h1>
          <p className="text-xs text-slate-400">
            Manage personal student profile, exam timelines, and workspace data.
          </p>
        </div>

        <div className="flex items-center p-1 bg-[#0F1624] rounded-2xl border border-slate-800 self-start sm:self-auto">
          {[
            ["profile", "Profile", User],
            ["preferences", "Notifications", Bell],
            ["security", "Security & Data", Shield],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === key
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="bg-[#0F1624] rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <form onSubmit={handleProfileSubmit} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-white">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3">
                Academic Preparation Targets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Target Exam
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.exam_target}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        exam_target: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Scheduled Exam Date
                  </label>
                  <input
                    type="date"
                    required
                    value={profileData.exam_date}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        exam_date: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Daily Study Target (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    required
                    value={profileData.daily_goal_hours}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        daily_goal_hours: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="bg-[#0F1624] rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <form
            onSubmit={handlePreferencesSubmit}
            className="space-y-4 text-xs"
          >
            <h3 className="text-sm font-bold text-white">
              Notification Preferences
            </h3>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-[#070A11] border border-slate-800 cursor-pointer">
              <span>Email Deadline Alerts</span>
              <input
                type="checkbox"
                checked={preferences.emailDeadlines}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    emailDeadlines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-[#070A11] border border-slate-800 cursor-pointer">
              <span>Sync AI Daily Study Recommendations</span>
              <input
                type="checkbox"
                checked={preferences.aiDailyTips}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    aiDailyTips: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
              />
            </label>
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-[#0F1624] rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">
            JWT Session & Data Export
          </h3>
          <p className="text-slate-400">
            Authenticated with Bcrypt password hashing, Helmet security headers,
            and 7-day signed JWT tokens.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="px-4 py-2.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-xl font-bold inline-flex items-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Workspace JSON
            </button>
            <button
              type="button"
              onClick={handleLogoutEverywhere}
              className="px-4 py-2.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white rounded-xl font-bold transition cursor-pointer"
            >
              Log Out Everywhere
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
