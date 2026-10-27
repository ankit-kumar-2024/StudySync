import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconSchool } from "../components/common/Icons";
import { loginSuccess } from "../store/slices/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/app";
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginSuccess({
        user: {
          user_id: "U-1001",
          name: "Sheetal Rawat",
          email: formData.email,
          enrolmentNo: "2400170900",
          exam_target: "JEE Advanced",
          exam_date: "2025-05-25",
          daily_goal_hours: 5,
          studyCenter: "07162P, M.E.R.I.T",
        },
        token: "demo-jwt-authenticated-token",
      }),
    );

    // Redirect to the originally requested route or the dashboard
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center items-center px-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#dee9fc] shadow-xl space-y-6">
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
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#464555] font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="e.g. sheetal@example.com"
              className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
            />
          </div>

          <div>
            <label className="block text-[#464555] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#464555] border-t border-[#dee9fc]/70">
          Need an account?{" "}
          <Link
            to="/register"
            className="text-[#3525cd] font-bold hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
