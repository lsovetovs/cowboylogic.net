import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: null, // 'success' | 'error' | 'info' | 'warning'
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showSuccess = (message) =>
  showNotification({ message, type: "success" });

export const showError = (message) =>
  showNotification({ message, type: "error" });

export default notificationSlice.reducer;
