// app/layout.js
import { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "10K Run Tracker — Sub 60:00",
  description:
    "Track your 11-week 10K training plan with daily workouts, pace guides, split targets, and a live race countdown to crush sub 60:00 on May 24, 2026.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", type: "image/svg+xml", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${bebas.variable} ${dmMono.variable}`}>{children}</body>
    </html>
  );
}
