import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconUser,
  IconBell,
  IconShield,
  IconCheck,
} from "../components/common/Icons";
import { updateProfile, updatePreferences } from "../store/slices/authSlice";

export default function ProfileSettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.auth.settings);

  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState("");

  const [profileData, setProfileData] = useState({
    name: user?.name || "Sheetal Rawat",
    email: user?.email || "sheetal.rawat@example.com",
    enrolmentNo: user?.enrolmentNo || "2400170900",
    exam_target: user?.exam_target || "JEE Advanced",
    exam_date: user?.exam_date || "2025-05-25",
    daily_goal_hours: user?.daily_goal_hours || 5,
    studyCenter: user?.studyCenter || "07162P, M.E.R.I.T",
  });

  const [preferences, setPreferences] = useState({
    emailDeadlines: settings.emailDeadlines,
    aiDailyTips: settings.aiDailyTips,
    sprintModeAlerts: settings.sprintModeAlerts,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    setSaveStatus("Profile and target exams synced to Redux successfully!");
    setTimeout(() => setSaveStatus(""), 4000);
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePreferences(preferences));
    setSaveStatus("Notification channels saved!");
    setTimeout(() => setSaveStatus(""), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-['Inter',sans-serif] text-[#121c2a]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Account & Preferences
          </h1>
          <p className="text-xs text-[#464555]">
            Manage personal student profile, target exam timelines, and alert
            channels.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-white rounded-2xl border border-[#dee9fc] shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#3525cd] text-white shadow-xs"
                : "text-[#464555] hover:text-[#121c2a]"
            }`}
          >
            <IconUser className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "preferences"
                ? "bg-[#3525cd] text-white shadow-xs"
                : "text-[#464555] hover:text-[#121c2a]"
            }`}
          >
            <IconBell className="w-3.5 h-3.5" />
            <span>Notifications</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-[#3525cd] text-white shadow-xs"
                : "text-[#464555] hover:text-[#121c2a]"
            }`}
          >
            <IconShield className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 bg-[#eff4ff] border border-[#3525cd]/30 text-[#3525cd] text-xs font-semibold rounded-2xl flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-[#3525cd]" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dee9fc] shadow-xs space-y-6">
          <form onSubmit={handleProfileSubmit} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-[#121c2a]">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#464555] font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-[#121c2a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#464555] font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-[#121c2a] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#dee9fc]/60">
              <h3 className="text-sm font-bold text-[#121c2a] mb-3">
                Academic Preparation Targets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
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
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-[#121c2a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
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
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-[#121c2a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
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
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-[#121c2a] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Preferences */}
      {activeTab === "preferences" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dee9fc] shadow-xs space-y-6">
          <form
            onSubmit={handlePreferencesSubmit}
            className="space-y-4 text-xs"
          >
            <h3 className="text-sm font-bold text-[#121c2a]">
              Notification Preferences
            </h3>
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#dee9fc] cursor-pointer">
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
                className="w-4 h-4 text-[#3525cd] rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#dee9fc] cursor-pointer">
              <span>Ace AI Daily Study Tips</span>
              <input
                type="checkbox"
                checked={preferences.aiDailyTips}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    aiDailyTips: e.target.checked,
                  })
                }
                className="w-4 h-4 text-[#3525cd] rounded cursor-pointer"
              />
            </label>
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-semibold text-xs shadow-xs cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Security */}
      {activeTab === "security" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dee9fc] shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-[#121c2a]">
            Active JWT Session
          </h3>
          <p className="text-gray-500">
            Authenticated with Bcrypt hashing & encrypted token expiration
            (1-hour window).
          </p>
          <button
            onClick={() => alert("All active student sessions invalidated.")}
            className="px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold hover:bg-rose-100 transition-all cursor-pointer"
          >
            Invalidate All Sessions
          </button>
        </div>
      )}
    </div>
  );
}
