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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate(from, { replace: true });
    } catch {
      setError("Unable to connect to server");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-white to-[#eff4ff] flex flex-col justify-center items-center px-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#dee9fc] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#712ae2] flex items-center justify-center text-white shadow-sm">
              <IconSchool className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#121c2a]">
              StudySync
            </span>
          </Link>
          <h2 className="text-lg font-bold text-[#121c2a]">
            Sign in to your account
          </h2>
          <p className="text-xs text-[#464555]">
            Access your AI courses, tests & progress
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#ba1a1a] text-xs font-semibold">
            {error}
          </div>
        )}

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
              placeholder="e.g. ankit@example.com"
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
            disabled={loading}
            className="w-full py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold rounded-xl shadow-md shadow-[#3525cd]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
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
