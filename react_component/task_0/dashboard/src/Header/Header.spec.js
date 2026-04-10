import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('contains the Holberton logo image', () => {
    const { container } = render(<Header />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('holberton-logo.jpg');
  });

  it('contains an h1 heading with the text "School dashboard"', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('School dashboard');
  });
});
