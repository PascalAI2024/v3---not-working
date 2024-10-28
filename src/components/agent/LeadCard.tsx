import React from 'react';
import { Phone, PhoneCall, PhoneOff, VoicemailIcon, Calendar, User } from 'lucide-react';
import { Lead, CallState } from '../../types';

interface LeadCardProps {
  lead: Lead | null;
  callState: CallState;
}

export default function LeadCard({ lead, callState }: LeadCardProps) {
  const getCallStateDisplay = () => {
    switch (callState) {
      case 'preview':
        return {
          icon: Phone,
          text: 'Preview Mode',
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        };
      case 'connecting':
        return {
          icon: Phone,
          text: 'Connecting...',
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          animation: 'animate-pulse'
        };
      case 'ringing':
        return {
          icon: PhoneCall,
          text: 'Ringing...',
          color: 'text-yellow-500',
          bg: 'bg-yellow-50',
          animation: 'animate-bounce'
        };
      case 'answered':
        return {
          icon: PhoneCall,
          text: 'On Call',
          color: 'text-green-500',
          bg: 'bg-green-50'
        };
      case 'transferring':
        return {
          icon: PhoneCall,
          text: 'Transferring...',
          color: 'text-indigo-500',
          bg: 'bg-indigo-50',
          animation: 'animate-pulse'
        };
      case 'onHold':
        return {
          icon: PhoneCall,
          text: 'On Hold',
          color: 'text-orange-500',
          bg: 'bg-orange-50'
        };
      case 'wrappingUp':
        return {
          icon: PhoneOff,
          text: 'Wrap Up',
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        };
      case 'voicemail':
        return {
          icon: VoicemailIcon,
          text: 'Voicemail',
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        };
      case 'disconnected':
        return {
          icon: PhoneOff,
          text: 'Call Ended',
          color: 'text-red-500',
          bg: 'bg-red-50'
        };
      default:
        return {
          icon: Phone,
          text: 'Ready',
          color: 'text-gray-500',
          bg: 'bg-gray-50'
        };
    }
  };

  const callStateInfo = getCallStateDisplay();
  const StateIcon = callStateInfo.icon;

  if (!lead) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
        <StateIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">Waiting for next call...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <a
              href={`tel:${lead.phone}`}
              className="text-lg text-blue-600 hover:text-blue-800"
            >
              {lead.phone}
            </a>
            {lead.alternatePhones?.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                (Alt {index + 1})
              </a>
            ))}
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${callStateInfo.bg} ${callStateInfo.color} ${callStateInfo.animation || ''}`}>
          <StateIcon className="w-4 h-4" />
          <span>{callStateInfo.text}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{lead.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Campaign</p>
            <p className="font-medium">{lead.campaign}</p>
          </div>
          {lead.callbackTime && (
            <div className="flex items-center space-x-2 text-yellow-600">
              <Calendar className="w-4 h-4" />
              <span>Callback: {new Date(lead.callbackTime).toLocaleString()}</span>
            </div>
          )}
          {lead.callbackAgent && (
            <div className="flex items-center space-x-2 text-blue-600">
              <User className="w-4 h-4" />
              <span>Reserved for: {lead.callbackAgent}</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Notes</p>
          <div className="bg-white rounded-lg p-3 h-32 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
          </div>
        </div>
      </div>

      {lead.customFields && Object.entries(lead.customFields).length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Additional Information</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(lead.customFields).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-500">{key}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}