import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "node.js",
        },
      },
    },
  ],
  documents: "app/gql/schema/",
  generates: {
    "app/gql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
