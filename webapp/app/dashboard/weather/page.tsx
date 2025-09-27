"use client";

import { useEffect, useState, useCallback } from "react";
import { FaTint, FaWind, FaThermometerHalf, FaCloudSun, FaSyncAlt } from "react-icons/fa";

const WeatherPage = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const LAT = 15.0706;
  const LON = 76.6173;

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

     
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.reason || "Failed to fetch weather");
      }

      setWeather(data.current_weather);
      setForecast(
        data.hourly?.time?.map((t: string, i: number) => ({
          time: t,
          temp: data.hourly.temperature_2m[i],
          humidity: data.hourly.relative_humidity_2m[i],
          pressure: data.hourly.pressure_msl[i],
          wind: data.hourly.wind_speed_10m[i],
        })) || []
      );
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="space-y-8 text-gray-800 bg-[#f2f0ea] p-4 md:p-8 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
        <button
          onClick={fetchWeather}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <FaSyncAlt />
          <span>Refresh</span>
        </button>
      </div>

     
      <div className="relative p-8 rounded-xl shadow-2xl overflow-hidden bg-gradient-to-r from-gray-100 via-white to-gray-100 border border-gray-200">
        <FaCloudSun className="absolute top-4 left-4 text-gray-200 text-[80px] rotate-12" />
        <FaCloudSun className="absolute bottom-0 right-0 text-gray-100 text-[100px] -rotate-6" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
        
          <div className="flex items-center space-x-6">
            <FaCloudSun className="text-orange-500 text-7xl" />
            <div>
              {loading ? (
                <p className="text-gray-500 text-lg">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : weather ? (
                <>
                  <p className="text-6xl font-bold text-orange-500">
                    {Math.round(weather.temperature)}°C
                  </p>
                  <p className="text-xl capitalize text-gray-700">
                    Winds {weather.windspeed} km/h
                  </p>
                  <p className="mt-2 text-gray-500 font-medium text-sm">
                    Donimalai Mines
                  </p>
                </>
              ) : (
                <p className="text-red-500">No data available</p>
              )}
            </div>
          </div>

          
          {!loading && weather && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <FaTint className="mx-auto mb-2 text-gray-600" />
                <p className="text-lg font-semibold text-gray-700">
                  {forecast[0]?.humidity ?? "N/A"}%
                </p>
                <p className="text-sm text-gray-500">Humidity</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <FaWind className="mx-auto mb-2 text-gray-600" />
                <p className="text-lg font-semibold text-gray-700">
                  {weather.windspeed ?? "N/A"} km/h
                </p>
                <p className="text-sm text-gray-500">Wind</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <FaThermometerHalf className="mx-auto mb-2 text-gray-600" />
                <p className="text-lg font-semibold text-gray-700">
                  {forecast[0]?.pressure ?? "N/A"} hPa
                </p>
                <p className="text-sm text-gray-500">Pressure</p>
              </div>
            </div>
          )}
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {forecast.length > 0 ? (
            forecast.slice(0, 12).map((f, idx) => {
              const date = new Date(f.time);
              const hour = date.toLocaleTimeString("en-US", {
                hour: "numeric",
              });

              return (
                <div
                  key={idx}
                  className="bg-gray-100 p-4 rounded-lg space-y-2 border border-gray-200"
                >
                  <p className="font-semibold text-sm">{hour}</p>
                  <FaCloudSun className="mx-auto text-orange-500 text-3xl" />
                  <p className="text-lg font-bold">{Math.round(f.temp)}°C</p>
                  <p className="text-sm text-gray-500">{f.humidity}% Humidity</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No forecast available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
