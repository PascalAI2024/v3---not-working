import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleActive,
  togglePause,
  updateCallState,
  setCurrentLead,
  selectCalls,
  selectIsActive,
  selectIsPaused
} from '../store/slices/callsSlice';
import { CallState, Lead } from '../types';

export function useCallControls() {
  const dispatch = useDispatch();
  const calls = useSelector(selectCalls);
  const isActive = useSelector(selectIsActive);
  const isPaused = useSelector(selectIsPaused);

  const startSession = useCallback(() => {
    dispatch(toggleActive());
  }, [dispatch]);

  const pauseSession = useCallback((reason: string) => {
    dispatch(togglePause(reason));
  }, [dispatch]);

  const handleCallState = useCallback((state: CallState) => {
    dispatch(updateCallState(state));
  }, [dispatch]);

  const setLead = useCallback((lead: Lead | null) => {
    dispatch(setCurrentLead(lead));
  }, [dispatch]);

  return {
    isActive,
    isPaused,
    currentLead: calls.currentLead,
    callState: calls.callState,
    startSession,
    pauseSession,
    handleCallState,
    setLead
  };
}