import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
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
    {
      id: "r-2003",
      title: "Organic Chemistry Named Reactions Quick Notes",
      file_type: "Notes",
      subject: "Chemistry",
      size: "2.1 MB",
      exam_year: null,
    },
  ],
  selectedFilter: "all",
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    addResource: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteResource: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
    setResourceFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { addResource, deleteResource, setResourceFilter } =
  resourcesSlice.actions;
export default resourcesSlice.reducer;
