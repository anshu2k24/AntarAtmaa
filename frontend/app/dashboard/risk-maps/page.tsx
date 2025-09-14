'use client';

import { FaUpload, FaDownload } from 'react-icons/fa';

// Placeholder data for Geo-TIFF images, in a real app this would come from an API
const geoTiffData = [
  { id: 1, name: 'Mine A_1.tif', location: '45.7112° N, 74.2097° W', status: 'Critical' },
  { id: 2, name: 'Mine B_2.tif', location: '46.1234° N, 75.5678° W', status: 'Warning' },
  // { id: 3, name: 'Mine C_3.tif', location: '47.8765° N, 76.1234° W', status: 'Safe' },
  // Add more Geo-TIFF objects here to see the layout expand
];

const RiskMapsPage = () => {
  const hasGeoTiff = geoTiffData.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Interactive Risk Maps</h1>
          <p className="text-gray-400 mt-1">Uploaded Geo-TIFF images with AI-powered risk assessment</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-colors">
          <FaDownload />
          <span>Export</span>
        </button>
      </div>

      {/* Geo-TIFF Map Section */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
        {hasGeoTiff ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {geoTiffData.map((map) => (
              <div key={map.id} className="bg-[#2a3648] rounded-lg p-6 flex flex-col items-center justify-center relative">
                <div className="bg-gray-800 h-64 w-full rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  {/* Placeholder for the map image/component */}
                  <span className="text-sm">Map of {map.name}</span>
                </div>
                <div className="w-full text-center">
                  <h3 className="text-lg font-semibold text-white">{map.name}</h3>
                  <p className="text-sm text-gray-400">{map.location}</p>
                </div>
                <span className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full ${
                  map.status === 'Critical' ? 'bg-red-500' :
                  map.status === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {map.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <FaUpload className="h-16 w-16 text-gray-600 mb-4" />
            <p className="text-lg font-semibold">No Geo-TIFF images uploaded</p>
            <p className="mt-2 text-sm max-w-sm">Upload images during signup to see risk maps here</p>
          </div>
        )}
      </div>

      {/* Risk Zones and Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">Risk Zones Overview</h2>
          <p className="text-gray-400">Current status of monitored areas</p>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-[#2a3648] p-4 rounded-lg">
              <div>
                <p className="font-semibold">Sector A7</p>
                <p className="text-xs text-gray-500">45.71° N, 74.20° W</p>
              </div>
              <span className="text-red-500">Critical</span>
            </li>
            <li className="flex items-center justify-between bg-[#2a3648] p-4 rounded-lg">
              <div>
                <p className="font-semibold">Zone B3</p>
                <p className="text-xs text-gray-500">42.12° N, 12.89° E</p>
              </div>
              <span className="text-yellow-500">Warning</span>
            </li>
            <li className="flex items-center justify-between bg-[#2a3648] p-4 rounded-lg">
              <div>
                <p className="font-semibold">Area C1</p>
                <p className="text-xs text-gray-500">38.45° N, 1.09° W</p>
              </div>
              <span className="text-green-500">Safe</span>
            </li>
            <li className="flex items-center justify-between bg-[#2a3648] p-4 rounded-lg">
              <div>
                <p className="font-semibold">Sector D9</p>
                <p className="text-xs text-gray-500">30.29° S, 58.15° W</p>
              </div>
              <span className="text-blue-500">Monitor</span>
            </li>
          </ul>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Geological Analysis</h2>
          <p className="text-gray-400">AI-powered slope stability assessment</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold">Slope Stability Index:</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">75%: Moderate Stability</p>
            </div>
            <div className="flex items-center justify-around text-center mt-6">
              <div>
                <span className="text-3xl font-bold">8.2</span>
                <p className="text-sm text-gray-500">Safety Factor</p>
              </div>
              <div>
                <span className="text-3xl font-bold">3.7°</span>
                <p className="text-sm text-gray-500">Slope Angle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMapsPage;