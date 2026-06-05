import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockNotifications });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App - displayDrawer state', () => {
  test('displayDrawer defaults to true and shows notifications after loading', async () => {
    render(<App />);
    expect(await screen.findByText('Here is the list of notifications')).toBeInTheDocument();
  });

  test('handleHideDrawer hides the drawer', async () => {
    render(<App />);
    const closeBtn = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer shows the drawer after it was closed', async () => {
    render(<App />);
    const closeBtn = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    fireEvent.click(screen.getByText('Your notifications'));
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });
});

describe('App - logIn state mutations', () => {
  test('renders Login form when not logged in by default', async () => {
    const { container } = render(<App />);
    await act(async () => {});
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('logoutSection is not visible before login', async () => {
    render(<App />);
    await act(async () => {});
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('logIn updates email, password, and isLoggedIn — shows CourseList and welcome message', async () => {
    const { container } = render(<App />);
    await act(async () => {});
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });
});

describe('App - logOut state mutations', () => {
  test('logOut sets isLoggedIn to false and clears email and password', async () => {
    render(<App />);
    await act(async () => {});
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });
});

describe('App - notifications state', () => {
  test('clicking a notification removes it from the list and logs the expected string', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    const item = await screen.findByText('New resume available');
    fireEvent.click(item);
    expect(screen.queryByText('New resume available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    consoleSpy.mockRestore();
  });
});

describe('App - conditional rendering', () => {
  test('renders Login when not logged in', async () => {
    const { container } = render(<App />);
    await act(async () => {});
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('displays "News from the School" block', async () => {
    render(<App />);
    await act(async () => {});
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});
