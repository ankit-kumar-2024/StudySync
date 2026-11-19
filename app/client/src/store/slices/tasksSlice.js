import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filters: { search: "", subject: "all", priority: "all", status: "all" },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload || [];
    },
    addTask: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === "pending" ? "done" : "pending";
        task.progress = task.status === "done" ? 100 : 0;
      }
    },
    updateTaskDeadline: (state, action) => {
      const { id, deadline } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) task.deadline = deadline;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  toggleTaskStatus,
  updateTaskDeadline,
  setFilters,
} = tasksSlice.actions;
export default tasksSlice.reducer;
