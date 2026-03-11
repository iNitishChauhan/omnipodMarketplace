import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import checkIcon from '../images/check_icon.png';
import { fetchUserMedia } from '../store/usermedia/mediaActions';
import {BASEURL, API_URL} from '../components/URLS';

function CreatorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { media, loading, error } = useSelector((state) => state.userMedia);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMedia(user.id));
    }
  }, [dispatch, user]);


const requestReview = async (id) => {
  try {
    const res = await axios.post(
      `${API_URL}media/${id}/request-review`,
    );

    console.log(res.data);

    // reload media
    dispatch(fetchUserMedia(user.id));

  } catch (error) {
    console.log(error);
  }
};


//console.log(media[0]);
/* ---------------- PAGINATION STATE ---------------- */
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("latest");
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [activeRevisionItem, setActiveRevisionItem] = useState(null);


/*   const totalPages = Math.ceil(media.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMedia = media.slice(startIndex, endIndex); */
// 1️⃣ FILTER
const parseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  return new Date(
    typeof dateStr === "string"
      ? dateStr.replace(" ", "T")
      : dateStr
  );
};

const filteredMedia = [...media]
  .filter((item) => {
    if (statusFilter === "all") return true;
    return item.status?.toLowerCase() === statusFilter;
  }) 
  .sort((a, b) => {
    const dateA = parseDate(a.created_at).getTime();
    const dateB = parseDate(b.created_at).getTime();

    return dateFilter === "latest"
      ? dateB - dateA
      : dateA - dateB;
  });

// 3️⃣ PAGINATION (AFTER filter + sort)
const totalPages = Math.ceil(filteredMedia.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const paginatedMedia = filteredMedia.slice(startIndex, endIndex);
useEffect(() => {
  setCurrentPage(1);
   //console.log("dateFilter:", dateFilter);
}, [statusFilter, dateFilter]);

if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const openRevisionModal = (item) => {
    setActiveRevisionItem(item);
    setShowRevisionModal(true);
  };

  const closeRevisionModal = () => {
    setShowRevisionModal(false);
    setActiveRevisionItem(null);
  };

  const firstName = user?.name?.trim()?.split(' ')[0] || 'Creator';
  const postCount = media.length;
  const pendingCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'pending'
  ).length;
  const rejectedCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'rejected'
  ).length;

  return (
    <div className="home_page">
      <CreatorHeader />

      <main className="profile_page">
        <div className="profile__inner">
          <section className="profile-hero">
            <div className="profile-hero__avatar">
              <img src={`${BASEURL}/${user.profile_image}`} alt={`${firstName} profile`} />
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
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} defaultValue="approval-status" aria-label="Approval Status">
                  <option value="approval-status">Approval Status</option>
                  <option value="all">All</option>
                  <option value="published">Approved</option>
                  <option value="draft">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select value={statusFilter} onChange={(e) => setDateFilter(e.target.value)} defaultValue="date-uploaded" aria-label="Date Uploaded">
                  <option value="date-uploaded">Date Uploaded</option>
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </section>

          <section className="profile-gallery" aria-label="Profile media">
            <div className="profile-gallery__grid">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

     {/*  <div className="grid"> */}
 {paginatedMedia.map((item) => {
  // check if file is video
  //console.log(item.status);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(item.file_url);
  return (
    <article key={item.id} className={`profile-card profile-card--${item.status}`}>

        {isVideo ? (
          <video
            src={item.file_url}
            controls
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
          <img
            src={item.file_url}
            alt={item.title}
          />
          {item.status === 'published' && (
                    <p className="profile-card__status profile-card__status--approved">
                      <span><img src={checkIcon} alt='Approved' /></span> Approved
                    </p>
                  )}
                  
          {item.status === 'pending' && (
                    <p className="profile-card__status profile-card__status--pending">
                      Pending
                    </p>
                  )}

                  {item.status === 'rejected' && (
                    <button
                      type="button"
                      className="profile-card__status profile-card__status--revision profile-card__status-btn"
                      onClick={() => openRevisionModal(item)}
                    >
                      <span>×</span> Needs Revision
                    </button>
                  )}
                  
                  {item.status === 'analytics' && (
                    <button type="button" className="profile-card__btn profile-card__btn--analytics">
                      Analytics
                    </button>
                  )}

                  {item.status === 'rejected' && (
                    <div className="profile-card__revision-actions">
                      <button
                        type="button"
                        className="profile-card__btn profile-card__btn--analytics"
                        onClick={() => openRevisionModal(item)}
                      >
                        Find out more
                      </button>
                      <button type="button" onClick={() => requestReview(item.id)} className="profile-card__btn profile-card__btn--light">
                        Request review
                      </button>
                    </div>
                  )}
                  </>
          
        )}
   
    </article>
  );
})}
            </div>
{filteredMedia.length > ITEMS_PER_PAGE && (
          <div className="profile-gallery__pager">
              <button
                type="button" aria-label="Previous page"
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
             )}
          </section>
        </div>
      </main>

      {showRevisionModal && activeRevisionItem && (
        <div className="revision-modal" role="dialog" aria-modal="true" aria-label="Needs Revision details">
          <div className="revision-modal__overlay" onClick={closeRevisionModal} />

          <div className="revision-modal__content">
            <div className="revision-modal__media">
              <img src={activeRevisionItem.file_url} alt={activeRevisionItem.title || 'Revision content'} />
            </div>

            <div className="revision-modal__details">
              <h3>
                Content <span>Needs Revision</span>
              </h3>

              <p>
                <strong>Image:</strong> {activeRevisionItem.title || 'Russel and Hannah 1'}
              </p>
              <p>
                <strong>Reason:</strong>{" "}
                {activeRevisionItem.revision_reason ||
                  activeRevisionItem.rejected_reason ||
                  activeRevisionItem.reason ||
                  'Missing consent form for Hannah McC'}
              </p>

              <button type="button" className="revision-modal__btn revision-modal__btn--outline">
                + Re-Upload
              </button>
              <button
                type="button"
                className="revision-modal__btn revision-modal__btn--solid"
                onClick={() => navigate('/content-guidelines')}
              >
                View Content Guidelines
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CreatorProfile;
