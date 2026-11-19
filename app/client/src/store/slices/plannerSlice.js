import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  days: [],
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    toggleSlotStatus: (state, action) => {
      const { dayIndex, slotId } = action.payload;
      const slot = state.days[dayIndex]?.slots.find((s) => s.id === slotId);
      if (slot) {
        slot.status = slot.status === "pending" ? "completed" : "pending";
      }
    },
    setFullSchedule: (state, action) => {
      state.days = action.payload || [];
    },
  },
});

export const { toggleSlotStatus, setFullSchedule } = plannerSlice.actions;
export default plannerSlice.reducer;
