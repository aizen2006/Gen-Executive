export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatJoinPayload {
  sessionId: string;
  metadata?: Record<string, unknown>;
}

export interface ChatMessagePayload {
  sessionId: string;
  message: string;
}

export interface FetchAvailabilityInput {
  username: string;
  eventSlug: string;
  startTime: string;
  endTime: string;
  timeZone?: string;
}

export interface NormalizedSlot {
  date: string;
  times: string[];
}

export interface FetchAvailabilityResult {
  slots: NormalizedSlot[];
  raw?: unknown;
  error?: string;
  status?: number;
}

export interface CalClientConfig {
  baseUrl: string;
  apiKey: string;
  apiVersion: string;
}

