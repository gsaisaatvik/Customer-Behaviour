
import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';
import { stats } from '@/data/mockCustomerData';

const LifestyleChart = () => {
  // Calculate percentages for lifestyle factors
  const totalCustomers = stats.totalCustomers;
  
  // Map lifestyle factors to percentages
  const data = [
    {
      factor: 'Smokers',
      percentage: Math.round((stats.smokers / totalCustomers) * 100),
      fill: '#ef4444'
    },
    {
      factor: 'Regular Alcohol',
      percentage: Math.round((stats.alcoholConsumption.regularly / totalCustomers) * 100),
      fill: '#f59e0b'
    },
    {
      factor: 'Never Exercise',
      percentage: Math.round(((stats.exerciseFrequency.never + stats.exerciseFrequency.rarely) / totalCustomers) * 100),
      fill: '#0ea5e9'
    },
    {
      factor: 'High Stress',
      percentage: Math.round((stats.stressLevels.high / totalCustomers) * 100),
      fill: '#8b5cf6'
    },
    {
      factor: 'Regular Checkups',
      percentage: Math.round((stats.regularCheckups / totalCustomers) * 100),
      fill: '#22c55e'
    }
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Lifestyle Factors Analysis</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="factor" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Percentage of Customers"
              dataKey="percentage"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Percentage']}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LifestyleChart;
