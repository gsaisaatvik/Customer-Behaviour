import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  User,
  FileText,
  Home,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const CustomerDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('Customer');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated as customer
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userType = localStorage.getItem('userType');
    
    if (!isAuthenticated || userType !== 'customer') {
      navigate('/login/customer');
      return;
    }

    // Get user profile if available
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile.fullName) {
      setUserName(userProfile.fullName.split(' ')[0]);
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
    { name: 'Home', icon: <Home className="h-5 w-5" />, path: '/customer' },
    { name: 'Policies', icon: <FileText className="h-5 w-5" />, path: '/customer/policies' },
    { name: 'Profile', icon: <User className="h-5 w-5" />, path: '/customer/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white"
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
        } lg:translate-x-0 transition duration-200 ease-in-out lg:relative lg:inset-0 z-40 w-64 bg-white shadow-lg`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Title */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary">Customer Portal</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-primary/10 group"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="text-gray-500 group-hover:text-primary">
                  {item.icon}
                </div>
                <span className="ml-3 text-sm font-medium">{item.name}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary" />
              </Link>
            ))}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {userName.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
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
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Welcome, {userName}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
