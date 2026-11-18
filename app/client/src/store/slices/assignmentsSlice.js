import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.items = action.payload;
    },
    submitAssignment: (state, action) => {
      const { id, file_url } = action.payload;
      const item = state.items.find((a) => a.id === id);
      if (item) {
        item.status = "submitted";
        item.file_url = file_url;
        item.grade = "Under Review";
      }
    },
  },
});

export const { setAssignments, submitAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
