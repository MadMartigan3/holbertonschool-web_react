import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the Login component when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  it('renders the CourseList component when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
