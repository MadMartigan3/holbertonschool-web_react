import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

test('renders the notifications title', () => {
  render(<Notifications notifications={notifications} />);
  const title = screen.getByText(/here is the list of notifications/i);
  expect(title).toBeInTheDocument();
});

test('renders a close button', () => {
  render(<Notifications notifications={notifications} />);
  const button = screen.getByRole('button', { name: /close/i });
  expect(button).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<Notifications notifications={notifications} />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('renders correct text for each notification item', () => {
  render(<Notifications notifications={notifications} />);
  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});

test('clicking the close button logs "Close button has been clicked"', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<Notifications notifications={notifications} />);
  const button = screen.getByRole('button', { name: /close/i });
  fireEvent.click(button);
  expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
  consoleSpy.mockRestore();
});
