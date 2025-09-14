'use client';

import { FaCalendarAlt, FaDownload, FaFilter } from 'react-icons/fa';

const HistoricalTrendsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Historical Trends Analysis</h1>
          <p className="text-gray-400 mt-1">Long-term patterns and predictive insights for mine safety</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaCalendarAlt />
            <span>1 Year</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaFilter />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaDownload />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400">Slope Stability</h3>
          <span className="text-3xl font-bold text-blue-500">8.2</span>
          <p className="text-sm text-gray-500">▲+3.5% vs last period</p>
        </div>
        {/* ... other metric cards */}
      </div>

      {/* Slope Stability Trends */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Slope Stability Trends</h2>
        <p className="text-sm text-gray-400 mb-4">5-year stability factor analysis with extended monitoring</p>
        <div className="h-64 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Chart Placeholder</span>
        </div>
      </div>
      
      {/* Historical Events */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Historical Events & Lessons Learned</h2>
        <p className="text-gray-400 text-sm">Major incidents and implemented improvements</p>
        <ul className="mt-4 space-y-4">
          {/* Event Item */}
          <li className="bg-[#2a3648] p-4 rounded-lg flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">Major Slide | Magnitude 8.5</p>
              <p className="text-sm text-gray-500 mt-1">Location: Sector A7 | Lessons Learned: Enhanced monitoring implemented</p>
            </div>
            <span className="text-xs text-gray-500">2024-03-15</span>
          </li>
          {/* ... other events */}
        </ul>
      </div>
    </div>
  );
};

export default HistoricalTrendsPage;