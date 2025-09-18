'use client';

import { useEffect, useState, useCallback } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface SensorData {
  _id: string;
  timestamp: string;
  temperature: number;
  rainfall: number;
  soil_moisture: number;
  vib_rms: number;
  porepressure: number;
  displacement: number;
}

const SensorDataPage = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const siteId = localStorage.getItem('siteId');
      if (!siteId) {
        throw new Error('No site ID found. Please log in again.');
      }

      const response = await fetch(`/api/iot?siteId=${siteId}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to fetch sensor data');
      }

      const result = await response.json();
      setSensorData(result.data || []);
    } catch (err: any) {
      console.error('Error fetching sensor data:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); 
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading sensor data...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!sensorData.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No sensor data available.
      </div>
    );
  }

  
  const latest = sensorData[0];

  return (
    <div className="space-y-10 bg-[#f2f0ea] p-6 min-h-screen text-gray-800">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sensor Dashboard</h1>
          <p className="text-gray-600 mt-1">Site ID: {localStorage.getItem('siteId')}</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <FaSyncAlt />
          <span>Refresh</span>
        </button>
      </div>

      
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Readings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SensorCard label="Temperature" value={`${latest.temperature} °C`} />
          <SensorCard label="Rainfall" value={`${latest.rainfall} mm`} />
          <SensorCard label="Soil Moisture" value={`${latest.soil_moisture} %`} />
          <SensorCard label="Vibration (RMS)" value={`${latest.vib_rms}`} />
          <SensorCard label="Pore Pressure" value={`${latest.porepressure} kPa`} />
          <SensorCard label="Displacement" value={`${latest.displacement} m`} />
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Last updated: {new Date(latest.timestamp).toLocaleString()}
        </p>
      </div>

      
      <div>
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3">Temp (°C)</th>
                <th className="px-4 py-3">Rainfall (mm)</th>
                <th className="px-4 py-3">Soil Moisture (%)</th>
                <th className="px-4 py-3">Vibration RMS</th>
                <th className="px-4 py-3">Pore Pressure (kPa)</th>
                <th className="px-4 py-3">Displacement (m)</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((data) => (
                <tr key={data._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{new Date(data.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{data.temperature}</td>
                  <td className="px-4 py-2">{data.rainfall}</td>
                  <td className="px-4 py-2">{data.soil_moisture}</td>
                  <td className="px-4 py-2">{data.vib_rms}</td>
                  <td className="px-4 py-2">{data.porepressure}</td>
                  <td className="px-4 py-2">{data.displacement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const SensorCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg space-y-2 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    <p className="text-2xl font-bold text-orange-500">{value}</p>
  </div>
);

export default SensorDataPage;
