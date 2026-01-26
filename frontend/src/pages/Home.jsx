import React, { useState } from 'react';
import TimelineTabs from '../components/TimelineTabs';
import PostCreator from '../components/PostCreator';
import '../styles/app.css';
import Layout from '../components/Layout';

function Home() {
  const [activeTimeline, setActiveTimeline] = useState('home');

  const handleTimelineChange = (timeline) => {
    setActiveTimeline(timeline);
  };

  return (
    <Layout>
      <div className="search-bar">
        <input type="text" placeholder="Type in search" />
      </div>

      {<TimelineTabs
        activeTimeline={activeTimeline}
        onTimelineChange={handleTimelineChange}
      />}

      {<PostCreator />}

    </Layout>
  );
}

export default Home;
