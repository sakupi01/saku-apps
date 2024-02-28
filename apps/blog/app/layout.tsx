import "@repo/ui/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import NavigationBar from "./_components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://skr-blog.com/"),
  title: {
    default: "saku's blog",
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - saku's blog`,
  },
  description: "sakuのいろんな備忘録です",
  openGraph: {
    title: "saku's blog",
    description: "sakuのいろんな備忘録です",
    url: "https://skr-blog.com/",
    siteName: "saku's blog",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://skr-blog.com/opengraph-image.png",
        alt: "saku's blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "saku's blog",
    description: "sakuのいろんな備忘録です",
    site: "@SakuOnTheWeb",
    creator: "@SakuOnTheWeb",
    images: [
      {
        url: "https://skr-blog.com/twitter-image.png",
        alt: "saku's blog",
      },
    ],
  },
  // verification: {
  //   google: "search console stuff",
  // },
  alternates: {
    canonical: "https://skr-blog.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const date = new Date();
  console.log("running on server");

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        {children}
        <SpeedInsights />
        <div className="w-full text-center text-sm text-subtle py-4">
          <small>
            Copyright © {date.getFullYear()} saku 🌸 All rights reserved.
          </small>
        </div>
      </body>
    </html>
  );
}
