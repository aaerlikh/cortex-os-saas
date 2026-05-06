import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cortex OS v4.0 | Erlikh.ai",
  description: "Advanced AI operating system for professionals",
  viewport: "width=device-width, initial-scale=1",
  authors: [{ name: "Erlikh.ai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] text-white overflow-hidden">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
