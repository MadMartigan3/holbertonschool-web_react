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
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });
});

describe('App (Task 2) - login state via context', () => {
  test('renders Login when not logged in by default', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList after successful login', () => {
    const { container } = render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
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
