import { GoogleAnalytics } from "@next/third-parties/google";
import "@repo/ui/ui.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import NavigationBar from "./_components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.sakupi01.com"),
  title: {
    default: "Blog - saku",
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: "%s - saku",
  },
  description: "sakuの備忘録",
  openGraph: {
    title: "Blog - saku",
    description: "sakuの備忘録",
    url: "/",
    siteName: "saku's blog",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "saku's blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - saku",
    description: "sakuの備忘録",
    site: "@sakupi01",
    creator: "@sakupi01",
    images: [
      {
        url: "/twitter-image.png",
        alt: "saku's blog",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const date = new Date();
  return (
    <html lang="en">
      <body className={inter.className} id="scrollArea">
        <NavigationBar />
        {children}
        <SpeedInsights />
        <div className="w-full text-center text-sm text-subtle py-4">
          <small>
            Copyright © {date.getFullYear()} saku 🌸 All rights reserved.
          </small>
        </div>
        <GoogleAnalytics gaId="G-KC1QTQK44J" />
      </body>
    </html>
  );
}
