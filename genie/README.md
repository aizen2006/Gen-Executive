# Genie – AI Sales Assistant Service

Genie is a small service that wraps the GenExecutive AI sales assistant agent and exposes it as:

- A **Socket.IO-based chat API** for use in a web chat widget.
- A set of **Cal.com-powered scheduling tools** the agent can call to check availability, book meetings, and create memos.

This package lives under `genexecutive/genie` and is intended to run as a standalone Node.js service.

## Features

- **Genie agent** configured with `@openai/agents` in `agent/agent.ts`.
- **Cal.com tools**:
  - `fetch_availability` – calls `GET /v2/slots`.
  - `meeting_schedule` – calls `POST /v2/bookings`.
  - `create_memo` – builds a structured memo after a meeting is booked.
- **Chat transport**:
  - `Express` + `Socket.IO` server in `api/server.ts` and `api/socket.ts`.
  - `chatWithGenie` service in `api/service.ts` that keeps simple in-memory session history and delegates to the Genie agent.

## Project structure

- `agent/agent.ts` – Genie agent definition and tool wiring.
- `agent/tools/*.ts` – Cal.com and memo tools used by the agent.
- `api/service.ts` – Chat service that calls the agent (`chatWithGenie`).
- `api/socket.ts` – Socket.IO event handlers (`chat:join`, `chat:message`, etc.).
- `api/server.ts` – Express app + HTTP server + Socket.IO bootstrap.
- `api/index.ts` – Exports `startServer` / `createApp` for external entrypoints.

## Prerequisites

- Node.js 22+ (required by `@openai/agents`).
- A valid **OpenAI API configuration** in your environment so the agent can run.
- (Optional) A **Cal.com API key** (`CAL_API_KEY`) if you use authenticated Cal.com v2 endpoints.

## Installation

From the repo root (or inside `genie/` if you prefer):

```bash
cd genie
npm install
```

This installs:

- Runtime dependencies: `@openai/agents`, `express`, `socket.io`, `zod`.
- Dev dependencies: `typescript`, `ts-node`, `nodemon`, and type packages.

## Environment variables

Set these before running the service:

- `PORT` – Port for the Genie chat server (default: `4000`).
- `CHAT_WIDGET_ORIGIN` – Allowed CORS origin for your front-end chat widget (default: `*`).
- `CAL_API_KEY` – (Optional) Cal.com API key used by the Cal client where required.

## Scripts

Defined in `package.json`:

- `npm run dev` – Start the server in watch mode using `nodemon` + `ts-node`:

  - Entry: `api/server.ts`
  - Good for local development and testing the Socket.IO chat.

- `npm run build` – Compile TypeScript to JavaScript using `tsc` into `dist/`.

- `npm start` – Run the compiled server from `dist/api/index.js`.

> Note: You may need a `tsconfig.json` at the repo level (or within `genie/`) that includes the `agent` and `api` folders so `tsc` knows what to compile.

## Socket.IO chat API

Connect from your front-end chat widget using the standard Socket.IO client:

```ts
import { io } from "socket.io-client";

const socket = io("https://your-genie-host.example.com");

const sessionId = crypto.randomUUID();

socket.emit("chat:join", { sessionId });

socket.on("chat:message", (payload) => {
  // payload: { from: "user" | "agent", message: string, sessionId: string }
});

socket.on("chat:typing", ({ sessionId, typing }) => {
  // show/hide typing indicator
});

socket.on("chat:error", ({ sessionId, message }) => {
  // display error to user
});

function sendUserMessage(message: string) {
  socket.emit("chat:message", { sessionId, message });
}
```

### Events

- **Client → server**
  - `chat:join` – `{ sessionId: string, metadata?: any }`
  - `chat:message` – `{ sessionId: string, message: string }`

- **Server → client**
  - `chat:message` – `{ from: "user" | "agent", message: string, sessionId: string }`
  - `chat:typing` – `{ sessionId: string, typing: boolean }`
  - `chat:error` – `{ sessionId: string, message: string }`

## Cal.com tools

The Genie agent can:

- Use `fetch_availability` to call `GET /v2/slots` with:
  - `username`, `eventSlug`, `startTime`, `endTime`, optional `timeZone`.
- Use `meeting_schedule` to call `POST /v2/bookings` with:
  - `username`, `eventSlug`, `start`, attendee info, optional `bookingFieldsResponses`, optional `instant`.
- Use `create_memo` after booking to return a structured memo object summarizing the user’s needs and context.

These tools are already wired into `genie/agent/agent.ts` and are available to the agent during conversations.

