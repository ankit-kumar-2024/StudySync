import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconCheck, IconClock } from "../components/common/Icons";
import { recordTestAttempt } from "../store/slices/testsSlice";

export default function TestsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [resultModal, setResultModal] = useState(null);

  const questions = [
    {
      id: 1,
      q: "Which data structure follows LIFO and provides O(1) amortized stack insertion?",
      options: ["A. Queue", "B. Stack", "C. Linked List", "D. BST"],
      correct: "B",
      topic: "Data Structures",
    },
    {
      id: 2,
      q: "What is the tight worst-case time complexity of QuickSort with a naive pivot?",
      options: ["A. O(N log N)", "B. O(N^2)", "C. O(N)", "D. O(log N)"],
      correct: "B",
      topic: "Algorithms: Sorting",
    },
    {
      id: 3,
      q: "Which algorithm solves Single Source Shortest Path with non-negative edge weights?",
      options: [
        "A. Dijkstra Algorithm",
        "B. Kruskal Algorithm",
        "C. Floyd-Warshall",
        "D. Prim Algorithm",
      ],
      correct: "A",
      topic: "Graph Theory",
    },
    {
      id: 4,
      q: "In relational algebra, which operation is commutative and associative?",
      options: [
        "A. Natural Join (⨝)",
        "B. Set Difference (-)",
        "C. Division (÷)",
        "D. Semi-join (⋉)",
      ],
      correct: "A",
      topic: "Database Management Systems",
    },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [timeLeft]);

  const handleSubmitTest = () => {
    let score = 0;
    const weakTopics = [];

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 4;
      } else {
        if (selectedAnswers[idx]) score -= 1;
        weakTopics.push(q.topic);
      }
    });

    const totalMarks = questions.length * 4;
    const percentage = Math.max(0, Math.round((score / totalMarks) * 100));

    const attemptData = {
      attempt_id: `a-${Date.now()}`,
      test_id: "test-cs-3",
      score,
      total_marks: totalMarks,
      percentage,
      time_taken: Math.round((20 * 60 - timeLeft) / 60),
      weak_topics: weakTopics,
      attempted_at: new Date().toISOString(),
    };

    dispatch(recordTestAttempt(attemptData));
    setResultModal(attemptData);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 font-['Inter',sans-serif] text-[#121c2a]">
      {/* Top Header */}
      <div className="p-4 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-bold text-[#121c2a]">
            Computer Science Diagnostic Quiz #3
          </h1>
          <span className="text-[11px] text-gray-500">
            +4.0 Marks / -1.0 Negative Scheme
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eff4ff] rounded-xl text-xs font-mono font-bold text-[#3525cd]">
            <IconClock className="w-4 h-4 shrink-0" />
            <span>{formattedTime}</span>
          </div>
          <button
            onClick={handleSubmitTest}
            className="px-4 py-2 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Quiz Area: Stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#dee9fc] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#3525cd]">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
              {questions[currentIdx].topic}
            </span>
          </div>

          <h2 className="text-sm sm:text-base font-bold text-[#121c2a]">
            {questions[currentIdx].q}
          </h2>

          <div className="space-y-2 pt-2">
            {questions[currentIdx].options.map((opt, i) => (
              <label
                key={i}
                className={`block p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedAnswers[currentIdx] === opt[0]
                    ? "border-[#3525cd] bg-[#eff4ff] font-bold text-[#3525cd]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${currentIdx}`}
                  className="mr-2.5"
                  checked={selectedAnswers[currentIdx] === opt[0]}
                  onChange={() =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [currentIdx]: opt[0],
                    })
                  }
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((c) => Math.max(0, c - 1))}
              className="px-3.5 py-2 bg-gray-100 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              disabled={currentIdx === questions.length - 1}
              onClick={() =>
                setCurrentIdx((c) => Math.min(questions.length - 1, c + 1))
              }
              className="px-4 py-2 bg-[#3525cd] text-white rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="lg:col-span-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#dee9fc] space-y-3">
          <h3 className="text-xs font-bold">Question Palette</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-2 gap-2 text-xs">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                  currentIdx === idx
                    ? "bg-[#3525cd] text-white shadow-xs"
                    : selectedAnswers[idx]
                      ? "bg-emerald-600 text-white"
                      : "bg-[#f8f9ff] text-[#464555] border border-[#dee9fc]"
                }`}
              >
                Q {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Test Result Evaluation Modal */}
      {resultModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full space-y-4 sm:space-y-5 shadow-2xl border border-[#dee9fc]">
            <div className="flex items-center gap-2 text-emerald-600">
              <IconCheck className="w-5 h-5 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-[#121c2a]">
                Test Evaluation Summary
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 sm:p-3 bg-[#f8f9ff] rounded-2xl border border-[#dee9fc]">
                <p className="text-[10px] text-gray-500 font-semibold">Score</p>
                <p className="text-sm sm:text-base font-bold text-[#3525cd]">
                  {resultModal.score}/{resultModal.total_marks}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-[#f8f9ff] rounded-2xl border border-[#dee9fc]">
                <p className="text-[10px] text-gray-500 font-semibold">
                  Percentage
                </p>
                <p className="text-sm sm:text-base font-bold text-emerald-600">
                  {resultModal.percentage}%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-[#f8f9ff] rounded-2xl border border-[#dee9fc]">
                <p className="text-[10px] text-gray-500 font-semibold">Time</p>
                <p className="text-sm sm:text-base font-bold text-[#121c2a]">
                  {resultModal.time_taken}m
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#121c2a] block">
                Weak Topics Identified:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {resultModal.weak_topics.length === 0 ? (
                  <span className="text-xs text-emerald-600 font-semibold">
                    Flawless performance! No weak spots detected.
                  </span>
                ) : (
                  resultModal.weak_topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-rose-50 text-[#ba1a1a] text-[10px] sm:text-[11px] font-semibold border border-rose-200"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => navigate("/app")}
              className="w-full py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
