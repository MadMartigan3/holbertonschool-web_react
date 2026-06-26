import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

export const API_BASE_URL = 'http://localhost:5173';

export const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  displayDrawer: true,
  notifications: [],
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    return response.data.map((n) =>
      n.id === 3 ? { ...n, html: { __html: getLatestNotification() } } : n
    );
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      console.log(`Notification ${action.payload} has been marked as read`);
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } = notificationsSlice.actions;
export default notificationsSlice.reducer;
