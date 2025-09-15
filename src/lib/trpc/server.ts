// src/lib/trpc/server.ts
import {
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
} from "@trpc/client";
import { headers } from "next/headers";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/routers/_app";
import { getUrl } from "./shared";

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) => process.env.NODE_ENV === "development",
    }),
    httpBatchLink({
      url: getUrl(),
      // This is the corrected headers function
      async headers() {
        return {
          cookie: (await headers()).get("cookie") ?? "",
        };
      },
      transformer: superjson,
    }),
  ],
});