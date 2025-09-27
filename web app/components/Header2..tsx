import Link from "next/link";
import Image from "next/image";

const Header2 = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/logofinal.png"
              alt="RockSafe AI Logo"
              width={500}
              height={500}
              className="object-contain h-20 md:h-12 w-auto"
              priority
            />
          </div>
          <div className="ml-auto flex items-center space-x-6 font-medium text-gray-800">
            <Link href="/" className="hover:text-[#4a5a3c] transition-colors">
              Home
            </Link>
            <a
              href="/#features"
              className="hover:text-[#4a5a3c] transition-colors"
            >
              Features
            </a>
            <a
              href="/#about"
              className="hover:text-[#4a5a3c] transition-colors"
            >
              About
            </a>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-[#4a5a3c] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-[#4a5a3c] text-white hover:bg-[#3b482f] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header2;
