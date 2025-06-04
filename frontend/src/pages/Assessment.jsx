import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MultiStepForm } from '@/components/MultiStepForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const Assessment = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [riskResult, setRiskResult] = useState(null);

  const handleComplete = async (formData) => {
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      const healthData = {
        bmi: formData.bmi || '',
        bmiCategory: formData.bmiCategory || '',
        conditions: formData.selectedConditions || [],
        age: formData.age,
        smoker: formData.smoker,
        exercise: formData.exerciseFrequency,
        prediction: result.prediction,
        riskScore: result.riskScore,
      };

      setRiskResult({
        riskScore: result.riskScore,
        isEligible: result.riskScore < 2,
      });
      setShowResult(true);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getRiskLevel = (score) => {
    if (score === 0) return 'Low';
    if (score === 1) return 'Medium';
    return 'High';
  };

  const getRiskMessage = (score) => {
    if (score === 2) {
      return (
        <span className="text-red-600 font-semibold">
          NOT ELIGIBLE for insurance. Your risk is high.
        </span>
      );
    } else {
      return (
        <span className="text-green-600 font-semibold">
          You are ELIGIBLE for insurance.{score === 0 ? 'Your risk is low.' : 'Your risk is medium.'}
        </span>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate('/profile')}
      >
        Back to Profile
      </Button>

      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Health Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MultiStepForm onComplete={handleComplete} isSubmitting={submitting} />
        </CardContent>
      </Card>

      {/* Modal to show risk result */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assessment Result</DialogTitle>
            <DialogDescription>
              Your Risk Level and Health Insurance Eligibility
            </DialogDescription>
          </DialogHeader>

          {riskResult && (
            <div className="space-y-4">
              <p className="text-lg font-medium">
                Risk Level:{" "}
                <span className="text-primary">{getRiskLevel(riskResult.riskScore)}</span>
              </p>
              <p className="text-base">{getRiskMessage(riskResult.riskScore)}</p>
              <p className="text-muted-foreground">Stay tuned for more updates!</p>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button onClick={() => {
              localStorage.setItem('riskScore', riskResult.riskScore);
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('userType', 'customer');
              navigate('/customer/policies');
            }}>
              View Policies
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assessment;
