import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, Instrument_Serif } from "next/font/google";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--v3-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--v3-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashintha Nimsara — Creative Developer",
  description: "Portfolio v3: web, mobile and 3D motion work by Shashintha Nimsara.",
};

export default function V3Layout({ children }: { children: ReactNode }) {
  return <div className={`${sans.variable} ${serif.variable}`}>{children}</div>;
}
