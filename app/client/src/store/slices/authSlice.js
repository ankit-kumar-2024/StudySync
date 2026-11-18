import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("studysync_user") || "null");
const savedToken = localStorage.getItem("studysync_token") || "";

const initialState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: Boolean(savedToken),
  settings: savedUser?.settings || {
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
      if (action.payload.user?.settings) {
        state.settings = action.payload.user.settings;
      }
      localStorage.setItem(
        "studysync_user",
        JSON.stringify(action.payload.user),
      );
      localStorage.setItem("studysync_token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("studysync_user");
      localStorage.removeItem("studysync_token");
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("studysync_user", JSON.stringify(state.user));
    },
    updatePreferences: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
      if (state.user) {
        state.user.settings = state.settings;
        localStorage.setItem("studysync_user", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginSuccess, logout, updateProfile, updatePreferences } =
  authSlice.actions;
export default authSlice.reducer;
