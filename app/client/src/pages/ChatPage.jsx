import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  HelpCircle,
  FileText,
  BookOpen,
  Paperclip,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import { addResource } from "../store/slices/resourcesSlice";
import { addAvailableTest, setActiveTest } from "../store/slices/testsSlice";
import { setFullSchedule } from "../store/slices/plannerSlice";

const AGENT_OPTIONS = [
  {
    id: "test",
    label: "Practice Test",
    desc: "Topic + question count with shuffled retakes",
    icon: HelpCircle,
    accent:
      "text-emerald-400 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10",
  },
  {
    id: "homework",
    label: "Assignment / Homework",
    desc: "Generate PDF book, text answers, or code",
    icon: FileText,
    accent:
      "text-indigo-400 border-indigo-500/30 hover:border-indigo-400 bg-indigo-500/10",
  },
  {
    id: "course",
    label: "Complete Course",
    desc: "Video lectures, PDF notes, books, tests & deadline",
    icon: BookOpen,
    accent:
      "text-cyan-400 border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10",
  },
  {
    id: "free",
    label: "Free Doubt Chat",
    desc: "Ask doubts or share your thoughts openly",
    icon: MessageSquare,
    accent:
      "text-amber-400 border-amber-500/30 hover:border-amber-400 bg-amber-500/10",
  },
];

export default function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const messagesEndRef = useRef(null);

  // 'free' | 'test' | 'homework' | 'course'
  const [agentMode, setAgentMode] = useState("free");
  const [step, setStep] = useState(0);

  // Practice Test state
  const [testDraft, setTestDraft] = useState({ topic: "", count: 10 });

  // Homework / Assignment state
  const [hwFileName, setHwFileName] = useState("");
  const [hwFormat, setHwFormat] = useState("text"); // 'text' | 'pdf' | 'code'

  // 7-Step Complete Course state
  const [courseDraft, setCourseDraft] = useState({
    courseTitle: "",
    courseDescription: "",
    topicsList: [],
    includePdfNotes: true,
    includeGoogleBooks: true,
    includeVideos: true,
    includeTests: true,
    deadline: "",
  });

  const buildWelcomeMessage = () => ({
    id: `init-${Date.now()}`,
    sender: "ai",
    text: `Hi ${user?.name?.split(" ")[0] || "there"}! I am **Sync AI**.\n\nChoose what you want me to build below, or just type your message to ask doubts and share your thoughts directly:`,
    showModeOptions: true,
    timestamp: "Now",
  });

  const [messages, setMessages] = useState([buildWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [deadlinePicker, setDeadlinePicker] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBusy]);

  const pushAi = (text, extra = {}) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}-${Math.random()}`,
        sender: "ai",
        text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...extra,
      },
    ]);
  };

  const selectAgentMode = (mode) => {
    setAgentMode(mode);
    setDeadlinePicker("");

    if (mode === "free") {
      setStep(0);
      pushAi(
        "You're in **Free Doubt Chat**. Ask any question or share your thoughts!",
      );
    } else if (mode === "test") {
      setStep(1);
      setTestDraft({ topic: "", count: 10 });
      pushAi(
        "**Practice Test Builder**\n\n**Question 1 of 2:** On which **topic** do you want to practice a test?",
      );
    } else if (mode === "homework") {
      setStep(1);
      setHwFileName("");
      pushAi(
        "**Assignment & Homework Helper**\n\nWhat do you want? Tell me your questions, attach a PDF if you have one, and choose whether you want a **PDF Book**, **Text Answer**, or **Code**.",
      );
    } else if (mode === "course") {
      setStep(1);
      setCourseDraft({
        courseTitle: "",
        courseDescription: "",
        topicsList: [],
        includePdfNotes: true,
        includeGoogleBooks: true,
        includeVideos: true,
        includeTests: true,
        deadline: "",
      });
      pushAi(
        "**Complete Course Builder (7 Steps)**\n\n**Question 1 of 7:** What is the **title** of the course you want to create?",
      );
    }
  };

  const parseYesNo = (raw) => {
    const clean = raw.trim().toLowerCase();
    if (/^(yes|y|yeah|sure|haan|ha|include|want)/.test(clean)) return true;
    if (/^(no|n|nope|nahi|na|skip)/.test(clean)) return false;
    return null;
  };

  const handleFileAttach = (e) => {
    const file = e.target.files?.[0];
    if (file) setHwFileName(file.name);
  };

  const handleSend = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || isBusy) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text:
          hwFileName && agentMode === "homework"
            ? `[Attached: ${hwFileName}] ${text}`
            : text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");

    // MODE A: FREE DOUBT & THOUGHT CONVERSATION
    if (agentMode === "free") {
      setIsBusy(true);
      try {
        const res = await fetch("http://localhost:5000/api/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt: text, history: messages.slice(-8) }),
        });
        const data = await res.json();
        pushAi(data.reply || data.error || "Unable to respond right now.");
      } finally {
        setIsBusy(false);
      }
      return;
    }

    // MODE B: PRACTICE TEST BUILDER
    if (agentMode === "test") {
      if (step === 1) {
        if (text.replace(/[^a-zA-Z]/g, "").length < 3) {
          pushAi(
            "Please enter a valid **topic name** (e.g., *React Hooks*, *Thermodynamics*, or *SQL Joins*).",
            { isWarning: true },
          );
          return;
        }
        setTestDraft((prev) => ({ ...prev, topic: text }));
        setStep(2);
        pushAi(
          `Topic set to **"${text}"**.\n\n**Question 2 of 2:** How many **questions** do you want in this practice test? (1 to 50)`,
          {
            quickChoices: [
              "10 Questions",
              "20 Questions",
              "30 Questions",
              "50 Questions",
            ],
          },
        );
        return;
      }

      if (step === 2) {
        const num = parseInt(text.replace(/\D/g, ""), 10);
        if (!num || num < 1 || num > 50) {
          pushAi(
            "Please enter a valid number of questions between **1 and 50**.",
            {
              isWarning: true,
              quickChoices: ["10 Questions", "25 Questions", "50 Questions"],
            },
          );
          return;
        }

        setIsBusy(true);
        pushAi(
          `Generating your reusable **${num}-question practice test** on **"${testDraft.topic}"**...`,
        );
        try {
          const res = await fetch(
            "http://localhost:5000/api/tests/create-reusable",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ topic: testDraft.topic, count: num }),
            },
          );
          const data = await res.json();
          if (res.ok && data.test) {
            dispatch(addAvailableTest(data.test));
            dispatch(setActiveTest(data.test));
            setAgentMode("free");
            setStep(0);
            pushAi(
              `Your **${data.test.title}** is ready! You can attempt it multiple times—every attempt shuffles the question sequence and reviews right, wrong, and missed answers.`,
              { createdTest: data.test, showModeOptions: true },
            );
          } else {
            pushAi(data.error || "Failed to generate test.");
          }
        } finally {
          setIsBusy(false);
        }
        return;
      }
    }

    // MODE C: ASSIGNMENT & HOMEWORK ASSISTANT
    if (agentMode === "homework") {
      setIsBusy(true);
      try {
        const res = await fetch("http://localhost:5000/api/ai/homework", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestText: text,
            outputFormat: hwFormat,
            uploadedFileName: hwFileName,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          if (data.pdfResource) dispatch(addResource(data.pdfResource));
          pushAi(data.reply, {
            createdPdf: data.pdfResource,
            showModeOptions: true,
          });
          setHwFileName("");
        } else {
          pushAi(data.error || "Failed to generate homework response.");
        }
      } finally {
        setIsBusy(false);
      }
      return;
    }

    // MODE D: 7-STEP COMPLETE COURSE BUILDER
    if (agentMode === "course") {
      if (step === 1) {
        if (text.replace(/[^a-zA-Z]/g, "").length < 3) {
          pushAi(
            "Please enter a meaningful **course title** (at least 3 letters).",
            {
              isWarning: true,
            },
          );
          return;
        }
        setCourseDraft((prev) => ({ ...prev, courseTitle: text }));
        setStep(2);
        pushAi(
          `Course title: **"${text}"**.\n\n**Question 2 of 7:** Provide a short **description** of what this course should cover.`,
        );
        return;
      }

      if (step === 2) {
        if (text.replace(/[^a-zA-Z]/g, "").length < 5) {
          pushAi("Please enter a clear **description** of the course goals.", {
            isWarning: true,
          });
          return;
        }
        setCourseDraft((prev) => ({ ...prev, courseDescription: text }));
        setStep(3);
        pushAi(
          "**Question 3 of 7:** What **topics** do you want to complete in this course? (Separate multiple topics with commas)",
        );
        return;
      }

      if (step === 3) {
        const topics = text
          .split(/,|\n|;/)
          .map((t) => t.trim())
          .filter((t) => t.replace(/[^a-zA-Z]/g, "").length >= 2);
        if (topics.length === 0) {
          pushAi(
            "Please list at least one valid **topic** (e.g., *Arrays, Linked Lists, Trees*).",
            { isWarning: true },
          );
          return;
        }
        setCourseDraft((prev) => ({ ...prev, topicsList: topics }));
        setStep(4);
        pushAi(
          `Added **${topics.length} topics**: *${topics.join(", ")}*.\n\n**Question 4 of 7:** Do you want **PDF notes** generated on each topic?`,
          { quickChoices: ["Yes, include PDF Notes", "No, skip PDF Notes"] },
        );
        return;
      }

      if (step === 4) {
        const yn = parseYesNo(text);
        if (yn === null) {
          pushAi(
            "Please reply **Yes** or **No** for PDF notes on each topic.",
            {
              isWarning: true,
              quickChoices: ["Yes, include PDF Notes", "No, skip PDF Notes"],
            },
          );
          return;
        }
        setCourseDraft((prev) => ({ ...prev, includePdfNotes: yn }));
        setStep(5);
        pushAi(
          "**Question 5 of 7:** Do you want **PDF books from Google** on each topic if available?",
          {
            quickChoices: [
              "Yes, include Google Books",
              "No, skip Google Books",
            ],
          },
        );
        return;
      }

      if (step === 5) {
        const yn = parseYesNo(text);
        if (yn === null) {
          pushAi("Please reply **Yes** or **No** for Google PDF books.", {
            isWarning: true,
            quickChoices: [
              "Yes, include Google Books",
              "No, skip Google Books",
            ],
          });
          return;
        }
        setCourseDraft((prev) => ({ ...prev, includeGoogleBooks: yn }));
        setStep(6);
        pushAi(
          "**Question 6 of 7:** Do you want **video lectures** and **practice tests** on each topic?",
          {
            quickChoices: [
              "Yes, both Videos & Tests",
              "Only Video Lectures",
              "No, skip both",
            ],
          },
        );
        return;
      }

      if (step === 6) {
        const lower = text.toLowerCase();
        const yn = parseYesNo(text);
        if (yn === null && !lower.includes("only")) {
          pushAi(
            "Please select whether you want **video lectures** and **practice tests**.",
            {
              isWarning: true,
              quickChoices: [
                "Yes, both Videos & Tests",
                "Only Video Lectures",
                "No, skip both",
              ],
            },
          );
          return;
        }
        const wantsVideos = yn === true || lower.includes("video");
        const wantsTests = yn === true || lower.includes("test");
        setCourseDraft((prev) => ({
          ...prev,
          includeVideos: wantsVideos,
          includeTests: wantsTests,
        }));
        setStep(7);
        pushAi(
          "**Question 7 of 7:** Is there any **time boundation / deadline** to complete the course? Pick a target date below or type a timeframe (e.g., *14 days*).",
          { showDatePicker: true },
        );
        return;
      }

      if (step === 7) {
        let resolvedDeadline = deadlinePicker;
        if (!resolvedDeadline) {
          const daysMatch = text.match(/(\d+)/);
          const days = daysMatch ? parseInt(daysMatch[1], 10) : 7;
          resolvedDeadline = new Date(
            Date.now() + days * 86400000,
          ).toISOString();
        }

        const payload = { ...courseDraft, deadline: resolvedDeadline };
        setIsBusy(true);
        pushAi(
          `Building your complete course **"${payload.courseTitle}"** scheduled to finish by **${new Date(
            resolvedDeadline,
          ).toLocaleDateString()}**...`,
        );

        try {
          const res = await fetch("http://localhost:5000/api/ai/build-course", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (res.ok && data.course) {
            (data.resources || []).forEach((r) => dispatch(addResource(r)));
            (data.tests || []).forEach((t) => dispatch(addAvailableTest(t)));
            if (data.plannerDays) dispatch(setFullSchedule(data.plannerDays));

            setAgentMode("free");
            setStep(0);
            pushAi(
              `Complete course **"${data.course.title}"** is generated and synced across **Study Planner**, **Books & PDFs**, **Video Lessons**, and **Practice Tests**!`,
              { createdCourse: data.course, showModeOptions: true },
            );
          } else {
            pushAi(data.error || "Failed to generate complete course.");
          }
        } finally {
          setIsBusy(false);
        }
      }
    }
  };

  const activeModeLabel =
    AGENT_OPTIONS.find((o) => o.id === agentMode)?.label || "Free Doubt Chat";

  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-[#0F1624] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Clean Minimal Header */}
      <header className="px-4 sm:px-6 py-3.5 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white">
                Sync AI
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-semibold">
                {activeModeLabel}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              Online • Academic & Course Assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setAgentMode("free");
            setStep(0);
            setMessages([buildWelcomeMessage()]);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F1624] hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 cursor-pointer transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </header>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : m.isWarning
                      ? "bg-rose-500/20 border border-rose-500/40 text-rose-400"
                      : "bg-[#070A11] border border-slate-700 text-cyan-400"
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : m.isWarning ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[90%] sm:max-w-2xl rounded-2xl px-4 py-3.5 shadow-md space-y-3 ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-xs"
                    : m.isWarning
                      ? "bg-rose-950/50 border border-rose-500/40 text-rose-200 rounded-tl-xs"
                      : "bg-[#070A11] border border-slate-800 text-slate-200 rounded-tl-xs"
                }`}
              >
                <div className="text-xs sm:text-[13px] whitespace-pre-line leading-relaxed">
                  {m.text.split(/(\*\*.*?\*\*)/g).map((chunk, i) =>
                    chunk.startsWith("**") && chunk.endsWith("**") ? (
                      <strong key={i} className="font-bold text-white">
                        {chunk.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={i}>{chunk}</span>
                    ),
                  )}
                </div>

                {/* Workflow Option Cards Embedded Directly Inside AI Prompt Bubble */}
                {m.showModeOptions && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {AGENT_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => selectAgentMode(opt.id)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${opt.accent}`}
                        >
                          <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white">
                              {opt.label}
                            </p>
                            <p className="text-[11px] text-slate-300/80 leading-snug mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Quick Choices */}
                {m.quickChoices && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.quickChoices.map((choice, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(choice)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}

                {/* Deadline Date Picker in Step 7 */}
                {m.showDatePicker && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <input
                      type="date"
                      value={deadlinePicker}
                      onChange={(e) => setDeadlinePicker(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-[#0F1624] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      disabled={!deadlinePicker}
                      onClick={() => handleSend(`Deadline: ${deadlinePicker}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                    >
                      Confirm Deadline
                    </button>
                  </div>
                )}

                {/* Created Practice Test Card */}
                {m.createdTest && (
                  <div className="p-3.5 rounded-xl bg-[#0F1624] border border-emerald-500/30 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {m.createdTest.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {m.createdTest.questions.length} Questions • Shuffles on
                        every attempt
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(setActiveTest(m.createdTest));
                        navigate("/app/tests");
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer shrink-0"
                    >
                      Start Test →
                    </button>
                  </div>
                )}

                {/* Created Homework PDF Card */}
                {m.createdPdf && (
                  <div className="p-3.5 rounded-xl bg-[#0F1624] border border-indigo-500/30 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {m.createdPdf.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Saved to Books & PDF Vault
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/app/books")}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shrink-0"
                    >
                      Open PDF →
                    </button>
                  </div>
                )}

                {/* Created Complete Course Card */}
                {m.createdCourse && (
                  <div className="p-3.5 rounded-xl bg-[#0F1624] border border-cyan-500/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {m.createdCourse.title}
                      </span>
                      <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Due{" "}
                        {m.createdCourse.timeBoundLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigate("/app/planner")}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                      >
                        Track in Study Planner
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/app/books")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Open PDFs & Books
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/app/videos")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Watch Lectures
                      </button>
                    </div>
                  </div>
                )}

                <span className="block text-[10px] text-slate-500">
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isBusy && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#070A11] border border-slate-700 text-cyan-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#070A11] border border-slate-800 flex items-center gap-2 text-xs text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Sync AI is working...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Homework Format & File Bar */}
      {agentMode === "homework" && (
        <div className="px-4 py-2 bg-[#0B0F19] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Output Format:</span>
            {[
              ["text", "Text Answer"],
              ["pdf", "PDF Book / File"],
              ["code", "Code Solution"],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setHwFormat(val)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                  hwFormat === val
                    ? "bg-indigo-600 text-white"
                    : "bg-[#0F1624] text-slate-400 border border-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F1624] border border-slate-700 text-[11px] text-cyan-300 cursor-pointer hover:border-cyan-500">
            <Paperclip className="w-3.5 h-3.5" />
            <span>{hwFileName || "Attach PDF / Question File"}</span>
            <input
              type="file"
              accept=".pdf,.txt,.png,.jpg"
              onChange={handleFileAttach}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Composer */}
      <footer className="p-3 sm:p-4 bg-[#0B0F19] border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              agentMode === "free"
                ? "Ask Sync AI any doubt, share thoughts, or click an option above..."
                : agentMode === "test"
                  ? "Enter topic or number of questions..."
                  : agentMode === "homework"
                    ? "Paste your assignment question or describe the PDF book you want..."
                    : "Answer Sync AI's course question..."
            }
            className="flex-1 bg-[#070A11] border border-slate-700 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="h-11 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </footer>
    </div>
  );
}
