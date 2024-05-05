import headers from "./config/headers.cjs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  headers,
  experimental: {
    // includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(process.cwd(), "../../"),
  },
};

export default nextConfig;
