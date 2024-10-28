import api from './api';
import { Campaign, CampaignMetrics } from '../types';

interface CreateCampaignData {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  targetLeads: number;
  agentCount: number;
  description: string;
  script: string;
  callbackStrategy: string;
  priority: string;
}

class CampaignsService {
  async getCampaigns(): Promise<Campaign[]> {
    const response = await api.get<Campaign[]>('/campaigns');
    return response.data;
  }

  async getCampaign(id: string): Promise<Campaign> {
    const response = await api.get<Campaign>(`/campaigns/${id}`);
    return response.data;
  }

  async createCampaign(data: CreateCampaignData): Promise<Campaign> {
    const response = await api.post<Campaign>('/campaigns', data);
    return response.data;
  }

  async updateCampaign(id: string, data: Partial<Campaign>): Promise<Campaign> {
    const response = await api.put<Campaign>(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: string): Promise<void> {
    await api.delete(`/campaigns/${id}`);
  }

  async getCampaignMetrics(id: string): Promise<CampaignMetrics> {
    const response = await api.get<CampaignMetrics>(`/campaigns/${id}/metrics`);
    return response.data;
  }

  async assignAgentsToCampaign(id: string, agentIds: string[]): Promise<void> {
    await api.post(`/campaigns/${id}/agents`, { agentIds });
  }
}

export default new CampaignsService();