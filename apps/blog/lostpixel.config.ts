import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "home" },
      { path: "/about", name: "about" },
      { path: "/dev", name: "dev" },
      { path: "/dev/articles/blog-tech-stack", name: "blog-tech-stack" },
      { path: "/dev/tag/react", name: "tag-react" },
      { path: "/life", name: "life", threshold: 0.0035 },
      {
        path: "/life/articles/intern-completed-aritcle",
        name: "intern-completed-article",
      },
      { path: "/life/tag/poem", name: "poem" },
    ],
    // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action

    baseUrl: "http://172.17.0.1:3000",
  },
  // OSS mode
  imagePathBaseline: "./tests/vrt/baseline-images",
  imagePathCurrent: "./tests/vrt/current-images",
  imagePathDifference: "./tests/vrt/difference-images",
  generateOnly: true,
  failOnDifference: true,
};
