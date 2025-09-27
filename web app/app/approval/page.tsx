"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Interface for type safety
interface IPendingEmployee {
  _id: string;
  name: string;
  email: string;
  designation: string;
}

const AdminApprovalPage = () => {
  const [employees, setEmployees] = useState<IPendingEmployee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchPendingEmployees = async () => {
      try {
        const res = await fetch('/api/employees/pending');
        if (!res.ok) {
          throw new Error('Failed to fetch pending employees');
        }
        const data = await res.json();
        setEmployees(data.data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPendingEmployees();
  }, []);

  const handleApprove = async (employeeId: string) => {
    // --- CHANGE STARTS HERE ---
    // 1. Get the adminId from localStorage
    const adminId = localStorage.getItem('adminId');

    // 2. Check if the adminId exists before making the API call
    if (!adminId) {
      setError('Admin ID not found in storage. Please log in again.');
      return; // Stop the function if no ID is found
    }
    // --- CHANGE ENDS HERE ---

    try {
      const res = await fetch(`/api/employees/approve/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId }), // Pass the retrieved adminId
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Approval failed');
      }
      setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReject = async (employeeId: string) => {
    if (!confirm('Are you sure you want to reject and delete this employee?')) return;
    try {
      const res = await fetch(`/api/employees/${employeeId}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Deletion failed');
      }
      setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="bg-[#f2f0ea] min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading pending approvals...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f0ea] text-gray-800 min-h-screen p-6 w-full">
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
           <h1 className="text-4xl font-extrabold text-[#373434] drop-shadow-sm">Admin Panel</h1>
           <p className="text-gray-600 mt-2">Manage Employee Approvals</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4 p-4 bg-red-100 rounded-md">{error}</p>}
      
      {employees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {employees.map((employee) => (
            <div key={employee._id} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
                  <FaUserClock className="text-3xl text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Pending Approval</h2>
                </div>
                <div className="space-y-4 text-gray-700 mb-6">
                  <p><b>Name:</b> {employee.name}</p>
                  <p><b>Email:</b> {employee.email}</p>
                  <p><b>Designation:</b> {employee.designation}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                 <button 
                   onClick={() => handleApprove(employee._id)} 
                   className="flex items-center space-x-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                 >
                   <FaCheckCircle />
                   <span>Approve</span>
                 </button>
                 <button 
                   onClick={() => handleReject(employee._id)} 
                   className="flex items-center space-x-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                 >
                   <FaTimesCircle />
                   <span>Reject</span>
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
            <h2 className="text-2xl font-bold text-gray-700">All Clear!</h2>
            <p className="text-gray-500 mt-2">There are no pending employee approvals.</p>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalPage;