import React, { useState } from 'react';
import { BarChart2, Users, Phone, Settings, ArrowUp, ArrowDown } from 'lucide-react';
import AIReports from '../components/admin/AIReports';
import type { AIReport } from '../types';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {isPositive ? (
          <ArrowUp className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm ml-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last week</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  
  const metrics = [
    { title: 'Total Calls', value: '12,543', change: 12, icon: Phone },
    { title: 'Active Agents', value: '45', change: -5, icon: Users },
    { title: 'Contact Rate', value: '32%', change: 8, icon: BarChart2 },
    { title: 'System Load', value: '76%', change: 3, icon: Settings },
  ];

  const mockAIReports: AIReport[] = [
    {
      id: '1',
      type: 'sentiment',
      title: 'Sentiment Analysis Report',
      summary: 'Overall positive trend in customer sentiment with notable improvements in product discussion segments.',
      timestamp: new Date().toISOString(),
      metrics: [
        {
          name: 'Average Sentiment',
          value: 0.75,
          trend: 'up',
          impact: 'high',
          description: 'Customer sentiment shows strong positive momentum'
        },
        {
          name: 'Key Topics',
          value: 12,
          trend: 'stable',
          impact: 'medium',
          description: 'Consistent coverage of primary discussion points'
        },
        {
          name: 'Resolution Rate',
          value: 0.89,
          trend: 'up',
          impact: 'high',
          description: 'Improved first-call resolution performance'
        }
      ],
      recommendations: [
        {
          title: 'Enhance Product Knowledge',
          description: 'Focus on advanced product feature training',
          priority: 'high',
          impact: 'Potential 15% improvement in resolution rate',
          implementation: 'Schedule weekly product deep-dive sessions'
        },
        {
          title: 'Optimize Call Scripts',
          description: 'Update scripts based on successful conversation patterns',
          priority: 'medium',
          impact: 'Expected 10% improvement in conversion rate',
          implementation: 'Implement A/B testing of new script variations'
        }
      ],
      trends: [
        {
          name: 'Sentiment Score Trend',
          data: [0.65, 0.68, 0.72, 0.75, 0.78],
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          prediction: [0.79, 0.81, 0.82]
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <select 
            className="rounded-lg border-gray-300 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Active Campaigns</h2>
          <div className="space-y-4">
            {[
              { name: 'Q1 Sales Outreach', leads: 2500, completed: 65 },
              { name: 'Customer Feedback', leads: 1200, completed: 45 },
              { name: 'Product Launch', leads: 3000, completed: 20 },
            ].map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-gray-500">{campaign.leads} leads</p>
                </div>
                <div className="w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">{campaign.completed}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 rounded-full h-2"
                      style={{ width: `${campaign.completed}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Performing Agents</h2>
          <div className="space-y-4">
            {[
              { name: 'Sarah Connor', calls: 156, conversion: 42 },
              { name: 'John Smith', calls: 142, conversion: 38 },
              { name: 'Emma Wilson', calls: 138, conversion: 35 },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.calls} calls today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{agent.conversion}%</p>
                  <p className="text-sm text-gray-500">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">AI Insights & Analysis</h2>
        <AIReports reports={mockAIReports} />
      </div>
    </div>
  );
}