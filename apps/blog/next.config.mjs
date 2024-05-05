import headers from "./config/headers.cjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  headers,
  nftTracing: true,
};

export default nextConfig;
