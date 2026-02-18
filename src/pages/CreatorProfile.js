import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import profileImage from '../images/creator-image.png';
import profileGalleryImage from '../images/profile-image1.jpg';
import checkIcon from '../images/check_icon.png';
import { fetchUserMedia } from '../store/media/mediaActions';

function CreatorProfile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { media = [] } = useSelector((state) => state.media);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMedia(user.id));
    }
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }

  const firstName = user?.name?.trim()?.split(' ')[0] || 'Creator';
  const postCount = media.length;
  const pendingCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'pending'
  ).length;
  const rejectedCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'rejected'
  ).length;
  const staticCards = [
    { id: 1, status: 'approved', cta: 'analytics' },
    { id: 2, status: 'approved', cta: 'analytics' },
    { id: 3, status: 'pending' },
    { id: 4, status: 'revision', cta: 'revision' },
    { id: 5, status: 'approved', cta: 'analytics' },
    { id: 6, status: 'approved', cta: 'analytics' },
    { id: 7, status: 'approved', cta: 'analytics' },
    { id: 8, status: 'approved', cta: 'analytics' },
    { id: 9, status: 'approved', cta: 'analytics' },
  ];

  return (
    <div className="home_page">
      <CreatorHeader />

      <main className="profile_page">
        <div className="profile__inner">
          <section className="profile-hero">
            <div className="profile-hero__avatar">
              <img src={profileImage} alt={`${firstName} profile`} />
            </div>

            <div className="profile-hero__content">
              <h1 className="profile-hero__title">
                <span>{firstName}&apos;s</span> Profile Page
              </h1>

              <div className="profile-hero__stats">
                <p>{postCount} Posts</p>
                <p>{pendingCount} Pending</p>
                <p>{rejectedCount} Rejected</p>
              </div>

              <div className="profile-hero__filters">
                <select defaultValue="approval-status" aria-label="Approval Status">
                  <option value="approval-status">Approval Status</option>
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select defaultValue="date-uploaded" aria-label="Date Uploaded">
                  <option value="date-uploaded">Date Uploaded</option>
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </section>

          <section className="profile-gallery" aria-label="Profile media">
            <div className="profile-gallery__grid">
              {staticCards.map((card) => (
                <article
                  key={card.id}
                  className={`profile-card profile-card--${card.status}`}
                >
                  <img src={profileGalleryImage} alt={`Profile post ${card.id}`} />

                  {card.status === 'approved' && (
                    <p className="profile-card__status profile-card__status--approved">
                      <span><img src={checkIcon} alt='Approved' /></span> Approved
                    </p>
                  )}

                  {card.status === 'pending' && (
                    <p className="profile-card__status profile-card__status--pending">
                      Pending
                    </p>
                  )}

                  {card.status === 'revision' && (
                    <p className="profile-card__status profile-card__status--revision">
                      <span>×</span> Needs Revision
                    </p>
                  )}

                  {card.cta === 'analytics' && (
                    <button type="button" className="profile-card__btn profile-card__btn--analytics">
                      Analytics
                    </button>
                  )}

                  {card.cta === 'revision' && (
                    <div className="profile-card__revision-actions">
                      <button type="button" className="profile-card__btn profile-card__btn--analytics">
                        Find out more
                      </button>
                      <button type="button" className="profile-card__btn profile-card__btn--light">
                        Request review
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="profile-gallery__pager">
              <button type="button" aria-label="Previous page">
                &lt;
              </button>
              <span>
                <strong>1</strong> of 33
              </span>
              <button type="button" aria-label="Next page">
                &gt;
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreatorProfile;
