import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  getNextLead, 
  updateCallState, 
  recordDisposition 
} from '../store/slices/callsSlice';
import type { CallState, DispositionType } from '../types';

export function useCalls() {
  const dispatch = useDispatch();
  const { currentLead, callState, isLoading, error } = useSelector(
    (state: RootState) => state.calls
  );

  const fetchNextLead = useCallback(async () => {
    try {
      await dispatch(getNextLead()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleCallState = useCallback(async (leadId: string, state: CallState) => {
    try {
      await dispatch(updateCallState({ leadId, state })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleDisposition = useCallback(async (
    leadId: string,
    type: DispositionType,
    notes?: string,
    callback?: { time: string; agent: string }
  ) => {
    try {
      await dispatch(recordDisposition({ leadId, type, notes, callback })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  return {
    currentLead,
    callState,
    isLoading,
    error,
    fetchNextLead,
    updateCallState: handleCallState,
    recordDisposition: handleDisposition
  };
}