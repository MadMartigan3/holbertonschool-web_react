import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const colorClass = type === 'urgent'
      ? 'text-[var(--urgent-notification-item)]'
      : 'text-[var(--default-notification-item)]';

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={`${colorClass} border-b border-[#ddd] wide:border-0 py-3 wide:py-0`}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        className={`${colorClass} border-b border-[#ddd] wide:border-0 py-3 wide:py-0`}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
