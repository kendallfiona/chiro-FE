import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NavBar Component', () => {
  const mockSetIsAuthenticated = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  it('renders the app title', () => {
    render(
      <BrowserRouter>
        <NavBar setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });

  it('shows welcome message and logout button when user is logged in', () => {
    // Set up localStorage items
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('firstName', 'John');
    localStorage.setItem('lastName', 'Doe');

    render(
      <BrowserRouter>
        <NavBar setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    // Set up localStorage items
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('firstName', 'John');
    localStorage.setItem('lastName', 'Doe');
    localStorage.setItem('authToken', 'fake-token');

    render(
      <BrowserRouter>
        <NavBar setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    // Click logout button
    fireEvent.click(screen.getByText('Logout'));

    // Check if localStorage is cleared
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(localStorage.getItem('firstName')).toBeNull();
    expect(localStorage.getItem('lastName')).toBeNull();

    // Check if setIsAuthenticated was called with false
    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);

    // Check if navigate was called with '/login'
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 