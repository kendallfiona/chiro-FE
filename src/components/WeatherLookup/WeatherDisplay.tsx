import { WeatherData } from "../../hooks/useWeatherLookup";

interface Props {
  weather: WeatherData;
}

const WeatherDisplay = ({ weather }: Props) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-16 w-full max-w-screen-2xl mx-auto">
      {/* Date */}
      <div className="text-center mb-16">
        <p className="text-gray-600 font-medium text-xl">{formatDate()}</p>
      </div>

      {/* Header with city and main weather icon */}
      <div className="flex items-center justify-center mb-20">
        <div className="flex items-center gap-8 bg-white/80 p-8 rounded-xl shadow-sm max-w-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {weather.name}
            </h2>
            <p className="text-gray-600 text-lg">{weather.sys.country}</p>
          </div>
        </div>
      </div>

      {/* Main temperature card */}
      <div className="bg-white/80 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-gray-600 text-base">Current Temperature</p>
              <p className="text-3xl font-semibold text-gray-800">{weather.main.temp}°C</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-base">Feels Like</p>
            <p className="text-3xl font-semibold text-gray-800">{weather.main.feels_like}°C</p>
          </div>
        </div>
      </div>

      {/* Weather metrics grid */}
      <div className="grid grid-cols-2 gap-10">
        {/* Min Temperature */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Min Temperature</p>
              <p className="font-medium text-gray-800 text-lg">{weather.main.temp_min}°C</p>
            </div>
          </div>
        </div>

        {/* Max Temperature */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Max Temperature</p>
              <p className="font-medium text-gray-800 text-lg">{weather.main.temp_max}°C</p>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            {/* Static condition icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Condition</p>
              <p className="font-medium text-gray-800 text-lg capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
        </div>

        {/* Wind */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 14.25V9m0 0L9.75 11.25M13.5 9l3.75 2.25M9.75 14.25V19.5m0 0L7.5 21.75M9.75 19.5l-2.25 2.25M16.5 14.25V19.5m0 0l2.25 2.25M16.5 19.5L14.25 21.75" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Wind</p>
              <p className="font-medium text-gray-800 text-lg">
                {weather.wind.speed} m/s ({weather.wind.deg}°)
                {weather.wind.gust && `, Gusts: ${weather.wind.gust} m/s`}
              </p>
            </div>
          </div>
        </div>

        {/* Sunrise */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Sunrise</p>
              <p className="font-medium text-gray-800 text-lg">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>
        </div>

        {/* Sunset */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Sunset</p>
              <p className="font-medium text-gray-800 text-lg">{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-10 grid grid-cols-2 gap-10">
        {/* Humidity */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Humidity</p>
              <p className="font-medium text-gray-800 text-lg">{weather.main.humidity}%</p>
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-white/80 rounded-lg p-12 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div>
              <p className="text-base text-gray-600">Pressure</p>
              <p className="font-medium text-gray-800 text-lg">{weather.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
