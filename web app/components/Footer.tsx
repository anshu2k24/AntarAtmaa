import Link from "next/link";
import {
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-gray-400 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Left Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <FaLock className="h-8 w-8 text-blue-500" />
            <span className="text-white text-xl font-bold">RockSafe AI</span>
          </div>
          <p className="text-sm leading-relaxed">
            Revolutionizing mining safety through advanced AI-powered rockfall
            prediction systems. Protecting lives and operations across the
            globe.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              <FaEnvelope className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-white">
                Demo
              </Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-white">
                API Docs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 px-4">
        <span>© 2025 RockSafe AI. All rights reserved.</span>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-gray-400">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="hover:text-gray-400">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
