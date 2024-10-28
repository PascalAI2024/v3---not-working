import React from 'react';
import { DispositionType } from '../../types';

interface DispositionPanelProps {
  dispositions: Record<DispositionType, number>;
  onDisposition: (type: DispositionType, notes?: string, callback?: { time: string; agent: string }) => void;
}

const dispositionConfig: Record<DispositionType, { label: string; color: string; requiresNotes?: boolean; allowsCallback?: boolean }> = {
  interested: { label: 'Interested', color: 'green' },
  callback: { label: 'Callback', color: 'blue', requiresNotes: true, allowsCallback: true },
  notInterested: { label: 'Not Interested', color: 'red', requiresNotes: true },
  noAnswer: { label: 'No Answer', color: 'gray' },
  voicemail: { label: 'Left Voicemail', color: 'purple' },
  wrongNumber: { label: 'Wrong Number', color: 'orange' },
  doNotCall: { label: 'Add to DNC', color: 'red', requiresNotes: true },
  transferred: { label: 'Transferred', color: 'indigo' }
};

export default function DispositionPanel({ dispositions, onDisposition }: DispositionPanelProps) {
  const [selectedDisposition, setSelectedDisposition] = React.useState<DispositionType | null>(null);
  const [notes, setNotes] = React.useState('');
  const [callbackTime, setCallbackTime] = React.useState('');
  const [callbackAgent, setCallbackAgent] = React.useState('');

  const handleSubmit = () => {
    if (!selectedDisposition) return;

    const config = dispositionConfig[selectedDisposition];
    if (config.requiresNotes && !notes) return;

    const callback = config.allowsCallback && callbackTime 
      ? { time: callbackTime, agent: callbackAgent }
      : undefined;

    onDisposition(selectedDisposition, notes, callback);
    setSelectedDisposition(null);
    setNotes('');
    setCallbackTime('');
    setCallbackAgent('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {(Object.entries(dispositionConfig) as [DispositionType, typeof dispositionConfig[keyof typeof dispositionConfig]][]).map(([type, config]) => (
          <button
            key={type}
            onClick={() => setSelectedDisposition(type)}
            className={`p-4 rounded-xl transition-all ${
              selectedDisposition === type
                ? `bg-${config.color}-100 border-2 border-${config.color}-500`
                : `bg-${config.color}-50 hover:bg-${config.color}-100`
            }`}
          >
            <div className="text-2xl font-bold mb-1">{dispositions[type]}</div>
            <div className="text-sm">{config.label}</div>
          </button>
        ))}
      </div>

      {selectedDisposition && (
        <div className="bg-white rounded-lg p-4 space-y-4">
          {dispositionConfig[selectedDisposition].requiresNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>
          )}

          {dispositionConfig[selectedDisposition].allowsCallback && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Callback Time
                </label>
                <input
                  type="datetime-local"
                  value={callbackTime}
                  onChange={(e) => setCallbackTime(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To
                </label>
                <select
                  value={callbackAgent}
                  onChange={(e) => setCallbackAgent(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Any Agent</option>
                  <option value="self">Myself</option>
                  <option value="team">My Team</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setSelectedDisposition(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}