import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSocket } from '../../hooks/useSocket';
import Sidebar from '../Sidebar';
import DemoModeIndicator from '../DemoModeIndicator';

export default function DashboardLayout() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  useSocket(); // Initialize WebSocket connection

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        navigate('/login');
      }
    };

    initAuth();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="transition-all duration-300 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
      <DemoModeIndicator />
    </div>
  );
}