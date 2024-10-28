import React from 'react';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
        <div className="flex gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[feature.status]}`}>
            {feature.status}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[feature.priority]}`}>
            {feature.priority}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Category: {feature.category}</span>
        <span>Updated: {new Date(feature.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}