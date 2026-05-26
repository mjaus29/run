import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});
const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Fire to Earth 10K Progression",
  description:
    "Track a 24-week 10K progression that starts from a completed 60:00 Fire run and targets Water 55:00, Air 50:00, and Earth 45:00 through three weekly runs.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04101d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${heading.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
