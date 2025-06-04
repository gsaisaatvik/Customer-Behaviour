import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Phone, Calendar, Edit2 } from 'lucide-react';

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user profile from localStorage
    const storedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (Object.keys(storedProfile).length > 0) {
      setProfile(storedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!profile.fullName || !profile.age || !profile.gender || !profile.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your personal details used for communication and identification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={profile.age}
                    onChange={handleChange}
                    placeholder="35"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center py-2">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-base">{profile.fullName || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-base">{profile.age || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Gender</p>
                    <p className="text-base">{profile.gender || 'Not provided'}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Your contact details for communication and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center py-2">
                  <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Phone Number</p>
                    <p className="text-base">{profile.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-base">{profile.email || 'Not provided'}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {isEditing && (
            <CardFooter>
              <Button onClick={handleSave} className="w-full">Save Changes</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Assessment Status</CardTitle>
          <CardDescription>
            Information about your health assessment and risk analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4">
            <p className="font-medium">No health assessment data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Take the health risk assessment to get personalized recommendations and insights about your health.
            </p>
            <Button className="mt-4" onClick={() => navigate('/assessment')}>
              Take Health Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfile;
