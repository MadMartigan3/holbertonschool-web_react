import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login', () => {
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
