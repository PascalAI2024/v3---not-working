import React from 'react';
import { Coffee, ClipboardCheck, Timer, PhoneOff, Play } from 'lucide-react';
import { useAgentState } from '../../hooks/useAgentState';

interface AgentHeaderProps {
  isActive: boolean;
  isPaused: boolean;
  onToggleActive: () => void;
  onTogglePause: (reason: string) => void;
  onSetPauseReason: (reason: string) => void;
}

const pauseReasons = [
  { icon: Coffee, label: 'Break', value: 'break' },
  { icon: ClipboardCheck, label: 'Admin Work', value: 'admin' },
  { icon: Timer, label: 'Training', value: 'training' }
];

export default function AgentHeader({
  isActive,
  isPaused,
  onToggleActive,
  onTogglePause,
  onSetPauseReason
}: AgentHeaderProps) {
  const { metrics } = useAgentState();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
            alt="Agent avatar"
            className="w-12 h-12 rounded-full border-2 border-green-400"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
            isPaused ? 'bg-yellow-400' : isActive ? 'bg-green-400' : 'bg-gray-300'
          } border-2 border-white`}></div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sarah Connor</h2>
          <p className="text-sm text-gray-500">
            {isActive ? (
              isPaused ? 'On Break' : 'Active'
            ) : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {isActive && (
          <div className="flex space-x-2">
            {pauseReasons.map((reason) => (
              <button
                key={reason.value}
                onClick={() => {
                  onTogglePause(reason.value);
                  onSetPauseReason(reason.value);
                }}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isPaused ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <reason.icon className="w-4 h-4" />
                <span className="text-sm">{reason.label}</span>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={onToggleActive}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
            isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isActive ? <PhoneOff className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isActive ? 'End Session' : 'Start Dialing'}</span>
        </button>
      </div>
    </div>
  );
}