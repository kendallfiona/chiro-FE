import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setIsAuthenticated }: NavBarProps) => {
  const username = localStorage.getItem('username');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Weather App</div>
      {username && (
        <div className="flex items-center gap-4">
          <span>Welcome, {firstName} {lastName}!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 