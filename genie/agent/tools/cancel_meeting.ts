import { tool } from "@openai/agents";
import { z } from "zod";
import { cancel_meeting } from "../../api/calClient.ts";

const parameters = z.object({
  bookingUid: z.string(),
  cancellationReason: z.string(),
});

export const cancel_meeting_tool = tool({
  name: "cancel_meeting",
  description: "Cancel a Cal.com booking using the booking UID and cancellation reason.",
  parameters: parameters,
  async execute(input: z.infer<typeof parameters>): Promise<{ success: boolean, error?: string }> {
    const { bookingUid, cancellationReason } = input;
    if (!bookingUid || !cancellationReason) {
      return {
        success: false,
        error: "Missing required fields. bookingUid and cancellationReason are all required.",
      };
    }
    try {
        const response = await cancel_meeting(bookingUid, cancellationReason);
        return {
          success: true,
        };
    } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to cancel meeting with Cal.com.";
        return {
          success: false,
          error: message,
        };
    }
  }
});