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

test('renders 2 input elements', () => {
  render(<App />);
  const inputs = screen.getAllByRole('textbox');
  const passwordInput = document.querySelector('input[type="password"]');
  expect(inputs.length + (passwordInput ? 1 : 0)).toBe(2);
});

test('renders label with text Email', () => {
  render(<App />);
  const emailLabel = screen.getByText(/email/i);
  expect(emailLabel).toBeInTheDocument();
});

test('renders label with text Password', () => {
  render(<App />);
  const passwordLabel = screen.getByText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
});

test('renders a button with text OK', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});