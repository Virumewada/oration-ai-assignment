// src/server/api/routers/_app.ts

import { createTRPCRouter } from "~/server/api/trpc";
import { chatRouter } from "./chat"; // <-- 1. IMPORT IT

export const appRouter = createTRPCRouter({
  chat: chatRouter, // <-- 2. ADD IT HERE
});

export type AppRouter = typeof appRouter;