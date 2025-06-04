
// import React from 'react';
// import { customerData } from '@/data/mockCustomerData';
// import { ArrowUpDown, MoreHorizontal, UserCheck, UserX } from 'lucide-react';

// const CustomerTable: React.FC = () => {
//   return (
//     <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-800">Recent Customers</h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   ID
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Age
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Gender
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   BMI
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Pre-existing Conditions
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Risk Score
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div className="flex items-center">
//                   Risk Category
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {customerData.slice(0, 6).map((customer) => (
//               <tr key={customer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   #{customer.id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.age}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.gender}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     customer.bmi_category === 'normal weight' ? 'bg-green-100 text-green-800' :
//                     customer.bmi_category === 'overweight' ? 'bg-yellow-100 text-yellow-800' :
//                     customer.bmi_category === 'obese' ? 'bg-red-100 text-red-800' :
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {customer.bmi} ({customer.bmi_category})
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.preExistingConditions === 'Yes' ? (
//                     <span className="flex items-center text-red-600">
//                       <UserX size={16} className="mr-1" /> Yes
//                     </span>
//                   ) : (
//                     <span className="flex items-center text-green-600">
//                       <UserCheck size={16} className="mr-1" /> No
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                       <div 
//                         className={`h-2.5 rounded-full ${
//                           customer.riskScore < 30 ? 'bg-green-500' :
//                           customer.riskScore < 70 ? 'bg-yellow-500' :
//                           'bg-red-500'
//                         }`} 
//                         style={{ width: `${customer.riskScore}%` }}
//                       ></div>
//                     </div>
//                     <span className="ml-2">{customer.riskScore}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     customer.riskCategory === 0 ? 'bg-green-100 text-green-800' :
//                     customer.riskCategory === 1 ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {customer.riskCategory === 0 ? 'Low' :
//                      customer.riskCategory === 1 ? 'Medium' : 'High'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button className="text-health-blue hover:text-health-blue/80">
//                     <MoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">{customerData.length}</span> results
//             </p>
//           </div>
//           <div className="flex-1 flex justify-end">
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerTable;


import React, { useEffect, useState } from 'react';
import { ArrowUpDown, UserCheck, UserX } from 'lucide-react';
import axios from 'axios';

interface Customer {
  _id: string;
  age: number;
  gender: string;
  bmi: number;
  bmi_category: string;
  preExistingConditions: string;
  riskCategory: string;
}

const CustomerTable: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   const fetchData = async () => {
  try {
    console.log("Fetching customers...");
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomerData(res.data);
  } catch (err) {
    setError('Error fetching customer data');
    console.error('Error fetching customer data:', err);
  } finally {
    setLoading(false);
  }
};

    fetchData();
  }, []);

  const getRiskBadgeClass = (category: string): string => {
    if (category === 'Low') return 'bg-green-100 text-green-800';
    if (category === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Customers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-existing Conditions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customerData.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{customer._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.bmi} ({customer.bmi_category})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.preExistingConditions === 'Yes' ? (
                    <span className="flex items-center text-red-600">
                      <UserX size={16} className="mr-1" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center text-green-600">
                      <UserCheck size={16} className="mr-1" /> No
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeClass(customer.riskCategory)}`}>
                    {customer.riskCategory}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
