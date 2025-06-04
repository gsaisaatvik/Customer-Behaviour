import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation - in a real app, you'd check credentials against a backend
      if (email.includes('@') && password.length >= 6) {
        // Store user type in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'customer');
        
        toast({
          title: 'Login successful',
          description: 'Welcome to GANESH Insurance Platform',
        });
        navigate('/Pprofile');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Customer Login</CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1">
            Access your personalized health assessments and insurance recommendations.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button
              type="submit"
              className="w-full text-base px-6 bg-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="w-full flex flex-col gap-2">
              <p className="text-xs text-muted-foreground text-center">
                New customer? Contact your insurance agent to get started.
              </p>
              <Button 
                variant="link" 
                className="text-xs"
                onClick={() => navigate('/login/admin')}
              >
                Admin Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CustomerLogin;
