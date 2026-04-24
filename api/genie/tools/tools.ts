import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const calApiVersion = "2024-08-13";

const getCalConfig = () => {
    const apiKey = process.env.CAL_API_KEY?.trim();
    const username = process.env.CAL_USERNAME?.trim() || process.env.USERNAME?.trim();

    if (!apiKey || !username) {
        throw new Error("Cal.com is not configured. Set CAL_API_KEY and CAL_USERNAME on the server.");
    }

    return { apiKey, username };
};

const check_availability = tool(
    "check_availability",
    "Get the available Cal.com slots for the meeting owner.",
    {
        eventTypeSlug:z.string().default("15min").describe("Cal.com event type slug."),
        startTime:z.string().datetime(),
        endTime:z.string().datetime(),
    },
    async (args) => {
        const { apiKey, username } = getCalConfig();
        const searchParams = new URLSearchParams({
            username,
            eventSlug: args.eventTypeSlug,
            startTime: args.startTime,
            endTime: args.endTime,
        });

        const response = await fetch(`https://api.cal.com/v2/slots?${searchParams.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "cal-api-version": calApiVersion,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch availability. Cal.com returned ${response.status}.`);
        }

        const responseData = await response.json();

        return {
            content: [{ type: "text", text: JSON.stringify(responseData.data?.slots ?? {}) }],
        };
    }
);

const create_bookings = tool(
    "create_booking",
    "Create a Cal.com booking for the attendee.",
    {
        eventTypeSlug:z.string().describe("Cal.com event type slug."),
        attendee:z.object({
            name:z.string().describe("The attendee's name."),
            email:z.string().describe("The attendee's email."),
            timezone:z.string().describe("The attendee's timezone."),
        }).describe("Attendee details."),
        start:z.string().datetime().describe("Meeting start time."),
    },
    async (args) => {
        const { apiKey, username } = getCalConfig();

        const response = await fetch("https://api.cal.com/v2/bookings", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                  "cal-api-version": calApiVersion,
                },
                body: JSON.stringify({
                  eventTypeSlug: args.eventTypeSlug,
                  username,
                  start: args.start,
                  attendee: {
                    name: args.attendee.name,
                    email: args.attendee.email,
                    timeZone: args.attendee.timezone,
                  },
                }),
              }
            );

        if (!response.ok) {
            throw new Error(`Failed to create booking. Cal.com returned ${response.status}.`);
        }

        const responseData = await response.json();

        return {
            content: [{ type: "text", text: JSON.stringify(responseData.data ?? responseData) }],
        };
    }
);

const reschedule_booking = tool(
    "reschedule_booking",
    "Reschedule an existing Cal.com booking.",
    {
        bookingUid:z.string().describe("The Cal.com booking UID."),
        start:z.string().datetime().describe("The new start time."),
        rescheduleReason:z.string().describe("Why the meeting is being rescheduled."),

    },
    async  (args) => {
        const { apiKey } = getCalConfig();

        const response = await fetch(
            `https://api.cal.com/v2/bookings/${args.bookingUid}/reschedule`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "cal-api-version": calApiVersion,
              },
              body: JSON.stringify({
                start: args.start,
                rescheduleReason: args.rescheduleReason,
              }),
            }
          );

        if (!response.ok) {
            throw new Error(`Failed to reschedule booking. Cal.com returned ${response.status}.`);
        }

        const data = await response.json();
        return {
            content: [{ type: "text", text: JSON.stringify(data.data ?? data) }],
        };
    }
);

export const caldotcomServer = createSdkMcpServer({
    name:"CalDotCom",
    version:"1.0.0",
    tools: [check_availability , reschedule_booking , create_bookings ]
});
