import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  PlayCircle,
  FileText,
  HelpCircle,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  addResource,
  setActiveVideoFromCourse,
} from "../store/slices/resourcesSlice";
import { setFullSchedule } from "../store/slices/plannerSlice";

// ============================================================================
// STRICT VALIDATION HELPERS (Bot NEVER advances on invalid or ambiguous answers)
// ============================================================================
const FILLER_WORDS = new Set([
  "ok",
  "okay",
  "yes",
  "no",
  "hi",
  "hello",
  "hey",
  "nothing",
  "none",
  "idk",
  "asdf",
  "test",
  "abc",
  "xyz",
  "123",
]);

function validateCourseTitle(raw) {
  const clean = raw.trim();
  const lettersOnly = clean.replace(/[^a-zA-Z]/g, "");
  if (clean.length < 3 || lettersOnly.length < 3) {
    return {
      valid: false,
      error:
        "Please enter a meaningful **course name** (at least 3 letters, e.g., *Full-Stack MERN Mastery* or *Organic Chemistry Crash Course*). I cannot proceed with numbers or symbols alone.",
    };
  }
  if (FILLER_WORDS.has(clean.toLowerCase())) {
    return {
      valid: false,
      error: `"${clean}" is not a valid course title. Please tell me the actual name of the course you want to study.`,
    };
  }
  return { valid: true, value: clean };
}

function validateTopicsList(raw) {
  const parts = raw
    .split(/,|\n|;/)
    .map((t) => t.trim())
    .filter(Boolean);

  const validTopics = parts.filter((t) => {
    const letters = t.replace(/[^a-zA-Z]/g, "");
    return letters.length >= 3 && !FILLER_WORDS.has(t.toLowerCase());
  });

  if (validTopics.length === 0) {
    return {
      valid: false,
      error:
        "Please provide at least one valid **topic name** (e.g., *Closures, Promises, Event Loop*). Generic words like 'yes', 'no', or random characters are not accepted.",
    };
  }
  return { valid: true, value: validTopics };
}

function validateYesNo(raw, featureLabel) {
  const clean = raw.trim().toLowerCase();
  const yesPatterns = [
    "yes",
    "y",
    "yeah",
    "yep",
    "sure",
    "haan",
    "ha",
    "want",
    "include",
    "yes, include books & pdfs",
    "yes, include video lectures",
  ];
  const noPatterns = [
    "no",
    "n",
    "nope",
    "nah",
    "nahi",
    "na",
    "skip",
    "no, skip pdfs",
    "no, skip videos",
  ];

  if (yesPatterns.includes(clean) || clean.startsWith("yes")) {
    return { valid: true, value: true };
  }
  if (noPatterns.includes(clean) || clean.startsWith("no")) {
    return { valid: true, value: false };
  }

  return {
    valid: false,
    error: `Invalid response. Please reply clearly with **Yes** or **No** for whether you want **${featureLabel}**.`,
  };
}

function validateTestAndDeadline(raw) {
  const clean = raw.trim().toLowerCase();

  // Check for clear Yes or No regarding the practice test
  const hasYes = /\b(yes|y|yeah|sure|haan|ha|want|include)\b/.test(clean);
  const hasNo = /\b(no|n|nope|nahi|na|skip)\b/.test(clean);

  if (!hasYes && !hasNo) {
    return {
      valid: false,
      error:
        "Please specify **Yes** or **No** for the **50-question practice test** AND include your **time boundation** (for example: *Yes, 7 days* or *No, 2 weeks*).",
    };
  }

  // Check for a valid timeframe (e.g., "7 days", "2 weeks", "1 month", or future date)
  const timeMatch = clean.match(
    /(\d+)\s*(day|days|week|weeks|month|months|hour|hours)/,
  );
  const parsedDate = Date.parse(raw.replace(/^(yes|no)[,\s-]*/i, "").trim());

  if (!timeMatch && (Number.isNaN(parsedDate) || parsedDate <= Date.now())) {
    return {
      valid: false,
      error:
        "Please include a valid **time boundation** to complete the course (e.g., *Yes, 7 days*, *Yes, 2 weeks*, or *Yes, 1 month*). I cannot create the course without a valid timeline.",
    };
  }

  const timeBoundLabel = timeMatch
    ? `${timeMatch[1]} ${timeMatch[2]}`
    : new Date(parsedDate).toLocaleDateString();

  return {
    valid: true,
    includeTests: hasYes && !hasNo,
    timeBoundation: timeBoundLabel,
  };
}

// ============================================================================
// MAIN CHATBOT PAGE
// ============================================================================
export default function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const messagesEndRef = useRef(null);

  const [wizardStep, setWizardStep] = useState(1);
  const [courseConfig, setCourseConfig] = useState({
    courseTitle: "",
    topicsList: [],
    includeBooksPdf: true,
    includeVideos: true,
    includeTests: true,
    timeBoundation: "",
  });

  const initialGreeting = {
    id: "step-1",
    sender: "ai",
    text: `Hello ${user?.name?.split(" ")[0] || "Student"}! I am **Sync AI**, your Course Architect.\n\n**Question 1 of 5:** Tell me the **name or title of the course** that you want (you can choose whatever name you want).`,
    timestamp: "Now",
  };

  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBuilding]);

  const appendAiMessage = (text, extra = {}) => {
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

  const resetWizard = () => {
    setWizardStep(1);
    setCourseConfig({
      courseTitle: "",
      topicsList: [],
      includeBooksPdf: true,
      includeVideos: true,
      includeTests: true,
      timeBoundation: "",
    });
    setMessages([initialGreeting]);
  };

  const handleUserReply = async (rawReply) => {
    const answer = (rawReply ?? input).trim();
    if (!answer || isBuilding) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text: answer,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");

    // STEP 1: Validate Course Name
    if (wizardStep === 1) {
      const check = validateCourseTitle(answer);
      if (!check.valid) {
        setTimeout(
          () => appendAiMessage(check.error, { isWarning: true }),
          200,
        );
        return;
      }
      setCourseConfig((prev) => ({ ...prev, courseTitle: check.value }));
      setWizardStep(2);
      setTimeout(() => {
        appendAiMessage(
          `Course title confirmed: **"${check.value}"**.\n\n**Question 2 of 5:** Tell me the **topics** that you want to learn in this course (separate topics with commas, e.g., *Closures, Promises, Event Loop*).`,
        );
      }, 200);
      return;
    }

    // STEP 2: Validate Topics List
    if (wizardStep === 2) {
      const check = validateTopicsList(answer);
      if (!check.valid) {
        setTimeout(
          () => appendAiMessage(check.error, { isWarning: true }),
          200,
        );
        return;
      }
      setCourseConfig((prev) => ({ ...prev, topicsList: check.value }));
      setWizardStep(3);
      setTimeout(() => {
        appendAiMessage(
          `Added **${check.value.length} topics**: *${check.value.join(
            ", ",
          )}*.\n\n**Question 3 of 5:** Do you want **Books and PDFs** for these topics?`,
          { quickChoices: ["Yes, include Books & PDFs", "No, skip PDFs"] },
        );
      }, 200);
      return;
    }

    // STEP 3: Validate Books & PDFs (Yes/No)
    if (wizardStep === 3) {
      const check = validateYesNo(answer, "Books and PDFs");
      if (!check.valid) {
        setTimeout(
          () =>
            appendAiMessage(check.error, {
              isWarning: true,
              quickChoices: ["Yes, include Books & PDFs", "No, skip PDFs"],
            }),
          200,
        );
        return;
      }
      setCourseConfig((prev) => ({ ...prev, includeBooksPdf: check.value }));
      setWizardStep(4);
      setTimeout(() => {
        appendAiMessage(
          `${check.value ? "Books & PDFs included." : "Books & PDFs skipped."}\n\n**Question 4 of 5:** Do you want **Video Lectures** on these topics?`,
          { quickChoices: ["Yes, include Video Lectures", "No, skip Videos"] },
        );
      }, 200);
      return;
    }

    // STEP 4: Validate Video Lectures (Yes/No)
    if (wizardStep === 4) {
      const check = validateYesNo(answer, "Video Lectures");
      if (!check.valid) {
        setTimeout(
          () =>
            appendAiMessage(check.error, {
              isWarning: true,
              quickChoices: ["Yes, include Video Lectures", "No, skip Videos"],
            }),
          200,
        );
        return;
      }
      setCourseConfig((prev) => ({ ...prev, includeVideos: check.value }));
      setWizardStep(5);
      setTimeout(() => {
        appendAiMessage(
          `${check.value ? "Video lectures included." : "Video lectures skipped."}\n\n**Question 5 of 5:** Do you want a **practice test (50 questions per topic)** to practice this course, and what is your **time boundation** to complete the course?`,
          {
            quickChoices: [
              "Yes, 7 days",
              "Yes, 14 days",
              "Yes, 30 days",
              "No, 7 days",
            ],
          },
        );
      }, 200);
      return;
    }

    // STEP 5: Validate Practice Test + Time Boundation -> Build Course
    if (wizardStep === 5) {
      const check = validateTestAndDeadline(answer);
      if (!check.valid) {
        setTimeout(
          () =>
            appendAiMessage(check.error, {
              isWarning: true,
              quickChoices: [
                "Yes, 7 days",
                "Yes, 14 days",
                "Yes, 30 days",
                "No, 7 days",
              ],
            }),
          200,
        );
        return;
      }

      const finalPayload = {
        ...courseConfig,
        includeTests: check.includeTests,
        timeBoundation: check.timeBoundation,
      };
      setCourseConfig(finalPayload);
      setWizardStep(6);
      setIsBuilding(true);

      appendAiMessage(
        `All 5 answers verified! Sync AI is now generating **"${finalPayload.courseTitle}"** (1 YouTube Video + 1 PDF Book + 1 Dynamic 50-Question Practice Test per topic • Deadline: **${finalPayload.timeBoundation}**)...`,
      );

      try {
        const res = await fetch("http://localhost:5000/api/ai/build-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalPayload),
        });
        const data = await res.json();

        if (res.ok && data.course) {
          dispatch(addResource(data.course));
          (data.topicPdfs || []).forEach((pdfItem) =>
            dispatch(addResource(pdfItem)),
          );
          if (data.plannerDays) dispatch(setFullSchedule(data.plannerDays));

          appendAiMessage(
            `Course **"${data.course.title}"** is ready! Everything is synced to **Books, PDFs & Courses**, **Video Lessons**, **50-Q Practice Tests**, and **Study Planner**:`,
            { generatedCourse: data.course },
          );
        } else {
          appendAiMessage(
            data.error || "Failed to build course. Please try again.",
          );
        }
      } catch {
        appendAiMessage("Unable to connect to Sync AI server on port 5000.");
      } finally {
        setIsBuilding(false);
      }
      return;
    }

    // STEP 6: Post-Creation Follow-up Chat
    setIsBuilding(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: answer, history: messages.slice(-6) }),
      });
      const data = await res.json();
      appendAiMessage(data.reply || "How else can I assist with your course?");
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-[#121824] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Header with 5-Step Progress Indicator */}
      <header className="px-5 py-3.5 bg-[#0B0F17] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white">
                Sync AI
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-semibold">
                {wizardStep <= 5
                  ? `Question ${wizardStep} / 5`
                  : "Course Built"}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              Strict Validated Course, Video, PDF Book & 50-Q Test Builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* 5-Step Progress Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`h-2 rounded-full transition-all ${
                  wizardStep > s
                    ? "w-5 bg-emerald-500"
                    : wizardStep === s
                      ? "w-6 bg-indigo-500"
                      : "w-2 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={resetWizard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121824] hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Course</span>
          </button>
        </div>
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
                      : "bg-[#0B0F17] border border-slate-700 text-cyan-400"
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
                className={`max-w-[88%] sm:max-w-2xl rounded-2xl px-4 py-3.5 shadow-md space-y-3 ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-xs"
                    : m.isWarning
                      ? "bg-rose-950/50 border border-rose-500/40 text-rose-200 rounded-tl-xs"
                      : "bg-[#0B0F17] border border-slate-800 text-slate-200 rounded-tl-xs"
                }`}
              >
                <div className="text-xs sm:text-[13px] whitespace-pre-line leading-relaxed">
                  {m.text.split(/(\*\*.*?\*\*)/g).map((chunk, i) =>
                    chunk.startsWith("**") && chunk.endsWith("**") ? (
                      <strong key={i} className="font-bold text-white">
                        {chunk.slice(2, -2)}
                      </strong>
                    ) : chunk.startsWith("*") && chunk.endsWith("*") ? (
                      <em key={i} className="text-indigo-300">
                        {chunk.slice(1, -1)}
                      </em>
                    ) : (
                      <span key={i}>{chunk}</span>
                    ),
                  )}
                </div>

                {m.quickChoices && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.quickChoices.map((choice, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUserReply(choice)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}

                {m.generatedCourse && (
                  <div className="p-4 rounded-2xl bg-[#121824] border border-indigo-500/30 space-y-3 mt-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          {m.generatedCourse.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Deadline: {m.generatedCourse.timeBoundLabel}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {m.generatedCourse.courseData?.modules?.map(
                        (mod, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-indigo-300 truncate">
                                Topic {idx + 1}: {mod.moduleTitle}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                1 Video • 1 PDF Book • 50-Question Practice Test
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                              {mod.video && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch(
                                      setActiveVideoFromCourse(mod.video),
                                    );
                                    navigate("/app/videos");
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                                >
                                  <PlayCircle className="w-3 h-3" /> Video
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => navigate("/app/books")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                              >
                                <FileText className="w-3 h-3" /> PDF Book
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/app/tests?topic=${encodeURIComponent(mod.moduleTitle)}`,
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                              >
                                <HelpCircle className="w-3 h-3" /> 50-Q Test
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => navigate("/app/planner")}
                        className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
                      >
                        Track Progress & Timeline in Study Planner →
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

        {isBuilding && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0B0F17] border border-slate-700 text-cyan-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#0B0F17] border border-slate-800 flex items-center gap-2 text-xs text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>
                Sync AI is building your videos, PDF books, and 50-Q tests...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <footer className="p-3 sm:p-4 bg-[#0B0F17] border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserReply();
          }}
          className="flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              wizardStep === 1
                ? "Step 1: Enter a valid course title (e.g., Full-Stack React Mastery)..."
                : wizardStep === 2
                  ? "Step 2: Enter topics separated by commas (e.g., Hooks, Redux, Routing)..."
                  : wizardStep === 3
                    ? "Step 3: Reply Yes or No for Books & PDFs..."
                    : wizardStep === 4
                      ? "Step 4: Reply Yes or No for Video Lectures..."
                      : wizardStep === 5
                        ? "Step 5: Reply Yes/No for 50-Q Test + Timeline (e.g., Yes, 7 days)..."
                        : "Ask Sync AI anything about your course..."
            }
            className="flex-1 bg-[#121824] border border-slate-700 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isBuilding}
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
