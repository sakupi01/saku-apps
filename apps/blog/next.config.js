const { nextFusePlugin } = require("fuse/next/plugin");
import headers from "./config/headers";
/** @type {import('next').NextConfig} */
module.exports = nextFusePlugin()({
  transpilePackages: ["@repo/ui"],
  headers
});