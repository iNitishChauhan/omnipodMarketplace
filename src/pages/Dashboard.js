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

const getMediaCountry = (item) =>
  String(item?.country || item?.user?.country || item?.creator?.country || '').trim();

const getMediaThemes = (item) =>
  splitOptionValues(item?.themes || item?.theme || item?.content_theme || item?.category);

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
  
  const analyticsDays = [
    {
      label: 'M',
      rows: [
        { time: '12a', value: 487, width: 62 },
        { time: '3a', value: 561, width: 72 },
        { time: '6a', value: 610, width: 78 },
        { time: '9a', value: 657, width: 86 },
        { time: '12p', value: 665, width: 90 },
        { time: '3p', value: 403, width: 54 },
        { time: '6p', value: 320, width: 40 },
        { time: '9p', value: 351, width: 46 },
      ],
    },
    {
      label: 'Tu',
      rows: [
        { time: '12a', value: 421, width: 55 },
        { time: '3a', value: 498, width: 66 },
        { time: '6a', value: 579, width: 74 },
        { time: '9a', value: 642, width: 84 },
        { time: '12p', value: 690, width: 92 },
        { time: '3p', value: 455, width: 58 },
        { time: '6p', value: 338, width: 42 },
        { time: '9p', value: 372, width: 48 },
      ],
    },
    {
      label: 'W',
      rows: [
        { time: '12a', value: 398, width: 52 },
        { time: '3a', value: 470, width: 62 },
        { time: '6a', value: 592, width: 76 },
        { time: '9a', value: 625, width: 82 },
        { time: '12p', value: 701, width: 94 },
        { time: '3p', value: 432, width: 56 },
        { time: '6p', value: 360, width: 45 },
        { time: '9p', value: 385, width: 50 },
      ],
    },
    {
      label: 'Th',
      rows: [
        { time: '12a', value: 445, width: 58 },
        { time: '3a', value: 512, width: 68 },
        { time: '6a', value: 600, width: 77 },
        { time: '9a', value: 670, width: 88 },
        { time: '12p', value: 688, width: 91 },
        { time: '3p', value: 420, width: 55 },
        { time: '6p', value: 330, width: 41 },
        { time: '9p', value: 362, width: 47 },
      ],
    },
    {
      label: 'F',
      rows: [
        { time: '12a', value: 462, width: 60 },
        { time: '3a', value: 530, width: 70 },
        { time: '6a', value: 615, width: 80 },
        { time: '9a', value: 676, width: 89 },
        { time: '12p', value: 710, width: 95 },
        { time: '3p', value: 448, width: 58 },
        { time: '6p', value: 350, width: 44 },
        { time: '9p', value: 390, width: 51 },
      ],
    },
    {
      label: 'Sa',
      rows: [
        { time: '12a', value: 355, width: 48 },
        { time: '3a', value: 402, width: 55 },
        { time: '6a', value: 510, width: 68 },
        { time: '9a', value: 590, width: 78 },
        { time: '12p', value: 640, width: 86 },
        { time: '3p', value: 382, width: 50 },
        { time: '6p', value: 295, width: 38 },
        { time: '9p', value: 330, width: 42 },
      ],
    },
    {
      label: 'Su',
      rows: [
        { time: '12a', value: 340, width: 46 },
        { time: '3a', value: 390, width: 52 },
        { time: '6a', value: 480, width: 64 },
        { time: '9a', value: 560, width: 74 },
        { time: '12p', value: 620, width: 82 },
        { time: '3p', value: 370, width: 48 },
        { time: '6p', value: 285, width: 36 },
        { time: '9p', value: 310, width: 40 },
      ],
    },
  ];

    /* ---------------- PAGINATION STATE ---------------- */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [countryFilter, setCountryFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('latest');
  const [typeFilter, setTypeFilter] = useState('all');

  const safeMedia = Array.isArray(media) ? media : [];
  const countryOptions = [...new Set(safeMedia.map(getMediaCountry).filter(Boolean))].sort();
  const themeOptions = [...new Set(safeMedia.flatMap(getMediaThemes).filter(Boolean))].sort();
  const filteredMedia = safeMedia
    .filter((item) => {
      const countryMatches = countryFilter === 'all' || getMediaCountry(item) === countryFilter;
      const themeMatches = themeFilter === 'all' || getMediaThemes(item).includes(themeFilter);
      const typeMatches = typeFilter === 'all' || getMediaType(item) === typeFilter;
      return countryMatches && themeMatches && typeMatches;
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

  const [activeDayIndex, setActiveDayIndex] = useState(0);
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
  }, [countryFilter, themeFilter, sortFilter, typeFilter]);

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
                <div className="analytics-card__days">
                  {analyticsDays.map((day, index) => (
                    <button
                      type="button"
                      key={day.label}
                      className={`analytics-card__day-btn ${index === activeDayIndex ? 'is-active' : ''}`}
                      onClick={() => setActiveDayIndex(index)}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>

                <div className="analytics-card__rows">
                  {analyticsDays[activeDayIndex].rows.map((row) => (
                    <div className="analytics-row" key={`${row.time}-${row.value}`}>
                      <span>{row.time}</span>
                      <span className="analytics-bar" style={{ width: `${row.width}%` }} />
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link className="analytics-card__btn" to="/analytics">Find out more</Link>

              <div className="analytics-card__avatar">
                <img src={`${BASEURL}/${user?.profile_image}`} alt="Profile" />
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
              <option value="title-az">Title A-Z</option>
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
              alt={item.title}
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
            alt={item.user.name}
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
                alt={mediaPreview.title}
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
