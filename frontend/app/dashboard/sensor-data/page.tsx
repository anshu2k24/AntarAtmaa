'use client';

import { FaSignal, FaSyncAlt, FaDownload } from 'react-icons/fa';

const SensorDataPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Real-time Sensor Data</h1>
          <p className="text-gray-400 mt-1">Live monitoring of geological and environmental parameters</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaSyncAlt />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaDownload />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Sensor Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Displacement Sensor */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Displacement Sensor A7-01</h3>
            <span className="text-xs text-green-500 flex items-center space-x-1">
              <FaSignal /><span>online</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Displacement Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">2.3mm</span>
            <span className="text-sm text-gray-500">▲+0.1</span>
          </div>
        </div>
        
        {/* Card 2: Pressure Monitor */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pressure Monitor B3-05</h3>
            <span className="text-xs text-green-500 flex items-center space-x-1">
              <FaSignal /><span>online</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Pressure Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">145kPa</span>
            <span className="text-sm text-gray-500">▼-1.2</span>
          </div>
        </div>
        
        {/* Card 3: Vibration Detector */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vibration Detector C5-12</h3>
            <span className="text-xs text-yellow-500 flex items-center space-x-1">
              <FaSignal /><span>warning</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Frequency Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">8.7Hz</span>
            <span className="text-sm text-gray-500">▲+1.2</span>
          </div>
        </div>

        {/* Card 4: Rainfall Sensor */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Rainfall Sensor D5-08</h3>
            <span className="text-xs text-green-500 flex items-center space-x-1">
              <FaSignal /><span>online</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Precipitation Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">12.4mm</span>
            <span className="text-sm text-gray-500">▲+2.5</span>
          </div>
        </div>

        {/* Card 5: Moisture Monitor */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Moisture Monitor A7-15</h3>
            <span className="text-xs text-red-500 flex items-center space-x-1">
              <FaSignal /><span>offline</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Humidity Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">32%</span>
            <span className="text-sm text-gray-500">0.0</span>
          </div>
        </div>

        {/* Card 6: Temperature Probe */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Temperature Probe B3-22</h3>
            <span className="text-xs text-green-500 flex items-center space-x-1">
              <FaSignal /><span>online</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Temperature Monitoring</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-blue-500">18.5°C</span>
            <span className="text-sm text-gray-500">▲+0.3</span>
          </div>
        </div>
      </div>

      {/* Trend Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Displacement Trends</h2>
          <p className="text-gray-400 text-sm">24-hour displacement monitoring</p>
          <div className="h-64 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
            {/* Chart Placeholder */}
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Pressure & Vibration</h2>
          <p className="text-gray-400 text-sm">Multi-parameter correlation analysis</p>
          <div className="h-64 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
            {/* Chart Placeholder */}
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDataPage;