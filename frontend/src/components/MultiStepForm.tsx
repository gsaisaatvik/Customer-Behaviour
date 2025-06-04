
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react';

type FormData = {
  age: string;
  gender: string;
  preExistingConditions: string;
  selectedConditions: string[];
  smoker: string;
  alcoholConsumption: string;
  height: string;
  weight: string;
  bmi: string;
  bmiCategory: string;
  exerciseFrequency: string;
  regularCheckups: string;
  familyHistory: string;
  stressLevel: string;
  diabetes: string;
  heartDisease: string;
  cancer: string;
  highBloodPressure: string;
  highCholesterol: string;
  chronicPain: string;
};

interface MultiStepFormProps {
  onComplete: (formData: FormData) => void;
  isSubmitting: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ 
  onComplete,
  isSubmitting
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    preExistingConditions: '',
    selectedConditions: [],
    smoker: '',
    alcoholConsumption: '',
    height: '',
    weight: '',
    bmi: '',
    bmiCategory: '',
    exerciseFrequency: '',
    regularCheckups: '',
    familyHistory: '',
    stressLevel: '',
    diabetes: '',
    heartDisease: '',
    cancer: '',
    highBloodPressure: '',
    highCholesterol: '',
    chronicPain: '',
  });
  const [error, setError] = useState("");

  const calculateBMI = () => {
    const height = Number(formData.height);
    const weight = Number(formData.weight);
    const heightInMeters = height / 100;
    
    if (heightInMeters > 0 && weight > 0) {
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      let category = '';
      
      if (+bmiValue < 18.5) category = 'Underweight';
      else if (+bmiValue >= 18.5 && +bmiValue < 24.9) category = 'Normal weight';
      else if (+bmiValue >= 25 && +bmiValue < 29.9) category = 'Overweight';
      else category = 'Obese';

      setFormData((prevData) => ({
        ...prevData,
        bmi: bmiValue,
        bmiCategory: category,
      }));
    }
  };

  const handleChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prevData) => {
      const updatedList = checked
        ? [...prevData.selectedConditions, value]
        : prevData.selectedConditions.filter((item) => item !== value);
      return { ...prevData, selectedConditions: updatedList };
    });
  };

  const validateStep = (): string => {
    switch (currentStep) {
      case 0:
        if (!formData.age || !formData.gender) return "Please enter age and select gender.";
        break;
      case 1:
        if (!formData.preExistingConditions) return "Please select an option.";
        if (formData.preExistingConditions === "yes" && formData.selectedConditions.length === 0) {
          return "Please select at least one condition.";
        }
        break;
      case 2:
        if (!formData.smoker) return "Please select an option.";
        break;
      case 3:
        if (!formData.alcoholConsumption) return "Please select an option.";
        break;
      case 4:
        if (!formData.height || !formData.weight) return "Please enter height and weight.";
        break;
      case 5:
        if (!formData.exerciseFrequency) return "Please select an option.";
        break;
      case 6:
        if (!formData.regularCheckups) return "Please select an option.";
        break;
      case 7:
        if (!formData.familyHistory) return "Please select an option.";
        break;
      case 8:
        if (!formData.stressLevel) return "Please select an option.";
        break;
      default:
        return "";
    }
    return "";
  };

  const formSteps = [
    {
      title: "Basic Information",
      description: "Let's start with some basic information about you",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="max-w-[180px]"
              placeholder="Enter your age"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleChange('gender', value)}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="gender-male" />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="gender-female" />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="gender-other" />
                  <Label htmlFor="gender-other">Other</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    },
    {
      title: "Pre-existing Conditions",
      description: "Information about your medical history",
      component: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Do you have any pre-existing medical conditions?</Label>
            <RadioGroup
              value={formData.preExistingConditions}
              onValueChange={(value) => handleChange('preExistingConditions', value)}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="conditions-yes" />
                  <Label htmlFor="conditions-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="conditions-no" />
                  <Label htmlFor="conditions-no">No</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {formData.preExistingConditions === "yes" && (
            <div className="space-y-3 border rounded-md p-4 bg-accent">
              <Label className="block mb-2">Select all that apply:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Diabetes",
                  "Blood Pressure",
                  "Heart Disease",
                  "Cancer",
                  "Thyroid",
                  "Asthma",
                  "Other Disease",
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`condition-${condition}`}
                      checked={formData.selectedConditions.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(condition, checked as boolean)
                      }
                    />
                    <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Smoking Habits",
      description: "Information about your smoking habits",
      component: (
        <div className="space-y-4">
          <Label>Are you a smoker?</Label>
          <RadioGroup
            value={formData.smoker}
            onValueChange={(value) => handleChange('smoker', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="smoker-yes" />
                <Label htmlFor="smoker-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="smoker-no" />
                <Label htmlFor="smoker-no">No</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "Alcohol Consumption",
      description: "Information about your alcohol consumption",
      component: (
        <div className="space-y-4">
          <Label>Do you consume alcohol?</Label>
          <RadioGroup
            value={formData.alcoholConsumption}
            onValueChange={(value) => handleChange('alcoholConsumption', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="alcohol-never" />
                <Label htmlFor="alcohol-never">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="occasionally" id="alcohol-occasionally" />
                <Label htmlFor="alcohol-occasionally">Occasionally</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regularly" id="alcohol-regularly" />
                <Label htmlFor="alcohol-regularly">Regularly</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "BMI Calculation",
      description: "Calculate your Body Mass Index (BMI)",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (in cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="Enter your height in cm"
              className="max-w-[180px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (in kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="Enter your weight in kg"
              className="max-w-[180px]"
            />
          </div>
          <Button 
            variant="secondary" 
            onClick={calculateBMI}
            type="button" 
            className="mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" /> Calculate BMI
          </Button>
          
          {formData.bmi && (
            <div className="mt-4 p-4 border rounded-md bg-accent">
              <p className="font-medium">Your BMI is: {formData.bmi}</p>
              <p className={`mt-1 ${
                formData.bmiCategory === 'Normal weight' 
                  ? 'text-green-600' 
                  : 'text-amber-600'
              }`}>
                Category: {formData.bmiCategory}
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Exercise Frequency",
      description: "Information about your physical activity",
      component: (
        <div className="space-y-4">
          <Label>How often do you exercise per week?</Label>
          <RadioGroup
            value={formData.exerciseFrequency}
            onValueChange={(value) => handleChange('exerciseFrequency', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="exercise-daily" />
                <Label htmlFor="exercise-daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fewTimesWeek" id="exercise-few" />
                <Label htmlFor="exercise-few">A few times a week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rarely" id="exercise-rarely" />
                <Label htmlFor="exercise-rarely">Rarely</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="exercise-never" />
                <Label htmlFor="exercise-never">Never</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "Regular Checkups",
      description: "Information about your preventive healthcare",
      component: (
        <div className="space-y-4">
          <Label>Do you attend regular medical checkups?</Label>
          <RadioGroup
            value={formData.regularCheckups}
            onValueChange={(value) => handleChange('regularCheckups', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="checkups-yes" />
                <Label htmlFor="checkups-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="checkups-no" />
                <Label htmlFor="checkups-no">No</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "Family History",
      description: "Information about your family medical history",
      component: (
        <div className="space-y-4">
          <Label>Do you have a family history of serious illnesses?</Label>
          <RadioGroup
            value={formData.familyHistory}
            onValueChange={(value) => handleChange('familyHistory', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="family-yes" />
                <Label htmlFor="family-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="family-no" />
                <Label htmlFor="family-no">No</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "Stress Level",
      description: "Information about your mental wellbeing",
      component: (
        <div className="space-y-4">
          <Label>How would you describe your daily stress level?</Label>
          <RadioGroup
            value={formData.stressLevel}
            onValueChange={(value) => handleChange('stressLevel', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="stress-low" />
                <Label htmlFor="stress-low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="stress-medium" />
                <Label htmlFor="stress-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="stress-high" />
                <Label htmlFor="stress-high">High</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    }
  ];

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
    setError("");
  };

  const currentStepData = formSteps[currentStep];
  const progress = currentStep === formSteps.length ? 100 : (currentStep / formSteps.length) * 100;


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{currentStepData.title}</h2>
        <p className="text-muted-foreground">{currentStepData.description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep + 1} of {formSteps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6 py-4">
        {currentStepData.component}
        
        {error && (
          <div className="p-3 mt-4 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {currentStep < formSteps.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : isSubmitting ? (
            "Processing..."
          ) : (
            "Complete Assessment"
          )}
        </Button>
      </div>
    </div>
  );
};
