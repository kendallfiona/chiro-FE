import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WeatherLookup from './components/WeatherLookup/WeatherLookup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/weather" 
            element={
              <WeatherLookup />
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
