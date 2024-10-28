import { useEffect } from 'react';
import { useAuth } from './useAuth';
import socketService from '../services/socket.service';

export function useSocket() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socketService.connect();
      return () => socketService.disconnect();
    }
  }, [user]);

  return socketService;
}