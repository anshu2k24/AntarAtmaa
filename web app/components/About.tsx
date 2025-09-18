import Image from "next/image";


const AboutPage = () => {
  return (
    <div className="bg-[#f9f5f0] text-gray-900 py-24">
      <section
        id="about"
        className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-15 items-center"
      >
        {/* Left Side: Text */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-gray-900">
            Pioneering <span className="text-[#4a5a3c]">Mining Safety</span>{" "}
            <br />
            Since 2020
          </h2>
          <p className="text-[#4a3f2a] text-lg">
            Born from a vision to eliminate mining accidents through artificial
            intelligence, RockSafe AI combines cutting-edge machine learning
            with deep geological expertise to provide the world's most accurate
            rockfall prediction system.
          </p>
          <ul className="space-y-4 text-[#4a3f2a]">
            <li className="flex items-start space-x-3">
              <span className="text-[#4a5a3c] text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg font-semibold text-[#c29f5b]">Advanced AI Models:</h3>
                <p className="text-sm">
                  Our proprietary algorithms process over 10,000 data points per
                  second from multiple sensor arrays.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-[#4a5a3c] text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg font-semibold text-[#c29f5b]">Geological Expertise:</h3>
                <p className="text-sm">
                  Developed in partnership with leading geologists and mining
                  engineers from around the world.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-[#4a5a3c] text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg font-semibold text-[#c29f5b]">Proven Track Record:</h3>
                <p className="text-sm">
                  Zero major incidents reported across all protected mining
                  sites since implementation.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Image with Overlay */}
        <div className="relative rounded-2xl h-[500px] overflow-hidden shadow-xl">
          <Image
            src="/solution.jpg"
            alt="AI-Powered Mining Safety"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;