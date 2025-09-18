import { FaLock } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-[#1e293b] text-white py-24">
      <section
        id="about"
        className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Pioneering <span className="text-blue-500">Mining Safety</span>{" "}
            <br />
            Since 2020
          </h2>
          <p className="text-lg text-gray-300">
            Born from a vision to eliminate mining accidents through artificial
            intelligence, RockSafe AI combines cutting-edge machine learning
            with deep geological expertise to provide the world's most accurate
            rockfall prediction system.
          </p>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg text-white font-semibold">
                  Advanced AI Models:
                </h3>
                <p className="text-sm">
                  Our proprietary algorithms process over 10,000 data points per
                  second from multiple sensor arrays.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg text-white font-semibold">
                  Geological Expertise:
                </h3>
                <p className="text-sm">
                  Developed in partnership with leading geologists and mining
                  engineers from around the world.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 text-2xl font-bold">•</span>
              <div>
                <h3 className="text-lg text-white font-semibold">
                  Proven Track Record:
                </h3>
                <p className="text-sm">
                  Zero major incidents reported across all protected mining
                  sites since implementation.
                </p>
              </div>
            </li>
          </ul>
        </div>
      
        <div className="bg-[#2a3648] rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full opacity-10">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-gray-700"></div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <FaLock className="h-24 w-24 text-blue-600" />
            <h3 className="text-2xl font-semibold mt-4">
              AI-Powered Protection
            </h3>
            <p className="text-gray-400 mt-2">
              Intelligent systems working 24/7 to keep mining operations safe
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
