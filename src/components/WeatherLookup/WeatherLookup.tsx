import CityInput from "./CityInput";
import SuggestionsDropdown from "./SuggestionsDropdown";
import WeatherDisplay from "./WeatherDisplay";
import { useWeatherLookup } from "../../hooks/useWeatherLookup";
import BeatLoader from "react-spinners/BeatLoader";

const WeatherLookup = () => {
  const {
    city,
    setCity,
    suggestions,
    handleSelectSuggestion,
    lookupWeather,
    weather,
    error,
    loading,
  } = useWeatherLookup();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded relative space-y-4">
      <h1 className="text-xl font-semibold">Weather Lookup</h1>

      <div className="relative">
        <CityInput city={city} setCity={setCity} onLookup={() => lookupWeather(city)} />

        <SuggestionsDropdown suggestions={suggestions} onSelect={handleSelectSuggestion} />
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <BeatLoader color="#3b82f6" size={12} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default WeatherLookup;
