'use client';

import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const defaultOrg = {
  name: '',
  email: '',
  contact: '',
  registeredAddress: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  corporationIdentificationNumber: '',
  registrationType: '',
};
const defaultSite = {
  name: '',
  location: '',
  coordinates: {
    latitude: '',
    longitude: '',
  },
  businessProofLicense: '',
};
const defaultEmp = {
  name: '',
  email: '',
  designation: '',
  password: '',
};

export default function SignupPage() {
  const [organizationData, setOrganizationData] = useState(defaultOrg);
  const [siteData, setSiteData] = useState(defaultSite);
  const [employeeData, setEmployeeData] = useState(defaultEmp);
  const router = useRouter();

  
  const handleOrganizationChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'zip', 'country'].includes(name)) {
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

  
  const handleSiteChange = (e) => {
    const { name, value } = e.target;
    if (['latitude', 'longitude'].includes(name)) {
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

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
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

      console.log('Payload being sent:', payload);

      const res = await fetch('http://localhost:3000/api/organisation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  return (
    <form
      onSubmit={handleCreateAccount}
      autoComplete="off"
      className="bg-[#f2f0ea] text-gray-800 min-h-screen flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-[#645e54] mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Signup Portal</h1>
        <p className="text-gray-600 mt-2">
          Fill in details for Organization, Site & Employee
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
       
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-center">
            Organization Info
          </h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Organisation Name"
              value={organizationData.name}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={organizationData.email}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="contact"
              placeholder="Contact"
              value={organizationData.contact}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="street"
              placeholder="Street"
              value={organizationData.registeredAddress.street}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="city"
              placeholder="City"
              value={organizationData.registeredAddress.city}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="state"
              placeholder="State"
              value={organizationData.registeredAddress.state}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={organizationData.registeredAddress.zip}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="country"
              placeholder="Country"
              value={organizationData.registeredAddress.country}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="corporationIdentificationNumber"
              placeholder="CIN Number"
              value={organizationData.corporationIdentificationNumber}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            
            <select
              name="registrationType"
              value={organizationData.registrationType}
              onChange={handleOrganizationChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-[#645e54] transition-colors"
            >
              <option value="">Select Registration Type</option>
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Public Corporation">Public Corporation</option>
              <option value="Government Entity">Government Entity</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-center">Site Info</h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Site Name"
              value={siteData.name}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="location"
              placeholder="Location"
              value={siteData.location}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="latitude"
              type="number"
              step="any"
              placeholder="Latitude"
              value={siteData.coordinates.latitude}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="longitude"
              type="number"
              step="any"
              placeholder="Longitude"
              value={siteData.coordinates.longitude}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="businessProofLicense"
              type="url"
              placeholder="Business Proof License (URL)"
              value={siteData.businessProofLicense}
              onChange={handleSiteChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
          </div>
        </div>

        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-center">Employee Info</h2>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Employee Name"
              value={employeeData.name}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={employeeData.email}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
          
            <select
              name="designation"
              value={employeeData.designation}
              onChange={handleEmployeeChange}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-[#645e54] transition-colors"
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
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#645e54] transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          type="submit"
          className="bg-[#645e54] hover:bg-[#868172] text-white font-semibold py-3 px-12 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
        <div className="text-sm text-gray-600 mt-6">
          <p>
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#645e54] hover:text-[#868172] font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
