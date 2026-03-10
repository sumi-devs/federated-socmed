import React, { useState } from 'react';
import {
  FiUser,
  FiImage,
  FiLink,
  FiMapPin,
  FiSmile
} from 'react-icons/fi';

const API_BASE_URL = "http://localhost:5000/api";

const PostCreator = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          description: postContent.trim(),
          isChannelPost: false
        })
      });

      const data = await res.json();

      if (data.success) {
        setPostContent('');
        if (onPostCreated) {
          onPostCreated(data.post);
        }
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCreatePost();
    }
  };

  return (
    <div className="post-creator">
      <div className="post-creator-header">
        <div className="user-avatar">
          <FiUser />
        </div>

        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => { setPostContent(e.target.value); setError(''); }}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      {error && <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

      <div className="post-creator-footer">
        <div className="post-actions">
          <button className="action-btn" title="Add image">
            <FiImage />
          </button>

          <button className="action-btn" title="Add link">
            <FiLink />
          </button>

          <button className="action-btn" title="Add location">
            <FiMapPin />
          </button>

          <button className="action-btn" title="Add emoji">
            <FiSmile />
          </button>
        </div>

        <button
          className="post-btn"
          onClick={handleCreatePost}
          disabled={loading || !postContent.trim()}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
