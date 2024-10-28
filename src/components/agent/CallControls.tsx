import React from 'react';
import { 
  Mic, MicOff, Volume2, PauseCircle, 
  PhoneForwarded, CircleDot, Square 
} from 'lucide-react';
import type { CallControls as CallControlsType, TransferOption } from '../../types';

interface CallControlsProps {
  controls: CallControlsType;
  onControlChange: (control: Partial<CallControlsType>) => void;
  onTransfer: (option: TransferOption) => void;
  disabled?: boolean;
}

const defaultControls: CallControlsType = {
  mute: false,
  volume: 80,
  recording: false,
  onHold: false
};

export default function CallControls({ 
  controls = defaultControls,
  onControlChange, 
  onTransfer,
  disabled = false 
}: CallControlsProps) {
  const transferOptions: TransferOption[] = [
    { id: '1', name: 'Sales Closer', type: 'department', available: true },
    { id: '2', name: 'Technical Support', type: 'department', available: true },
    { id: '3', name: 'John Smith', type: 'agent', extension: '1001', available: true }
  ];

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <div className="flex space-x-4">
        <button
          onClick={() => onControlChange({ mute: !controls.mute })}
          className={`p-2 rounded-lg ${controls.mute ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          disabled={disabled}
        >
          {controls.mute ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-600" />
          <input
            type="range"
            min="0"
            max="100"
            value={controls.volume}
            onChange={(e) => onControlChange({ volume: Number(e.target.value) })}
            className="w-24"
            disabled={disabled}
          />
        </div>

        <button
          onClick={() => onControlChange({ recording: !controls.recording })}
          className={`p-2 rounded-lg ${controls.recording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          disabled={disabled}
        >
          {controls.recording ? <Square className="w-5 h-5" /> : <CircleDot className="w-5 h-5" />}
        </button>

        <button
          onClick={() => onControlChange({ onHold: !controls.onHold })}
          className={`p-2 rounded-lg ${controls.onHold ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          disabled={disabled}
        >
          <PauseCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => {}}
          className={`flex items-center space-x-2 p-2 rounded-lg ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
          disabled={disabled}
        >
          <PhoneForwarded className="w-5 h-5" />
          <span>Transfer</span>
        </button>

        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 hidden">
          {transferOptions.map(option => (
            <button
              key={option.id}
              onClick={() => onTransfer(option)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              <div className="font-medium">{option.name}</div>
              {option.extension && (
                <div className="text-sm text-gray-500">Ext: {option.extension}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}