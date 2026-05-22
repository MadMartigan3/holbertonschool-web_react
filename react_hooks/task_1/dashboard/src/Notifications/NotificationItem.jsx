import PropTypes from 'prop-types';

export default function NotificationItem({ id, type = 'default', value, html, markAsRead }) {
  const color = type === 'urgent'
    ? 'var(--urgent-notification-item)'
    : 'var(--default-notification-item)';

  const onClick = () => {
    if (markAsRead) markAsRead(id);
  };

  return html ? (
    <li
      data-notification-type={type}
      style={{ color }}
      onClick={onClick}
      dangerouslySetInnerHTML={html}
    />
  ) : (
    <li
      data-notification-type={type}
      style={{ color }}
      onClick={onClick}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  markAsRead: PropTypes.func,
};