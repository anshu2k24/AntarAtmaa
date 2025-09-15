"use client";

import { useEffect, useState } from "react";
import { FaTint, FaWind, FaThermometerHalf, FaCloudSun } from "react-icons/fa";

const WeatherPage = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  const CITY = "Bangalore";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        // Current Weather
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const currentData = await res.json();

        // Forecast (5 days / 3-hour intervals)
        const res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await res2.json();

        setWeather(currentData);
        setForecast(forecastData.list || []);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="space-y-8 text-white p-4 md:p-8">
      {/* Live Weather Card */}
      <div className="relative p-8 rounded-xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#1f2a40] via-[#283149] to-[#1b2540]">
        {/* Decorative Background Icons */}
        <FaCloudSun className="absolute top-4 left-4 text-white/10 text-[80px] rotate-12" />
        <FaCloudSun className="absolute bottom-0 right-0 text-white/5 text-[100px] -rotate-6" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          {/* Main Weather Info */}
          <div className="flex items-center space-x-6">
            <img
              src={`https://openweathermap.org/img/wn/${
                weather?.weather?.[0]?.icon || "01d"
              }@4x.png`}
              alt="weather icon"
              className="w-32 h-32"
            />
            <div>
              {loading ? (
                <p className="text-gray-400 text-lg">Loading...</p>
              ) : weather ? (
                <>
                  <p className="text-6xl font-bold text-blue-300">
                    {Math.round(weather.main.temp)}°C
                  </p>
                  <p className="text-xl capitalize text-gray-200">
                    {weather.weather[0].description}
                  </p>
                  <p className="mt-2 text-gray-400 font-medium text-sm">
                    {CITY}, {weather.sys?.country}
                  </p>
                </>
              ) : (
                <p className="text-red-400">No data available</p>
              )}
            </div>
          </div>

          {/* Weather Details */}
          {!loading && weather && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <FaTint className="mx-auto mb-2 text-white/80" />
                <p className="text-lg font-semibold text-gray-200">
                  {weather.main.humidity}%
                </p>
                <p className="text-sm text-gray-400">Humidity</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <FaWind className="mx-auto mb-2 text-white/80" />
                <p className="text-lg font-semibold text-gray-200">
                  {weather.wind.speed} m/s
                </p>
                <p className="text-sm text-gray-400">Wind</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <FaThermometerHalf className="mx-auto mb-2 text-white/80" />
                <p className="text-lg font-semibold text-gray-200">
                  {weather.main.pressure} hPa
                </p>
                <p className="text-sm text-gray-400">Pressure</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          {forecast.length > 0 ? (
            forecast.map((f, idx) => {
              const date = new Date(f.dt * 1000);
              const day = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const time = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });

              return (
                <div
                  key={idx}
                  className="bg-[#2a3648] p-4 rounded-lg space-y-2"
                >
                  <p className="font-semibold text-sm">{day}</p>
                  <p className="text-xs text-gray-400">{time}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                    alt="icon"
                    className="mx-auto h-12 w-12"
                  />
                  <p className="text-lg font-bold">
                    {Math.round(f.main.temp)}°C
                  </p>
                  <p className="text-sm text-gray-400 capitalize">
                    {f.weather[0].description}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No forecast available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
