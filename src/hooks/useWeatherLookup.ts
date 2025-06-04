// hooks/useWeatherLookup.ts
import { useEffect, useState, useRef } from "react";
import { fetchCitySuggestions, fetchWeather } from "../lib/api";
import { CitySuggestion } from "../lib/api";
import axios from "axios";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const useWeatherLookup = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const lastSelectedCityRef = useRef<string | null>(null);

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    if (city === lastSelectedCityRef.current) {
      lastSelectedCityRef.current = null;
      return;
    }

    const timeout = setTimeout(() => {
      fetchSuggestions(city);
    }, 300);

    return () => clearTimeout(timeout);
  }, [city]);

  const fetchSuggestions = async (query: string) => {
    try {
      const result = await fetchCitySuggestions(query);
      setSuggestions(result);
    } catch (err) {
      console.error(err);
    }
  };

  const lookupWeather = async (cityInput: CitySuggestion | string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setSuggestions([]);

    let selectedCity: CitySuggestion | undefined;

    if (typeof cityInput === "string") {
      try {
        const suggestions = await fetchCitySuggestions(cityInput);
        if (suggestions.length > 0) {
          selectedCity = suggestions[0];

          setCity(suggestions[0].fullLabel);
          lastSelectedCityRef.current = suggestions[0].fullLabel;
        } else {
          selectedCity = {
            name: cityInput,
            state: "",
            country: "",
            coordinates: { lat: 0, lon: 0 },
            fullLabel: cityInput,
          };
          setCity(cityInput);
          lastSelectedCityRef.current = cityInput;
          console.log(
            "No suggestions found, attempting weather fetch for typed city:",
            cityInput
          );
        }
      } catch (e: unknown) {
        console.error(
          "Error fetching suggestions, attempting weather fetch for typed city:",
          cityInput,
          e
        );
        selectedCity = {
          name: cityInput,
          state: "",
          country: "",
          coordinates: { lat: 0, lon: 0 },
          fullLabel: cityInput,
        };
        setCity(cityInput);
        lastSelectedCityRef.current = cityInput;
      }
    } else {
      selectedCity = cityInput;
      setCity(selectedCity.fullLabel);
      lastSelectedCityRef.current = selectedCity.fullLabel;
    }

    if (selectedCity) {
      try {
        if (!selectedCity.name) {
          setError("City name is required for weather lookup.");
          setLoading(false);
          return;
        }
        const data = await fetchWeather(selectedCity);
        setWeather(data);
        setError(null);
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response && e.response.data) {
          if (
            e.response.data.error === "City not found." ||
            e.response.status === 400 ||
            e.response.status === 404
          ) {
            setError("Invalid city. Try again.");
          } else if (typeof e.response.data === "string") {
            setError(e.response.data);
          } else if (e.response.data.message) {
            setError(e.response.data.message);
          } else {
            setError("Failed to fetch weather.");
          }
        } 
        else {
          setError("Failed to fetch weather, invalid city.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError("Could not determine city for weather lookup.");
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    console.log("handleSelectSuggestion", suggestion);
    lastSelectedCityRef.current = suggestion.fullLabel;
    setSuggestions([]);
    setCity(suggestion.fullLabel);
    console.log("City state updated to:", suggestion.fullLabel);
    lookupWeather(suggestion);
  };

  return {
    city,
    setCity,
    suggestions,
    handleSelectSuggestion,
    lookupWeather,
    weather,
    error,
    loading,
  };
};
