import React, { useState, useEffect } from 'react';
import AgentHeader from './AgentHeader';
import LeadCard from './LeadCard';
import CallControls from './CallControls';
import ScriptDisplay from './ScriptDisplay';
import DispositionPanel from './DispositionPanel';
import MetricsPanel from './MetricsPanel';
import MicrophoneTest from './MicrophoneTest';
import { useAgentState } from '../../hooks/useAgentState';
import { useMediaDevices } from '../../hooks/useMediaDevices';

export default function AgentInterface() {
  const [showMicTest, setShowMicTest] = useState(true);
  const { hasPermission } = useMediaDevices();
  const {
    isActive,
    isPaused,
    currentLead,
    callState,
    metrics,
    toggleActive,
    togglePause,
    setPauseReason,
    handleDisposition
  } = useAgentState();

  const [callControls, setCallControls] = useState({
    mute: false,
    volume: 80,
    recording: false,
    onHold: false
  });

  const handleControlChange = (changes: Partial<typeof callControls>) => {
    setCallControls(prev => ({ ...prev, ...changes }));
  };

  const handleTransfer = () => {
    if (currentLead && callState === 'answered') {
      handleDisposition('transferred');
    }
  };

  useEffect(() => {
    if (hasPermission) {
      setShowMicTest(false);
    }
  }, [hasPermission]);

  const handleMicTestComplete = (success: boolean) => {
    if (success) {
      setShowMicTest(false);
    }
  };

  if (showMicTest) {
    return <MicrophoneTest onComplete={handleMicTestComplete} />;
  }

  const mockScript = currentLead ? {
    id: '1',
    title: 'Sales Script',
    content: `Hello ${currentLead.name}, this is Sarah from ViciNext.

I noticed you recently expressed interest in our AI-powered call center solution. 
I'd love to learn more about your current setup and show you how we can help improve your operations.

Would you have a few minutes to discuss your needs?

[If Yes]
Great! Could you tell me about your current call center size and main challenges?

[If No]
No problem! When would be a better time to connect? I'd be happy to schedule a follow-up call.`,
    variables: ['name']
  } : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <AgentHeader 
          isActive={isActive}
          isPaused={isPaused}
          onToggleActive={toggleActive}
          onTogglePause={togglePause}
          onSetPauseReason={setPauseReason}
        />

        <LeadCard
          lead={currentLead}
          callState={callState}
        />
        
        {currentLead && (
          <>
            <CallControls
              controls={callControls}
              onControlChange={handleControlChange}
              onTransfer={handleTransfer}
              disabled={!['answered', 'onHold'].includes(callState)}
            />
            
            {mockScript && (
              <ScriptDisplay
                script={mockScript}
                lead={currentLead}
              />
            )}
          </>
        )}

        {callState === 'disconnected' && (
          <DispositionPanel
            dispositions={metrics.dispositions}
            onDisposition={handleDisposition}
          />
        )}
      </div>

      <MetricsPanel metrics={metrics} />
    </div>
  );
}