import { createSlice } from "@reduxjs/toolkit";

const defaultResources = [
  {
    id: "r-2001",
    title: "JEE Advanced Mathematics PYQ (2018-2024)",
    file_type: "PYQ",
    subject: "Mathematics",
    size: "4.8 MB",
    exam_year: 2024,
  },
  {
    id: "r-2002",
    title: "HC Verma Vol 1 - Mechanics Solutions",
    file_type: "Book",
    subject: "Physics",
    size: "12.4 MB",
    exam_year: null,
  },
];

const initialState = {
  items: defaultResources,
  selectedFilter: "all",
  activeVideoFromCourse: null,
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources: (state, action) => {
      state.items = [...action.payload, ...defaultResources];
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
      if (course) {
        course.deadline = deadline;
      }
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
