import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "AsystQA AI Command Center",
  description: "Observe. Analyze. Automate. Assure.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/asystqa-logo.svg",
    shortcut: "/asystqa-logo.svg",
    apple: "/asystqa-logo.svg"
  },
  openGraph: {
    title: "AsystQA AI Command Center",
    description: "Observe. Analyze. Automate. Assure.",
    images: [
      {
        url: "/asystqa-wordmark.svg",
        width: 1280,
        height: 720,
        alt: "AsystQA AI Command Center logo"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#040711"
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
