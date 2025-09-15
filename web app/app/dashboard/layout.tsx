"use client"; // <--- ADD THIS AT THE VERY TOP

import { useState } from "react";
import Header from "../dashboard/components/Header";
import Sidebar from "../dashboard/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-[#121c2c] min-h-screen text-gray-200 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header with dynamic logo */}
        <Header isSidebarCollapsed={isSidebarCollapsed} />

        <main
          className="flex-1 pt-20 px-6 pb-6 transition-all duration-300"
          style={{ marginLeft: isSidebarCollapsed ? 80 : 256 }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
