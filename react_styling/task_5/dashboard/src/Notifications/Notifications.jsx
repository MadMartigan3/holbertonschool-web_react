import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem.jsx';

export default function Notifications({
  displayDrawer = true,
  notifications = [],
}) {
  const shouldBounce = notifications.length > 0 && !displayDrawer;

  if (!displayDrawer) {
    return (
      <div
        className={[
          'notification-title px-3 py-2',
          shouldBounce ? 'animate-bounce' : '',
        ].join(' ').trim()}
      >
        Your notifications
      </div>
    );
  }

  const hasItems = notifications.length > 0;
  const items = hasItems
    ? notifications
    : [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ];

  return (
    <div
      className={[
        'Notifications notification-drawer',
        'fixed top-0 right-0 w-[380px] max-w-full bg-white border-l-2 border-b-2 shadow',
        'max-[912px]:inset-0 max-[912px]:w-screen max-[912px]:h-screen max-[912px]:border-0',
        'max-[912px]:p-4 max-[912px]:overflow-y-auto',
      ].join(' ')}
      role="region"
      aria-label="Notifications"
      style={{ borderColor: 'var(--main-color)' }}
    >
      <div className="notification-title font-bold px-4 py-3 border-b max-[912px]:px-2">
        Your notifications
      </div>

      <div className="notification-items p-4 max-[912px]:p-2">
        <p className="mb-3">Here is the list of notifications</p>

        <ul className="ml-5 list-disc max-[912px]:list-none max-[912px]:ml-0">
          {items.map((n) => (
            <NotificationItem
              key={n.id ?? `${n.type}-${n.value ?? 'html'}`}
              type={n.type}
              value={n.value}
              html={n.html}
            />
          ))}
        </ul>

        <button
          aria-label="Close"
          title="Close"
          onClick={() => {}}
          className="absolute top-2 right-2 h-8 w-8 rounded hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.oneOf(['default', 'urgent']),
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
};