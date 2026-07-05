import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { AppProvider } from "@/providers";

/* ── APIX Typography ──────────────────────────
   Body:    Inter
   Display: Plus Jakarta Sans
─────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "APIX English Center",
    template: "%s | APIX English Center",
  },
  description:
    "APIX English Center Management System — a modern operating system for managing students, classes, attendance, tuition, and more.",
  keywords: ["APIX", "English Center", "education", "management system"],
  authors: [{ name: "APIX English Center" }],
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
