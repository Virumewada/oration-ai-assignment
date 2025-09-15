// src/components/chat/ChatSidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { RouterOutputs } from "~/lib/trpc/shared";

type ChatSession = RouterOutputs["chat"]["getChatSessions"][0];

export default function ChatSidebar({
  sessions,
}: {
  sessions: ChatSession[];
}) {
  return (
    <div className="flex h-full flex-col p-4">
      <Link href="/chat">
        <Button className="w-full">New Chat</Button>
      </Link>
      <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500">History</p>
        {sessions.map((session) => (
          <Link
            key={session.id}
            href={`/chat/${session.id}`}
            className="block truncate rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {session.topic}
          </Link>
        ))}
      </div>
    </div>
  );
}