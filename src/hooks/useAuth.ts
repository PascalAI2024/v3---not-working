import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  selectAuth,
  selectUser,
  selectIsAuthenticated
} from '../store/slices/authSlice';
import { api } from '../services/api';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const login = useCallback(async (username: string, password: string) => {
    try {
      dispatch(loginStart());

      // In demo mode, simulate API call
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const demoUser = {
          id: '1',
          username,
          name: username === 'admin' ? 'Admin User' : 'Sarah Connor',
          email: `${username}@example.com`,
          role: username === 'admin' ? 'admin' : 'agent'
        };

        dispatch(loginSuccess({ 
          user: demoUser, 
          token: 'demo-token' 
        }));

        navigate(username === 'admin' ? '/admin' : '/agent');
        return;
      }

      const response = await api.post('/auth/login', { username, password });
      dispatch(loginSuccess(response.data));
      navigate(response.data.user.role === 'admin' ? '/admin' : '/agent');
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  }, [dispatch, navigate]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    logout: logoutUser
  };
}