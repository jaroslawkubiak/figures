import '../../css/notification.css';

function Notification({ children }) {
  const { message, type, hide } = children;

  const cssClassWrapper = `notification-wrapper ${hide} ${message ? 'display-grid' : 'display-none'}`;
  const cssClass = `letter-spacing-3 notification-content notification-type-${type} `;
  return (
    <>
      <div className={cssClassWrapper}>
        <div className={cssClass}>{message}</div>
      </div>
    </>
  );
}

export default Notification;
