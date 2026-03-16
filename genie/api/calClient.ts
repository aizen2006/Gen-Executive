import axios, { AxiosInstance } from "axios";

export interface CalClientConfig {
  apiKey?: string;
  baseUrl?: string;
}

export const CAL_API_VERSION = "2024-08-13";

const defaultBaseUrl = "https://api.cal.com/v2";

function createAxiosInstance(config: CalClientConfig = {}): AxiosInstance {
  const apiKey = config.apiKey ?? process.env.CAL_API_KEY;
  const baseURL = config.baseUrl ?? defaultBaseUrl;

  const headers: Record<string, string> = {
    "cal-api-version": CAL_API_VERSION,
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  return axios.create({
    baseURL,
    headers,
  });
}

export const calClient = createAxiosInstance();

