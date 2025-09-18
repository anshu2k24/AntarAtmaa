"use client";

import React, { useState, useEffect } from "react";
import { FaBuilding, FaMapMarkerAlt, FaUser } from "react-icons/fa";

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
}

interface IUserData {
  organizationData: IOrganizationData;
  siteData: ISiteData;
  employeeData: IEmployeeData;
}

const DashboardDetailsPage = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationId = localStorage.getItem("organizationId");
        const employeeId = localStorage.getItem("employeeId");
        const siteId = localStorage.getItem("siteId");

        if (!organizationId || !employeeId || !siteId) {
          setError("Missing required IDs in localStorage.");
          return;
        }

        const res = await fetch(
          `/api/organisation?id=${organizationId}&employeeId=${employeeId}&siteId=${siteId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="bg-[#f2f0ea] text-gray-800 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-[#f2f0ea] text-gray-800 min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading user data...</p>
      </div>
    );
  }

  const { organizationData, siteData, employeeData } = userData;

  return (
    <div className="bg-[#f2f0ea] text-gray-800 min-h-screen p-6 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#373434] drop-shadow-sm">User Details</h1>
        <p className="text-gray-600 mt-2">Information fetched from the database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
       
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
            <FaBuilding className="text-3xl text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Organization Info</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p><b>Name:</b> {organizationData.name}</p>
            <p><b>Email:</b> {organizationData.email}</p>
            <p><b>Contact:</b> {organizationData.contact}</p>
            <p><b>Street:</b> {organizationData.registeredAddress.street}</p>
            <p><b>City:</b> {organizationData.registeredAddress.city}</p>
            <p><b>State:</b> {organizationData.registeredAddress.state}</p>
            <p><b>ZIP:</b> {organizationData.registeredAddress.zip}</p>
            <p><b>Country:</b> {organizationData.registeredAddress.country}</p>
            <p><b>CIN:</b> {organizationData.corporationIdentificationNumber}</p>
            <p><b>Reg. Type:</b> {organizationData.registrationType}</p>
          </div>
        </div>

      
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
            <FaMapMarkerAlt className="text-3xl text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Site Info</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p><b>Name:</b> {siteData.name}</p>
            <p><b>Location:</b> {siteData.location}</p>
            <p><b>Latitude:</b> {siteData.coordinates.latitude}</p>
            <p><b>Longitude:</b> {siteData.coordinates.longitude}</p>
            <p>
              <b>License:</b>{" "}
              <a
                href={siteData.businessProofLicense}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View License
              </a>
            </p>
          </div>
        </div>

      
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
            <FaUser className="text-3xl text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Employee Info</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p><b>Name:</b> {employeeData.name}</p>
            <p><b>Email:</b> {employeeData.email}</p>
            <p><b>Designation:</b> {employeeData.designation}</p>
            <p><b>Password:</b> *********</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetailsPage;
