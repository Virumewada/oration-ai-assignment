// src/app/(chat)/chat/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewChatPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/chat/new');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-gray-500">Starting a new chat...</p>
    </div>
  );
}