import React from "react";
import { Link } from "react-router-dom";
import { IconSchool, IconArrowLeft } from "../components/common/Icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center items-center px-4 font-['Inter',sans-serif] text-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#dee9fc] shadow-xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-[#3525cd] flex items-center justify-center text-white mx-auto shadow-md">
          <IconSchool className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-[#121c2a]">404</h1>
          <h2 className="text-base font-bold text-[#121c2a]">Page Not Found</h2>
          <p className="text-xs text-[#464555]">
            The study resource or module you are looking for does not exist.
          </p>
        </div>
        <Link
          to="/app"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold rounded-xl text-xs transition-all shadow-xs"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
