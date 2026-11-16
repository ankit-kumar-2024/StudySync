import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconSchool } from "../components/common/Icons";
import { loginSuccess } from "../store/slices/authSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    examTarget: "JEE Advanced",
    dailyGoalHours: 5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginSuccess({
        user: {
          user_id: `U-${Date.now().toString().slice(-4)}`,
          name: formData.name,
          email: formData.email,
          enrolmentNo: "2400170900",
          exam_target: formData.examTarget,
          exam_date: "2025-05-25",
          daily_goal_hours: Number(formData.dailyGoalHours),
          studyCenter: "07162P, M.E.R.I.T",
        },
        token: "demo-registered-jwt-token",
      }),
    );
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center items-center px-4 py-8 font-['Inter',sans-serif]">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-[#dee9fc] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-xs">
              <IconSchool className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#121c2a]">
              StudySync
            </span>
          </Link>
          <h2 className="text-lg font-bold text-[#121c2a]">
            Create your student workspace
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#464555] font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Sheetal Rawat"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#464555] font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="sheetal@university.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#464555] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#464555] font-semibold mb-1">
                Target Exam
              </label>
              <input
                type="text"
                required
                value={formData.examTarget}
                onChange={(e) =>
                  setFormData({ ...formData, examTarget: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#464555] font-semibold mb-1">
                Daily Study Target (Hours)
              </label>
              <input
                type="number"
                min={1}
                max={16}
                required
                value={formData.dailyGoalHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyGoalHours: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#464555] border-t border-[#dee9fc]/70">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[#3525cd] font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
