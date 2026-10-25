import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "t-101",
      title: "Calculus Ch 7 PYQ Set",
      description: "Indefinite and definite integrals from 2019 to 2024",
      subject: "Mathematics",
      priority: "high",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 4.5).toISOString(),
      status: "pending",
      type: "study",
      progress: 65,
    },
    {
      id: "t-102",
      title: "Electrostatics Formula Sheet",
      description: "Summarize Gauss Law applications and potential gradients",
      subject: "Physics",
      priority: "med",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      status: "pending",
      type: "homework",
      progress: 40,
    },
    {
      id: "t-103",
      title: "Organic Chemistry Named Reactions",
      description: "Class 12 assignment submission for teacher grading",
      subject: "Chemistry",
      priority: "low",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      status: "done",
      type: "assignment",
      progress: 100,
    },
    {
      id: "t-104",
      title: "Thermodynamics Heat Engine Numericals",
      description: "Practice Carnot cycle and entropy formulas",
      subject: "Physics",
      priority: "high",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
      status: "pending",
      type: "study",
      progress: 20,
    },
  ],
  filters: {
    search: "",
    subject: "all",
    priority: "all",
    status: "all",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
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
      if (task) {
        task.deadline = deadline;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskStatus,
  updateTaskDeadline,
  setFilters,
} = tasksSlice.actions;
export default tasksSlice.reducer;
