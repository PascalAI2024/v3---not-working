import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/agent');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}