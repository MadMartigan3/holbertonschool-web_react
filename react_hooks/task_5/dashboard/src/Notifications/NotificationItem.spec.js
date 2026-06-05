import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('renders a list item with the given value', () => {
    render(<NotificationItem id={1} type="default" value="New course available" />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText('New course available')).toBeInTheDocument();
  });

  test('renders with data-notification-type attribute', () => {
    render(<NotificationItem id={1} type="urgent" value="Urgent notice" />);
    expect(screen.getByRole('listitem')).toHaveAttribute('data-notification-type', 'urgent');
  });

  test('renders html content when html prop is provided', () => {
    render(
      <NotificationItem
        id={3}
        type="urgent"
        html={{ __html: '<strong>Urgent requirement</strong>' }}
      />
    );
    expect(screen.getByRole('listitem').innerHTML).toContain('<strong>Urgent requirement</strong>');
  });

  test('calls markAsRead with the item id when clicked', () => {
    const markAsRead = jest.fn();
    render(
      <NotificationItem id={2} type="default" value="New resume available" markAsRead={markAsRead} />
    );
    fireEvent.click(screen.getByRole('listitem'));
    expect(markAsRead).toHaveBeenCalledWith(2);
  });

  test('does not throw when clicked without markAsRead prop', () => {
    render(<NotificationItem id={1} type="default" value="No handler" />);
    expect(() => fireEvent.click(screen.getByRole('listitem'))).not.toThrow();
  });

  test('does not re-render when props are unchanged', () => {
    const markAsRead = jest.fn();
    const props = { id: 1, type: 'default', value: 'Stable', markAsRead };
    const { rerender } = render(<NotificationItem {...props} />);
    const itemBefore = screen.getByRole('listitem');
    rerender(<NotificationItem {...props} />);
    expect(screen.getByRole('listitem')).toBe(itemBefore);
  });
});