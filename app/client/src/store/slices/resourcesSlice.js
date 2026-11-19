import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedFilter: "all",
  activeVideoFromCourse: null,
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources: (state, action) => {
      state.items = action.payload || [];
    },
    addResource: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteResource: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
    setResourceFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setActiveVideoFromCourse: (state, action) => {
      state.activeVideoFromCourse = action.payload;
    },
    toggleCourseModule: (state, action) => {
      const { courseId, moduleIndex } = action.payload;
      const course = state.items.find((r) => r.id === courseId);
      if (course) {
        const current = course.completedModules || [];
        course.completedModules = current.includes(moduleIndex)
          ? current.filter((idx) => idx !== moduleIndex)
          : [...current, moduleIndex];
      }
    },
    updateCourseDeadline: (state, action) => {
      const { courseId, deadline } = action.payload;
      const course = state.items.find((r) => r.id === courseId);
      if (course) course.deadline = deadline;
    },
  },
});

export const {
  setResources,
  addResource,
  deleteResource,
  setResourceFilter,
  setActiveVideoFromCourse,
  toggleCourseModule,
  updateCourseDeadline,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;