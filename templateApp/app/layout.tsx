import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novaforge.studio"),
  title: {
    default: "NovaForge Studio | AI-native digital transformation agency",
    template: "%s | NovaForge Studio",
  },
  description:
    "NovaForge Studio designs and builds cinematic, high-performance digital platforms for AI-native companies.",
  openGraph: {
    title: "NovaForge Studio",
    description:
      "Premium strategy, brand systems, and full-stack experience engineering for ambitious AI-native teams.",
    url: "https://novaforge.studio",
    siteName: "NovaForge Studio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020308",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${space.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <ScrollProgress />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
