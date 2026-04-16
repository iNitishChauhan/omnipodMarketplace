import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import { fetchUserMedia } from '../store/usermedia/mediaActions';

const isVideoMedia = (item) => {
  const mediaType = String(item?.media_type || item?.type || '').toLowerCase();
  return mediaType.includes('video') || /\.(mp4|webm|ogg)$/i.test(item?.file_url || '');
};

const getMetricValue = (item, metric) => {
  const fallbackValues = {
    reach: 10,
    likes: 12,
    comments: 15,
    reposts: 0,
    shares: 0,
  };
  const value = Number(item?.[metric] ?? fallbackValues[metric]);
  return Number.isNaN(value) ? fallbackValues[metric] : value;
};

const getMediaDate = (item) => {
  const rawDate = item?.created_at || item?.updated_at || item?.uploaded_at || item?.date_uploaded;
  if (!rawDate) return Number(item?.id || 0);
  const value = new Date(typeof rawDate === 'string' ? rawDate.replace(' ', 'T') : rawDate).getTime();
  return Number.isNaN(value) ? Number(item?.id || 0) : value;
};

function Analytics() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { media, loading, error } = useSelector((state) => state.userMedia);
  const [pageSize, setPageSize] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMetric, setSortMetric] = useState('reach');
  const [sortOrder, setSortOrder] = useState('latest');
  const safeMedia = Array.isArray(media) ? media : [];
  const approvedMedia = safeMedia
    .filter((item) => ['published', 'approved'].includes(String(item?.status || '').toLowerCase()))
    .sort((a, b) => {
      const dateA = getMediaDate(a);
      const dateB = getMediaDate(b);
      if (dateA !== dateB) {
        return sortOrder === 'old' ? dateA - dateB : dateB - dateA;
      }
      return getMetricValue(b, sortMetric) - getMetricValue(a, sortMetric);
    });
  const pageSizeNumber = pageSize === 'all' ? approvedMedia.length || 1 : Number(pageSize);
  const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(approvedMedia.length / pageSizeNumber));
  const startIndex = pageSize === 'all' ? 0 : (currentPage - 1) * pageSizeNumber;
  const paginatedMedia =
    pageSize === 'all' ? approvedMedia : approvedMedia.slice(startIndex, startIndex + pageSizeNumber);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMedia(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, sortMetric, sortOrder]);

  if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }

  const handleMetricSort = (metric) => {
    setSortMetric(metric);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const renderSortLabel = (metric) => {
    if (metric !== sortMetric) return '';
    return ' •';
  };

  return (
    <div className="analytics-page">
      <CreatorHeader /> 

      <main className="analytics-page__main">
        <div className="analytics-page__inner">
          <section className="analytics-page__hero">
            <p>Creator Marketplace</p>
            <h1>Analytics Overview</h1>
          </section>

          <section className="analytics-table-wrap">
            {loading && <p className="analytics-page__message">Loading analytics...</p>}
            {error && <p className="analytics-page__message analytics-page__message--error">{error}</p>}

            {!loading && !error && (
              <>
                <div className="analytics-page__controls">
                  <label>
                    Show
                    <select value={pageSize} onChange={(event) => setPageSize(event.target.value)}>
                      <option value="5">5 posts</option>
                      <option value="10">10 posts</option>
                      <option value="20">20 posts</option>
                      <option value="all">All posts</option>
                    </select>
                  </label>

                  <label>
                    Sort metric
                    <select value={sortMetric} onChange={(event) => setSortMetric(event.target.value)}>
                      <option value="reach">Reach</option>
                      <option value="likes">Likes</option>
                      <option value="comments">Comments</option>
                      <option value="reposts">Reposts</option>
                      <option value="shares">Shares</option>
                    </select>
                  </label>

                  <label>
                    Sort order
                    <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                      <option value="latest">Latest</option>
                      <option value="old">Old</option>
                    </select>
                  </label>
                </div>

                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>
                        <button type="button" onClick={() => handleMetricSort('reach')}>
                          Reach{renderSortLabel('reach')}
                        </button>
                      </th>
                      <th>
                        <button type="button" onClick={() => handleMetricSort('likes')}>
                          Likes{renderSortLabel('likes')}
                        </button>
                      </th>
                      <th>
                        <button type="button" onClick={() => handleMetricSort('comments')}>
                          Comments{renderSortLabel('comments')}
                        </button>
                      </th>
                      <th>
                        <button type="button" onClick={() => handleMetricSort('reposts')}>
                          Reposts{renderSortLabel('reposts')}
                        </button>
                      </th>
                      <th>
                        <button type="button" onClick={() => handleMetricSort('shares')}>
                          Shares{renderSortLabel('shares')}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
              
                    {paginatedMedia.length > 0 ? (
                      paginatedMedia.map((item) => (
                        <tr key={item.id || item.title}>
                          <td>
                            <div className="analytics-table__media">
                              {isVideoMedia(item) ? (
                                <video src={item.file_url} muted playsInline preload="metadata" />
                              ) : (
                                <img src={item.file_url} alt={item.title || 'Media thumbnail'} />
                              )}
                              <span>{item.title || 'Untitled media'}</span>
                            </div>
                          </td>
                          <td>{getMetricValue(item, 'reach')}</td>
                          <td>{getMetricValue(item, 'likes')}</td>
                          <td>{getMetricValue(item, 'comments')}</td>
                          <td>{getMetricValue(item, 'reposts')}</td>
                          <td>{getMetricValue(item, 'shares')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No approved media analytics available yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {approvedMedia.length > 0 && pageSize !== 'all' && (
                  <div className="analytics-page__pager">
                    <button type="button" onClick={goToPrevPage} disabled={currentPage === 1}>
                      &lt;
                    </button>
                    <span>
                      <strong>{currentPage}</strong> of {totalPages}
                    </span>
                    <button type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Analytics;
