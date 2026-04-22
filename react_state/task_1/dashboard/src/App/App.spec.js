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

describe('App (Task 4)', () => {
  test('renders Login when isLoggedIn is false', () => {
    const { container } = render(<App isLoggedIn={false} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    const { container } = render(<App isLoggedIn />);
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

  test('calls logOut once when Ctrl+H is pressed', () => {
    const logOut = jest.fn();
    render(<App logOut={logOut} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test('alerts "Logging you out" when Ctrl+H is pressed', () => {
    render(<App />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  describe('App (Task 4) - conditional rendering', () => {
    test('renders Login when isLoggedIn is false', () => {
      const { container } = render(<App isLoggedIn={false} />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(container.querySelector('#CourseList')).toBeNull();
    });

    test('renders CourseList when isLoggedIn is true', () => {
      const { container } = render(<App isLoggedIn />);
      expect(container.querySelector('#CourseList')).not.toBeNull();
      expect(screen.queryByLabelText(/email/i)).toBeNull();
      expect(screen.queryByLabelText(/password/i)).toBeNull();
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