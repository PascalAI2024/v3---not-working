import api from './api';
import { AIReport, AIMetric, AIRecommendation } from '../types';

class AnalyticsService {
  async getAIReports(timeRange: string): Promise<AIReport[]> {
    const response = await api.get<AIReport[]>('/analytics/reports', {
      params: { timeRange }
    });
    return response.data;
  }

  async getPerformanceMetrics(timeRange: string): Promise<AIMetric[]> {
    const response = await api.get<AIMetric[]>('/analytics/metrics', {
      params: { timeRange }
    });
    return response.data;
  }

  async getRecommendations(): Promise<AIRecommendation[]> {
    const response = await api.get<AIRecommendation[]>('/analytics/recommendations');
    return response.data;
  }

  async getSentimentAnalysis(callId: string): Promise<any> {
    const response = await api.get(`/analytics/sentiment/${callId}`);
    return response.data;
  }

  async generateReport(type: string, params: any): Promise<any> {
    const response = await api.post('/analytics/reports/generate', {
      type,
      ...params
    });
    return response.data;
  }
}

export default new AnalyticsService();