'use client';

import { FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing tokens)
    console.log('User logged out');
    // Redirect to the landing page
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1e293b] text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <button className="lg:hidden text-gray-400">
          <FaBars className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold text-white">DisasterAI</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Welcome back, Alex</span>
          <FaUserCircle className="h-8 w-8 text-gray-400" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;