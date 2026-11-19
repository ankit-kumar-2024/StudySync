import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Starts empty
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload || [];
    },
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

export const { setNotifications, markAsRead, markAllAsRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
