// src/app/page.tsx
'use client'; // Redirects are client-side interactions, so this is needed.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  // This effect will run once when the component loads on the client
  useEffect(() => {
    // It immediately replaces the current URL ('/') with '/chat'
    router.replace('/chat');
  }, [router]);

  // We can show a simple loading message while the redirect happens
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>Redirecting to the AI Career Counselor...</p>
    </main>
  );
}