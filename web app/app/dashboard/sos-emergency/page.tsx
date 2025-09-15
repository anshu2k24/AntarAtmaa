"use client";

import { FaExclamationCircle } from "react-icons/fa";

const EmergencyPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            SOS / Emergency Response
          </h1>
          <p className="text-gray-400 mt-1">
            Live emergency activation and response coordination
          </p>
        </div>
        <span className="flex items-center space-x-2 text-green-500">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm">SYSTEM READY</span>
        </span>
      </div>

      {/* Emergency Activation Section */}
      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg text-center">
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

      {/* Contacts and Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Emergency Contacts</h2>
          <p className="text-sm text-gray-400 mb-4">
            Quick access to emergency response teams
          </p>
          <ul className="space-y-4">
            <li className="bg-[#2a3648] p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Emergency Services</p>
                <p className="text-sm text-gray-500">911</p>
              </div>
              <span className="text-green-500 text-sm">Available</span>
            </li>
            <li className="bg-[#2a3648] p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Police Department</p>
                <p className="text-sm text-gray-500">100</p>
              </div>
              <span className="text-green-500 text-sm">Available</span>
            </li>
            <li className="bg-[#2a3648] p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Fire Department</p>
                <p className="text-sm text-gray-500">101</p>
              </div>
              <span className="text-green-500 text-sm">Available</span>
            </li>
            <li className="bg-[#2a3648] p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Medical / Ambulance</p>
                <p className="text-sm text-gray-500">102</p>
              </div>
              <span className="text-green-500 text-sm">Available</span>
            </li>
            <li className="bg-[#2a3648] p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Disaster Response Team</p>
                <p className="text-sm text-gray-500">108</p>
              </div>
              <span className="text-yellow-500 text-sm">On Standby</span>
            </li>
          </ul>
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

export default EmergencyPage;
