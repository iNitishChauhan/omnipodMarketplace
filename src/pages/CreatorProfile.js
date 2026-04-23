import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadModal from '../components/UploadModal';

import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import checkIcon from '../images/check_icon.png';
import { fetchUserMedia } from '../store/usermedia/mediaActions';
import { BASEURL, API_URL } from '../components/URLS';

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

    const confirmBox = window.confirm(
      "Are you sure you want to request review?"
    );

    if (!confirmBox) {
      return; // stop if user clicks Cancel
    }
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

  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [activeAnalyticsItem, setActiveAnalyticsItem] = useState(null);
  const openAnalyticsModal = (item) => {
    setActiveAnalyticsItem(item);
    setShowAnalyticsModal(true);
  };

  const closeAnalyticsModal = () => {
    setShowAnalyticsModal(false);
    setActiveAnalyticsItem(null);
  };
  //console.log(media[0]);
  /* ---------------- PAGINATION STATE ---------------- */

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("latest");
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [activeRevisionItem, setActiveRevisionItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const closeUploadModal = () => setShowUploadModal(false);

  const openUploadModal = (mid) => {
    localStorage.setItem("mid", mid);
    setShowUploadModal(true);
    setShowRevisionModal(false);
    setActiveRevisionItem(null);
  }

  const handleDeleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to request to delete this file?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(
        `${API_URL}media/delete-request`,
        {
          user_id: user.id,
          media_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Delete request sent");

      navigate(0);

    } catch (error) {
      console.log(error);
      alert("Error deleting image");
    }
  };

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
 /*  const rejectedCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'rejected'
  ).length; */
   const rejected_by_marketingCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'rejected_by_marketing'
  ).length;
   const rejected_by_legalCount = media.filter(
    (item) => String(item?.status || '').toLowerCase() === 'rejected_by_legal'
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
                {/* <p>{rejectedCount} Rejected</p>  */}
                <p>{rejected_by_marketingCount} Rejected By Marketing</p>
                <p>{rejected_by_legalCount} Rejected By Legal</p>
              </div>

              <div className="profile-hero__filters">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} defaultValue="approval-status" aria-label="Approval Status">
                  {/*   <option value="approval-status">Approval Status</option> */}
                  <option value="all">All</option>
                  <option value="published">Approved</option>
                  <option value="draft">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="rejected_by_marketing">Rejected By Marketing</option>
                  <option value="rejected_by_legal">Rejected By Legal</option>
                </select>

                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} defaultValue="date-uploaded" aria-label="Date Uploaded">
                  {/*                   <option value="date-uploaded">Date Uploaded</option>
 */}                  <option value="latest">Latest First</option>
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

                      <>
                        <video
                          src={item.file_url}
                          controls
                          preload="metadata"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

                        {(item.status === 'rejected' || item.status === 'rejected_by_marketing' || item.status === 'rejected_by_legal') && (
                          <button
                            type="button"
                            className="profile-card__status profile-card__status--revision profile-card__status-btn"
                            onClick={() => openRevisionModal(item)}
                          >
                            <span>×</span> Needs Revision
                          </button>
                        )}
                        {item.status === 'published' && (
                          <>
                            {(item?.delete_request === "no" || item?.delete_request === "reject") && (
                              <button
                                type="button"
                                className="profile-card__delete-btn"
                                onClick={() => handleDeleteImage(item.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                                Delete
                              </button>
                            )}

                            <button
                              type="button"
                              className="profile-card__btn profile-card__btn--analytics"
                              onClick={() => openAnalyticsModal(item)}
                            >
                              Analytics
                            </button>
                          </>
                        )}

                        {(item.status === 'rejected' || item.status === 'rejected_by_marketing' || item.status === 'rejected_by_legal') && (
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

                        {(item.status === 'rejected' || item.status === 'rejected_by_marketing' || item.status === 'rejected_by_legal') && (
                          <button
                            type="button"
                            className="profile-card__status profile-card__status--revision profile-card__status-btn"
                            onClick={() => openRevisionModal(item)}
                          >
                            <span>×</span> Needs Revision
                          </button>
                        )}

                        {item.status === 'published' && (
                          <>
                            {(item?.delete_request === "no" || item?.delete_request === "reject") && (
                              <button
                                type="button"
                                className="profile-card__delete-btn"
                                onClick={() => handleDeleteImage(item.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                                Delete
                              </button>
                            )}

                            <button
                              type="button"
                              className="profile-card__btn profile-card__btn--analytics"
                              onClick={() => openAnalyticsModal(item)}
                            >
                              Analytics
                            </button>
                          </>
                        )}

                        {(item.status === 'rejected' || item.status === 'rejected_by_marketing' || item.status === 'rejected_by_legal') && (
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
                <strong>Reason:</strong>
                {activeRevisionItem.reject_reason || 'Missing consent form for Hannah McC'}
              </p>

              <button type="button" onClick={() => openUploadModal(activeRevisionItem.id)} className="revision-modal__btn revision-modal__btn--outline">
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
      <UploadModal isOpen={showUploadModal} onClose={closeUploadModal} />

      {showAnalyticsModal && activeAnalyticsItem && (
        <div className="revision-modal" role="dialog">
          <div
            className="revision-modal__overlay"
            onClick={closeAnalyticsModal}
          />

          <div className="revision-modal__content">

            <div className="revision-modal__media">
              <img
                src={activeAnalyticsItem.file_url}
                alt=""
              />
            </div>
            <div className="revision-modal__details">
              <h3>
                Media <span>Analytics</span>
              </h3>
              <p>
                <strong>Title:</strong>{" "}
                {activeAnalyticsItem.title}
              </p>
              <p>
                <strong>Reach:</strong>{" "}
                {activeAnalyticsItem.reach || 0}
              </p>
              <p>
                <strong>Likes:</strong>{" "}
                {activeAnalyticsItem.likes || 0}
              </p>
              <p>
                <strong>Comments:</strong>{" "}
                {activeAnalyticsItem.comments || 0}
              </p>
              <p>
                <strong>Reposts:</strong>{" "}
                {activeAnalyticsItem.reposts || 0}
              </p>
              <p>
                <strong>Shares:</strong>{" "}
                {activeAnalyticsItem.shares || 0}
              </p>
              <button
                type="button"
                className="revision-modal__btn revision-modal__btn--solid"
                onClick={closeAnalyticsModal}
              >
                X
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
