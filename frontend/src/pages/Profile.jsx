// import React, { useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';

// const Profile = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://cdn.botpress.cloud/webchat/v2.5/webchat.js";
//     script.async = true;
//     script.onload = () => {
//       window.botpressWebChat.init({
//         configUrl: 'https://files.bpcontent.cloud/2025/05/28/16/20250528161423-YW8ZFC3J.json',
//         botId: 'ganesh-insurance-bot',
//         hostUrl: 'https://cdn.botpress.cloud/webchat/v2.5',
//         containerWidth: '100%',
//         layoutWidth: '100%',
//         enableConversationDeletion: false,
//         showCloseButton: false,
//         hideWidget: true,
//       });

//       window.botpressWebChat.sendEvent({ type: 'show' });
//     };
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-10 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-6">Your Health Profile</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Health Assessment</CardTitle>
//             <CardDescription>Complete your health assessment to get personalized insights</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground mb-4">
//               Our AI-powered assessment helps us understand your health profile and provide tailored recommendations.
//             </p>
//             <Button 
//               onClick={() => navigate('/assessment')}
//               className="w-full flex items-center justify-center gap-2"
//             >
//               Start Assessment <ChevronRight size={16} />
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Chat with Ganesh AI.</CardTitle>
//             <CardDescription>Ask questions, explore policies, and get real-time help. Upgrade for personalised premium suggestions</CardDescription>
//           </CardHeader>
//           <CardContent>
            

//             {/* 👇 Inserted image before the button */}
//             <img 
//               src="./image.png" 
//               alt="Chatbot Banner" 
//               className="w-full h-auto rounded-md mb-4 object-cover"
//             />

//             <Button 
//               variant="outline" 
//               className="w-full"
//               onClick={() =>
//                 window.open(
//                   'https://cdn.botpress.cloud/webchat/v2.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/28/16/20250528161423-YW8ZFC3J.json',
//                   '_blank'
//                 )
//               }
//             >
//               Launch Full Chat
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  User, Mail, Phone, Calendar, Edit2, CheckCircle, AlertCircle, UserCheck, LogOut
} from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    if (!profile.fullName || !profile.age || !profile.gender || !profile.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 relative">
      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg mb-4">
            <UserCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your personal information and keep your profile up to date for better service
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center mb-8">
          <Button 
            size="lg"
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
              isEditing 
                ? 'border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 hover:bg-gray-50' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            <Edit2 className="h-5 w-5 mr-2" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </div>

        {/* Personal & Contact Info */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Personal Info Card */}
          <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                  <CardDescription className="text-blue-100 mt-1">
                    Your personal details for identification and communication
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      Age *
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={profile.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      Gender *
                    </Label>
                    <select
                      id="gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
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
                  <InfoDisplay icon={<User className="text-blue-600" />} label="Full Name" value={profile.fullName} />
                  <InfoDisplay icon={<Calendar className="text-green-600" />} label="Age" value={profile.age} />
                  <InfoDisplay icon={<User className="text-purple-600" />} label="Gender" value={profile.gender} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
                  <CardDescription className="text-emerald-100 mt-1">
                    Your contact details for notifications and support
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                  </div>
                </>
              ) : (
                <>
                  <InfoDisplay icon={<Phone className="text-emerald-600" />} label="Phone Number" value={profile.phoneNumber} />
                  <InfoDisplay icon={<Mail className="text-blue-600" />} label="Email Address" value={profile.email} />
                </>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="p-6 bg-gray-50">
                <Button 
                  onClick={handleSave} 
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Health Assessment Card */}
        <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          {/* <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Health Assessment Status</CardTitle>
                <CardDescription className="text-orange-100 mt-1">
                  Complete your health assessment for personalized recommendations
                </CardDescription>
              </div>
            </div>
          </CardHeader> */}
          <CardContent className="p-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100 text-center">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
                <AlertCircle className="h-8 w-8 text-white" />
              </div> */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check your eligibility for Insurance</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Take our health risk assessment to receive personalized policy recommendations and valuable insights about your health and wellness.
              </p>
              <Button 
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => navigate('/assessment')}
              >
                Take Health Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const InfoDisplay = ({ icon, label, value }) => (
  <div className="flex items-center py-4 px-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-gray-200">
    <div className="p-3 bg-gray-100 rounded-lg mr-4">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-gray-900 mt-1">{value || 'Not provided'}</p>
    </div>
    {value && <CheckCircle className="h-5 w-5 text-green-500" />}
  </div>
);

export default Profile;
