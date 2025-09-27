import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-[#f9f5f0] text-gray-900 min-h-screen flex flex-col">
      {/* Hero Content */}
      <section className="flex flex-grow items-center justify-center p-8 lg:p-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-14">
          {/* Left Side - Text */}
          <div className="space-y-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Smarter{" "}
              <span className="text-[#c29f5b]">Rockfall Prediction</span>
              <br />
              for <span className="text-[#4a5a3c]">Safer Mines</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Harness the power of AI to{" "}
              <span className="font-bold text-green-700">
                predict the unpredictable
              </span>
              . Real-time monitoring, predictive alerts, and data-driven
              insights that keep your mine and miners safe—every hour, every
              shift.
            </p>
            {/* CTA */}
            <Link href="/signup">
              <button className="bg-[#4a5a3c] text-white hover:bg-[#3b482f] transition-colors py-3 px-6 rounded-lg font-semibold flex items-center space-x-2 shadow-md cursor-pointer">
                <span>Get Started</span>
                <span>→</span>
              </button>
            </Link>
          </div>
          {/* Right Side - Mine Image */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden shadow-4xl">
            <Image
              src="/rockfall.jpg"
              alt="Mining Site"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
