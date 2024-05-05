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
    turbotrace: {
      // control if the log of turbotrace should contain the details of the analysis, default is `false`
      logDetail: true,
      // if there is `process.cwd()` expression in your code, you can set this option to tell `turbotrace` the value of `process.cwd()` while tracing.
      // for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
      processCwd: ".",
    },
  },
};

export default nextConfig;
