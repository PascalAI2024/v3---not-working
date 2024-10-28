import api from './api';
import { Lead, CallState, DispositionType } from '../types';

class CallsService {
  async getNextLead(): Promise<Lead> {
    const response = await api.get<Lead>('/calls/next-lead');
    return response.data;
  }

  async updateCallState(leadId: string, state: CallState): Promise<void> {
    await api.put(`/calls/${leadId}/state`, { state });
  }

  async recordDisposition(
    leadId: string,
    type: DispositionType,
    notes?: string,
    callback?: { time: string; agent: string }
  ): Promise<void> {
    await api.post(`/calls/${leadId}/disposition`, {
      type,
      notes,
      callback
    });
  }

  async startRecording(leadId: string): Promise<void> {
    await api.post(`/calls/${leadId}/recording/start`);
  }

  async stopRecording(leadId: string): Promise<void> {
    await api.post(`/calls/${leadId}/recording/stop`);
  }

  async transferCall(leadId: string, targetId: string, type: 'agent' | 'department'): Promise<void> {
    await api.post(`/calls/${leadId}/transfer`, {
      targetId,
      type
    });
  }
}

export default new CallsService();