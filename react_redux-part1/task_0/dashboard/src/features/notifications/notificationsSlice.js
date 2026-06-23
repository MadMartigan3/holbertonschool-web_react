import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayDrawer: true,
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    markNotificationAsRead: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    toggleDrawer: (state) => {
      state.displayDrawer = !state.displayDrawer;
    },
  },
});

export const { setNotifications, markNotificationAsRead, toggleDrawer } = notificationsSlice.actions;
export default notificationsSlice.reducer;
