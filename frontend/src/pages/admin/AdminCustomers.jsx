import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter } from "lucide-react";

const AdminCustomers = () => {
  const [filters, setFilters] = useState({
    ageMin: "",
    ageMax: "",
    gender: "",
    bmiMin: "",
    bmiMax: "",
    riskScoreMin: "",
    riskScoreMax: "",
    preExistingConditions: "",
    riskCategory: "",
  });

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers/all");
        const data = await response.json();
        setAllCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = allCustomers.filter((customer) => {
      if (filters.ageMin && customer.age < parseInt(filters.ageMin)) return false;
      if (filters.ageMax && customer.age > parseInt(filters.ageMax)) return false;
      if (filters.gender && filters.gender !== "all" && customer.gender !== filters.gender) return false;
      if (filters.bmiMin && customer.bmi < parseFloat(filters.bmiMin)) return false;
      if (filters.bmiMax && customer.bmi > parseFloat(filters.bmiMax)) return false;
      if (filters.riskScoreMin && customer.riskScore < parseInt(filters.riskScoreMin)) return false;
      if (filters.riskScoreMax && customer.riskScore > parseInt(filters.riskScoreMax)) return false;
      if (filters.preExistingConditions && filters.preExistingConditions !== "all" &&
          customer.preExistingConditions !== filters.preExistingConditions) return false;
      if (filters.riskCategory && filters.riskCategory !== "all") {
        const category = parseInt(filters.riskCategory);
        if (customer.riskScore !== category) return false; // ← updated
      }
      return true;
    });

    setFilteredCustomers(filtered);
  };

  const resetFilters = () => {
    setFilters({
      ageMin: "",
      ageMax: "",
      gender: "",
      bmiMin: "",
      bmiMax: "",
      riskScoreMin: "",
      riskScoreMax: "",
      preExistingConditions: "",
      riskCategory: "",
    });
    setFilteredCustomers(allCustomers);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Customer Data Report", 14, 15);

    const tableColumn = [
      "ID",
      "Age",
      "Gender",
      "BMI (Category)",
      "Pre-existing Conditions",
      "Risk Score",
      "Risk Category",
    ];

    const tableRows = filteredCustomers.map((customer, index) => [
      customer.id || index + 1,
      customer.age,
      customer.gender,
      `${customer.bmi} (${customer.bmi_category})`,
      customer.preExistingConditions,
      customer.riskScore,
      customer.riskScore === 0 ? "Low" : customer.riskScore === 1 ? "Medium" : "High",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("customer_data.pdf");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer Data</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={exportToPDF}
            >
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Advanced Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label>Age Range</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input name="ageMin" value={filters.ageMin} onChange={handleInputChange} placeholder="Min" type="number" />
                    <span>to</span>
                    <Input name="ageMax" value={filters.ageMax} onChange={handleInputChange} placeholder="Max" type="number" />
                  </div>
                </div>

                <div>
                  <Label>Gender</Label>
                  <select name="gender" value={filters.gender} onChange={handleInputChange} className="w-full h-10 border rounded px-2 mt-1">
                    <option value="">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>


                <div>
                  <Label>Risk Category</Label>
                  <select name="riskCategory" value={filters.riskCategory} onChange={handleInputChange} className="w-full h-10 border rounded px-2 mt-1">
                    <option value="">Any</option>
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>Pre-existing Conditions</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Risk Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>#{customer.id || index + 1}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                  <TableCell>{customer.bmi} ({customer.bmi_category})</TableCell>
                  <TableCell>{customer.preExistingConditions}</TableCell>
                  <TableCell>{customer.riskScore}</TableCell>
                  <TableCell>
                    {customer.riskScore === 0
                      ? "Low"
                      : customer.riskScore === 1
                      ? "Medium"
                      : "High"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCustomers;
