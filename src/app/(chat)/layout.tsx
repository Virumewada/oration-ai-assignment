// src/app/(chat)/layout.tsx

// Corrected to import 'api', not 'serverApi'
import { api } from "~/lib/trpc/server"; 

import ChatSidebar from "~/components/chat/ChatSidebar";

// This line tells Next.js to always render this page dynamically
export const dynamic = 'force-dynamic';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Corrected to use 'api'
  const chatSessions = await api.chat.getChatSessions.query();

  return (
    <div className="flex h-screen w-full">
      <div className="hidden w-1/4 max-w-xs border-r bg-gray-50 dark:bg-gray-900 md:block">
        <ChatSidebar sessions={chatSessions} />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}