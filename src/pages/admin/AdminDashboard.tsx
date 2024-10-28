import React, { useState } from 'react';
import { BarChart2, Users, Phone, Settings, ArrowUp, ArrowDown } from 'lucide-react';
import AIReports from '../../components/admin/AIReports';
import type { AIReport } from '../../types';

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
        }
      ],
      recommendations: [
        {
          title: 'Enhance Product Knowledge',
          description: 'Focus on advanced product feature training',
          priority: 'high',
          impact: 'Potential 15% improvement in resolution rate',
          implementation: 'Schedule weekly product deep-dive sessions'
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

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">AI Insights & Analysis</h2>
        <AIReports reports={mockAIReports} />
      </div>
    </div>
  );
}