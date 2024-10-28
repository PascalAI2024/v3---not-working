import React from 'react';
import { MoreVertical, Users, Phone, Clock, TrendingUp, Brain } from 'lucide-react';

interface CampaignCardProps {
  campaign: any; // TODO: Add proper type
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    paused: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[campaign.status as keyof typeof statusColors]
            }`}>
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{campaign.assignedAgents}</p>
            <p className="text-xs text-gray-500">Agents</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{campaign.metrics.contactRate}%</p>
            <p className="text-xs text-gray-500">Contact Rate</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{campaign.metrics.avgCallDuration}</p>
            <p className="text-xs text-gray-500">Avg Duration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{campaign.metrics.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
      </div>

      <div className="relative pt-4">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-indigo-600">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {Math.round((campaign.completedLeads / campaign.totalLeads) * 100)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
          <div
            style={{ width: `${(campaign.completedLeads / campaign.totalLeads) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
          ></div>
        </div>
      </div>

      {campaign.aiInsights && (
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-900">AI Insights</h4>
          </div>
          <div className="space-y-2">
            {campaign.aiInsights.nextBestActions.map((action: string, index: number) => (
              <p key={index} className="text-sm text-blue-800">
                • {action}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}