import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import type { AIReport, AIMetric, AIRecommendation } from '../../types';

interface AIReportsProps {
  reports: AIReport[];
}

function MetricCard({ metric }: { metric: AIMetric }) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-blue-500'
  };

  const impactColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900">{metric.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs ${impactColors[metric.impact]}`}>
          {metric.impact} impact
        </span>
      </div>
      <div className="text-2xl font-bold mb-2">{metric.value}</div>
      <div className={`flex items-center ${trendColors[metric.trend]}`}>
        <TrendingUp className="w-4 h-4 mr-1" />
        <span className="text-sm">{metric.trend}</span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: AIRecommendation }) {
  const priorityColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-blue-500 bg-blue-50'
  };

  return (
    <div className={`rounded-lg p-4 border-l-4 ${priorityColors[recommendation.priority]}`}>
      <div className="flex items-start">
        <Lightbulb className="w-5 h-5 text-gray-600 mt-1" />
        <div className="ml-3">
          <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
          <div className="mt-3">
            <div className="text-sm">
              <span className="font-medium text-gray-900">Expected Impact:</span>
              <span className="text-gray-600 ml-1">{recommendation.impact}</span>
            </div>
            <div className="text-sm mt-1">
              <span className="font-medium text-gray-900">Implementation:</span>
              <span className="text-gray-600 ml-1">{recommendation.implementation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIReports({ reports }: AIReportsProps) {
  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <div key={report.id} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Brain className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold ml-2">{report.title}</h3>
            </div>
            <span className="text-sm text-gray-500">
              Generated {new Date(report.timestamp).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{report.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {report.metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-3">AI Recommendations</h4>
            {report.recommendations.map((recommendation, index) => (
              <RecommendationCard key={index} recommendation={recommendation} />
            ))}
          </div>

          {report.trends.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Trends Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.trends.map((trend, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">{trend.name}</h5>
                    {/* Placeholder for trend visualization */}
                    <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                      Trend Chart
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}