import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CallState, Lead } from '../../types';

interface CallsState {
  currentLead: Lead | null;
  callState: CallState;
  isActive: boolean;
  isPaused: boolean;
  pauseReason: string;
  totalCalls: number;
  successfulCalls: number;
  callDuration: number;
}

const initialState: CallsState = {
  currentLead: null,
  callState: 'idle',
  isActive: false,
  isPaused: false,
  pauseReason: '',
  totalCalls: 0,
  successfulCalls: 0,
  callDuration: 0
};

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setCurrentLead: (state, action: PayloadAction<Lead | null>) => {
      state.currentLead = action.payload;
    },
    updateCallState: (state, action: PayloadAction<CallState>) => {
      state.callState = action.payload;
    },
    toggleActive: (state) => {
      state.isActive = !state.isActive;
      if (!state.isActive) {
        state.isPaused = false;
        state.pauseReason = '';
      }
    },
    togglePause: (state, action: PayloadAction<string>) => {
      state.isPaused = !state.isPaused;
      state.pauseReason = state.isPaused ? action.payload : '';
    },
    incrementCalls: (state) => {
      state.totalCalls += 1;
    },
    incrementSuccessfulCalls: (state) => {
      state.successfulCalls += 1;
    },
    updateCallDuration: (state, action: PayloadAction<number>) => {
      state.callDuration = action.payload;
    },
    resetCallState: (state) => {
      state.currentLead = null;
      state.callState = 'idle';
      state.callDuration = 0;
    }
  }
});

export const {
  setCurrentLead,
  updateCallState,
  toggleActive,
  togglePause,
  incrementCalls,
  incrementSuccessfulCalls,
  updateCallDuration,
  resetCallState
} = callsSlice.actions;

export const callsReducer = callsSlice.reducer;

export const selectCalls = (state: { calls: CallsState }) => state.calls;
export const selectCurrentLead = (state: { calls: CallsState }) => state.calls.currentLead;
export const selectCallState = (state: { calls: CallsState }) => state.calls.callState;
export const selectIsActive = (state: { calls: CallsState }) => state.calls.isActive;
export const selectIsPaused = (state: { calls: CallsState }) => state.calls.isPaused;