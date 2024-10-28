import { useState, useEffect, useCallback } from 'react';
import { CallState, Lead } from '../types';
import { generateMockLead } from '../utils/mockData';

// Simulate server-side call distribution
const DISTRIBUTION_INTERVAL = 8000; // Average time between calls
const VARIANCE = 3000; // Random variance in distribution time

export function useCallDistribution() {
  const [distributionTimer, setDistributionTimer] = useState<NodeJS.Timeout | null>(null);
  const [queuedCall, setQueuedCall] = useState<{ lead: Lead; state: CallState } | null>(null);
  const [isDistributing, setIsDistributing] = useState(false);

  const distributeCall = useCallback(() => {
    const lead = generateMockLead();
    setQueuedCall({ lead, state: 'ringing' });
    
    // Simulate automatic voicemail detection after 12 seconds if not answered
    const voicemailTimeout = setTimeout(() => {
      setQueuedCall(current => 
        current && current.state === 'ringing' 
          ? { ...current, state: 'voicemail' }
          : current
      );
    }, 12000);

    return () => clearTimeout(voicemailTimeout);
  }, []);

  const startDistribution = useCallback(() => {
    if (distributionTimer) return;

    const scheduleNext = () => {
      const baseDelay = DISTRIBUTION_INTERVAL;
      const variance = Math.random() * VARIANCE * 2 - VARIANCE;
      const delay = Math.max(1000, baseDelay + variance);

      return setTimeout(() => {
        distributeCall();
        setDistributionTimer(scheduleNext());
      }, delay);
    };

    setIsDistributing(true);
    setDistributionTimer(scheduleNext());
  }, [distributeCall]);

  const stopDistribution = useCallback(() => {
    if (distributionTimer) {
      clearTimeout(distributionTimer);
      setDistributionTimer(null);
    }
    setIsDistributing(false);
    setQueuedCall(null);
  }, []);

  const acceptCall = useCallback(() => {
    if (!queuedCall || queuedCall.state !== 'ringing') return null;
    const call = queuedCall;
    setQueuedCall(null);
    return call;
  }, [queuedCall]);

  useEffect(() => {
    return () => {
      if (distributionTimer) clearTimeout(distributionTimer);
    };
  }, [distributionTimer]);

  return {
    queuedCall,
    isDistributing,
    startDistribution,
    stopDistribution,
    acceptCall
  };
}