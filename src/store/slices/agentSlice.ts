import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AgentStatus } from '../../types';

interface AgentState {
  status: AgentStatus;
  pauseReason: string | null;
  activeTime: number;
  breakTime: number;
  callsHandled: number;
  lastActivity: string | null;
}

const initialState: AgentState = {
  status: 'offline',
  pauseReason: null,
  activeTime: 0,
  breakTime: 0,
  callsHandled: 0,
  lastActivity: null,
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<AgentStatus>) => {
      state.status = action.payload;
      state.lastActivity = new Date().toISOString();
    },
    setPauseReason: (state, action: PayloadAction<string | null>) => {
      state.pauseReason = action.payload;
    },
    incrementActiveTime: (state) => {
      state.activeTime += 1;
    },
    incrementBreakTime: (state) => {
      state.breakTime += 1;
    },
    incrementCallsHandled: (state) => {
      state.callsHandled += 1;
    },
    resetStats: (state) => {
      state.activeTime = 0;
      state.breakTime = 0;
      state.callsHandled = 0;
    },
  },
});

export const {
  setStatus,
  setPauseReason,
  incrementActiveTime,
  incrementBreakTime,
  incrementCallsHandled,
  resetStats,
} = agentSlice.actions;

export default agentSlice.reducer;