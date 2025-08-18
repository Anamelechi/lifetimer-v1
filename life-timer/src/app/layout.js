import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SwUpdater from "@/components/SwUpdater";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Life Timer",
  description: "A PWA that counts how long you've been alive.",
  manifest: "/manifest.json",
  icons: {
  icon: "/favicon.ico",
  apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Life Timer",
  },
};

export const viewport = {
  themeColor: "#0b0f1a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  {children}
  <SwUpdater />
      </body>
    </html>
  );
}
