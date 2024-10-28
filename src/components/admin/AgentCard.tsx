import React from 'react';
import { Phone, Clock, Target, Star, Brain, TrendingUp, TrendingDown } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'onCall' | 'break' | 'offline';
  role: string;
  metrics: {
    callsHandled: number;
    avgTalkTime: string;
    conversionRate: number;
    customerSatisfaction: number;
  };
  insights: {
    strengths: string[];
    improvements: string[];
  };
}

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    onCall: 'bg-blue-100 text-blue-800',
    break: 'bg-yellow-100 text-yellow-800',
    offline: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                statusColors[agent.status]
              }`}>
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500 ml-2">{agent.role}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Phone className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Brain className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Calls Handled</p>
            <Phone className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xl font-semibold mt-1">{agent.metrics.callsHandled}</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Avg Talk Time</p>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xl font-semibold mt-1">{agent.metrics.avgTalkTime}</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Conversion</p>
            <Target className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xl font-semibold mt-1">{agent.metrics.conversionRate}%</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Satisfaction</p>
            <Star className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xl font-semibold mt-1">{agent.metrics.customerSatisfaction}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center mb-2">
          <Brain className="h-5 w-5 text-indigo-600 mr-2" />
          <h4 className="text-sm font-medium text-gray-900">AI Performance Insights</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Strengths</h5>
            <ul className="space-y-1">
              {agent.insights.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Areas for Improvement</h5>
            <ul className="space-y-1">
              {agent.insights.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <TrendingDown className="h-4 w-4 text-yellow-500 mr-1" />
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}