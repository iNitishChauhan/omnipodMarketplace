import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { API_URL } from '../components/URLS';
import { useSelector } from "react-redux";
function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const dropdownRef = useRef(null);

  // 👉 Replace with logged-in user id
  const { user } = useSelector((state) => state.auth);

  // 🔥 Fetch Notifications
  /* const fetchNotifications = () => {
    fetch(`${API_URL}notifications/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const list = data.data.data || [];

        setNotifications(list.slice(0, 5)); // 👈 only latest 5
        setCount(list.filter(n => !n.is_read).length); // 👈 unread count
      })
      .catch(err => console.error(err));
  }; */
  //console.log(`${API_URL}notifications/${user.id}`)
  //console.log(`${API_URL}notifications/${user.id}/unread  `)
  const fetchNotifications = useCallback(() => {
    fetch(`${API_URL}notifications/${user.id}/unread`)
      .then(res => res.json())
      .then(data => {console.log(data.data)
        const list = data.data || [];

        setNotifications(list.slice(0, 5));
        setCount(list.filter(n => !n.is_read).length);
      })
      .catch(err => console.error(err));
  }, [user?.id]);

  // 🚀 Auto Refresh
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchNotifications]); // ✅ no warning now 

  // 🔒 Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(seconds / 86400);
    if (days < 30) return `${days} day ago`;

    const months = Math.floor(seconds / 2592000);
    if (months < 12) return `${months} mon ago`;

    const years = Math.floor(seconds / 31536000);
    return `${years} yr ago`;
  };

  // ✅ Mark as Read
  const markAsRead = (id) => {
    fetch(`${API_URL}notifications/mark-read/${id}`, {
      method: 'POST'
    })
      .then(() => {
        setNotifications(prev =>
          prev.map(n =>
            n.id === id ? { ...n, is_read: true } : n
          )
        );

        setCount(prev => (prev > 0 ? prev - 1 : 0));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button
        type="button"
        className="notification-bell__button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open notifications"
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 10.5c0-3.1-1.7-5.5-4.5-6.2V3a1.5 1.5 0 0 0-3 0v1.3C7.7 5 6 7.4 6 10.5V15l-1.5 2.2A1.1 1.1 0 0 0 5.4 19h13.2a1.1 1.1 0 0 0 .9-1.8L18 15v-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9.7 20.2a2.6 2.6 0 0 0 4.6 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        {/* 🔴 Count */}
        {count > 0 && (
          <span className="notification-bell__count">{count}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-bell__dropdown">

          <div className="notification-bell__header">
            <strong>Notifications</strong>
            <span>{count} new</span>
          </div>

          <div className="notification-bell__list">

            {notifications.length === 0 && (
              <p style={{ padding: '10px' }}>No notifications</p>
            )}

            {notifications.map((notification) => (
              <div
                className={`notification-bell__item ${!notification.is_read ? 'unread' : ''}`}
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
              >
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span>
                  {timeAgo(notification.created_at)}
                </span>
              </div>
            ))}
          </div>

          <Link
            className="notification-bell__view-all"
            to="/notifications"
            onClick={() => setIsOpen(false)}
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;