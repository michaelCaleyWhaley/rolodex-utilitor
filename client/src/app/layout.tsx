import "./globals.scss";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";

const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rolodex utilitor",
  description: "Contact management solution",
  manifest: "/pwa/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
