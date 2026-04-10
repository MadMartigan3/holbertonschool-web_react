import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

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
      <div className="Notifications">
        <div className="notification-title">Your notifications</div>
        {displayDrawer && (
          <div className="notification-items">
            <p>Here is the list of notifications</p>
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
              <ul>
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
