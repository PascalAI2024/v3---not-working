// Core application types for ViciNext

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  status: UserStatus;
  permissions: string[];
}

export type UserStatus = 'active' | 'inactive' | 'suspended';

// Lead and call related types
export interface Lead {
  id: string;
  name: string;
  phone: string;
  alternatePhones: string[];
  location: string;
  lastContact: string;
  notes: string;
  attempts: number;
  script: string;
  customFields: Record<string, string>;
  callbackTime?: string;
  callbackAgent?: string;
  campaign: string;
  priority: number;
  sentiment?: SentimentAnalysis;
  aiTags?: string[];
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  keywords: string[];
  topics: string[];
  nextBestAction: string;
}

// Call state and control types
export type CallState = 
  | 'idle' 
  | 'preview' 
  | 'connecting' 
  | 'ringing' 
  | 'answered' 
  | 'voicemail' 
  | 'transferring' 
  | 'onHold' 
  | 'wrappingUp' 
  | 'disconnected';

export interface CallControls {
  mute: boolean;
  volume: number;
  recording: boolean;
  onHold: boolean;
}

export type DispositionType = 
  | 'interested' 
  | 'callback' 
  | 'notInterested' 
  | 'noAnswer' 
  | 'voicemail' 
  | 'wrongNumber' 
  | 'doNotCall' 
  | 'transferred';

// Agent related types
export interface Agent extends User {
  extension: string;
  skills: string[];
  campaigns: string[];
  metrics: AgentMetrics;
}

export interface AgentMetrics {
  contactRate: number;
  conversionRate: number;
  avgTalkTime: string;
  totalCalls: number;
  qualityScore: number;
}

export type AgentStatus = 
  | 'available'
  | 'onCall'
  | 'break'
  | 'lunch'
  | 'meeting'
  | 'training'
  | 'offline';

// Campaign related types
export interface Campaign {
  id: string;
  name: string;
  type: 'outbound' | 'inbound' | 'blended';
  status: 'active' | 'paused' | 'completed' | 'scheduled';
  startDate: string;
  endDate: string;
  totalLeads: number;
  completedLeads: number;
  assignedAgents: string[];
  script: string;
  metrics: CampaignMetrics;
}

export interface CampaignMetrics {
  contactRate: number;
  conversionRate: number;
  avgCallDuration: string;
  totalCalls: number;
  successfulCalls: number;
  callsPerHour: number;
}

// AI and Analytics types
export interface AIReport {
  id: string;
  type: 'sentiment' | 'performance' | 'prediction' | 'optimization';
  title: string;
  summary: string;
  timestamp: string;
  metrics: AIMetric[];
  recommendations: AIRecommendation[];
  trends: AITrend[];
}

export interface AIMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  description: string;
}

export interface AIRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  implementation: string;
}

export interface AITrend {
  name: string;
  data: number[];
  labels: string[];
  prediction: number[];
}