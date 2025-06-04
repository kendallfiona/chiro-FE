import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import NavBar from './components/NavBar';
import WeatherLookup from './components/WeatherLookup/WeatherLookup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated} />}
      <div className={isAuthenticated ? 'mt-4' : ''}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/weather" replace /> : 
                <LoginPage onLoginSuccess={handleLogin} />
            } 
          />
          <Route 
            path="/weather" 
            element={
              isAuthenticated ? 
                <WeatherLookup /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/weather" replace />} 
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
