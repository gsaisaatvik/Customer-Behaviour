import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart, Activity, Users, Heart, Zap } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Detailed analysis of customer behavior and health trends
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Distribution
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68% Low Risk</div>
            <p className="text-xs text-muted-foreground">
              Based on customer health assessments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Age
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37.5 years</div>
            <p className="text-xs text-muted-foreground">
              Across all registered customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Health Score
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72/100</div>
            <p className="text-xs text-muted-foreground">
              Average across all assessments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.2%</div>
            <p className="text-xs text-muted-foreground">
              From assessment to policy purchase
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Health Risk Distribution</CardTitle>
            <CardDescription>
              Customer distribution by health risk category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <PieChart className="h-20 w-20 text-primary/60" />
              <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-xs">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mb-2"></div>
                  <div className="text-sm font-medium">Low Risk</div>
                  <div className="text-xl font-bold">68%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mb-2"></div>
                  <div className="text-sm font-medium">Medium</div>
                  <div className="text-xl font-bold">24%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mb-2"></div>
                  <div className="text-sm font-medium">High Risk</div>
                  <div className="text-xl font-bold">8%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Assessment Trends</CardTitle>
            <CardDescription>
              Monthly assessment completion trends
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <LineChart className="h-20 w-20 text-primary/60" />
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Interactive line chart visualization would appear here.
                <br />
                This would show monthly assessment completion trends.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Condition Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Health Condition Analysis</CardTitle>
          <CardDescription>
            Prevalence of health conditions across customer base
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="flex flex-col items-center w-full">
            <BarChart className="h-20 w-20 text-primary/60 mb-6" />
            
            <div className="w-full max-w-3xl">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Hypertension</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Diabetes</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Heart Disease</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Obesity</span>
                    <span className="text-sm font-medium">27%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '27%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Respiratory Issues</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographics Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>
              Customers by age group
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <div className="flex justify-between items-end h-40 mt-6">
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '30%' }}></div>
                <span className="text-xs mt-2">18-25</span>
                <span className="text-xs font-medium">15%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '70%' }}></div>
                <span className="text-xs mt-2">26-35</span>
                <span className="text-xs font-medium">35%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '90%' }}></div>
                <span className="text-xs mt-2">36-45</span>
                <span className="text-xs font-medium">45%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '60%' }}></div>
                <span className="text-xs mt-2">46-55</span>
                <span className="text-xs font-medium">30%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '40%' }}></div>
                <span className="text-xs mt-2">56-65</span>
                <span className="text-xs font-medium">20%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/70 w-12 rounded-t-md" style={{ height: '20%' }}></div>
                <span className="text-xs mt-2">65+</span>
                <span className="text-xs font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>
              Customers by state
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Geographic map visualization would appear here.
                </p>
                <p className="text-sm text-muted-foreground">
                  Top states: Maharashtra (22%), Karnataka (18%), Delhi (15%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
