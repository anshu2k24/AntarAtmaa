"use client";

import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Initial state objects
const defaultOrg = {
  name: "",
  email: "",
  contact: "",
  registeredAddress: {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  corporationIdentificationNumber: "",
  registrationType: "",
};
const defaultSite = {
  name: "",
  location: "",
  coordinates: {
    latitude: "",
    longitude: "",
  },
  businessProofLicense: "",
};
const defaultEmp = {
  name: "",
  email: "",
  designation: "",
  password: "",
};

export default function SignupPage() {
  const [organizationData, setOrganizationData] = useState(defaultOrg);
  const [siteData, setSiteData] = useState(defaultSite);
  const [employeeData, setEmployeeData] = useState(defaultEmp);
  const router = useRouter();

  // Organization change
  const handleOrganizationChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zip", "country"].includes(name)) {
      setOrganizationData((prev) => ({
        ...prev,
        registeredAddress: { ...prev.registeredAddress, [name]: value },
      }));
    } else {
      setOrganizationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Site change
  const handleSiteChange = (e) => {
    const { name, value } = e.target;
    if (["latitude", "longitude"].includes(name)) {
      setSiteData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setSiteData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Employee change
  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        organizationData,
        siteData: {
          name: siteData.name,
          location: siteData.location,
          coordinates: {
            latitude: Number(siteData.coordinates.latitude),
            longitude: Number(siteData.coordinates.longitude),
          },
          businessProofLicense: siteData.businessProofLicense,
        },
        employeeData,
      };

      console.log("Payload being sent:", payload);

      const res = await fetch("http://localhost:3000/api/organisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create account:", error);
    }
  };

  return (
    <form
      onSubmit={handleCreateAccount}
      autoComplete="off"
      className="bg-[#f9f5f0] text-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-[#4a5a3c] mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Signup Portal</h1>
        <p className="text-[#6b5c40] mt-2">
          Fill in details for Organization, Site & Employee
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Organization form */}
        <div className="bg-[#f3e8d0]/90 p-8 md:p-12 rounded-xl shadow-lg w-full border border-[#e6d3a3]">
          <h2 className="text-xl font-bold mb-6 text-center text-[#4a5a3c]">
            Organization Info
          </h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Organisation Name"
              value={organizationData.name}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={organizationData.email}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="contact"
              placeholder="Contact"
              value={organizationData.contact}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="street"
              placeholder="Street"
              value={organizationData.registeredAddress.street}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="city"
              placeholder="City"
              value={organizationData.registeredAddress.city}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="state"
              placeholder="State"
              value={organizationData.registeredAddress.state}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={organizationData.registeredAddress.zip}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="country"
              placeholder="Country"
              value={organizationData.registeredAddress.country}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="corporationIdentificationNumber"
              placeholder="CIN Number"
              value={organizationData.corporationIdentificationNumber}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="registrationType"
              placeholder="Registration Type"
              value={organizationData.registrationType}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
          </div>
        </div>

        {/* Site form */}
        <div className="bg-[#f3e8d0]/90 p-8 md:p-12 rounded-xl shadow-lg w-full border border-[#e6d3a3]">
          <h2 className="text-xl font-bold mb-6 text-center text-[#4a5a3c]">
            Site Info
          </h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Site Name"
              value={siteData.name}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="location"
              placeholder="Location"
              value={siteData.location}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="latitude"
              type="number"
              step="any"
              placeholder="Latitude"
              value={siteData.coordinates.latitude}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="longitude"
              type="number"
              step="any"
              placeholder="Longitude"
              value={siteData.coordinates.longitude}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="businessProofLicense"
              type="url"
              placeholder="Business Proof License (URL)"
              value={siteData.businessProofLicense}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
          </div>
        </div>

        {/* Employee form */}
        <div className="bg-[#f3e8d0]/90 p-8 md:p-12 rounded-xl shadow-lg w-full border border-[#e6d3a3]">
          <h2 className="text-xl font-bold mb-6 text-center text-[#4a5a3c]">
            Employee Info
          </h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Employee Name"
              value={employeeData.name}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={employeeData.email}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
            <select
              name="designation"
              value={employeeData.designation}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            >
              <option value="">Select Designation</option>
              <option value="Mines Manager">Mines Manager</option>
              <option value="Head of Safety">Head of Safety</option>
              <option value="Chief Geologist">Chief Geologist</option>
            </select>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={employeeData.password}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg border border-[#c7b07a] text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          type="submit"
          className="bg-[#4a5a3c] hover:bg-[#3e4730] text-white font-semibold py-3 px-12 rounded-lg transition-colors"
        >
          Create Account
        </button>
        <div className="text-sm text-[#6b5c40] mt-6">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4a5a3c] hover:text-[#3e4730] font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
