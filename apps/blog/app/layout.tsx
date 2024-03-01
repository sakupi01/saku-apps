import { GoogleAnalytics } from "@next/third-parties/google";
import "@repo/ui/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import NavigationBar from "./_components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skr-blog.com/"),
  title: {
    default: "saku's blog",
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - saku's blog`,
  },
  description: "sakuの備忘録",
  openGraph: {
    title: "saku's blog",
    description: "sakuの備忘録",
    url: "https://www.skr-blog.com/",
    siteName: "saku's blog",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://www.skr-blog.com/opengraph-image.png",
        alt: "saku's blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "saku's blog",
    description: "sakuの備忘録",
    site: "@SakuOnTheWeb",
    creator: "@SakuOnTheWeb",
    images: [
      {
        url: "https://www.skr-blog.com/twitter-image.png",
        alt: "saku's blog",
      },
    ],
  },
  // verification: {
  //   google: "search console stuff",
  // },
  alternates: {
    canonical: "https://www.skr-blog.com/",
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
      <link
        rel="icon"
        // biome-ignore lint/style/noUnusedTemplateLiteral
        href={`data:image/svg+xml,\<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22\>\<text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:100px;%22\>🌸\</text\>\</svg\>`}
      />
      <body className={inter.className}>
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
