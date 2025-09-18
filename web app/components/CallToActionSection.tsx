import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const CallToActionSection = () => {
  return (
    <section className="bg-[#f9f5f0] py-20 px-6">
      <div className="container mx-auto text-center max-w-6xl bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300">
        <h2 className="text-3xl font-bold mb-4 text-[#4a5a3c]">
          Ready to Elevate Your Mine's Safety?
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Join the future of mining with our AI-powered rockfall prediction system and safeguard your most valuable assets.
        </p>
        <Link href="/signup">
          <button className="bg-[#4a5a3c] text-white hover:bg-[#3b482f] transition-colors py-3 px-8 rounded-lg font-semibold flex items-center justify-center space-x-2 mx-auto shadow-md cursor-pointer">
            <span>Get Started Now</span>
            <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;