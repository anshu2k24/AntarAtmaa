import {
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
  FaGlobeAmericas,
} from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Mines Protected",
      icon: <FaShieldAlt className="h-8 w-8 text-white" />,
      color: "bg-[#4a5a3c]",
    },
    {
      number: "10,000+",
      label: "Lives Safeguarded",
      icon: <FaUsers className="h-8 w-8 text-white" />,
      color: "bg-[#4a5a3c]",
    },
    {
      number: "99.5%",
      label: "Accuracy Rate",
      icon: <FaCheckCircle className="h-8 w-8 text-white" />,
      color: "bg-[#c29f5b]",
    },
    {
      number: "25+",
      label: "Countries Served",
      icon: <FaGlobeAmericas className="h-8 w-8 text-white" />,
      color: "bg-[#4a5a3c]",
    },
  ];

  return (
    <div className="bg-[#f9f5f0] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#f3e8d0]/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-[#e6d3a3] flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
            >
              <div className={`p-4 rounded-full mb-4 shadow-md ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-4xl font-bold text-gray-900">
                {stat.number}
              </span>
              <span className="text-[#4a3f2a] mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
