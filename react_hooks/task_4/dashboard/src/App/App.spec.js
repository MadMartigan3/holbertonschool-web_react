import mockAxios from 'jest-mock-axios';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

afterEach(() => {
  mockAxios.reset();
});

// Resolve the two requests made on initial mount (notifications first, then courses)
const resolveMount = async () => {
  await act(async () => {
    mockAxios.mockResponse({ data: mockNotifications });
  });
  await act(async () => {
    mockAxios.mockResponse({ data: mockCourses });
  });
};

describe('App - notifications fetching', () => {
  test('fetches notifications data when component loads initially', async () => {
    render(<App />);

    await act(async () => {
      mockAxios.mockResponse({ data: mockNotifications });
    });

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();

    // drain remaining courses request
    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });
  });
});

describe('App - courses fetching', () => {
  test('fetches courses whenever user state changes', async () => {
    render(<App />);
    await resolveMount();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // user changed → courses useEffect fires again
    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});

describe('App - displayDrawer state', () => {
  test('displayDrawer defaults to true', async () => {
    render(<App />);
    await resolveMount();

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('handleHideDrawer hides the drawer', async () => {
    render(<App />);
    await resolveMount();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer shows the drawer after it was closed', async () => {
    render(<App />);
    await resolveMount();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    fireEvent.click(screen.getByText('Your notifications'));
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });
});

describe('App - logIn state mutations', () => {
  test('renders Login form when not logged in by default', async () => {
    const { container } = render(<App />);
    await resolveMount();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('logoutSection is not visible before login', async () => {
    render(<App />);
    await resolveMount();

    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('logIn updates email, password, and isLoggedIn — shows CourseList and welcome message', async () => {
    const { container } = render(<App />);
    await resolveMount();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });

    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });
});

describe('App - logOut state mutations', () => {
  test('logOut sets isLoggedIn to false and clears email and password', async () => {
    render(<App />);
    await resolveMount();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    await act(async () => { mockAxios.mockResponse({ data: mockCourses }); });

    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    await act(async () => { mockAxios.mockResponse({ data: mockCourses }); });

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });
});

describe('App - notifications state', () => {
  test('clicking a notification removes it from the list and logs the expected string', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    await resolveMount();

    fireEvent.click(screen.getByText('New resume available'));
    expect(screen.queryByText('New resume available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    consoleSpy.mockRestore();
  });
});

describe('App - conditional rendering', () => {
  test('renders Login when not logged in', async () => {
    const { container } = render(<App />);
    await resolveMount();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('displays "News from the School" block', async () => {
    render(<App />);
    await resolveMount();

    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});
