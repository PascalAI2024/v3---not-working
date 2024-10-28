import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  metrics: {
    conversionRate: number;
    customerSatisfaction: number;
    avgTalkTime: string;
    callsHandled: number;
  };
  insights: {
    strengths: string[];
    improvements: string[];
  };
}

interface AIPerformanceInsightsProps {
  agents: Agent[];
}

export default function AIPerformanceInsights({ agents }: AIPerformanceInsightsProps) {
  const teamInsights = {
    trends: [
      {
        title: 'Rising Stars',
        description: 'Agents showing significant improvement',
        agents: agents
          .filter(a => a.metrics.conversionRate > 35)
          .map(a => a.name),
        impact: 'positive'
      },
      {
        title: 'Training Needs',
        description: 'Areas requiring team-wide focus',
        items: ['Advanced product features', 'Objection handling'],
        impact: 'attention'
      }
    ],
    recommendations: [
      'Schedule advanced product training sessions',
      'Implement peer mentoring program',
      'Review successful call patterns'
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Team Insights</h3>
      </div>

      <div className="space-y-6">
        {teamInsights.trends.map((trend, index) => (
          <div key={index} className="border-l-4 border-indigo-500 pl-4">
            <div className="flex items-center mb-2">
              {trend.impact === 'positive' ? (
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <h4 className="text-sm font-medium text-gray-900">{trend.title}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
            <ul className="text-sm text-gray-500">
              {trend.agents ? (
                trend.agents.map((agent, i) => (
                  <li key={i}>• {agent}</li>
                ))
              ) : (
                trend.items?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))
              )}
            </ul>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-900">Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {teamInsights.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}