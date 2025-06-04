import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  Activity, 
  ShieldAlert,
  ArrowUp,
  ArrowDown 
} from 'lucide-react';
import RiskScoreChart from '@/components/charts/RiskScoreChart';
import AgeDistributionChart from '@/components/charts/AgeDistributionChart';

// Custom hook for window resize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
};

const AdminHome = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  const [stats, setStats] = useState({
    totalCustomers: 0,
    averageRiskScore: 0,
    preExistingConditions: 0,
    averageAge: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stats');
        
        if (response.ok) {
          const statsData = await response.json();
          setStats(statsData);
        } else {
          // Fallback data for demo
          setStats({
            totalCustomers: 92,
            averageRiskScore: 6.8,
            preExistingConditions: 23,
            averageAge: 34.2
          });
        }
        
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data for demo
        setStats({
          totalCustomers: 92,
          averageRiskScore: 6.8,
          preExistingConditions: 23,
          averageAge: 34.2
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, trend, subtitle }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center pt-1 text-xs ${
            trend.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>{trend.value}</span>
          </div>
        )}
      </CardContent> */}
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Health Insurance Analytics</h2>
          <p className="text-gray-600 mt-1">Monitor customer health metrics and risk categories</p>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          icon={<Users className="h-5 w-5" />}
          subtitle="Active policies"
        />
        
        <StatCard
          title="Avg. Risk Score"
          value={stats.averageRiskScore.toFixed(1)}
          icon={<ShieldAlert className="h-5 w-5" />}
          subtitle="Out of 10.0"
        />
        
        <StatCard
          title="Pre-existing Conditions"
          value={`${Math.round((stats.preExistingConditions / stats.totalCustomers) * 100)}%`}
          icon={<UserCheck className="h-5 w-5" />}
          subtitle={`${stats.preExistingConditions} customers`}
        />
        
        <StatCard
          title="Avg. Age"
          value={`${stats.averageAge.toFixed(1)} years`}
          icon={<Activity className="h-5 w-5" />}
          subtitle="Customer average"
        />
      </div> */}

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <AgeDistributionChart />
        </div>
        <div className="w-full">
          <RiskScoreChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
