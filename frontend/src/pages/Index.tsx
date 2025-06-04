
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import RiskScoreChart from "@/components/charts/RiskScoreChart";
// import HealthMetricsChart from "@/components/charts/HealthMetricsChart";
// import LifestyleChart from "@/components/charts/LifestyleChart";
//import CustomerTable from "@/components/CustomerTable";
import { stats, monthlyStats } from "@/data/mockCustomerData";
import { 
  Users, 
  UserCheck, 
  Activity, 
  ShieldAlert,
  LineChart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from "lucide-react";
import { 
  LineChart as RechartsLineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Index = () => {
  // Calculate trends
  const newCustomersTrend = {
    value: "+12%",
    positive: true
  };
  const riskScoreTrend = {
    value: "-2%",
    positive: true
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Insurance Analytics</h1>
        <p className="text-gray-600">Monitor customer health metrics and risk categories</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<Users size={24} />}
          trend={newCustomersTrend}
        />
        
        <StatCard
          title="Avg. Risk Score"
          value={stats.averageRiskScore.toFixed(1)}
          icon={<ShieldAlert size={24} />}
          trend={riskScoreTrend}
        />
        
        <StatCard
          title="Pre-existing Conditions"
          value={`${Math.round((stats.preExistingConditions / stats.totalCustomers) * 100)}%`}
          icon={<UserCheck size={24} />}
        />
        
        <StatCard
          title="Avg. Age"
          value={stats.averageAge.toFixed(1)}
          icon={<Activity size={24} />}
        />
      </div>
      
      {/* Trends Chart */}
      {/* <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Health Metrics Trends</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-health-blue rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">New Customers</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 bg-health-purple rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Avg. Risk Score</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={monthlyStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="newCustomers" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="riskScore" stroke="#8b5cf6" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> */}
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AgeDistributionChart />
        <RiskScoreChart />
      </div>
      
      {/* More Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> */}
        {/* <LifestyleChart /> */}
        {/* <HealthMetricsChart /> */}
      {/* </div> */}
      
      {/* Customer Table */}
      {/* <div className="mb-6">
      <CustomerTable />
      </div>
       */}
      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/* <div className="bg-gradient-to-br from-health-blue to-health-darkblue rounded-lg shadow-sm p-6 text-white"> */}
          {/* <div className="flex justify-between items-center mb-4"> */}
            {/* <h2 className="text-lg font-semibold">Risk Summary</h2>
            <TrendingDown className="h-6 w-6" />
          </div>
          <p className="mb-4">
            {stats.riskDistribution.high} customers are in the high-risk category, requiring immediate attention.
          </p>
          <div className="bg-white/20 p-3 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Low Risk</span>
              <span>{Math.round((stats.riskDistribution.low / stats.totalCustomers) * 100)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{ width: `${(stats.riskDistribution.low / stats.totalCustomers) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mb-2 mt-4">
              <span>Medium Risk</span>
              <span>{Math.round((stats.riskDistribution.medium / stats.totalCustomers) * 100)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full" 
                style={{ width: `${(stats.riskDistribution.medium / stats.totalCustomers) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mb-2 mt-4">
              <span>High Risk</span>
              <span>{Math.round((stats.riskDistribution.high / stats.totalCustomers) * 100)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full" 
                style={{ width: `${(stats.riskDistribution.high / stats.totalCustomers) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Action Items</h2>
            <LineChart className="h-6 w-6 text-health-blue" />
          </div>
          <ul className="space-y-4">
            <li className="flex items-center p-3 bg-health-blue/5 rounded-md">
              <div className="h-8 w-8 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue mr-3">
                <ArrowUpRight size={18} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">High-Risk Customers</h3>
                <p className="text-sm text-gray-600">Review {stats.riskDistribution.high} high-risk customers</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-health-blue/5 rounded-md">
              <div className="h-8 w-8 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue mr-3">
                <ArrowUpRight size={18} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Smoking Risk</h3>
                <p className="text-sm text-gray-600">Address increased risk from {stats.smokers} smokers</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-health-blue/5 rounded-md">
              <div className="h-8 w-8 rounded-full bg-health-blue/20 flex items-center justify-center text-health-blue mr-3">
                <ArrowUpRight size={18} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Regular Checkups</h3>
                <p className="text-sm text-gray-600">Encourage checkups for {stats.totalCustomers - stats.regularCheckups} customers</p>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
    </DashboardLayout>
  );
};

export default Index;
