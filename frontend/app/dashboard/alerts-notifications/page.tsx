'use client';

import { FaSlidersH, FaFilter } from 'react-icons/fa';

const AlertsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Alerts & Notifications</h1>
          <p className="text-gray-400 mt-1">Real-time safety alerts and system notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaSlidersH />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
            <FaFilter />
            <span>Settings</span>
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
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <p className="text-sm text-gray-400 mb-6">Configure alert preferences and channels</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Critical Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Weather Warnings</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Equipment Status</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Maintenance Reminders</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">SMS Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Alert Thresholds</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Displacement Alert (mm)</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                <span className="text-gray-400 text-sm">25</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Pressure Alert (kPa)</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                <span className="text-gray-400 text-sm">150</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Vibration Alert (Hz)</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                <span className="text-gray-400 text-sm">18</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Rainfall Alert (mm)</label>
              <div className="flex items-center space-x-2 mt-1">
                <input type="range" className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                <span className="text-gray-400 text-sm">25</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <h3 className="font-semibold text-white">Escalation Matrix</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical Alert</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Warning Alert</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Info Alert</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Timeline Section */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Alert Timeline</h2>
        <p className="text-gray-400 text-sm">Chronological view of all system alerts</p>
        <div className="mt-4 space-y-4">
          <div className="bg-[#2a3648] p-4 rounded-lg border-l-4 border-red-500 flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">Slope Instability Detected</p>
              <p className="text-sm text-gray-400 mt-1">Significant movement detected in Sector A7. Immediate evacuation recommended.</p>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="bg-[#2a3648] p-4 rounded-lg border-l-4 border-yellow-500 flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">Weather Alert</p>
              <p className="text-sm text-gray-400 mt-1">Heavy rainfall predicted for next 48 hours. Monitor all zones closely.</p>
            </div>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
          <div className="bg-[#2a3648] p-4 rounded-lg border-l-4 border-green-500 flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">Sensor Calibration</p>
              <p className="text-sm text-gray-400 mt-1">Routine calibration completed for all displacement sensors in Zone C.</p>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="bg-[#2a3648] p-4 rounded-lg border-l-4 border-red-500 flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">Vibration Threshold Exceeded</p>
              <p className="text-sm text-gray-400 mt-1">Sudden spike in vibration patterns detected in Zone B3. Investigation required.</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;