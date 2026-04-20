import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications = [], displayDrawer = false } = this.props;

    return (
      <div className="Notifications fixed top-0 right-0 z-[100] text-right" style={{ padding: '5px 10px' }}>
        <div className="notification-title text-sm text-[#333] cursor-pointer py-1">Your notifications</div>
        {displayDrawer && (
          <div
            className="notification-items relative bg-white border border-dashed border-[var(--main-color)] p-1.5 text-left text-[13px] text-[#333]"
            style={{ width: '25%', minWidth: '280px' }}
          >
            <p className="mb-[5px]">Here is the list of notifications</p>
            <button
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '5px',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333',
                padding: '0',
                lineHeight: '1',
              }}
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="close icon" style={{ width: '10px', height: '10px' }} />
            </button>
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <ul className="list-disc m-0 pl-5">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    html={notification.html}
                    value={notification.value}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
