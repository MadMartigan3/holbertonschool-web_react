import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
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
