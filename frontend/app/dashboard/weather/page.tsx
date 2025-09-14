'use client';

import { FaSun, FaCloud, FaBolt, FaTint, FaWind, FaThermometerHalf, FaSyncAlt } from 'react-icons/fa';

const WeatherPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Weather & Forecasts</h1>
          <p className="text-gray-400 mt-1">Real-time weather monitoring and risk assessment</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
          <FaSyncAlt />
          <span>Refresh</span>
        </button>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">Current Conditions</h2>
          <p className="text-sm text-gray-400">View live weather station</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-blue-500">18.5°C</p>
              <p className="text-lg text-gray-400">Partly Cloudy</p>
            </div>
            <FaCloud className="h-24 w-24 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mt-4">
            <div className="flex items-center space-x-2">
              <FaTint className="h-4 w-4 text-gray-500" />
              <span>Humidity: 87%</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaWind className="h-4 w-4 text-gray-500" />
              <span>Wind: 12.3 km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaThermometerHalf className="h-4 w-4 text-gray-500" />
              <span>Pressure: 1012 mb</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaSyncAlt className="h-4 w-4 text-gray-500" />
              <span>Visibility: 8.1 km</span>
            </div>
          </div>
        </div>
        
        {/* Weather Alerts */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">Weather Alerts & Risk Assessment</h2>
          <p className="text-sm text-gray-400">Impact on mining operations and safety</p>
          <div className="bg-yellow-800/50 p-4 rounded-lg border border-yellow-700 flex items-center justify-between">
            <p className="text-yellow-400 text-sm">Heavy rainfall expected Thursday. Friday increased rockfall risk.</p>
            <span className="text-red-500 text-sm">High</span>
          </div>
          <div className="bg-green-800/50 p-4 rounded-lg border border-green-700 flex items-center justify-between">
            <p className="text-green-400 text-sm">UV levels moderate. Safe for outdoor operations.</p>
            <span className="text-blue-500 text-sm">Low</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mt-6">
            <div className="bg-[#2a3648] p-4 rounded-lg">
              <FaThermometerHalf className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm">Optimal</p>
              <p className="text-xs text-gray-500">Temperature Range</p>
            </div>
            <div className="bg-[#2a3648] p-4 rounded-lg">
              <FaWind className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm">Safe</p>
              <p className="text-xs text-gray-500">Wind Conditions</p>
            </div>
            <div className="bg-[#2a3648] p-4 rounded-lg">
              <FaTint className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-sm">Moderate</p>
              <p className="text-xs text-gray-500">Rain Risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">7-Day Forecast & Risk Analysis</h2>
        <p className="text-gray-400 text-sm">Detailed weather updates with operational impact assessment</p>
        <div className="grid grid-cols-7 gap-4 text-center mt-4">
          {/* Day Card */}
          <div className="bg-[#2a3648] p-4 rounded-lg space-y-2">
            <p className="font-semibold">Today</p>
            <FaCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-lg font-bold">20°</p>
            <p className="text-sm text-gray-400">Cloudy</p>
            <div className="text-xs text-gray-500">
              <p>Rain: 20%</p>
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px]">Low Risk</span>
            </div>
          </div>
          {/* ... Other days can be similar components */}
        </div>
      </div>

      {/* Rainfall & Temperature Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Rainfall Trends</h2>
          <p className="text-gray-400 text-sm">24-hour precipitation monitoring</p>
          <div className="h-48 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Temperature & Humidity</h2>
          <p className="text-gray-400 text-sm">Environmental parameter correlation</p>
          <div className="h-48 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;