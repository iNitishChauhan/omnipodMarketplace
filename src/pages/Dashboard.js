import { useState, useEffect } from 'react';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import UploadModal from '../components/UploadModal';
import AccountSettingsModal from '../components/AccountSettingsModal';
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "../store/media/mediaActions";
import {Link, Navigate } from "react-router-dom";
import { BASEURL } from '../components/URLS';

const getMediaType = (item) => {
  const mediaType = String(item?.media_type || item?.type || '').toLowerCase();
  if (mediaType.includes('video')) return 'video';
  if (mediaType.includes('image')) return 'image';
  return /\.(mp4|webm|ogg)$/i.test(item?.file_url || '') ? 'video' : 'image';
};

const parseMediaDate = (item) => {
  const rawDate = item?.created_at || item?.updated_at || item?.uploaded_at || item?.date_uploaded;
  if (!rawDate) return Number(item?.id || 0);
  const parsed = new Date(typeof rawDate === 'string' ? rawDate.replace(' ', 'T') : rawDate).getTime();
  return Number.isNaN(parsed) ? Number(item?.id || 0) : parsed;
};

const splitOptionValues = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

//const getMediaCountry = (item) => String(item?.country || item?.user?.country || item?.creator?.country || '').trim();

const getMediaThemes = (item) =>
  splitOptionValues(item?.themes || item?.theme || item?.content_theme || item?.category);

const getMetricValue = (item, metric) => {
  const value = Number(item?.[metric] ?? 0);
  return Number.isNaN(value) ? 0 : value;
};

const getEngagementTotal = (item) =>
  ['likes', 'comments', 'saves', 'reposts', 'shares'].reduce(
    (total, metric) => total + getMetricValue(item, metric),
    0
  );

const isApprovedMedia = (item) =>
  ['approved', 'published'].includes(String(item?.status || '').toLowerCase());

const belongsToUser = (item, userId) => {
  const ownerId = item?.user_id || item?.user?.id || item?.creator?.id;
  return String(ownerId || '') === String(userId || '');
};

const formatMetric = (value) =>
  new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(value || 0);

function Dashboard() {
  localStorage.removeItem("mid")
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { media, loading, error } = useSelector((state) => state.media);

 /*  const res = await axios.get(
    API_URL + "/user-data/"+user.id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data.user); */
  //console.log(media)
  
  useEffect(() => {
      dispatch(fetchMedia());
  }, [dispatch]);
  
    /* ---------------- PAGINATION STATE ---------------- */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  //const [countryFilter, setCountryFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('latest');
  const [typeFilter, setTypeFilter] = useState('all');

  const safeMedia = Array.isArray(media) ? media : [];
  const analyticsMedia = safeMedia.filter((item) => belongsToUser(item, user?.id) && isApprovedMedia(item));
  const totalReach = analyticsMedia.reduce((total, item) => total + getMetricValue(item, 'reach'), 0);
  const totalEngagements = analyticsMedia.reduce((total, item) => total + getEngagementTotal(item), 0);
  const engagementRate = totalReach > 0 ? ((totalEngagements / totalReach) * 100).toFixed(1) : '0.0';
  const topMedia = analyticsMedia.reduce((top, item) => {
    if (!top) return item;

    const itemScore = getEngagementTotal(item) || getMetricValue(item, 'reach');
    const topScore = getEngagementTotal(top) || getMetricValue(top, 'reach');

    return itemScore > topScore ? item : top;
  }, null);
  //const countryOptions = [...new Set(safeMedia.map(getMediaCountry).filter(Boolean))].sort();
  const themeOptions = [...new Set(safeMedia.flatMap(getMediaThemes).filter(Boolean))].sort();
  const filteredMedia = safeMedia
    .filter((item) => {
      //const countryMatches = countryFilter === 'all' || getMediaCountry(item) === countryFilter;
      const themeMatches = themeFilter === 'all' || getMediaThemes(item).includes(themeFilter);
      const typeMatches = typeFilter === 'all' || getMediaType(item) === typeFilter;
      return themeMatches && typeMatches;
    })
    .sort((a, b) => {
      if (sortFilter === 'oldest') {
        return parseMediaDate(a) - parseMediaDate(b);
      }
      if (sortFilter === 'title-az') {
        return String(a?.title || '').localeCompare(String(b?.title || ''));
      }
      return parseMediaDate(b) - parseMediaDate(a);
    });
  const totalPages = Math.ceil(filteredMedia.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMedia = filteredMedia.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [redirect, setRedirect] = useState(false);


  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);
  const openAccountModal = () => setShowAccountModal(true);
  const closeAccountModal = () => setShowAccountModal(false);
  const openMediaPreview = (item) => {
    const isVideo = /\.(mp4|webm|ogg)$/i.test(item.file_url);
    setMediaPreview({
      type: isVideo ? 'video' : 'image',
      url: item.file_url,
      title: item.title || 'Media preview',
    });
  };
  const closeMediaPreview = () => setMediaPreview(null);
  const handleUploadKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openUploadModal();
    }
  };
  const handleAccountKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAccountModal();
    }
  };
  useEffect(() => {
    if (!mediaPreview) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMediaPreview();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mediaPreview]);

  useEffect(() => {
    setCurrentPage(1);
  }, [themeFilter, sortFilter, typeFilter]);

  if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }

  
  if (redirect) {
    return <Navigate to="/content-guidelines" />;
  }
   
  
  return (
    <div className="home_page">
      <CreatorHeader />

      <main className="dashboard">
        <div className="dashboard__inner">
          <div className="dashboard__left">
            <div className="dashboard__headline">
              <h1>
                Welcome back,
                <span className="dashboard__name">{user?.name}</span>
              </h1>
            </div>

            

            <div className="dashboard__menu">
              <div className="dashboard__menu-item">
                <span className="dashboard__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <Link to="/profile"><span>View Profile</span></Link>
              </div>
              <div className="dashboard__menu-item dashboard__menu-item--action">
                <span className="dashboard__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="12" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 18h8" stroke="currentColor" strokeWidth="1.6" />
                    <line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.6" />
                    <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span onClick={() => {setRedirect(true);}}>Content Guidelines</span>
                
              </div>
              <div className="dashboard__menu-item dashboard__menu-item--action" role="button" tabIndex={0} onClick={openUploadModal} onKeyDown={handleUploadKeyDown}>
                <span className="dashboard__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 12.5 11 15.5 16 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span>Upload Content</span>
              </div>
              <div
                className="dashboard__menu-item dashboard__menu-item--action"
                role="button"
                tabIndex={0}
                onClick={openAccountModal}
                onKeyDown={handleAccountKeyDown}
              >
                <span className="dashboard__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.6" />
                    <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.6" />
                    <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="9" cy="6" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="15" cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="11" cy="18" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span>Account Settings</span>
              </div>
            </div>
          </div>

          <div className="dashboard__right">
            <div className="dashboard__search">
              <input type="text" placeholder="Search" aria-label="Search" />
              <span className="dashboard__search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </div>
            <div className="analytics-card">
              <h2>Analytics</h2>
              <h3>Overview</h3> 

              <div className="analytics-card__panel">
                <div className="analytics-card__summary">
                  <div className="analytics-card__metric">
                    <span>Total Reach</span>
                    <strong>{formatMetric(totalReach)}</strong>
                  </div>
                  <div className="analytics-card__metric">
                    <span>Engagements</span>
                    <strong>{formatMetric(totalEngagements)}</strong>
                  </div>
                  <div className="analytics-card__metric">
                    <span>Approved Posts</span>
                    <strong>{formatMetric(analyticsMedia.length)}</strong>
                  </div>
                  <div className="analytics-card__metric">
                    <span>Engagement Rate</span>
                    <strong>{engagementRate}%</strong>
                  </div>
                </div>

                <div className="analytics-card__top">
                  <span>Top Content</span>
                  <strong>{topMedia?.title || 'No approved content yet'}</strong>
                  {topMedia && (
                    <small>
                      {formatMetric(getMetricValue(topMedia, 'reach'))} reach - {formatMetric(getEngagementTotal(topMedia))} engagements
                    </small>
                  )}
                </div>
              </div>

              <Link className="analytics-card__btn" to="/analytics">Find out more</Link>

              <div className="analytics-card__avatar">
                <img src={`${BASEURL}/${user?.profile_image}`} alt={`${user?.name || 'Creator'} profile`} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="inspiration">
        <div className="inspiration__header">
          <h2>
            Podder content
            <span>inspiration</span>
          </h2>
        </div>

        <div className="inspiration__filters" aria-label="Inspiration filters">
        
{/* <label>
            Country
            <select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}>
              <option value="all">All countries</option>
              {countryOptions.map((country) => (
                <option value={country} key={country}>{country}</option>
              ))}
            </select>
          </label> */}
          <label>
            Theme
            <select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)}>
              <option value="all">All themes</option>
              {themeOptions.map((theme) => (
                <option value={theme} key={theme}>{theme}</option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select value={sortFilter} onChange={(event) => setSortFilter(event.target.value)}>
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              
            </select>
          </label>

          <label>
            Type
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">All media</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </label>
        </div>
        
         <div className="inspiration__grid">

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && filteredMedia.length === 0 && (
        <p className="inspiration__empty">No inspiration posts match these filters.</p>
      )}

     {/*  <div className="grid"> */}
 {paginatedMedia.map((item) => {
  //console.log(item)
  // check if file is video
  const isVideo = getMediaType(item) === 'video';
  return (
    <div className="inspiration-card" key={item.id || item.title}>
      <div className="inspiration-card__image">
        <button
          type="button"
          className="inspiration-card__media-trigger"
          onClick={() => openMediaPreview(item)}
          aria-label={`Open ${isVideo ? 'video' : 'image'} preview`}
        >
          {isVideo ? (
            <video
              src={item.file_url}
              muted
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={item.file_url}
              alt={item.title || 'Creator marketplace media'}
            />
          )}
        </button>
      </div>

      <div className="inspiration-card__footer">
        <span className="inspiration-card__avatar">
          {/* avatar if needed */}

          {(
          item?.user?.profile_image && (
          <img
            src={item.user.profile_image}
            alt={`${item.user.name || 'Creator'} profile`}
          />
        )
        )}
        </span>
        <span className="inspiration-card__name">{item?.user?.name || item?.title || 'Creator'}</span>
      </div>
    </div>
  );
})}     
        </div>
         {/* ---------------- PAGINATION UI ---------------- */}
        {filteredMedia.length > ITEMS_PER_PAGE && (
          <div className="inspiration__footer">
            <div className="inspiration__pager">
              <button
                type="button"
                className="inspiration__pager-btn"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              <span>
                <strong>{currentPage}</strong> of {totalPages}
              </span>

              <button
                type="button"
                className="inspiration__pager-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
             {/* <button type="button" className="inspiration__cta">Explore more</button> */}
          </div>
        )}
      </section>
      {mediaPreview && (
        <div className="dashboard-media-preview" role="dialog" aria-modal="true">
          <div className="dashboard-media-preview__overlay" onClick={closeMediaPreview} />
          <div className="dashboard-media-preview__content">
            <button
              type="button"
              className="dashboard-media-preview__close"
              onClick={closeMediaPreview}
              aria-label="Close preview"
            >
              ×
            </button>
            {mediaPreview.type === 'video' ? (
              <video
                className="dashboard-media-preview__media"
                src={mediaPreview.url}
                autoPlay
                muted
                controls
                playsInline
              />
            ) : (
              <img
                className="dashboard-media-preview__media"
                src={mediaPreview.url}
                alt={mediaPreview.title || 'Creator marketplace media preview'}
              />
            )}
          </div>
        </div>
      )}
      <UploadModal isOpen={showUploadModal} onClose={closeUploadModal} />
      <AccountSettingsModal isOpen={showAccountModal} onClose={closeAccountModal} />
      <Footer />
    </div>
  );
}

export default Dashboard;
