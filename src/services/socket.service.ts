import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { updateCallState } from '../store/slices/callsSlice';
import { updateAgentStatus } from '../store/slices/agentsSlice';
import type { CallState, AgentStatus } from '../types';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io('/ws', {
      auth: {
        token: localStorage.getItem('auth_token')
      }
    });

    this.setupListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupListeners() {
    if (!this.socket) return;

    // Call state updates
    this.socket.on('call_state_change', ({ leadId, state }: { leadId: string; state: CallState }) => {
      store.dispatch(updateCallState({ leadId, state }));
    });

    // Agent status updates
    this.socket.on('agent_status_change', ({ agentId, status }: { agentId: string; status: AgentStatus }) => {
      store.dispatch(updateAgentStatus({ id: agentId, status }));
    });

    // Reconnection handling
    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected. Attempting to reconnect...');
    });

    this.socket.on('reconnect', () => {
      console.log('WebSocket reconnected');
    });
  }

  // Emit events
  emitCallState(leadId: string, state: CallState) {
    this.socket?.emit('call_state_change', { leadId, state });
  }

  emitAgentStatus(status: AgentStatus) {
    this.socket?.emit('agent_status_change', { status });
  }
}

export default new SocketService();