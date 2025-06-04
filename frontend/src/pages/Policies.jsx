import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Check, Search, Filter, ArrowDown, ArrowUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    premium: "",
    coverage: "",
    risk: "",
  });
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    type: "",
    description: "",
    premium: "",
    coverage: "",
    startDate: "",
    endDate: "",
    duration:"",
    features: ["", "", ""],
    risk: ""
  });
  const { toast } = useToast();

  // Fetch policies on component mount
  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/policies");
      console.log("Fetched policies:", response.data);
      setPolicies(response.data);
      setFilteredPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error.response || error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to fetch policies.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newPolicy.features];
    updatedFeatures[index] = value;
    setNewPolicy({ ...newPolicy, features: updatedFeatures });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/policies/filter", {
        params: filters
      });
      console.log("Filtered policies:", response.data);
      const result = response.data;
      setFilteredPolicies(result);
      toast({
        title: "Filters applied",
        description: `Found ${result.length} matching policies.`,
      });
      setShowFilters(false);
    } catch (error) {
      console.error("Error filtering policies:", error.response || error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to apply filters.",
        variant: "destructive",
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      type: "",
      premium: "",
      coverage: "",
      risk: ""
    });
    setSortField(null);
    setSortDirection("asc");
    setFilteredPolicies(policies);
    toast({
      title: "Filters reset",
      description: "All policies are now displayed.",
    });
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sortedPolicies = [...filteredPolicies].sort((a, b) => {
      const valA = a[field] || "";
      const valB = b[field] || "";
      if (valA < valB) return newDirection === "asc" ? -1 : 1;
      if (valA > valB) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredPolicies(sortedPolicies);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  // const addPolicy = async () => {
  //   // Validate required fields
  //   const requiredFields = ['name', 'type', 'premium', 'coverage', 'risk'];
  //   const missingFields = requiredFields.filter(field => !newPolicy[field]?.trim());
  //   if (missingFields.length > 0) {
  //     toast({
  //       title: "Error",
  //       description: `Please fill in: ${missingFields.join(", ")}`,
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   try {
  //     console.log("Sending policy:", newPolicy);
  //     const response = await axios.post("http://localhost:5000/api/policies", newPolicy);
  //     console.log("Add policy response:", response.data);
  //     if (response.status === 201) {
  //       // Refresh policies from backend to confirm insertion
  //       await fetchPolicies();
  //       setShowAddForm(false);
  //       setShowTable(true);
  //       setNewPolicy({
  //         name: "",
  //         type: "",
  //         description: "",
  //         premium: "",
  //         coverage: "",
  //         startDate: "",
  //         endDate: "",
  //         duration:"",
  //         features: ["", "", ""],
  //         risk: ""
  //       });
  //       toast({
  //         title: "Policy added",
  //         description: "The policy has been successfully added.",
  //       });
  //     } else {
  //       throw new Error("Unexpected response status");
  //     }
  //   } catch (error) {
  //     console.error("Error adding policy:", error.response || error);
  //     toast({
  //       title: "Error",
  //       description: error.response?.data?.error || "Failed to add policy to database.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Insurance Policies</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setShowTable(!showAddForm);
                setShowFilters(false);
              }}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-black px-6 py-2 rounded-md shadow-md"
              size="lg"
            >
              <Plus size={20} /> Add New Policy
            </Button>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-black px-6 py-2 rounded-md shadow-md"
              size="lg"
            >
              <Filter size={20} /> {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {showFilters && (
              <Button
                onClick={applyFilters}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-black px-6 py-2 rounded-md shadow-md ml-auto"
                size="lg"
              >
                <Search size={20} /> Fetch Policies
              </Button>
            )}
          </div>

          {showFilters && (
            <Card className="mb-6 border border-gray-200 shadow-sm bg-gray-50">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl text-purple-800">Filter Policies</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Policy Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      placeholder="Search by policy name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Insurance Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      placeholder="Search by insurance type"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium">Premium Amount</Label>
                    <Input
                      id="premium"
                      name="premium"
                      value={filters.premium}
                      onChange={handleFilterChange}
                      placeholder="Search by premium amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverage">Coverage</Label>
                    <Input
                      id="coverage"
                      name="coverage"
                      value={filters.coverage}
                      onChange={handleFilterChange}
                      placeholder="Search by coverage amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <select
                      id="risk"
                      name="risk"
                      value={filters.risk}
                      onChange={handleFilterChange}
                      className="block w-full p-2 border rounded"
                    >
                      <option value="">All</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <X size={16} /> Reset
                </Button>
                <Button
                  onClick={applyFilters}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Search size={16} /> Fetch Policies
                </Button>
              </CardFooter>
            </Card>
          )}

          {showAddForm && (
            <Card className="mb-8 border border-gray-200 shadow-md bg-white">
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-indigo-800">Add New Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Insurance Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={newPolicy.type}
                      onChange={handleChange}
                      placeholder="e.g., Life Insurance, Car Insurance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Policy Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newPolicy.name}
                      onChange={handleChange}
                      placeholder="Enter policy name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium">Premium</Label>
                    <Input
                      id="premium"
                      name="premium"
                      value={newPolicy.premium}
                      onChange={handleChange}
                      placeholder="Enter premium amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverage">Coverage</Label>
                    <Input
                      id="coverage"
                      name="coverage"
                      value={newPolicy.coverage}
                      onChange={handleChange}
                      placeholder="Enter coverage amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <select
                      id="risk"
                      name="risk"
                      value={newPolicy.risk}
                      onChange={handleChange}
                      className="block w-full p-2 border rounded"
                    >
                      <option value="">Select Risk Level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newPolicy.description}
                      onChange={handleChange}
                      placeholder="Describe the policy"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date Of The Policiy</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      value={newPolicy.startDate}
                      onChange={handleChange}
                      placeholder="e.g., 10 Mar 2023"
                    />
                  </div> */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="endDate">End Date Of The Policiy</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      value={newPolicy.endDate}
                      onChange={handleChange}
                      placeholder="e.g., 9 Mar 2024"
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newPolicy.duration}
                      onChange={handleChange}
                      placeholder="e.g., 3yrs,4yrs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features</Label>
                    {newPolicy.features.map((feature, index) => (
                      <Input
                        key={index}
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="space-x-4">
                <Button
                  onClick={addPolicy}
                  className="bg-blue-500 hover:bg-blue-600 text-black px-6 py-2 rounded-md"
                >
                  Add Policy
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setShowTable(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-black px-6 py-2 rounded-md"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          )}

          {showTable && (
            <div className="mb-8 overflow-x-auto">
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-purple-50">
                        <TableHead
                          className="cursor-pointer hover:bg-purple-100 transition-colors"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center gap-2">
                            Name {getSortIcon("name")}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-purple-100 transition-colors"
                          onClick={() => handleSort("type")}
                        >
                          <div className="flex items-center gap-2">
                            Type {getSortIcon("type")}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-purple-100 transition-colors"
                          onClick={() => handleSort("risk")}
                        >
                          <div className="flex items-center gap-2">
                            Risk {getSortIcon("risk")}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-purple-100 transition-colors text-right"
                          onClick={() => handleSort("premium")}
                        >
                          <div className="flex items-center gap-2 justify-end">
                            Premium {getSortIcon("premium")}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-purple-100 transition-colors text-right"
                          onClick={() => handleSort("coverage")}
                        >
                          <div className="flex items-center gap-2 justify-end">
                            Coverage {getSortIcon("coverage")}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPolicies.map((policy) => (
                        <TableRow key={policy._id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{policy.name}</TableCell>
                          <TableCell>{policy.type}</TableCell>
                          <TableCell>{policy.risk}</TableCell>
                          <TableCell className="text-right">{policy.premium}</TableCell>
                          <TableCell className="text-right">{policy.coverage}</TableCell>
                        </TableRow>
                      ))}
                      {filteredPolicies.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No policies found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Policies;