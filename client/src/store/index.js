import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import resourcesReducer from "./slices/resourcesSlice";
import testsReducer from "./slices/testsSlice";
import plannerReducer from "./slices/plannerSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    resources: resourcesReducer,
    tests: testsReducer,
    planner: plannerReducer,
    assignments: assignmentsReducer,
    notifications: notificationsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
