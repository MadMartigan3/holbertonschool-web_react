import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders a default notification with blue color and correct data attribute', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" markAsRead={() => {}} id={1} />
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li.style.color).toBe('blue');
  });

  it('renders an urgent notification with red color and correct data attribute', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" markAsRead={() => {}} id={2} />
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li.style.color).toBe('red');
  });

  it('calls the markAsRead prop with the correct id when clicked', () => {
    const markAsRead = jest.fn();
    const { container } = render(
      <NotificationItem type="default" value="New course available" markAsRead={markAsRead} id={1} />
    );
    fireEvent.click(container.querySelector('li'));
    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});
