import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

  const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.fullName || !profile.age || !profile.gender || !profile.phoneNumber) {
      alert("Please fill in all required fields!");
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate('/login')}
      >
        Back to Login
      </Button>

      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Profile Details</CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-base"
            />

            <input
              type="number"
              name="age"
              placeholder="Age*"
              value={profile.age}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-base"
            />

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-base bg-white"
            >
              <option value="">Select Gender*</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number*"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-base"
            />

            <input
              type="email"
              name="email"
              placeholder="Email (Optional)"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-md p-3 text-base"
            />

            <Button 
              type="submit" 
              variant="blue" 
              className="w-full text-white bg-blue-600 hover:bg-blue-700"
            >
              Save and Continue →
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
