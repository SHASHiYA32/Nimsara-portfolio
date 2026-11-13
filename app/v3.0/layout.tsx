import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import '../global.css';

export const metadata: Metadata = {
  title: "Shashintha Nimsara — Full-Stack Developer & UI/UX Specialist",
  description:
    "Portfolio of Shashintha Nimsara: full-stack developer and UI/UX specialist building fast, polished, production-ready web products.",
};

export const viewport: Viewport = {
  themeColor: "#07070a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
