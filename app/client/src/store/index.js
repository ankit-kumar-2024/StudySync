import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import testsReducer from "./slices/testsSlice";
import resourcesReducer from "./slices/resourcesSlice";
import plannerReducer from "./slices/plannerSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    assignments: assignmentsReducer,
    tests: testsReducer,
    resources: resourcesReducer,
    planner: plannerReducer,
    notifications: notificationsReducer,
  },
});
