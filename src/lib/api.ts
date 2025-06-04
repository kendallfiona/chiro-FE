import axios from "axios";

export interface CitySuggestion {
  name: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  fullLabel: string;
}

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  name: string;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  base?: string;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchCitySuggestions = async (
  query: string
): Promise<CitySuggestion[]> => {
  try {
    const response = await apiClient.get<CitySuggestion[]>(
      "/city/suggestions",
      {
        params: { query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions from backend:", error);
    throw new Error("Failed to fetch city suggestions.");
  }
};

export const fetchWeather = async (
  city: CitySuggestion
): Promise<WeatherResponse> => {
  try {
    const response = await apiClient.get<WeatherResponse>(`/weather`, {
      params: { city: city.name },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Weather fetch error:", error);
    // Re-throw the original error to be handled by the caller (useWeatherLookup hook)
    throw error;
  }
};
