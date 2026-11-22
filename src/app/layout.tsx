import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkBoost — Turn comments into captured leads",
  description: "Solo-built, India-first creator sales page with lead capture and per-source analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111827]">
        {children}
      </body>
    </html>
  );
}
