import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import plannerReducer from "./slices/plannerSlice";
import resourcesReducer from "./slices/resourcesSlice";
import testsReducer from "./slices/testsSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    assignments: assignmentsReducer,
    planner: plannerReducer,
    resources: resourcesReducer,
    tests: testsReducer,
    notifications: notificationsReducer,
  },
});
