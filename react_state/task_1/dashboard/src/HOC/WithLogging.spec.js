import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  test('renders heading from the wrapped component', () => {
    const Wrapped = WithLogging(MockApp);
    render(<Wrapped />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Hello from Mock App Component/i })
    ).toBeInTheDocument();
  });

  test('logs on mount and unmount', () => {
    const Wrapped = WithLogging(MockApp);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { unmount } = render(<Wrapped />);
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');

    logSpy.mockRestore();
  });

  test('has the proper displayName', () => {
    const Wrapped = WithLogging(MockApp);
    expect(Wrapped.displayName).toBe('WithLogging(MockApp)');
  });
});