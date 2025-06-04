import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react'; // User icon
import { LineChart } from 'lucide-react'; // Trend icon for Avg. Age

// Generic StatCard component for reusability
const StatCard = ({ title, value, trend, icon, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-6 flex items-center justify-between",
      className
    )}>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-center mt-1">
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
          {trend && (
            <span className={cn(
              "ml-2 text-sm font-medium",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              {trend.value}
            </span>
          )}
        </div>
      </div>
      <div className="p-3 rounded-full bg-health-blue/10 text-health-blue">
        {icon}
      </div>
    </div>
  );
};

// CustomerStatCard for total customers
const CustomerStatCard = ({ className }) => {
  const [customerCount, setCustomerCount] = useState(0);
  const [trend, setTrend] = useState({ value: '+0%', positive: true });

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/count'); // Ensure correct endpoint
        const data = await response.json();
        console.log('Customer count data:', data); // Debug log
        const previousCount = 12; // Hardcoded previous count; replace with stored value
        const trendValue = ((data.count - previousCount) / previousCount * 100) || 0;
        setCustomerCount(data.count);
        setTrend({ value: `${trendValue > 0 ? '+' : ''}${trendValue.toFixed(0)}%`, positive: trendValue >= 0 });
      } catch (error) {
        console.error('Error fetching customer count:', error);
      }
    };

    fetchCustomerCount();
    const interval = setInterval(fetchCustomerCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatCard
      title="Total Customers"
      value={customerCount}
      trend={trend}
      icon={<Users size={20} />}
      className={className}
    />
  );
};

// RiskStatCard for average risk score
const RiskStatCard = ({ className }) => {
  const [avgRiskScore, setAvgRiskScore] = useState(0);

  useEffect(() => {
    const fetchRiskScore = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/avg-risk-score');
        const data = await response.json();
        setAvgRiskScore(data.avgRiskScore);
      } catch (error) {
        console.error('Error fetching average risk score:', error);
      }
    };

    fetchRiskScore();
    const interval = setInterval(fetchRiskScore, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatCard
      title="Avg. Risk Score"
      value={avgRiskScore}
      trend={null}
      icon={<Users size={20} />}
      className={className}
    />
  );
};

// PreexistingStatCard for pre-existing conditions percentage
const PreexistingStatCard = ({ className }) => {
  const [preexistingPercentage, setPreexistingPercentage] = useState(0);

  useEffect(() => {
    const fetchPreexistingPercentage = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/preexisting-percentage');
        const data = await response.json();
        setPreexistingPercentage(data.percentage);
      } catch (error) {
        console.error('Error fetching preexisting percentage:', error);
      }
    };

    fetchPreexistingPercentage();
    const interval = setInterval(fetchPreexistingPercentage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatCard
      title="Pre-existing Conditions"
      value={`${preexistingPercentage}%`}
      trend={null}
      icon={<Users size={20} />}
      className={className}
    />
  );
};

// AgeStatCard for average age
const AgeStatCard = ({ className }) => {
  const [avgAge, setAvgAge] = useState(0);

  useEffect(() => {
    const fetchAverageAge = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/avg-age');
        const data = await response.json();
        setAvgAge(data.avgAge);
      } catch (error) {
        console.error('Error fetching average age:', error);
      }
    };

    fetchAverageAge();
    const interval = setInterval(fetchAverageAge, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatCard
      title="Avg. Age"
      value={avgAge}
      trend={null}
      icon={<LineChart size={20} />}
      className={className}
    />
  );
};

// Dashboard component to display all cards
const Dashboard = () => {
  return (
    <div className="flex space-x-4 p-4">
      <CustomerStatCard className="w-1/4" />
      <RiskStatCard className="w-1/4" />
      <PreexistingStatCard className="w-1/4" />
      <AgeStatCard className="w-1/4" />
    </div>
  );
};

export default StatCard;