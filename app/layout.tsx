import type { Metadata } from "next";
import { Comfortaa, JetBrains_Mono, Manrope } from "next/font/google";

import "@/styles/globals.css";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const display = Comfortaa({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Lyfie | Under Construction",
  description: "Lyfie.org is currently being updated."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${display.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
