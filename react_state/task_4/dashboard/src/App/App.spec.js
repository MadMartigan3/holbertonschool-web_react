import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App (Task 0) - displayDrawer state', () => {
  test('displayDrawer defaults to false (notifications title shown, no drawer)', () => {
    render(<App />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('clicking "Your notifications" opens the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Your notifications'));
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });

  test('clicking the close button hides the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Your notifications'));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });
});

describe('App (Task 2 & 3) - login/logout state', () => {
  test('renders Login when not logged in by default', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('logoutSection is not visible before login', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('renders CourseList and logoutSection after successful login', () => {
    const { container } = render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout in header resets to logged-out state', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });
});

describe('App (Task 4) - notifications state', () => {
  test('clicking a notification removes it from the list and logs the expected string', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    fireEvent.click(screen.getByText('Your notifications'));
    fireEvent.click(screen.getByText('New resume available'));
    expect(screen.queryByText('New resume available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    consoleSpy.mockRestore();
  });
});

describe('App (Task 1) - lifecycle & keyboard', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    alertSpy.mockRestore();
  });

  test('alerts "Logging you out" when Ctrl+H is pressed', () => {
    render(<App />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  test('pressing Ctrl+H resets to logged-out state', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  describe('App conditional rendering', () => {
    test('renders Login when not logged in', () => {
      const { container } = render(<App />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(container.querySelector('#CourseList')).toBeNull();
    });

    test('displays "News from the School" block with its paragraph by default', () => {
      render(<App />);
      expect(
        screen.getByRole('heading', { level: 2, name: /News from the School/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?/i)).toBeInTheDocument();
    });
  });
});
