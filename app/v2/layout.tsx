import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashintha Nimsara — Full-Stack Developer & UI/UX Specialist",
  description:
    "Portfolio of Shashintha Nimsara, a full-stack developer and UI/UX specialist from Kandy, Sri Lanka, building scalable, fast, production-ready web apps.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
  ],
};

// Runs before first paint: restores the saved theme and flags that JS is on.
const bootScript = `
try{
  var d=document.documentElement;
  d.dataset.js="1";
  d.dataset.theme=localStorage.getItem("theme")||"dark";
}catch(e){document.documentElement.dataset.theme="dark"}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`.loader{display:none!important}html{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
