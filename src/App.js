import './App.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Rewards from './pages/Rewards';
import Boost from './pages/Boost';

function App() {
  const tele = window.Telegram.WebApp;
  tele.expand()

  return (
    <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/boost" element={<Boost />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
  
        </BrowserRouter>
  );
}

export default App;
