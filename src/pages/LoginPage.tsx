```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Phone, Lock, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  isAdmin?: boolean;
}

export default function LoginPage({ isAdmin = false }: LoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin: userIsAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultCredentials = {
    username: isAdmin ? 'admin' : 'agent',
    password: 'demo123'
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (userIsAdmin) {
        navigate('/admin');
      } else {
        navigate('/agent');
      }
    }
  }, [isAuthenticated, userIsAdmin, navigate]);

  // Auto-login in demo mode
  useEffect(() => {
    const autoLogin = async () => {
      setIsLoading(true);
      const result = await login(defaultCredentials);
      setIsLoading(false);

      if (result.success) {
        navigate(result.role === 'admin' ? '/admin' : '/agent');
      } else {
        setError(result.error || 'Login failed');
      }
    };

    const timer = setTimeout(autoLogin, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Phone className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isAdmin ? 'Admin Portal' : 'Agent Portal'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin 
              ? 'Access your administration dashboard' 
              : 'Sign in to start your calling session'}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
              <p className="mt-2 text-sm text-blue-700">
                Auto-login enabled with credentials:<br />
                Username: <code className="px-1 py-0.5 bg-blue-100 rounded">{defaultCredentials.username}</code><br />
                Password: <code className="px-1 py-0.5 bg-blue-100 rounded">{defaultCredentials.password}</code>
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading && (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```