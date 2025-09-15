"use client";

import { useState } from "react";
import { FaCalendarAlt, FaDownload } from "react-icons/fa";

interface Metric {
  slope: number;
  stabilityChange: number;
  vibration: number;
  rainfall: number;
}

interface Event {
  title: string;
  location: string;
  lessons: string;
  date: string;
}

const HistoricalTrendsPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Expanded metrics data
  const metricsData: Record<number, Metric> = {
    1: { slope: 8.2, stabilityChange: 3.5, vibration: 12, rainfall: 80 },
    2: { slope: 7.9, stabilityChange: 2.1, vibration: 15, rainfall: 60 },
    3: { slope: 8.5, stabilityChange: 4.0, vibration: 10, rainfall: 70 },
    4: { slope: 8.0, stabilityChange: 2.5, vibration: 14, rainfall: 65 },
    5: { slope: 8.3, stabilityChange: 3.0, vibration: 11, rainfall: 75 },
  };

  // Expanded historical events
  const eventsData: Record<number, Event[]> = {
    1: [
      {
        title: "Minor Slide | Magnitude 7.0",
        location: "Sector B3",
        lessons: "Increased sensor checks",
        date: "2024-05-10",
      },
      {
        title: "Equipment Malfunction",
        location: "Sector C1",
        lessons: "Replaced faulty sensors",
        date: "2024-06-18",
      },
    ],
    2: [
      {
        title: "Moderate Slide | Magnitude 7.8",
        location: "Sector C5",
        lessons: "Reinforced slope",
        date: "2023-11-22",
      },
      {
        title: "Heavy Rainfall Impact",
        location: "Sector D2",
        lessons: "Enhanced drainage",
        date: "2023-09-10",
      },
    ],
    3: [
      {
        title: "Major Slide | Magnitude 8.5",
        location: "Sector A7",
        lessons: "Enhanced monitoring implemented",
        date: "2022-03-15",
      },
      {
        title: "Vibration Spike",
        location: "Sector B3",
        lessons: "Installed vibration dampers",
        date: "2022-06-05",
      },
    ],
    4: [
      {
        title: "Minor Slide | Magnitude 7.2",
        location: "Sector D2",
        lessons: "Regular inspections improved",
        date: "2021-08-30",
      },
      {
        title: "Rainfall Alert",
        location: "Sector E1",
        lessons: "Automated alert system added",
        date: "2021-12-12",
      },
    ],
    5: [
      {
        title: "Moderate Slide | Magnitude 7.9",
        location: "Sector E4",
        lessons: "Better drainage systems added",
        date: "2020-12-05",
      },
      {
        title: "Equipment Upgrade",
        location: "Sector A2",
        lessons: "Installed modern sensors",
        date: "2020-03-19",
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Historical Trends Analysis
          </h1>
          <p className="text-gray-400 mt-1">
            Long-term patterns and predictive insights for mine safety
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors"
            >
              <FaCalendarAlt />
              <span>
                {selectedYear} Year{selectedYear > 1 ? "s" : ""}
              </span>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-[#1e293b] border border-gray-600 rounded-lg shadow-lg z-50">
                {[1, 2, 3, 4, 5].map((year) => (
                  <li
                    key={year}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-200"
                    onClick={() => {
                      setSelectedYear(year);
                      setDropdownOpen(false);
                    }}
                  >
                    {year} Year{year > 1 ? "s" : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
          <span className="text-3xl font-bold text-blue-500">
            {metricsData[selectedYear]?.slope}
          </span>
          <p className="text-sm text-gray-500">
            ▲+{metricsData[selectedYear]?.stabilityChange}% vs last period
          </p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400">Vibration Level</h3>
          <span className="text-3xl font-bold text-yellow-400">
            {metricsData[selectedYear]?.vibration} Hz
          </span>
          <p className="text-sm text-gray-500">Measured at critical points</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400">Rainfall</h3>
          <span className="text-3xl font-bold text-green-500">
            {metricsData[selectedYear]?.rainfall} mm
          </span>
          <p className="text-sm text-gray-500">Cumulative rainfall over year</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400">Safety Index</h3>
          <span className="text-3xl font-bold text-purple-500">
            {(
              metricsData[selectedYear]?.slope +
              metricsData[selectedYear]?.vibration / 10
            ).toFixed(1)}
          </span>
          <p className="text-sm text-gray-500">
            Calculated index for safety assessment
          </p>
        </div>
      </div>

      {/* Slope Stability Trends */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Slope Stability Trends</h2>
        <p className="text-sm text-gray-400 mb-4">
          {selectedYear}-year stability factor analysis with extended monitoring
        </p>
        <div className="h-64 mt-4 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Chart Placeholder</span>
        </div>
      </div>

      {/* Historical Events */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Historical Events & Lessons Learned
        </h2>
        <p className="text-gray-400 text-sm">
          Major incidents and implemented improvements
        </p>
        <ul className="mt-4 space-y-4">
          {eventsData[selectedYear]?.map((event, idx) => (
            <li
              key={idx}
              className="bg-[#2a3648] p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-white">{event.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Location: {event.location} | Lessons Learned: {event.lessons}
                </p>
              </div>
              <span className="text-xs text-gray-500">{event.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoricalTrendsPage;
