import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import './Notifications.css';

function Notifications() {
  return (
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
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
      </ul>
    </div>
  );
}

export default Notifications;