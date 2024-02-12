const headers = require("./config/headers");
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  headers,
};
