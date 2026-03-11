import type { Metadata } from "next";

import SiteFooter from "@/components/Layout/SiteFooter";
import SiteHeader from "@/components/Layout/SiteHeader";
import "@/styles/globals.css";
import styles from "@/app/layout.module.css";

export const metadata: Metadata = {
  title: "Lyfie",
  description: "Basic boilerplate website for Lyfie.org"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.siteShell}>
          <SiteHeader />
          <main className={styles.mainContent}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
