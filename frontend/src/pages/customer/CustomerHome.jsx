import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Shield, ChevronRight } from 'lucide-react';

const CustomerHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile.fullName) {
      setUserName(userProfile.fullName.split(' ')[0]);
    }

    // Check if user has taken assessment
    const assessmentData = localStorage.getItem('assessmentData');
    setHasAssessment(!!assessmentData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userName || 'Customer'}</h2>
        <Button onClick={() => navigate('/customer/profile')}>
          View Profile
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Health Risk Status
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hasAssessment ? 'Assessed' : 'Not Assessed'}
            </div>
            <p className="text-xs text-muted-foreground">
              {hasAssessment 
                ? 'Your health risk has been assessed' 
                : 'Take the assessment to understand your health risks'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Policies
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              View your active insurance policies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Health Status
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Complete your assessment to see your health status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <h3 className="text-xl font-semibold mt-6">Quick Actions</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:bg-accent transition-colors cursor-pointer" 
              onClick={() => navigate('/assessment')}>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium">Take Health Assessment</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Answer questions about your health to get personalized recommendations
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="hover:bg-accent transition-colors cursor-pointer"
              onClick={() => navigate('/customer/policies')}>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium">Browse Policies</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Explore insurance policies tailored to your needs
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
      </div>

      {/* Recommended Policies */}
      <h3 className="text-xl font-semibold mt-6">Recommended For You</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Health Shield Premium</CardTitle>
            <CardDescription>Comprehensive health coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our most comprehensive plan covering hospitalization, medicines, and procedures.
            </p>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/customer/policies')}>
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Family Protection Plan</CardTitle>
            <CardDescription>Coverage for the whole family</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Protect your entire family with our comprehensive family insurance plan.
            </p>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/customer/policies')}>
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Senior Care Plus</CardTitle>
            <CardDescription>Specialized care for seniors</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Tailored coverage for seniors with focus on long-term care and regular checkups.
            </p>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/customer/policies')}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerHome;
