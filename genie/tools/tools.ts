import { tool , createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const headers = {
    "Authorization":`Bearer ${process.env.CAL_API_KEY}`,
    "Content-Type": "application/json",
    "cal-api-version":"2024-08-13"
};

// tools 
const check_availability = tool(
    "check_availability", //Name
    "Get the availability of the Owner for meeting",//Definiation
    {
        eventTypeSlug:z.string().default("15min").describe("The event meeting is scheduled for (Duration of meeting)"),
        startTime:z.string().datetime(),
        endTime:z.string().datetime(),
    },//Input Schema
    async (args) => {
        try {
            const response = await fetch(
                `https://api.cal.com/v2/slots?username=bailey&eventSlug=${args.eventTypeSlug}&startTime=${args.startTime}&endTime=${args.endTime}`,
                {
                    method:"GET",
                    headers
                }
            );
            const response_data: any = await response.json();
            return {
                content:[{type:"text",text: JSON.stringify(response_data.data.slots) }]
            }
        } catch (error) {
            throw Error("error while fetching the availability:",error)
        }
    }
)

const create_bookings = tool(
    "create_booking",
    "Books a timeslot for the attendee to do a meeting with Abhik ",
    {
        eventTypeSlug:z.string().describe("The event meeting is scheduled for (Duration of meeting)"),
        attendee:z.object({
            name:z.string().describe("The name of the attendee"),
            email:z.string().describe("The email of the attendee"),
            timezone:z.string().describe("The timezone of the attendee")
        }).describe("The attendee details"),
        start:z.string().datetime().describe("The start time of the meeting"),
    },
    async (args) => {
        try {
            const response : any = fetch("https://api.cal.com/v2/bookings", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "cal-api-version": "2024-08-13",
                },
                body: JSON.stringify({
                  eventTypeSlug: args.eventTypeSlug,
                  username: process.env.USERNAME,
                  start: args.start,
                  attendee: {
                    name: args.attendee.name,
                    email: args.attendee.email,
                    timeZone: args.attendee.timezone,
                  },
                }),
              }
            )
            const response_data: any = await response.json();
            console.log(response_data);
            return {
                content:[{type:"text",text:`The Booking has been made successfully`}]
            }
            
        } catch (error) {
            throw Error("Error while booking the meeting:",error)
        }
    }
)

const reschedule_booking = tool(
    "reschedule_booking",
    "Reschedule the already scheduled meeting to another available time",
    {
        bookingUid:z.string().describe("The booking uid of the meeting to be rescheduled"),
        start:z.string().datetime().describe("The start time of the meeting"),
        rescheduleReason:z.string().describe("The reason for rescheduling the meeting")

    },
    async  (args) => {
        try {
            const response = await fetch(
                `https://api.cal.com/v2/bookings/${args.bookingUid}/reschedule`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "cal-api-version": "2024-08-13",
                  },
                  body: JSON.stringify({
                    start: args.start,
                    rescheduleReason: args.rescheduleReason,
                  }),
                }
              );
          
              const data = await response.json();
              console.log(data);
              return {
                content:[{type:"text",text:`The Booking has been rescheduled successfully`}]
            }
        } catch (error) {
            throw Error("Error while rescheduling the MeetingsL:",error)
        }
    }
)





// In-process mcp server

export const caldotcomServer = createSdkMcpServer({
    name:"CalDotCom",
    version:"1.0.0",
    tools: [check_availability , reschedule_booking , create_bookings ]
});