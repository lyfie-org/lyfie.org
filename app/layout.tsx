import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/Layout/SiteFooter";
import { SiteHeader } from "@/components/Layout/SiteHeader";
import { PetalEngine } from "@/components/Motion/PetalEngine";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { siteConfig } from "@/lib/constants/site";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const themeBootstrapScript = `
(() => {
  try {
    const key = "lyfie-theme";
    const saved = localStorage.getItem(key);
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved === "light" || saved === "dark" ? saved : systemDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch (_error) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lyfie | Open-Source, Docker-First Products",
    template: "%s | Lyfie"
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  category: "technology",
  authors: [{ name: "Lyfie Contributors" }],
  creator: "Lyfie",
  publisher: "Lyfie",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": 320,
      "max-video-preview": 60
    }
  },
  openGraph: {
    type: "website",
    locale: siteConfig.defaultLocale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Lyfie | Open-source software that outpaces the horizon",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lyfie - Outpace the horizon"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyfie | Open-source software that outpaces the horizon",
    description: siteConfig.description,
    images: ["/twitter-image"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" }
  ],
  colorScheme: "light dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <ThemeProvider>
          <PetalEngine />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
