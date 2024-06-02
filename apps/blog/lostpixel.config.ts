import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "home" },
      { path: "/about", name: "about" },
      { path: "/dev", name: "dev" },
      { path: "/dev/articles/blog-tech-stack", name: "blog-tech-stack" },
      { path: "/dev/tag/react", name: "tag-react" },
      {
        path: "/life",
        name: "life",
        threshold: 0.004,
        mask: [{ selector: ".eye-catch" }],
      },
      {
        path: "/life/articles/intern-completed-aritcle",
        name: "intern-completed-article",
        mask: [{ selector: ".thumbnail" }],
      },
      {
        path: "/life/tag/poem",
        name: "poem",
        threshold: 0.006,
        mask: [{ selector: ".eye-catch" }],
      },
    ],
    // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action
    baseUrl: process.env.LOCAL
      ? "http://localhost:3000"
      : "http://172.17.0.1:3000",
  },
  waitBeforeScreenshot: 5000,
  timeouts: {
    loadState: 50000,
    networkRequests: 50000,
  },
  // OSS mode
  imagePathBaseline: process.env.LOCAL
    ? "./tests/vrt/baseline-images"
    : "./apps/blog/tests/vrt/baseline-images",
  imagePathCurrent: process.env.LOCAL
    ? "./tests/vrt/current-images"
    : "./apps/blog/tests/vrt/current-images",
  imagePathDifference: process.env.LOCAL
    ? "./tests/vrt/difference-images"
    : "./apps/blog/tests/vrt/difference-images",
  generateOnly: true,
  failOnDifference: true,
};
