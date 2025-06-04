// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const RiskScoreChart = () => {
//   const [riskData, setRiskData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // Green, Orange, Red

//   useEffect(() => {
//     const fetchRiskData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('http://localhost:5000/api/risk-distribution');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
        
//         // Transform data to match the expected format
//         const formattedData = [
//           { name: 'Low Risk', value: data.low || 0, riskLevel: 'Low' },
//           { name: 'Medium Risk', value: data.medium || 0, riskLevel: 'Medium' },
//           { name: 'High Risk', value: data.high || 0, riskLevel: 'High' }
//         ];
        
//         setRiskData(formattedData);
//       } catch (error) {
//         console.error("Error fetching risk distribution:", error);
//         setError("Failed to load risk data.");
//         // Fallback data for demo
//         setRiskData([
//           { name: 'Low Risk', value: 51, riskLevel: 'Low' },
//           { name: 'Medium Risk', value: 14, riskLevel: 'Medium' },
//           { name: 'High Risk', value: 36, riskLevel: 'High' }
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRiskData();
//   }, []);

//   const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="white" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//         fontSize={12}
//         fontWeight="bold"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm h-full">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Risk Category Distribution</h2>
//       <div className="h-80 w-full flex items-center justify-center">
//         {loading ? (
//           <div className="text-gray-500">Loading risk data...</div>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : (
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={riskData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={CustomLabel}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {riskData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value, name) => [`${value} customers`, name]}
//                 contentStyle={{ 
//                   backgroundColor: '#fff', 
//                   borderRadius: '0.5rem', 
//                   border: 'none', 
//                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
//                 }}
//               />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RiskScoreChart;
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RiskScoreChart = () => {
  const [riskData, setRiskData] = useState({ low: 0, medium: 0, high: 0 });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state
  const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

  useEffect(() => {
    const fetchRiskData = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null);   // Reset any previous error
      try {
        const response = await fetch('http://localhost:5000/api/risk-distribution');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.low !== undefined && data.medium !== undefined && data.high !== undefined) {
          setRiskData(data);
        } else {
          console.error("Invalid data structure", data);
          setError("Invalid data received from the server.");
        }
      } catch (error) {
        console.error("Error fetching risk distribution:", error);
        setError("Failed to load risk data.");
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchRiskData();
  }, []);

  const data = [
    { name: 'Low Risk', value: riskData.low },
    { name: 'Medium Risk', value: riskData.medium },
    { name: 'High Risk', value: riskData.high }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Risk Category Distribution</h2>
      <div className="h-64 w-full flex items-center justify-center">
        {loading ? (
          <div>Loading risk data...</div> // Display loading indicator
        ) : error ? (
          <div className="text-red-500">{error}</div> // Display error message
        ) : (
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} customers`, 'Count']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RiskScoreChart;