import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AsystQA AI Command Center",
  description: "Observe. Analyze. Automate. Assure."
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