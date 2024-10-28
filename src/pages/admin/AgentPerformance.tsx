import React, { useState } from 'react';
import { 
  Users, Phone, Clock, Target, Brain, TrendingUp, 
  Award, ThumbsUp, AlertTriangle, Download 
} from 'lucide-react';
import AgentCard from '../../components/admin/AgentCard';
import PerformanceFilters from '../../components/admin/PerformanceFilters';
import AIPerformanceInsights from '../../components/admin/AIPerformanceInsights';

export default function AgentPerformance() {
  const [timeRange, setTimeRange] = useState('7d');
  const [showFilters, setShowFilters] = useState(false);

  const agents = [
    {
      id: '1',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      status: 'active',
      role: 'Senior Sales Agent',
      metrics: {
        callsHandled: 156,
        avgTalkTime: '4:23',
        conversionRate: 42,
        customerSatisfaction: 4.8
      },
      aiMetrics: {
        sentimentScore: 0.85,
        customerSatisfaction: 0.92,
        conversionProbability: 0.78,
        agentPerformance: 0.88
      },
      trends: {
        daily: [32, 28, 35, 42, 38, 41, 39],
        weekly: [180, 165, 190, 210, 185],
        monthly: [720, 680, 750, 810]
      },
      insights: {
        strengths: ['Excellent product knowledge', 'Strong closing skills'],
        improvements: ['Follow-up timing', 'Script adherence'],
        recommendations: [
          'Focus on reducing hold times',
          'Implement suggested upsell strategies'
        ]
      }
    },
    {
      id: '2',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      status: 'onCall',
      role: 'Sales Agent',
      metrics: {
        callsHandled: 142,
        avgTalkTime: '3:45',
        conversionRate: 38,
        customerSatisfaction: 4.6
      },
      aiMetrics: {
        sentimentScore: 0.78,
        customerSatisfaction: 0.85,
        conversionProbability: 0.72,
        agentPerformance: 0.82
      },
      trends: {
        daily: [28, 25, 30, 35, 32, 38, 36],
        weekly: [160, 155, 175, 185, 170],
        monthly: [650, 620, 680, 710]
      },
      insights: {
        strengths: ['High empathy scores', 'Effective problem solving'],
        improvements: ['Call duration management', 'Objection handling'],
        recommendations: [
          'Review successful closing patterns',
          'Participate in advanced product training'
        ]
      }
    }
  ];

  const overallMetrics = {
    totalCalls: 2543,
    avgConversion: 36,
    avgSatisfaction: 4.6,
    activeAgents: 45
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agent Performance</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Filters
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Calls</p>
              <p className="text-2xl font-bold mt-1">{overallMetrics.totalCalls}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">12%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Avg Conversion</p>
              <p className="text-2xl font-bold mt-1">{overallMetrics.avgConversion}%</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">5%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Satisfaction Score</p>
              <p className="text-2xl font-bold mt-1">{overallMetrics.avgSatisfaction}</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">2%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Agents</p>
              <p className="text-2xl font-bold mt-1">{overallMetrics.activeAgents}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-yellow-500">-2</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
      </div>

      {showFilters && <PerformanceFilters onClose={() => setShowFilters(false)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
            <div className="space-y-4">
              {agents
                .sort((a, b) => b.metrics.conversionRate - a.metrics.conversionRate)
                .slice(0, 3)
                .map((agent, index) => (
                  <div key={agent.id} className="flex items-center">
                    <div className="flex-shrink-0">
                      <Award className={`h-5 w-5 ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-gray-400' :
                        'text-orange-400'
                      }`} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.metrics.conversionRate}% conversion</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <AIPerformanceInsights agents={agents} />
        </div>
      </div>
    </div>
  );
}