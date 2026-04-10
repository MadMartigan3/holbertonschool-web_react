import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('contains 2 labels, 2 inputs, and 1 button', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('focuses the email input when the email label is clicked', async () => {
    render(<Login />);
    await userEvent.click(screen.getByText(/email/i));
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
  });

  it('focuses the password input when the password label is clicked', async () => {
    render(<Login />);
    await userEvent.click(screen.getByText(/password/i));
    expect(screen.getByLabelText(/password/i)).toHaveFocus();
  });
});
