"use client";
import Image from "next/image";
import Header2 from "@/components/Header2.";
const Help = () => {
  return (
    <div className="pb-12">
      <Header2 />
      <div className="bg-[#f9f5f0] min-h-screen py-16 px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 pt-8">
            Help & Documentation
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to the official documentation of{" "}
            <span className="font-semibold">RockSafe AI</span>. This guide will
            walk you through each feature of the platform, including account
            setup, dashboard navigation, risk board insights, weather
            monitoring, notifications, and more. All instructions are
            accompanied by visual examples for easy understanding.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {/* Signup Section */}
          <section className="bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#4a5a3c] mb-6">
              1. Signup
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creating an account is the first step to access RockSafe AI.
              Follow these steps:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
              <li>
                Navigate to the{" "}
                <span className="font-semibold">Signup Page</span> from the
                homepage.
              </li>
              <li>
                Enter your full name, organization name, email, and a secure
                password.
              </li>
              <li>
                Read and accept the{" "}
                <span className="font-semibold">Terms and Conditions</span>{" "}
                checkbox.
              </li>
              <li>
                Click the <span className="font-semibold">Sign Up</span> button.
              </li>
              <li>
                Check your email inbox for a verification link. Click it to
                verify your account.
              </li>
            </ol>
            <p className="text-gray-600 mb-6 italic">
              <strong>Note:</strong> Use a valid email address, as this will be
              used for login and password recovery.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">Unfilled Form</p>
                <Image
                  src="/signup-empty.jpeg"
                  alt="Signup Form Empty"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">Filled Form</p>
                <Image
                  src="/signup-filled.jpeg"
                  alt="Signup Form Filled"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
            </div>
          </section>

          {/* Login Section */}
          <section className="bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#c29f5b] mb-6">2. Login</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              After signing up, you can log in to access all platform features.
              Steps:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
              <li>
                Go to the <span className="font-semibold">Login Page</span>.
              </li>
              <li>Enter your registered email and password.</li>
              <li>
                Click the <span className="font-semibold">Login</span> button.
              </li>
              <li>
                If you forget your password, click{" "}
                <span className="font-semibold">Forgot Password</span> and
                follow instructions to reset it.
              </li>
            </ol>
            <p className="text-gray-600 mb-6 italic">
              <strong>Tip:</strong> Use a strong, unique password to ensure
              account security.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">Unfilled Form</p>
                <Image
                  src="/login-empty.png"
                  alt="Login Form Empty"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">Filled Form</p>
                <Image
                  src="/login-filled.png"
                  alt="Login Form Filled"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
            </div>
          </section>

          {/* Risk Board Section */}
          <section className="bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#4a5a3c] mb-6">
              3. Risk Board
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The <span className="font-semibold">Risk Board</span> provides
              real-time predictions of potential hazards. Here's how to use it:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
              <li>
                Access the <span className="font-semibold">Risk Board</span>{" "}
                from the dashboard menu.
              </li>
              <li>
                Each site hazard is color-coded:{" "}
                <span className="text-green-600 font-semibold">Low</span>,
                <span className="text-yellow-500 font-semibold"> Medium</span>,
                <span className="text-red-600 font-semibold"> High</span>.
              </li>
              <li>
                Hover over each risk to view detailed metrics and timestamps.
              </li>
              <li>Use filters to sort by site, hazard type, or severity.</li>
              <li>
                Export risk data for reporting using the{" "}
                <span className="font-semibold">Export CSV</span> button.
              </li>
            </ol>
            <p className="text-gray-600 mb-6 italic">
              <strong>Tip:</strong> Regularly monitor the Risk Board to ensure
              timely mitigation of hazards.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl  p-2">
                <p className="mb-3 text-black font-semibold">Before Data</p>
                <Image
                  src="/risk-empty.png"
                  alt="Risk Board Empty"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">After Data</p>
                <Image
                  src="/docs/risk-filled.png"
                  alt="Risk Board Filled"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
            </div>
          </section>

          {/* Weather Section */}
          <section className="bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#c29f5b] mb-6">
              4. Weather Monitoring
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Live weather conditions affect risk prediction. Here's how to
              monitor:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
              <li>
                Open the{" "}
                <span className="font-semibold">Weather Monitoring</span>{" "}
                section from the dashboard.
              </li>
              <li>
                Check key parameters: rainfall, humidity, temperature, and wind
                speed.
              </li>
              <li>Hover over each metric for detailed historical trends.</li>
              <li>
                Weather alerts are automatically highlighted in the Risk Board.
              </li>
              <li>
                Plan site activities based on predicted hazardous weather
                conditions.
              </li>
            </ol>
            <p className="text-gray-600 mb-6 italic">
              <strong>Warning:</strong> Weather data is updated every 10
              minutes. Always verify before field deployment.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">Loading Data</p>
                <Image
                  src="/weather-empty.png"
                  alt="Weather Empty"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
              <div className="text-center border-2 border-[#4a5a3c] rounded-3xl p-2">
                <p className="mb-3 text-black font-semibold">With Data</p>
                <Image
                  src="/weather-filled.png"
                  alt="Weather Data Filled"
                  width={500}
                  height={300}
                  className="rounded-lg border shadow"
                />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#4a5a3c] mb-6">
              5. Notifications & Alerts
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              RockSafe AI sends instant alerts for critical hazards and updates:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>Email notifications for new risks detected.</li>
              <li>SMS alerts for high-priority hazards.</li>
              <li>Dashboard pop-ups for real-time updates.</li>
              <li>
                Customize alert preferences in the{" "}
                <span className="font-semibold">Settings</span> panel.
              </li>
            </ul>
            <p className="text-gray-600 mb-6 italic">
              <strong>Tip:</strong> Enable both email and SMS notifications to
              never miss critical alerts.
            </p>
          </section>

          {/* Footer / Support */}
          <section className="bg-white p-10 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-600 mb-6">
              For troubleshooting, FAQs, and additional support,contact our
              helpdesk at{" "}
              <a
                href="mailto:support@rocksafe.ai"
                className="text-blue-600 underline"
              >
                support@rocksafe.ai
              </a>
              .
            </p>
            <p className="text-gray-500 text-sm">
              We also provide video tutorials and user guides for advanced
              platform usage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;
