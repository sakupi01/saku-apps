import "@repo/ui/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "./_components/navigation";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "saku's blog",
  description: "sakuの備忘録です",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
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
      </body>
    </html>
  );
}
