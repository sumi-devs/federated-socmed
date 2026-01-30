import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Channels from './pages/Channels';
import Settings from './pages/Settings';
import ServerDetails from './pages/ServerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/server-details" element={<ServerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;