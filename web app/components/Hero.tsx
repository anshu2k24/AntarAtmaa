import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-[#1e293b] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="RockSafe AI Logo"
              width={200}
              height={80}
              className="object-contain h-10 md:h-12 w-auto"
              priority
            />
          </div>

          {/* Navigation Links aligned right */}
          <div className="ml-auto flex items-center space-x-6">
            <a href="#features" className="hover:text-gray-400">
              Features
            </a>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              AI Rockfall Prediction for <br />
              <span className="text-[#34d399]">Safer Mines</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Advanced machine learning algorithms analyze geological data,
              sensor readings, and environmental factors to predict rockfall
              risks with unprecedented accuracy, keeping miners safe and
              operations running smoothly.
            </p>
            <Link href="/signup">
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 px-6 rounded-lg font-semibold flex items-center space-x-2">
                <span>Get Started</span>
                <span>→</span>
              </button>
            </Link>

            {/* Metrics Cards (Darker) */}
            <div className="flex space-x-6 mt-8">
              <div className="bg-[#16202b] p-6 rounded-xl shadow-lg flex-1 text-center">
                <span className="text-3xl font-bold text-[#34d399]">99.5%</span>
                <p className="text-sm text-gray-400 mt-2">Accuracy</p>
              </div>
              <div className="bg-[#16202b] p-6 rounded-xl shadow-lg flex-1 text-center">
                <span className="text-3xl font-bold text-yellow-400">24/7</span>
                <p className="text-sm text-gray-400 mt-2">Monitoring</p>
              </div>
              <div className="bg-[#16202b] p-6 rounded-xl shadow-lg flex-1 text-center">
                <span className="text-3xl font-bold text-yellow-400">
                  Real-time
                </span>
                <p className="text-sm text-gray-400 mt-2">Alerts</p>
              </div>
            </div>
          </div>

          {/* Interactive 3D Model placeholder */}
          <div className="bg-[#2a3648] rounded-xl h-[400px] flex items-center justify-center p-8 relative">
            <div className="bg-blue-600 w-32 h-32 rounded-full animate-float"></div>
            <p className="absolute bottom-8 text-sm text-gray-400 text-center">
              <span className="text-lg font-semibold text-white">
                Interactive 3D Model
              </span>{" "}
              <br />
              Spline 3D visualization will be integrated here
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
