import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import {
  recordTestAttempt,
  fetchTestHistory,
} from "../store/slices/testsSlice";

export default function TestsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const history = useSelector((state) => state.tests.history);
  const resources = useSelector((state) => state.resources.items);

  // Extract all Sync AI created course topics
  const aiCourseTopics = useMemo(() => {
    const list = [];
    resources.forEach((r) => {
      if (r.courseData?.modules) {
        r.courseData.modules.forEach((m) => {
          list.push({
            courseTitle: r.title,
            topicTitle: m.moduleTitle,
          });
        });
      }
    });
    return list;
  }, [resources]);

  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get("topic") || "",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [testId, setTestId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [resultModal, setResultModal] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchTestHistory());
  }, [token, dispatch]);

  // Auto-start 50-Q test if navigated with ?topic=...
  useEffect(() => {
    const paramTopic = searchParams.get("topic");
    if (paramTopic && token) {
      startFiftyQuestionTest(paramTopic);
    }
  }, [searchParams, token]);

  useEffect(() => {
    if (questions.length === 0) return;
    const timer = setInterval(
      () => setTimeLeft((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, [questions]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [timeLeft]);

  // Always generates 50 brand-new questions on every click
  const startFiftyQuestionTest = async (topicName) => {
    const target = (topicName || selectedTopic).trim();
    if (!target) return;

    setSelectedTopic(target);
    setIsGenerating(true);
    setResultModal(null);

    try {
      const res = await fetch("http://localhost:5000/api/tests/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic: target, count: 50 }),
      });
      const data = await res.json();
      if (res.ok && data.questions?.length) {
        setQuestions(data.questions);
        setQuizTitle(data.title);
        setTestId(data.test_id);
        setCurrentIdx(0);
        setSelectedAnswers({});
        setTimeLeft(50 * 60); // 50 minutes for 50 questions
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitTest = async () => {
    let score = 0;
    const weakTopics = [];

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 4;
      } else {
        if (selectedAnswers[idx]) score -= 1;
        weakTopics.push(q.topic || selectedTopic);
      }
    });

    const totalMarks = questions.length * 4;
    const percentage = Math.max(0, Math.round((score / totalMarks) * 100));

    const attemptData = {
      attempt_id: `a-${Date.now()}`,
      test_id: testId,
      title: quizTitle,
      score,
      total_marks: totalMarks,
      percentage,
      time_taken: Math.max(1, Math.round((50 * 60 - timeLeft) / 60)),
      weak_topics: [...new Set(weakTopics)].slice(0, 5),
      attempted_at: new Date().toISOString(),
    };

    dispatch(recordTestAttempt(attemptData));
    setResultModal(attemptData);

    await fetch("http://localhost:5000/api/tests/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(attemptData),
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-4 sm:p-6 font-sans space-y-6">
      {/* Sync AI Course Topic 50-Question Test Selector */}
      <div className="max-w-6xl mx-auto bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" /> Sync AI Dynamic Exam Engine
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              50-Question Topic Practice Tests
            </h1>
            <p className="text-xs text-slate-400">
              Every attempt generates 50 brand-new questions on your selected
              course topic.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startFiftyQuestionTest(selectedTopic);
            }}
            className="flex gap-2 w-full sm:w-auto"
          >
            <input
              type="text"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              placeholder="Or type any topic for 50 Qs..."
              className="flex-1 sm:w-64 bg-[#0B0F17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isGenerating || !selectedTopic.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-bold text-white cursor-pointer shrink-0"
            >
              {isGenerating ? "Generating 50 Qs..." : "Start 50-Q Test"}
            </button>
          </form>
        </div>

        {/* Sync AI Created Course Topics Pills */}
        {aiCourseTopics.length > 0 && (
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Your Sync AI Course Topics (Click to generate fresh 50-Q test):
            </p>
            <div className="flex flex-wrap gap-2">
              {aiCourseTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => startFiftyQuestionTest(item.topicTitle)}
                  className="px-3 py-1.5 rounded-xl bg-[#0B0F17] hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200 transition cursor-pointer"
                >
                  <span className="text-indigo-400 font-semibold">
                    {item.courseTitle}:
                  </span>{" "}
                  {item.topicTitle} (50 Qs)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active 50-Question Exam Interface */}
      {isGenerating && (
        <div className="max-w-6xl mx-auto p-12 bg-[#121824] border border-slate-800 rounded-2xl text-center space-y-3">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
          <h2 className="text-base font-bold text-white">
            Sync AI is generating 50 unique questions for "{selectedTopic}"...
          </h2>
          <p className="text-xs text-slate-400">
            Questions change automatically on every new attempt.
          </p>
        </div>
      )}

      {!isGenerating && questions.length > 0 && (
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="p-4 bg-[#121824] rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {quizTitle}
              </h2>
              <span className="text-[11px] text-slate-400">
                {questions.length} Questions • +4.0 / -1.0 Marking
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-xs font-mono font-bold text-indigo-300">
                <Clock className="w-4 h-4" />
                <span>{formattedTime}</span>
              </div>
              <button
                onClick={() => startFiftyQuestionTest(selectedTopic)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl inline-flex items-center gap-1 cursor-pointer"
                title="Regenerate 50 new questions"
              >
                <RotateCcw className="w-3.5 h-3.5" /> New 50 Qs
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Submit Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-indigo-400">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                  {questions[currentIdx]?.topic || selectedTopic}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {questions[currentIdx]?.q}
              </h3>

              <div className="space-y-2.5 pt-2">
                {questions[currentIdx]?.options.map((opt, i) => {
                  const isPicked = selectedAnswers[currentIdx] === opt[0];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [currentIdx]: opt[0],
                        })
                      }
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition cursor-pointer ${
                        isPicked
                          ? "border-indigo-500 bg-indigo-600/20 text-white font-semibold"
                          : "border-slate-800 bg-[#0B0F17] text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((c) => Math.max(0, c - 1))}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={currentIdx === questions.length - 1}
                  onClick={() =>
                    setCurrentIdx((c) => Math.min(questions.length - 1, c + 1))
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

            {/* 50-Question Number Palette */}
            <div className="lg:col-span-4 bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-3 max-h-[520px] overflow-y-auto">
              <h3 className="text-xs font-bold text-white">
                50-Question Palette ({Object.keys(selectedAnswers).length}/
                {questions.length} Answered)
              </h3>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`p-2 rounded-lg font-bold cursor-pointer transition ${
                      currentIdx === idx
                        ? "bg-indigo-600 text-white"
                        : selectedAnswers[idx]
                          ? "bg-emerald-600/80 text-white"
                          : "bg-[#0B0F17] text-slate-400 border border-slate-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {resultModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">
                Practice Test Evaluation
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-[#0B0F17] rounded-2xl border border-slate-800">
                <p className="text-[10px] text-slate-400">Score</p>
                <p className="text-base font-bold text-indigo-400">
                  {resultModal.score}/{resultModal.total_marks}
                </p>
              </div>
              <div className="p-3 bg-[#0B0F17] rounded-2xl border border-slate-800">
                <p className="text-[10px] text-slate-400">Accuracy</p>
                <p className="text-base font-bold text-emerald-400">
                  {resultModal.percentage}%
                </p>
              </div>
              <div className="p-3 bg-[#0B0F17] rounded-2xl border border-slate-800">
                <p className="text-[10px] text-slate-400">Time</p>
                <p className="text-base font-bold text-white">
                  {resultModal.time_taken}m
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startFiftyQuestionTest(selectedTopic)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Retake (50 New Qs)
              </button>
              <button
                onClick={() => navigate("/app/planner")}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Study Planner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
