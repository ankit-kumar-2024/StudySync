import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableTests: [
    {
      id: "test-1",
      title: "JEE Advanced Mock Test #4",
      subject: "Full Syllabus",
      duration: "180 mins",
      questionsCount: 75,
      total_marks: 300,
    },
    {
      id: "test-2",
      title: "Calculus Diagnostics Quiz #2",
      subject: "Mathematics",
      duration: "45 mins",
      questionsCount: 25,
      total_marks: 100,
    },
    {
      id: "test-3",
      title: "Wave Optics Speed Drill",
      subject: "Physics",
      duration: "30 mins",
      questionsCount: 20,
      total_marks: 80,
    },
  ],
  history: [
    {
      attempt_id: "a-8001",
      test_id: "test-2",
      score: 82,
      total_marks: 100,
      percentage: 82,
      time_taken: 38,
      weak_topics: ["Indefinite Integration Substitution", "Limits at Infinity"],
      attempted_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
  ],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    recordTestAttempt: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { recordTestAttempt } = testsSlice.actions;
export default testsSlice.reducer;