import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

jest.mock('../utils/utils', () => ({
  getCurrentYear: () => new Date().getFullYear(),
  getFooterCopy: () => 'Holberton School',
}));

const defaultUser = { email: '', password: '', isLoggedIn: false };

describe('Footer', () => {
  test('renders without crashing', () => {
    render(<Footer user={defaultUser} />);
  });

  test('renders the correct copyright text', () => {
    render(<Footer user={defaultUser} />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
  });

  test('does not display "Contact us" when user is logged out', () => {
    render(<Footer user={defaultUser} />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" link when user is logged in', () => {
    const user = { email: 'test@example.com', password: 'password123', isLoggedIn: true };
    render(<Footer user={user} />);
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
