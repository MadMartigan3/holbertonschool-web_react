import { render, screen } from '@testing-library/react';
import Footer from './Footer';

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
});
