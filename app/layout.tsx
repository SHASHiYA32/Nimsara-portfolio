import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nimsara Perera — Senior Full-stack Developer & UI/UX Specialist',
  description: 'Dark minimalist developer portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and frosted glass UI aesthetics.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased min-h-screen relative selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
