import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      tiny5: ["Tiny5", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
      rubik: ["Rubik Mono One", "monospace"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
