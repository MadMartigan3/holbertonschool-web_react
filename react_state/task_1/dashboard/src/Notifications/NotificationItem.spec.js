import { render, screen, within, fireEvent } from '@testing-library/react';
import Notifications from './Notifications.jsx';

const sample = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
];

describe('Notifications component (Task 5)', () => {
  test('always shows the "Your notifications" title', () => {
    render(<Notifications />);
    // Title must ALWAYS be present
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  describe('when displayDrawer is false (default)', () => {
    test('does not render the drawer container', () => {
      render(<Notifications />);
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
      expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
      // No <ul> of notification items
      expect(screen.queryByRole('list')).toBeNull();
      expect(screen.queryByText(/no new notification for now/i)).toBeNull();
    });
  });

  describe('when displayDrawer is true and notifications has items', () => {
    test('shows the list title text, the button, and all items', () => {
      render(<Notifications displayDrawer notifications={sample} />);
      expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
      const closeBtn = screen.getByRole('button', { name: /close/i });
      expect(closeBtn).toBeInTheDocument();
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');
      expect(items).toHaveLength(sample.length);
    });

    test('clicking the close button logs the expected message', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<Notifications displayDrawer notifications={sample} />);

      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(spy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));

      spy.mockRestore();
    });

    test('clicking a notification item logs "Notification {id} has been marked as read"', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<Notifications displayDrawer notifications={sample} />);

      fireEvent.click(screen.getByText('New resume available'));

      expect(spy).toHaveBeenCalledWith('Notification 2 has been marked as read');

      spy.mockRestore();
    });
  });

  describe('when displayDrawer is true and notifications is empty', () => {
    test('shows "No new notification for now" and hides the close button', () => {
      render(<Notifications displayDrawer notifications={[]} />);
      expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
      expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
      expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
      expect(screen.queryByRole('list')).toBeNull();
    });
  });
});