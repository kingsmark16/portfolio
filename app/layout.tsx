import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "./site-config";
import "./redesign.css";
import PortfolioMotion from "./components/PortfolioMotion";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [...siteConfig.keywords],
  referrer: "origin-when-cross-origin",
  formatDetection: { email: true, address: false, telephone: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_PH",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    firstName: "Mark Angel",
    lastName: "Concina",
    images: [
      {
        url: "/profile.png",
        width: 1086,
        height: 1448,
        alt: "Portrait of Mark Angel Concina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061211",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PH" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js = 'true'; if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !location.hash && performance.getEntriesByType('navigation')[0]?.type === 'navigate') { document.documentElement.dataset.motionBoot = 'pending'; setTimeout(() => { delete document.documentElement.dataset.motionBoot; }, 1800); }" }} />
        <PortfolioMotion>{children}</PortfolioMotion>
        <Analytics />
      </body>
    </html>
  );
}
