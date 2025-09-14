import { FaUserFriends, FaExclamationCircle, FaSignal } from 'react-icons/fa';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Mine Safety Dashboard</h1>
      <p className="text-gray-400">Real-time monitoring and AI-powered risk prediction for optimal mine safety management.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">Overall Risk Level</h3>
          <p className="text-4xl font-bold text-yellow-400">MODERATE</p>
          <span className="text-sm text-gray-500">65%</span>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">Active Alerts</h3>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-red-500">12</span>
            <span className="text-sm text-gray-500">+8%</span>
          </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">Sensor Status</h3>
          <span className="text-4xl font-bold text-green-500">98%</span>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">Personnel Safe</h3>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold text-green-500">247</span>
            <FaUserFriends className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">All Clear</p>
        </div>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <p className="text-gray-400 mb-4">Latest safety notifications and warnings</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#2a3648] p-4 rounded-lg flex items-start space-x-3">
            <span className="h-3 w-3 rounded-full bg-red-500 mt-2"></span>
            <div>
              <p className="font-semibold">Slope instability detected in Sector A7</p>
              <p className="text-xs text-gray-500 mt-1">2 min ago</p>
            </div>
          </div>
          <div className="bg-[#2a3648] p-4 rounded-lg flex items-start space-x-3">
            <span className="h-3 w-3 rounded-full bg-yellow-500 mt-2"></span>
            <div>
              <p className="font-semibold">Unusual vibration patterns in Zone C</p>
              <p className="text-xs text-gray-500 mt-1">15 min ago</p>
            </div>
          </div>
          <div className="bg-[#2a3648] p-4 rounded-lg flex items-start space-x-3">
            <span className="h-3 w-3 rounded-full bg-blue-500 mt-2"></span>
            <div>
              <p className="font-semibold">Weather alert: Heavy rain expected</p>
              <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;