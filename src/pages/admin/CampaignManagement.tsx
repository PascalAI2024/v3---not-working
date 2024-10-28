import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Phone, Users, Clock, Target } from 'lucide-react';
import CampaignCard from '../../components/admin/CampaignCard';
import CampaignModal from '../../components/admin/CampaignModal';
import CampaignFilters from '../../components/admin/CampaignFilters';

export default function CampaignManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const campaigns = [
    {
      id: '1',
      name: 'Q1 Sales Outreach',
      status: 'active',
      type: 'outbound',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      totalLeads: 2500,
      completedLeads: 1625,
      assignedAgents: 15,
      metrics: {
        contactRate: 42,
        conversionRate: 18,
        avgCallDuration: '3:45',
        callsPerHour: 12
      },
      aiInsights: {
        sentiment: 0.75,
        nextBestActions: [
          'Increase agent training on product features',
          'Optimize call timing based on response patterns'
        ],
        riskFactors: ['High call abandonment rate in evening shifts'],
        opportunities: ['Strong response from manufacturing sector']
      }
    },
    {
      id: '2',
      name: 'Customer Feedback Survey',
      status: 'scheduled',
      type: 'inbound',
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      totalLeads: 1200,
      completedLeads: 0,
      assignedAgents: 8,
      metrics: {
        contactRate: 0,
        conversionRate: 0,
        avgCallDuration: '0:00',
        callsPerHour: 0
      },
      aiInsights: {
        sentiment: 0,
        nextBestActions: [
          'Prepare agents with product update training',
          'Set up automated satisfaction surveys'
        ],
        riskFactors: ['New product knowledge requirements'],
        opportunities: ['Potential for upsell opportunities']
      }
    }
  ];

  const stats = [
    {
      name: 'Active Campaigns',
      value: '12',
      icon: Phone,
      change: '+2',
      changeType: 'increase'
    },
    {
      name: 'Total Agents',
      value: '45',
      icon: Users,
      change: '-3',
      changeType: 'decrease'
    },
    {
      name: 'Avg Duration',
      value: '3:24',
      icon: Clock,
      change: '+0:15',
      changeType: 'increase'
    },
    {
      name: 'Success Rate',
      value: '68%',
      icon: Target,
      change: '+5%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>All Types</option>
                <option>Outbound</option>
                <option>Inbound</option>
                <option>Blended</option>
              </select>
              <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>All Status</option>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Paused</option>
              </select>
            </div>
          </div>
        </div>

        {showFilters && <CampaignFilters onClose={() => setShowFilters(false)} />}

        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CampaignModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}