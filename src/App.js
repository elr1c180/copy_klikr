import './App.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Rewards from './pages/Rewards';

function App() {
  window.Telegram.WebApp.ready(function() {
    window.Telegram.WebApp.expand();
});
  return (
    <BrowserRouter>
  
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
  
        </BrowserRouter>
  );
}

export default App;
