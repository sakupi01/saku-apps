import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
};

export default config;
