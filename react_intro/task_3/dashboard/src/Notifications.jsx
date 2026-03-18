import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils';
import './Notifications.css';

function Notifications() {
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <button
        aria-label="Close"
        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="close icon" />
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