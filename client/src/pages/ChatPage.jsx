import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IconSparkle,
  IconArrowRight,
  IconSchool,
} from "../components/common/Icons";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Ace, your SATMS AI Study Assistant. Ask me to explain concepts, generate revision timetables, solve PYQs, or diagnose your mock test results.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();
    if (q.includes("calculus") || q.includes("integral")) {
      return `### Indefinite & Definite Integration Strategy:\n\n1. **Standard Substitutions**: For $\\int \\frac{dx}{x^2+a^2}$, substitute $x = a\\tan\\theta$.\n2. **By Parts Priority (ILATE)**: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential.\n3. **High-Yield JEE Advanced Advice**: King's Property $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$ solves 60% of past paper definite integrals.\n\nWould you like me to generate a 5-question speed drill on this?`;
    } else if (
      q.includes("plan") ||
      q.includes("schedule") ||
      q.includes("revision")
    ) {
      return `### Calibrated 7-Day Sprint Plan:\n\n* **Day 1-2**: High-yield Calculus PYQs + Wave Optics Formulas (4.5 hrs/day)\n* **Day 3-4**: Electrostatics Potential Gradients & Reaction Mechanisms (5.0 hrs/day)\n* **Day 5**: 3-Hour Full Syllabus Diagnostic Simulation Paper\n* **Day 6**: Error analysis on identified weak topics\n* **Day 7**: Active recall with formula sheets and flashcards.`;
    } else if (
      q.includes("weak") ||
      q.includes("physics") ||
      q.includes("test")
    ) {
      return `### Weak Topic Diagnostic Analysis:\n\nBased on your recent tests, your lowest accuracy is in **Graph Theory (Shortest Path)** and **Wave Optics (Interference Fringe Width)**.\n\n**Actionable Step**: Allocate 45 minutes on your Study Planner to solve 10 numerical problems on Young's Double Slit Experiment.`;
    }
    return `### SATMS Ace Analysis:\n\nQuery: *"${userQuery}"*\n\n1. **Concept Review**: Break this problem down into primary definitions and governing equations.\n2. **Practice Vault**: Check your **Resource Library** under PYQs for verified 2018-2024 solutions.\n3. **Follow-Up**: Attempt the practice quiz on this unit to verify retention.`;
  };

  const handleSend = (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-125px)] sm:h-[calc(100vh-140px)] flex flex-col justify-between bg-white rounded-3xl border border-[#dee9fc] shadow-sm font-['Inter',sans-serif] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#dee9fc] bg-[#f8f9ff]/80 backdrop-blur-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
            <IconSparkle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-[#121c2a]">
              Ace — AI Study Assistant
            </h2>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Academic Reasoning Active
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-[11px] font-bold text-[#464555] hover:text-[#ba1a1a] px-3 py-1.5 rounded-xl border border-[#dee9fc] hover:bg-white cursor-pointer transition-all"
        >
          Clear Chat
        </button>
      </div>

      {/* Message Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`p-3.5 sm:p-4 rounded-2xl text-xs max-w-[88%] sm:max-w-xl whitespace-pre-line leading-relaxed shadow-2xs ${
                m.sender === "user"
                  ? "bg-[#3525cd] text-white rounded-br-xs"
                  : "bg-[#f8f9ff] text-[#121c2a] border border-[#dee9fc] rounded-bl-xs"
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">
              {m.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#3525cd] font-semibold bg-[#eff4ff] p-3 rounded-2xl w-fit">
            <IconSparkle className="w-3.5 h-3.5 animate-spin" />
            <span>Ace is generating response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Dock */}
      <div className="p-3 sm:p-4 border-t border-[#dee9fc] bg-white space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <span className="text-gray-400 text-[10px] shrink-0 font-semibold">
            Quick Prompts:
          </span>
          {[
            "Explain Calculus Chapter 7 PYQ",
            "Show my weak Physics topics",
            "7-day sprint plan",
          ].map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#dee9fc] text-[#3525cd] shrink-0 cursor-pointer font-medium transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything across tasks, notes, formulas, or PYQs..."
            className="flex-1 px-4 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-5 py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] disabled:opacity-40 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer transition-all shadow-xs"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
