import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

const defaultUser = { email: '', password: '', isLoggedIn: false };

describe('Header', () => {
  test('renders the title', () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    expect(img.closest('.App-header')).toBeInTheDocument();
  });

  test('does not render logoutSection when not logged in', () => {
    render(<Header user={defaultUser} logOut={() => {}} />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('renders logoutSection when isLoggedIn is true', () => {
    const user = { email: 'test@example.com', password: 'password123', isLoggedIn: true };
    render(<Header user={user} logOut={() => {}} />);
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout link calls logOut prop', () => {
    const logOut = jest.fn();
    const user = { email: 'test@example.com', password: 'password123', isLoggedIn: true };
    render(<Header user={user} logOut={logOut} />);
    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
