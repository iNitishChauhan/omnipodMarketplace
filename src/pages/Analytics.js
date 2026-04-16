import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import { fetchMedia } from '../store/media/mediaActions';

const isVideoMedia = (item) => {
  const mediaType = String(item?.media_type || item?.type || '').toLowerCase();
  return mediaType.includes('video') || /\.(mp4|webm|ogg)$/i.test(item?.file_url || '');
};

function Analytics() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { media, loading, error } = useSelector((state) => state.media);
  const safeMedia = Array.isArray(media) ? media : [];

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
  }

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
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Reach</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Reposts</th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {safeMedia.length > 0 ? (
                    safeMedia.map((item) => (
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
                        <td>{item.reach ?? 10}</td>
                        <td>{item.likes ?? 12}</td>
                        <td>{item.comments ?? 15}</td>
                        <td>{item.reposts ?? 0}</td>
                        <td>{item.shares ?? 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No media analytics available yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Analytics;
