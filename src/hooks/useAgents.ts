import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchAgents,
  updateAgentStatus,
  fetchAgentMetrics
} from '../store/slices/agentsSlice';
import type { AgentStatus } from '../types';

export function useAgents() {
  const dispatch = useDispatch();
  const { agents, metrics, isLoading, error } = useSelector(
    (state: RootState) => state.agents
  );

  const loadAgents = useCallback(async () => {
    try {
      await dispatch(fetchAgents()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleStatusUpdate = useCallback(async (id: string, status: AgentStatus) => {
    try {
      await dispatch(updateAgentStatus({ id, status })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const loadAgentMetrics = useCallback(async (id: string) => {
    try {
      await dispatch(fetchAgentMetrics(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  return {
    agents,
    metrics,
    isLoading,
    error,
    loadAgents,
    updateStatus: handleStatusUpdate,
    loadAgentMetrics
  };
}