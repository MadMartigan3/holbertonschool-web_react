import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import useLogin from '../hooks/useLogin';

describe('Login component', () => {
  test('renders the prompt text', () => {
    render(<Login />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders email and password fields with labels', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders the OK button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('submit button is disabled by default', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('submit button is enabled when email is valid and password has at least 8 characters', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /ok/i })).not.toBeDisabled();
  });

  test('logIn prop is called with email and password on form submit', () => {
    const logIn = jest.fn();
    render(<Login logIn={logIn} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(logIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});

describe('useLogin hook', () => {
  test('starts with empty email, empty password, and enableSubmit false', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.enableSubmit).toBe(false);
  });

  test('handleChangeEmail updates the email state', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    expect(result.current.email).toBe('test@example.com');
  });

  test('handleChangePassword updates the password state', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    expect(result.current.password).toBe('password123');
  });

  test('enableSubmit is true when email is valid and password is 8+ characters', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    expect(result.current.enableSubmit).toBe(true);
  });

  test('enableSubmit is false with an invalid email', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'notanemail' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    expect(result.current.enableSubmit).toBe(false);
  });

  test('enableSubmit is false when password is shorter than 8 characters', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'short' } });
    });
    expect(result.current.enableSubmit).toBe(false);
  });

  test('handleLoginSubmit calls onLogin with current email and password', () => {
    const onLogin = jest.fn();
    const { result } = renderHook(() => useLogin(onLogin));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    act(() => {
      result.current.handleLoginSubmit({ preventDefault: jest.fn() });
    });
    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
