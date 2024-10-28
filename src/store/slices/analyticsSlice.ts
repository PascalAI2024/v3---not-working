import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import analyticsService from '../../services/analytics.service';
import { AIReport, AIMetric, AIRecommendation } from '../../types';

interface AnalyticsState {
  reports: AIReport[];
  metrics: AIMetric[];
  recommendations: AIRecommendation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  reports: [],
  metrics: [],
  recommendations: [],
  isLoading: false,
  error: null
};

export const fetchAIReports = createAsyncThunk(
  'analytics/fetchReports',
  async (timeRange: string) => {
    const reports = await analyticsService.getAIReports(timeRange);
    return reports;
  }
);

export const fetchPerformanceMetrics = createAsyncThunk(
  'analytics/fetchMetrics',
  async (timeRange: string) => {
    const metrics = await analyticsService.getPerformanceMetrics(timeRange);
    return metrics;
  }
);

export const fetchRecommendations = createAsyncThunk(
  'analytics/fetchRecommendations',
  async () => {
    const recommendations = await analyticsService.getRecommendations();
    return recommendations;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAIReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchAIReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch AI reports';
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      });
  }
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;