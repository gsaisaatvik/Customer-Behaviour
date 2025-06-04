import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';

const AdminDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated as admin
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userType = localStorage.getItem('userType');
    
    if (!isAuthenticated || userType !== 'admin') {
      navigate('/login/admin');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/admin' },
    { name: 'Customers', icon: <Users className="h-5 w-5" />, path: '/admin/customers' },
    { name: 'Policies', icon: <FileText className="h-5 w-5" />, path: '/admin/policies' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out lg:relative lg:inset-0 z-40 w-64 bg-slate-800 text-white shadow-xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Title */}
          <div className="flex items-center justify-center h-16 border-b border-slate-700 bg-slate-900">
            <Shield className="h-6 w-6 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors duration-200 group"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                  {item.icon}
                </div>
                <span className="ml-3 text-sm font-medium">{item.name}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-gray-500 group-hover:text-gray-300 transition-colors duration-200" />
              </Link>
            ))}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Administrator</p>
                <p className="text-xs text-gray-400">Full Access</p>
              </div>
            </div>
            <Button
              variant="destructive"
              className="w-full justify-start bg-red-600 hover:bg-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Health Insurance Analytics
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
