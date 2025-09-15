"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaCubes,
  FaCloudSun,
  FaBell,
  FaExclamationTriangle,
  FaChartLine,
  FaBars,
} from "react-icons/fa";

// Props type for Sidebar
interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { href: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
  { href: "/dashboard/risk-maps", icon: FaMapMarkedAlt, label: "Risk Maps" },
  { href: "/dashboard/sensor-data", icon: FaCubes, label: "Sensor Data" },
  {
    href: "/dashboard/weather",
    icon: FaCloudSun,
    label: "Weather & Forecasts",
  },
  {
    href: "/dashboard/alerts-notifications",
    icon: FaBell,
    label: "Alerts & Notifications",
  },
  {
    href: "/dashboard/sos-emergency",
    icon: FaExclamationTriangle,
    label: "SOS / Emergency",
  },
  {
    href: "/dashboard/historical-trends",
    icon: FaChartLine,
    label: "Historical Trends",
  },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full bg-[#1e293b] text-white border-r border-gray-700 transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"} hidden lg:flex flex-col`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        <FaBars />
      </button>

      <nav className="flex-1 p-4 pt-24 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-400"
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
