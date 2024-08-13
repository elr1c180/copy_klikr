import './App.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Rewards from './pages/Rewards';
import Boost from './pages/Boost';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Leagues from './pages/Leagues';
import ScrollControl from './ScrollControl';

function App() {
  const tele = window.Telegram.WebApp;
  tele.expand()

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Leagues" element={<Leagues />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
