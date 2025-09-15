// src/app/(chat)/chat/[sessionId]/page.tsx
// src/app/(chat)/chat/[sessionId]/page.tsx
// src/app/(chat)/chat/[sessionId]/page.tsx
"use client";

// 1. Import 'use' from React
import { use, useEffect, useRef } from "react";
import { api } from "~/lib/trpc/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import type { RouterOutputs } from "~/lib/trpc/shared";

type Message = RouterOutputs["chat"]["getMessages"][0];
type SendMessageOutput = RouterOutputs["chat"]["sendMessage"];

// 2. Type 'params' as a Promise
export default function ChatPage({ params }: { params: Promise<{ sessionId: string }> }) {
  // 3. "Unwrap" the promise to get the params object
  const resolvedParams = use(params);

  const router = useRouter();
  const utils = api.useUtils();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 4. Use 'resolvedParams' everywhere instead of 'params'
  const messagesQuery = api.chat.getMessages.useQuery(
    { sessionId: resolvedParams.sessionId },
    { enabled: resolvedParams.sessionId !== "new" }
  );

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onSuccess: (data: SendMessageOutput) => {
      if (resolvedParams.sessionId === 'new') {
        router.push(`/chat/${data.sessionId}`);
      }
      utils.chat.getMessages.invalidate({ sessionId: data.sessionId });
      utils.chat.getChatSessions.invalidate();
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    const message = input.value.trim();

    if (message) {
      sendMessageMutation.mutate({
        sessionId: resolvedParams.sessionId === 'new' ? undefined : resolvedParams.sessionId,
        message,
      });
      input.value = "";
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 100);
      }
    }
  }, [messagesQuery.data]);

  return (
    <div className="flex h-screen flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messagesQuery.isLoading && <p>Loading messages...</p>}
          {messagesQuery.isError && <p>Error loading messages.</p>}

          {messagesQuery.data?.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 lg:max-w-md ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            name="message"
            placeholder="Ask about your career path..."
            autoComplete="off"
            disabled={sendMessageMutation.isPending}
          />
          <Button type="submit" disabled={sendMessageMutation.isPending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}