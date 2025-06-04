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
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation - in a real app, you'd check admin credentials against a backend
      if (username === 'admin' && password === 'admin123') {
        // Store user type in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'admin');
        
        toast({
          title: 'Admin login successful',
          description: 'Welcome to GANESH Insurance Admin Panel',
        });
        navigate('/admin'); // Redirecting to admin dashboard
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      toast({
        title: 'Admin login failed',
        description: 'Invalid username or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/20 via-slate-900/20 to-gray-900/20">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1">
            Secure access for GANESH Insurance administrators.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              {isLoading ? 'Signing in...' : 'Admin Sign In'}
            </Button>
            <div className="w-full flex flex-col gap-2">
              <p className="text-xs text-muted-foreground text-center">
                For administrative staff only. Unauthorized access is prohibited.
              </p>
              <Button 
                variant="link" 
                className="text-xs"
                onClick={() => navigate('/login/customer')}
              >
                Customer Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
