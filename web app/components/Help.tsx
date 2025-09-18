"use client";
import Link from "next/link";

const Help = () => {
  return (
    <section id="help" className="bg-[#f9f5f0] text-gray-900 py-20">
      <div className="container mx-auto px-6 space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Help & Documentation
          </h2>
          <p className="text-[#4a3f2a] max-w-2xl mx-auto">
            Explore our resources and documentary to understand how{" "}
            <span className="text-[#4a5a3c] font-semibold">GANI</span> works in
            making mining safer with real-time AI-powered prediction.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Documentation */}
          <div className="space-y-6 bg-[#f3e8d0]/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#4a5a3c]">
              📖 Resources
            </h3>
            <p className="text-[#4a3f2a] leading-relaxed">
              To dive deeper into GANI, check out our detailed documentation and
              educational resources. Learn how our AI models integrate
              geological data, IoT sensors, and dashboards to provide accurate
              rockfall predictions.
            </p>

            <ul className="space-y-3 text-[#4a3f2a]">
              <li>
                <Link
                  href="https://docs.rocksafemines.com"
                  target="_blank"
                  className="hover:text-[#4a5a3c] transition-colors"
                >
                  📑 Official Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://tutorials.rocksafemines.com"
                  target="_blank"
                  className="hover:text-[#4a5a3c] transition-colors"
                >
                  🎓 Step-by-step Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="https://dashboard.rocksafemines.com"
                  target="_blank"
                  className="hover:text-[#4a5a3c] transition-colors"
                >
                  📊 Dashboard Access
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.rocksafemines.com"
                  target="_blank"
                  className="hover:text-[#4a5a3c] transition-colors"
                >
                  💬 Support & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: YouTube Video */}
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-[#4a5a3c]/40">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/hYfb1M2nihY?si=eyRQyk7lDKsnz-yF"
              title="RockSafe AI Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
