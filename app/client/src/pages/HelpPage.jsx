import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LifeBuoy, ChevronDown, Keyboard, Sparkles, Check } from "lucide-react";

const FAQS = [
  {
    q: "How does the 5-step Sync AI Course Builder work?",
    a: "Open Sync AI Builder and answer 5 validated questions: (1) Course Title, (2) Topics, (3) Books & PDFs preference, (4) Video Lectures preference, and (5) 50-Question Practice Tests + Completion Deadline. Sync AI automatically generates 1 YouTube lecture, 1 downloadable PDF book, and 1 dynamic 50-question test per topic.",
  },
  {
    q: "Do the 50-question practice tests repeat the same questions?",
    a: "No. Every time you click Start or Retake on any topic test, Sync AI generates 50 brand-new questions using a unique variation seed.",
  },
  {
    q: "Where can I track my course deadlines and completion percentage?",
    a: "All Sync AI courses automatically sync to Study Planner (/app/planner), where you can check off individual topic modules, edit deadlines, and monitor your overall mastery percentage.",
  },
];

export default function HelpPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setTicketSent(true);
    setMessage("");
    setTimeout(() => setTicketSent(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans text-slate-100 pb-12">
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <LifeBuoy className="w-4 h-4" /> Help & Student Onboarding
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            StudySync User Guide & Support
          </h1>
          <p className="text-xs text-slate-400">
            Learn how to generate AI courses, export PDF books, and master your
            exam schedule.
          </p>
        </div>

        <button
          onClick={() => navigate("/app/chat")}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Try Sync AI Builder</span>
        </button>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-sm font-bold text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2.5">
          {FAQS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#0B0F17] border border-slate-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-white cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-3.5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/70 pt-2.5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Keyboard Shortcuts */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-indigo-400" />
            <span>Quick Navigation Shortcuts</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-slate-300">Send Chat Prompt</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 font-mono text-indigo-300">
                Enter
              </kbd>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-slate-300">Open Sync AI Course Wizard</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 font-mono text-indigo-300">
                /app/chat
              </kbd>
            </div>
          </div>
        </div>

        {/* Contact Support / Feature Request */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-bold text-white">
            Contact Academic Support
          </h2>
          {ticketSent && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Request submitted to StudySync team!
            </div>
          )}
          <form onSubmit={handleSupportSubmit} className="space-y-3 text-xs">
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question or feature request..."
              className="w-full p-3 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
