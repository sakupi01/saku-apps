import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      },
    },
  },
  plugins: [],
} satisfies Config;
