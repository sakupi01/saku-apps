import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    ...defaultTheme,
    fontFamily: {
      ...defaultTheme.fontFamily,
      tiny5: ["Tiny5", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
      rubik: ["Rubik Mono One", "monospace"],
    },
    extend: {
      colors: {
        base: "var(--color-base)",
        "base-text": "var(--color-base-text)",
        primary: "var(--color-primary)",
        "primary-text": "var(--color-primary-text)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-hover-text": "var(--color-primary-hover-text)",
        "primary-active": "var(--color-primary-active)",
        "primary-active-text": "var(--color-primary-active-text)",
        "primary-disabled": "var(--color-primary-disabled)",
        "primary-disabled-text": "var(--color-primary-disabled-text)",
        "primary-background": "var(--color-primary-background)",
        "primary-background-text": "var(--color-primary-background-text)",
        "level-0": "var(--color-level-0)",
        "level-1": "var(--color-level-1)",
        "level-2": "var(--color-level-2)",
        "level-3": "var(--color-level-3)",
        "level-4": "var(--color-level-4)",
      },
      width: {
        "block-size": "var(--block-size, 11px)",
        "main-width": "var(--main-width, 800px)",
      },
      borderRadius: {
        "block-round": "var(--block-round, 3px)",
      },
      gap: {
        "block-gap": "var(--block-gap, 3px)",
      },
      gridTemplateRows: {
        "contribution-calendar": "repeat(7, var(--block-size, 10px))",
      },
      gridAutoColumns: {
        "contribution-calendar": "var(--block-size,10px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
