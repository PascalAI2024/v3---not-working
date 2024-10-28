import React from 'react';
import { Phone, Clock, UserCheck, TrendingUp, Brain, Star } from 'lucide-react';
import type { Metrics } from '../../types';

interface MetricsPanelProps {
  metrics: Metrics;
}

function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp, 
  color = 'indigo'
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}) {
  return (
    <div className={`bg-${color}-50 rounded-xl p-4 transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 text-${color}-600`} />
        {trend && (
          <span className={`text-sm px-2 py-1 rounded-full ${
            trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Phone}
          label="Total Calls"
          value={metrics.totalCalls}
          trend="+12"
          trendUp={true}
        />
        
        <MetricCard
          icon={Clock}
          label="Avg Talk Time"
          value={metrics.avgTalkTime}
          trend="-0:15"
          trendUp={false}
          color="blue"
        />
        
        <MetricCard
          icon={UserCheck}
          label="Contact Rate"
          value={`${metrics.contactRate}%`}
          trend="+5%"
          trendUp={true}
          color="green"
        />
        
        <MetricCard
          icon={Star}
          label="Call Quality"
          value={metrics.callQuality}
          trend="+0.3"
          trendUp={true}
          color="yellow"
        />

        <MetricCard
          icon={Brain}
          label="AI Score"
          value={`${Math.round(metrics.aiMetrics.agentPerformance * 100)}%`}
          trend="+8%"
          trendUp={true}
          color="purple"
        />
        
        <MetricCard
          icon={TrendingUp}
          label="Conversion"
          value={`${Math.round(metrics.aiMetrics.conversionProbability * 100)}%`}
          trend="+3%"
          trendUp={true}
          color="pink"
        />
      </div>
    </div>
  );
}