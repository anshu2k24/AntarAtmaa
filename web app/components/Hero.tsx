import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-[#f9f5f0] text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="RockSafe AI Logo"
              width={160}
              height={60}
              className="object-contain h-10 md:h-12 w-auto"
              priority
            />
          </div>

          {/* Navigation Links */}
          <div className="ml-auto flex items-center space-x-6 font-medium text-gray-800">
            <a href="#help" className="hover:text-[#4a5a3c] transition-colors">
              Help
            </a>
            <a
              href="#features"
              className="hover:text-[#4a5a3c] transition-colors"
            >
              Features
            </a>
            <a href="#about" className="hover:text-[#4a5a3c] transition-colors">
              About
            </a>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-[#4a5a3c] text-white hover:bg-[#3b482f] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Smarter{" "}
              <span className="text-[#c29f5b]">Rockfall Prediction</span> <br />
              for <span className="text-[#4a5a3c]">Safer Mines</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Harness the power of AI to safeguard miners. Real-time monitoring,
              predictive alerts, and data-driven dashboards that keep operations
              efficient and safe—every hour, every shift.
            </p>

            {/* CTA */}
            <Link href="/signup">
              <button className="bg-[#4a5a3c] text-white hover:bg-[#3b482f] transition-colors py-3 px-6 rounded-lg font-semibold flex items-center space-x-2 shadow-md">
                <span>Get Started</span>
                <span>→</span>
              </button>
            </Link>

            {/* Quick Data Highlights */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-[#f3e8d0] p-4 rounded-xl shadow text-center">
                <span className="text-3xl font-bold text-[#4a5a3c]">500+</span>
                <p className="text-sm text-gray-700 mt-2">Sites Protected</p>
              </div>
              <div className="bg-[#f3e8d0] p-4 rounded-xl shadow text-center">
                <span className="text-3xl font-bold text-[#4a5a3c]">99.5%</span>
                <p className="text-sm text-gray-700 mt-2">
                  Prediction Accuracy
                </p>
              </div>
              <div className="bg-[#f3e8d0] p-4 rounded-xl shadow text-center">
                <span className="text-3xl font-bold text-[#4a5a3c]">24/7</span>
                <p className="text-sm text-gray-700 mt-2">Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Side - Mine Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/mine.jpg"
              alt="Mining Site"
              width={600}
              height={400}
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
