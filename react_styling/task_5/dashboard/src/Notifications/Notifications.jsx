import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        html: PropTypes.shape({ __html: PropTypes.string }),
      })
    ),
    displayDrawer: PropTypes.bool,
  };

  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <div
        className={[
          'fixed top-4 right-4 z-50 text-right',
          'max-[912px]:inset-0 max-[912px]:w-screen max-[912px]:h-screen max-[912px]:text-left',
        ].join(' ')}
      >
        {/* Title */}
        <div
          className={[
            'text-right max-[912px]:text-left font-normal text-base text-black px-1',
            notifications.length > 0 && !displayDrawer ? 'animate-bounce' : '',
          ].join(' ').trim()}
          data-testid="notifications-title"
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div
            className={[
              'relative mt-1 inline-block p-2 border border-dotted rounded-none bg-white',
              'max-[912px]:mt-0 max-[912px]:block max-[912px]:w-full max-[912px]:h-[calc(100vh-2.5rem)]',
              'max-[912px]:p-4 max-[912px]:border-0 max-[912px]:rounded-none max-[912px]:overflow-y-auto',
              'max-[912px]:shadow-none',
            ].join(' ')}
            style={{ borderColor: 'var(--main-color)' }}
          >
            {notifications.length === 0 ? (
              <p className="notifications-empty m-0">No new notification for now</p>
            ) : (
              <>
                <p className="text-base mb-2 m-0">Here is the list of notifications</p>

                <button
                  aria-label="Close"
                  className={[
                    'absolute top-2 right-2',
                    'max-[912px]:top-4 max-[912px]:right-4',
                  ].join(' ')}
                  onClick={() => console.log('Close button has been clicked')}
                >
                  <img
                    src={closeIcon}
                    alt="Close"
                    className="w-3 h-3 max-[912px]:w-4 max-[912px]:h-4"
                  />
                </button>

                <ul
                  className={[
                    'notifications-list list-disc pl-5',
                    'max-[912px]:list-none max-[912px]:pl-0',
                    'max-[912px]:-mx-1',
                  ].join(' ')}
                >
                  {notifications.map((n) => (
                    <NotificationItem
                      key={n.id}
                      id={n.id}
                      type={n.type}
                      value={n.value}
                      html={n.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <style>{`
          @media (max-width: 912px) {
            .notifications-list > li {
              padding: 12px 14px;
              border-bottom: 1px solid #e5e7eb; /* Tailwind gray-200 */
            }
            .notifications-list > li:last-child {
              border-bottom: none;
            }
          }
        `}</style>
      </div>
    );
  }
}