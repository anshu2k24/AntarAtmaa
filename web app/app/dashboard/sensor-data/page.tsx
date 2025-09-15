'use client';

import { useEffect, useState } from 'react';
import { FaSignal, FaSyncAlt, FaDownload } from 'react-icons/fa';

// IMPORTANT: Replace this with a real user ID after a successful login
const DUMMY_USER_ID = 'your_hardcoded_user_id';

// Define a type for your sensor data
interface SensorData {
  name: string;
  value: string;
  status: 'online' | 'offline' | 'warning';
}

const SensorDataPage = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/dashboard/${DUMMY_USER_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // The backend returns an object with sensorData
        setSensorData(data.sensorData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter sensor data by status
  const onlineSensors = sensorData.filter(s => s.status === 'online');
  const offlineSensors = sensorData.filter(s => s.status === 'offline');
  const warningSensors = sensorData.filter(s => s.status === 'warning');

  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="text-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

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
        {onlineSensors.map((sensor, index) => (
          <div key={index} className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{sensor.name}</h3>
              <span className="text-xs text-green-500 flex items-center space-x-1">
                <FaSignal /><span>online</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">Displacement Monitoring</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-blue-500">{sensor.value}</span>
              <span className="text-sm text-gray-500">▲+0.1</span>
            </div>
          </div>
        ))}
        {warningSensors.map((sensor, index) => (
          <div key={index} className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{sensor.name}</h3>
              <span className="text-xs text-yellow-500 flex items-center space-x-1">
                <FaSignal /><span>warning</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">Frequency Monitoring</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-blue-500">{sensor.value}</span>
              <span className="text-sm text-gray-500">▲+1.2</span>
            </div>
          </div>
        ))}
        {offlineSensors.map((sensor, index) => (
          <div key={index} className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{sensor.name}</h3>
              <span className="text-xs text-red-500 flex items-center space-x-1">
                <FaSignal /><span>offline</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">Moisture Monitoring</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-blue-500">{sensor.value}</span>
              <span className="text-sm text-gray-500">0.0</span>
            </div>
          </div>
        ))}
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