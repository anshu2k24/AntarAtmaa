'use client';

import { useState } from 'react';
import { FaLock, FaUpload } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: '',
    mineCoordinates: '',
    geoTiffFiles: null,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prevData) => ({ ...prevData, geoTiffFiles: e.target.files }));
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle account creation, including file upload
    console.log('Creating account with:', formData);

    // On successful sign-up, redirect to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#1e293b] text-white min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-gray-400 mt-2">Join us to protect your mining operations</p>
      </div>

      <div className="bg-[#2a3648] p-8 md:p-12 rounded-xl shadow-lg w-full max-w-lg border border-gray-700">
        <form onSubmit={handleCreateAccount} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="mineCoordinates" className="block text-sm font-medium text-gray-300 mb-1">
              Mine Coordinates
            </label>
            <input
              id="mineCoordinates"
              name="mineCoordinates"
              type="text"
              placeholder="e.g., 45.7112° N, 74.2097° W"
              value={formData.mineCoordinates}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Geo-TIFF Images
            </label>
            <div className="bg-[#1e293b] rounded-lg border border-dashed border-gray-600 p-6 text-center">
              <FaUpload className="mx-auto h-8 w-8 text-gray-500 mb-3" />
              <p className="text-sm text-gray-400">Upload multiple Geo-TIFF images for risk mapping.</p>
              <label htmlFor="geoTiffFiles" className="cursor-pointer text-blue-500 hover:text-blue-400 font-semibold mt-2 block">
                Choose Files
              </label>
              <input
                id="geoTiffFiles"
                name="geoTiffFiles"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              {formData.geoTiffFiles && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {Array.from(formData.geoTiffFiles).map(file => file.name).join(', ')}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;