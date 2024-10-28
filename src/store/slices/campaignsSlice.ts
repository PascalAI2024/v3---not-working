import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignsService from '../../services/campaigns.service';
import { Campaign, CampaignMetrics } from '../../types';

interface CampaignsState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  metrics: Record<string, CampaignMetrics>;
  isLoading: boolean;
  error: string | null;
}

const initialState: CampaignsState = {
  campaigns: [],
  selectedCampaign: null,
  metrics: {},
  isLoading: false,
  error: null
};

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    const campaigns = await campaignsService.getCampaigns();
    return campaigns;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (data: any) => {
    const campaign = await campaignsService.createCampaign(data);
    return campaign;
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async ({ id, data }: { id: string; data: Partial<Campaign> }) => {
    const campaign = await campaignsService.updateCampaign(id, data);
    return campaign;
  }
);

export const fetchCampaignMetrics = createAsyncThunk(
  'campaigns/fetchMetrics',
  async (id: string) => {
    const metrics = await campaignsService.getCampaignMetrics(id);
    return { id, metrics };
  }
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    selectCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch campaigns';
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.campaigns.push(action.payload);
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const index = state.campaigns.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }
      })
      .addCase(fetchCampaignMetrics.fulfilled, (state, action) => {
        state.metrics[action.payload.id] = action.payload.metrics;
      });
  }
});

export const { selectCampaign, clearError } = campaignsSlice.actions;
export default campaignsSlice.reducer;