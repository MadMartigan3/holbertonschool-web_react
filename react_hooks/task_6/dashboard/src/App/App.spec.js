import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockAxios from 'jest-mock-axios';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

async function loadNotifications() {
  await act(async () => {
    mockAxios.mockResponseFor('/notifications.json', { data: mockNotifications });
  });
}

async function loadCourses() {
  await act(async () => {
    mockAxios.mockResponseFor('/courses.json', { data: mockCourses });
  });
}

let mockCapturedRefs = null;

jest.mock('../Notifications/Notifications', () => {
  const { default: RealNotifications } = jest.requireActual('../Notifications/Notifications');
  return function NotificationsSpy(props) {
    if (mockCapturedRefs !== null) {
      mockCapturedRefs.push(props.markNotificationAsRead);
    }
    return <RealNotifications {...props} />;
  };
});

import App from './App';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

afterEach(() => {
  mockAxios.reset();
});

describe('App - default state', () => {
  test('renders Login form when not logged in (default state)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('does not show logoutSection when not logged in', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('displays "News from the School" block with its paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});

describe('App - handleDisplayDrawer and handleHideDrawer', () => {
  test('drawer is open by default (displayDrawer initializes to true)', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });

  test('handleHideDrawer closes the drawer when the Close button is clicked', async () => {
    render(<App />);
    await loadNotifications();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer re-opens the drawer when "Your notifications" is clicked', async () => {
    render(<App />);
    await loadNotifications();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });
});

describe('App - logIn state mutations', () => {
  function loginUser(email = 'test@example.com', password = 'password123') {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('logIn sets isLoggedIn to true — CourseList appears and Login form disappears', () => {
    const { container } = render(<App />);
    loginUser();
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
  });

  test('logIn updates email in user state — logoutSection shows the email', () => {
    render(<App />);
    loginUser('user@test.com', 'mypassword1');
    expect(document.querySelector('#logoutSection')).toHaveTextContent('user@test.com');
  });

  test('logIn updates password in user state — submit is enabled only with valid credentials', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass1234' } });
    expect(screen.getByRole('button', { name: /ok/i })).not.toBeDisabled();
  });
});

describe('App - logOut state mutations', () => {
  function loginUser() {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('logOut sets isLoggedIn to false — Login form returns', () => {
    render(<App />);
    loginUser();
    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('logOut clears email from user state — logoutSection is removed', () => {
    render(<App />);
    loginUser();
    expect(document.querySelector('#logoutSection')).toHaveTextContent('test@example.com');
    fireEvent.click(screen.getByText('logout'));
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('logOut clears password from user state — submit button is disabled after re-render', () => {
    render(<App />);
    loginUser();
    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });
});

describe('App - markNotificationAsRead', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('clicking a notification removes it from the list and logs the expected message', async () => {
    render(<App />);
    await loadNotifications();
    const notification = screen.getByText('New course available');
    fireEvent.click(notification);
    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });

  test('show → mark as read → hide → show: notification stays removed after re-opening drawer', async () => {
    render(<App />);
    await loadNotifications();

    fireEvent.click(screen.getByText('New course available'));
    expect(screen.queryByText('New course available')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  });
});

describe('App - markNotificationAsRead reference stability', () => {
  beforeEach(() => { mockCapturedRefs = []; });
  afterEach(() => { mockCapturedRefs = null; });

  test('markNotificationAsRead keeps the same function reference between re-renders', async () => {
    render(<App />);
    const initialRef = mockCapturedRefs[mockCapturedRefs.length - 1];

    await loadNotifications();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    fireEvent.click(screen.getByText(/your notifications/i));

    expect(mockCapturedRefs.length).toBeGreaterThanOrEqual(3);
    expect(mockCapturedRefs.every((ref) => ref === initialRef)).toBe(true);
  });
});

describe('App - data fetching', () => {
  test('fetches notifications data when the component initially renders', async () => {
    render(<App />);
    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    await loadNotifications();
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');
  });

  test('fetches courses data when the user state changes', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    await loadCourses();
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(mockAxios.get).toHaveBeenCalledWith('/courses.json');
  });
});

describe('appReducer', () => {
  test('returns the initial state when called with no arguments', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  test('LOGIN action sets user and isLoggedIn to true', () => {
    const state = appReducer(initialState, {
      type: APP_ACTIONS.LOGIN,
      payload: { email: 'test@example.com', password: 'password123' },
    });
    expect(state.user).toEqual({ email: 'test@example.com', password: 'password123', isLoggedIn: true });
  });

  test('LOGOUT action resets user to logged-out state', () => {
    const loggedIn = { ...initialState, user: { email: 'test@example.com', password: 'password123', isLoggedIn: true } };
    const state = appReducer(loggedIn, { type: APP_ACTIONS.LOGOUT });
    expect(state.user).toEqual({ email: '', password: '', isLoggedIn: false });
  });

  test('TOGGLE_DRAWER action flips displayDrawer', () => {
    const closed = appReducer(initialState, { type: APP_ACTIONS.TOGGLE_DRAWER });
    expect(closed.displayDrawer).toBe(false);
    const opened = appReducer(closed, { type: APP_ACTIONS.TOGGLE_DRAWER });
    expect(opened.displayDrawer).toBe(true);
  });

  test('MARK_NOTIFICATION_READ removes the notification with the given id', () => {
    const withNotifs = {
      ...initialState,
      notifications: [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
        { id: 3, value: 'C' },
      ],
    };
    const state = appReducer(withNotifs, { type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: 2 });
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
  });

  test('SET_NOTIFICATIONS updates the notifications array', () => {
    const notifs = [{ id: 1, value: 'X' }];
    const state = appReducer(initialState, { type: APP_ACTIONS.SET_NOTIFICATIONS, payload: notifs });
    expect(state.notifications).toEqual(notifs);
  });

  test('SET_COURSES updates the courses array', () => {
    const courses = [{ id: 1, name: 'ES6', credit: 60 }];
    const state = appReducer(initialState, { type: APP_ACTIONS.SET_COURSES, payload: courses });
    expect(state.courses).toEqual(courses);
  });

  test('unknown action returns current state unchanged', () => {
    const state = appReducer(initialState, { type: 'UNKNOWN' });
    expect(state).toBe(initialState);
  });
});
