import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Customers", icon: <Users size={20} />, path: "/customers" },
    { name: "Policies", icon: <FileText size={20} />, path: "/policies" },
    // { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-white shadow-lg transition-all duration-300 flex flex-col fixed top-0 left-0 h-screen",
          isSidebarOpen ? "w-64" : "w-20",
        )}
        style={{ height: "100vh" }} // Explicitly set height to 100% of viewport height
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-health-blue flex items-center justify-center">
                <span className="text-white font-bold">HI</span>
              </div>
              <span className="ml-2 font-bold text-gray-800">HealthInsights</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar} 
            className={cn(
              "text-gray-500 hover:text-health-blue transition-colors",
              !isSidebarOpen && "mx-auto"
            )}
          >
            {isSidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-gray-600 hover:bg-health-blue/10 hover:text-health-blue transition-colors",
                      isActive && "bg-health-blue/10 text-health-blue border-r-4 border-health-blue"
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {isSidebarOpen && <span className="ml-4">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            {isSidebarOpen && (
              <div className="ml-3">
                {/* <p className="text-sm font-medium text-gray-800">Jane Smith</p> */}
                {/* <p className="text-xs text-gray-500">Insurance Admin</p> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isSidebarOpen ? "ml-64" : "ml-20" // Margin matches sidebar width to prevent overlap
        )}
        style={{ marginLeft: isSidebarOpen ? "16rem" : "5rem" }} // Explicit margin in rem for precision
      >
       
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;