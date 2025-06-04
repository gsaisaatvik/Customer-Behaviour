// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // import { Button } from '@/components/ui/button';

// // // // // // const CustomerPolicies = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [policies, setPolicies] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const riskScore = localStorage.getItem('riskScore');

// // // // // //   useEffect(() => {
// // // // // //     const fetchPolicies = async () => {
// // // // // //       try {
// // // // // //         const response = await fetch(`http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`);
// // // // // //         const data = await response.json();
// // // // // //         setPolicies(data);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error fetching policies:', error);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchPolicies();
// // // // // //   }, [riskScore]);

// // // // // //   const getRiskLevelText = (score) => {
// // // // // //     if (score === '0') return 'Low';
// // // // // //     if (score === '1') return 'Medium';
// // // // // //     if (score === '2') return 'High';
// // // // // //     return 'Unknown';
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="container mx-auto px-4 py-10 max-w-4xl">
// // // // // //       <Button 
// // // // // //         variant="outline" 
// // // // // //         className="mb-6"
// // // // // //         onClick={() => navigate('/customer/dashboard')}
// // // // // //       >
// // // // // //         Back to Dashboard
// // // // // //       </Button>

// // // // // //       <Card className="border-t-4 border-t-primary mb-6">
// // // // // //         <CardHeader>
// // // // // //           <CardTitle className="text-2xl">
// // // // // //             Recommended Policies ({getRiskLevelText(riskScore)} Risk)
// // // // // //           </CardTitle>
// // // // // //         </CardHeader>
// // // // // //         <CardContent>
// // // // // //           {loading ? (
// // // // // //             <p>Loading policies...</p>
// // // // // //           ) : policies.length === 0 ? (
// // // // // //             <p>No recommended policies found.</p>
// // // // // //           ) : (
// // // // // //             <ul className="space-y-4">
// // // // // //               {policies.map((policy, index) => (
// // // // // //                 <li key={index} className="p-4 border rounded-lg shadow-sm bg-muted">
// // // // // //                   <h3 className="text-lg font-semibold">{policy.name}</h3>
// // // // // //                   <p className="text-sm text-muted-foreground">{policy.description}</p>
// // // // // //                   <p className="text-sm mt-2">Premium: <strong>${policy.premium}</strong></p>
// // // // // //                 </li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CustomerPolicies;
// // // // // import React, { useEffect, useState } from 'react';


// // // // // const CustomerPolicies = ({ riskScore }) => {
// // // // //   const [policies, setPolicies] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     if (riskScore === undefined || riskScore === null) {
// // // // //       setError("Missing risk score");
// // // // //       setLoading(false);
// // // // //       return;
// // // // //     }
    
// // // // //     // const fetchPolicies = async () => {
// // // // //     //   try {
// // // // //     //     const response = await fetch(`http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`);
// // // // //     //     if (!response.ok) {
// // // // //     //       throw new Error(`Server responded with status ${response.status}`);
// // // // //     //     }

// // // // //     //     const data = await response.json();
// // // // //     //     setPolicies(data);
// // // // //     //   } catch (err) {
// // // // //     //     console.error("Error fetching policies:", err);
// // // // //     //     setError(err.message);
// // // // //     //   } finally {
// // // // //     //     setLoading(false);
// // // // //     //   }
// // // // //     // };
// // // // //     const fetchPolicies = async (riskScore) => {
// // // // //   try {
// // // // //     // Convert riskScore to string if it's not already
// // // // //     const scoreStr = String(riskScore);

// // // // //     const response = await fetch(`http://localhost:5000/api/policies/recommend?riskScore=${scoreStr}`);
// // // // //     const data = await response.json();

// // // // //     if (!response.ok) {
// // // // //       throw new Error(data.error || 'Failed to fetch policies');
// // // // //     }

// // // // //     setPolicies(data); // update your state with received policies
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching policies:', error);
// // // // //   }
// // // // // };

// // // // //     fetchPolicies();
// // // // //   }, [riskScore]);

// // // // //   if (loading) return <p>Loading policy recommendations...</p>;
// // // // //   if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
// // // // //   if (policies.length === 0) return <p>No policies found for this risk level.</p>;

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Recommended Policies</h2>
// // // // //       <ul>
// // // // //         {policies.map((policy, index) => (
// // // // //           <li key={index}>
// // // // //             <strong>{policy.name}</strong> - {policy.description}
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CustomerPolicies;
// // // // // import React, { useEffect, useState } from 'react';

// // // // // const CustomerPolicies = ({ riskScore }) => {
// // // // //   const [policies, setPolicies] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     if (!riskScore) {
// // // // //       setError("Missing risk score");
// // // // //       setLoading(false);
// // // // //       return;
// // // // //     }

// // // // //     const fetchPolicies = async () => {
// // // // //       try {
// // // // //         const response = await fetch(`http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`);
// // // // //         const data = await response.json();

// // // // //         if (!response.ok) {
// // // // //           throw new Error(data.error || 'Failed to fetch policies');
// // // // //         }

// // // // //         setPolicies(data);
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching policies:', err);
// // // // //         setError(err.message);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchPolicies();
// // // // //   }, [riskScore]);

// // // // //   if (loading) return <p>Loading policy recommendations...</p>;
// // // // //   if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
// // // // //   if (policies.length === 0) return <p>No policies found for this risk level.</p>;

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Recommended Policies</h2>
// // // // //       <ul>
// // // // //         {policies.map((policy, index) => (
// // // // //           <li key={index}>
// // // // //             <strong>{policy.name}</strong> - {policy.description}<br />
// // // // //             <em>Type:</em> {policy.type}, <em>Premium:</em> {policy.premium}, <em>Coverage:</em> {policy.coverage}
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CustomerPolicies;
// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   Typography,
// // // //   Grid,
// // // //   CircularProgress,
// // // // } from "@mui/material";

// // // // const CustomerPolicies = ({ riskScore }) => {
// // // //   const [policies, setPolicies] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchPolicies = async () => {
// // // //       try {
// // // //         const response = await fetch(
// // // //           `http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`
// // // //         );
// // // //         const data = await response.json();
// // // //         console.log("Fetched policies:", data);
// // // //         setPolicies(data);
// // // //       } catch (error) {
// // // //         console.error("Error fetching policies:", error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     if (riskScore) {
// // // //       fetchPolicies();
// // // //     }
// // // //   }, [riskScore]);

// // // //   if (loading) {
// // // //     return <CircularProgress />;
// // // //   }

// // // //   if (policies.length === 0) {
// // // //     return <Typography>No recommended policies found for this risk score.</Typography>;
// // // //   }

// // // //   return (
// // // //     <Grid container spacing={2}>
// // // //       {policies.map((policy, index) => (
// // // //         <Grid item xs={12} sm={6} md={4} key={index}>
// // // //           <Card variant="outlined">
// // // //             <CardContent>
// // // //               <Typography variant="h6">{policy.name}</Typography>
// // // //               <Typography color="textSecondary">{policy.type} Plan</Typography>
// // // //               <Typography>{policy.description}</Typography>
// // // //               <Typography>Premium: {policy.premium}</Typography>
// // // //               <Typography>Coverage: {policy.coverage}</Typography>
// // // //               <Typography>Risk Level: {policy.risk}</Typography>
// // // //               <Typography>
// // // //                 Duration: {policy.startDate} to {policy.endDate}
// // // //               </Typography>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </Grid>
// // // //       ))}
// // // //     </Grid>
// // // //   );
// // // // };

// // // // export default CustomerPolicies;
// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   Grid,
// // //   CircularProgress,
// // //   Container,
// // //   Alert,
// // // } from "@mui/material";

// // // const CustomerPolicies = ({ riskScore = "medium" }) => {
// // //   const [policies, setPolicies] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchPolicies = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);

// // //         const response = await fetch(
// // //           `http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error(`Server error: ${response.statusText}`);
// // //         }

// // //         const data = await response.json();
// // //         console.log("Fetched policies:", data);
// // //         setPolicies(data);
// // //       } catch (error) {
// // //         console.error("Error fetching policies:", error);
// // //         setError(error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (riskScore) fetchPolicies();
// // //   }, [riskScore]);

// // //   return (
// // //     <Container sx={{ py: 4 }}>
// // //       <Typography variant="h4" gutterBottom>
// // //         Recommended Policies
// // //       </Typography>

// // //       {loading ? (
// // //         <CircularProgress />
// // //       ) : error ? (
// // //         <Alert severity="error">{error}</Alert>
// // //       ) : policies.length === 0 ? (
// // //         <Typography>No policies found for risk level: {riskScore}</Typography>
// // //       ) : (
// // //         <Grid container spacing={3}>
// // //           {policies.map((policy, index) => (
// // //             <Grid item xs={12} sm={6} md={4} key={index}>
// // //               <Card variant="outlined">
// // //                 <CardContent>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     {policy.name}
// // //                   </Typography>
// // //                   <Typography variant="body2" color="text.secondary">
// // //                     {policy.description}
// // //                   </Typography>
// // //                   <Typography sx={{ mt: 1 }}>
// // //                     <strong>Premium:</strong> {policy.premium}
// // //                   </Typography>
// // //                   <Typography>
// // //                     <strong>Coverage:</strong> {policy.coverage}
// // //                   </Typography>
// // //                   <Typography>
// // //                     <strong>Type:</strong> {policy.type}
// // //                   </Typography>
// // //                   <Typography>
// // //                     <strong>Duration:</strong> {policy.startDate} to {policy.endDate}
// // //                   </Typography>
// // //                   <Typography>
// // //                     <strong>Risk:</strong> {policy.risk}
// // //                   </Typography>
// // //                 </CardContent>
// // //               </Card>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       )}
// // //     </Container>
// // //   );
// // // };

// // // export default CustomerPolicies;
// // import React, { useEffect, useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   Grid,
// //   CircularProgress,
// //   Container,
// //   Alert,
// // } from "@mui/material";

// // const CustomerPolicies = ({ riskScore = "0" }) => {
// //   const [policies, setPolicies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const getRiskLevelText = (score) => {
// //     const scoreNum = parseInt(score);
// //     if (scoreNum === 0) return 'Low';
// //     if (scoreNum === 1) return 'Medium';
// //     if (scoreNum === 2) return 'High';
// //     return 'Unknown';
// //   };

// //   useEffect(() => {
// //     const fetchPolicies = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const response = await fetch(
// //           `http://localhost:5000/api/policies/recommend?riskScore=${Number(riskScore)}`
// //         );

// //         if (!response.ok) {
// //           throw new Error(`Server error: ${response.statusText}`);
// //         }

// //         const data = await response.json();
// //         setPolicies(data);
// //       } catch (error) {
// //         console.error("Error fetching policies:", error);
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (riskScore) fetchPolicies();
// //   }, [riskScore]);

// //   return (
// //     <Container sx={{ py: 4 }}>
// //       <Typography variant="h4" gutterBottom>
// //         Recommended Policies ({getRiskLevelText(riskScore)} Risk)
// //       </Typography>

// //       {loading ? (
// //         <CircularProgress />
// //       ) : error ? (
// //         <Alert severity="error">{error}</Alert>
// //       ) : policies.length === 0 ? (
// //         <Typography>
// //           No policies found for {getRiskLevelText(riskScore)} risk level
// //         </Typography>
// //       ) : (
// //         <Grid container spacing={3}>
// //           {policies.map((policy, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={index}>
// //               <Card variant="outlined">
// //                 <CardContent>
// //                   <Typography variant="h6" gutterBottom>
// //                     {policy.name}
// //                   </Typography>
// //                   <Typography variant="body2" color="text.secondary">
// //                     {policy.description}
// //                   </Typography>
// //                   <Typography sx={{ mt: 1 }}>
// //                     <strong>Premium:</strong> {policy.premium}
// //                   </Typography>
// //                   <Typography>
// //                     <strong>Coverage:</strong> {policy.coverage}
// //                   </Typography>
// //                   <Typography>
// //                     <strong>Type:</strong> {policy.type}
// //                   </Typography>
// //                   <Typography>
// //                     <strong>Duration:</strong> {policy.startDate} to {policy.endDate}
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       )}
// //     </Container>
// //   );
// // };

// // export default CustomerPolicies;
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Container,
//   Alert,
// } from "@mui/material";

// const CustomerPolicies = () => {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const riskScore = localStorage.getItem('riskScore');

//   const getRiskLevelText = (score) => {
//     const scoreNum = parseInt(score, 10);
//     if (scoreNum === 0) return 'Low';
//     if (scoreNum === 1) return 'Medium';
//     if (scoreNum === 2) return 'High';
//     return 'Unknown';
//   };

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(
//           `http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`
//         );

//         if (!response.ok) {
//           throw new Error(`Server error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setPolicies(data);
//       } catch (error) {
//         console.error("Error fetching policies:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (riskScore) fetchPolicies();
//   }, [riskScore]);

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Recommended Policies ({getRiskLevelText(riskScore)} Risk)
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Alert severity="error">{error}</Alert>
//       ) : policies.length === 0 ? (
//         <Typography>
//           No policies found for {getRiskLevelText(riskScore)} risk level
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {policies.map((policy, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {policy.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {policy.description}
//                   </Typography>
//                   <Typography sx={{ mt: 1 }}>
//                     <strong>Premium:</strong> {policy.premium}
//                   </Typography>
//                   <Typography>
//                     <strong>Coverage:</strong> {policy.coverage}
//                   </Typography>
//                   <Typography>
//                     <strong>Type:</strong> {policy.type}
//                   </Typography>
//                   <Typography>
//                     <strong>Duration:</strong> {policy.startDate} to {policy.endDate}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default CustomerPolicies;
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Heart, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Clock,
  User
} from 'lucide-react';

const CustomerPolicies = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const riskScore = localStorage.getItem('riskScore');

  const getRiskLevelText = (score) => {
    const scoreNum = parseInt(score, 10);
    if (scoreNum === 0) return 'Low';
    if (scoreNum === 1) return 'Medium';
    if (scoreNum === 2) return 'High';
    return 'Unknown';
  };

  const getRiskColor = (score) => {
    const scoreNum = parseInt(score, 10);
    if (scoreNum === 0) return 'from-green-500 to-emerald-600';
    if (scoreNum === 1) return 'from-yellow-500 to-orange-500';
    if (scoreNum === 2) return 'from-red-500 to-pink-600';
    return 'from-gray-500 to-slate-600';
  };

  const getRiskBadgeColor = (score) => {
    const scoreNum = parseInt(score, 10);
    if (scoreNum === 0) return 'bg-green-100 text-green-800 border-green-200';
    if (scoreNum === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (scoreNum === 2) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPolicyIcon = (policyName) => {
    if (policyName?.toLowerCase().includes('critical') || policyName?.toLowerCase().includes('elite')) {
      return <Shield className="h-6 w-6" />;
    }
    if (policyName?.toLowerCase().includes('health') || policyName?.toLowerCase().includes('medical')) {
      return <Heart className="h-6 w-6" />;
    }
    if (policyName?.toLowerCase().includes('family')) {
      return <Users className="h-6 w-6" />;
    }
    return <Shield className="h-6 w-6" />;
  };

  const getCardGradient = (index) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-600',
      'from-violet-500 to-purple-600'
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:5000/api/policies/recommend?riskScore=${riskScore}`
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (riskScore) fetchPolicies();
  }, [riskScore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg font-semibold text-gray-700">Loading your personalized policy recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 hover:bg-gray-50 border-gray-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Profile</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getRiskColor(riskScore)} text-white`}>
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Policy Recommendations</h1>
                  <p className="text-sm text-gray-600">Based on your risk assessment</p>
                </div>
              </div>
            </div>
            <Badge className={`px-3 py-1 text-sm font-semibold ${getRiskBadgeColor(riskScore)}`}>
              {getRiskLevelText(riskScore)} Risk Profile
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Risk Level Info Card */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${getRiskColor(riskScore)}`}>
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Recommended Policies ({getRiskLevelText(riskScore)} Risk)
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Curated insurance plans tailored to your health profile and lifestyle needs
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{policies.length}</div>
                  <div className="text-sm text-gray-300">Available Plans</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Handling */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <strong>Error loading policies:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Policies Grid */}
        {policies.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mb-6">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Policies Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No policies found for {getRiskLevelText(riskScore)} risk level. Please contact our support team for assistance.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {policies.map((policy, index) => (
              <Card key={index} className="group border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <CardHeader className={`pb-4 bg-gradient-to-r ${getCardGradient(index)} text-white relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {getPolicyIcon(policy.name)}
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        {policy.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight">
                      {policy.name}
                    </CardTitle>
                    <CardDescription className="text-white/90 mt-2">
                      {policy.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Premium</span>
                      </div>
                      <p className="text-lg font-bold text-green-900">{policy.premium}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Coverage</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{policy.coverage}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700">Duration</span>
                      </div>
                      <div className="flex items-center space-x-1 text-purple-700">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">12 months</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-purple-900 mt-2">
                      {policy.startDate} to {policy.endDate}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">Instant Approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 capitalize">{policy.type}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button 
                    className={`w-full h-12 bg-gradient-to-r ${getCardGradient(index)} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                  >
                    Select This Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Action Section */}
        {policies.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-3">Need Help Choosing?</h3>
                  <p className="text-indigo-100 mb-6">
                    For further assistance or personalized recommendations, please visit the chatbot.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* <Button 
                      variant="outline" 
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
                    >
                      Schedule Consultation
                    </Button> */}
                    {/* <Button 
                      className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
                    >
                      Comp
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPolicies;
