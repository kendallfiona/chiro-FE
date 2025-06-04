import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../WeatherDisplay';
import { WeatherData } from '../../../hooks/useWeatherLookup';

describe('WeatherDisplay', () => {
  const mockWeather: WeatherData = {
    coord: { lon: 2.3522, lat: 48.8566 },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 15,
      temp_max: 22,
      pressure: 1012,
      humidity: 60,
    },
    visibility: 10000,
    wind: {
      speed: 3.6,
      deg: 180,
      gust: 5.0,
    },
    clouds: { all: 0 },
    dt: 1627898400,
    sys: {
      country: 'FR',
      sunrise: 1627868400,
      sunset: 1627921200,
    },
    timezone: 7200,
    id: 2988507,
    name: 'Paris',
    cod: 200,
  };

  it('renders city name and country', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('FR')).toBeInTheDocument();
  });

  it('renders main temperature and feels like', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('19°C')).toBeInTheDocument();
  });

  it('renders min and max temperature', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
  });

  it('renders weather condition', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('renders wind, humidity, and pressure', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText(/3.6 m\/s/)).toBeInTheDocument();
    expect(screen.getByText(/Gusts: 5/)).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('1012 hPa')).toBeInTheDocument();
  });
}); 