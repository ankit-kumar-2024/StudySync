import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTestHistory = createAsyncThunk(
  "tests/fetchHistory",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const res = await fetch("http://localhost:5000/api/tests/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return res.ok ? data.history : [];
  },
);

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
  history: [],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTestHistory: (state, action) => {
      state.history = action.payload;
    },
    recordTestAttempt: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTestHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});

export const { setTestHistory, recordTestAttempt } = testsSlice.actions;
export default testsSlice.reducer;
