import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('renders a default notification with blue color and correct data attribute', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li.style.color).toBe('blue');
  });

  it('renders an urgent notification with red color and correct data attribute', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" />
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li.style.color).toBe('red');
  });
});
