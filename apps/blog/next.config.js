const headers = require("./config/headers");
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  headers,
  /**
   * https://nextjs.org/docs/basic-features/image-optimization
   * Settings are the defaults
   */
  images: {
    domains: ["images.ctfassets.net", "images.eu.ctfassets.net"],
  },
};
