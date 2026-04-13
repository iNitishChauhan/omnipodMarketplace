import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const notifications = [
  {
    id: 1,
    title: 'Content approved',
    message: 'Your latest upload has been approved.',
    time: '10 min ago',
  },
  {
    id: 2,
    title: 'Review requested',
    message: 'A content item needs a quick update.',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'New guideline',
    message: 'Content guideline notes have been updated.',
    time: 'Yesterday',
  },
];

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationCount = notifications.length;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button
        type="button"
        className="notification-bell__button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open notifications"
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 10.5c0-3.1-1.7-5.5-4.5-6.2V3a1.5 1.5 0 0 0-3 0v1.3C7.7 5 6 7.4 6 10.5V15l-1.5 2.2A1.1 1.1 0 0 0 5.4 19h13.2a1.1 1.1 0 0 0 .9-1.8L18 15v-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9.7 20.2a2.6 2.6 0 0 0 4.6 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="notification-bell__count">{notificationCount}</span>
      </button>

      {isOpen && (
        <div className="notification-bell__dropdown">
          <div className="notification-bell__header">
            <strong>Notifications</strong>
            <span>{notificationCount} new</span>
          </div>

          <div className="notification-bell__list">
            {notifications.map((notification) => (
              <div className="notification-bell__item" key={notification.id}>
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span>{notification.time}</span>
              </div>
            ))}
          </div>

          <Link className="notification-bell__view-all" to="/notifications">
            View all
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
