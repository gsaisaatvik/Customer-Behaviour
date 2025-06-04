import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";
import axios from 'axios';

const AgeDistributionChart = () => {
  const [ageGroups, setAgeGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch age distribution via HTTP
  // const fetchAges = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // const response = await fetch("/api/age-distribution");
  //     const response = await axios.get("http://localhost:5000/api/age-distribution");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
      
  //     if (Array.isArray(data)) {
  //       setAgeGroups(data);
  //     } else {
  //       console.error("Invalid data format");
  //       setError("Invalid data format received from server");
  //       // Fallback data
  //       setAgeGroups([
  //         { name: '<20', count: 2 },
  //         { name: '20-29', count: 32 },
  //         { name: '30-39', count: 19 },
  //         { name: '40-49', count: 29 },
  //         { name: '50-59', count: 8 },
  //         { name: '60+', count: 2 }
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching age data:", error);
  //     setError("Failed to fetch age distribution");
  //     // Fallback data for demo
  //     setAgeGroups([
  //       { name: '<20', count: 2 },
  //       { name: '20-29', count: 32 },
  //       { name: '30-39', count: 19 },
  //       { name: '40-49', count: 29 },
  //       { name: '50-59', count: 8 },
  //       { name: '60+', count: 2 }
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAges = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get("http://localhost:5000/api/age-distribution");
    const data = response.data;

    if (Array.isArray(data)) {
      setAgeGroups(data);
    } else {
      throw new Error("Invalid data format received from server");
    }
  } catch (error) {
    console.error("Error fetching age data:", error);
    setError("Failed to fetch age distribution");
    // Fallback demo data
    setAgeGroups([
      { name: '<20', count: 2 },
      { name: '20-29', count: 32 },
      { name: '30-39', count: 19 },
      { name: '40-49', count: 29 },
      { name: '50-59', count: 8 },
      { name: '60+', count: 2 }
    ]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    // Initial fetch
    fetchAges();

    // Connect to WebSocket
    let socket;
    try {
      socket = io(window.location.origin, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Handle WebSocket connection
      socket.on("connect", () => {
        console.log("Connected to WebSocket");
        setError(null);
      });

      // Handle incoming age distribution data
      socket.on("age_update", (data) => {
        console.log("Received age distribution via WebSocket:", data);
        if (Array.isArray(data)) {
          setAgeGroups(data);
          setError(null);
        }
      });

      // Handle WebSocket errors
      socket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err);
        // Fall back to polling on connection error
        fetchAges();
      });
    } catch (err) {
      console.error("Failed to initialize WebSocket:", err);
    }

    // Fallback polling (every 30 seconds)
    const pollingInterval = setInterval(fetchAges, 30000);

    // Cleanup
    return () => {
      if (socket) {
        socket.disconnect();
      }
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Age Distribution</h2>
      <div className="h-80 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageGroups} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} customers`, 'Count']}
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AgeDistributionChart;
