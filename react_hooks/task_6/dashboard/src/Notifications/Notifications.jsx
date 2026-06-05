import { memo } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({
  displayDrawer = false,
  notifications = [],
  handleDisplayDrawer = () => {},
  handleHideDrawer = () => console.log('Close button has been clicked'),
  markNotificationAsRead = (id) => console.log(`Notification ${id} has been marked as read`),
}) {
  const shouldBounce = notifications.length > 0 && !displayDrawer;

  return (
    <div className="Notifications fixed top-0 right-0 z-[100] text-right" style={{ padding: '5px 10px' }}>
      <div
        className={['notification-title text-sm cursor-pointer', shouldBounce ? 'animate-bounce' : ''].join(' ').trim()}
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>

      {displayDrawer && (
        <section
          aria-label="Notifications"
          className="notification-drawer relative bg-white border border-dashed text-left text-[13px]"
          style={{ borderColor: 'var(--main-color)', padding: '12px' }}
        >
          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p className="mb-2">Here is the list of notifications</p>
              <button
                aria-label="Close"
                onClick={handleHideDrawer}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                }}
              >
                <img src={closeIcon} alt="close icon" style={{ width: '10px', height: '10px' }} />
              </button>
              <ul className="list-disc ml-5">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    id={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                    markAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </div>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export default memo(Notifications);
