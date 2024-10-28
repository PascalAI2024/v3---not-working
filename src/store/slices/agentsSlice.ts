import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agentsService from '../../services/agents.service';
import { Agent, AgentMetrics, AgentStatus } from '../../types';

interface AgentsState {
  agents: Agent[];
  metrics: Record<string, AgentMetrics>;
  isLoading: boolean;
  error: string | null;
}

const initialState: AgentsState = {
  agents: [],
  metrics: {},
  isLoading: false,
  error: null
};

export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async () => {
    const agents = await agentsService.getAgents();
    return agents;
  }
);

export const updateAgentStatus = createAsyncThunk(
  'agents/updateStatus',
  async ({ id, status }: { id: string; status: AgentStatus }) => {
    await agentsService.updateAgentStatus(id, status);
    return { id, status };
  }
);

export const fetchAgentMetrics = createAsyncThunk(
  'agents/fetchMetrics',
  async (id: string) => {
    const metrics = await agentsService.getAgentMetrics(id);
    return { id, metrics };
  }
);

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      })
      .addCase(updateAgentStatus.fulfilled, (state, action) => {
        const agent = state.agents.find(a => a.id === action.payload.id);
        if (agent) {
          agent.status = action.payload.status;
        }
      })
      .addCase(fetchAgentMetrics.fulfilled, (state, action) => {
        state.metrics[action.payload.id] = action.payload.metrics;
      });
  }
});

export const { clearError } = agentsSlice.actions;
export default agentsSlice.reducer;