import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App - displayDrawer state', () => {
  test('displayDrawer defaults to true (drawer is shown on mount)', () => {
    render(<App />);
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });

  test('handleHideDrawer hides the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer shows the drawer after it was closed', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    fireEvent.click(screen.getByText('Your notifications'));
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });
});

describe('App - logIn state mutations', () => {
  test('renders Login form when not logged in by default', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('logoutSection is not visible before login', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('logIn updates email, password, and isLoggedIn — shows CourseList and welcome message', () => {
    const { container } = render(<App />);
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
  test('logOut sets isLoggedIn to false and clears email and password', () => {
    render(<App />);
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
  test('clicking a notification removes it from the list and logs the expected string', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    fireEvent.click(screen.getByText('New resume available'));
    expect(screen.queryByText('New resume available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    consoleSpy.mockRestore();
  });
});

describe('App - conditional rendering', () => {
  test('renders Login when not logged in', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('displays "News from the School" block with its paragraph', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});
