
// Mock data for the health insurance admin dashboard
export const customerData = [
  {
    id: 1,
    age: 42,
    gender: "Male",
    preExistingConditions: "Yes",
    health_conditions: "Diabetes, Hypertension",
    smoker: "No",
    alcohol_consumption: "occasionally",
    bmi: 27.8,
    bmi_category: "overweight",
    exercise_frequency: "rarely",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "high",
    riskScore: 75,
    riskCategory: 2 // High risk
  },
  {
    id: 2,
    age: 29,
    gender: "Female",
    preExistingConditions: "No",
    health_conditions: "",
    smoker: "No",
    alcohol_consumption: "occasionally",
    bmi: 21.3,
    bmi_category: "normal weight",
    exercise_frequency: "daily",
    regularCheckups: "Yes",
    family_history: "No",
    stress_level: "low",
    riskScore: 15,
    riskCategory: 0 // Low risk
  },
  {
    id: 3,
    age: 35,
    gender: "Male",
    preExistingConditions: "No",
    health_conditions: "Asthma",
    smoker: "Yes",
    alcohol_consumption: "regularly",
    bmi: 24.7,
    bmi_category: "normal weight",
    exercise_frequency: "rarely",
    regularCheckups: "No",
    family_history: "No",
    stress_level: "medium",
    riskScore: 45,
    riskCategory: 1 // Medium risk
  },
  {
    id: 4,
    age: 58,
    gender: "Female",
    preExistingConditions: "Yes",
    health_conditions: "Arthritis, Heart Disease",
    smoker: "No",
    alcohol_consumption: "never",
    bmi: 31.2,
    bmi_category: "obese",
    exercise_frequency: "rarely",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "medium",
    riskScore: 80,
    riskCategory: 2 // High risk
  },
  {
    id: 5,
    age: 22,
    gender: "Male",
    preExistingConditions: "No",
    health_conditions: "",
    smoker: "Yes",
    alcohol_consumption: "regularly",
    bmi: 20.8,
    bmi_category: "normal weight",
    exercise_frequency: "few_times_week",
    regularCheckups: "No",
    family_history: "No",
    stress_level: "medium",
    riskScore: 35,
    riskCategory: 1 // Medium risk
  },
  {
    id: 6,
    age: 45,
    gender: "Female",
    preExistingConditions: "Yes",
    health_conditions: "Thyroid Disorder",
    smoker: "No",
    alcohol_consumption: "occasionally",
    bmi: 29.6,
    bmi_category: "overweight",
    exercise_frequency: "rarely",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "high",
    riskScore: 60,
    riskCategory: 1 // Medium risk
  },
  {
    id: 7,
    age: 68,
    gender: "Male",
    preExistingConditions: "Yes",
    health_conditions: "Diabetes, High Cholesterol, Hypertension",
    smoker: "Yes",
    alcohol_consumption: "occasionally",
    bmi: 32.9,
    bmi_category: "obese",
    exercise_frequency: "never",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "high",
    riskScore: 90,
    riskCategory: 2 // High risk
  },
  {
    id: 8,
    age: 32,
    gender: "Female",
    preExistingConditions: "No",
    health_conditions: "",
    smoker: "No",
    alcohol_consumption: "occasionally",
    bmi: 23.1,
    bmi_category: "normal weight",
    exercise_frequency: "daily",
    regularCheckups: "Yes",
    family_history: "No",
    stress_level: "low",
    riskScore: 20,
    riskCategory: 0 // Low risk
  },
  {
    id: 9,
    age: 50,
    gender: "Male",
    preExistingConditions: "Yes",
    health_conditions: "High Cholesterol",
    smoker: "No",
    alcohol_consumption: "regularly",
    bmi: 26.8,
    bmi_category: "overweight",
    exercise_frequency: "few_times_week",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "medium",
    riskScore: 55,
    riskCategory: 1 // Medium risk
  },
  {
    id: 10,
    age: 75,
    gender: "Female",
    preExistingConditions: "Yes",
    health_conditions: "Arthritis, Osteoporosis, Hypertension",
    smoker: "No",
    alcohol_consumption: "never",
    bmi: 19.3,
    bmi_category: "normal weight",
    exercise_frequency: "rarely",
    regularCheckups: "Yes",
    family_history: "Yes",
    stress_level: "low",
    riskScore: 70,
    riskCategory: 2 // High risk
  }
];

// Derived statistics
export const stats = {
  totalCustomers: customerData.length,
  
  averageAge: customerData.reduce((sum, customer) => sum + customer.age, 0) / customerData.length,
  
  genderDistribution: {
    male: customerData.filter(customer => customer.gender === "Male").length,
    female: customerData.filter(customer => customer.gender === "Female").length
  },
  
  riskDistribution: {
    low: customerData.filter(customer => customer.riskCategory === 0).length,
    medium: customerData.filter(customer => customer.riskCategory === 1).length,
    high: customerData.filter(customer => customer.riskCategory === 2).length
  },
  
  preExistingConditions: customerData.filter(customer => customer.preExistingConditions === "Yes").length,
  
  smokers: customerData.filter(customer => customer.smoker === "Yes").length,
  
  alcoholConsumption: {
    never: customerData.filter(customer => customer.alcohol_consumption === "never").length,
    occasionally: customerData.filter(customer => customer.alcohol_consumption === "occasionally").length,
    regularly: customerData.filter(customer => customer.alcohol_consumption === "regularly").length
  },
  
  bmiCategories: {
    underweight: customerData.filter(customer => customer.bmi_category === "underweight").length,
    normalWeight: customerData.filter(customer => customer.bmi_category === "normal weight").length,
    overweight: customerData.filter(customer => customer.bmi_category === "overweight").length,
    obese: customerData.filter(customer => customer.bmi_category === "obese").length
  },
  
  exerciseFrequency: {
    never: customerData.filter(customer => customer.exercise_frequency === "never").length,
    rarely: customerData.filter(customer => customer.exercise_frequency === "rarely").length,
    fewTimesWeek: customerData.filter(customer => customer.exercise_frequency === "few_times_week").length,
    daily: customerData.filter(customer => customer.exercise_frequency === "daily").length
  },
  
  regularCheckups: customerData.filter(customer => customer.regularCheckups === "Yes").length,
  
  familyHistory: customerData.filter(customer => customer.family_history === "Yes").length,
  
  stressLevels: {
    low: customerData.filter(customer => customer.stress_level === "low").length,
    medium: customerData.filter(customer => customer.stress_level === "medium").length,
    high: customerData.filter(customer => customer.stress_level === "high").length
  },
  
  averageRiskScore: customerData.reduce((sum, customer) => sum + customer.riskScore, 0) / customerData.length
};

// Common health conditions
export const healthConditions = customerData
  .map(customer => customer.health_conditions)
  .filter(conditions => conditions !== "")
  .flatMap(conditions => conditions.split(", "))
  .reduce((counts, condition) => {
    counts[condition] = (counts[condition] || 0) + 1;
    return counts;
  }, {});

// Monthly statistics (mock data for trends)
export const monthlyStats = [
  { month: "Jan", newCustomers: 45, riskScore: 42 },
  { month: "Feb", newCustomers: 52, riskScore: 45 },
  { month: "Mar", newCustomers: 48, riskScore: 43 },
  { month: "Apr", newCustomers: 61, riskScore: 48 },
  { month: "May", newCustomers: 55, riskScore: 46 },
  { month: "Jun", newCustomers: 67, riskScore: 50 },
  { month: "Jul", newCustomers: 70, riskScore: 53 },
  { month: "Aug", newCustomers: 73, riskScore: 54 },
  { month: "Sep", newCustomers: 79, riskScore: 58 },
  { month: "Oct", newCustomers: 68, riskScore: 55 },
  { month: "Nov", newCustomers: 65, riskScore: 52 },
  { month: "Dec", newCustomers: 59, riskScore: 50 }
];

// Age groups
export const ageGroups = [
  { name: "18-25", count: customerData.filter(c => c.age >= 18 && c.age <= 25).length },
  { name: "26-35", count: customerData.filter(c => c.age >= 26 && c.age <= 35).length },
  { name: "36-45", count: customerData.filter(c => c.age >= 36 && c.age <= 45).length },
  { name: "46-55", count: customerData.filter(c => c.age >= 46 && c.age <= 55).length },
  { name: "56-65", count: customerData.filter(c => c.age >= 56 && c.age <= 65).length },
  { name: "66+", count: customerData.filter(c => c.age >= 66).length }
];
