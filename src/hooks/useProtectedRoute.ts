import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function useProtectedRoute(requiredRole?: 'agent' | 'admin') {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate(user?.role === 'admin' ? '/admin' : '/agent');
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  return { isAuthenticated, user };
}