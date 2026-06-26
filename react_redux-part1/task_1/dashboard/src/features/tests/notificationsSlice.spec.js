import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
  ENDPOINTS,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    displayDrawer: true,
    notifications: [],
  };

  test('returns the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('fetchNotifications fetches the notifications and updates the id 3 html with the latest notification', async () => {
    const store = configureStore({ reducer: { notifications: notificationsReducer } });
    const mockData = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: '<strong>Old requirement</strong>' },
    ];

    const dispatchPromise = store.dispatch(fetchNotifications());
    mockAxios.mockResponseFor(ENDPOINTS.notifications, { data: mockData });
    await dispatchPromise;

    const { notifications } = store.getState().notifications;
    expect(notifications).toHaveLength(3);
    expect(notifications[2]).toEqual({
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    });
  });

  test('markNotificationAsRead removes the notification with the given id and logs it', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = {
      displayDrawer: true,
      notifications: [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
      ],
    };

    const newState = notificationsReducer(state, markNotificationAsRead(1));

    expect(newState.notifications).toEqual([{ id: 2, value: 'B' }]);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });

  test('showDrawer sets displayDrawer to true', () => {
    const state = { displayDrawer: false, notifications: [] };
    expect(notificationsReducer(state, showDrawer()).displayDrawer).toBe(true);
  });

  test('hideDrawer sets displayDrawer to false', () => {
    const state = { displayDrawer: true, notifications: [] };
    expect(notificationsReducer(state, hideDrawer()).displayDrawer).toBe(false);
  });
});
