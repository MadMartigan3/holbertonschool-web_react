import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

jest.mock('../utils/utils', () => ({
  getCurrentYear: () => new Date().getFullYear(),
  getFooterCopy: () => 'Holberton School',
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('renders the correct copyright text when isIndex is true', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`Copyright ${year} - Holberton School`)
    ).toBeInTheDocument();
  });

  it('does not display "Contact us" when user is logged out', () => {
    render(<Footer />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  it('displays "Contact us" link when user is logged in', () => {
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
