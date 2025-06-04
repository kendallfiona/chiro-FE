import { render, screen, fireEvent } from '@testing-library/react';
import WeatherLookup from '../WeatherLookup';
import * as useWeatherLookupModule from '../../../hooks/useWeatherLookup';

// Mock the API module
jest.mock('../../../lib/api', () => ({
  fetchCitySuggestions: jest.fn(),
  fetchWeather: jest.fn(),
}));

const mockSetCity = jest.fn();
const mockHandleSelectSuggestion = jest.fn();
const mockLookupWeather = jest.fn();

const baseHookState = {
  city: '',
  setCity: mockSetCity,
  suggestions: [],
  handleSelectSuggestion: mockHandleSelectSuggestion,
  lookupWeather: mockLookupWeather,
  weather: null,
  error: null,
  loading: false,
};

describe('WeatherLookup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and input', () => {
    jest.spyOn(useWeatherLookupModule, 'useWeatherLookup').mockReturnValue({
      ...baseHookState,
    });
    render(<WeatherLookup />);
    expect(screen.getByText('Weather Lookup')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
  });

  it('shows loader when loading', () => {
    jest.spyOn(useWeatherLookupModule, 'useWeatherLookup').mockReturnValue({
      ...baseHookState,
      loading: true,
    });
    render(<WeatherLookup />);
    // Check for the loading container div
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'div' && 
             element?.className.includes('flex justify-center mt-4');
    })).toBeInTheDocument();
  });

  it('shows error message when error exists', () => {
    jest.spyOn(useWeatherLookupModule, 'useWeatherLookup').mockReturnValue({
      ...baseHookState,
      error: 'City not found',
    });
    render(<WeatherLookup />);
    expect(screen.getByText('City not found')).toBeInTheDocument();
  });

  it('shows weather display when weather exists', () => {
    jest.spyOn(useWeatherLookupModule, 'useWeatherLookup').mockReturnValue({
      ...baseHookState,
      weather: { name: 'Paris', sys: { country: 'FR' }, main: { temp: 20, feels_like: 19, temp_min: 15, temp_max: 22, pressure: 1012, humidity: 60 }, weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }], wind: { speed: 3.6, deg: 180 }, coord: { lon: 2.3522, lat: 48.8566 }, visibility: 10000, clouds: { all: 0 }, dt: 0, base: '', sys: { country: 'FR', sunrise: 0, sunset: 0 }, timezone: 0, id: 0, cod: 0 },
    });
    render(<WeatherLookup />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('FR')).toBeInTheDocument();
  });
}); 