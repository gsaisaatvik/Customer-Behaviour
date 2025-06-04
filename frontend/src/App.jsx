import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminDashboard from "./components/AdminDashboard";

// General Pages
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ProfilePage from "./pages/ProfilePage";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Profile from "./pages/Profile";

// Customer Pages
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerPolicies from "./pages/customer/CustomerPolicies";
import CustomerProfile from "./pages/customer/CustomerProfile";

// Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminPolicies from "./pages/admin/AdminPolicies";
import AdminAnalytics from "./pages/admin/AdminAnalytics";


const queryClient = new QueryClient();

// Authentication check functions
const RequireCustomerAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userType = localStorage.getItem('userType');

  if (!isAuthenticated || userType !== 'customer') {
    return <Navigate to="/login/customer" replace />;
  }

  return children;
};

const RequireAdminAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userType = localStorage.getItem('userType');

  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/login/admin" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/Pprofile" element={<ProfilePage />} />

          {/* Legacy Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />

          {/* Customer Routes */}
          <Route path="/customer/home" element={
            <RequireCustomerAuth>
              <CustomerHome />
            </RequireCustomerAuth>
          } />

          <Route path="/customer/policies" element={
            <RequireCustomerAuth>
              <CustomerPolicies />
            </RequireCustomerAuth>
          } />

          <Route path="/customer/profile" element={
            <RequireCustomerAuth>
              <CustomerProfile />
            </RequireCustomerAuth>
          } />

          {/* Admin Dashboard */}
          <Route path="/admin" element={
            <RequireAdminAuth>
              <AdminDashboard />
            </RequireAdminAuth>
          }>
            <Route index element={<AdminHome />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="policies" element={<AdminPolicies />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
