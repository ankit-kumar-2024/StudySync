import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "notif-1",
      title: "Urgent Deadline",
      message: "Calculus Ch 7 PYQ Set is due soon.",
      type: "deadline",
      is_read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "notif-2",
      title: "AI Tip Ready",
      message: "Ace recommends reviewing Wave Optics speed drill.",
      type: "ai_tip",
      is_read: false,
      created_at: new Date().toISOString(),
    },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.is_read = true;
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.is_read = true;
      });
    },
  },
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
