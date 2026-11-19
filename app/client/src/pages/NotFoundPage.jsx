import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col justify-center items-center px-4 text-center">
      <div className="w-full max-w-md bg-[#0F1624] rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white mx-auto shadow-lg">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <h2 className="text-base font-bold text-slate-200">Page Not Found</h2>
          <p className="text-xs text-slate-400">
            The study module or resource you requested does not exist.
          </p>
        </div>
        <Link
          to="/app"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workspace</span>
        </Link>
      </div>
    </div>
  );
}
