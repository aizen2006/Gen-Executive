import { startServer } from "./server.ts";

const port = Number(process.env.PORT) || 4000;

startServer(port);