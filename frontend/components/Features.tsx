import { FaLaptopCode, FaExclamationTriangle, FaSatelliteDish, FaChartLine, FaMapMarkerAlt, FaBolt } from 'react-icons/fa';

const FeaturesPage = () => {
  const features = [
    {
      title: 'AI-Powered Prediction',
      description: 'Advanced machine learning models analyze geological patterns, weather data, and sensor inputs to predict rockfall events with 99.5% accuracy.',
      icon: <FaLaptopCode className="h-8 w-8 text-blue-500" />,
    },
    {
      title: 'Real-Time Alerts',
      description: 'Instant notifications via multiple channels ensure immediate response to potential hazards, keeping your team safe 24/7.',
      icon: <FaExclamationTriangle className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: 'Sensor Data Integration',
      description: 'Seamlessly connects with ground motion sensors, weather stations, and geological monitoring equipment for comprehensive data analysis.',
      icon: <FaSatelliteDish className="h-8 w-8 text-green-500" />,
    },
    {
      title: 'Historical Trends',
      description: 'Track long-term geological trends and patterns to understand your mine\'s unique risk profile and optimize safety measures.',
      icon: <FaChartLine className="h-8 w-8 text-gray-400" />,
    },
    {
      title: 'Interactive Risk Maps',
      description: 'Visualize risk zones across your mining site with color-coded heat maps and detailed geological data overlays.',
      icon: <FaMapMarkerAlt className="h-8 w-8 text-red-500" />,
    },
    {
      title: 'Instant Emergency Response',
      description: 'Automated emergency protocols and direct communication with rescue teams ensure rapid response to critical situations.',
      icon: <FaBolt className="h-8 w-8 text-red-500" />,
    },
  ];

  return (
    <div className="bg-[#1e293b] text-white py-16">
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Cutting-Edge Features
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Our comprehensive suite of AI-powered tools provides unmatched protection and insights for open-pit mining operations worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2a3648] p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="p-4 rounded-xl bg-[#1e293b] w-max mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
