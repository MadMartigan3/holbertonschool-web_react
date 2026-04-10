import { render, screen, fireEvent } from '@testing-library/react';
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

  it('calls the logOut prop when Ctrl+H is pressed', () => {
    const logOut = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App logOut={logOut} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(logOut).toHaveBeenCalledTimes(1);
    window.alert.mockRestore();
  });

  it('calls alert with "Logging you out" when Ctrl+H is pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App logOut={() => {}} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    alertMock.mockRestore();
  });

  it('displays the "News from the School" section with the correct paragraph by default', () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });
});
