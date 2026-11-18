import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  days: [
    {
      day: "Monday",
      slots: [
        {
          id: "s-1",
          time: "06:00 - 08:00 AM",
          subject: "Mathematics",
          topic: "Calculus Ch 7 PYQs",
          status: "completed",
        },
        {
          id: "s-2",
          time: "04:00 - 06:00 PM",
          subject: "Physics",
          topic: "Wave Optics Numericals",
          status: "pending",
        },
      ],
    },
  ],
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
      state.days = action.payload;
    },
  },
});

export const { toggleSlotStatus, setFullSchedule } = plannerSlice.actions;
export default plannerSlice.reducer;
