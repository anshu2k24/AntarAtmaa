'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Interfaces for data types (same as in SignupPage.tsx)
interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface IOrganizationData {
  name: string;
  email: string;
  contact: string;
  registeredAddress: IAddress;
  corporationIdentificationNumber: string;
  registrationType: string;
}

interface ICoordinates {
  latitude: string;
  longitude: string;
}

interface ISiteData {
  name: string;
  location: string;
  coordinates: ICoordinates;
  businessProofLicense: string;
}

interface IEmployeeData {
  name: string;
  email: string;
  designation: string;
  password?: string;
}

// Combined user data interface for the payload
interface IUserData {
  organizationData: IOrganizationData;
  siteData: ISiteData;
  employeeData: IEmployeeData;
}

const DashboardDetailsPage = () => {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const dataString = searchParams.get('data');
    if (dataString) {
      try {
        const parsedData: IUserData = JSON.parse(decodeURIComponent(dataString));
        setUserData(parsedData);
      } catch (e) {
        console.error("Failed to parse user data from URL:", e);
        setError("Invalid data. Please try signing up again.");
      }
    } else {
      setError("No user data found.");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="bg-[#1e293b] text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-[#1e293b] text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading user data...</p>
      </div>
    );
  }

  const { organizationData, siteData, employeeData } = userData;

  return (
    <div className="bg-[#1e293b] text-white min-h-screen flex flex-col items-center justify-center p-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">User Details</h1>
        <p className="text-gray-400 mt-2">
          Review the information submitted during signup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Organization Details Card */}
        <div className="bg-[#2a3648] p-8 md:p-12 rounded-xl shadow-lg w-full border border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-center">
            Organization Info
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Name:</span> {organizationData?.name}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Email:</span> {organizationData?.email}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Contact:</span> {organizationData?.contact}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Street:</span> {organizationData?.registeredAddress?.street}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">City:</span> {organizationData?.registeredAddress?.city}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">State:</span> {organizationData?.registeredAddress?.state}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">ZIP:</span> {organizationData?.registeredAddress?.zip}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Country:</span> {organizationData?.registeredAddress?.country}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">CIN:</span> {organizationData?.corporationIdentificationNumber}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Reg. Type:</span> {organizationData?.registrationType}
            </p>
          </div>
        </div>

        {/* Site Details Card */}
        <div className="bg-[#2a3648] p-8 md:p-12 rounded-xl shadow-lg w-full border border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-center">Site Info</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Name:</span> {siteData?.name}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Location:</span> {siteData?.location}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Latitude:</span> {siteData?.coordinates?.latitude}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Longitude:</span> {siteData?.coordinates?.longitude}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">License:</span>{' '}
              <a href={siteData?.businessProofLicense} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                View License
              </a>
            </p>
          </div>
        </div>

        {/* Employee Details Card */}
        <div className="bg-[#2a3648] p-8 md:p-12 rounded-xl shadow-lg w-full border border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-center">
            Employee Info
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Name:</span> {employeeData?.name}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Email:</span> {employeeData?.email}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Designation:</span> {employeeData?.designation}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Password:</span> *********
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetailsPage;