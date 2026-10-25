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
        {
          id: "s-3",
          time: "08:00 - 09:00 PM",
          subject: "Chemistry",
          topic: "Aldol Mechanism Review",
          status: "pending",
        },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        {
          id: "s-4",
          time: "06:00 - 08:30 AM",
          subject: "Physics",
          topic: "Electrostatics Formulas",
          status: "pending",
        },
        {
          id: "s-5",
          time: "05:00 - 07:00 PM",
          subject: "Mathematics",
          topic: "Definite Integrals Mock",
          status: "pending",
        },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        {
          id: "s-6",
          time: "06:00 - 08:00 AM",
          subject: "Chemistry",
          topic: "Periodic Trends & Coordination",
          status: "pending",
        },
        {
          id: "s-7",
          time: "04:30 - 06:30 PM",
          subject: "Full Mock",
          topic: "Diagnostic Paper #3",
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
