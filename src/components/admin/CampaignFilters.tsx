import React from 'react';
import { X } from 'lucide-react';

interface CampaignFiltersProps {
  onClose: () => void;
}

export default function CampaignFilters({ onClose }: CampaignFiltersProps) {
  return (
    <div className="border-t border-b border-gray-200 bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-gray-900">Advanced Filters</h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Performance Metrics
          </label>
          <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option>Any Performance</option>
            <option>High Performing (&gt;80%)</option>
            <option>Medium Performing (40-80%)</option>
            <option>Low Performing (&lt;40%)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agent Count
          </label>
          <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option>Any Size</option>
            <option>Small (1-5 agents)</option>
            <option>Medium (6-15 agents)</option>
            <option>Large (&gt;15 agents)</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}