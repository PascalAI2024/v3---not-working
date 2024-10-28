import api from './api';
import { Agent, AgentMetrics, AgentStatus } from '../types';

class AgentsService {
  async getAgents(): Promise<Agent[]> {
    const response = await api.get<Agent[]>('/agents');
    return response.data;
  }

  async getAgent(id: string): Promise<Agent> {
    const response = await api.get<Agent>(`/agents/${id}`);
    return response.data;
  }

  async updateAgentStatus(id: string, status: AgentStatus): Promise<void> {
    await api.put(`/agents/${id}/status`, { status });
  }

  async getAgentMetrics(id: string): Promise<AgentMetrics> {
    const response = await api.get<AgentMetrics>(`/agents/${id}/metrics`);
    return response.data;
  }

  async getAgentPerformance(id: string, timeRange: string): Promise<any> {
    const response = await api.get(`/agents/${id}/performance`, {
      params: { timeRange }
    });
    return response.data;
  }

  async assignCampaign(agentId: string, campaignId: string): Promise<void> {
    await api.post(`/agents/${agentId}/campaigns`, { campaignId });
  }
}

export default new AgentsService();