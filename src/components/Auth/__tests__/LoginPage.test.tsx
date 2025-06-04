import { render, screen, fireEvent, waitFor } from '@testing-library/react';
jest.mock('../../../config', () => ({ BACKEND_URL: 'http://localhost:3000' }));
import LoginPage from '../LoginPage';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  const onLoginSuccess = jest.fn();
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    console.error = jest.fn(); // Mock console.error
  });

  afterEach(() => {
    console.error = originalConsoleError; // Restore console.error
  });

  it('renders username, password fields and sign in button', () => {
    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls API and handles successful login', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { username: 'testuser', firstName: 'John', lastName: 'Doe' },
      },
    });
    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(localStorage.getItem('authToken')).toBe('fake-token');
      expect(localStorage.getItem('username')).toBe('testuser');
      expect(localStorage.getItem('firstName')).toBe('John');
      expect(localStorage.getItem('lastName')).toBe('Doe');
      expect(onLoginSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/weather');
    });
  });

  it('shows error message and toast on failed login', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith('Login failed. Invalid credentials.');
      expect(console.error).toHaveBeenCalled(); // Verify that error was logged
    });
  });
}); 