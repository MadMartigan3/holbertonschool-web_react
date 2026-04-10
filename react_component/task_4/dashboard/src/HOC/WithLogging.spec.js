import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

const MockAppWithLogging = WithLogging(MockApp);

describe('WithLogging HOC', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the wrapped component and displays its content', () => {
    render(<MockAppWithLogging />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello from Mock App Component');
  });

  it('sets the correct displayName on the HOC', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });

  it('logs mount and unmount messages to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { unmount } = render(<MockAppWithLogging />);
    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');
    unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
    consoleSpy.mockRestore();
  });
});
