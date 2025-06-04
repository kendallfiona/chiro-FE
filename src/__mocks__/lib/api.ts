export const fetchCitySuggestions = jest.fn();
export const fetchWeather = jest.fn();

export interface CitySuggestion {
  name: string;
  state: string;
  country: string;
  coordinates: { lat: number; lon: number };
  fullLabel: string;
} 