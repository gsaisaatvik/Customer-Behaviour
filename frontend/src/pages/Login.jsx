import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">GANESH Insurance</CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1">
            Secure your future, starting today.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-center text-lg font-medium">Select Login Type</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer" 
                  onClick={() => navigate('/login/customer')}>
              <CardContent className="flex items-center p-6">
                <User className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">Customer Login</h3>
                  <p className="text-sm text-muted-foreground">Access your assessments and recommendations</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer" 
                  onClick={() => navigate('/login/admin')}>
              <CardContent className="flex items-center p-6">
                <ShieldCheck className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">Admin Login</h3>
                  <p className="text-sm text-muted-foreground">Access admin dashboard and controls</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
