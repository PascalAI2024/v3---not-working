import React, { useState } from 'react';
import { Download, Calendar, Filter, RefreshCw } from 'lucide-react';
import AIReports from '../../components/admin/AIReports';

export default function Reports() {
  const [dateRange, setDateRange] = useState('7d');
  const [reportType, setReportType] = useState('all');

  const mockReports = [
    {
      id: '1',
      type: 'performance',
      title: 'Agent Performance Analysis',
      summary: 'Overall positive trends in agent performance metrics with notable improvements in customer satisfaction scores.',
      timestamp: new Date().toISOString(),
      metrics: [
        {
          name: 'Average Handle Time',
          value: 245,
          trend: 'down',
          impact: 'high',
          description: 'Reduced call handling time while maintaining quality'
        },
        {
          name: 'Customer Satisfaction',
          value: 4.8,
          trend: 'up',
          impact: 'high',
          description: 'Improved satisfaction ratings across all channels'
        },
        {
          name: 'First Call Resolution',
          value: 0.82,
          trend: 'up',
          impact: 'medium',
          description: 'Higher percentage of issues resolved in first contact'
        }
      ],
      recommendations: [
        {
          title: 'Knowledge Base Enhancement',
          description: 'Expand internal knowledge base with recent case resolutions',
          priority: 'high',
          impact: 'Expected 20% improvement in FCR',
          implementation: 'Schedule weekly knowledge sharing sessions'
        },
        {
          title: 'Training Focus Areas',
          description: 'Identify key areas for targeted agent training',
          priority: 'medium',
          impact: 'Potential 15% reduction in handling time',
          implementation: 'Develop specialized training modules'
        }
      ],
      trends: [
        {
          name: 'Performance Metrics Trend',
          data: [82, 85, 87, 89, 92],
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          prediction: [94, 95, 96]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border-gray-300 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: 'all', label: 'All Reports' },
              { value: 'performance', label: 'Performance' },
              { value: 'quality', label: 'Quality Assurance' },
              { value: 'campaign', label: 'Campaign Analysis' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setReportType(type.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  reportType === type.value
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <AIReports reports={mockReports} />
      </div>
    </div>
  );
}