import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';

const notifications = [
  {
    id: 1,
    title: 'Content approved',
    message: 'Your latest upload has been approved and is ready for analytics review.',
    time: '10 min ago',
    status: 'New',
  },
  {
    id: 2,
    title: 'Review requested',
    message: 'A content item needs a quick update before it can move forward.',
    time: '1 hour ago',
    status: 'Action needed',
  },
  {
    id: 3,
    title: 'New guideline',
    message: 'Content guideline notes have been updated for new creator uploads.',
    time: 'Yesterday',
    status: 'Info',
  },
  {
    id: 4,
    title: 'Profile reminder',
    message: 'Keep your profile details and social media handles up to date.',
    time: '2 days ago',
    status: 'Reminder',
  },
];

function Notifications() {
  return (
    <div className="notifications-page">
      <CreatorHeader />

      <main className="notifications-page__main">
        <div className="notifications-page__inner">
          <section className="notifications-page__hero">
            <p>Creator Marketplace</p>
            <h1>Notifications</h1>
          </section>

          <section className="notifications-page__list" aria-label="All notifications">
            {notifications.map((notification) => (
              <article className="notifications-page__item" key={notification.id}>
                <div>
                  <span className="notifications-page__status">{notification.status}</span>
                  <h2>{notification.title}</h2>
                  <p>{notification.message}</p>
                </div>
                <time>{notification.time}</time>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
