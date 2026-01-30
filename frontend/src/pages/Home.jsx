import React, { useState } from 'react';
import TimelineTabs from '../components/TimelineTabs';
import PostCreator from '../components/PostCreator';
import PostList from '../components/PostList';
import Layout from '../components/Layout';
import '../styles/Home.css';

function Home() {
  const [activeTimeline, setActiveTimeline] = useState('home');

  const dummyPosts = {
    home: [
      {
        _id: '1',
        author: 'Sarah Johnson',
        authorAvatar: 'SJ',
        content: 'Just finished reading an amazing book on decentralized systems. The future of social media is federated!',
        likes: 24,
        comments: 5,
        shares: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        images: []
      },
      {
        _id: '2',
        author: 'Mike Chen',
        authorAvatar: 'MC',
        content: 'Does anyone have recommendations for good React component libraries? Looking to speed up my development workflow.',
        likes: 18,
        comments: 12,
        shares: 1,
        createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        images: []
      },
      {
        _id: '3',
        author: 'Emma Rodriguez',
        authorAvatar: 'ER',
        content: 'Excited to announce that our team just launched a new feature! We\'ve been working on this for months. Check it out and let us know what you think.',
        likes: 67,
        comments: 23,
        shares: 15,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        images: []
      },
      {
        _id: '4',
        author: 'Alex Kumar',
        authorAvatar: 'AK',
        content: 'Coffee, code, repeat. That\'s been my entire week. How do you all maintain work-life balance in tech?',
        likes: 45,
        comments: 31,
        shares: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        images: []
      }
    ],
    local: [
      {
        _id: '5',
        author: 'Local Community',
        authorAvatar: 'LC',
        content: 'Reminder: City council meeting this Thursday at 6 PM. All residents are welcome to attend and voice their opinions.',
        likes: 34,
        comments: 8,
        shares: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        images: []
      },
      {
        _id: '6',
        author: 'Tech Meetup Group',
        authorAvatar: 'TM',
        content: 'Our next meetup is scheduled for next Tuesday! Topic: Building Scalable Applications with Microservices. Register now!',
        likes: 56,
        comments: 15,
        shares: 24,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        images: []
      },
      {
        _id: '7',
        author: 'Rachel Green',
        authorAvatar: 'RG',
        content: 'The weather has been absolutely perfect this week. Perfect time to work from the local coffee shop!',
        likes: 21,
        comments: 7,
        shares: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
        images: []
      }
    ],
    federated: [
      {
        _id: '7',
        author: 'Rachel Green',
        authorAvatar: 'RG',
        content: 'The weather has been absolutely perfect this week. Perfect time to work from the local coffee shop!',
        likes: 21,
        comments: 7,
        shares: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
        images: []
      }
    ]
  };

  const handleTimelineChange = (timeline) => {
    setActiveTimeline(timeline);
  };

  const handleLikePost = (postId) => {
    console.log(`Liked post ${postId}`); // replace with actual like logic
  };

  return (
    <Layout>
      <div className="search-bar">
        <input type="text" placeholder="Type in search" />
      </div>

      <TimelineTabs
        activeTimeline={activeTimeline}
        onTimelineChange={handleTimelineChange}
      />

      <PostCreator />

      <PostList 
        posts={dummyPosts[activeTimeline]}
        onLike={handleLikePost}
        activeTimeline={activeTimeline}
      />
    </Layout>
  );
}

export default Home;