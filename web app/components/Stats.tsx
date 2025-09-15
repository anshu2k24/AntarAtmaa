import { FaShieldAlt, FaUsers, FaCheckCircle, FaGlobeAmericas } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Mines Protected', icon: <FaShieldAlt className="h-8 w-8 text-white" />, color: 'bg-blue-600' },
    { number: '10,000+', label: 'Lives Safeguarded', icon: <FaUsers className="h-8 w-8 text-white" />, color: 'bg-green-600' },
    { number: '99.5%', label: 'Accuracy Rate', icon: <FaCheckCircle className="h-8 w-8 text-white" />, color: 'bg-yellow-600' },
    { number: '25+', label: 'Countries Served', icon: <FaGlobeAmericas className="h-8 w-8 text-white" />, color: 'bg-red-600' },
  ];

  return (
    <div className="bg-[#1e293b] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#2a3648] p-8 rounded-lg flex flex-col items-center text-center">
              <div className={`p-3 rounded-full mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-4xl font-bold text-white">{stat.number}</span>
              <span className="text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
