import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

const Header = ({ isSidebarCollapsed }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1e293b] text-white p-4 flex items-center justify-between shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4">
        <button className="lg:hidden text-gray-400">
          <FaBars className="h-6 w-6" />
        </button>
        <span
          className={`transition-all duration-300 ${
            isSidebarCollapsed ? "ml-28" : "ml-72"
          }`}
        >
          <Image
            src="/logo.png"
            alt="DisasterAI Logo"
            width={200}
            height={100}
            className="object-contain max-h-12 w-auto"
            priority
          />
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Welcome back, Alex</span>
          <FaUserCircle className="h-8 w-8 text-gray-400" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
