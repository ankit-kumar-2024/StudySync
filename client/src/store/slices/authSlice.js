import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    user_id: "U-1001",
    name: "Sheetal Rawat",
    email: "sheetal.rawat@example.com",
    enrolmentNo: "2400170900",
    exam_target: "JEE Advanced",
    exam_date: "2025-05-25",
    daily_goal_hours: 5,
    studyCenter: "07162P, M.E.R.I.T",
  },
  token: "jwt-demo-token-xyz",
  isAuthenticated: true,
  settings: {
    emailDeadlines: true,
    aiDailyTips: true,
    sprintModeAlerts: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, updateProfile, updatePreferences } =
  authSlice.actions;
export default authSlice.reducer;
