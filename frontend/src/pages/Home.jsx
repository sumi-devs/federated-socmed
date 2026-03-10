import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import TimelineTabs from '../components/TimelineTabs';
import PostCreator from '../components/PostCreator';
import PostList from '../components/PostList';
import SearchUsers from '../components/SearchUsers';
import Layout from '../components/Layout';
import '../styles/Home.css';

const API_BASE_URL = "http://localhost:5000/api";

function Home() {
  const [activeTimeline, setActiveTimeline] = useState('home');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reporting state
  const [reportingTarget, setReportingTarget] = useState(null); // { id, type, name }
  const [reportReason, setReportReason] = useState('spam');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState('');

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setPosts(data.posts);
      } else {
        setError(data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTimelineChange = (timeline) => {
    setActiveTimeline(timeline);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE_URL}/posts/like/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setPosts(posts.map(post =>
          post._id === postId
            ? { ...post, likeCount: data.likeCount, liked: data.liked }
            : post
        ));
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportingTarget) return;

    setReportSubmitting(true);
    setReportSuccess('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reportedId: reportingTarget.id,
          targetType: reportingTarget.type,
          reason: reportReason,
          description: reportDescription
        })
      });

      const data = await res.json();
      if (data.success) {
        setReportSuccess('Report submitted successfully.');
        setTimeout(() => {
          setReportingTarget(null);
          setReportSuccess('');
          setReportDescription('');
          setReportReason('spam');
        }, 2000);
      } else {
        alert(data.message || 'Failed to submit report');
      }
    } catch (err) {
      console.error('Report error:', err);
      alert('Network error. Please try again.');
    } finally {
      setReportSubmitting(false);
    }
  };

  const getFilteredPosts = () => {
    switch (activeTimeline) {
      case 'home':
      case 'local':
        return posts;
      case 'federated':
        return []; // to change later when we integrate federation
      default:
        return posts;
    }
  };

  return (
    <Layout>
      <SearchUsers />

      <TimelineTabs
        activeTimeline={activeTimeline}
        onTimelineChange={handleTimelineChange}
      />

      <PostCreator onPostCreated={handlePostCreated} />

      {loading ? (
        <div className="loading-state">Loading posts...</div>
      ) : error ? (
        <div className="empty-state" style={{ color: '#dc2626' }}>{error}</div>
      ) : (
        <PostList
          posts={getFilteredPosts()}
          onLike={handleLikePost}
          onReport={(id, type, name) => {
            setReportingTarget({ id, type, name });
          }}
          activeTimeline={activeTimeline}
        />
      )}

      {/* Report Modal */}
      {reportingTarget && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <div className="report-modal-header">
              <h3>Report {reportingTarget.type === 'post' ? 'Post' : 'Profile'}</h3>
              <button className="close-btn" onClick={() => setReportingTarget(null)}>
                <FiX />
              </button>
            </div>
            <div className="report-modal-body">
              <p className="report-target-info">
                Reporting: <strong>{reportingTarget.name}</strong>
                <span className="target-id">ID: {reportingTarget.id}</span>
              </p>

              <form onSubmit={handleReportSubmit}>
                <div className="form-group">
                  <label htmlFor="report-reason">Reason for reporting</label>
                  <select
                    id="report-reason"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                  >
                    <option value="spam">Spam / Excessive Posting</option>
                    <option value="harassment">Harassment / Bullying</option>
                    <option value="inappropriate">Inappropriate Content</option>
                    <option value="impersonation">Impersonation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="report-description">Details (Optional)</label>
                  <textarea
                    id="report-description"
                    placeholder="Please provide more details..."
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {reportSuccess && <p className="success-msg">{reportSuccess}</p>}

                <div className="report-modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setReportingTarget(null)}
                    disabled={reportSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-report-btn"
                    disabled={reportSubmitting}
                  >
                    {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;
