"use client"; 

import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-[#f2f0ea] min-h-screen text-gray-800 flex">
     
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

    
      <div className="flex-1 flex flex-col">
       
        <Header isSidebarCollapsed={isSidebarCollapsed} />

        <main
          className="flex-1 pt-20 transition-all duration-300"
          style={{ marginLeft: isSidebarCollapsed ? 80 : 256 }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
