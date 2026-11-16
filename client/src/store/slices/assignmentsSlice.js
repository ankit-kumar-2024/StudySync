import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "as-3001",
      title: "Wave Optics Lab Experiment Writeup",
      subject: "Physics",
      due_date: "Tomorrow, 11:59 PM",
      status: "pending",
      grade: null,
      feedback: null,
      file_url: null,
    },
    {
      id: "as-3002",
      title: "Periodic Table & Coordination Reactions",
      subject: "Chemistry",
      due_date: "3 Days ago",
      status: "graded",
      grade: "A- (92%)",
      feedback:
        "Strong grasp on ligand field stability. Ensure proper units in thermodynamic calculations.",
      file_url: "https://example.com/chem_coord.pdf",
    },
    {
      id: "as-3003",
      title: "Indefinite Integral Homework #4",
      subject: "Mathematics",
      due_date: "Yesterday",
      status: "submitted",
      grade: "Awaiting Review",
      feedback: null,
      file_url: "https://example.com/math_hw4.pdf",
    },
  ],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
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

export const { submitAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
