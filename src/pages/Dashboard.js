import { useState, useEffect } from 'react';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import UploadModal from '../components/UploadModal';
import profileImage from '../images/creator-image.png';
import inspirationImage1 from '../images/picture1.png';
import inspirationImage2 from '../images/creator-image2.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMedia } from "../store/media/mediaActions";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { media, loading, error } = useSelector((state) => state.media);

//console.log(user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMedia(user?.id));
    }
  }, [dispatch, user]);
  
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
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(media.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMedia = media.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
   if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }


  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);
  const handleUploadKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openUploadModal();
    }
  };

  
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
                <span>View Profile</span>
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
              <div className="dashboard__menu-item">
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

              <button className="analytics-card__btn" type="button">Find out more</button>

              <div className="analytics-card__avatar">
                <img src={`https://omnipodmarketplace.minddigital.in/${user?.profile_image}`} alt="Profile" />
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
        
         <div className="inspiration__grid">

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

     {/*  <div className="grid"> */}
 {paginatedMedia.map((item) => {
  // check if file is video
  const isVideo = /\.(mp4|webm|ogg)$/i.test(item.file_url);
  return (
    <div className="inspiration-card" key={item.id || item.title}>
      <div className="inspiration-card__image">
        {isVideo ? (
          <video
            src={item.file_url}
            controls
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src={item.file_url}
            alt={item.title}
          />
        )}
      </div>

      <div className="inspiration-card__footer">
        <span className="inspiration-card__avatar">
          {/* avatar if needed */}
        </span>
        <span className="inspiration-card__name">{item.title}</span>
      </div>
    </div>
  );
})}

 
   
       
        
        </div>
         {/* ---------------- PAGINATION UI ---------------- */}
        {media.length > ITEMS_PER_PAGE && (
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
             <button type="button" className="inspiration__cta">Explore more</button>
          </div>
        )}
      </section>
 <UploadModal isOpen={showUploadModal} onClose={closeUploadModal} />
      <Footer />
    </div>
  );
}

export default Dashboard;
