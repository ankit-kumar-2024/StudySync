import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  HelpCircle,
} from "lucide-react";
import {
  recordTestAttempt,
  fetchTestHistory,
  setActiveTest,
} from "../store/slices/testsSlice";

// Fisher-Yates shuffle so every attempt changes the sequence of questions
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function TestsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const availableTests = useSelector((state) => state.tests.availableTests);
  const activeTest = useSelector((state) => state.tests.activeTest);
  const history = useSelector((state) => state.tests.history);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [evaluationReport, setEvaluationReport] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchTestHistory());
  }, [token, dispatch]);

  // Launch and shuffle a test whenever activeTest changes or Retake is clicked
  const launchShuffledTest = (testObj) => {
    if (!testObj?.questions?.length) return;
    dispatch(setActiveTest(testObj));
    setShuffledQuestions(shuffleArray(testObj.questions));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setEvaluationReport(null);
    setTimeLeft(testObj.questions.length * 60);
  };

  useEffect(() => {
    if (activeTest && shuffledQuestions.length === 0 && !evaluationReport) {
      launchShuffledTest(activeTest);
    }
  }, [activeTest]);

  useEffect(() => {
    if (shuffledQuestions.length === 0 || evaluationReport) return;
    const timer = setInterval(
      () => setTimeLeft((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, [shuffledQuestions, evaluationReport]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [timeLeft]);

  const handleSubmitTest = async () => {
    let score = 0;
    let rightCount = 0;
    let wrongCount = 0;
    let missedCount = 0;
    const weakTopics = [];

    const detailedBreakdown = shuffledQuestions.map((q, idx) => {
      const userAns = selectedAnswers[idx] || null;
      let status = "missed";
      if (!userAns) {
        missedCount += 1;
        weakTopics.push(q.topic || activeTest.topic);
      } else if (userAns === q.correct) {
        status = "right";
        rightCount += 1;
        score += 4;
      } else {
        status = "wrong";
        wrongCount += 1;
        score -= 1;
        weakTopics.push(q.topic || activeTest.topic);
      }
      return { ...q, userAns, status };
    });

    const totalMarks = shuffledQuestions.length * 4;
    const percentage = Math.max(0, Math.round((score / totalMarks) * 100));

    const report = {
      attempt_id: `a-${Date.now()}`,
      test_id: activeTest.id,
      title: activeTest.title,
      score,
      total_marks: totalMarks,
      percentage,
      rightCount,
      wrongCount,
      missedCount,
      breakdown: detailedBreakdown,
      time_taken: Math.max(
        1,
        Math.round((shuffledQuestions.length * 60 - timeLeft) / 60),
      ),
      weak_topics: [...new Set(weakTopics)],
      attempted_at: new Date().toISOString(),
    };

    setEvaluationReport(report);
    dispatch(recordTestAttempt(report));

    await fetch("http://localhost:5000/api/tests/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(report),
    });
  };

  // Empty State when no tests have been generated via Sync AI yet
  if (availableTests.length === 0 && shuffledQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-white">
          No Practice Tests Created Yet
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Open Sync AI and select <strong>Practice Test</strong> or{" "}
          <strong>Complete Course</strong> to generate repeatable tests with
          shuffled question sequences.
        </p>
        <button
          type="button"
          onClick={() => navigate("/app/chat")}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" /> Create Test with Sync AI
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-100">
      {/* Available Reusable Tests Shelf */}
      <div className="bg-[#0F1624] border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white">
              Sync AI Practice Tests
            </h1>
            <p className="text-xs text-slate-400">
              Select any test below to practice—question order automatically
              shuffles on every attempt.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/app/chat")}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
          >
            + New Test via Sync AI
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {availableTests.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[#070A11] border border-slate-800 hover:border-indigo-500/50 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400">
                  {t.questions.length} Questions
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-2">
                  {t.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => launchShuffledTest(t)}
                className="w-full py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition cursor-pointer"
              >
                Practice Now (Shuffled)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EVALUATION REPORT (Shows Right, Wrong, and Missed Questions) */}
      {evaluationReport && (
        <div className="bg-[#0F1624] border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Result & Answer Review: {evaluationReport.title}
              </h2>
              <p className="text-xs text-slate-400">
                Score:{" "}
                <strong className="text-indigo-400">
                  {evaluationReport.score}/{evaluationReport.total_marks}
                </strong>{" "}
                ({evaluationReport.percentage}%)
              </p>
            </div>

            <button
              type="button"
              onClick={() => launchShuffledTest(activeTest)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Test (New Sequence)
            </button>
          </div>

          {/* Right / Wrong / Missed Counters */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-xs text-emerald-300 font-semibold">
                Right Answers
              </p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {evaluationReport.rightCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
              <p className="text-xs text-rose-300 font-semibold">
                Wrong Answers
              </p>
              <p className="text-2xl font-extrabold text-rose-400 mt-1">
                {evaluationReport.wrongCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <p className="text-xs text-amber-300 font-semibold">
                Missed Questions
              </p>
              <p className="text-2xl font-extrabold text-amber-400 mt-1">
                {evaluationReport.missedCount}
              </p>
            </div>
          </div>

          {/* Question-by-Question Review */}
          <div className="space-y-3">
            {evaluationReport.breakdown.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 ${
                  item.status === "right"
                    ? "bg-emerald-950/20 border-emerald-500/30"
                    : item.status === "wrong"
                      ? "bg-rose-950/20 border-rose-500/30"
                      : "bg-amber-950/20 border-amber-500/30"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white">
                    Q{idx + 1}. {item.q}
                  </span>
                  <span
                    className={`uppercase px-2 py-0.5 rounded text-[10px] shrink-0 ml-2 inline-flex items-center gap-1 ${
                      item.status === "right"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : item.status === "wrong"
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {item.status === "right" && (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                    {item.status === "wrong" && <XCircle className="w-3 h-3" />}
                    {item.status === "missed" && (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {item.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <p>
                    Your Answer:{" "}
                    <strong
                      className={
                        item.status === "right"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {item.userAns || "Not Answered (Missed)"}
                    </strong>{" "}
                    • Correct Answer:{" "}
                    <strong className="text-emerald-400">{item.correct}</strong>
                  </p>
                  {item.explanation && (
                    <p className="text-[11px] text-slate-400 pt-1">
                      {item.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE SHUFFLED TEST INTERFACE */}
      {!evaluationReport && shuffledQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 bg-[#0F1624] rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {activeTest?.title}
              </h2>
              <span className="text-[11px] text-slate-400">
                +4.0 Right / -1.0 Wrong / 0 Missed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-xs font-mono font-bold text-indigo-300">
                <Clock className="w-4 h-4" />
                <span>{formattedTime}</span>
              </div>
              <button
                type="button"
                onClick={handleSubmitTest}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Submit Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 bg-[#0F1624] p-6 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400">
                Question {currentIdx + 1} of {shuffledQuestions.length}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {shuffledQuestions[currentIdx]?.q}
              </h3>

              <div className="space-y-2.5 pt-2">
                {shuffledQuestions[currentIdx]?.options.map((opt, i) => {
                  const picked = selectedAnswers[currentIdx] === opt[0];
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
                        picked
                          ? "border-indigo-500 bg-indigo-600/20 text-white font-semibold"
                          : "border-slate-800 bg-[#070A11] text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((c) => Math.max(0, c - 1))}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentIdx === shuffledQuestions.length - 1}
                  onClick={() =>
                    setCurrentIdx((c) =>
                      Math.min(shuffledQuestions.length - 1, c + 1),
                    )
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0F1624] p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white">
                Question Palette ({Object.keys(selectedAnswers).length}/
                {shuffledQuestions.length} Answered)
              </h3>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {shuffledQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`p-2 rounded-lg font-bold cursor-pointer ${
                      currentIdx === idx
                        ? "bg-indigo-600 text-white"
                        : selectedAnswers[idx]
                          ? "bg-emerald-600/80 text-white"
                          : "bg-[#070A11] text-slate-400 border border-slate-800"
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
    </div>
  );
}
