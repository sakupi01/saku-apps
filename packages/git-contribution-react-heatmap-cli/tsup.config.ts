import { type Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
  ...options,
}));
