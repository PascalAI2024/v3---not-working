import React, { useState } from 'react';
import AgentHeader from './agent/AgentHeader';
import LeadCard from './agent/LeadCard';
import CallControls from './agent/CallControls';
import ScriptDisplay from './agent/ScriptDisplay';
import DispositionPanel from './agent/DispositionPanel';
import MetricsPanel from './agent/MetricsPanel';
import { Phone } from 'lucide-react';
import type { Lead, CallState, CallControls as CallControlsType } from '../types';

export default function AgentInterface() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [callState, setCallState] = useState<CallState>('idle');
  const [callControls, setCallControls] = useState<CallControlsType>({
    mute: false,
    volume: 80,
    recording: false,
    onHold: false
  });

  const handleControlChange = (changes: Partial<CallControlsType>) => {
    setCallControls(prev => ({ ...prev, ...changes }));
  };

  const handleTransfer = (option: any) => {
    if (currentLead) {
      setCallState('transferring');
      // Implement transfer logic
    }
  };

  const mockScript = {
    id: '1',
    title: 'Sales Script',
    content: `Hello {name}, this is Sarah from ViciNext.

I noticed you recently expressed interest in our AI-powered call center solution. 
I'd love to learn more about your current setup and show you how we can help improve your operations.

Would you have a few minutes to discuss your needs?

[If Yes]
Great! Could you tell me about your current call center size and main challenges?

[If No]
No problem! When would be a better time to connect? I'd be happy to schedule a follow-up call.`,
    variables: ['name']
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <AgentHeader 
          isActive={isActive}
          isPaused={isPaused}
          onToggleActive={() => setIsActive(!isActive)}
          onTogglePause={() => setIsPaused(!isPaused)}
          onSetPauseReason={() => {}}
        />

        {!isActive ? (
          <div className="text-center py-12">
            <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Calls</h3>
            <p className="text-gray-500">Start your session to begin receiving calls</p>
          </div>
        ) : (
          <>
            <LeadCard
              lead={currentLead}
              callState={callState}
            />
            
            <CallControls
              controls={callControls}
              onControlChange={handleControlChange}
              onTransfer={handleTransfer}
              disabled={!['answered', 'onHold'].includes(callState)}
            />
            
            {currentLead && mockScript && (
              <ScriptDisplay
                script={mockScript}
                lead={currentLead}
              />
            )}

            {callState === 'disconnected' && (
              <DispositionPanel
                onDisposition={() => {
                  setCurrentLead(null);
                  setCallState('idle');
                }}
                dispositions={{
                  interested: 0,
                  callback: 0,
                  notInterested: 0,
                  noAnswer: 0,
                  voicemail: 0,
                  wrongNumber: 0,
                  doNotCall: 0,
                  transferred: 0
                }}
              />
            )}
          </>
        )}
      </div>

      <MetricsPanel
        metrics={{
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
        }}
      />
    </div>
  );
}