"use client";

import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";

const AlertsPage = () => {
  // Alert Thresholds State
  const [thresholds, setThresholds] = useState({
    displacement: 25,
    pressure: 150,
    vibration: 18,
    rainfall: 25,
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    info: false,
    email: true,
    sms: false,
  });

  const handleSliderChange = (key: keyof typeof thresholds, value: number) => {
    setThresholds((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Alerts & Notifications
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time safety alerts and system notifications
          </p>
        </div>
        <div className="flex items-center">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaSlidersH />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <span className="text-4xl font-bold text-red-500">2</span>
          <p className="text-gray-400 mt-1">Critical</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <span className="text-4xl font-bold text-yellow-500">2</span>
          <p className="text-gray-400 mt-1">Warning</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <span className="text-4xl font-bold text-green-500">1</span>
          <p className="text-gray-400 mt-1">Resolved</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <span className="text-4xl font-bold text-gray-400">15</span>
          <p className="text-gray-400 mt-1">Total Today</p>
        </div>
      </div>

      {/* Notification Settings & Alert Thresholds Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <p className="text-sm text-gray-400 mb-6">
            Configure alert preferences and channels
          </p>
          <div className="space-y-4">
            {[
              { label: "Critical Alerts", key: "critical", color: "red-600" },
              { label: "Warning Alerts", key: "warning", color: "yellow-600" },
              { label: "Info Alerts", key: "info", color: "blue-600" },
              { label: "Email Notifications", key: "email", color: "blue-600" },
              { label: "SMS Notifications", key: "sms", color: "blue-600" },
            ].map((item, idx) => {
              const bgColor =
                item.color === "red-600"
                  ? "peer-checked:bg-red-600"
                  : item.color === "yellow-600"
                  ? "peer-checked:bg-yellow-600"
                  : "peer-checked:bg-blue-600";
              return (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-white">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onChange={() =>
                        handleNotificationChange(
                          item.key as keyof typeof notifications
                        )
                      }
                    />
                    <div
                      className={`w-11 h-6 bg-gray-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${bgColor} peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Alert Thresholds</h2>
          <div className="space-y-4">
            {[
              {
                label: "Displacement Alert (mm)",
                key: "displacement",
                min: 0,
                max: 100,
              },
              {
                label: "Pressure Alert (kPa)",
                key: "pressure",
                min: 0,
                max: 300,
              },
              {
                label: "Vibration Alert (Hz)",
                key: "vibration",
                min: 0,
                max: 50,
              },
              {
                label: "Rainfall Alert (mm)",
                key: "rainfall",
                min: 0,
                max: 200,
              },
            ].map((item, idx) => (
              <div key={idx}>
                <label className="text-sm text-gray-400">{item.label}</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="range"
                    min={item.min}
                    max={item.max}
                    value={thresholds[item.key as keyof typeof thresholds]}
                    onChange={(e) =>
                      handleSliderChange(
                        item.key as keyof typeof thresholds,
                        Number(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-gray-400 text-sm">
                    {thresholds[item.key as keyof typeof thresholds]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Timeline Section */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Alert Timeline</h2>
        <p className="text-gray-400 text-sm">
          Chronological view of all system alerts
        </p>
        <div className="mt-4 space-y-4">
          {[
            {
              title: "Slope Instability Detected",
              desc: "Significant movement detected in Sector A7. Immediate evacuation recommended.",
              time: "2 minutes ago",
              color: "red-500",
            },
            {
              title: "Weather Alert",
              desc: "Heavy rainfall predicted for next 48 hours. Monitor all zones closely.",
              time: "15 minutes ago",
              color: "yellow-500",
            },
            {
              title: "Sensor Calibration",
              desc: "Routine calibration completed for all displacement sensors in Zone C.",
              time: "1 hour ago",
              color: "green-500",
            },
            {
              title: "Vibration Threshold Exceeded",
              desc: "Sudden spike in vibration patterns detected in Zone B3. Investigation required.",
              time: "2 hours ago",
              color: "red-500",
            },
          ].map((alert, idx) => (
            <div
              key={idx}
              className={`bg-[#2a3648] p-4 rounded-lg border-l-4 border-${alert.color} flex justify-between items-start`}
            >
              <div>
                <p className="font-semibold text-white">{alert.title}</p>
                <p className="text-sm text-gray-400 mt-1">{alert.desc}</p>
              </div>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
