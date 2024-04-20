import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "home" },
      { path: "/about", name: "about" },
      { path: "/dev", name: "dev" },
      { path: "/dev/articles/blog-tech-stack", name: "blog-tech-stack" },
      { path: "/dev/tag/react", name: "tag-react" },
      { path: "/life", name: "life" },
      {
        path: "/life/articles/intern-completed-aritcle",
        name: "intern-completed-article",
      },
      { path: "/life/tag/poem", name: "poem" },
    ],
    // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action

    baseUrl: process.env.LOCAL
      ? "http://localhost:3000"
      : "http://172.17.0.1:3000",
  },
  threshold: 0.01,
  waitBeforeScreenshot: 5000,
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
  failOnDifference: false,
};
