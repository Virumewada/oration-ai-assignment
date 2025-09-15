// src/server/api/routers/chat.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import db from "~/lib/db";
import { type Message } from "@prisma/client";

async function getAIResponse(history: Message[]) {
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const systemPrompt = "You are a helpful and encouraging career counselor. You provide insightful, practical, and positive advice to users seeking guidance on their professional journey. Be supportive and provide actionable steps. Start the conversation by introducing yourself and asking how you can help.";
  
  if (formattedHistory.length > 0 && formattedHistory[0].role === 'user') {
      formattedHistory[0].parts[0].text = `${systemPrompt}\n\nUSER: ${formattedHistory[0].parts[0].text}`;
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  // This is the corrected line with the new model name
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedHistory,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google AI API Error:", errorBody);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = (await response.json()) as { candidates: { content: { parts: { text: string }[] } }[] };
    return data.candidates[0]?.content.parts[0]?.text ?? "I'm sorry, I couldn't generate a response.";

  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "There was an error connecting to the AI service. Please try again later.";
  }
}

export const chatRouter = createTRPCRouter({
    getChatSessions: publicProcedure.query(async () => {
        const sessions = await db.chatSession.findMany({
          orderBy: { updatedAt: "desc" },
        });
        return sessions;
      }),
      getMessages: publicProcedure
        .input(z.object({ sessionId: z.string() }))
        .query(async ({ input }) => {
          const messages = await db.message.findMany({
            where: { chatSessionId: input.sessionId },
            orderBy: { createdAt: "asc" },
          });
          return messages;
        }),
      sendMessage: publicProcedure
        .input(z.object({ sessionId: z.string().optional(), message: z.string() }))
        .mutation(async ({ input }) => {
          const { message } = input;
          let sessionId = input.sessionId;
          if (!sessionId) {
            const newSession = await db.chatSession.create({
              data: { topic: message.substring(0, 40) },
            });
            sessionId = newSession.id;
          }
          await db.message.create({
            data: { content: message, role: "user", chatSessionId: sessionId },
          });
          const history = await db.message.findMany({
            where: { chatSessionId: sessionId },
            orderBy: { createdAt: "asc" },
          });
          const aiResponse = await getAIResponse(history);
          await db.message.create({
            data: { content: aiResponse, role: "assistant", chatSessionId: sessionId },
          });
          return { sessionId };
        }),
});