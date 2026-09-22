import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import JsonLd from "@/components/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { BootLoader } from "@/components/ClientLoaders";

const siteUrl = "https://abdullah-portfolio.vercel.app";

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Abdullah | Software Engineer, Data & ML",
  description:
    "Portfolio of Muhammad Abdullah — a Computer Science graduate who builds software applications with React, TypeScript, and FastAPI, and applies data analysis and machine learning to real problems.",
  keywords: ["Software Engineer", "Python", "React", "TypeScript", "FastAPI", "Backend", "Data Analysis", "Machine Learning", "Portfolio", "Computer Science"],
  authors: [{ name: "Muhammad Abdullah" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Muhammad Abdullah | Software Engineer, Data & ML",
    description:
      "A Computer Science graduate building software applications and applying data and machine learning.",
    siteName: "Muhammad Abdullah Portfolio",
    images: [{ url: "/profile.jpeg", width: 800, height: 800, alt: "Muhammad Abdullah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Abdullah | Software Engineer, Data & ML",
    description:
      "A Computer Science graduate building software applications and applying data and machine learning.",
    images: ["/profile.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300 selection:bg-primary/30">
        <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9000] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground">
          Skip to content
        </a>
        <BootLoader />
        <ThemeProvider>
          <JsonLd />
          <ErrorBoundary>
              {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
