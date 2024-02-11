const { nextFusePlugin } = require("fuse/next/plugin");
const headers = require("./config/headers");
/** @type {import('next').NextConfig} */
module.exports = nextFusePlugin()({
  transpilePackages: ["@repo/ui"],
  headers,
});
