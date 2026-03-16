import { tool } from "@openai/agents";
import { z } from "zod";
import { reschedule_meeting } from "../../api/calClient.ts";

const parameters = z.object({
  bookingUid: z.string(),
  newStartTime: z.string(),
  rescheduledReason: z.string(),
});

export const reschedule_meeting_tool = tool({
  name: "reschedule_meeting",
  description: "Reschedule a Cal.com booking using the booking UID, new start time, and recheduled reason.",
  parameters: parameters,
  async execute(input: z.infer<typeof parameters>): Promise<{ success: boolean, error?: string }> {
    const { bookingUid, newStartTime, rescheduledReason } = input;
    if (!bookingUid || !newStartTime || !rescheduledReason) {
      return {
        success: false,
        error: "Missing required fields. bookingUid, newStartTime, and rescheduledReason are all required.",
      };
    }
    try {
        const response = await reschedule_meeting(bookingUid, newStartTime, rescheduledReason);
        return {
          success: true,
        };
    } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to reschedule meeting with Cal.com.";
        return {
          success: false,
          error: message,
        };
    }
  }
})