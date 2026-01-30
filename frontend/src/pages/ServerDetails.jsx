import React from 'react';
import Layout from '../components/Layout';
import {
  FiServer,
  FiInfo,
  FiUser,
  FiShield,
  FiAlertCircle
} from 'react-icons/fi';
import '../styles/ServerDetails.css';

function ServerDetails() {
  const server = {
    name: 'Connected Main Server',
    description:
      'This is the primary community server for Connected. All general discussions, updates, and public channels are hosted here.',
    admin: 'Admin_01 (Ben Goro)',
    rules: [
      'Be respectful to all members.',
      'No hate speech, harassment, or bullying.',
      'Do not spam or post malicious links.',
      'Follow channel-specific guidelines.',
      'Admins reserve the right to moderate content.'
    ]
  };

  return (
    <Layout>
      <div className="server-container">
        <div className="server-header">
          <h1>
            <FiServer /> Server Details
          </h1>
          <p>Information and rules for this server</p>
        </div>

        <div className="server-card">
          <div className="server-section">
            <h2>
              <FiInfo /> Server Information
            </h2>
            <div className="server-info">
              <p>
                <strong>Name:</strong> {server.name}
              </p>
              <p>
                <strong>Description:</strong> {server.description}
              </p>
            </div>
          </div>

          <div className="server-section">
            <h2>
              <FiUser /> Administrator
            </h2>
            <p>{server.admin}</p>
          </div>

          <div className="server-section">
            <h2>
              <FiShield /> Server Rules
            </h2>
            <ul className="rules-list">
              {server.rules.map((rule, index) => (
                <li key={index}>
                  <FiAlertCircle /> {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ServerDetails;