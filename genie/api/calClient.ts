import axios from "axios";
import "dotenv/config";
import type { FetchAvailabilityInput } from "./model.ts";

const CAL_API_VERSION = "2024-08-13";
const DEFAULT_BASE_URL = "https://api.cal.com/v2";

const calClient = axios.create({
  baseURL: process.env.CAL_BASE_URL || DEFAULT_BASE_URL,
  headers: {
    "cal-api-version": CAL_API_VERSION,
    "Content-Type": "application/json",
  },
});

calClient.interceptors.request.use((config) => {
  const apiKey = process.env.CAL_API_KEY;
  if (apiKey) {
    (config.headers as any) = {
      ...(config.headers as any),
      Authorization: `Bearer ${apiKey}`,
    };
  }
  return config;
});

const check_availability = async (params: FetchAvailabilityInput) => {
  const { username, eventSlug, startTime, endTime, timeZone } = params;

  const query: Record<string, string> = {
    username,
    eventSlug,
    startTime,
    endTime,
  };

  if (timeZone) {
    query.timeZone = timeZone;
  }

  const response = await calClient.get("/slots", {
    params: query,
  });
  return response;
};

const schedule_meeting = async (
  username: string,
  eventSlug: string,
  startTime: string,
  attendeeName: string,
  attendeeEmail: string,
  attendeeTimeZone: string,
  bookingFieldsResponses?: Record<string, string>,
  instant?: boolean
) => {
  const body: any = {
    eventTypeSlug: eventSlug,
    username,
    start: startTime,
    attendee: {
      name: attendeeName,
      email: attendeeEmail,
      timeZone: attendeeTimeZone,
    },
  };

  if (bookingFieldsResponses) {
    body.bookingFieldsResponses = bookingFieldsResponses;
  }

  if (instant !== undefined) {
    body.instant = instant;
  }

  const response = await calClient.post("/bookings", body);
  return response;
};

const cancel_meeting = async (bookingUid: string, cancellationReason: string) => {
  const response = await calClient.post(
    `/bookings/${bookingUid}/cancel`,
    {
      cancellationReason,
    }
  );
  return response;
};

const reschedule_meeting = async (
  bookingUid: string,
  newStartTime: string,
  rescheduledReason: string
) => {
  const response = await calClient.post(`/bookings/${bookingUid}/reschedule`, {
    newStartTime,
    rescheduledReason,
  });
  return response;
};

export { check_availability, schedule_meeting, cancel_meeting, reschedule_meeting };