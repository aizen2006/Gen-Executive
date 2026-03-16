import { schedule_meeting } from "../../api/calClient.ts";
import { tool } from "@openai/agents";
import { z } from "zod";


const parameters = z.object({
  username: z.string(),
  eventSlug: z.string(),
  start: z.string(),
  attendeeName: z.string(),
  attendeeEmail: z.string(),
  attendeeTimeZone: z.string(),
  bookingFieldsResponses: z.record(z.string(), z.string()).optional(),
  instant: z.boolean().optional(),
});

export const meeting_schedule = tool({
  name: "meeting_schedule",
  description:
    "Schedule a Cal.com booking for a confirmed time using username, event slug, and attendee details.",
  parameters: parameters,
  async execute(
    input: z.infer<typeof parameters>
  ): Promise<{ success: boolean, bookingUid?: string, start?: string, data?: unknown, error?: string, status?: number }> {
    const {
      username,
      eventSlug,
      start,
      attendeeName,
      attendeeEmail,
      attendeeTimeZone,
      bookingFieldsResponses,
      instant,
    } = input;

    if (
      !username ||
      !eventSlug ||
      !start ||
      !attendeeName ||
      !attendeeEmail ||
      !attendeeTimeZone
    ) {
      return {
        success: false,
        error:
          "Missing required fields. username, eventSlug, start, attendeeName, attendeeEmail, and attendeeTimeZone are all required.",
      };
    }

    try {
      const response = await schedule_meeting(
        username,
        eventSlug,
        start,
        attendeeName,
        attendeeEmail,
        attendeeTimeZone,
        bookingFieldsResponses,
        instant
      );

      const booking = response.data;

      return {
        success: true,
        bookingUid: booking.bookingUid,
        start: booking.startTime,
        data: booking,
      };
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to schedule meeting with Cal.com.";

      return {
        success: false,
        error: message,
        status,
      };
    }
  },
});

