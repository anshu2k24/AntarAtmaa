import Link from 'next/link';
import { FaSun, FaLock, FaRegClock, FaBell } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative bg-[#1e293b] text-white min-h-screen flex flex-col">
      {/* Navbar with Backdrop Blur */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaLock className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">RockSafe AI</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="hover:text-gray-400">
              Features
            </Link>
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/login" className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
              Sign Up
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-700">
              <FaSun className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content - Adjusted for full-screen */}
      <section className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              AI Rockfall Prediction for <br />
              <span className="text-[#34d399]">Safer Mines</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Advanced machine learning algorithms analyze geological data, sensor readings, and environmental factors to predict rockfall risks with unprecedented accuracy, keeping miners safe and operations running smoothly.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 px-6 rounded-lg font-semibold flex items-center space-x-2">
              <span>Get Started</span>
              <span>→</span>
            </button>
            <div className="flex space-x-8 mt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[#34d399]">99.5%</span>
                <span className="text-sm text-gray-400">Accuracy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-yellow-400">24/7</span>
                <span className="text-sm text-gray-400">Monitoring</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-yellow-400">Real-time</span>
                <span className="text-sm text-gray-400">Alerts</span>
              </div>
            </div>
          </div>
          {/* Interactive 3D Model placeholder */}
          <div className="bg-[#2a3648] rounded-xl h-[400px] flex items-center justify-center p-8 relative">
            <div className="bg-blue-600 w-32 h-32 rounded-full"></div>
            <p className="absolute bottom-8 text-sm text-gray-400 text-center">
              <span className="text-lg font-semibold text-white">Interactive 3D Model</span> <br />
              Spline 3D visualization will be integrated here
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
