import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../components/URLS';
import { useSelector } from "react-redux";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const { user } = useSelector((state) => state.auth);

  // 🔥 Fetch Notifications
  const fetchNotifications = useCallback(() => {
    if (!user?.id) return;

    fetch(`${API_URL}notifications/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data?.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notifications:', err);
        setLoading(false);
      });
  }, [user?.id]);

  // 🚀 Auto Refresh
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ✅ Time Ago Function
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
      })
      .catch(err => console.error(err));
  };

  // ✅ Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentNotifications = notifications.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(notifications.length / recordsPerPage);

  const renderNotificationMedia = (notification) => {
    if (!notification.media?.file_url) return null;

    const isVideo = notification.media.media_type === 'video'
      || /\.(mp4|webm|ogg|mov)$/i.test(notification.media.file_url);

    return (
      <Link
        className="notifications-page__media-link"
        to={`/profile?media_id=${notification.media.id}`}
        onClick={(event) => {
          event.stopPropagation();
          markAsRead(notification.id);
        }}
        aria-label={`View ${notification.media.title || 'media'} on profile`}
      >
        {isVideo ? (
          <video
            src={notification.media.file_url}
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={notification.media.file_url}
            alt={notification.media.title || 'Notification media'}
          />
        )}
      </Link>
    );
  };

  return (
    <div className="notifications-page">
      <CreatorHeader />

      <main className="notifications-page__main">
        <div className="notifications-page__inner">

          <section className="notifications-page__hero">
            <p>Creator Marketplace</p>
            <h1>Notifications</h1>
          </section>

          <section
            className="notifications-page__list"
            aria-label="All notifications"
          >

            {/* 🔄 Loading */}
            {loading && <p>Loading notifications...</p>}

            {/* ❌ Empty */}
            {!loading && notifications.length === 0 && (
              <p>No notifications found</p>
            )}

            {/* ✅ Paginated Notifications */}
            {currentNotifications.map((notification) => (
              <article
                className={`notifications-page__item ${!notification.is_read ? 'unread' : ''}`}
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notifications-page__content">
                  {renderNotificationMedia(notification)}

                  <div>
                    <span className="notifications-page__status">
                      {notification.is_read ? 'Read' : 'New'}
                    </span>

                    <h2>{notification.title}</h2>
                    <p>{notification.message}</p>
                  </div>
                </div>

                <time>
                  {timeAgo(notification.created_at)}
                </time>
              </article>
            ))}

            {/* ✅ Pagination Buttons */}
            {!loading && totalPages > 1 && (
              <div className="pagination">

                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>

              </div>
            )}

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
