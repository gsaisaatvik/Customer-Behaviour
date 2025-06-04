
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { stats } from '@/data/mockCustomerData';

const HealthMetricsChart = () => {
  const data = [
    {
      name: 'BMI Categories',
      Underweight: stats.bmiCategories.underweight,
      'Normal Weight': stats.bmiCategories.normalWeight,
      Overweight: stats.bmiCategories.overweight,
      Obese: stats.bmiCategories.obese
    },
    {
      name: 'Pre-existing Conditions',
      Yes: stats.preExistingConditions,
      No: stats.totalCustomers - stats.preExistingConditions
    },
    {
      name: 'Regular Checkups',
      Yes: stats.regularCheckups,
      No: stats.totalCustomers - stats.regularCheckups
    },
    {
      name: 'Family History',
      Yes: stats.familyHistory,
      No: stats.totalCustomers - stats.familyHistory
    }
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Metrics Analysis</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip 
              formatter={(value) => [`${value} customers`, '']}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
            <Bar dataKey="Underweight" stackId="bmi" fill="#7dd3fc" />
            <Bar dataKey="Normal Weight" stackId="bmi" fill="#0ea5e9" />
            <Bar dataKey="Overweight" stackId="bmi" fill="#f59e0b" />
            <Bar dataKey="Obese" stackId="bmi" fill="#ef4444" />
            <Bar dataKey="Yes" fill="#22c55e" />
            <Bar dataKey="No" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthMetricsChart;
