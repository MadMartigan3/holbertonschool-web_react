import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

describe('"Your notifications" is always displayed', () => {
  test('displays "Your notifications" when displayDrawer is false', () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  test('displays "Your notifications" when displayDrawer is true', () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });
});

describe('when displayDrawer is false', () => {
  test('does not display the close button', () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  test('does not display the "Here is the list of notifications" text', () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('does not display notification items', () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});

describe('when displayDrawer is true', () => {
  test('renders the "Here is the list of notifications" text', () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('renders 3 notification items', () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('renders correct text for each notification item', () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });

  test('clicking the close button logs "Close button has been clicked"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });
});

describe('when displayDrawer is true and notifications is empty', () => {
  test('displays "No new notification for now"', () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.getByText('No new notification for now')).toBeInTheDocument();
  });
});

describe('markAsRead', () => {
  test('clicking a notification item logs the correct message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    fireEvent.click(screen.getByText('New course available'));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });
});
