import './App.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
  
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
  
        </BrowserRouter>
  );
}

export default App;
