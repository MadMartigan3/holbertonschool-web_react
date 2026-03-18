import { render, screen } from '@testing-library/react';
import App from './App';

test('renders h1 with text School Dashboard', () => {
  render(<App />);
  const h1 = screen.getByRole('heading', { name: /school dashboard/i });
  expect(h1).toBeInTheDocument();
});

test('renders correct text in App-body paragraph', () => {
  render(<App />);
  const bodyText = screen.getByText(/login to access the full dashboard/i);
  expect(bodyText).toBeInTheDocument();
});

test('renders correct text in App-footer paragraph', () => {
  render(<App />);
  const footerText = screen.getByText(/copyright.*holberton school/i);
  expect(footerText).toBeInTheDocument();
});

test('renders img with alt text holberton logo', () => {
  render(<App />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});
