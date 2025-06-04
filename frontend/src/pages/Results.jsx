
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const Results = () => {
  const navigate = useNavigate();
  const [riskScore, setRiskScore] = useState(null);
  
  useEffect(() => {
    // In a real application, this would come from your backend
    const savedScore = localStorage.getItem('riskScore');
    if (savedScore) {
      setRiskScore(parseInt(savedScore));
    }
  }, []);

  const getRiskCategory = (score) => {
    if (score < 30) return { category: 'Low Risk', color: 'text-green-600' };
    if (score < 60) return { category: 'Moderate Risk', color: 'text-yellow-600' };
    return { category: 'High Risk', color: 'text-red-600' };
  };

  const getProgressColor = (score) => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate('/profile')}
      >
        Back to Profile
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Your Health Assessment Results</h1>
      
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Health Risk Score</CardTitle>
            <CardDescription>Your AI-generated health risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {riskScore !== null ? (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <span className="text-5xl font-bold">{riskScore}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                
                <Progress 
                  value={riskScore} 
                  className="h-3"
                  style={{ 
                    background: 'rgba(0,0,0,0.1)', 
                    ['--progress-background']: getProgressColor(riskScore)
                  }} 
                />
                
                <div className="text-center mt-2">
                  <span className={`text-lg font-medium ${getRiskCategory(riskScore).color}`}>
                    {getRiskCategory(riskScore).category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No risk score available. Please complete the assessment.
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Personalized health and insurance recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {riskScore !== null ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Health Insights</h3>
                <p className="text-muted-foreground">
                  Based on your assessment, we recommend focusing on preventative care and regular check-ups.
                </p>
                
                <h3 className="font-medium text-lg mt-6">Insurance Options</h3>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Standard Health Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive coverage with a moderate premium based on your risk assessment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Complete the assessment to receive personalized recommendations.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={() => {
          // Ensure user is authenticated before navigating to customer dashboard
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userType', 'customer');
          navigate('/customer/dashboard');
        }}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Results;
