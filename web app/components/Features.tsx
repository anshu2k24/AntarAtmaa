import {
  FaLaptopCode,
  FaExclamationTriangle,
  FaSatelliteDish,
  FaChartLine,
  FaMapMarkerAlt,
  FaBolt,
} from "react-icons/fa";

const FeaturesPage = () => {
  const features = [
    {
      title: "AI-Powered Prediction",
      description:
        "Advanced machine learning models analyze geological patterns, weather data, and sensor inputs to predict rockfall events with 99.5% accuracy.",
      icon: <FaLaptopCode className="h-8 w-8 text-[#4a5a3c]" />,
    },
    {
      title: "Real-Time Alerts",
      description:
        "Instant notifications via multiple channels ensure immediate response to potential hazards, keeping your team safe 24/7.",
      icon: <FaExclamationTriangle className="h-8 w-8 text-[#c29f5b]" />,
    },
    {
      title: "Sensor Data Integration",
      description:
        "Seamlessly connects with ground motion sensors, weather stations, and geological monitoring equipment for comprehensive data analysis.",
      icon: <FaSatelliteDish className="h-8 w-8 text-[#4a5a3c]" />,
    },
    {
      title: "Historical Trends",
      description:
        "Track long-term geological trends and patterns to understand your mine's unique risk profile and optimize safety measures.",
      icon: <FaChartLine className="h-8 w-8 text-gray-700" />,
    },
    {
      title: "Interactive Risk Maps",
      description:
        "Visualize risk zones across your mining site with color-coded heat maps and detailed geological data overlays.",
      icon: <FaMapMarkerAlt className="h-8 w-8 text-[#c29f5b]" />,
    },
    {
      title: "Instant Emergency Response",
      description:
        "Automated emergency protocols and direct communication with rescue teams ensure rapid response to critical situations.",
      icon: <FaBolt className="h-8 w-8 text-[#4a5a3c]" />,
    },
  ];

  return (
    <div className="bg-[#f9f5f0] text-gray-900 py-16">
      <section id="features" className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Cutting-Edge <span className="text-[#4a5a3c]">Features</span>
          </h2>
          <p className="mt-4 text-lg text-[#4a3f2a] max-w-2xl mx-auto">
            Our comprehensive suite of AI-powered tools provides unmatched
            protection and insights for open-pit mining operations worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f3e8d0]/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-[#e6d3a3] hover:border-[#4a5a3c] transition-colors duration-300"
            >
              <div className="p-4 rounded-xl bg-[#fff8e5] w-max mb-4 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-[#4a3f2a] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
