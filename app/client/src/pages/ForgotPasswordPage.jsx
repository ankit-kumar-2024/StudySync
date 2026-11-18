import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", text: data.error || "Reset failed" });
      } else {
        setStatus({ type: "success", text: data.message });
      }
    } catch {
      setStatus({ type: "error", text: "Server unavailable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-center items-center px-4 font-sans">
      <div className="w-full max-w-md bg-[#121824] rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white mx-auto">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Reset Student Password
          </h2>
          <p className="text-xs text-slate-400">
            Enter your registered email and choose a new password.
          </p>
        </div>

        {status.text && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold border ${
              status.type === "error"
                ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
            }`}
          >
            {status.text}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              New Password (min 6 characters)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
