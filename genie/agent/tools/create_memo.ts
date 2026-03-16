import { tool } from "@openai/agents";
import { z } from "zod";

const parameters = z.object({
  bookingUid: z.string(),
  attendeeName: z.string(),
  attendeeEmail: z.string(),
  summary: z.string(),
  details: z.string().optional(),
  businessContext: z.string().optional(),
});

export const create_memo = tool({
  name: "create_memo",
  description:
    "Create an internal memo summarizing the user's problem, context, and discussed solutions after a meeting is booked.",
  parameters: parameters,
  async execute(input: z.infer<typeof parameters>): Promise<{ success: boolean, memo?: string, error?: string }> {
    const { bookingUid, attendeeName, attendeeEmail, summary, details, businessContext } = input;

    if (!bookingUid || !attendeeName || !attendeeEmail || !summary) {
      return {
        success: false,
        error:
          "Missing required fields. bookingUid, attendeeName, attendeeEmail, and summary are all required.",
      };
    }

    const memo = {
      bookingUid,
      attendeeName,
      attendeeEmail,
      summary,
      details,
      businessContext,
      createdAt: new Date().toISOString(),
    };

    // For now, we simply return the memo so that the outer application
    // can decide how to persist it (e.g. database, CRM, or notes system).
    return {
      success: true,
      memo: JSON.stringify(memo),
    };
  },
});

