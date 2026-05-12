import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Digital Twin",
  description: "AI-powered live business simulation platform"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}