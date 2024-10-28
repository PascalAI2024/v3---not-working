import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Lead, CallState, DispositionType } from '../types';
import { generateMockLead } from '../utils/mockData';

const INITIAL_METRICS = {
  contactRate: 42,
  dispositions: {
    interested: 12,
    callback: 8,
    notInterested: 15,
    noAnswer: 23,
    voicemail: 5,
    wrongNumber: 2,
    doNotCall: 1,
    transferred: 3
  },
  totalCalls: 58,
  avgTalkTime: "2:45",
  pauseTime: "0:30:00",
  wrapUpTime: "0:15:00",
  callQuality: 4.2,
  aiMetrics: {
    sentimentScore: 0.75,
    customerSatisfaction: 0.82,
    conversionProbability: 0.65,
    agentPerformance: 0.88
  }
};

export function useAgentState() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [callState, setCallState] = useState<CallState>('idle');
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  const [distributionTimer, setDistributionTimer] = useState<NodeJS.Timeout | null>(null);

  // Simulate call state progression
  const handleCallProgress = useCallback((state: CallState) => {
    setCallState(state);
    
    if (state === 'ringing') {
      // Auto-answer after 3 seconds in demo mode
      setTimeout(() => setCallState('answered'), 3000);
    }
    
    if (state === 'answered') {
      // Simulate random call duration between 30-90 seconds
      const timer = setTimeout(() => {
        setCallState('disconnected');
      }, Math.random() * 60000 + 30000);
      setCallTimer(timer);
    }
  }, []);

  // Handle call disposition
  const handleDisposition = useCallback((
    type: DispositionType,
    notes?: string,
    callback?: { time: string; agent: string }
  ) => {
    if (!isActive || isPaused) return;

    setMetrics(prev => ({
      ...prev,
      dispositions: {
        ...prev.dispositions,
        [type]: prev.dispositions[type] + 1
      },
      totalCalls: prev.totalCalls + 1,
      contactRate: Math.round((prev.dispositions.interested + prev.dispositions.callback) / (prev.totalCalls + 1) * 100)
    }));

    setCurrentLead(null);
    setCallState('idle');

    // Start distribution timer for next call
    startDistribution();
  }, [isActive, isPaused]);

  // Start call distribution
  const startDistribution = useCallback(() => {
    if (distributionTimer) clearTimeout(distributionTimer);
    
    const timer = setTimeout(() => {
      if (isActive && !isPaused && !currentLead) {
        const newLead = generateMockLead();
        setCurrentLead(newLead);
        handleCallProgress('ringing');
      }
    }, Math.random() * 5000 + 2000); // Random delay between 2-7 seconds

    setDistributionTimer(timer);
  }, [isActive, isPaused, currentLead, handleCallProgress]);

  // Toggle agent active state
  const toggleActive = useCallback(() => {
    setIsActive(prev => {
      const newState = !prev;
      if (newState) {
        startDistribution();
      } else {
        if (distributionTimer) clearTimeout(distributionTimer);
        if (callTimer) clearTimeout(callTimer);
        setCurrentLead(null);
        setCallState('idle');
      }
      return newState;
    });
    if (isPaused) setIsPaused(false);
  }, [isPaused, startDistribution]);

  // Toggle pause state
  const togglePause = useCallback((reason: string) => {
    if (!isActive) return;
    
    setIsPaused(prev => {
      const newState = !prev;
      if (newState) {
        if (distributionTimer) clearTimeout(distributionTimer);
        if (callTimer) clearTimeout(callTimer);
        setPauseReason(reason);
      } else {
        setPauseReason('');
        startDistribution();
      }
      return newState;
    });
  }, [isActive, startDistribution]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (distributionTimer) clearTimeout(distributionTimer);
      if (callTimer) clearTimeout(callTimer);
    };
  }, []);

  return {
    isActive,
    isPaused,
    pauseReason,
    currentLead,
    metrics,
    callState,
    toggleActive,
    togglePause,
    setPauseReason,
    handleDisposition
  };
}