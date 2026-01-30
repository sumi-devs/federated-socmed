import React from 'react';
import Layout from '../components/Layout';
import { FiMapPin, FiCalendar, FiLink } from 'react-icons/fi';
import '../styles/Profile.css';

function Profile() {
  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="profile-info">
            <div className="profile-avatar-large">BG</div>
            <div className="profile-details">
              <h1>Ben Goro</h1>
              <p className="username">@bengoro</p>
              <p className="bio">
                Full-stack developer | Tech enthusiast | Coffee lover ☕
              </p>
              <div className="profile-meta">
                <span><FiMapPin /> Thiruvananthapuram, Kerala</span>
                <span><FiCalendar /> Joined June 2023</span>
                <span><FiLink /> example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">142</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-number">1,234</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-number">567</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        <div className="profile-content">
          <h2>Recent Posts</h2>
          <p className="coming-soon">Profile posts coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;