import { calClient } from "../../api/calClient";
import { tool } from "@openai/agents"
import { z } from "zod";
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

export const fetch_availability = tool({
  name: "fetch_availability",
  description:
    "Check available Cal.com time slots for a given username and event slug between startTime and endTime (ISO 8601).",
  parameters: z.object({
    username: z.string(),
    eventSlug: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    timeZone: z.string().optional(),
  }),
  async execute(
    input: FetchAvailabilityInput
  ): Promise<FetchAvailabilityResult> {
    try {
      const { username, eventSlug, startTime, endTime, timeZone } = input;

      if (!username || !eventSlug || !startTime || !endTime) {
        return {
          slots: [],
          error:
            "Missing required fields. username, eventSlug, startTime, and endTime are all required.",
        };
      }

      const params: Record<string, string> = {
        username,
        eventSlug,
        startTime,
        endTime,
      };

      if (timeZone) {
        params.timeZone = timeZone;
      }

      const response = await calClient.get("/slots", { params });

      const data = response.data as {
        data?: { slots?: Record<string, { time: string }[]> };
      };

      const rawSlots = data.data?.slots ?? {};

      const normalized: NormalizedSlot[] = Object.entries(rawSlots).map(
        ([date, times]) => ({
          date,
          times: (times ?? []).map((t) => t.time),
        })
      );

      return {
        slots: normalized,
        raw: data,
      };
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch availability from Cal.com.";

      return {
        slots: [],
        error: message,
        status,
      };
    }
  },
});

