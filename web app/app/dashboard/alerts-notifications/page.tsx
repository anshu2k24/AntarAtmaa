"use client";

import { useState } from "react";
import { FaSlidersH, FaExclamationCircle } from "react-icons/fa";

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

        {/* Emergency Activation System */}
        <div className="bg-[#1e293b] p-15 rounded-lg shadow-lg text-center flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-red-500">
                  Emergency Activation System:
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Click the button below to activate emergency response protocols
                </p>
                <button className="relative w-48 h-48 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex flex-col items-center justify-center mx-auto text-white">
                  <FaExclamationCircle className="h-16 w-16 mb-2" />
                  <span className="text-2xl font-bold">EMERGENCY</span>
                  <span className="text-lg">SOS</span>
                  <span className="absolute h-full w-full rounded-full border-2 border-blue-400 animate-ping"></span>
                </button>
                <p className="text-xs text-gray-500 mt-4 max-w-sm mx-auto">
                  This will immediately notify all emergency contacts and activate
                  evacuation protocols. Use only in case of actual emergency.
                </p>
              </div>

               {/* Emergency Protocols */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Emergency Protocols</h2>
          <p className="text-sm text-gray-400 mb-4">
            Standard operating procedures for emergencies
          </p>
          <div className="space-y-4">
            <div className="bg-red-900/40 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-400">
                Level 1: Critical Emergency
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                <li>Immediate site evacuation</li>
                <li>Emergency service notification</li>
                <li>Activate SOS alarm systems</li>
              </ul>
            </div>
            <div className="bg-orange-900/40 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-400">
                Level 2: Major Emergency
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                <li>Partial site evacuation</li>
                <li>First aid and rescue teams deployed</li>
                <li>Alert nearby facilities</li>
              </ul>
            </div>
            <div className="bg-yellow-900/40 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-400">
                Level 3: Moderate Incident
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                <li>Monitor situation continuously</li>
                <li>Contain affected areas</li>
                <li>Log incident details for review</li>
              </ul>
            </div>
            <div className="bg-green-900/40 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-400">
                Level 4: Minor Alert
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                <li>Raise awareness among staff</li>
                <li>No evacuation needed</li>
                <li>Continue normal monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
