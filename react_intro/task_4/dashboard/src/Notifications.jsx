import './Notifications.css'
import { getLatestNotification } from './utils.js'
import Close from './assets/close-button.png'

function Notifications() {
  const handleButtonClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority>New course available</li>
        <li data-priority>New resume available</li>
        <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
      <button aria-label="Close" onClick={handleButtonClick}><img src={Close}/></button>
    </div>
  )
}

export default Notifications