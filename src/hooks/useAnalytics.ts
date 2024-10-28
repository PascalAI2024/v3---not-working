import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchAIReports,
  fetchPerformanceMetrics,
  fetchRecommendations
} from '../store/slices/analyticsSlice';

export function useAnalytics() {
  const dispatch = useDispatch();
  const {
    reports,
    metrics,
    recommendations,
    isLoading,
    error
  } = useSelector((state: RootState) => state.analytics);

  const loadReports = useCallback(async (timeRange: string) => {
    try {
      await dispatch(fetchAIReports(timeRange)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const loadMetrics = useCallback(async (timeRange: string) => {
    try {
      await dispatch(fetchPerformanceMetrics(timeRange)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const loadRecommendations = useCallback(async () => {
    try {
      await dispatch(fetchRecommendations()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  return {
    reports,
    metrics,
    recommendations,
    isLoading,
    error,
    loadReports,
    loadMetrics,
    loadRecommendations
  };
}