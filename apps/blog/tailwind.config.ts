import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "mode"> = {
  mode: "jit",
  content: {
    relative: true,
    files: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      // TODO: 直接パッケージを参照しない方法に変更する
      // 現状、コンポーネントのトランスパイルはうまくいくが、cssだけpurgeされて効かない
      "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
      "!./node_modules",
    ],
  },
  presets: [sharedConfig],
};

export default config;
