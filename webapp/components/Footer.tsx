import Link from "next/link";
import Image from "next/image"; // Add this line
import {
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f9f5f0] text-gray-900 py-12 border-t border-[#e6d3a3]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="RockSafe AI Logo"
              width={100}
              height={50}
              className="object-contain max-h-12 w-auto"
              priority
            />
            <span className="text-[#4a5a3c] text-xl font-bold">
              RockSafe AI
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#4a3f2a]">
            Revolutionizing mining safety through advanced AI-powered rockfall
            prediction systems. Protecting lives and operations across the
            globe.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full border border-[#4a5a3c] text-[#4a5a3c] hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full border border-[#4a5a3c] text-[#4a5a3c] hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-[#4a5a3c] text-[#4a5a3c] hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="p-2 rounded-full border border-[#4a5a3c] text-[#4a5a3c] hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              <FaEnvelope className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="text-[#4a5a3c] text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#features" className="hover:text-[#4a5a3c]">
                Features
              </a>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#4a5a3c]">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-[#4a5a3c]">
                Demo
              </Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-[#4a5a3c]">
                API Docs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-[#4a5a3c] text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-[#4a5a3c]">
                About
              </a>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#4a5a3c]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#4a5a3c]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-[#4a5a3c]">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto mt-12 pt-6 border-t border-[#e6d3a3] flex flex-col md:flex-row items-center justify-between text-xs text-[#4a3f2a] px-4">
        <span>© 2025 RockSafe AI. All rights reserved.</span>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-[#4a5a3c]">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-[#4a5a3c]">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="hover:text-[#4a5a3c]">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
