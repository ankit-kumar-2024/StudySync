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
  }
);

const initialState = {
  availableTests: [],
  activeTest: null,
  history: [],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setAvailableTests: (state, action) => {
      state.availableTests = action.payload || [];
    },
    addAvailableTest: (state, action) => {
      state.availableTests.unshift(action.payload);
    },
    setActiveTest: (state, action) => {
      state.activeTest = action.payload;
    },
    setTestHistory: (state, action) => {
      state.history = action.payload || [];
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

export const {
  setAvailableTests,
  addAvailableTest,
  setActiveTest,
  setTestHistory,
  recordTestAttempt,
} = testsSlice.actions;

export default testsSlice.reducer;