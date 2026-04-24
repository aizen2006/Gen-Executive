export interface GenieStreamStatus {
  phase: 'starting' | 'streaming' | 'done';
}

export interface GenieStreamError {
  message: string;
}

export interface GenieStreamChunk {
  text: string;
}

interface GenieStreamHandlers {
  onStatus?: (payload: GenieStreamStatus) => void;
  onChunk?: (payload: GenieStreamChunk) => void;
  onError?: (payload: GenieStreamError) => void;
  onDone?: () => void;
}

const getGenieApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_GENIE_API_URL as string | undefined;
  return envUrl?.trim().replace(/\/$/, '') ?? '';
};

const getChatEndpoint = () => `${getGenieApiBaseUrl()}/chat`;

const dispatchSseEvent = (eventName: string, rawData: string, handlers: GenieStreamHandlers) => {
  let payload: unknown = {};

  if (rawData) {
    try {
      payload = JSON.parse(rawData);
    } catch {
      payload = { message: rawData };
    }
  }

  switch (eventName) {
    case 'status':
      handlers.onStatus?.(payload as GenieStreamStatus);
      break;
    case 'chunk':
      handlers.onChunk?.(payload as GenieStreamChunk);
      break;
    case 'error':
      handlers.onError?.(payload as GenieStreamError);
      break;
    case 'done':
      handlers.onDone?.();
      break;
    default:
      break;
  }
};

const processSseBuffer = (buffer: string, handlers: GenieStreamHandlers) => {
  let remaining = buffer;

  while (true) {
    const boundaryIndex = remaining.indexOf('\n\n');
    if (boundaryIndex === -1) {
      return remaining;
    }

    const rawEvent = remaining.slice(0, boundaryIndex);
    remaining = remaining.slice(boundaryIndex + 2);

    let eventName = 'message';
    const dataLines: string[] = [];

    for (const line of rawEvent.split('\n')) {
      if (line.startsWith('event:')) {
        eventName = line.slice(6).trim();
      }
      if (line.startsWith('data:')) {
        dataLines.push(line.slice(5).trim());
      }
    }

    dispatchSseEvent(eventName, dataLines.join('\n'), handlers);
  }
};

export const streamGenieMessage = async (
  message: string,
  handlers: GenieStreamHandlers,
) => {
  const response = await fetch(getChatEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok || !response.body) {
    let errorMessage = `Genie chat request failed with status ${response.status}`;

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        errorMessage = payload.message;
      }
    } catch {
      // Keep the fallback error message when the response is not JSON.
    }

    throw new Error(errorMessage);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');
    buffer = processSseBuffer(buffer, handlers);
  }

  if (buffer.trim()) {
    processSseBuffer(`${buffer}\n\n`, handlers);
  }
};
