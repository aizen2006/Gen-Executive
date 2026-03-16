import { tool } from "@openai/agents";
import { z } from "zod";
import { check_availability } from "../../api/calClient.ts";
import type {
  FetchAvailabilityInput,
  FetchAvailabilityResult,
} from "../../api/model.ts";

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

      const response = await check_availability({
        username,
        eventSlug,
        startTime,
        endTime,
        timeZone,
      });

      const slots = (response.data as any)?.slots ?? [];

      return {
        slots,
        raw: response.data,
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

