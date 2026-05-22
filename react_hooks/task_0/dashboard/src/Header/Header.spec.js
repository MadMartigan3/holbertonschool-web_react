import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import newContext from '../Context/context';

describe('Header', () => {
  test('renders the title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    expect(img.closest('.App-header')).toBeInTheDocument();
  });

  test('does not render logoutSection with default context', () => {
    render(<Header />);
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('renders logoutSection when isLoggedIn is true', () => {
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
  });

  test('clicking logout link calls logOut from context', () => {
    const logOut = jest.fn();
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut,
    };
    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );
    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
